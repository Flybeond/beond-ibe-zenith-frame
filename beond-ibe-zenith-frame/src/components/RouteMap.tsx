import React from "react";

type CityKey =
  | "ZRH"
  | "MLE"
  | "DXB"
  | "MXP"
  | "MUC"
  | "CDG"
  | "LHR"
  | "MOW"
  | "RUH"
  | "RSI";

type City = {
  key: CityKey;
  label: string;
  // lon, lat in degrees
  lon: number;
  lat: number;
};

type Route = {
  from: CityKey;
  to: CityKey;
};

const CITIES: Record<CityKey, City> = {
  ZRH: { key: "ZRH", label: "Zurich", lon: 8.55, lat: 47.37 },
  MLE: { key: "MLE", label: "Maldives", lon: 73.51, lat: 4.18 },
  DXB: { key: "DXB", label: "Dubai", lon: 55.27, lat: 25.2 },
  MXP: { key: "MXP", label: "Milan", lon: 9.19, lat: 45.46 },
  MUC: { key: "MUC", label: "Munich", lon: 11.58, lat: 48.14 },
  CDG: { key: "CDG", label: "Paris", lon: 2.35, lat: 48.86 },
  LHR: { key: "LHR", label: "London", lon: -0.13, lat: 51.51 },
  MOW: { key: "MOW", label: "Moscow", lon: 37.62, lat: 55.76 },
  RUH: { key: "RUH", label: "Riyadh", lon: 46.71, lat: 24.71 },
  RSI: { key: "RSI", label: "Red Sea", lon: 37.25, lat: 24.05 }, // Red Sea International (approx)
};

const ROUTES: readonly Route[] = [
  { from: "ZRH", to: "MLE" },
  { from: "ZRH", to: "DXB" },
  { from: "MXP", to: "MLE" },
  { from: "MUC", to: "MLE" },
  { from: "MUC", to: "DXB" },
  { from: "CDG", to: "MLE" },
  { from: "LHR", to: "MLE" },
  { from: "MOW", to: "MLE" },
  { from: "RUH", to: "MLE" },
  { from: "RSI", to: "MLE" },
] as const;

// Equirectangular projection to SVG viewBox coordinates.
function projectEquirectangular(
  lon: number,
  lat: number,
  width: number,
  height: number,
) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

function routePath(
  from: City,
  to: City,
  width: number,
  height: number,
  curve = 0.18,
) {
  const p1 = projectEquirectangular(from.lon, from.lat, width, height);
  const p2 = projectEquirectangular(to.lon, to.lat, width, height);

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;

  // Perpendicular control point for a pleasant arc.
  const nx = -dy;
  const ny = dx;
  const len = Math.max(1, Math.hypot(nx, ny));
  const k = Math.hypot(dx, dy) * curve;
  const cx = mx + (nx / len) * k;
  const cy = my + (ny / len) * k;

  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Q ${cx.toFixed(
    2,
  )} ${cy.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

export default function RouteMap() {
  const W = 1000;
  const H = 520;

  const usedCities = new Set<CityKey>();
  ROUTES.forEach((r) => {
    usedCities.add(r.from);
    usedCities.add(r.to);
  });

  return (
    <section className="bg-(--color-surface-2) text-(--color-foreground)">
      <div className="site-container py-12 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Route map
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-(--color-muted) md:text-base">
              Current and announced routes shown on a world map.
            </p>
          </div>
          <div className="text-sm text-(--color-muted)">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-(--color-primary-copper)" />
              Route
            </span>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full"
            role="img"
            aria-label="World map with beOnd routes"
          >
            <defs>
              <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F7FAFC" />
                <stop offset="100%" stopColor="#EEF3F7" />
              </linearGradient>
              <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="1.25" />
              </filter>
            </defs>

            {/* Ocean */}
            <rect x="0" y="0" width={W} height={H} fill="url(#ocean)" />

            {/* Very lightweight world silhouette (stylized blobs) */}
            <g fill="#D9E2EC" opacity="0.95">
              <path d="M85,155 C110,105 165,85 220,95 C275,105 305,140 330,165 C350,185 355,220 325,245 C295,270 250,285 215,300 C175,320 140,320 115,295 C90,270 70,215 85,155 Z" />
              <path d="M350,130 C385,95 455,85 520,105 C560,118 585,140 610,170 C635,200 645,235 625,260 C605,285 560,300 520,305 C470,312 430,300 400,275 C365,245 335,170 350,130 Z" />
              <path d="M610,120 C650,95 710,90 760,115 C805,138 835,175 850,215 C865,255 850,290 815,305 C780,320 735,315 690,295 C645,275 605,240 595,200 C585,160 585,145 610,120 Z" />
              <path d="M705,310 C735,290 780,290 815,310 C845,327 865,355 870,385 C875,420 850,450 815,458 C770,468 720,448 690,415 C660,382 668,330 705,310 Z" />
              <path d="M440,320 C470,302 505,302 530,320 C555,338 555,370 535,395 C515,420 480,430 455,418 C430,405 415,355 440,320 Z" />
              <path d="M865,135 C900,120 930,125 955,145 C980,165 990,195 980,220 C970,245 940,255 915,245 C890,235 860,205 855,180 C850,160 850,145 865,135 Z" />
            </g>

            {/* Graticule */}
            <g stroke="#0F172A" opacity="0.05" strokeWidth="1">
              {Array.from({ length: 11 }).map((_, i) => {
                const x = (W / 10) * i;
                return <line key={`vx-${i}`} x1={x} y1={0} x2={x} y2={H} />;
              })}
              {Array.from({ length: 7 }).map((_, i) => {
                const y = (H / 6) * i;
                return <line key={`hy-${i}`} x1={0} y1={y} x2={W} y2={y} />;
              })}
            </g>

            {/* Routes */}
            <g fill="none">
              {ROUTES.map((r, idx) => {
                const from = CITIES[r.from];
                const to = CITIES[r.to];
                const d = routePath(from, to, W, H);
                return (
                  <g key={`${r.from}-${r.to}-${idx}`}>
                    <path
                      d={d}
                      stroke="rgba(210,146,106,0.25)"
                      strokeWidth="8"
                      filter="url(#soft)"
                    />
                    <path
                      d={d}
                      stroke="var(--color-primary-copper)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </g>

            {/* City markers */}
            <g>
              {Array.from(usedCities).map((k) => {
                const c = CITIES[k];
                const p = projectEquirectangular(c.lon, c.lat, W, H);
                return (
                  <g key={k} transform={`translate(${p.x}, ${p.y})`}>
                    <circle r="6" fill="white" stroke="var(--color-primary-obsidian)" strokeWidth="2" />
                    <circle r="3.25" fill="var(--color-primary-copper)" />
                    <text
                      x="10"
                      y="4"
                      fontSize="14"
                      fill="var(--color-primary-obsidian)"
                      style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3 }}
                    >
                      {c.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="mt-6 max-w-4xl text-sm text-(--color-muted)">
          Routes:{" "}
          {ROUTES.map((r) => `${CITIES[r.from].label} – ${CITIES[r.to].label}`).join(
            " • ",
          )}
        </div>
      </div>
    </section>
  );
}

