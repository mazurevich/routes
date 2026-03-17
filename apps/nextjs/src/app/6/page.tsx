"use client";

import { useState } from "react";
import { Lora, Quattrocento_Sans } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const quattrocento = Quattrocento_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

const C = {
  bg: "#F9F3E3",
  dark: "#3D2B1F",
  brown: "#5C3D2E",
  terra: "#C05A2B",
  terraLight: "#F5E5D8",
  sand: "#D4B896",
  muted: "#8C7060",
  border: "#D4B896",
  surface: "#F2E8D0",
  ink: "#2A1E14",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
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
              <stop offset={`${pct}%`} stopColor={C.terra} />
              <stop offset={`${pct}%`} stopColor={C.sand} />
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
    <rect width="400" height="220" fill="#EDE1C4" />
    {/* Paper texture lines */}
    {[22, 44, 66, 88, 110, 132, 154, 176, 198].map((y) => (
      <line key={`hl${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#D4B896" strokeWidth="0.4" opacity="0.5" />
    ))}
    {/* Sepia terrain contours */}
    <ellipse cx="180" cy="100" rx="130" ry="80" fill="#C8A878" opacity="0.25" />
    <ellipse cx="210" cy="75" rx="100" ry="60" fill="#B89060" opacity="0.2" />
    <ellipse cx="235" cy="52" rx="70" ry="42" fill="#A87848" opacity="0.2" />
    {/* Contour lines — drawn as paths */}
    <path d="M 60 160 Q 100 150 140 140 Q 180 130 220 115 Q 260 100 300 90" stroke="#B89060" strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M 100 140 Q 140 128 180 116 Q 220 104 260 88 Q 290 76 320 65" stroke="#B89060" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Secondary path dashed */}
    <path d="M 0 155 L 130 150 L 148 135" stroke="#A87848" strokeWidth="1" fill="none" strokeDasharray="3,4" />
    {/* Route */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke="#3D2B1F" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.1" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.terra} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Ink markers */}
    <circle cx="44" cy="202" r="5" fill={C.dark} opacity="0.9" />
    <circle cx="254" cy="27" r="5" fill={C.terra} />
    <text x="34" y="217" fontSize="8" fill={C.muted} fontFamily="serif" fontStyle="italic">départ</text>
    <text x="238" y="18" fontSize="8" fill={C.terra} fontFamily="serif" fontStyle="italic">2645 m</text>
    {/* North arrow */}
    <text x="370" y="20" fontSize="12" fill={C.brown} fontFamily="serif" fontWeight="bold" opacity="0.5">N</text>
    <line x1="376" y1="22" x2="376" y2="34" stroke={C.brown} strokeWidth="1" opacity="0.4" />
  </svg>
);

const NAV_TABS = [
  { id: "home", label: "Home", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "Routes", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "Journal", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "Friends", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "More", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign6() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fb = { fontFamily: "var(--font-body)" };

  return (
    <div className={`${lora.variable} ${quattrocento.variable}`} style={{ minHeight: "100vh", background: "#E8DCC0", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Journal header */}
        <div style={{ background: C.dark, padding: "14px 18px 12px", borderBottom: `3px solid ${C.terra}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.sand, ...fd, fontSize: 13, fontStyle: "italic" }}>
              <BikeIcon />
              <span>Expedition Journal</span>
            </div>
            <span style={{ ...fb, fontSize: 10, color: "rgba(212,184,150,0.6)", letterSpacing: "0.06em" }}>DESIGN 6</span>
          </div>
        </div>

        {/* Map */}
        <div style={{ height: 210, borderBottom: `2px solid ${C.border}`, position: "relative" }}>
          <MapSVG />
          {/* Stamp-style date overlay */}
          <div style={{ position: "absolute", top: 12, right: 14, border: `2px solid ${C.terra}`, padding: "4px 10px", transform: "rotate(2deg)", opacity: 0.85 }}>
            <div style={{ ...fb, fontSize: 9, color: C.terra, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>15 MAR 2026</div>
          </div>
        </div>

        {/* Lined page content */}
        <div style={{ padding: "24px 20px 0", background: `repeating-linear-gradient(${C.bg}, ${C.bg} 27px, ${C.border}33 27px, ${C.border}33 28px)` }}>

          {/* Title block */}
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ background: C.terra, color: "white", ...fb, fontSize: 9, fontWeight: 700, padding: "2px 8px", letterSpacing: "0.1em" }}>CYCLING</div>
            </div>
            <h1 style={{ ...fd, fontSize: 28, fontWeight: 700, color: C.ink, margin: "0 0 4px", lineHeight: 1.15 }}>
              {mockRoute.title}
            </h1>
            <p style={{ ...fd, fontSize: 15, fontStyle: "italic", color: C.muted, margin: "0 0 4px" }}>{mockRoute.subtitle}</p>
            <p style={{ ...fb, fontSize: 12, color: C.muted }}>{mockRoute.date}</p>
          </div>

          {/* Quick stats — tabular journal style */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            {[
              { label: "Distance", value: mockRoute.stats.distance },
              { label: "Duration", value: mockRoute.stats.duration },
              { label: "Ascent", value: mockRoute.stats.elevation },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" as const }}>
                <div style={{ ...fd, fontSize: 20, fontWeight: 600, color: C.terra }}>{s.value}</div>
                <div style={{ ...fb, fontSize: 10, color: C.muted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Stats — field notes style */}
          <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ ...fd, fontSize: 14, fontWeight: 700, color: C.brown, marginBottom: 12, fontStyle: "italic" }}>Strava Metrics</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
              {[
                ["Power (avg)", mockRoute.stats.avgPower],
                ["Power (norm)", mockRoute.stats.normalizedPower],
                ["Heart rate (avg)", mockRoute.stats.avgPulse],
                ["Heart rate (max)", mockRoute.stats.maxPulse],
                ["Speed (avg)", mockRoute.stats.avgSpeed],
                ["Cadence", mockRoute.stats.cadence],
                ["Calories", mockRoute.stats.calories],
                ["TSS score", mockRoute.stats.tss],
              ].map(([l, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "6px 0", borderBottom: `1px dotted ${C.border}`, paddingRight: i % 2 === 0 ? 16 : 0, paddingLeft: i % 2 === 1 ? 12 : 0 }}>
                  <span style={{ ...fb, fontSize: 11, color: C.muted }}>{l}</span>
                  <span style={{ ...fd, fontSize: 14, color: C.dark, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating section */}
          <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ ...fd, fontSize: 14, fontWeight: 700, color: C.brown, marginBottom: 12, fontStyle: "italic" }}>Route Rating</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ ...fd, fontSize: 50, fontWeight: 600, color: C.terra, lineHeight: 1 }}>{mockRoute.rating}</div>
              <div>
                <Stars rating={mockRoute.rating} uid="m6" size={18} />
                <div style={{ ...fb, fontSize: 11, color: C.muted, marginTop: 4 }}>{mockRoute.ratingCount} entries</div>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div key={ri} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: ri < mockRoute.reviews.length - 1 ? `1px dotted ${C.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.terraLight, border: `1.5px solid ${C.terra}`, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 11, fontWeight: 700, color: C.terra }}>{r.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...fd, fontSize: 13, fontWeight: 600, color: C.dark }}>{r.author}</div>
                    <div style={{ ...fb, fontSize: 10, color: C.muted }}>{r.date}</div>
                  </div>
                  <Stars rating={r.rating} uid={`r6-${ri}`} size={11} />
                </div>
                <p style={{ ...fd, fontSize: 14, fontStyle: "italic", color: C.brown, margin: 0, lineHeight: 1.55 }}>"{r.text}"</p>
              </div>
            ))}
          </div>

          {/* Comment — field notes */}
          <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ ...fd, fontSize: 14, fontWeight: 700, color: C.brown, fontStyle: "italic" }}>Field Notes</div>
              {!isEditing && (
                <button onClick={handleEditStart} aria-label="Edit notes" style={{ ...fb, fontSize: 11, color: C.terra, background: "none", border: `1px solid ${C.terra}`, padding: "3px 10px", cursor: "pointer" }}>
                  edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit field notes"
                  style={{ ...fd, width: "100%", padding: "8px 0", border: "none", borderBottom: `2px solid ${C.terra}`, background: "transparent", color: C.ink, fontSize: 14, lineHeight: 1.7, resize: "none" as const, minHeight: 120, outline: "none", boxSizing: "border-box" as const, fontStyle: "italic" }} />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={handleSave} aria-label="Save" style={{ ...fb, padding: "8px 18px", background: C.terra, color: "white", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>Save Entry</button>
                  <button onClick={handleCancel} aria-label="Cancel" style={{ ...fb, padding: "8px 18px", background: "none", color: C.muted, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 11 }}>Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ ...fd, fontSize: 15, fontStyle: "italic", color: C.ink, margin: 0, lineHeight: 1.7 }}>{comment}</p>
            )}
          </div>

          {/* Friends — expedition members */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ ...fd, fontSize: 14, fontWeight: 700, color: C.brown, fontStyle: "italic", marginBottom: 14 }}>Fellow Riders</div>
            {mockRoute.friends.map((f, i) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: i < mockRoute.friends.length - 1 ? `1px dotted ${C.border}` : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 13, fontWeight: 700, color: "white", opacity: 0.9 }}>{f.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...fd, fontSize: 14, fontWeight: 600, color: C.dark }}>{f.name}</div>
                  <div style={{ ...fb, fontSize: 11, color: C.muted }}>
                    {f.status === "finished" ? "Completed ascent" : "Still climbing ···"}
                  </div>
                </div>
                <div style={{ ...fd, fontSize: 15, fontWeight: 600, color: f.status === "in-progress" ? C.terra : C.brown }}>{f.time}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Nav */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.dark, borderTop: `2px solid ${C.terra}`, display: "flex", justifyContent: "space-around", padding: "8px 0 10px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "2px 8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? C.terra : C.sand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.5}>
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fd, fontSize: 9, color: active ? C.terra : C.sand, fontStyle: active ? "italic" : "normal", opacity: active ? 1 : 0.5 }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
