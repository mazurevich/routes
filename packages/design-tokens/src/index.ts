import { colorTokens, type ThemeMode } from "./colors";
import { radiusTokens } from "./radius";
import { shadowTokens } from "./shadows";
import { spacingTokens } from "./spacing";
import { typographyTokens } from "./typography";

export type { ThemeMode };
export { colorTokens, radiusTokens, shadowTokens, spacingTokens, typographyTokens };

export const designTokens = {
  colors: colorTokens,
  radius: radiusTokens,
  shadows: shadowTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
} as const;

export const getColorTokens = (mode: ThemeMode = "light") => designTokens.colors[mode];
