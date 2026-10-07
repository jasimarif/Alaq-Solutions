import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* ==========================================================================
   The Intelligent Automation Hub
   Messy everyday inputs arrive, pass a scanner gate, and settle as organized
   outcomes. Stylized isometric scene: static geometry is SVG, every moving
   piece is its own small layer so motion is transform + opacity only.
   ========================================================================== */

// Tiny labels next to the destination trays (desktop only)
const SCENE_LABELS = ['Record', 'Task', 'Approval', 'Update', 'Done'];

// Design space. The scene's bounds (FIT, below) are scaled to fit the container.
const VIEW_W = 1100;
const VIEW_H = 860;

// Isometric projection
const UNIT = 90;
const CX = UNIT * 0.8660254;
const CY = UNIT * 0.5;
const OX = 480;
const OY = 150;
const iso = (x, y, z = 0) => [OX + (x - y) * CX, OY + (x + y) * CY - z * UNIT];
const rel = (x, y, z = 0) => [(x - y) * CX, (x + y) * CY - z * UNIT];
const pts = (list) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');
const rot = (u, v, deg) => {
  const r = (deg * Math.PI) / 180;
  return [u * Math.cos(r) - v * Math.sin(r), u * Math.sin(r) + v * Math.cos(r)];
};
// Projector for an object's local frame (rotated about the vertical axis)
const frame = (deg = 0, z0 = 0) => (u, v, z = 0) => {
  const [x, y] = rot(u, v, deg);
  return rel(x, y, z0 + z);
};
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const mixHex = (a, b, t) => {
  return `color-mix(in srgb, ${a} ${Math.round((1 - t) * 100)}%, ${b})`;
};

// Palette: charcoal/slate world, off-white objects, one soft blue, muted green checks
// Palette: charcoal/slate world, off-white objects, one soft blue, muted green checks
const COLOR = {
  blue: 'var(--scene-scan)',
  blueSoft: 'var(--scene-scan)', // Using same base, opacity changes in SVG
  green: 'var(--scene-check)',
  ink: '#9CA6B4',
  inkDark: '#6E7989',
  paperSide: '#D3D9E0',
  paperSideDark: '#A2AAB6',
};

// Scene layout (isometric units)
const PLATFORM = { w: 7.0, d: 5.7, t: 0.42 };
const GATE_X = 3.25;
const GATE_H = 1.15; // A low scanner bridge, so nothing behind it is hidden
const GATE = { post: 0.38, beam: 0.28 };
const INTAKE = { x0: 0.2, x1: 1.95, y0: 0.3, y1: 5.4 };
const LANE_X = [3.68, 4.62];
const TRAY_X = 5.25;
const TRAY = { w: 1.2, d: 0.92, depth: 0.1 };
const LANES = [0.72, 1.77, 2.82, 3.87, 4.92];
const OBJ_SCALE = 1.12; // Objects are drawn a touch larger than their grid footprint

// Inputs: resting spot, messy tilt, arrival direction (screen px), and which outcome they become
const INPUTS = [
  { id: 'sheet', x: 0.75, y: 1.75, deg: -9, out: 3, from: [-100, -58] },
  { id: 'doc', x: 0.75, y: 3.7, deg: 13, out: 0, from: [-100, 58] },
  { id: 'email', x: 1.35, y: 0.85, deg: -17, out: 1, from: [0, -110] },
  { id: 'card', x: 1.35, y: 4.75, deg: -21, out: 4, from: [-100, 58] },
  { id: 'form', x: 1.4, y: 2.75, deg: 19, out: 2, from: [-70, -100] },
];
const OUTPUTS = ['record', 'task', 'approval', 'update', 'done'];

/* ---------- Primitive shapes ---------- */

