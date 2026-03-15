import type { BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth, oAuthProxy } from "better-auth/plugins";

import { db } from "@acme/db/client";

export function initAuth<
  TExtraPlugins extends BetterAuthPlugin[] = [],
>(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;

  stravaClientId: string;
  stravaClientSecret: string;
  extraPlugins?: TExtraPlugins;
}) {
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
            scopes: ["read", "activity:read_all"],
            mapProfileToUser: (profile) => {
              const firstName =
                typeof profile.firstname === "string" ? profile.firstname : "";
              const lastName =
                typeof profile.lastname === "string" ? profile.lastname : "";
              const fullName = `${firstName} ${lastName}`.trim();

              return {
                name:
                  fullName.length > 0
                    ? fullName
                    : (typeof profile.username === "string"
                        ? profile.username
                        : "Strava User"),
                image: typeof profile.profile === "string" ? profile.profile : undefined,
              };
            },
          },
        ],
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
