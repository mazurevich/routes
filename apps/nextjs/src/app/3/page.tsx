"use client";

import { useState } from "react";
import { Syne } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const C = {
  bg: "#F0EDE4",
  black: "#0A0A0A",
  yellow: "#FFD600",
  mid: "#2A2A2A",
  muted: "#6B6458",
  border: "#1A1A1A",
  surface: "#E8E3D8",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
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
              <stop offset={`${pct}%`} stopColor={C.black} />
              <stop offset={`${pct}%`} stopColor={C.surface} />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={`url(#${id})`} stroke={C.black} strokeWidth="0.5" />
        </svg>
      );
    })}
  </div>
);

const MapSVG = () => (
  <svg viewBox="0 0 400 220" style={{ width: "100%", height: "100%", display: "block" }}>
    <rect width="400" height="220" fill={C.surface} />
    {/* Heavy grid */}
    {[44, 88, 132, 176].map((y) => (
      <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke={C.black} strokeWidth="0.75" />
    ))}
    {[80, 160, 240, 320].map((x) => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke={C.black} strokeWidth="0.75" />
    ))}
    {/* Yellow highlight block behind route area */}
    <rect x="30" y="18" width="235" height="192" fill={C.yellow} opacity="0.12" />
    {/* Elevation blocks */}
    <polygon points="60,180 120,140 180,100 240,60 300,40 300,220 60,220" fill={C.black} opacity="0.06" />
    {/* Grid coords */}
    <text x="4" y="42" fontSize="8" fill={C.muted} fontFamily="monospace" opacity="0.5">A</text>
    <text x="4" y="86" fontSize="8" fill={C.muted} fontFamily="monospace" opacity="0.5">B</text>
    <text x="4" y="130" fontSize="8" fill={C.muted} fontFamily="monospace" opacity="0.5">C</text>
    <text x="4" y="174" fontSize="8" fill={C.muted} fontFamily="monospace" opacity="0.5">D</text>
    {/* Route path with yellow glow */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.yellow} strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.black} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0" />
    <rect x="38" y="196" width="14" height="14" fill={C.black} />
    <text x="45" y="207" textAnchor="middle" fontSize="8" fill={C.yellow} fontWeight="bold">S</text>
    <rect x="247" y="20" width="14" height="14" fill={C.yellow} />
    <text x="254" y="31" textAnchor="middle" fontSize="8" fill={C.black} fontWeight="bold">▲</text>
  </svg>
);

