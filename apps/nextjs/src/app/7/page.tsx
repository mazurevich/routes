"use client";

import { useState } from "react";
import { Oxanium, Share_Tech_Mono } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const shareMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

const C = {
  bg: "#F4F2EC",
  olive: "#4E5E2A",
  oliveLight: "#E4E8D4",
  amber: "#C8881A",
  amberLight: "#FFF4D6",
  dark: "#2A2E18",
  mid: "#3E4428",
  muted: "#7A7E5E",
  border: "#B8BCA0",
  surface: "#EAE8DC",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
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
              <stop offset={`${pct}%`} stopColor={C.amber} />
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
    <rect width="400" height="220" fill="#DDD8C4" />
    {/* Topo grid */}
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={`h${i}`} x1="0" y1={44 * (i + 1)} x2="400" y2={44 * (i + 1)} stroke="#C4BE9E" strokeWidth="0.5" />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={`v${i}`} x1={80 * (i + 1)} y1="0" x2={80 * (i + 1)} y2="220" stroke="#C4BE9E" strokeWidth="0.5" />
    ))}
    {/* Grid coordinates */}
    {["A", "B", "C", "D"].map((l, i) => (
      <text key={l} x="4" y={44 * (i + 1) - 4} fontSize="7" fill="#8A8660" fontFamily="monospace">{l}</text>
    ))}
    {[1, 2, 3, 4, 5].map((n, i) => (
      <text key={n} x={80 * (i + 1) - 10} y="10" fontSize="7" fill="#8A8660" fontFamily="monospace">{n}</text>
    ))}
    {/* Contour lines */}
    <path d="M 20 170 Q 80 165 130 158 Q 180 151 220 138 Q 260 125 300 112 Q 340 99 380 90" stroke="#B4B090" strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M 20 145 Q 80 137 130 128 Q 180 119 220 106 Q 260 93 300 80 Q 340 67 380 55" stroke="#B4B090" strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M 80 120 Q 130 109 180 96 Q 220 85 260 72 Q 300 59 340 48" stroke="#B4B090" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* High terrain area fill */}
    <path d="M 150 220 Q 200 100 260 50 Q 320 20 400 15 L 400 220 Z" fill="#C8C0A0" opacity="0.25" />
    {/* Route path — tactical amber */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.amber} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8,3" />
    {/* Objective markers */}
    <rect x="38" y="196" width="12" height="12" fill={C.olive} />
    <text x="44" y="206" textAnchor="middle" fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold">SP</text>
    <rect x="247" y="20" width="14" height="14" fill={C.amber} />
    <text x="254" y="31" textAnchor="middle" fontSize="8" fill={C.dark} fontFamily="monospace" fontWeight="bold">EP</text>
    {/* Km markers */}
    <circle cx="108" cy="180" r="3" fill={C.olive} opacity="0.7" />
    <circle cx="170" cy="108" r="3" fill={C.olive} opacity="0.7" />
    <text x="32" y="218" fontSize="7" fill={C.muted} fontFamily="monospace">SP-1</text>
    <text x="238" y="16" fontSize="7" fill={C.amber} fontFamily="monospace">2645M</text>
  </svg>
);

const TacRow = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: C.muted, letterSpacing: "0.06em" }}>{label}</span>
    <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: C.dark, letterSpacing: "0.04em" }}>{value}</span>
  </div>
);

