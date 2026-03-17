import { defineConfig } from "eslint/config";

import { reactCompilerConfig } from "@acme/eslint-config/react-compiler";
import { tailwindConfig } from "@acme/eslint-config/tailwind";

export default defineConfig(
  {
    ignores: [
      ".cache/**",
      ".expo/**",
      ".turbo/**",
      "android/**",
      "dist/**",
      "ios/**",
      "node_modules/**",
    ],
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    settings: {
      tailwindcss: {
        config: "tailwind.config.js",
      },
    },
  },
  tailwindConfig,
  reactCompilerConfig,
);
