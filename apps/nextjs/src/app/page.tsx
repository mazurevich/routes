export default function HomePage() {
  return (
    <main className="container py-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bike Routes
        </h1>
        <p className="text-muted-foreground text-lg">
          Personal route memory app powered by Next.js, Expo, and Neon.
        </p>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Bootstrap complete</h2>
          <p className="text-muted-foreground mt-2">
            Next steps: wire Strava sync, local-first route cache, and memory
            notifications.
          </p>
        </div>
      </div>
    </main>
  );
}
