"use client";

import { useState } from "react";
import { Bebas_Neue, Nunito } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const C = {
  bg: "#FFFFFF",
  orange: "#FF5500",
  orangeLight: "#FFF0EB",
  dark: "#0A0A0A",
  mid: "#1F1F1F",
  muted: "#6B6B6B",
  border: "#E8E8E8",
  surface: "#F5F5F5",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
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
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${pct}%`} stopColor={C.orange} />
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
    <rect width="400" height="220" fill={C.surface} />
    {/* Bold horizontal stripe */}
    <rect x="0" y="0" width="400" height="4" fill={C.orange} />
    {/* Minimal grid */}
    {[73, 146].map((y) => (
      <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke={C.border} strokeWidth="1" />
    ))}
    {[100, 200, 300].map((x) => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke={C.border} strokeWidth="1" />
    ))}
    {/* Mountain silhouette */}
    <polygon points="100,220 160,80 200,110 240,40 290,70 350,20 400,35 400,220" fill={C.border} opacity="0.5" />
    {/* Route glow */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.orange} strokeWidth="8" fill="none" opacity="0.25" strokeLinecap="round" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.orange} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Markers */}
    <circle cx="44" cy="202" r="6" fill={C.dark} />
    <circle cx="44" cy="202" r="3" fill="white" />
    <circle cx="254" cy="27" r="8" fill={C.orange} />
    <text x="254" y="32" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">▲</text>
    {/* Distance labels */}
    <text x="33" y="216" fontSize="8" fill={C.muted} fontFamily="sans-serif">START</text>
    <text x="237" y="18" fontSize="8" fill={C.orange} fontFamily="sans-serif" fontWeight="bold">SUMMIT</text>
  </svg>
);

const BigStat = ({ label, value, orange }: { label: string; value: string; orange?: boolean }) => (
  <div style={{ textAlign: "center" as const, padding: "16px 8px" }}>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 40, color: orange ? C.orange : C.dark, lineHeight: 1, letterSpacing: "0.02em" }}>{value}</div>
    <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginTop: 4 }}>{label}</div>
  </div>
);

const NAV_TABS = [
  { id: "home", label: "HOME", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "ROUTES", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "ACTIVITY", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "FRIENDS", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "MORE", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign5() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fb = { fontFamily: "var(--font-body)" };

  return (
    <div className={`${bebas.variable} ${nunito.variable}`} style={{ minHeight: "100vh", background: C.surface, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Orange top bar */}
        <div style={{ background: C.orange, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white", ...fd, fontSize: 16, letterSpacing: "0.08em" }}>
            <BikeIcon />
            CYCLING
          </div>
          <span style={{ ...fb, fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Design 5 · Athletic</span>
        </div>

        {/* Hero title over map */}
        <div style={{ position: "relative" }}>
          <div style={{ height: 200, overflow: "hidden" }}>
            <MapSVG />
          </div>
          {/* Title overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 14px" }}>
            <h1 style={{ ...fd, fontSize: 44, color: C.dark, margin: 0, lineHeight: 0.9, letterSpacing: "0.02em", textTransform: "uppercase" as const }}>
              COL DU<br /><span style={{ color: C.orange }}>GALIBIER</span>
            </h1>
            <p style={{ ...fb, fontSize: 12, color: C.muted, margin: "6px 0 0", fontWeight: 700 }}>{mockRoute.date.toUpperCase()}</p>
          </div>
        </div>

        {/* Orange rule */}
        <div style={{ height: 4, background: C.orange }} />

        {/* Primary 3 stats — giant */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ borderRight: `1px solid ${C.border}` }}><BigStat label="km" value="48.2" orange /></div>
          <div style={{ borderRight: `1px solid ${C.border}` }}><BigStat label="Time" value="3:24" /></div>
          <div><BigStat label="Elev +" value="1924" orange /></div>
        </div>

        <div style={{ padding: "0 16px" }}>

          {/* Power/HR highlight row */}
          <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
            <div style={{ flex: 1, background: C.orange, borderRadius: 6, padding: "14px 12px", textAlign: "center" as const }}>
              <div style={{ ...fd, fontSize: 34, color: "white", lineHeight: 1 }}>{mockRoute.stats.avgPower}</div>
              <div style={{ ...fb, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 3 }}>Avg Power</div>
            </div>
            <div style={{ flex: 1, background: C.dark, borderRadius: 6, padding: "14px 12px", textAlign: "center" as const }}>
              <div style={{ ...fd, fontSize: 34, color: "white", lineHeight: 1 }}>{mockRoute.stats.avgPulse}</div>
              <div style={{ ...fb, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 3 }}>Avg HR</div>
            </div>
            <div style={{ flex: 1, background: C.surface, borderRadius: 6, padding: "14px 12px", textAlign: "center" as const, border: `1px solid ${C.border}` }}>
              <div style={{ ...fd, fontSize: 34, color: C.dark, lineHeight: 1 }}>{mockRoute.stats.cadence}</div>
              <div style={{ ...fb, fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 3 }}>RPM</div>
            </div>
          </div>

          {/* Stat bars */}
          <div style={{ marginBottom: 16 }}>
            {[
              { label: "Norm. Power", value: mockRoute.stats.normalizedPower, pct: 88 },
              { label: "Max Heart Rate", value: mockRoute.stats.maxPulse, pct: 95 },
              { label: "Max Speed", value: mockRoute.stats.maxSpeed, pct: 72 },
              { label: "Calories", value: mockRoute.stats.calories, pct: 80 },
              { label: "TSS", value: mockRoute.stats.tss, pct: 73 },
            ].map((s) => (
              <div key={s.label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ ...fb, fontSize: 12, fontWeight: 600, color: C.muted }}>{s.label}</span>
                  <span style={{ ...fd, fontSize: 16, color: C.dark, letterSpacing: "0.02em" }}>{s.value}</span>
                </div>
                <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s.pct}%`, background: C.orange, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Orange rule */}
          <div style={{ height: 2, background: C.orange, margin: "16px 0" }} />

          {/* Rating */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ ...fd, fontSize: 22, letterSpacing: "0.04em", color: C.dark, marginBottom: 12 }}>RATING</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 14 }}>
              <div style={{ ...fd, fontSize: 60, color: C.orange, lineHeight: 1 }}>{mockRoute.rating}</div>
              <div>
                <Stars rating={mockRoute.rating} uid="m5" size={22} />
                <div style={{ ...fb, fontSize: 12, color: C.muted, marginTop: 4, fontWeight: 600 }}>{mockRoute.ratingCount} ratings</div>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div key={ri} style={{ background: C.surface, borderRadius: 8, padding: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 13, color: "white" }}>{r.initials}</div>
                    <div>
                      <div style={{ ...fb, fontSize: 13, fontWeight: 700, color: C.dark }}>{r.author}</div>
                      <div style={{ ...fb, fontSize: 11, color: C.muted }}>{r.date}</div>
                    </div>
                  </div>
                  <Stars rating={r.rating} uid={`r5-${ri}`} size={13} />
                </div>
                <p style={{ ...fb, fontSize: 13, color: C.mid, margin: 0, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>

          {/* Orange rule */}
          <div style={{ height: 2, background: C.orange, margin: "0 0 16px" }} />

          {/* Comment */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ ...fd, fontSize: 22, letterSpacing: "0.04em", color: C.dark }}>MY NOTE</div>
              {!isEditing && (
                <button onClick={handleEditStart} aria-label="Edit note" style={{ ...fb, fontSize: 12, fontWeight: 700, color: "white", background: C.orange, border: "none", borderRadius: 4, padding: "6px 14px", cursor: "pointer", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Edit</button>
              )}
            </div>
            {isEditing ? (
              <div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit your note"
                  style={{ ...fb, width: "100%", padding: 12, border: `2px solid ${C.orange}`, borderRadius: 6, background: C.surface, color: C.dark, fontSize: 13, lineHeight: 1.6, resize: "vertical" as const, minHeight: 110, outline: "none", boxSizing: "border-box" as const, fontWeight: 500 }} />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={handleSave} aria-label="Save" style={{ ...fb, flex: 1, padding: "11px 0", borderRadius: 6, border: "none", background: C.orange, color: "white", fontSize: 13, fontWeight: 800, cursor: "pointer", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>SAVE</button>
                  <button onClick={handleCancel} aria-label="Cancel" style={{ ...fb, flex: 1, padding: "11px 0", borderRadius: 6, border: `2px solid ${C.border}`, background: "white", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>CANCEL</button>
                </div>
              </div>
            ) : (
              <div style={{ borderLeft: `3px solid ${C.orange}`, paddingLeft: 12 }}>
                <p style={{ ...fb, fontSize: 13, color: C.mid, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{comment}</p>
              </div>
            )}
          </div>

          {/* Orange rule */}
          <div style={{ height: 2, background: C.orange, margin: "0 0 16px" }} />

          {/* Friends */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ ...fd, fontSize: 22, letterSpacing: "0.04em", color: C.dark, marginBottom: 12 }}>CREW</div>
            {mockRoute.friends.map((f, i) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ ...fd, fontSize: 20, color: C.muted, width: 20, textAlign: "center" as const }}>{i + 1}</span>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fb, fontSize: 13, fontWeight: 800, color: "white" }}>{f.initials}</div>
                <span style={{ ...fb, fontSize: 14, fontWeight: 700, color: C.dark, flex: 1 }}>{f.name}</span>
                {f.status === "in-progress" ? (
                  <span style={{ ...fb, fontSize: 11, fontWeight: 800, color: C.orange, background: C.orangeLight, padding: "3px 8px", borderRadius: 4 }}>LIVE</span>
                ) : (
                  <span style={{ ...fd, fontSize: 18, color: C.dark }}>{f.time}</span>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Nav */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: "white", borderTop: `3px solid ${C.dark}`, display: "flex", justifyContent: "space-around", padding: "6px 0 10px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", position: "relative" as const }}>
                {active && <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 32, height: 3, background: C.orange }} />}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? C.orange : C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fd, fontSize: 9, color: active ? C.orange : C.muted, letterSpacing: "0.06em" }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
