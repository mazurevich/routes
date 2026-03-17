"use client";

import { useState } from "react";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const C = {
  bg: "#FFFEF8",
  navy: "#14203A",
  navyMid: "#1E3055",
  gold: "#B8862A",
  goldLight: "#F5EDD0",
  silver: "#9AA5B8",
  dark: "#0F1822",
  muted: "#607085",
  border: "#D4C49A",
  borderLight: "#E8DFCA",
  surface: "#F8F4E8",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 0 0-1 1v5l-3 3" /><path d="m9 17 2-5 4-1" /><path d="M7 7h5l2 4" />
  </svg>
);

const Stars = ({ rating, uid, size = 14 }: { rating: number; uid: string; size?: number }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {[1, 2, 3, 4, 5].map((i) => {
      const pct = Math.round(Math.min(100, Math.max(0, (rating - (i - 1)) * 100)));
      const id = `${uid}-${i}`;
      return (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${pct}%`} stopColor={C.gold} />
              <stop offset={`${pct}%`} stopColor={C.borderLight} />
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
    <rect width="400" height="220" fill="#14203A" />
    {/* Subtle navy grid */}
    {[44, 88, 132, 176].map((y) => (
      <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(180,156,100,0.15)" strokeWidth="0.5" />
    ))}
    {[80, 160, 240, 320].map((x) => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="rgba(180,156,100,0.15)" strokeWidth="0.5" />
    ))}
    {/* Terrain — dark contours */}
    <path d="M 0 185 Q 60 178 100 170 Q 140 162 180 150 Q 220 138 260 122 Q 300 106 340 90 L 400 80 L 400 220 L 0 220 Z" fill="rgba(30,48,85,0.8)" />
    <path d="M 100 220 Q 160 140 220 90 Q 270 50 340 30 L 400 20 L 400 220 Z" fill="rgba(30,48,85,0.5)" />
    {/* Road lines */}
    <path d="M 0 155 L 130 150 L 148 135" stroke="rgba(180,156,100,0.3)" strokeWidth="1.5" fill="none" />
    {/* Route — gold */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke="rgba(184,134,42,0.4)" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.gold} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Markers — elegant */}
    <circle cx="44" cy="202" r="5" fill="none" stroke={C.gold} strokeWidth="1.5" />
    <circle cx="44" cy="202" r="2" fill={C.gold} />
    <circle cx="254" cy="27" r="6" fill={C.gold} />
    <text x="254" y="31.5" textAnchor="middle" fontSize="8" fill={C.navy}>▲</text>
    {/* Labels */}
    <text x="26" y="217" fontSize="8" fill={C.silver} fontFamily="serif" fontStyle="italic">Valloire</text>
    <text x="237" y="17" fontSize="8" fill={C.gold} fontFamily="serif">2645 m</text>
    {/* Compass rose */}
    <text x="374" y="18" fontSize="10" fill="rgba(180,156,100,0.5)" fontFamily="serif">N</text>
    <line x1="379" y1="20" x2="379" y2="30" stroke="rgba(180,156,100,0.4)" strokeWidth="0.8" />
  </svg>
);

const GoldRule = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.border})` }} />
    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M 5 0 L 10 5 L 5 10 L 0 5 Z" fill={C.gold} /></svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.border})` }} />
  </div>
);

const NAV_TABS = [
  { id: "home", label: "Home", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "Routes", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "Activity", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "Friends", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "More", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign8() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fb = { fontFamily: "var(--font-body)" };

  return (
    <div className={`${cormorant.variable} ${raleway.variable}`} style={{ minHeight: "100vh", background: "#0A1428", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Premium header */}
        <div style={{ background: C.navy, padding: "14px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 1, height: 24, background: C.gold, marginRight: 4 }} />
              <div style={{ color: C.gold, ...fd, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const }}>
                Grand Tour Series
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, ...fd, fontSize: 11, color: C.silver, letterSpacing: "0.06em", fontStyle: "italic" }}>
              <BikeIcon />
              Cycling
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{ height: 220, position: "relative" }}>
          <MapSVG />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 65%, rgba(255,254,248,0.95))" }} />
        </div>

        {/* Title — centered, grand */}
        <div style={{ textAlign: "center" as const, padding: "10px 24px 0" }}>
          <div style={{ ...fb, fontSize: 10, fontWeight: 600, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 8 }}>
            STAGE REPORT
          </div>
          <h1 style={{ ...fd, fontSize: 38, fontWeight: 300, color: C.dark, margin: "0 0 6px", lineHeight: 1, letterSpacing: "0.02em" }}>
            {mockRoute.title}
          </h1>
          <p style={{ ...fd, fontSize: 18, fontStyle: "italic", color: C.muted, margin: "0 0 6px" }}>{mockRoute.subtitle}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, margin: "0 0 2px" }}>
            <div style={{ height: 1, width: 30, background: C.border }} />
            <span style={{ ...fb, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>{mockRoute.date}</span>
            <div style={{ height: 1, width: 30, background: C.border }} />
          </div>
        </div>

        <div style={{ padding: "0 24px" }}>

          <GoldRule />

          {/* Quick stats — centered trio */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, textAlign: "center" as const, marginBottom: 4 }}>
            {[
              { label: "Distance", value: mockRoute.stats.distance },
              { label: "Duration", value: mockRoute.stats.duration },
              { label: "Elevation", value: mockRoute.stats.elevation },
            ].map((s, i) => (
              <div key={i} style={{ padding: "14px 8px", borderLeft: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ ...fd, fontSize: 24, fontWeight: 500, color: C.navy }}>{s.value}</div>
                <div style={{ ...fb, fontSize: 9, fontWeight: 600, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <GoldRule />

          {/* Performance — elegant two-col */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ ...fb, fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase" as const, textAlign: "center" as const, marginBottom: 16 }}>Performance Data</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              {[
                { l: "Average Power", v: mockRoute.stats.avgPower },
                { l: "Normalized Power", v: mockRoute.stats.normalizedPower },
                { l: "Average Heart Rate", v: mockRoute.stats.avgPulse },
                { l: "Maximum Heart Rate", v: mockRoute.stats.maxPulse },
                { l: "Average Speed", v: mockRoute.stats.avgSpeed },
                { l: "Cadence", v: mockRoute.stats.cadence },
                { l: "Caloric Expenditure", v: mockRoute.stats.calories },
                { l: "Training Stress Score", v: mockRoute.stats.tss },
              ].map((s, i) => (
                <div key={i} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${C.borderLight}` }}>
                  <div style={{ ...fb, fontSize: 10, color: C.muted, letterSpacing: "0.04em", marginBottom: 2 }}>{s.l}</div>
                  <div style={{ ...fd, fontSize: 20, fontWeight: 500, color: C.navy }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <GoldRule />

          {/* Rating */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ ...fb, fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase" as const, textAlign: "center" as const, marginBottom: 16 }}>Route Distinction</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <div style={{ ...fd, fontSize: 56, fontWeight: 300, color: C.navy, lineHeight: 1 }}>{mockRoute.rating}</div>
              <div>
                <Stars rating={mockRoute.rating} uid="m8" size={20} />
                <div style={{ ...fb, fontSize: 11, color: C.muted, marginTop: 6, letterSpacing: "0.04em" }}>{mockRoute.ratingCount} assessments</div>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div key={ri} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 11, fontWeight: 700, color: C.navy, background: C.goldLight }}>{r.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...fd, fontSize: 15, fontWeight: 500, color: C.dark }}>{r.author}</div>
                    <div style={{ ...fb, fontSize: 10, color: C.muted, letterSpacing: "0.04em" }}>{r.date}</div>
                  </div>
                  <Stars rating={r.rating} uid={`r8-${ri}`} size={13} />
                </div>
                <p style={{ ...fd, fontSize: 15, fontStyle: "italic", color: C.muted, margin: 0, lineHeight: 1.65 }}>"{r.text}"</p>
              </div>
            ))}
          </div>

          <GoldRule />

          {/* Comment — elegant */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ ...fb, fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase" as const, textAlign: "center" as const, marginBottom: 16 }}>Rider's Notes</div>
            {isEditing ? (
              <div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit rider's notes"
                  style={{ ...fd, width: "100%", padding: "12px 0", border: "none", borderBottom: `1px solid ${C.gold}`, background: "transparent", color: C.dark, fontSize: 16, lineHeight: 1.7, resize: "none" as const, minHeight: 120, outline: "none", boxSizing: "border-box" as const, fontStyle: "italic" }} />
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button onClick={handleSave} aria-label="Save notes" style={{ ...fb, flex: 1, padding: "10px 0", background: C.navy, color: "white", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Save</button>
                  <button onClick={handleCancel} aria-label="Cancel" style={{ ...fb, flex: 1, padding: "10px 0", background: "none", color: C.muted, border: `1px solid ${C.borderLight}`, fontSize: 11, cursor: "pointer", letterSpacing: "0.06em" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ position: "relative" as const }}>
                <div style={{ position: "absolute", top: 0, left: -4, width: 2, height: "100%", background: C.gold, opacity: 0.5 }} />
                <p style={{ ...fd, fontSize: 17, fontStyle: "italic", fontWeight: 300, color: C.dark, margin: 0, lineHeight: 1.75, paddingLeft: 10 }}>{comment}</p>
                <button onClick={handleEditStart} aria-label="Edit notes" style={{ ...fb, fontSize: 10, color: C.gold, background: "none", border: "none", cursor: "pointer", marginTop: 12, letterSpacing: "0.1em", textDecoration: "underline", textDecorationColor: C.border }}>
                  Edit note
                </button>
              </div>
            )}
          </div>

          <GoldRule />

          {/* Friends — elegant list */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ ...fb, fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase" as const, textAlign: "center" as const, marginBottom: 16 }}>Fellow Riders</div>
            {mockRoute.friends.map((f, i) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: i < mockRoute.friends.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 12, fontWeight: 700, color: "white", background: f.color, opacity: 0.85 }}>{f.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...fd, fontSize: 16, fontWeight: 500, color: C.dark }}>{f.name}</div>
                  <div style={{ ...fb, fontSize: 10, color: C.muted, letterSpacing: "0.04em" }}>
                    {f.status === "finished" ? "Stage completed" : "En route ···"}
                  </div>
                </div>
                {f.status === "in-progress" ? (
                  <span style={{ ...fd, fontSize: 12, fontStyle: "italic", color: C.gold }}>in progress</span>
                ) : (
                  <span style={{ ...fd, fontSize: 17, fontWeight: 500, color: C.navy }}>{f.time}</span>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Nav — navy, gold active */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.navy, borderTop: `1px solid ${C.gold}`, display: "flex", justifyContent: "space-around", padding: "8px 0 12px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "2px 8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? C.gold : C.silver} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.5}>
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fb, fontSize: 9, color: active ? C.gold : C.silver, fontWeight: active ? 600 : 400, letterSpacing: "0.08em", opacity: active ? 1 : 0.5 }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
