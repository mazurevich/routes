# Server Modules

This folder contains backend domain logic for the project.

- `integrations/`: provider clients (Strava, Google Photos)
- `jobs/`: scheduled/chunked sync runners
- `memories/`: "you've been here before" matching logic
- `routes/`: route query and mapping logic
- `tracking/`: location ping ingestion and local-first sync helpers

Route Handlers under `src/app/api/**` should call these modules instead of
embedding business rules directly in request handlers.