const NAV_TABS = [
  { id: "home", label: "BASE", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "MAP", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "OPS", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "SQUAD", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "COMMS", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign7() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fm = { fontFamily: "var(--font-mono)" };

  return (
    <div className={`${oxanium.variable} ${shareMono.variable}`} style={{ minHeight: "100vh", background: "#2A2E18", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Tactical header */}
        <div style={{ background: C.dark, padding: "10px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ background: C.olive, padding: "4px 8px", display: "flex", alignItems: "center", gap: 5, color: "white", ...fd, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>
                <BikeIcon />CYCLING
              </div>
              <span style={{ ...fm, fontSize: 8, color: C.muted, letterSpacing: "0.1em" }}>OPS-LOG / DESIGN-07</span>
            </div>
            <div style={{ ...fm, fontSize: 9, color: C.amber, letterSpacing: "0.04em" }}>15.03.26 // 09:14</div>
          </div>
        </div>

        {/* Map grid */}
        <div style={{ height: 200, borderBottom: `2px solid ${C.olive}`, position: "relative" }}>
          <MapSVG />
          <div style={{ position: "absolute", bottom: 6, left: 8, ...fm, fontSize: 8, color: C.muted, letterSpacing: "0.06em" }}>GRID REF: 45°N 6°E // SCALE 1:50000</div>
        </div>

        {/* Objective header */}
        <div style={{ background: C.olive, padding: "10px 14px", borderBottom: `1px solid ${C.amber}` }}>
          <h1 style={{ ...fd, fontSize: 22, fontWeight: 800, color: "white", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
            {mockRoute.title.toUpperCase()}
          </h1>
          <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
            <span style={{ ...fm, fontSize: 9, color: "rgba(255,255,255,0.6)" }}>D: 48.2 KM</span>
            <span style={{ ...fm, fontSize: 9, color: "rgba(255,255,255,0.6)" }}>T: 3H24M</span>
            <span style={{ ...fm, fontSize: 9, color: C.amber }}>ELEV: +1924M</span>
          </div>
        </div>

        <div style={{ padding: "0 14px" }}>

          {/* Performance intel */}
          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <div style={{ ...fm, fontSize: 9, color: C.muted, letterSpacing: "0.12em", marginBottom: 4, padding: "0 0 4px", borderBottom: `1px solid ${C.olive}` }}>
              ▶ PERFORMANCE INTEL
            </div>
            <div style={{ border: `1px solid ${C.border}` }}>
              <TacRow label="PWR AVG" value={mockRoute.stats.avgPower} />
              <TacRow label="PWR NRM" value={mockRoute.stats.normalizedPower} />
              <TacRow label="HR AVG" value={mockRoute.stats.avgPulse} />
              <TacRow label="HR MAX" value={mockRoute.stats.maxPulse} />
              <TacRow label="SPD AVG" value={mockRoute.stats.avgSpeed} />
              <TacRow label="SPD MAX" value={mockRoute.stats.maxSpeed} />
              <TacRow label="CAD RPM" value={mockRoute.stats.cadence} />
              <TacRow label="KCAL" value={mockRoute.stats.calories} />
              <TacRow label="TSS IDX" value={mockRoute.stats.tss} />
            </div>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ ...fm, fontSize: 9, color: C.muted, letterSpacing: "0.12em", marginBottom: 4, padding: "0 0 4px", borderBottom: `1px solid ${C.olive}` }}>
              ▶ ROUTE ASSESSMENT
            </div>
            <div style={{ border: `1px solid ${C.border}`, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <div style={{ ...fd, fontSize: 44, fontWeight: 800, color: C.amber, lineHeight: 1 }}>{mockRoute.rating}</div>
                <div>
                  <Stars rating={mockRoute.rating} uid="m7" size={18} />
                  <div style={{ ...fm, fontSize: 9, color: C.muted, marginTop: 4 }}>{mockRoute.ratingCount} FIELD REPORTS</div>
                </div>
              </div>
              {mockRoute.reviews.map((r, ri) => (
                <div key={ri} style={{ borderTop: `1px dashed ${C.border}`, paddingTop: 10, marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 28, height: 28, background: C.olive, display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 11, fontWeight: 700, color: "white" }}>{r.initials}</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ ...fd, fontSize: 12, fontWeight: 700, color: C.dark }}>{r.author}</span>
                      <span style={{ ...fm, fontSize: 9, color: C.muted, marginLeft: 8 }}>{r.date}</span>
                    </div>
                    <Stars rating={r.rating} uid={`r7-${ri}`} size={11} />
                  </div>
                  <p style={{ ...fm, fontSize: 11, color: C.mid, margin: 0, lineHeight: 1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SITREP — comment */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ ...fm, fontSize: 9, color: C.muted, letterSpacing: "0.12em", marginBottom: 4, padding: "0 0 4px", borderBottom: `1px solid ${C.olive}` }}>
              ▶ SITREP / FIELD NOTES
            </div>
            <div style={{ border: `1px solid ${C.border}` }}>
              {isEditing ? (
                <div style={{ padding: 10 }}>
                  <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit field notes"
                    style={{ ...fm, width: "100%", padding: 8, border: `1px solid ${C.olive}`, background: C.oliveLight, color: C.dark, fontSize: 11, lineHeight: 1.6, resize: "vertical" as const, minHeight: 100, outline: "none", boxSizing: "border-box" as const }} />
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button onClick={handleSave} aria-label="Save" style={{ ...fd, flex: 1, padding: "8px 0", background: C.olive, color: "white", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>CONFIRM</button>
                    <button onClick={handleCancel} aria-label="Cancel" style={{ ...fd, flex: 1, padding: "8px 0", background: C.surface, color: C.muted, border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>ABORT</button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: 10, position: "relative" as const }}>
                  <p style={{ ...fm, fontSize: 11, color: C.mid, margin: 0, lineHeight: 1.6, paddingRight: 60 }}>{comment}</p>
                  <button onClick={handleEditStart} aria-label="Edit SITREP" style={{ position: "absolute", top: 10, right: 10, ...fm, fontSize: 9, color: C.amber, background: "none", border: `1px solid ${C.amber}`, padding: "3px 7px", cursor: "pointer", letterSpacing: "0.06em" }}>EDIT</button>
                </div>
              )}
            </div>
          </div>

          {/* Squad */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ ...fm, fontSize: 9, color: C.muted, letterSpacing: "0.12em", marginBottom: 4, padding: "0 0 4px", borderBottom: `1px solid ${C.olive}` }}>
              ▶ SQUAD STATUS
            </div>
            <div style={{ border: `1px solid ${C.border}` }}>
              {mockRoute.friends.map((f, i) => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderBottom: i < mockRoute.friends.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ ...fm, fontSize: 9, color: C.muted, width: 12 }}>0{i + 1}</span>
                  <div style={{ width: 28, height: 28, background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 11, fontWeight: 700, color: "white" }}>{f.initials}</div>
                  <span style={{ ...fd, fontSize: 13, fontWeight: 600, color: C.dark, flex: 1 }}>{f.name.toUpperCase()}</span>
                  <span style={{ ...fm, fontSize: 11, color: f.status === "in-progress" ? C.amber : C.olive, background: f.status === "in-progress" ? C.amberLight : C.oliveLight, padding: "2px 6px" }}>
                    {f.status === "in-progress" ? "EN ROUTE" : f.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Nav */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.dark, borderTop: `2px solid ${C.olive}`, display: "flex", justifyContent: "space-around", padding: "6px 0 8px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: active ? C.olive : "none", border: "none", cursor: "pointer", padding: "5px 10px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fm, fontSize: 8, color: active ? "white" : C.muted, letterSpacing: "0.08em" }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
