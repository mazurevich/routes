import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { getColorTokens } from "@acme/design-tokens";

import { queryClient } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = getColorTokens(colorScheme === "dark" ? "dark" : "light");

  return (
    <QueryClientProvider client={queryClient}>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <StatusBar />
    </QueryClientProvider>
  );
}
