"use client";

import { useState } from "react";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { mockRoute } from "../_components/route-details/routeDetailsData";

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const C = {
  bg: "#FFFFFF",
  cyan: "#00BCD4",
  cyanDim: "#E0F7FA",
  coral: "#FF4458",
  coralDim: "#FFE8EA",
  dark: "#0B0C10",
  mid: "#1F2329",
  muted: "#4A5260",
  border: "#E2E5EA",
  surface: "#F7F8FA",
  gridLine: "#EAECF0",
};

const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
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
              <stop offset={`${pct}%`} stopColor={C.coral} />
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
    <rect width="400" height="220" fill={C.dark} />
    {/* Data grid */}
    {[44, 88, 132, 176].map((y) => (
      <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(0,188,212,0.12)" strokeWidth="1" />
    ))}
    {[80, 160, 240, 320].map((x) => (
      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="rgba(0,188,212,0.12)" strokeWidth="1" />
    ))}
    {/* Elevation fill */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27 L 254 220 L 44 220 Z"
      fill="rgba(0,188,212,0.08)" />
    {/* Route */}
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke="rgba(0,188,212,0.4)" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M 44 202 C 68 198 90 192 108 180 C 126 168 132 154 140 141 C 148 128 162 121 170 108 C 178 95 171 80 180 68 C 189 56 202 49 218 41 C 228 36 240 32 254 27"
      stroke={C.cyan} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Data point markers */}
    {[
      [44, 202, "0km"],
      [108, 180, "12km"],
      [170, 108, "28km"],
      [254, 27, "48km"],
    ].map(([x, y, label]) => (
      <g key={String(label)}>
        <circle cx={Number(x)} cy={Number(y)} r="4" fill={C.dark} stroke={C.cyan} strokeWidth="1.5" />
        <text x={Number(x)} y={Number(y) - 8} textAnchor="middle" fontSize="7" fill={C.cyan} fontFamily="monospace">{String(label)}</text>
      </g>
    ))}
    {/* Elevation labels */}
    <text x="262" y="31" fontSize="8" fill="rgba(0,188,212,0.7)" fontFamily="monospace">2645m</text>
    <text x="4" y="216" fontSize="8" fill="rgba(0,188,212,0.5)" fontFamily="monospace">860m</text>
  </svg>
);

