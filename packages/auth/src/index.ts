import type { BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, genericOAuth, oAuthProxy } from "better-auth/plugins";
import { Resend } from "resend";

import { db } from "@acme/db/client";

const STRAVA_PLACEHOLDER_EMAIL_SUFFIX = "@strava.local";

export const isStravaPlaceholderEmail = (email: string) =>
  email.endsWith(STRAVA_PLACEHOLDER_EMAIL_SUFFIX);

export function initAuth<
  TExtraPlugins extends BetterAuthPlugin[] = [],
>(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
  resendApiKey?: string;
  emailFrom?: string;

  stravaClientId: string;
  stravaClientSecret: string;
  extraPlugins?: TExtraPlugins;
}) {
  const resend = options.resendApiKey ? new Resend(options.resendApiKey) : null;

  const config = {
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    plugins: [
      oAuthProxy({
        productionURL: options.productionUrl,
      }),
      genericOAuth({
        config: [
          {
            providerId: "strava",
            authorizationUrl: "https://www.strava.com/oauth/authorize",
            tokenUrl: "https://www.strava.com/oauth/token",
            userInfoUrl: "https://www.strava.com/api/v3/athlete",
            clientId: options.stravaClientId,
            clientSecret: options.stravaClientSecret,
            redirectURI: `${options.productionUrl}/api/auth/oauth2/callback/strava`,
            authorizationUrlParams: {
              scope: "read,activity:read_all",
            },
            mapProfileToUser: (profile) => {
              const firstName =
                typeof profile.firstname === "string" ? profile.firstname : "";
              const lastName =
                typeof profile.lastname === "string" ? profile.lastname : "";
              const fullName = `${firstName} ${lastName}`.trim();
              const athleteId =
                typeof profile.id === "string" || typeof profile.id === "number"
                  ? String(profile.id)
                  : "";
              const fallbackEmail =
                athleteId.length > 0
                  ? `${athleteId}${STRAVA_PLACEHOLDER_EMAIL_SUFFIX}`
                  : undefined;

              return {
                name:
                  fullName.length > 0
                    ? fullName
                    : (typeof profile.username === "string"
                        ? profile.username
                        : "Strava User"),
                email:
                  typeof profile.email === "string" && profile.email.length > 0
                    ? profile.email
                    : fallbackEmail,
                image: typeof profile.profile === "string" ? profile.profile : undefined,
              };
            },
          },
        ],
      }),
      emailOTP({
        sendVerificationOTP: async ({ email, otp, type }) => {
          if (!resend || !options.emailFrom) {
            console.info("[AUTH][EMAIL_OTP_FALLBACK]", { email, otp, type });
            return;
          }

          await resend.emails.send({
            from: options.emailFrom,
            to: email,
            subject: "Your Bike Routes verification code",
            text: `Your verification code is ${otp}. It expires in 5 minutes.`,
          });
        },
      }),
      expo(),
      ...(options.extraPlugins ?? []),
    ],
    trustedOrigins: ["expo://"],
    onAPIError: {
      onError(error, ctx) {
        console.error("BETTER AUTH API ERROR", error, ctx);
      },
    },
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