// A rectangular slab (paper, card, tile) in a local frame, with the visible side faces shaded
const Slab = ({ P, w, d, h, deg = 0, top = 'url(#hs-paper)', light = COLOR.paperSide, dark = COLOR.paperSideDark, edge }) => {
  const c = [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
  const normals = [[0, -1], [1, 0], [0, 1], [-1, 0]].map(([u, v]) => rot(u, v, deg));
  return (
    <>
      {c.map((a, i) => {
        const b = c[(i + 1) % 4];
        const [nx, ny] = normals[i];
        if (nx + ny <= 0.001) return null;
        return (
          <polygon
            key={i}
            points={pts([P(a[0], a[1], 0), P(b[0], b[1], 0), P(b[0], b[1], h), P(a[0], a[1], h)])}
            fill={mixHex(light, dark, clamp01((nx - ny) / 2.83 + 0.5))}
          />
        );
      })}
      <polygon
        points={pts(c.map(([u, v]) => P(u, v, h)))}
        fill={top}
        stroke={edge || 'rgba(255,255,255,0.9)'}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </>
  );
};

// A flat bar printed on a top surface
const Bar = ({ P, u0, u1, v, t, z, fill = COLOR.ink }) => (
  <polygon points={pts([P(u0, v - t / 2, z), P(u1, v - t / 2, z), P(u1, v + t / 2, z), P(u0, v + t / 2, z)])} fill={fill} />
);

// A small square printed on a top surface
const Box = ({ P, u, v, s, z, fill = 'none', stroke = COLOR.inkDark, width = 1.4 }) => (
  <polygon
    points={pts([P(u, v, z), P(u + s, v, z), P(u + s, v + s, z), P(u, v + s, z)])}
    fill={fill}
    stroke={stroke}
    strokeWidth={width}
    strokeLinejoin="round"
  />
);

// Upright cylinder centered on the local origin
const Cylinder = ({ r, h, z0 = 0, top = 'url(#hs-paper)', side = 'url(#hs-cyl)' }) => {
  const rx = r * Math.SQRT2 * CX;
  const ry = r * Math.SQRT2 * CY;
  const yb = -z0 * UNIT;
  const yt = -(z0 + h) * UNIT;
  return (
    <>
      <path d={`M ${-rx} ${yt} L ${-rx} ${yb} A ${rx} ${ry} 0 0 0 ${rx} ${yb} L ${rx} ${yt} Z`} fill={side} />
      <ellipse cx="0" cy={yt} rx={rx} ry={ry} fill={top} stroke="rgba(255,255,255,0.85)" strokeWidth="0.8" />
    </>
  );
};

const Shadow = ({ size = 1, dx = 6, dy = 5 }) => (
  <ellipse cx={dx} cy={dy} rx={size * UNIT * 0.95} ry={size * UNIT * 0.55} fill="url(#hs-shadow)" />
);

// Each moving piece is a zero-size layer positioned at its anchor; art overflows it
const Art = ({ children, scale = OBJ_SCALE }) => (
  <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1" aria-hidden="true">
    <g transform={`scale(${scale})`}>{children}</g>
  </svg>
);

/* ---------- Inputs (messy) ---------- */

const PAPER_H = 0.045;

const INPUT_ART = {
  doc: (deg) => {
    const P = frame(deg);
    const z = PAPER_H + 0.001;
    return {
      body: (
        <>
          <Slab P={P} w={0.85} d={1.1} h={PAPER_H} deg={deg} />
          <Bar P={P} u0={-0.3} u1={0.08} v={-0.39} t={0.08} z={z} fill={COLOR.inkDark} />
          {[[-0.21, 0.3], [-0.08, 0.26], [0.05, 0.3], [0.18, 0.16], [0.31, 0.27]].map(([v, u1]) => (
            <Bar key={v} P={P} u0={-0.3} u1={u1} v={v} t={0.045} z={z} />
          ))}
        </>
      ),
      highlight: (
        <>
          <Bar P={P} u0={-0.34} u1={0.34} v={-0.08} t={0.085} z={z + 0.002} fill={COLOR.blue} />
          <Bar P={P} u0={-0.34} u1={0.34} v={0.05} t={0.085} z={z + 0.002} fill={COLOR.blue} />
        </>
      ),
    };
  },
  email: (deg) => {
    const P = frame(deg);
    const z = PAPER_H + 0.001;
    const flap = pts([P(-0.48, -0.31, z), P(0.48, -0.31, z), P(0, 0.08, z)]);
    return {
      body: (
        <>
          <Slab P={P} w={1.0} d={0.66} h={PAPER_H} deg={deg} />
          <polygon points={flap} fill="#DCE1E8" stroke={COLOR.inkDark} strokeWidth="1.3" strokeLinejoin="round" />
          <polyline points={pts([P(-0.48, 0.31, z), P(-0.1, 0.02, z)])} stroke={COLOR.ink} strokeWidth="1.2" fill="none" />
          <polyline points={pts([P(0.48, 0.31, z), P(0.1, 0.02, z)])} stroke={COLOR.ink} strokeWidth="1.2" fill="none" />
        </>
      ),
      highlight: <polygon points={flap} fill={COLOR.blue} opacity="0.8" />,
    };
  },
  sheet: (deg) => {
    const P = frame(deg);
    const z = PAPER_H + 0.001;
    return {
      body: (
        <>
          <Slab P={P} w={1.0} d={0.8} h={PAPER_H} deg={deg} />
          <polygon points={pts([P(-0.43, -0.33, z), P(0.43, -0.33, z), P(0.43, -0.19, z), P(-0.43, -0.19, z)])} fill="#B9C2CE" />
          <polygon points={pts([P(-0.43, -0.33, z), P(0.43, -0.33, z), P(0.43, 0.33, z), P(-0.43, 0.33, z)])} fill="none" stroke={COLOR.ink} strokeWidth="1.2" />
          {[-0.19, -0.02, 0.15].map((v) => (
            <Bar key={v} P={P} u0={-0.43} u1={0.43} v={v} t={0.022} z={z} fill={COLOR.ink} />
          ))}
          {[-0.215, 0, 0.215].map((u) => (
            <polygon key={u} points={pts([P(u - 0.011, -0.33, z), P(u + 0.011, -0.33, z), P(u + 0.011, 0.33, z), P(u - 0.011, 0.33, z)])} fill={COLOR.ink} />
          ))}
        </>
      ),
      highlight: (
        <polygon points={pts([P(-0.43, -0.02, z + 0.002), P(0.43, -0.02, z + 0.002), P(0.43, 0.15, z + 0.002), P(-0.43, 0.15, z + 0.002)])} fill={COLOR.blue} opacity="0.75" />
      ),
    };
  },
  form: (deg) => {
    const P = frame(deg);
    const z = PAPER_H + 0.001;
    return {
      body: (
        <>
          <Slab P={P} w={0.85} d={1.05} h={PAPER_H} deg={deg} />
          <Bar P={P} u0={-0.3} u1={0.14} v={-0.38} t={0.075} z={z} fill={COLOR.inkDark} />
          {[-0.19, 0.0, 0.19, 0.37].map((v) => (
            <React.Fragment key={v}>
              <Box P={P} u={-0.32} v={v - 0.065} s={0.13} z={z} />
              <Bar P={P} u0={-0.13} u1={0.3} v={v} t={0.045} z={z} />
            </React.Fragment>
          ))}
        </>
      ),
      highlight: (
        <>
          <Box P={P} u={-0.32} v={-0.065} s={0.13} z={z + 0.002} fill={COLOR.blue} stroke={COLOR.blue} />
          <Box P={P} u={-0.32} v={0.125} s={0.13} z={z + 0.002} fill={COLOR.blue} stroke={COLOR.blue} />
        </>
      ),
    };
  },
  card: (deg) => {
    const P = frame(deg);
    const z = 0.101;
    return {
      body: (
        <>
          <Slab P={P} w={0.92} d={0.6} h={0.1} deg={deg} top="url(#hs-card)" />
          <polygon points={pts([P(-0.46, -0.3, z), P(0.46, -0.3, z), P(0.46, -0.15, z), P(-0.46, -0.15, z)])} fill="#8F9AAA" />
          <Box P={P} u={-0.38} v={-0.08} s={0.14} z={z} fill="#B4BDC9" stroke="#B4BDC9" />
          <Bar P={P} u0={-0.18} u1={0.3} v={-0.02} t={0.055} z={z} fill={COLOR.inkDark} />
          <Bar P={P} u0={-0.18} u1={0.12} v={0.12} t={0.045} z={z} />
        </>
      ),
      highlight: <polygon points={pts([P(-0.46, -0.3, z + 0.002), P(0.46, -0.3, z + 0.002), P(0.46, -0.15, z + 0.002), P(-0.46, -0.15, z + 0.002)])} fill={COLOR.blue} />,
    };
  },
};

// Soft blue glow left on an item after the scan light passes (fades to a trail)
const ScanGlow = () => <ellipse cx="0" cy="-2" rx={UNIT * 0.72} ry={UNIT * 0.42} fill="url(#hs-scanglow)" />;

/* ---------- Outputs (organized) ---------- */

const OUTPUT_ART = {
  record: () => {
    const P = frame(0);
    const z = 0.091;
    return (
      <>
        <Slab P={P} w={0.92} d={0.64} h={0.09} top="url(#hs-clean)" />
        <polygon points={pts([P(-0.42, -0.28, z), P(0.42, -0.28, z), P(0.42, -0.15, z), P(-0.42, -0.15, z)])} fill="#A9B3C1" />
        {[[-0.03, 0.3], [0.09, 0.2], [0.21, 0.32]].map(([v, u1]) => (
          <Bar key={v} P={P} u0={-0.36} u1={u1} v={v} t={0.045} z={z} />
        ))}
      </>
    );
  },
  task: () => {
    const P = frame(0);
    const z = 0.091;
    return (
      <>
        <Slab P={P} w={0.92} d={0.64} h={0.09} top="url(#hs-clean)" />
        <Box P={P} u={-0.38} v={-0.17} s={0.18} z={z} width={1.6} />
        <polyline
          points={pts([P(-0.35, -0.08, z), P(-0.3, -0.03, z), P(-0.22, -0.13, z)])}
          fill="none"
          stroke={COLOR.inkDark}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Bar P={P} u0={-0.13} u1={0.33} v={-0.09} t={0.06} z={z} fill={COLOR.inkDark} />
        <Bar P={P} u0={-0.13} u1={0.17} v={0.06} t={0.045} z={z} />
        <Bar P={P} u0={-0.38} u1={0.08} v={0.2} t={0.045} z={z} />
      </>
    );
  },
  approval: () => (
    <>
      <Cylinder r={0.32} h={0.12} />
      <Cylinder r={0.09} h={0.2} z0={0.12} top="#B3BCC8" side="url(#hs-knob)" />
      <Cylinder r={0.15} h={0.09} z0={0.32} top="#C8D0DA" side="url(#hs-knob)" />
    </>
  ),
  update: () => {
    const P = frame(0);
    const z = 0.091;
    const arc = [];
    for (let a = 40; a <= 320; a += 20) {
      const r = (a * Math.PI) / 180;
      arc.push(P(-0.2 + 0.15 * Math.cos(r), 0.02 + 0.15 * Math.sin(r), z));
    }
    const end = arc[arc.length - 1];
    return (
      <>
        <Slab P={P} w={0.92} d={0.64} h={0.09} top="url(#hs-clean)" />
        <polyline points={pts(arc)} fill="none" stroke={COLOR.inkDark} strokeWidth="2.4" strokeLinecap="round" />
        <polygon points={pts([end, [end[0] + 7, end[1] - 1], [end[0] + 1, end[1] + 7]])} fill={COLOR.inkDark} />
        <Bar P={P} u0={0.04} u1={0.36} v={-0.08} t={0.055} z={z} fill={COLOR.inkDark} />
        <Bar P={P} u0={0.04} u1={0.28} v={0.07} t={0.045} z={z} />
      </>
    );
  },
  done: () => {
    const P = frame(0);
    return (
      <>
        <Slab P={P} w={0.9} d={0.62} h={0.035} top="url(#hs-clean)" />
        <Slab P={frame(0, 0.05)} w={0.9} d={0.62} h={0.035} top="url(#hs-clean)" />
        <Slab P={frame(0, 0.1)} w={0.9} d={0.62} h={0.035} top="url(#hs-clean)" />
        <polyline
          points={pts([P(-0.13, 0.0, 0.136), P(-0.03, 0.1, 0.136), P(0.16, -0.11, 0.136)])}
          fill="none"
          stroke={COLOR.inkDark}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    );
  },
};

const CheckMark = () => (
  <>
    <circle cx="0" cy="0" r="10" fill={COLOR.green} />
    <path d="M -4.2 0.3 L -1.3 3.2 L 4.4 -2.9" fill="none" stroke="#F4FBF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

/* ---------- Precomputed positions ---------- */

const T = (p) => `translate(${p[0].toFixed(2)}px, ${p[1].toFixed(2)}px)`;
const SETTLED_Z = -TRAY.depth + 0.005;
const outPos = (o, z = SETTLED_Z) => iso(TRAY_X, LANES[o], z);
const checkPos = (o) => iso(TRAY_X + 0.78, LANES[o], 0);
const LABEL_SIZE = 22; // ≈13px once the scene is scaled into the hero column
const labelPos = (o) => [checkPos(o)[0] + 20, checkPos(o)[1]];

// Bounds of everything visible; this is what gets fitted to the container
const FIT = (() => {
  const { w: W, d: D, t: TH } = PLATFORM;
  const labelRight = Math.max(...SCENE_LABELS.map((label, o) => labelPos(o)[0] + label.length * LABEL_SIZE * 0.58));
  const left = iso(0, D)[0] - 24;
  const right = Math.max(iso(W, 0)[0], labelRight) + 24;
  const top = Math.min(iso(0, 0)[1], iso(GATE_X, 0.22, GATE_H + GATE.beam)[1]) - 30;
  const bottom = iso(W, D, -TH)[1] + 6;
  return { x: left, y: top, w: right - left, h: bottom - top };
})();

/* ---------- Motion (one 15s GSAP timeline) ----------
   0–3s   inputs arrive from different directions and settle with a small float
   3–6s   the scan light sweeps the intake; key parts highlight and lift out as chips
   6–10s  the chips glide through the gate and along their lanes
   10–13s results settle into their trays: rim lights once, then a check
   13–15s results sink away while the next inputs are already arriving
   The state at 15s equals the state at 0s, so the loop never cuts. */

const LOOP = 15;
const SCAN = { start: 3, dur: 3, x0: INTAKE.x0 + 0.1, x1: INTAKE.x1 - 0.1 };
const START_AT = 12.2; // First paint and reduced motion show this settled frame
const HOVER = 12; // px the inputs float above the desk while arriving
const CHIP = 0.6; // Scale of an extracted piece while it travels

const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const bezier3 = (p0, p1, p2, p3, t) =>
  p0.map((_, i) => (1 - t) ** 3 * p0[i] + 3 * (1 - t) ** 2 * t * p1[i] + 3 * (1 - t) * t * t * p2[i] + t ** 3 * p3[i]);
// When the eased scan light reaches a given x
const scanTimeAt = (x) => {
  const s = clamp01((x - SCAN.x0) / (SCAN.x1 - SCAN.x0));
  return SCAN.start + (Math.acos(1 - 2 * s) / Math.PI) * SCAN.dur;
};

const MOTION = INPUTS.map((input, j) => {
  const lane = LANES[input.out];
  const rest = iso(input.x, input.y);
  const off = [rest[0] + input.from[0], rest[1] + input.from[1] - HOVER * 1.6];
  const lifted = [input.x, input.y, 0.75];
  // One smooth curve: up off the page, through the gate, onto its lane, over its tray
  const curve = Array.from({ length: 21 }, (_, k) =>
    bezier3(lifted, [GATE_X - 1.1, (input.y + lane) / 2, 0.62], [GATE_X + 0.45, lane, 0.36], [TRAY_X, lane, 0.3], k / 20)
  );
  const moveAt = 6.2 + input.out * 0.18;
  const mid = lerp2(off, rest, 0.45);
  return {
    j,
    o: input.out,
    rest,
    off,
    mid: [mid[0], mid[1] - HOVER],
    hover: [rest[0], rest[1] - HOVER * 0.5],
    arriveA: 12.7 + j * 0.3,
    arriveB: 1.7 + j * 0.3,
    absorbed: iso(GATE_X - 0.35, input.y),
    scanAt: scanTimeAt(input.x - 0.2),
    start: iso(input.x, input.y, 0.05),
    lifted: iso(...lifted),
    path: curve.map((p) => iso(...p)),
    shadowPath: curve.map((p) => iso(p[0], p[1], 0)),
    moveAt,
    settleAt: moveAt + 3.4,
  };
});

// Faint light dashes running along the lanes while work is in flight
const DASH_LEN = 0.28;
const DASHES = LANES.map((lane, o) => ({
  from: iso(LANE_X[0], lane, 0.005),
  to: iso(LANE_X[1] - DASH_LEN, lane, 0.005),
  starts: [0, 1, 2, 3, 4].map((k) => 3.1 + o * 0.32 + k * 1.85).filter((t) => t + 1.3 <= 12.8),
}));

const xy = (p) => ({ x: p[0], y: p[1] });
const keyPath = (list) => ({ x: list.map((p) => p[0]), y: list.map((p) => p[1]), easeEach: 'none' });

const buildTimeline = (root) => {
  const one = (sel) => root.querySelector(sel);
  const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { immediateRender: false } });
  const scan = one('[data-scan]');
  const emitter = one('[data-emitter]');

  // Loop-start state
  tl.set(scan, { ...xy(iso(SCAN.x0, 0)), opacity: 0 }, 0);
  tl.set(emitter, { opacity: 0.35 }, 0);

  MOTION.forEach((m, i) => {
    const input = one(`[data-input="${INPUTS[i].id}"]`);
    const highlight = one(`[data-highlight="${INPUTS[i].id}"]`);
    const part = one(`[data-output="${m.o}"]`);
    const shadow = one(`[data-shadow="${m.o}"]`);
    const check = one(`[data-check="${m.o}"]`);
    const rim = one(`[data-rim="${m.o}"]`);
    const floor = iso(TRAY_X, LANES[m.o], -TRAY.depth);

    tl.set(input, { ...xy(m.mid), opacity: 1, scale: 1 }, 0)
      .set(highlight, { opacity: 0 }, 0)
      .set(part, { ...xy(m.start), opacity: 0, scale: CHIP }, 0)
      .set(shadow, { ...xy(m.rest), opacity: 0, scale: CHIP }, 0)
      .set(check, { opacity: 0, scale: 0.6 }, 0)
      .set(rim, { opacity: 0 }, 0);

    // 0–3s: inputs finish arriving, floating down onto the desk (staggered)
    // First segment keeps the speed it had at the loop point, second one lowers it gently onto the desk
    tl.to(
      input,
      {
        keyframes: [
          { ...xy(m.hover), duration: m.arriveB * 0.6, ease: 'sine.out' },
          { ...xy(m.rest), duration: m.arriveB * 0.4, ease: 'sine.inOut' },
        ],
      },
      0
    );

    // 3–6s: scan highlights the key part (leaving a soft trail), which lifts out as a chip
    tl.to(highlight, { opacity: 1, duration: 0.3, ease: 'power1.out' }, m.scanAt);
    tl.to(highlight, { opacity: 0.55, duration: 0.9, ease: 'sine.out' }, m.scanAt + 0.45);
    tl.to(part, { ...xy(m.lifted), opacity: 1, duration: 0.9, ease: 'power2.out' }, m.scanAt + 0.1);
    tl.to(shadow, { opacity: 0.35, duration: 0.9, ease: 'power2.out' }, m.scanAt + 0.1);

    // 6–10s: inputs are absorbed by the gate, chips glide along their lanes
    tl.to(input, { ...xy(m.absorbed), opacity: 0, scale: 0.94, duration: 1.5, ease: 'power2.in' }, 6.1 + m.j * 0.08);
    tl.set(highlight, { opacity: 0 }, 8);
    tl.to(part, { keyframes: keyPath(m.path), duration: 3.4, ease: 'power2.inOut' }, m.moveAt);
    tl.to(shadow, { keyframes: keyPath(m.shadowPath), duration: 3.4, ease: 'power2.inOut' }, m.moveAt);

    // 10–13s: settle flat into the tray at full size; rim lights once, then a check
    tl.to(part, { ...xy(outPos(m.o)), scale: 1, duration: 0.8, ease: 'power3.out' }, m.settleAt);
    tl.to(shadow, { ...xy(floor), scale: 1, opacity: 0.8, duration: 0.8, ease: 'power3.out' }, m.settleAt);
    tl.to(rim, { opacity: 1, duration: 0.35, ease: 'power1.out' }, m.settleAt + 0.25);
    tl.to(rim, { opacity: 0.25, duration: 1.2, ease: 'sine.inOut' }, m.settleAt + 0.6);
    tl.to(check, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, m.settleAt + 0.55);

    // 13–15s: results sink away while the next input arrives
    const out = 13 + m.o * 0.1;
    tl.to(part, { ...xy(outPos(m.o, SETTLED_Z - 0.18)), opacity: 0, duration: 1, ease: 'power2.in' }, out);
    tl.to(shadow, { opacity: 0, duration: 1, ease: 'power2.in' }, out);
    tl.to(check, { opacity: 0, duration: 0.5, ease: 'power1.in' }, out);
    tl.to(rim, { opacity: 0, duration: 0.8, ease: 'power1.in' }, out);
    tl.fromTo(
      input,
      { ...xy(m.off), opacity: 0, scale: 1 },
      { ...xy(m.mid), opacity: 1, duration: LOOP - m.arriveA, ease: 'sine.in' },
      m.arriveA
    );
  });

  // Lane dashes
  DASHES.forEach((dash, o) => {
    const el = one(`[data-dash="${o}"]`);
    tl.set(el, { ...xy(dash.from), opacity: 0 }, 0);
    dash.starts.forEach((t) => {
      tl.fromTo(el, { ...xy(dash.from) }, { ...xy(dash.to), duration: 1.3, ease: 'none' }, t);
      tl.to(el, { opacity: 0.85, duration: 0.3, ease: 'power1.out' }, t);
      tl.to(el, { opacity: 0, duration: 0.35, ease: 'power1.in' }, t + 0.95);
    });
  });

  // Scan light and the gate's inner glow: bright while scanning, dim between passes
  tl.to(scan, { opacity: 1, duration: 0.4, ease: 'power1.out' }, SCAN.start - 0.2);
  tl.to(scan, { ...xy(iso(SCAN.x1, 0)), duration: SCAN.dur, ease: 'sine.inOut' }, SCAN.start);
  tl.to(scan, { opacity: 0, duration: 0.45, ease: 'power1.in' }, SCAN.start + SCAN.dur - 0.35);
  tl.to(emitter, { opacity: 1, duration: 0.6, ease: 'power1.out' }, SCAN.start - 0.4);
  tl.to(emitter, { opacity: 0.35, duration: 0.9, ease: 'power1.inOut' }, SCAN.start + SCAN.dur);

  tl.set({}, {}, LOOP); // Exact loop length
  return tl;
};

