import "server-only";

import { initAuth, isStravaPlaceholderEmail } from "@acme/auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { cache } from "react";

import { env } from "~/env";

const configuredProductionUrl = env.AUTH_PRODUCTION_URL?.trim();

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : (env.AUTH_PRODUCTION_URL ?? "http://localhost:3000");

const productionUrl =
  configuredProductionUrl ??
  (env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : (env.AUTH_PRODUCTION_URL ?? "http://localhost:3000"));
const resendApiKey = env.RESEND_API_KEY;
const emailFrom = env.AUTH_EMAIL_FROM;

export const auth = initAuth({
  baseUrl,
  productionUrl,
  secret: env.AUTH_SECRET,
  resendApiKey,
  emailFrom,
  stravaClientId: env.AUTH_STRAVA_ID,
  stravaClientSecret: env.AUTH_STRAVA_SECRET,
  extraPlugins: [nextCookies()],
});

export const needsProfileCompletion = (email: string, emailVerified: boolean) =>
  isStravaPlaceholderEmail(email) || !emailVerified;

export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));
