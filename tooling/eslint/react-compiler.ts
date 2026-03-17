import { defineConfig } from "eslint/config";
import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";

export const reactCompilerConfig = defineConfig({
  files: ["**/*.{jsx,tsx}"],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  plugins: {
    "react-compiler": reactCompiler,
  },
  rules: {
    "react-compiler/react-compiler": "warn",
  },
});