/* ---------- Static layers ---------- */

const Defs = () => {
  const glow = iso(GATE_X, PLATFORM.d / 2);
  return (
    <defs>
      <linearGradient id="hs-paper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--scene-paper)" />
        <stop offset="1" stopColor="var(--scene-paper)" />
      </linearGradient>
      <linearGradient id="hs-clean" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--scene-paper)" />
        <stop offset="1" stopColor="var(--scene-paper)" />
      </linearGradient>
      <linearGradient id="hs-card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F3F5F8" />
        <stop offset="1" stopColor="#DCE1E8" />
      </linearGradient>
      <linearGradient id="hs-cyl" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#EEF1F5" />
        <stop offset="0.55" stopColor="#CDD4DD" />
        <stop offset="1" stopColor="#9AA4B2" />
      </linearGradient>
      <linearGradient id="hs-knob" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#C3CBD6" />
        <stop offset="1" stopColor="#7D8796" />
      </linearGradient>
      <radialGradient id="hs-shadow">
        <stop offset="0" stopColor="#000" stopOpacity="0.55" />
        <stop offset="0.6" stopColor="#000" stopOpacity="0.2" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="hs-scanglow">
        <stop offset="0" stopColor={COLOR.blue} stopOpacity="0.32" />
        <stop offset="1" stopColor={COLOR.blue} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="hs-floor">
        <stop offset="0" stopColor="#000" stopOpacity="0.6" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="hs-ambient">
        <stop offset="0" stopColor="#9AB0D0" stopOpacity="0.13" />
        <stop offset="1" stopColor="#9AB0D0" stopOpacity="0" />
      </radialGradient>
      {/* Platform top: lighter toward the gate, darker at the edges */}
      <radialGradient id="hs-platform" gradientUnits="userSpaceOnUse" cx={glow[0]} cy={glow[1]} r="560">
        <stop offset="0" stopColor="var(--scene-platform)" />
        <stop offset="0.55" stopColor="var(--scene-platform)" />
        <stop offset="1" stopColor="var(--scene-platform-edge)" />
      </radialGradient>
      <linearGradient id="hs-side-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--scene-platform)" />
        <stop offset="1" stopColor="var(--scene-platform-edge)" />
      </linearGradient>
      <linearGradient id="hs-side-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--scene-platform)" />
        <stop offset="1" stopColor="var(--scene-platform-edge)" />
      </linearGradient>
      <linearGradient id="hs-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D2DFF3" stopOpacity="0.22" />
        <stop offset="1" stopColor="#D2DFF3" stopOpacity="0.07" />
      </linearGradient>
    </defs>
  );
};

