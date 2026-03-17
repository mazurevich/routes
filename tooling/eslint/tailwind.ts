import { defineConfig } from "eslint/config";
import tailwindcss from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

export const tailwindConfig = defineConfig(
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva", "clsx", "ctl"],
      },
    },
    rules: {
      ...(tailwindcss.configs.recommended.rules as Record<string, "warn">),
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },
  {
    files: ["**/*.{css,md,json}"],
    rules: {
      "tailwindcss/classnames-order": "off",
      "tailwindcss/enforces-negative-arbitrary-values": "off",
      "tailwindcss/enforces-shorthand": "off",
      "tailwindcss/migration-from-tailwind-2": "off",
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/no-contradicting-classname": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "off",
    },
  },
);
