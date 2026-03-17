"use client";

import { useState } from "react";
import { Barlow_Condensed, Barlow } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const barlowCond = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const C = {
  bg: "#F8FAFF",
  blue: "#1052FF",
  dark: "#0D1321",
  mid: "#374151",
  muted: "#6B7280",
  surface: "#EEF2FF",
  border: "#DBEAFE",
  accent: "#60A5FA",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 0 0-1 1v5l-3 3" /><path d="m9 17 2-5 4-1" /><path d="M7 7h5l2 4" />
  </svg>
);

const Stars = ({ rating, uid, size = 14 }: { rating: number; uid: string; size?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => {
      const pct = Math.round(Math.min(100, Math.max(0, (rating - (i - 1)) * 100)));
      const id = `${uid}-${i}`;
      return (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${pct}%`} stopColor={C.blue} />
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
    <rect width="400" height="220" fill="#EEF2FF" />
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={`h${i}`} x1="0" y1={44 * (i + 1)} x2="400" y2={44 * (i + 1)} stroke="#DBEAFE" strokeWidth="1" />
    ))}
    {[80, 160, 240, 320].map((x) => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="#DBEAFE" strokeWidth="1" />
    ))}
    <path d="M 0 155 L 130 150 L 148 135" stroke="#BFDBFE" strokeWidth="2" fill="none" />
    <path d="M 290 0 L 270 30 L 254 27" stroke="#BFDBFE" strokeWidth="2" fill="none" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke="#93C5FD" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.blue} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="44" cy="202" r="7" fill={C.blue} />
    <text x="44" y="207" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">S</text>
    <circle cx="254" cy="27" r="8" fill={C.dark} />
    <text x="254" y="31.5" textAnchor="middle" fontSize="9" fill="white">▲</text>
    <text x="28" y="215" fontSize="8" fill={C.muted} fontFamily="sans-serif">Valloire</text>
    <text x="238" y="18" fontSize="9" fill={C.dark} fontFamily="sans-serif" fontWeight="bold">2645m</text>
  </svg>
);

const StatBlock = ({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) => (
  <div style={{
    background: accent ? C.blue : "white",
    border: `1px solid ${accent ? C.blue : C.border}`,
    borderRadius: 4,
    padding: "14px 12px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  }}>
    <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, color: accent ? "rgba(255,255,255,0.7)" : C.muted, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{label}</span>
    <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: accent ? "white" : C.dark, lineHeight: 1 }}>{value}</span>
    {sub && <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: accent ? "rgba(255,255,255,0.6)" : C.muted }}>{sub}</span>}
  </div>
);

const NAV_TABS = [
  { id: "home", label: "HOME", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "ROUTES", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "ACTIVITY", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "FRIENDS", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "MORE", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign2() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fb = { fontFamily: "var(--font-body)" };

  return (
    <div className={`${barlowCond.variable} ${barlow.variable}`} style={{ minHeight: "100vh", background: "#E5EDFF", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Header bar */}
        <div style={{ background: C.dark, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: C.blue, color: "white", borderRadius: 4, padding: "4px 8px", display: "flex", alignItems: "center", gap: 5, ...fd, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>
              <BikeIcon />
              CYCLING
            </div>
            <div style={{ ...fd, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>DESIGN 2 · COMPUTER</div>
          </div>
          <div style={{ ...fb, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Mar 15, 2026</div>
        </div>

        {/* Map */}
        <div style={{ height: 200, overflow: "hidden" }}>
          <MapSVG />
        </div>

        {/* Title strip */}
        <div style={{ background: C.dark, padding: "12px 16px 14px", borderBottom: `3px solid ${C.blue}` }}>
          <h1 style={{ ...fd, fontSize: 28, fontWeight: 800, color: "white", margin: 0, letterSpacing: "0.02em", textTransform: "uppercase" as const }}>
            {mockRoute.title}
          </h1>
          <p style={{ ...fb, fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "2px 0 0", letterSpacing: "0.04em" }}>{mockRoute.date.toUpperCase()}</p>
        </div>

        <div style={{ padding: "16px 16px 0" }}>

          {/* Primary stats: full width blocks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: 4 }}>
            <StatBlock label="Distance" value={mockRoute.stats.distance} accent />
            <StatBlock label="Time" value={mockRoute.stats.duration} accent />
            <StatBlock label="Elevation" value={mockRoute.stats.elevation} accent />
          </div>

          {/* Secondary stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 16 }}>
            <StatBlock label="Avg Power" value={mockRoute.stats.avgPower} sub="normalized 228 W" />
            <StatBlock label="Avg Heart Rate" value={mockRoute.stats.avgPulse} sub={`max ${mockRoute.stats.maxPulse}`} />
            <StatBlock label="Speed" value={mockRoute.stats.avgSpeed} sub={`max ${mockRoute.stats.maxSpeed}`} />
            <StatBlock label="Cadence" value={mockRoute.stats.cadence} />
            <StatBlock label="Calories" value={mockRoute.stats.calories} />
            <StatBlock label="TSS" value={mockRoute.stats.tss} sub="Training Stress Score" />
          </div>

          {/* Rating section */}
          <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: 4, padding: 14, marginBottom: 4 }}>
            <div style={{ ...fd, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 10 }}>Route Rating</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ ...fd, fontSize: 48, fontWeight: 800, color: C.blue, lineHeight: 1 }}>{mockRoute.rating}</div>
              <div>
                <Stars rating={mockRoute.rating} uid="main2" size={20} />
                <div style={{ ...fb, fontSize: 12, color: C.muted, marginTop: 4 }}>{mockRoute.ratingCount} ratings</div>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div key={ri} style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 4, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 11, fontWeight: 700, color: "white" }}>{r.initials}</div>
                    <div>
                      <div style={{ ...fd, fontSize: 13, fontWeight: 700, color: C.dark }}>{r.author}</div>
                      <div style={{ ...fb, fontSize: 10, color: C.muted }}>{r.date}</div>
                    </div>
                  </div>
                  <Stars rating={r.rating} uid={`rev2-${ri}`} size={12} />
                </div>
                <p style={{ ...fb, fontSize: 12, color: C.mid, margin: 0, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>

          {/* Comment section */}
          <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: 4, padding: 14, marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ ...fd, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Activity Log</div>
              {!isEditing && (
                <button onClick={handleEditStart} aria-label="Edit log" style={{ ...fd, fontSize: 11, fontWeight: 700, color: "white", background: C.blue, border: "none", borderRadius: 3, padding: "4px 12px", cursor: "pointer", letterSpacing: "0.05em" }}>
                  EDIT
                </button>
              )}
            </div>
            {isEditing ? (
              <div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit activity log"
                  style={{ ...fb, width: "100%", padding: 10, border: `2px solid ${C.blue}`, borderRadius: 4, background: C.surface, color: C.dark, fontSize: 13, lineHeight: 1.6, resize: "vertical" as const, minHeight: 110, outline: "none", boxSizing: "border-box" as const }} />
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button onClick={handleSave} aria-label="Save log" style={{ ...fd, flex: 1, padding: "10px 0", borderRadius: 3, border: "none", background: C.blue, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>SAVE</button>
                  <button onClick={handleCancel} aria-label="Cancel" style={{ ...fd, flex: 1, padding: "10px 0", borderRadius: 3, border: `1px solid ${C.border}`, background: "white", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>CANCEL</button>
                </div>
              </div>
            ) : (
              <p style={{ ...fb, fontSize: 13, color: C.mid, margin: 0, lineHeight: 1.6 }}>{comment}</p>
            )}
          </div>

          {/* Friends */}
          <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: 4, padding: 14, marginBottom: 16 }}>
            <div style={{ ...fd, fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 10 }}>Segment Participants</div>
            {mockRoute.friends.map((f, i) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: i > 0 ? 8 : 0, marginTop: i > 0 ? 8 : 0, borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ ...fd, fontSize: 13, fontWeight: 700, color: C.muted, width: 16 }}>{i + 1}</div>
                <div style={{ width: 34, height: 34, borderRadius: 4, background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 12, fontWeight: 700, color: "white" }}>{f.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...fd, fontSize: 14, fontWeight: 700, color: C.dark }}>{f.name}</div>
                </div>
                <div style={{ ...fd, fontSize: 15, fontWeight: 800, color: f.status === "in-progress" ? C.blue : C.dark }}>
                  {f.status === "in-progress" ? "···" : f.time}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Nav */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.dark, display: "flex", justifyContent: "space-around", padding: "8px 0 10px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "2px 8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? C.blue : "rgba(255,255,255,0.35)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fd, fontSize: 9, color: active ? C.blue : "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.06em" }}>{tab.label}</span>
                {active && <div style={{ position: "absolute", top: 0, width: 32, height: 2, background: C.blue, borderRadius: "0 0 2px 2px" }} />}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