const NAV_TABS = [
  { id: "home", label: "HOME", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "ROUTES", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "LOG", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "CREW", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "MORE", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign3() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fm = { fontFamily: "var(--font-mono)" };

  return (
    <div className={`${syne.variable} ${spaceMono.variable}`} style={{ minHeight: "100vh", background: C.black, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Header */}
        <div style={{ background: C.black, padding: "16px 16px 12px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 80, height: "100%", background: C.yellow }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ background: C.yellow, color: C.black, padding: "6px 8px", display: "flex", alignItems: "center", gap: 6, ...fd, fontSize: 11, fontWeight: 800, letterSpacing: "0.08em" }}>
                <BikeIcon />
                CYCLING
              </div>
              <div style={{ ...fm, fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 8, letterSpacing: "0.06em" }}>DESIGN 03 / BRUTALIST</div>
            </div>
          </div>
        </div>

        {/* Giant title — bleeds out */}
        <div style={{ background: C.black, padding: "0 16px 16px", borderBottom: `4px solid ${C.yellow}` }}>
          <h1 style={{ ...fd, fontSize: 38, fontWeight: 800, color: "white", margin: 0, lineHeight: 0.95, textTransform: "uppercase" as const, letterSpacing: "-0.01em" }}>
            COL DU<br />
            <span style={{ color: C.yellow }}>GALIBIER</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <span style={{ ...fm, fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>SAT 15.03.2026</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.yellow, display: "inline-block" }} />
            <span style={{ ...fm, fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>48.2 KM</span>
          </div>
        </div>

        {/* Map */}
        <div style={{ height: 200, borderBottom: `2px solid ${C.black}` }}>
          <MapSVG />
        </div>

        <div style={{ padding: "0 16px" }}>

          {/* Stats — brutalist table */}
          <div style={{ borderBottom: `2px solid ${C.black}`, paddingBottom: 0, marginBottom: 0 }}>
            <div style={{ background: C.yellow, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ ...fd, fontSize: 11, fontWeight: 800, color: C.black, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>STRAVA DATA</span>
            </div>
            {[
              ["DURATION", mockRoute.stats.duration, "DISTANCE", mockRoute.stats.distance],
              ["ELEVATION", mockRoute.stats.elevation, "CALORIES", mockRoute.stats.calories],
              ["AVG POWER", mockRoute.stats.avgPower, "NRM POWER", mockRoute.stats.normalizedPower],
              ["AVG HR", mockRoute.stats.avgPulse, "MAX HR", mockRoute.stats.maxPulse],
              ["AVG SPEED", mockRoute.stats.avgSpeed, "CADENCE", mockRoute.stats.cadence],
              ["TSS", mockRoute.stats.tss, "MAX SPEED", mockRoute.stats.maxSpeed],
            ].map(([l1, v1, l2, v2], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${C.border}` }}>
                <div style={{ padding: "10px 12px", borderRight: `1px solid ${C.border}` }}>
                  <div style={{ ...fm, fontSize: 9, color: C.muted, letterSpacing: "0.08em", marginBottom: 2 }}>{l1}</div>
                  <div style={{ ...fd, fontSize: 18, fontWeight: 800, color: C.black }}>{v1}</div>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ ...fm, fontSize: 9, color: C.muted, letterSpacing: "0.08em", marginBottom: 2 }}>{l2}</div>
                  <div style={{ ...fd, fontSize: 18, fontWeight: 800, color: C.black }}>{v2}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div style={{ paddingTop: 0 }}>
            <div style={{ background: C.black, padding: "8px 12px" }}>
              <span style={{ ...fd, fontSize: 11, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em" }}>ROUTE RATING</span>
            </div>
            <div style={{ border: `2px solid ${C.black}`, borderTop: "none", padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                <div>
                  <div style={{ ...fd, fontSize: 60, fontWeight: 800, color: C.black, lineHeight: 1 }}>{mockRoute.rating}</div>
                  <div style={{ ...fm, fontSize: 9, color: C.muted, letterSpacing: "0.06em" }}>OUT OF 5.0</div>
                </div>
                <div>
                  <Stars rating={mockRoute.rating} uid="m3" size={22} />
                  <div style={{ ...fm, fontSize: 9, color: C.muted, marginTop: 4 }}>{mockRoute.ratingCount} RATINGS</div>
                </div>
              </div>
              {mockRoute.reviews.map((r, ri) => (
                <div key={ri} style={{ borderTop: `1px solid ${C.black}`, paddingTop: 10, marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 28, height: 28, background: C.black, display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 10, fontWeight: 700, color: C.yellow }}>{r.initials}</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ ...fd, fontSize: 12, fontWeight: 700, color: C.black }}>{r.author}</span>
                      <span style={{ ...fm, fontSize: 9, color: C.muted, marginLeft: 8 }}>{r.date}</span>
                    </div>
                    <Stars rating={r.rating} uid={`r3-${ri}`} size={11} />
                  </div>
                  <p style={{ ...fm, fontSize: 11, color: C.mid, margin: 0, lineHeight: 1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div style={{ marginTop: 2 }}>
            <div style={{ background: C.yellow, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...fd, fontSize: 11, fontWeight: 800, color: C.black, letterSpacing: "0.1em" }}>MY NOTE</span>
              {!isEditing && (
                <button onClick={handleEditStart} aria-label="Edit note" style={{ ...fd, fontSize: 10, fontWeight: 800, color: C.yellow, background: C.black, border: "none", padding: "3px 10px", cursor: "pointer", letterSpacing: "0.08em" }}>EDIT →</button>
              )}
            </div>
            <div style={{ border: `2px solid ${C.black}`, borderTop: "none" }}>
              {isEditing ? (
                <div style={{ padding: 12 }}>
                  <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit your note"
                    style={{ ...fm, width: "100%", padding: 10, border: `2px solid ${C.black}`, background: C.surface, color: C.black, fontSize: 12, lineHeight: 1.6, resize: "vertical" as const, minHeight: 110, outline: "none", boxSizing: "border-box" as const }} />
                  <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                    <button onClick={handleSave} aria-label="Save" style={{ ...fd, flex: 1, padding: "10px 0", border: "2px solid", borderColor: C.black, background: C.black, color: C.yellow, fontSize: 12, fontWeight: 800, cursor: "pointer", letterSpacing: "0.08em" }}>SAVE</button>
                    <button onClick={handleCancel} aria-label="Cancel" style={{ ...fd, flex: 1, padding: "10px 0", border: "2px solid", borderColor: C.black, background: C.bg, color: C.black, fontSize: 12, fontWeight: 800, cursor: "pointer", letterSpacing: "0.08em" }}>CANCEL</button>
                  </div>
                </div>
              ) : (
                <p style={{ ...fm, fontSize: 12, color: C.mid, margin: 0, padding: "12px 14px", lineHeight: 1.6 }}>{comment}</p>
              )}
            </div>
          </div>

          {/* Friends */}
          <div style={{ marginTop: 2, marginBottom: 16 }}>
            <div style={{ background: C.black, padding: "8px 12px" }}>
              <span style={{ ...fd, fontSize: 11, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em" }}>THE CREW</span>
            </div>
            <div style={{ border: `2px solid ${C.black}`, borderTop: "none" }}>
              {mockRoute.friends.map((f, i) => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderTop: i > 0 ? `1px solid ${C.black}` : "none" }}>
                  <span style={{ ...fd, fontSize: 12, fontWeight: 800, color: C.muted, width: 14 }}>{i + 1}</span>
                  <div style={{ width: 32, height: 32, background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 12, fontWeight: 800, color: "white" }}>{f.initials}</div>
                  <span style={{ ...fd, fontSize: 14, fontWeight: 700, color: C.black, flex: 1 }}>{f.name}</span>
                  <span style={{ ...fm, fontSize: 13, fontWeight: 700, color: f.status === "in-progress" ? C.yellow : C.black, background: f.status === "in-progress" ? C.black : "transparent", padding: f.status === "in-progress" ? "2px 6px" : "0" }}>
                    {f.status === "in-progress" ? "LIVE" : f.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Nav */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.bg, borderTop: `3px solid ${C.black}`, display: "flex", justifyContent: "space-around", padding: "6px 0 8px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: active ? C.yellow : "none", border: "none", cursor: "pointer", padding: "6px 10px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? C.black : C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fd, fontSize: 8, color: active ? C.black : C.muted, fontWeight: 800, letterSpacing: "0.08em" }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
