import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";

import { initAuth, isStravaPlaceholderEmail } from "@acme/auth";

import { env } from "~/env";

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";
const resendApiKey = env.RESEND_API_KEY as string | undefined;
const emailFrom = env.AUTH_EMAIL_FROM as string | undefined;

export const auth = initAuth({
  baseUrl,
  productionUrl:
    env.VERCEL_ENV === "production"
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? "turbo.t3.gg"}`
      : "http://localhost:3000",
  secret: env.AUTH_SECRET,
  resendApiKey,
  emailFrom,
  stravaClientId: env.AUTH_STRAVA_ID,
  stravaClientSecret: env.AUTH_STRAVA_SECRET,
  extraPlugins: [nextCookies()],
});

export const needsProfileCompletion = (email: string, emailVerified: boolean) =>
  isStravaPlaceholderEmail(email) || !emailVerified;

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
