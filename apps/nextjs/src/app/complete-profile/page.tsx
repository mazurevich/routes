import { redirect } from "next/navigation";

import { sql } from "@acme/db";
import { db } from "@acme/db/client";
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";

import { auth, getSession, needsProfileCompletion } from "~/auth/server";

type SearchParams = Record<string, string | string[] | undefined>;

const getFirstParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const buildCompleteProfileUrl = (params: Record<string, string | undefined>) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue;
    }

    searchParams.set(key, value);
  }

  const query = searchParams.toString();
  return query.length > 0 ? `/complete-profile?${query}` : "/complete-profile";
};

type CompleteProfilePageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CompleteProfilePage({
  searchParams,
}: CompleteProfilePageProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!needsProfileCompletion(session.user.email, session.user.emailVerified)) {
    redirect("/");
  }

  const params = await searchParams;
  const email = getFirstParam(params.email) ?? "";
  const status = getFirstParam(params.status);
  const error = getFirstParam(params.error);
  const currentUserId = session.user.id;

  const sendOtpAction = async (formData: FormData) => {
    "use server";

    const rawEmail = formData.get("email");
    const normalizedEmail = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      redirect(
        buildCompleteProfileUrl({
          error: "Enter a valid email address",
          email: normalizedEmail,
        }),
      );
    }

    if (normalizedEmail.endsWith("@strava.local")) {
      redirect(
        buildCompleteProfileUrl({
          error: "Please use your real email address",
          email: normalizedEmail,
        }),
      );
    }

    await auth.api.sendVerificationOTP({
      body: {
        email: normalizedEmail,
        type: "email-verification",
      },
    });

    redirect(
      buildCompleteProfileUrl({
        status: "Verification code sent",
        email: normalizedEmail,
      }),
    );
  };

  const verifyOtpAction = async (formData: FormData) => {
    "use server";

    const rawEmail = formData.get("email");
    const rawOtp = formData.get("otp");

    const normalizedEmail = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
    const normalizedOtp = typeof rawOtp === "string" ? rawOtp.trim() : "";

    if (!normalizedEmail || !normalizedOtp) {
      redirect(
        buildCompleteProfileUrl({
          error: "Email and verification code are required",
          email: normalizedEmail,
        }),
      );
    }

    const storedOtpResult = await auth.api.getVerificationOTP({
      query: {
        email: normalizedEmail,
        type: "email-verification",
      },
    });

    if (!storedOtpResult.otp || storedOtpResult.otp !== normalizedOtp) {
      redirect(
        buildCompleteProfileUrl({
          error: "Invalid or expired verification code",
          email: normalizedEmail,
        }),
      );
    }

    const existingUser = await db.query.user.findFirst({
      columns: { id: true },
      where: (table, { eq: eqOperator }) => eqOperator(table.email, normalizedEmail),
    });

    if (existingUser && existingUser.id !== currentUserId) {
      redirect(
        buildCompleteProfileUrl({
          error: "Email already used by another account",
          email: normalizedEmail,
        }),
      );
    }

    await db.execute(
      sql`
        update "user"
        set email = ${normalizedEmail}, email_verified = true
        where id = ${currentUserId}
      `,
    );
    await db.execute(
      sql`
        delete from "verification"
        where identifier = ${`email-verification-otp-${normalizedEmail}`}
      `,
    );

    redirect("/");
  };

  return (
    <main className="container py-16">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-xl border p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Complete your profile</h1>
          <p className="text-muted-foreground">
            Your Strava account is connected. Add and verify your email to finish setup.
          </p>
        </div>

        {error ? (
          <p className="text-destructive border-current/30 rounded-md border px-3 py-2 text-sm">
            {error}
          </p>
        ) : null}
        {status ? (
          <p className="rounded-md border border-emerald-600/30 px-3 py-2 text-sm text-emerald-600">
            {status}
          </p>
        ) : null}

        <form className="flex flex-col gap-3" action={sendOtpAction}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            defaultValue={email}
            required
          />
          <Button type="submit" className="w-full">
            Send verification code
          </Button>
        </form>

        <form className="flex flex-col gap-3" action={verifyOtpAction}>
          <Label htmlFor="otp">Verification code</Label>
          <Input
            id="otp"
            name="otp"
            type="text"
            placeholder="123456"
            inputMode="numeric"
            maxLength={6}
            required
          />
          <input type="hidden" name="email" value={email} />
          <Button type="submit" className="w-full" variant="secondary">
            Verify email and continue
          </Button>
        </form>
      </div>
    </main>
  );
}