const Pillar = ({ y }) => {
  const [x0, y0] = iso(GATE_X, y);
  const P = frame(0);
  const s = GATE.post / 2;
  return (
    <g transform={`translate(${x0} ${y0})`}>
      <Slab P={P} w={GATE.post} d={GATE.post} h={GATE_H} top="var(--scene-gate)" light="var(--scene-gate)" dark="var(--scene-gate)" edge="rgba(255,255,255,0.22)" />
      {/* Lit vertical bevel + soft blue rim on the leading edge */}
      <line x1={P(s, s, 0)[0]} y1={P(s, s, 0)[1]} x2={P(s, s, GATE_H)[0]} y2={P(s, s, GATE_H)[1]} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <line x1={P(s, -s, 0)[0]} y1={P(s, -s, 0)[1]} x2={P(s, -s, GATE_H)[0]} y2={P(s, -s, GATE_H)[1]} stroke="var(--scene-rim)" strokeWidth="1" />
    </g>
  );
};

const Platform = () => {
  const { w: W, d: D, t: TH } = PLATFORM;
  const c = iso(W / 2, D / 2);
  const under = iso(W / 2, D / 2, -TH);
  return (
    <svg className="absolute inset-0 overflow-visible" width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
      <Defs />
      {/* Separation from the background: soft glow behind, ground shadow beneath */}
      <ellipse cx={c[0]} cy={c[1] - 20} rx="560" ry="380" fill="url(#hs-ambient)" />
      <ellipse cx={under[0] + 10} cy={under[1] + 48} rx="500" ry="140" fill="url(#hs-floor)" />

      {/* Slab */}
      <polygon points={pts([iso(W, 0), iso(W, D), iso(W, D, -TH), iso(W, 0, -TH)])} fill="url(#hs-side-right)" />
      <polygon points={pts([iso(0, D), iso(W, D), iso(W, D, -TH), iso(0, D, -TH)])} fill="url(#hs-side-front)" />
      <polygon points={pts([iso(0, 0), iso(W, 0), iso(W, D), iso(0, D)])} fill="url(#hs-platform)" />
      {/* 1px highlights along the top edges and the front bevel */}
      <polyline points={pts([iso(0, D), iso(0, 0), iso(W, 0)])} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <polyline points={pts([iso(0, D), iso(W, D), iso(W, 0)])} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
      <polyline points={pts([iso(0, D, -0.05), iso(W, D, -0.05), iso(W, 0, -0.05)])} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <line x1={iso(W, D)[0]} y1={iso(W, D)[1]} x2={iso(W, D, -TH)[0]} y2={iso(W, D, -TH)[1]} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Fine surface grid */}
      <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
        {Array.from({ length: Math.floor(W) }, (_, i) => i + 1).map((x) => (
          <line key={`gx${x}`} x1={iso(x, 0)[0]} y1={iso(x, 0)[1]} x2={iso(x, D)[0]} y2={iso(x, D)[1]} />
        ))}
        {Array.from({ length: Math.floor(D) }, (_, i) => i + 1).map((y) => (
          <line key={`gy${y}`} x1={iso(0, y)[0]} y1={iso(0, y)[1]} x2={iso(W, y)[0]} y2={iso(W, y)[1]} />
        ))}
      </g>

      {/* Intake area */}
      <polygon
        points={pts([iso(INTAKE.x0, INTAKE.y0), iso(INTAKE.x1, INTAKE.y0), iso(INTAKE.x1, INTAKE.y1), iso(INTAKE.x0, INTAKE.y1)])}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
      />

      {/* Sorting lanes: light grooves with a soft blue rim on the near lip */}
      {LANES.map((y) => (
        <g key={`lane${y}`}>
          <polygon points={pts([iso(LANE_X[0], y - 0.07), iso(LANE_X[1], y - 0.07), iso(LANE_X[1], y + 0.07), iso(LANE_X[0], y + 0.07)])} fill="#0F151E" />
          <line x1={iso(LANE_X[0], y - 0.07)[0]} y1={iso(LANE_X[0], y - 0.07)[1]} x2={iso(LANE_X[1], y - 0.07)[0]} y2={iso(LANE_X[1], y - 0.07)[1]} stroke="rgba(0,0,0,0.35)" />
          <line x1={iso(LANE_X[0], y + 0.07)[0]} y1={iso(LANE_X[0], y + 0.07)[1]} x2={iso(LANE_X[1], y + 0.07)[0]} y2={iso(LANE_X[1], y + 0.07)[1]} stroke="var(--scene-rim)" />
        </g>
      ))}

      {/* Destination trays, recessed, with a thin lit rim */}
      {LANES.map((y) => {
        const x0 = TRAY_X - TRAY.w / 2;
        const x1 = TRAY_X + TRAY.w / 2;
        const y0 = y - TRAY.d / 2;
        const y1 = y + TRAY.d / 2;
        const z = -TRAY.depth;
        return (
          <g key={`tray${y}`}>
            <polygon points={pts([iso(x0, y0, z), iso(x1, y0, z), iso(x1, y1, z), iso(x0, y1, z)])} fill="#0E141D" />
            <polygon points={pts([iso(x0, y0), iso(x0, y1), iso(x0, y1, z), iso(x0, y0, z)])} fill="#243042" />
            <polygon points={pts([iso(x0, y0), iso(x1, y0), iso(x1, y0, z), iso(x0, y0, z)])} fill="#1C2635" />
            <polygon points={pts([iso(x0, y0), iso(x1, y0), iso(x1, y1), iso(x0, y1)])} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <polyline points={pts([iso(x0, y1), iso(x1, y1), iso(x1, y0)])} fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="1.2" />
          </g>
        );
      })}

      {/* Gate: back pillar sits behind everything that moves */}
      <Pillar y={0.22} />
    </svg>
  );
};

