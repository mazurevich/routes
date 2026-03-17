"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Fredoka, Nunito } from "next/font/google";
import { getColorTokens } from "@acme/design-tokens";
import { mockRoute } from "../../_components/route-details/routeDetailsData";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const baseColors = getColorTokens("light");
const C = {
  bg: baseColors.background,
  coral: baseColors.routeCoral,
  coralLight: "#FFE8E8",
  teal: baseColors.routeTeal,
  tealLight: baseColors.secondary,
  yellow: baseColors.routeYellow,
  yellowLight: "#FFF8E0",
  purple: baseColors.routePurple,
  purpleLight: "#F0E8FF",
  dark: baseColors.foreground,
  mid: "#4A5568",
  muted: baseColors.mutedForeground,
  border: baseColors.border,
  surface: baseColors.card,
};

const BikeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-[18px]"
  >
    <title>Bike icon</title>
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 0 0-1 1v5l-3 3" />
    <path d="m9 17 2-5 4-1" />
    <path d="M7 7h5l2 4" />
  </svg>
);

const Stars = ({ rating, uid, size = 16 }: { rating: number; uid: string; size?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => {
      const pct = Math.round(Math.min(100, Math.max(0, (rating - (i - 1)) * 100)));
      const id = `${uid}-${i}`;
      return (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <title>{`Rating star ${i}`}</title>
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${pct}%`} stopColor={C.yellow} />
              <stop offset={`${pct}%`} stopColor={C.border} />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={`url(#${id})`} />
        </svg>
      );
    })}
  </div>
);

const MapSVG = () => (
  <svg viewBox="0 0 400 220" className="block size-full">
    <title>Cycling route map</title>
    <rect width="400" height="220" fill="#E8F4FD" />
    {/* Friendly terrain blobs */}
    <ellipse cx="200" cy="130" rx="160" ry="80" fill="#D0EAFB" />
    <ellipse cx="220" cy="90" rx="120" ry="70" fill="#BEE0F7" />
    <ellipse cx="240" cy="60" rx="90" ry="55" fill="#A8D4F4" />
    {/* Dotted grid — playful */}
    {[55, 110, 165].map((y) => [80, 160, 240, 320].map((x) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#90C8E8" opacity="0.5" />
    )))}
    {/* Route path */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.coral} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Fun markers */}
    <circle cx="44" cy="202" r="9" fill="white" stroke={C.teal} strokeWidth="2.5" />
    <text x="44" y="207" textAnchor="middle" fontSize="10" fill={C.teal}>🚴</text>
    <circle cx="254" cy="27" r="9" fill={C.yellow} stroke="white" strokeWidth="2.5" />
    <text x="254" y="32" textAnchor="middle" fontSize="10">⛰</text>
    {/* Km dots along route */}
    <circle cx="108" cy="180" r="4" fill="white" stroke={C.coral} strokeWidth="2" />
    <circle cx="170" cy="108" r="4" fill="white" stroke={C.coral} strokeWidth="2" />
    <text x="32" y="216" fontSize="8" fill={C.teal} fontFamily="sans-serif" fontWeight="600">Start!</text>
    <text x="240" y="17" fontSize="8" fill={C.coral} fontFamily="sans-serif" fontWeight="600">Summit! 🎉</text>
  </svg>
);

const FunStatCard = ({ label, value, color, bg, emoji }: { label: string; value: string; color: string; bg: string; emoji: string }) => (
  <div
    className="rounded-2xl border-2 px-3 py-3.5 text-center"
    style={{ backgroundColor: bg, borderColor: `${color}22` }}
  >
    <div className="mb-1 text-[22px]">{emoji}</div>
    <div className="font-(--font-display) text-[20px] leading-none" style={{ color, fontWeight: 600 }}>
      {value}
    </div>
    <div className="mt-1 text-[10px] font-[var(--font-body)] font-bold" style={{ color: C.muted }}>
      {label}
    </div>
  </div>
);

const panelClass = "mb-3 rounded-[20px] bg-[var(--route-surface)] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]";

