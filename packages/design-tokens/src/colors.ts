export type ThemeMode = "light" | "dark";

export interface SemanticColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  routeCoral: string;
  routeTeal: string;
  routeYellow: string;
  routePurple: string;
}

export const colorTokens: Record<ThemeMode, SemanticColors> = {
  light: {
    background: "#F0F8FF",
    foreground: "#2D3748",
    card: "#FFFFFF",
    cardForeground: "#2D3748",
    primary: "#20B2AA",
    primaryForeground: "#FFFFFF",
    secondary: "#E0F5F4",
    secondaryForeground: "#2D3748",
    accent: "#FF6B6B",
    accentForeground: "#FFFFFF",
    muted: "#F7FAFC",
    mutedForeground: "#718096",
    border: "#D6EAF8",
    input: "#FFFFFF",
    ring: "#20B2AA",
    destructive: "#FF4458",
    destructiveForeground: "#FFFFFF",
    routeCoral: "#FF6B6B",
    routeTeal: "#20B2AA",
    routeYellow: "#FFD166",
    routePurple: "#9B72CF",
  },
  dark: {
    background: "#0F172A",
    foreground: "#E2E8F0",
    card: "#111827",
    cardForeground: "#E2E8F0",
    primary: "#22D3EE",
    primaryForeground: "#0F172A",
    secondary: "#1E293B",
    secondaryForeground: "#CBD5E1",
    accent: "#FB7185",
    accentForeground: "#0F172A",
    muted: "#1F2937",
    mutedForeground: "#94A3B8",
    border: "#334155",
    input: "#1E293B",
    ring: "#22D3EE",
    destructive: "#FB7185",
    destructiveForeground: "#0F172A",
    routeCoral: "#FB7185",
    routeTeal: "#22D3EE",
    routeYellow: "#FBBF24",
    routePurple: "#A78BFA",
  },
};
