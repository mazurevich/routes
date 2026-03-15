# Bike Routes Architecture (Initial)

## Runtime Layout

- `apps/nextjs`: web app and the only backend runtime (Route Handlers, Server Actions, Cron-triggered jobs).
- `apps/expo`: Android-first mobile app with local-first route cache and on-device matching.
- `packages/contracts`: shared zod contracts and DTO types.
- `packages/domain`: shared business logic helpers (to be expanded during implementation).

## Core Principles

- TypeScript everywhere.
- Tailwind CSS on web, NativeWind on mobile.
- Next.js server runtime is the single source of truth for backend domain logic.
- Local-first UX on mobile with server sync for consistency and recovery.

## Planned Data Flow

1. Next.js receives Strava webhook events.
2. Sync tasks are persisted and processed in small idempotent chunks.
3. Processed routes are stored in Neon Postgres (+ PostGIS).
4. Expo app downloads cache bootstrap/deltas and matches proximity locally.
5. Memory events are notified locally and synced upstream when online.
