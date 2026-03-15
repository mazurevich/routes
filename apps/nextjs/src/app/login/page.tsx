import { redirect } from "next/navigation";

import { Button } from "@acme/ui/button";

import { auth, getSession, needsProfileCompletion } from "~/auth/server";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    if (needsProfileCompletion(session.user.email, session.user.emailVerified)) {
      redirect("/complete-profile");
    }

    redirect("/");
  }

  return (
    <main className="container py-16">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-xl border p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="text-muted-foreground">
            Connect your Strava account to load your rides and route history.
          </p>
        </div>

        <form>
          <Button
            type="submit"
            className="w-full"
            formAction={async () => {
              "use server";
              const res = await auth.api.signInWithOAuth2({
                body: {
                  providerId: "strava",
                  callbackURL: "/",
                },
              });

              if (!res.url) {
                throw new Error("No URL returned from Strava OAuth");
              }

              redirect(res.url);
            }}
          >
            Continue with Strava
          </Button>
        </form>
      </div>
    </main>
  );
}
