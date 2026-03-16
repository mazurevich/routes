#!/usr/bin/env bash
set -euo pipefail

ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export ANDROID_HOME
export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH"

adb start-server >/dev/null

EMULATOR_SERIAL="$(
  adb devices | awk 'match($0, /^emulator-[0-9]+[[:space:]]+device$/) { print $1; exit }'
)"

if [ -z "$EMULATOR_SERIAL" ]; then
  nohup emulator -avd Pixel_9a >/tmp/android-emulator.log 2>&1 &
  adb wait-for-device
  sleep 2
  EMULATOR_SERIAL="$(
    adb devices | awk 'match($0, /^emulator-[0-9]+[[:space:]]+device$/) { print $1; exit }'
  )"
fi

if [ -z "$EMULATOR_SERIAL" ]; then
  echo "No emulator detected. Check /tmp/android-emulator.log."
  exit 1
fi

wait_for_boot_complete() {
  local serial="$1"
  local attempts=0

  until [ "$(adb -s "$serial" shell getprop sys.boot_completed | tr -d '\r')" = "1" ]; do
    attempts=$((attempts + 1))
    if [ "$attempts" -ge 120 ]; then
      echo "Timed out waiting for emulator boot completion: $serial"
      exit 1
    fi
    sleep 1
  done
}

wait_for_package_manager() {
  local serial="$1"
  local attempts=0

  until timeout 2s adb -s "$serial" shell cmd package list packages >/dev/null 2>&1; do
    attempts=$((attempts + 1))
    if [ "$attempts" -ge 120 ]; then
      echo "Timed out waiting for Package Manager readiness: $serial"
      exit 1
    fi
    sleep 1
  done
}

setup_reverse_tunnels() {
  local serial="$1"
  local ports=("3000" "3001" "8081")

  echo "Configuring adb reverse tunnels on $serial..."
  for port in "${ports[@]}"; do
    if adb -s "$serial" reverse "tcp:$port" "tcp:$port" >/dev/null 2>&1; then
      echo "  - tcp:$port -> tcp:$port"
    else
      echo "  - failed to reverse tcp:$port (continuing)"
    fi
  done
}

echo "Using emulator serial: $EMULATOR_SERIAL"
wait_for_boot_complete "$EMULATOR_SERIAL"
wait_for_package_manager "$EMULATOR_SERIAL"
setup_reverse_tunnels "$EMULATOR_SERIAL"

EMULATOR_DEVICE_NAME="$(
  adb -s "$EMULATOR_SERIAL" emu avd name 2>/dev/null | awk 'NR==1 { print; exit }' | tr -d '\r'
)"

if [ -z "$EMULATOR_DEVICE_NAME" ]; then
  EMULATOR_DEVICE_NAME="$(
    adb -s "$EMULATOR_SERIAL" shell getprop ro.product.model | tr -d '\r'
  )"
fi

if [ -z "$EMULATOR_DEVICE_NAME" ]; then
  echo "Could not resolve emulator name for serial: $EMULATOR_SERIAL"
  exit 1
fi

env \
  ANDROID_SERIAL="$EMULATOR_SERIAL" \
  "ORG_GRADLE_PROJECT_android.injected.device.serial=$EMULATOR_SERIAL" \
  pnpm -F @acme/expo exec expo run:android --device "$EMULATOR_DEVICE_NAME"
