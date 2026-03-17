"use client";

import { useState } from "react";
import { Fredoka, Nunito } from "next/font/google";
import { colorTokens } from "@acme/design-tokens";
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

const baseColors = colorTokens.light;
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <title>Bike icon</title>
    <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 0 0-1 1v5l-3 3" /><path d="m9 17 2-5 4-1" /><path d="M7 7h5l2 4" />
  </svg>
);

const Stars = ({ rating, uid, size = 16 }: { rating: number; uid: string; size?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
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
  <svg viewBox="0 0 400 220" style={{ width: "100%", height: "100%", display: "block" }}>
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
  <div style={{ background: bg, borderRadius: 16, padding: "14px 12px", textAlign: "center" as const, border: `2px solid ${color}22` }}>
    <div style={{ fontSize: 22, marginBottom: 4 }}>{emoji}</div>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color, lineHeight: 1 }}>{value}</div>
    <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, color: C.muted, marginTop: 4 }}>{label}</div>
  </div>
);

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

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fb = { fontFamily: "var(--font-body)" };

  return (
    <div className={`${fredoka.variable} ${nunito.variable}`} style={{ minHeight: "100vh", background: "#D6EAF8", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Colorful header */}
        <div style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.teal})`, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white", ...fd, fontSize: 16, fontWeight: 600 }}>
            <BikeIcon />
            Cycling
          </div>
          <span style={{ ...fb, fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Route Example · Social</span>
        </div>

        {/* Map with rounded corners */}
        <div style={{ margin: "12px 12px 0", borderRadius: 20, overflow: "hidden", border: "3px solid white", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <MapSVG />
        </div>

        <div style={{ padding: "16px 14px 0" }}>
          <div style={{ background: C.surface, borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h1 style={{ ...fd, fontSize: 26, fontWeight: 600, color: C.dark, margin: "0 0 4px" }}>
              {mockRoute.title} 🚵
            </h1>
            <p style={{ ...fb, fontSize: 13, color: C.muted, margin: 0 }}>{mockRoute.date}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            <FunStatCard label="Distance" value={mockRoute.stats.distance} color={C.teal} bg={C.tealLight} emoji="📍" />
            <FunStatCard label="Time" value={mockRoute.stats.duration} color={C.coral} bg={C.coralLight} emoji="⏱" />
            <FunStatCard label="Climbed" value={mockRoute.stats.elevation} color={C.purple} bg={C.purpleLight} emoji="⛰" />
          </div>

          <div style={{ background: C.surface, borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 12 }}>💪 Your Stats</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
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
                <div key={i} style={{ background: C.bg, borderRadius: 12, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.border}` }}>
                  <span style={{ ...fb, fontSize: 11, fontWeight: 600, color: C.muted }}>{s.label}</span>
                  <span style={{ ...fd, fontSize: 15, fontWeight: 600, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: C.surface, borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 12 }}>⭐ How was it?</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, background: C.yellowLight, borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ ...fd, fontSize: 48, fontWeight: 600, color: C.coral, lineHeight: 1 }}>{mockRoute.rating}</div>
              <div>
                <Stars rating={mockRoute.rating} uid="m9" size={22} />
                <div style={{ ...fb, fontSize: 12, color: C.muted, marginTop: 4, fontWeight: 600 }}>{mockRoute.ratingCount} reviews</div>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div key={ri} style={{ background: C.bg, borderRadius: 14, padding: 12, marginBottom: 8, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.coral}, ${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 12, fontWeight: 800, color: "white" }}>{r.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...fd, fontSize: 14, fontWeight: 600, color: C.dark }}>{r.author}</div>
                    <div style={{ ...fb, fontSize: 11, color: C.muted }}>{r.date}</div>
                  </div>
                  <Stars rating={r.rating} uid={`r9-${ri}`} size={14} />
                </div>
                <p style={{ ...fb, fontSize: 13, color: C.mid, margin: 0, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>

          <div style={{ background: C.surface, borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.dark }}>✏️ My Note</div>
              {!isEditing && (
                <button type="button" onClick={handleEditStart} aria-label="Edit note" style={{ ...fb, fontSize: 12, fontWeight: 700, color: "white", background: C.teal, border: "none", borderRadius: 20, padding: "6px 16px", cursor: "pointer" }}>Edit</button>
              )}
            </div>
            {isEditing ? (
              <div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit your note"
                  style={{ ...fb, width: "100%", padding: 12, border: `2px solid ${C.teal}`, borderRadius: 14, background: C.tealLight, color: C.dark, fontSize: 14, lineHeight: 1.6, resize: "vertical" as const, minHeight: 110, outline: "none", boxSizing: "border-box" as const, fontWeight: 500 }} />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button type="button" onClick={handleSave} aria-label="Save note" style={{ ...fb, flex: 1, padding: "12px 0", borderRadius: 14, border: "none", background: C.teal, color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
                    Save
                  </button>
                  <button type="button" onClick={handleCancel} aria-label="Cancel" style={{ ...fb, flex: 1, padding: "12px 0", borderRadius: 14, border: `2px solid ${C.border}`, background: "white", color: C.muted, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: C.tealLight, borderRadius: 14, padding: 14 }}>
                <p style={{ ...fb, fontSize: 14, color: C.mid, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{comment}</p>
              </div>
            )}
          </div>

          <div style={{ background: C.surface, borderRadius: 20, padding: 16, marginBottom: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 12 }}>👥 Your Crew</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {mockRoute.friends.map((f) => (
                <div key={f.id} style={{ borderRadius: 16, padding: 12, background: C.bg, border: `2px solid ${C.border}`, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, textAlign: "center" as const }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 14, fontWeight: 800, color: "white", boxShadow: `0 3px 10px ${f.color}55` }}>{f.initials}</div>
                  <div style={{ ...fd, fontSize: 13, fontWeight: 600, color: C.dark }}>{f.name.split(" ")[0]}</div>
                  {f.status === "in-progress" ? (
                    <span style={{ ...fb, fontSize: 11, fontWeight: 800, color: C.coral, background: C.coralLight, padding: "3px 10px", borderRadius: 20 }}>Live</span>
                  ) : (
                    <span style={{ ...fd, fontSize: 15, fontWeight: 600, color: C.teal }}>{f.time}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: "white", borderTop: `2px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 10px", zIndex: 50, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button type="button" key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "2px 8px" }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: active ? `${tab.color}20` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? tab.color : C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <title>{`${tab.label} tab icon`}</title>
                    <path d={tab.d} />
                    {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                    {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                    {tab.id === "home" && <path d="M9 22V12h6v10" />}
                  </svg>
                </div>
                <span style={{ ...fb, fontSize: 10, color: active ? tab.color : C.muted, fontWeight: active ? 700 : 400 }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