const TrayLabels = () => (
  <svg className="absolute inset-0 overflow-visible hidden sm:block" width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
    {SCENE_LABELS.map((label, o) => {
      const [x, y] = labelPos(o);
      return (
        <text
          key={label}
          x={x}
          y={y}
          dominantBaseline="central"
          fill="rgba(255,255,255,0.7)"
          fontFamily="Manrope, sans-serif"
          fontWeight="600"
          fontSize={LABEL_SIZE}
        >
          {label}
        </text>
      );
    })}
  </svg>
);

// Glass opening between the pillars (inner edges)
const OPEN = { y0: 0.22 + GATE.post / 2, y1: PLATFORM.d - 0.22 - GATE.post / 2, z0: GATE_H - 0.45, z1: GATE_H };

const GateFront = () => {
  const [bx, by] = iso(GATE_X, PLATFORM.d / 2, GATE_H);
  const P = frame(0);
  const bw = GATE.post / 2;
  const bd = (PLATFORM.d - 0.06) / 2;
  const pane = (x, fill) => (
    <polygon
      points={pts([iso(x, OPEN.y0, OPEN.z0), iso(x, OPEN.y1, OPEN.z0), iso(x, OPEN.y1, OPEN.z1), iso(x, OPEN.y0, OPEN.z1)])}
      fill={fill}
    />
  );
  return (
    <svg className="absolute inset-0 overflow-visible" width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
      {/* Frosted glass with real thickness: back pane, front pane, lit lower edge */}
      {pane(GATE_X - 0.09, 'url(#hs-glass)')}
      <polygon
        points={pts([iso(GATE_X - 0.09, OPEN.y0, OPEN.z0), iso(GATE_X + 0.09, OPEN.y0, OPEN.z0), iso(GATE_X + 0.09, OPEN.y1, OPEN.z0), iso(GATE_X - 0.09, OPEN.y1, OPEN.z0)])}
        fill="rgba(220,232,250,0.2)"
      />
      {pane(GATE_X + 0.09, 'url(#hs-glass)')}
      <line
        x1={iso(GATE_X + 0.09, OPEN.y0, OPEN.z0)[0]}
        y1={iso(GATE_X + 0.09, OPEN.y0, OPEN.z0)[1]}
        x2={iso(GATE_X + 0.09, OPEN.y1, OPEN.z0)[0]}
        y2={iso(GATE_X + 0.09, OPEN.y1, OPEN.z0)[1]}
        stroke="rgba(235,242,252,0.45)"
        strokeWidth="1.2"
      />

      <Pillar y={PLATFORM.d - 0.22} />

      {/* Beam with lit top edges and a soft blue rim along its lower front edge */}
      <g transform={`translate(${bx} ${by})`}>
        <Slab P={P} w={GATE.post} d={PLATFORM.d - 0.06} h={GATE.beam} top="var(--scene-gate)" light="var(--scene-gate)" dark="var(--scene-gate)" edge="rgba(255,255,255,0.24)" />
        <line x1={P(bw, -bd, 0)[0]} y1={P(bw, -bd, 0)[1]} x2={P(bw, bd, 0)[0]} y2={P(bw, bd, 0)[1]} stroke="var(--scene-rim)" strokeWidth="1" />
      </g>
    </svg>
  );
};

