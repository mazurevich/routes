import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@acme/ui/button";

import { auth, getSession, needsProfileCompletion } from "~/auth/server";

export default async function HomePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (needsProfileCompletion(session.user.email, session.user.emailVerified)) {
    redirect("/complete-profile");
  }

  return (
    <main className="container py-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bike Routes
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, {session.user.name ?? "rider"}.
        </p>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">You are logged in with Strava</h2>
          <p className="text-muted-foreground mt-2">
            Next step is wiring route sync and rendering your map screen.
          </p>
          <form className="mt-4">
            <Button
              type="submit"
              variant="outline"
              formAction={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/login");
              }}
            >
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