const NAV_TABS = [
  { id: "home", label: "Home", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", color: C.purple },
  { id: "routes", label: "Explore", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", color: C.teal },
  { id: "activity", label: "Activity", d: "M22 12h-4l-3 9L9 3l-3 9H2", color: C.coral },
  { id: "friends", label: "Friends", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", color: "#EC4899" },
  { id: "more", label: "More", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01", color: C.muted },
];

export default function RouteExamplePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => {
    setDraft(comment);
    setIsEditing(true);
  };
  const handleSave = () => {
    setComment(draft);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setDraft(comment);
  };

  const themeVars = {
    "--route-bg": C.bg,
    "--route-coral": C.coral,
    "--route-coral-light": C.coralLight,
    "--route-teal": C.teal,
    "--route-teal-light": C.tealLight,
    "--route-yellow": C.yellow,
    "--route-yellow-light": C.yellowLight,
    "--route-purple": C.purple,
    "--route-purple-light": C.purpleLight,
    "--route-dark": C.dark,
    "--route-mid": C.mid,
    "--route-muted": C.muted,
    "--route-border": C.border,
    "--route-surface": C.surface,
  } as CSSProperties;

  return (
    <div className={`${fredoka.variable} ${nunito.variable} flex min-h-screen justify-center bg-[var(--route-border)]`} style={themeVars}>
      <div className="relative min-h-screen w-full max-w-[390px] bg-[var(--route-bg)] pb-[88px]">
        <div className="flex items-center justify-between bg-[linear-gradient(135deg,var(--route-coral),var(--route-teal))] px-4 py-3.5">
          <div className="flex items-center gap-2 text-base font-[var(--font-display)] font-semibold text-white">
            <BikeIcon />
            Cycling
          </div>
          <span className="text-[11px] font-[var(--font-body)] font-semibold text-white/80">Route Example · Social</span>
        </div>

        <div className="mx-3 mt-3 overflow-hidden rounded-[20px] border-[3px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <MapSVG />
        </div>

        <div className="px-[14px] pt-4">
          <div className={panelClass}>
            <h1 className="mb-1 text-[26px] font-[var(--font-display)] font-semibold text-[var(--route-dark)]">
              {mockRoute.title} 🚵
            </h1>
            <p className="text-[13px] font-[var(--font-body)] text-[var(--route-muted)]">{mockRoute.date}</p>
          </div>

          <div className="mb-3 grid grid-cols-3 gap-2">
            <FunStatCard label="Distance" value={mockRoute.stats.distance} color={C.teal} bg={C.tealLight} emoji="📍" />
            <FunStatCard label="Time" value={mockRoute.stats.duration} color={C.coral} bg={C.coralLight} emoji="⏱" />
            <FunStatCard label="Climbed" value={mockRoute.stats.elevation} color={C.purple} bg={C.purpleLight} emoji="⛰" />
          </div>

          <div className={panelClass}>
            <div className="mb-3 text-lg font-[var(--font-display)] font-semibold text-[var(--route-dark)]">💪 Your Stats</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Avg Power", value: mockRoute.stats.avgPower, color: C.coral },
                { label: "Norm. Power", value: mockRoute.stats.normalizedPower, color: C.teal },
                { label: "Avg HR", value: mockRoute.stats.avgPulse, color: "#EC4899" },
                { label: "Max HR", value: mockRoute.stats.maxPulse, color: C.coral },
                { label: "Avg Speed", value: mockRoute.stats.avgSpeed, color: C.teal },
                { label: "Cadence", value: mockRoute.stats.cadence, color: C.purple },
                { label: "Calories 🔥", value: mockRoute.stats.calories, color: C.yellow },
                { label: "TSS Score", value: mockRoute.stats.tss, color: C.teal },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border bg-[var(--route-bg)] px-3 py-2.5"
                  style={{ borderColor: C.border }}
                >
                  <span className="text-[11px] font-[var(--font-body)] font-semibold text-[var(--route-muted)]">{s.label}</span>
                  <span className="text-[15px] font-[var(--font-display)] font-semibold" style={{ color: s.color }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={panelClass}>
            <div className="mb-3 text-lg font-[var(--font-display)] font-semibold text-[var(--route-dark)]">⭐ How was it?</div>
            <div className="mb-3.5 flex items-center gap-4 rounded-[14px] bg-[var(--route-yellow-light)] px-[14px] py-3">
              <div className="text-5xl font-[var(--font-display)] font-semibold leading-none text-[var(--route-coral)]">
                {mockRoute.rating}
              </div>
              <div>
                <Stars rating={mockRoute.rating} uid="m9" size={22} />
                <div className="mt-1 text-xs font-[var(--font-body)] font-semibold text-[var(--route-muted)]">
                  {mockRoute.ratingCount} reviews
                </div>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div
                key={ri}
                className="mb-2 rounded-[14px] border bg-[var(--route-bg)] p-3"
                style={{ borderColor: C.border }}
              >
                <div className="mb-1.5 flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--route-coral),var(--route-teal))] text-xs font-[var(--font-body)] font-extrabold text-white">
                    {r.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-[var(--font-display)] font-semibold text-[var(--route-dark)]">{r.author}</div>
                    <div className="text-[11px] font-[var(--font-body)] text-[var(--route-muted)]">{r.date}</div>
                  </div>
                  <Stars rating={r.rating} uid={`r9-${ri}`} size={14} />
                </div>
                <p className="text-[13px] font-[var(--font-body)] font-medium leading-normal text-[var(--route-mid)]">{r.text}</p>
              </div>
            ))}
          </div>

          <div className={panelClass}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-[var(--font-display)] font-semibold text-[var(--route-dark)]">✏️ My Note</div>
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEditStart}
                  aria-label="Edit note"
                  className="cursor-pointer rounded-[20px] px-4 py-1.5 text-xs font-[var(--font-body)] font-bold text-white"
                  style={{ backgroundColor: C.teal }}
                >
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  aria-label="Edit your note"
                  className="min-h-[110px] w-full resize-y rounded-[14px] border-2 bg-[var(--route-teal-light)] p-3 text-sm font-[var(--font-body)] font-medium leading-[1.6] text-[var(--route-dark)] outline-none"
                  style={{ borderColor: C.teal }}
                />
                <div className="mt-2.5 flex gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    aria-label="Save note"
                    className="flex-1 cursor-pointer rounded-[14px] border-none py-3 text-sm font-[var(--font-body)] font-extrabold text-white"
                    style={{ backgroundColor: C.teal }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    aria-label="Cancel"
                    className="flex-1 cursor-pointer rounded-[14px] border-2 bg-white py-3 text-sm font-[var(--font-body)] font-bold text-[var(--route-muted)]"
                    style={{ borderColor: C.border }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-[14px] bg-[var(--route-teal-light)] p-[14px]">
                <p className="text-sm font-[var(--font-body)] font-medium leading-[1.6] text-[var(--route-mid)]">{comment}</p>
              </div>
            )}
          </div>

          <div className="mb-[14px] rounded-[20px] bg-[var(--route-surface)] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="mb-3 text-lg font-[var(--font-display)] font-semibold text-[var(--route-dark)]">👥 Your Crew</div>
            <div className="grid grid-cols-2 gap-2">
              {mockRoute.friends.map((f) => (
                <div
                  key={f.id}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border-2 bg-[var(--route-bg)] p-3 text-center"
                  style={{ borderColor: C.border }}
                >
                  <div
                    className="flex size-11 items-center justify-center rounded-full text-sm font-[var(--font-body)] font-extrabold text-white"
                    style={{ backgroundColor: f.color, boxShadow: `0 3px 10px ${f.color}55` }}
                  >
                    {f.initials}
                  </div>
                  <div className="text-[13px] font-[var(--font-display)] font-semibold text-[var(--route-dark)]">
                    {f.name.split(" ")[0]}
                  </div>
                  {f.status === "in-progress" ? (
                    <span className="rounded-[20px] bg-[var(--route-coral-light)] px-2.5 py-[3px] text-[11px] font-[var(--font-body)] font-extrabold text-[var(--route-coral)]">
                      Live
                    </span>
                  ) : (
                    <span className="text-[15px] font-[var(--font-display)] font-semibold text-[var(--route-teal)]">{f.time}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav
          className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[390px] -translate-x-1/2 justify-around bg-white px-0 py-2 pb-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          style={{ borderTop: `2px solid ${C.border}` }}
        >
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button
                type="button"
                key={tab.id}
                aria-label={tab.label}
                className="flex cursor-pointer flex-col items-center gap-[3px] bg-transparent px-2 py-0.5"
              >
                <div
                  className="flex size-9 items-center justify-center rounded-xl transition-all duration-150"
                  style={{ backgroundColor: active ? `${tab.color}20` : "transparent" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={active ? tab.color : C.muted}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>{`${tab.label} tab icon`}</title>
                    <path d={tab.d} />
                    {tab.id === "friends" && (
                      <>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </>
                    )}
                    {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                    {tab.id === "home" && <path d="M9 22V12h6v10" />}
                  </svg>
                </div>
                <span
                  className="text-[10px] font-[var(--font-body)]"
                  style={{ color: active ? tab.color : C.muted, fontWeight: active ? 700 : 400 }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
