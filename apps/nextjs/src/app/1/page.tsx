"use client";

import { useState } from "react";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
});

const C = {
  bg: "#F5F0E8",
  surface: "#EDE9DF",
  green: "#2D5A27",
  orange: "#E06C2E",
  brown: "#3C2E1E",
  muted: "#7A6E5C",
  border: "#D4CABA",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 0 0-1 1v5l-3 3" />
    <path d="m9 17 2-5 4-1" />
    <path d="M7 7h5l2 4" />
  </svg>
);

const Stars = ({ rating, color, bg, uid, size = 16 }: { rating: number; color: string; bg: string; uid: string; size?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => {
      const pct = Math.round(Math.min(100, Math.max(0, (rating - (i - 1)) * 100)));
      const id = `${uid}-${i}`;
      return (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${pct}%`} stopColor={color} />
              <stop offset={`${pct}%`} stopColor={bg} />
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
    <rect width="400" height="220" fill="#E2D9C4" />
    {[44, 88, 132, 176].map((y) => (
      <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#C8BB9A" strokeWidth="0.5" />
    ))}
    {[80, 160, 240, 320].map((x) => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="#C8BB9A" strokeWidth="0.5" />
    ))}
    <ellipse cx="170" cy="110" rx="130" ry="80" fill="#D6C9A4" opacity="0.7" />
    <ellipse cx="200" cy="80" rx="100" ry="60" fill="#C8BA90" opacity="0.6" />
    <ellipse cx="225" cy="55" rx="70" ry="42" fill="#BCA87A" opacity="0.5" />
    <path d="M 0 155 L 130 150 L 148 135" stroke="#B0A47E" strokeWidth="1.5" fill="none" strokeDasharray="4,3" />
    <path d="M 290 0 L 270 30 L 254 27" stroke="#B0A47E" strokeWidth="1.5" fill="none" strokeDasharray="4,3" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke="#1A1208" strokeWidth="5" fill="none" opacity="0.15" strokeLinecap="round" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.orange} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="44" cy="202" r="7" fill={C.green} />
    <text x="44" y="207" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">S</text>
    <circle cx="254" cy="27" r="7" fill={C.orange} />
    <text x="254" y="31" textAnchor="middle" fontSize="9" fill="white">▲</text>
    <circle cx="108" cy="180" r="3" fill={C.orange} opacity="0.7" />
    <circle cx="170" cy="108" r="3" fill={C.orange} opacity="0.7" />
    <text x="28" y="215" fontSize="8" fill={C.muted} fontFamily="sans-serif">Valloire</text>
    <text x="240" y="18" fontSize="8" fill={C.orange} fontFamily="sans-serif" fontWeight="bold">2645 m</text>
  </svg>
);

const NAV_TABS = [
  { id: "home", label: "Home", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "Routes", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "Activity", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "Friends", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "More", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign1() {
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

  const ff = { fontFamily: "var(--font-body)" };
  const fd = { fontFamily: "var(--font-display)" };

  return (
    <div className={`${playfair.variable} ${sourceSans.variable}`} style={{ minHeight: "100vh", background: "#DED9CE", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", position: "relative", paddingBottom: 88 }}>

        {/* Map Hero */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <MapSVG />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${C.bg})` }} />
          <div style={{ position: "absolute", top: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ background: "rgba(245,240,232,0.88)", backdropFilter: "blur(6px)", borderRadius: 8, padding: "4px 10px", ...ff }}>
              <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Design 1 · Alpine</span>
            </div>
            <div style={{ background: C.green, color: "white", borderRadius: 20, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, ...ff, fontSize: 12, fontWeight: 600 }}>
              <BikeIcon />
              Cycling
            </div>
          </div>
        </div>

        <div style={{ padding: "0 20px" }}>

          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ ...fd, fontSize: 30, fontWeight: 700, color: C.brown, lineHeight: 1.1, margin: "0 0 4px" }}>
              {mockRoute.title}
            </h1>
            <p style={{ ...ff, fontSize: 13, color: C.muted, margin: 0 }}>{mockRoute.date}</p>
          </div>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
            {[
              { label: "Distance", value: mockRoute.stats.distance },
              { label: "Duration", value: mockRoute.stats.duration },
              { label: "Elevation", value: mockRoute.stats.elevation },
            ].map((s) => (
              <div key={s.label} style={{ background: C.surface, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                <div style={{ ...fd, fontSize: 16, fontWeight: 700, color: C.green, lineHeight: 1 }}>{s.value}</div>
                <div style={{ ...ff, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 20 }} />

          {/* Performance stats */}
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.brown, margin: "0 0 12px" }}>Performance</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { label: "Avg Power", value: mockRoute.stats.avgPower },
                { label: "Norm. Power", value: mockRoute.stats.normalizedPower },
                { label: "Avg Heart Rate", value: mockRoute.stats.avgPulse },
                { label: "Max Heart Rate", value: mockRoute.stats.maxPulse },
                { label: "Avg Speed", value: mockRoute.stats.avgSpeed },
                { label: "Cadence", value: mockRoute.stats.cadence },
                { label: "Calories", value: mockRoute.stats.calories },
                { label: "TSS", value: mockRoute.stats.tss },
              ].map((s) => (
                <div key={s.label} style={{ background: C.surface, borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ ...ff, fontSize: 11, color: C.muted }}>{s.label}</span>
                  <span style={{ ...ff, fontSize: 13, fontWeight: 600, color: C.brown }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 20 }} />

          {/* Rating */}
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.brown, margin: "0 0 12px" }}>Rating & Reviews</h2>
            <div style={{ background: C.surface, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
              <div style={{ ...fd, fontSize: 52, fontWeight: 700, color: C.green, lineHeight: 1 }}>{mockRoute.rating}</div>
              <div>
                <Stars rating={mockRoute.rating} color={C.orange} bg={C.border} uid="main" size={18} />
                <p style={{ ...ff, fontSize: 12, color: C.muted, margin: "4px 0 0" }}>{mockRoute.ratingCount} ratings</p>
              </div>
            </div>
            {mockRoute.reviews.map((r, ri) => (
              <div key={ri} style={{ background: C.surface, borderRadius: 12, padding: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", ...ff, fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0 }}>
                    {r.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...ff, fontSize: 13, fontWeight: 600, color: C.brown }}>{r.author}</div>
                    <div style={{ ...ff, fontSize: 11, color: C.muted }}>{r.date}</div>
                  </div>
                  <Stars rating={r.rating} color={C.orange} bg={C.border} uid={`rev-${ri}`} size={13} />
                </div>
                <p style={{ ...ff, fontSize: 13, color: "#4A3D2E", margin: 0, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 20 }} />

          {/* Comment */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.brown, margin: 0 }}>My Note</h2>
              {!isEditing && (
                <button onClick={handleEditStart} aria-label="Edit note" style={{ ...ff, fontSize: 12, fontWeight: 600, color: C.green, background: C.surface, border: "none", borderRadius: 16, padding: "5px 14px", cursor: "pointer" }}>
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
                  style={{ ...ff, width: "100%", padding: 14, borderRadius: 12, border: `2px solid ${C.green}`, background: C.surface, color: C.brown, fontSize: 13, lineHeight: 1.6, resize: "vertical", minHeight: 120, outline: "none", boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={handleSave} aria-label="Save note" style={{ ...ff, flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: C.green, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Save
                  </button>
                  <button onClick={handleCancel} aria-label="Cancel editing" style={{ ...ff, flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface, color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: C.surface, borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ ...ff, fontSize: 13, color: "#3C2E1E", lineHeight: 1.65, margin: 0 }}>{comment}</p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 20 }} />

          {/* Friends */}
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ ...fd, fontSize: 18, fontWeight: 600, color: C.brown, margin: "0 0 12px" }}>Riding Together</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {mockRoute.friends.map((f) => (
                <div key={f.id} style={{ background: C.surface, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...ff, fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>
                    {f.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...ff, fontSize: 13, fontWeight: 600, color: C.brown }}>{f.name}</div>
                    <div style={{ ...ff, fontSize: 11, color: C.muted }}>
                      {f.status === "finished" ? "Finished" : "In progress ···"}
                    </div>
                  </div>
                  <div style={{ ...ff, fontSize: 14, fontWeight: 700, color: f.status === "in-progress" ? C.orange : C.green }}>{f.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.bg, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 10px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "2px 8px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? C.green : C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...ff, fontSize: 10, color: active ? C.green : C.muted, fontWeight: active ? 600 : 400 }}>{tab.label}</span>
                {active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.green, marginTop: -1 }} />}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
