"use client";

import { useState } from "react";
import { Crimson_Pro, Plus_Jakarta_Sans } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const C = {
  bg: "#FAFAF8",
  sage: "#6B8F64",
  sageMid: "#A8C2A2",
  sageLight: "#E8F0E6",
  dark: "#1A1919",
  mid: "#3D3B38",
  muted: "#8A8780",
  border: "#E0DDD8",
  surface: "#F4F2EE",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 0 0-1 1v5l-3 3" /><path d="m9 17 2-5 4-1" /><path d="M7 7h5l2 4" />
  </svg>
);

const Stars = ({ rating, uid, size = 13 }: { rating: number; uid: string; size?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => {
      const pct = Math.round(Math.min(100, Math.max(0, (rating - (i - 1)) * 100)));
      const id = `${uid}-${i}`;
      return (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${pct}%`} stopColor={C.sage} />
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
    <rect width="400" height="220" fill={C.bg} />
    {/* Very faint grid */}
    {[55, 110, 165].map((y) => (
      <line key={`h${y}`} x1="40" y1={y} x2="360" y2={y} stroke={C.border} strokeWidth="0.5" />
    ))}
    {/* Terrain suggestion: gentle curves */}
    <path d="M 0 160 Q 80 150 130 145 Q 180 140 210 120 Q 240 100 270 80 Q 300 60 350 50 L 400 48 L 400 220 L 0 220 Z" fill={C.sageLight} opacity="0.5" />
    <path d="M 0 180 Q 90 170 140 162 Q 190 154 220 140 Q 250 126 275 110 Q 300 94 340 85 L 400 82 L 400 220 L 0 220 Z" fill={C.sageMid} opacity="0.15" />
    {/* Route */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.sageMid} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.sage} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Minimal markers */}
    <circle cx="44" cy="202" r="5" fill={C.sage} />
    <circle cx="254" cy="27" r="5" fill="none" stroke={C.sage} strokeWidth="2" />
    <circle cx="254" cy="27" r="2" fill={C.sage} />
    <text x="34" y="215" fontSize="8" fill={C.muted} fontFamily="sans-serif" fontStyle="italic">start</text>
    <text x="244" y="18" fontSize="8" fill={C.sage} fontFamily="sans-serif" fontStyle="italic">2645 m</text>
  </svg>
);

const Divider = () => <div style={{ height: 1, background: C.border, margin: "24px 0" }} />;

const NAV_TABS = [
  { id: "home", label: "Home", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "Routes", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "Activity", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "Friends", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "More", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign4() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fb = { fontFamily: "var(--font-body)" };

  return (
    <div className={`${crimson.variable} ${jakarta.variable}`} style={{ minHeight: "100vh", background: "#EBEBEB", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Map — full width, no chrome */}
        <div style={{ height: 210, overflow: "hidden" }}>
          <MapSVG />
        </div>

        <div style={{ padding: "28px 24px 0" }}>

          {/* Minimal header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: C.sage, ...fb, fontSize: 12, fontWeight: 500 }}>
                <BikeIcon />
                <span style={{ letterSpacing: "0.04em" }}>Cycling</span>
              </div>
              <span style={{ color: C.border }}>·</span>
              <span style={{ ...fb, fontSize: 12, color: C.muted }}>Design 4 · Nordic</span>
            </div>
            <h1 style={{ ...fd, fontSize: 36, fontWeight: 300, color: C.dark, margin: "0 0 4px", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              {mockRoute.title}
            </h1>
            <p style={{ ...fd, fontSize: 17, color: C.muted, margin: 0, fontStyle: "italic", fontWeight: 300 }}>{mockRoute.subtitle}</p>
            <p style={{ ...fb, fontSize: 12, color: C.muted, margin: "6px 0 0", letterSpacing: "0.02em" }}>{mockRoute.date}</p>
          </div>

          {/* Quick trio */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: C.border, border: `1px solid ${C.border}`, marginBottom: 28 }}>
            {[
              { label: "Distance", value: mockRoute.stats.distance },
              { label: "Duration", value: mockRoute.stats.duration },
              { label: "Elevation", value: mockRoute.stats.elevation },
            ].map((s) => (
              <div key={s.label} style={{ background: C.bg, padding: "14px 8px", textAlign: "center" as const }}>
                <div style={{ ...fd, fontSize: 20, fontWeight: 600, color: C.dark }}>{s.value}</div>
                <div style={{ ...fb, fontSize: 10, color: C.muted, marginTop: 3, letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Performance — simple rows */}
          <div style={{ marginBottom: 0 }}>
            <h2 style={{ ...fb, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>Performance</h2>
            {[
              { label: "Avg Power", value: mockRoute.stats.avgPower },
              { label: "Normalized Power", value: mockRoute.stats.normalizedPower },
              { label: "Avg Heart Rate", value: mockRoute.stats.avgPulse },
              { label: "Max Heart Rate", value: mockRoute.stats.maxPulse },
              { label: "Avg Speed", value: mockRoute.stats.avgSpeed },
              { label: "Max Speed", value: mockRoute.stats.maxSpeed },
              { label: "Cadence", value: mockRoute.stats.cadence },
              { label: "Calories", value: mockRoute.stats.calories },
              { label: "TSS", value: mockRoute.stats.tss },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ ...fb, fontSize: 13, color: C.muted, fontWeight: 400 }}>{s.label}</span>
                <span style={{ ...fd, fontSize: 15, fontWeight: 600, color: C.dark }}>{s.value}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* Rating */}
          <div style={{ marginBottom: 0 }}>
            <h2 style={{ ...fb, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 16px" }}>Rating</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <span style={{ ...fd, fontSize: 54, fontWeight: 300, color: C.dark, lineHeight: 1 }}>{mockRoute.rating}</span>
              <div>
                <Stars rating={mockRoute.rating} uid="m4" size={16} />
                <span style={{ ...fb, fontSize: 12, color: C.muted, display: "block", marginTop: 5 }}>{mockRoute.ratingCount} reviews</span>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div key={ri} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.sageLight, border: `1px solid ${C.sageMid}`, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 11, fontWeight: 600, color: C.sage }}>{r.initials}</div>
                    <div>
                      <div style={{ ...fb, fontSize: 13, fontWeight: 500, color: C.dark }}>{r.author}</div>
                      <div style={{ ...fb, fontSize: 11, color: C.muted }}>{r.date}</div>
                    </div>
                  </div>
                  <Stars rating={r.rating} uid={`r4-${ri}`} size={12} />
                </div>
                <p style={{ ...fd, fontSize: 15, color: C.mid, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{r.text}</p>
              </div>
            ))}
          </div>

          <Divider />

          {/* Comment */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ ...fb, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: 0 }}>My Note</h2>
              {!isEditing && (
                <button onClick={handleEditStart} aria-label="Edit note" style={{ ...fb, fontSize: 12, color: C.sage, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.02em", textDecoration: "underline", textDecorationColor: C.sageMid }}>
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit your note"
                  style={{ ...fd, width: "100%", padding: "12px 0", borderTop: `1px solid ${C.sage}`, borderBottom: `1px solid ${C.sage}`, borderLeft: "none", borderRight: "none", background: "transparent", color: C.dark, fontSize: 15, lineHeight: 1.7, resize: "none" as const, minHeight: 110, outline: "none", boxSizing: "border-box" as const, fontStyle: "italic" }} />
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <button onClick={handleSave} aria-label="Save note" style={{ ...fb, padding: "8px 20px", background: C.sage, color: "white", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, letterSpacing: "0.04em" }}>Save</button>
                  <button onClick={handleCancel} aria-label="Cancel" style={{ ...fb, padding: "8px 20px", background: "none", color: C.muted, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 12, letterSpacing: "0.04em" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ ...fd, fontSize: 16, fontStyle: "italic", color: C.mid, margin: 0, lineHeight: 1.7, borderLeft: `2px solid ${C.sageMid}`, paddingLeft: 14 }}>{comment}</p>
            )}
          </div>

          <Divider />

          {/* Friends */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ ...fb, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 16px" }}>Participants</h2>
            {mockRoute.friends.map((f, i) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 12, fontWeight: 600, color: "white", marginRight: 12, opacity: 0.85 }}>{f.initials}</div>
                <span style={{ ...fb, fontSize: 13, fontWeight: 500, color: C.dark, flex: 1 }}>{f.name}</span>
                {f.status === "in-progress" ? (
                  <span style={{ ...fb, fontSize: 11, color: C.sage, background: C.sageLight, padding: "2px 8px" }}>active</span>
                ) : (
                  <span style={{ ...fd, fontSize: 14, color: C.mid }}>{f.time}</span>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Nav — hairline top */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.bg, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "10px 0 12px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "2px 6px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? C.sage : C.muted} strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fb, fontSize: 10, color: active ? C.sage : C.muted, fontWeight: active ? 500 : 400 }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