// Inner edge glow of the gate opening + a faint pool of light beneath (opacity animated)
const Emitter = () => {
  const x = GATE_X + GATE.post / 2 + 0.005;
  const edge = pts([iso(x, OPEN.y0, 0.05), iso(x, OPEN.y0, OPEN.z1), iso(x, OPEN.y1, OPEN.z1), iso(x, OPEN.y1, 0.05)]);
  return (
    <svg className="absolute inset-0 overflow-visible" width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
      <polygon points={pts([iso(GATE_X - 0.3, OPEN.y0), iso(GATE_X + 0.4, OPEN.y0), iso(GATE_X + 0.4, OPEN.y1), iso(GATE_X - 0.3, OPEN.y1)])} fill={COLOR.blue} opacity="0.08" />
      <polyline points={edge} fill="none" stroke={COLOR.blue} strokeWidth="7" strokeLinejoin="round" opacity="0.16" />
      <polyline points={edge} fill="none" stroke={COLOR.blueSoft} strokeWidth="1.6" strokeLinejoin="round" opacity="0.9" />
      <line
        x1={iso(GATE_X + 0.09, OPEN.y0, OPEN.z0)[0]}
        y1={iso(GATE_X + 0.09, OPEN.y0, OPEN.z0)[1]}
        x2={iso(GATE_X + 0.09, OPEN.y1, OPEN.z0)[0]}
        y2={iso(GATE_X + 0.09, OPEN.y1, OPEN.z0)[1]}
        stroke={COLOR.blueSoft}
        strokeWidth="1.4"
      />
    </svg>
  );
};