/* Elevation profile SVG chart */
const ElevationChart = () => {
  const points = [
    [0, 80], [20, 77], [45, 72], [70, 63], [95, 54],
    [120, 46], [145, 40], [165, 35], [185, 30], [205, 26],
    [220, 23], [240, 20], [258, 17], [270, 16],
  ];
  const pathD = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x * 1.35} ${y}`).join(" ");
  const fillD = pathD + ` L ${270 * 1.35} 90 L 0 90 Z`;

  return (
    <svg viewBox="0 0 370 95" style={{ width: "100%", height: 80, display: "block" }}>
      <defs>
        <linearGradient id="elev-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.cyan} stopOpacity="0.3" />
          <stop offset="100%" stopColor={C.cyan} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[30, 60, 90].map((y) => (
        <line key={y} x1="0" y1={y} x2="370" y2={y} stroke={C.gridLine} strokeWidth="1" />
      ))}
      {/* Fill */}
      <path d={fillD} fill="url(#elev-grad)" />
      {/* Line */}
      <path d={pathD} stroke={C.cyan} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Axis labels */}
      <text x="2" y="88" fontSize="8" fill={C.muted} fontFamily="monospace">0</text>
      <text x="90" y="88" fontSize="8" fill={C.muted} fontFamily="monospace">12km</text>
      <text x="186" y="88" fontSize="8" fill={C.muted} fontFamily="monospace">28km</text>
      <text x="335" y="88" fontSize="8" fill={C.muted} fontFamily="monospace">48km</text>
    </svg>
  );
};

/* Donut ring chart */
const RingChart = ({ value, max, label, color, size = 64 }: { value: number; max: number; label: string; color: string; size?: number }) => {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const pct = value / max;
  const dash = circ * pct;
  const cx = size / 2;
  const cy = size / 2;
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 3 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.gridLine} strokeWidth="5" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fill={C.dark} fontFamily="monospace" fontWeight="500">{Math.round(pct * 100)}%</text>
      </svg>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: C.muted, textAlign: "center" as const, letterSpacing: "0.04em" }}>{label}</span>
    </div>
  );
};

const DataRow = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "7px 0", borderBottom: `1px solid ${C.gridLine}` }}>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: C.muted, letterSpacing: "0.04em" }}>{label}</span>
    <span style={{ fontFamily: mono ? "var(--font-mono)" : "var(--font-display)", fontSize: 13, fontWeight: 600, color: C.dark }}>{value}</span>
  </div>
);

const NAV_TABS = [
  { id: "home", label: "home", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "routes", label: "routes", d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
  { id: "activity", label: "activity", d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "friends", label: "social", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
  { id: "more", label: "more", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
];

export default function RouteDesign10() {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(mockRoute.defaultComment);
  const [draft, setDraft] = useState(comment);

  const handleEditStart = () => { setDraft(comment); setIsEditing(true); };
  const handleSave = () => { setComment(draft); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setDraft(comment); };

  const fd = { fontFamily: "var(--font-display)" };
  const fm = { fontFamily: "var(--font-mono)" };

  return (
    <div className={`${ibmSans.variable} ${ibmMono.variable}`} style={{ minHeight: "100vh", background: C.surface, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, background: C.bg, minHeight: "100vh", paddingBottom: 88 }}>

        {/* Header — minimal bar */}
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.cyan }} />
            <span style={{ ...fm, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>ACTIVITY / CYCLING</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: C.muted, ...fm, fontSize: 10 }}>
            <BikeIcon />
            <span>D.10 OBS</span>
          </div>
        </div>

        {/* Map — dark sci-fi */}
        <div style={{ height: 200, borderBottom: `1px solid ${C.border}`, position: "relative" }}>
          <MapSVG />
          {/* Overlay data */}
          <div style={{ position: "absolute", top: 10, left: 12, right: 12, display: "flex", justifyContent: "space-between" }}>
            {[
              { l: "D", v: "48.2km" },
              { l: "T", v: "3h24m" },
              { l: "↑", v: "1924m" },
            ].map((s) => (
              <div key={s.l} style={{ background: "rgba(11,12,16,0.7)", padding: "4px 10px", border: `1px solid rgba(0,188,212,0.3)` }}>
                <span style={{ ...fm, fontSize: 9, color: "rgba(0,188,212,0.6)" }}>{s.l}: </span>
                <span style={{ ...fm, fontSize: 11, color: C.cyan, fontWeight: 700 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Title block */}
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ ...fd, fontSize: 22, fontWeight: 700, color: C.dark, margin: "0 0 3px", letterSpacing: "-0.01em" }}>
                {mockRoute.title}
              </h1>
              <p style={{ ...fm, fontSize: 10, color: C.muted, margin: 0, letterSpacing: "0.04em" }}>{mockRoute.date.toUpperCase()}</p>
            </div>
            <div style={{ background: C.cyanDim, border: `1px solid ${C.cyan}`, padding: "4px 10px" }}>
              <span style={{ ...fm, fontSize: 10, color: C.cyan, fontWeight: 700 }}>COMPLETED</span>
            </div>
          </div>
        </div>

        <div style={{ padding: "14px 16px 0" }}>

          {/* Elevation profile */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ ...fm, fontSize: 10, color: C.muted, letterSpacing: "0.08em" }}>ELEVATION PROFILE</span>
              <span style={{ ...fm, fontSize: 10, color: C.cyan }}>+1924m ↑</span>
            </div>
            <div style={{ border: `1px solid ${C.border}`, padding: "8px 10px 2px" }}>
              <ElevationChart />
            </div>
          </div>

          {/* Ring charts — effort metrics */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ ...fm, fontSize: 10, color: C.muted, letterSpacing: "0.08em", marginBottom: 10 }}>EFFORT METRICS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, background: C.surface, border: `1px solid ${C.border}`, padding: "12px 8px" }}>
              <RingChart value={214} max={300} label="AVG PWR" color={C.cyan} />
              <RingChart value={148} max={200} label="AVG HR" color={C.coral} />
              <RingChart value={82} max={120} label="CADENCE" color="#A78BFA" />
              <RingChart value={184} max={300} label="TSS" color="#34D399" />
            </div>
          </div>

          {/* Data table */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ ...fm, fontSize: 10, color: C.muted, letterSpacing: "0.08em", marginBottom: 8 }}>COMPLETE DATASET</div>
            <div style={{ border: `1px solid ${C.border}`, padding: "0 12px" }}>
              <DataRow label="avg_power" value={mockRoute.stats.avgPower} mono />
              <DataRow label="norm_power" value={mockRoute.stats.normalizedPower} mono />
              <DataRow label="hr_avg" value={mockRoute.stats.avgPulse} mono />
              <DataRow label="hr_max" value={mockRoute.stats.maxPulse} mono />
              <DataRow label="speed_avg" value={mockRoute.stats.avgSpeed} mono />
              <DataRow label="speed_max" value={mockRoute.stats.maxSpeed} mono />
              <DataRow label="cadence" value={mockRoute.stats.cadence} mono />
              <DataRow label="calories" value={mockRoute.stats.calories} mono />
              <DataRow label="tss_score" value={mockRoute.stats.tss} mono />
            </div>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ ...fm, fontSize: 10, color: C.muted, letterSpacing: "0.08em", marginBottom: 8 }}>ROUTE SCORING</div>
            <div style={{ border: `1px solid ${C.border}`, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <div style={{ ...fd, fontSize: 44, fontWeight: 700, color: C.dark, lineHeight: 1 }}>{mockRoute.rating}</div>
                <div>
                  <Stars rating={mockRoute.rating} uid="m10" size={18} />
                  <div style={{ ...fm, fontSize: 10, color: C.muted, marginTop: 4 }}>n={mockRoute.ratingCount} samples</div>
                </div>
              </div>
              {mockRoute.reviews.map((r, ri) => (
                <div key={ri} style={{ borderTop: `1px solid ${C.gridLine}`, paddingTop: 10, marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 28, height: 28, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", ...fm, fontSize: 10, fontWeight: 700, color: C.cyan }}>{r.initials}</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ ...fd, fontSize: 12, fontWeight: 600, color: C.dark }}>{r.author}</span>
                      <span style={{ ...fm, fontSize: 9, color: C.muted, marginLeft: 8 }}>{r.date}</span>
                    </div>
                    <Stars rating={r.rating} uid={`r10-${ri}`} size={11} />
                  </div>
                  <p style={{ ...fm, fontSize: 11, color: C.muted, margin: 0, lineHeight: 1.55 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comment — lab notes */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ ...fm, fontSize: 10, color: C.muted, letterSpacing: "0.08em" }}>FIELD_NOTES</span>
              {!isEditing && (
                <button onClick={handleEditStart} aria-label="Edit notes" style={{ ...fm, fontSize: 9, color: C.cyan, background: "none", border: `1px solid ${C.cyan}`, padding: "3px 10px", cursor: "pointer", letterSpacing: "0.06em" }}>
                  edit()
                </button>
              )}
            </div>
            <div style={{ border: `1px solid ${C.border}` }}>
              {isEditing ? (
                <div style={{ padding: 12 }}>
                  <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Edit field notes"
                    style={{ ...fm, width: "100%", padding: 8, border: `1px solid ${C.cyan}`, background: C.surface, color: C.dark, fontSize: 12, lineHeight: 1.6, resize: "vertical" as const, minHeight: 100, outline: "none", boxSizing: "border-box" as const }} />
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button onClick={handleSave} aria-label="Save" style={{ ...fm, flex: 1, padding: "8px 0", background: C.cyan, color: "white", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}>save()</button>
                    <button onClick={handleCancel} aria-label="Cancel" style={{ ...fm, flex: 1, padding: "8px 0", background: C.surface, color: C.muted, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}>cancel()</button>
                  </div>
                </div>
              ) : (
                <p style={{ ...fm, fontSize: 12, color: C.mid, margin: 0, padding: "12px", lineHeight: 1.6 }}>{comment}</p>
              )}
            </div>
          </div>

          {/* Friends — data table */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ ...fm, fontSize: 10, color: C.muted, letterSpacing: "0.08em", marginBottom: 8 }}>PARTICIPANTS</div>
            <div style={{ border: `1px solid ${C.border}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px", background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "5px 10px" }}>
                <span style={{ ...fm, fontSize: 8, color: C.muted, letterSpacing: "0.08em" }}>RIDER</span>
                <span style={{ ...fm, fontSize: 8, color: C.muted, letterSpacing: "0.08em" }}>TIME</span>
                <span style={{ ...fm, fontSize: 8, color: C.muted, letterSpacing: "0.08em" }}>STATUS</span>
              </div>
              {mockRoute.friends.map((f, i) => (
                <div key={f.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px", alignItems: "center", padding: "8px 10px", borderBottom: i < mockRoute.friends.length - 1 ? `1px solid ${C.gridLine}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", ...fm, fontSize: 9, fontWeight: 700, color: "white" }}>{f.initials}</div>
                    <span style={{ ...fd, fontSize: 12, fontWeight: 600, color: C.dark }}>{f.name}</span>
                  </div>
                  <span style={{ ...fm, fontSize: 12, color: f.status === "in-progress" ? C.cyan : C.dark }}>{f.time}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: f.status === "in-progress" ? C.coral : "#34D399" }} />
                    <span style={{ ...fm, fontSize: 9, color: f.status === "in-progress" ? C.coral : "#34D399" }}>
                      {f.status === "in-progress" ? "active" : "done"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Nav — minimal mono */}
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: C.bg, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 10px", zIndex: 50 }}>
          {NAV_TABS.map((tab) => {
            const active = tab.id === "activity";
            return (
              <button key={tab.id} aria-label={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "2px 8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? C.cyan : C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.d} />
                  {tab.id === "friends" && <><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {tab.id === "routes" && <circle cx="12" cy="10" r="3" />}
                  {tab.id === "home" && <path d="M9 22V12h6v10" />}
                </svg>
                <span style={{ ...fm, fontSize: 9, color: active ? C.cyan : C.muted, letterSpacing: "0.04em" }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