// Scan light that sweeps across the intake area (moves along the isometric x axis), with a soft trailing band
const ScanLight = () => {
  const a = rel(0, INTAKE.y0 + 0.05, 0.05);
  const b = rel(0, INTAKE.y1 - 0.05, 0.05);
  const g0 = rel(-0.8, 3);
  const g1 = rel(0, 3);
  return (
    <Art scale={1}>
      <defs>
        <linearGradient id="hs-scanband" gradientUnits="userSpaceOnUse" x1={g0[0]} y1={g0[1]} x2={g1[0]} y2={g1[1]}>
          <stop offset="0" stopColor={COLOR.blue} stopOpacity="0" />
          <stop offset="1" stopColor={COLOR.blue} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polygon points={pts([rel(-0.8, INTAKE.y0 + 0.05, 0.05), a, b, rel(-0.8, INTAKE.y1 - 0.05, 0.05)])} fill="url(#hs-scanband)" />
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={COLOR.blue} strokeWidth="7" opacity="0.3" strokeLinecap="round" />
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#DCE8FF" strokeWidth="1.8" strokeLinecap="round" />
    </Art>
  );
};

const LaneDash = () => {
  const b = rel(DASH_LEN, 0);
  return (
    <Art scale={1}>
      <line x1="0" y1="0" x2={b[0]} y2={b[1]} stroke={COLOR.blue} strokeWidth="5" opacity="0.25" strokeLinecap="round" />
      <line x1="0" y1="0" x2={b[0]} y2={b[1]} stroke="#CFE0FF" strokeWidth="1.6" strokeLinecap="round" />
    </Art>
  );
};

const TrayRim = () => {
  const c = [[-TRAY.w / 2, -TRAY.d / 2], [TRAY.w / 2, -TRAY.d / 2], [TRAY.w / 2, TRAY.d / 2], [-TRAY.w / 2, TRAY.d / 2]];
  const rim = pts(c.map(([u, v]) => rel(u, v, 0)));
  return (
    <Art scale={1}>
      <polygon points={rim} fill="none" stroke={COLOR.blue} strokeWidth="5" opacity="0.22" strokeLinejoin="round" />
      <polygon points={rim} fill="none" stroke="#D6E4FF" strokeWidth="1.3" strokeLinejoin="round" />
    </Art>
  );
};

/* ---------- Scene ---------- */

const SceneStage = ({ reducedMotion }) => {
  const stageRef = useRef(null);
  const [fit, setFit] = useState({ k: 0.6, left: 0, top: 0 });

  // Fit the scene's bounds inside the container (contain), centered
  useLayoutEffect(() => {
    const node = stageRef.current?.parentElement;
    if (!node) return undefined;
    const update = () => {
      const w = node.clientWidth;
      const h = node.clientHeight;
      const k = Math.min(w / FIT.w, h / FIT.h);
      setFit({ k, left: (w - FIT.w * k) / 2 - FIT.x * k, top: (h - FIT.h * k) / 2 - FIT.y * k });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // One looping timeline, built after first paint. Paused off-screen and in hidden tabs.
  useEffect(() => {
    const root = stageRef.current;
    if (!root || reducedMotion) return undefined;

    let tl;
    let inView = true;
    const sync = () => {
      if (!tl) return;
      if (inView && !document.hidden) tl.play();
      else tl.pause();
    };

    const ctx = gsap.context(() => {});
    const raf = requestAnimationFrame(() => {
      ctx.add(() => {
        tl = buildTimeline(root);
        tl.time(START_AT);
        sync();
      });
    });

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(root.parentElement);
    document.addEventListener('visibilitychange', sync);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={stageRef}
      className="absolute origin-top-left"
      style={{ width: VIEW_W, height: VIEW_H, left: fit.left, top: fit.top, transform: `scale(${fit.k})` }}
    >
      <Platform />
      <TrayLabels />

      {/* Lane dashes and tray rims sit on the platform surface */}
      {DASHES.map((dash, o) => (
        <div key={`dash-${o}`} data-dash={o} className="absolute left-0 top-0" style={{ transform: T(dash.from), zIndex: 2, opacity: 0 }}>
          <LaneDash />
        </div>
      ))}
      {LANES.map((lane, o) => (
        <div key={`rim-${o}`} data-rim={o} className="absolute left-0 top-0" style={{ transform: T(iso(TRAY_X, lane)), zIndex: 3, opacity: 0.25 }}>
          <TrayRim />
        </div>
      ))}

      {/* Inputs (hidden in the settled first frame) */}
      {INPUTS.map((input, i) => {
        const art = INPUT_ART[input.id](input.deg);
        return (
          <div
            key={input.id}
            data-input={input.id}
            className="absolute left-0 top-0"
            style={{
              transform: `${T(MOTION[i].absorbed)} scale(0.94)`,
              opacity: 0,
              zIndex: 10 + Math.round((input.x + input.y) * 2),
            }}
          >
            <Art>
              <Shadow size={0.62} />
              {art.body}
              <g data-highlight={input.id} opacity="0">
                <ScanGlow />
                {art.highlight}
              </g>
            </Art>
          </div>
        );
      })}

      {/* Scan light */}
      <div data-scan className="absolute left-0 top-0" style={{ transform: T(iso(INTAKE.x0, 0)), zIndex: 35, opacity: 0 }}>
        <ScanLight />
      </div>

      {/* Outputs + their ground shadows, settled in trays */}
      {OUTPUTS.map((kind, o) => (
        <React.Fragment key={kind}>
          <div data-shadow={o} className="absolute left-0 top-0" style={{ transform: T(iso(TRAY_X, LANES[o], -TRAY.depth)), zIndex: 39, opacity: 0.8 }}>
            <Art>
              <Shadow size={0.55} dx={5} dy={4} />
            </Art>
          </div>
          <div data-output={o} className="absolute left-0 top-0" style={{ transform: T(outPos(o)), zIndex: 40 + o }}>
            <Art>{OUTPUT_ART[kind]()}</Art>
          </div>
        </React.Fragment>
      ))}

      <div className="absolute inset-0" style={{ zIndex: 60 }}>
        <GateFront />
      </div>
      <div data-emitter className="absolute inset-0" style={{ zIndex: 61, opacity: 0.35 }}>
        <Emitter />
      </div>

      {OUTPUTS.map((kind, o) => (
        <div key={`check-${kind}`} data-check={o} className="absolute left-0 top-0" style={{ transform: T(checkPos(o)), zIndex: 70 }}>
          <Art scale={1}>
            <CheckMark />
          </Art>
        </div>
      ))}
    </div>
  );
};

const HeroAutomationScene = ({ video, reducedMotion = false, className = '' }) => {
  if (video) {
    return (
      <div className={`relative w-full ${className}`} aria-hidden="true">
        <video className="absolute inset-0 w-full h-full object-contain" muted autoPlay loop playsInline poster={video.poster}>
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full select-none pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <SceneStage reducedMotion={reducedMotion} />
    </div>
  );
};

export default HeroAutomationScene;
