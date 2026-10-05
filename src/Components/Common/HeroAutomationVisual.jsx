import React, { useState, useEffect, useLayoutEffect, useRef, memo } from 'react';

const CYCLE_DURATION = 13500; // 13.5 seconds total continuous cycle

// Native pixel size of the base photograph. Every overlay below is authored in
// this coordinate space so it sits exactly on the objects in the photo.
const STAGE_W = 1200;
const STAGE_H = 896;

// Projects a flat w×h element onto a 4-corner quad (TL, TR, BR, BL) in stage space.
// Returns the CSS matrix3d plus a point projector for drawing light paths.
const quadTransform = (w, h, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) => {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const k = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3, c = x0;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3, f = y0;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, c, f, 0, 1];
  return {
    css: `matrix3d(${m.join(',')})`,
    project: (X, Y) => {
      const u = X / w, v = Y / h;
      const z = g * u + k * v + 1;
      return [(a * u + b * v + c) / z, (d * u + e * v + f) / z];
    },
  };
};

// Purchase order printed on the physical sheet of paper on the desk
const PAPER_W = 340;
const PAPER_H = 440;
const PAPER = quadTransform(PAPER_W, PAPER_H, [[419, 433], [612, 472], [461, 590], [259, 544]]);

// NetSuite sales order shown on the laptop display
const SCREEN_W = 560;
const SCREEN_H = 390;
const SCREEN = quadTransform(SCREEN_W, SCREEN_H, [[743, 221], [1049, 273], [1025, 485], [714, 443]]);

// Phase Calculations (0 - 13.5s)
// Phase 1 (0.0s - 3.2s): Dealer PO lands on the desk
// Phase 2 (3.2s - 6.2s): AI reads the page, line by line
// Phase 3 (6.2s - 9.4s): Validated fields entered into the NetSuite sales order
// Phase 4 (9.4s - 12.4s): Order saved, paper stamped as entered
// Phase 5 (12.4s - 13.5s): Dip to black, next order
const P2_START = 3200;
const P3_START = 6200;
const P4_START = 9400;
const RESET_START = 12400;
const STEP_MS = (P4_START - P3_START) / 5;

// Each field the AI captures: where it lives on the paper and where it lands on screen
const FIELDS = [
  { id: 'po', paper: { x: 188, y: 66, w: 138, h: 44 }, screen: [100, 153] },
  { id: 'line1', paper: { x: 14, y: 168, w: 312, h: 28 }, screen: [230, 254] },
  { id: 'line2', paper: { x: 14, y: 196, w: 312, h: 28 }, screen: [230, 278] },
  { id: 'line3', paper: { x: 14, y: 224, w: 312, h: 28 }, screen: [230, 302] },
  { id: 'note', paper: { x: 20, y: 304, w: 226, h: 50 }, screen: [100, 191] },
];

const LINE_ITEMS = [
  { item: 'W8X18-GALV', desc: 'W8×18 Beam, Galv. 24′-0″', qty: '14', units: 'EA', amount: '4,820.00' },
  { item: 'CP8-14', desc: 'C-Purlin 8″ 14ga 20′-0″', qty: '36', units: 'EA', amount: '3,132.00' },
  { item: 'AK-075', desc: 'Anchor Kit ¾″', qty: '28', units: 'KIT', amount: '616.00' },
];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const progress = (t, start, end) => clamp01((t - start) / (end - start));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// Camera framings in photo pixels. z is zoom relative to the photo covering the card.
// BASE_ZOOM crops out the pegboard and cables; the camera then moves between
// 1.0x and 1.35x of that base framing, one ~3s ease-in-out move per step.
const BASE_ZOOM = 1.15;
const SHOTS = {
  po: { z: BASE_ZOOM * 1.35, cx: 473, cy: 556 },
  desk: { z: BASE_ZOOM, cx: 600, cy: 506 },
  laptop: { z: BASE_ZOOM * 1.35, cx: 841, cy: 396 },
};
const CROSSFADE_START = CYCLE_DURATION - 800;
const REDUCED_MOTION_T = 10500; // Final step, order saved

const mixShots = (a, b, p) => {
  const e = easeInOut(p);
  return { z: lerp(a.z, b.z, e), cx: lerp(a.cx, b.cx, e), cy: lerp(a.cy, b.cy, e) };
};

const shotAt = (t) => {
  if (t < P2_START) return mixShots({ ...SHOTS.po, z: SHOTS.po.z * 0.96 }, SHOTS.po, progress(t, 0, P2_START));
  if (t < P3_START) return mixShots(SHOTS.po, SHOTS.desk, progress(t, P2_START, P3_START));
  return mixShots(SHOTS.desk, SHOTS.laptop, progress(t, P3_START, P3_START + 3000));
};

// Converts a framing into the stage transform for a card of size w×h, never exposing photo edges
const stageTransform = ({ z, cx, cy }, w, h) => {
  const k = Math.max(w / STAGE_W, h / STAGE_H) * z;
  const viewW = w / k;
  const viewH = h / k;
  const left = Math.min(Math.max(cx - viewW / 2, 0), STAGE_W - viewW);
  const top = Math.min(Math.max(cy - viewH / 2, 0), STAGE_H - viewH);
  return `translate3d(${-left * k}px, ${-top * k}px, 0) scale(${k})`;
};

const STEPS = [
  { label: 'Order arrives', start: 0, end: P2_START, jump: 300 },
  { label: 'AI reads it', start: P2_START, end: P3_START, jump: P2_START + 100 },
  { label: 'Entered in NetSuite', start: P3_START, end: RESET_START, jump: P3_START + 100 },
];

const CAPTIONS = [
  'A dealer PO lands on the desk, handwritten edits and all.',
  'AI reads every line, even the hand-corrected quantity.',
  'Deterministic code enters each validated field into NetSuite.',
  'Sales order SO-9842 saved. Nobody re-typed a thing.',
];

const typed = (text, p) => (p <= 0 ? '' : text.slice(0, Math.ceil(text.length * p)));

const HANDWRITING = { fontFamily: "'Caveat', 'Segoe Print', 'Bradley Hand', cursive" };

// Static printed content of the dealer's purchase order (memoized; never re-renders)
const PaperDocument = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden text-[#24272c]"
    style={{
      fontFamily: 'Manrope, sans-serif',
      background: 'linear-gradient(162deg, #eeede8 0%, #e2e1db 45%, #cbcac4 100%)',
    }}
  >
    {/* Header */}
    <div className="absolute left-[22px] top-[20px] leading-none">
      <div className="text-[15px] font-extrabold tracking-[0.04em]">TITAN</div>
      <div className="text-[8px] font-semibold tracking-[0.3em] mt-[3px]">STRUCTURES</div>
    </div>
    <div className="absolute right-[18px] top-[20px] text-[17px] font-extrabold tracking-[0.06em]">
      PURCHASE ORDER
    </div>
    <div className="absolute left-[18px] right-[18px] top-[56px] h-[2px] bg-[#2b2f36]" />

    {/* Bill-to and PO meta */}
    <div className="absolute left-[22px] top-[70px] text-[8px] leading-[12px]">
      <div className="font-bold">BILL TO</div>
      <div>Titan Structures LLC</div>
      <div>412 Foundry Rd, Tulsa OK</div>
    </div>
    <div className="absolute left-[196px] top-[72px] text-[9px] leading-[17px]">
      <div><span className="font-bold inline-block w-[46px]">PO #</span>23456</div>
      <div><span className="font-bold inline-block w-[46px]">DATE</span>09/28/26</div>
    </div>
    <div className="absolute left-[22px] top-[122px] text-[8px]">
      <span className="font-bold">SHIP TO</span>&nbsp;&nbsp;Ridgeview Farms · Lot 14, Hwy 9
    </div>

    {/* Line item table */}
    <div className="absolute left-[16px] right-[14px] top-[148px] h-[18px] bg-[#2b2f36] text-white text-[7.5px] font-bold flex items-center">
      <span className="w-[86px] pl-[6px]">ITEM</span>
      <span className="flex-1">DESCRIPTION</span>
      <span className="w-[48px] text-center">QTY</span>
      <span className="w-[50px] text-center">LENGTH</span>
    </div>
    {[
      ['W8X18-GALV', 'Wide flange beam, galv.', '12', '24′-0″'],
      ['CP8-14', 'C-purlin 8″ 14 ga', '36', '20′-0″'],
      ['AK-075', 'Anchor kit ¾″', '28', '—'],
      ['', '', '', ''],
      ['', '', '', ''],
    ].map(([item, desc, qty, len], i) => (
      <div
        key={i}
        className="absolute left-[16px] right-[14px] h-[28px] border-b border-[#9a9a96] text-[8.5px] flex items-center"
        style={{ top: 168 + i * 28 }}
      >
        <span className="w-[86px] pl-[6px] font-bold">{item}</span>
        <span className="flex-1">{desc}</span>
        <span className="w-[48px] text-center relative">
          {i === 0 ? <span className="line-through decoration-[#1d3f9e] decoration-[1.5px]">{qty}</span> : qty}
        </span>
        <span className="w-[50px] text-center">{len}</span>
      </div>
    ))}

    {/* Hand-written correction on line 1 */}
    <div
      className="absolute text-[#1d3f9e] text-[19px] font-bold"
      style={{ ...HANDWRITING, left: 286, top: 160, transform: 'rotate(-8deg)' }}
    >
      14
    </div>

    {/* Hand-written rush note */}
    <div
      className="absolute text-[#1d3f9e] leading-[20px]"
      style={{ ...HANDWRITING, left: 28, top: 306, transform: 'rotate(-3deg)' }}
    >
      <div className="text-[21px] font-bold">RUSH — need by Fri 10/2!</div>
      <div className="text-[15px]">call Mike if beams short</div>
    </div>

    {/* Signature */}
    <div className="absolute left-[22px] right-[22px] top-[396px] flex items-end justify-between text-[7.5px]">
      <div>
        <div className="text-[#2a2f3a] text-[18px] leading-none" style={HANDWRITING}>
          R. Dalton
        </div>
        <div className="border-t border-[#55555a] pt-[2px] w-[110px]">Authorized by</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-[9px]">Page 1 of 1</div>
      </div>
    </div>

    {/* Paper fibre / lighting so it sits in the photo's light */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.12))',
      }}
    />
  </div>
));
PaperDocument.displayName = 'PaperDocument';

const ScreenField = ({ x, y, w, label, value, active }) => (
  <div className="absolute" style={{ left: x, top: y, width: w }}>
    <div className="text-[7px] font-bold tracking-[0.06em] text-[#6b7380]">{label}</div>
    <div
      className={`mt-[2px] h-[19px] px-[6px] rounded-[2px] border text-[9px] text-[#1f2733] flex items-center ${
        active ? 'border-[#3b6fd8] bg-[#f4f8ff] shadow-[0_0_0_2px_rgba(59,111,216,0.18)]' : 'border-[#cfd4db] bg-white'
      }`}
    >
      {value}
      {active && <span className="ml-[1px] w-[1px] h-[11px] bg-[#1f2733]" />}
    </div>
  </div>
);

// The photo plus everything projected onto it, at a given moment of the cycle
const SceneStage = ({ elapsed, transform }) => {
  const isPhase2 = elapsed >= P2_START && elapsed < P3_START;
  const isPhase3 = elapsed >= P3_START && elapsed < P4_START;
  const isPhase4 = elapsed >= P4_START && elapsed < RESET_START;
  const isResetting = elapsed >= RESET_START;
  const isSaved = isPhase4 || isResetting;

  // Scanner light travelling down the page during Phase 2
  const scanProgress = progress(elapsed, P2_START + 200, P3_START - 300);
  const scanY = scanProgress * PAPER_H;
  const scanVisible = isPhase2 && scanProgress > 0 && scanProgress < 1;
  const scanOpacity = Math.sin(scanProgress * Math.PI) * 0.85 + 0.15;

  // Per-field timeline: detected by the scan, then entered one at a time
  const fieldStates = FIELDS.map((field, i) => {
    const detectAt = P2_START + 200 + ((field.paper.y + field.paper.h) / PAPER_H) * (P3_START - 500 - P2_START);
    const enterStart = P3_START + i * STEP_MS;
    const enterEnd = enterStart + STEP_MS;
    return {
      ...field,
      detected: elapsed >= detectAt,
      detectFade: progress(elapsed, detectAt, detectAt + 300),
      entering: elapsed >= enterStart && elapsed < enterEnd,
      entered: elapsed >= enterEnd,
      enterProgress: progress(elapsed, enterStart + 60, enterEnd - 140),
    };
  });
  const fieldById = Object.fromEntries(fieldStates.map((f) => [f.id, f]));
  const activeField = fieldStates.find((f) => f.entering);

  // Ink stamp lands right after save
  const stampP = progress(elapsed, P4_START + 250, P4_START + 520);
  const savePressed = elapsed >= P4_START && elapsed < P4_START + 260;
  const saveGlow = isSaved ? Math.max(0, 1 - progress(elapsed, P4_START, P4_START + 2600)) : 0;

  // Light thread from the paper line to the screen field being written
  let thread = null;
  if (activeField) {
    const { x, y, w, h } = activeField.paper;
    const from = PAPER.project(x + w / 2, y + h / 2);
    const to = SCREEN.project(activeField.screen[0], activeField.screen[1]);
    const ctrl = [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - 70];
    const t = easeInOut(activeField.enterProgress);
    const bez = (a, b, c) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;
    thread = {
      d: `M ${from[0]} ${from[1]} Q ${ctrl[0]} ${ctrl[1]} ${to[0]} ${to[1]}`,
      dot: [bez(from[0], ctrl[0], to[0]), bez(from[1], ctrl[1], to[1])],
      opacity: Math.sin(activeField.enterProgress * Math.PI),
    };
  }
  const scanCenter = PAPER.project(PAPER_W / 2, scanY);

  const fieldValue = (id, text) => {
    const f = fieldById[id];
    return f.entered ? text : f.entering ? typed(text, f.enterProgress) : '';
  };
  const isTyping = (id) => fieldById[id].entering;

  return (
    <div
      className="absolute left-0 top-0 origin-top-left will-change-transform"
      style={{ width: STAGE_W, height: STAGE_H, transform }}
    >
        <img
          src="/images/hero-workstation-base.jpg"
          alt=""
          width={STAGE_W}
          height={STAGE_H}
          className="absolute inset-0 w-full h-full filter brightness-[0.92] contrast-[1.04]"
          draggable="false"
        />

        {/* Warm key light pooling on the paper */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 180,
            top: 360,
            width: 520,
            height: 320,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255,226,190,0.16), transparent 65%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Display light spilling onto keyboard and desk */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 560,
            top: 400,
            width: 620,
            height: 330,
            background: `radial-gradient(ellipse at 52% 18%, rgba(${
              saveGlow > 0 ? '150,235,200' : '190,210,255'
            },${0.14 + saveGlow * 0.12}), transparent 68%)`,
            mixBlendMode: 'screen',
          }}
        />

        {/* Scanner light spilling on the desk around the page */}
        {scanVisible && (
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              left: scanCenter[0] - 190,
              top: scanCenter[1] - 60,
              width: 380,
              height: 120,
              opacity: scanOpacity * 0.55,
              background: 'radial-gradient(ellipse at center, rgba(190,212,255,0.45), transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* ------------------------------------------------------------
            THE PAPER — printed PO, scan light, highlighter marks, stamp
           ------------------------------------------------------------ */}
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: PAPER_W, height: PAPER_H, transform: PAPER.css }}
        >
          <PaperDocument />

          {/* Field marks — read by AI, then confirmed once entered */}
          {fieldStates.map((f) => {
            if (!f.detected) return null;
            const done = f.entered;
            return (
              <div
                key={f.id}
                className="absolute rounded-[3px]"
                style={{
                  left: f.paper.x,
                  top: f.paper.y,
                  width: f.paper.w,
                  height: f.paper.h,
                  opacity: f.detectFade * (isSaved ? 0.7 : 1),
                  border: `2px solid ${done ? 'rgba(22,163,102,0.85)' : 'rgba(47,107,255,0.85)'}`,
                  background: f.entering
                    ? 'rgba(47,107,255,0.26)'
                    : done
                    ? 'rgba(22,163,102,0.12)'
                    : 'rgba(47,107,255,0.12)',
                  boxShadow: f.entering ? '0 0 18px 2px rgba(47,107,255,0.55)' : 'none',
                }}
              >
                {done && (
                  <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-[#16a366] text-white text-[8px] leading-[11px] text-center font-bold">
                    ✓
                  </span>
                )}
              </div>
            );
          })}

          {/* Scanner light bar */}
          {scanVisible && (
            <>
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  top: Math.max(0, scanY - 70),
                  height: Math.min(70, scanY),
                  opacity: scanOpacity,
                  background: 'linear-gradient(to bottom, transparent, rgba(170,200,255,0.28))',
                }}
              />
              <div
                className="absolute -left-[14px] -right-[14px] h-[3px] pointer-events-none"
                style={{
                  top: scanY - 1.5,
                  opacity: scanOpacity,
                  background: 'linear-gradient(to right, transparent, #f5f9ff 12%, #ffffff 50%, #f5f9ff 88%, transparent)',
                  boxShadow: '0 0 16px 5px rgba(160,195,255,0.7)',
                }}
              />
            </>
          )}

          {/* "Entered" ink stamp */}
          {stampP > 0 && (
            <div
              className="absolute text-[#178a58] border-[3px] border-[#178a58] rounded-[6px] px-[10px] py-[4px] text-center"
              style={{
                left: 184,
                top: 330,
                opacity: stampP * 0.82,
                transform: `rotate(-11deg) scale(${lerp(1.7, 1, stampP)})`,
                mixBlendMode: 'multiply',
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              <div className="text-[19px] font-extrabold tracking-[0.12em] leading-none">ENTERED</div>
              <div className="text-[8px] font-bold tracking-[0.14em] mt-[3px]">NETSUITE · SO-9842</div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------
            THE LAPTOP DISPLAY — NetSuite sales order filling in
           ------------------------------------------------------------ */}
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[8px]"
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: SCREEN.css,
            fontFamily: 'Manrope, sans-serif',
            background: '#f2f4f7',
            filter: 'brightness(0.8) contrast(1.05)',
          }}
        >
          {/* Browser chrome */}
          <div className="absolute inset-x-0 top-0 h-[20px] bg-[#1c222b] flex items-center px-[8px] gap-[4px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
            <span className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
            <span className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
            <span className="ml-auto mr-[40px] w-[150px] h-[11px] rounded-full bg-[#2c3440] text-[6px] text-[#9aa3b0] flex items-center justify-center">
              netsuite.com/app/accounting/transactions
            </span>
          </div>
          {/* Camera notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[62px] h-[13px] bg-black rounded-b-[6px]" />

          {/* NetSuite header + nav */}
          <div className="absolute inset-x-0 top-[20px] h-[26px] bg-[#2d3a4b] flex items-center px-[12px] text-white">
            <span className="text-[11px] font-extrabold tracking-[0.02em]">NetSuite</span>
            <span className="ml-[10px] text-[8px] text-[#b8c2d0]">Ridgeline Steel Buildings</span>
            <span className="ml-auto w-[120px] h-[13px] rounded-[2px] bg-[#3e4c60]" />
            <span className="ml-[10px] w-[14px] h-[14px] rounded-full bg-[#5c6c82]" />
          </div>
          <div className="absolute inset-x-0 top-[46px] h-[16px] bg-[#e4e8ed] flex items-center gap-[14px] px-[12px] text-[7.5px] text-[#3b4452] font-semibold">
            <span>Activities</span>
            <span className="text-[#1f2733] border-b-2 border-[#3b6fd8] leading-[14px]">Transactions</span>
            <span>Lists</span>
            <span>Reports</span>
            <span>Customization</span>
          </div>

          {/* Saved confirmation */}
          {isSaved && (
            <div
              className="absolute left-[12px] right-[12px] top-[66px] h-[18px] rounded-[2px] bg-[#e3f5ec] border border-[#9fd6bb] text-[#14663f] text-[8px] font-bold flex items-center px-[8px]"
              style={{ opacity: progress(elapsed, P4_START + 150, P4_START + 450) }}
            >
              ✓ Transaction successfully saved — Sales Order #SO-9842
            </div>
          )}

          {/* Title row */}
          <div className="absolute left-[14px] right-[14px] top-[90px] flex items-center">
            <span className="text-[16px] font-extrabold text-[#1f2733]">Sales Order</span>
            {isSaved && <span className="ml-[6px] text-[12px] font-bold text-[#6b7380]">SO-9842</span>}
            <span
              className={`ml-[8px] px-[6px] py-[1px] rounded-full text-[7px] font-bold ${
                isSaved
                  ? 'bg-[#dff3e8] text-[#14663f]'
                  : isPhase3
                  ? 'bg-[#e3ebfb] text-[#2c56b0]'
                  : 'bg-[#e6e9ed] text-[#5b6472]'
              }`}
            >
              {isSaved ? 'Pending Fulfillment' : isPhase3 ? 'Entering…' : 'New'}
            </span>
            <span
              className="ml-auto px-[10px] py-[3px] rounded-[2px] text-white text-[8px] font-bold"
              style={{
                background: savePressed ? '#244ea6' : '#3b6fd8',
                transform: savePressed ? 'scale(0.94)' : 'none',
              }}
            >
              Save
            </span>
            <span className="ml-[5px] px-[8px] py-[3px] rounded-[2px] bg-[#e4e8ed] text-[#3b4452] text-[8px] font-bold">
              Cancel
            </span>
          </div>

          {/* Primary information */}
          <div className="absolute left-[14px] top-[121px] text-[7px] font-extrabold tracking-[0.1em] text-[#8a929e]">
            PRIMARY INFORMATION
          </div>
          <ScreenField x={14} y={134} w={168} label="CUSTOMER" value={fieldValue('po', 'Titan Structures LLC')} active={isTyping('po')} />
          <ScreenField x={196} y={134} w={168} label="PO #" value={fieldValue('po', '23456')} active={false} />
          <ScreenField x={378} y={134} w={168} label="DATE" value={fieldValue('po', '9/28/2026')} active={false} />
          <ScreenField x={14} y={172} w={168} label="SHIP DATE" value={fieldValue('note', '10/2/2026')} active={isTyping('note')} />
          <ScreenField x={196} y={172} w={168} label="PRIORITY" value={fieldValue('note', 'Rush')} active={false} />
          <ScreenField x={378} y={172} w={168} label="MEMO" value={fieldValue('note', 'Per dealer note')} active={false} />

          {/* Items sublist */}
          <div className="absolute left-[14px] top-[212px] text-[8.5px] font-extrabold text-[#1f2733] border-b-2 border-[#3b6fd8] pb-[1px]">
            Items
          </div>
          <div className="absolute left-[14px] right-[14px] top-[228px] h-[14px] bg-[#e4e8ed] text-[6.5px] font-extrabold tracking-[0.06em] text-[#5b6472] flex items-center">
            <span className="w-[100px] pl-[6px]">ITEM</span>
            <span className="flex-1">DESCRIPTION</span>
            <span className="w-[40px] text-right">QTY</span>
            <span className="w-[44px] text-center">UNITS</span>
            <span className="w-[80px] text-right pr-[6px]">AMOUNT</span>
          </div>
          {LINE_ITEMS.map((row, i) => {
            const id = `line${i + 1}`;
            const f = fieldById[id];
            return (
              <div
                key={id}
                className="absolute left-[14px] right-[14px] h-[24px] border-b border-[#dde1e6] text-[8px] text-[#1f2733] flex items-center"
                style={{
                  top: 242 + i * 24,
                  background: f.entering ? '#eaf1ff' : f.entered ? '#ffffff' : 'transparent',
                }}
              >
                <span className="w-[100px] pl-[6px] font-bold text-[#2c56b0]">{fieldValue(id, row.item)}</span>
                <span className="flex-1">{fieldValue(id, row.desc)}</span>
                <span className="w-[40px] text-right">{fieldValue(id, row.qty)}</span>
                <span className="w-[44px] text-center">{fieldValue(id, row.units)}</span>
                <span className="w-[80px] text-right pr-[6px]">{fieldValue(id, row.amount)}</span>
              </div>
            );
          })}

          {/* Totals */}
          {fieldById.line3.entered && (
            <div className="absolute right-[20px] top-[326px] flex items-baseline gap-[10px] text-[#1f2733]">
              <span className="text-[7px] font-extrabold tracking-[0.1em] text-[#8a929e]">TOTAL</span>
              <span className="text-[13px] font-extrabold">$8,568.00</span>
            </div>
          )}
          {isSaved && (
            <div className="absolute left-[14px] top-[358px] text-[7px] text-[#6b7380]">
              Created by ALAQ order agent · 14 of 14 fields validated · 0 manual keystrokes
            </div>
          )}

          {/* Glass reflection + display falloff */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(118deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 32%, transparent 45%), radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.22) 100%)',
            }}
          />
        </div>

        {/* Thread of light from the page to the field being written */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={STAGE_W}
          height={STAGE_H}
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroThreadGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8DB4FF" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#cfe0ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
            <filter id="heroThreadGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          {thread && (
            <g opacity={thread.opacity}>
              <path d={thread.d} stroke="url(#heroThreadGrad)" strokeWidth="1.5" />
              <circle cx={thread.dot[0]} cy={thread.dot[1]} r="9" fill="#a9c6ff" filter="url(#heroThreadGlow)" />
              <circle cx={thread.dot[0]} cy={thread.dot[1]} r="3" fill="#ffffff" />
            </g>
          )}
        </svg>
    </div>
  );
};

const HeroAutomationVisual = ({ isPaused = false, prefersReducedMotion = false }) => {
  const [elapsed, setElapsed] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState({ w: 660, h: 495 });
  const cardRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Track the card size so the photo always covers it
  useLayoutEffect(() => {
    const node = cardRef.current;
    if (!node) return undefined;
    const update = () => setSize({ w: node.clientWidth, h: node.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Smooth continuous requestAnimationFrame ticker
  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const tick = (currentTime) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      const delta = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (!isPaused && !isHovered) {
        setElapsed((prev) => (prev + delta) % CYCLE_DURATION);
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, isHovered, prefersReducedMotion]);

  // Reduced motion: no camera move, hold on the final step
  const t = prefersReducedMotion ? REDUCED_MOTION_T : elapsed;
  const shot = prefersReducedMotion ? SHOTS.desk : shotAt(t);
  const crossfade = prefersReducedMotion ? 0 : easeInOut(progress(t, CROSSFADE_START, CYCLE_DURATION));
  const stepIndex = t < P2_START ? 0 : t < P3_START ? 1 : 2;
  const captionIndex = t < P4_START ? stepIndex : 3;

  return (
    <div
      ref={cardRef}
      className="relative w-full lg:max-w-[693px] aspect-[4/3] rounded-[28px] overflow-hidden border border-white/10 bg-[#0B0F17] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)] select-none isolate"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        role="img"
        aria-label="A dealer purchase order on a desk is read by AI and entered into a NetSuite sales order on the laptop"
        className="absolute inset-0"
      >
        <SceneStage elapsed={t} transform={stageTransform(shot, size.w, size.h)} />

        {/* Soft crossfade back to the opening shot */}
        {crossfade > 0 && (
          <div className="absolute inset-0" style={{ opacity: crossfade }}>
            <SceneStage elapsed={0} transform={stageTransform(shotAt(0), size.w, size.h)} />
          </div>
        )}
      </div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 50% 42%, transparent 55%, rgba(11, 15, 23, 0.45) 100%)',
        }}
      />

      {/* Caption and step timeline, inside the card along the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 px-4 pt-12 pb-3.5 sm:px-6 sm:pt-16 sm:pb-5"
        style={{
          background:
            'linear-gradient(to top, rgba(11, 15, 23, 0.94) 0%, rgba(11, 15, 23, 0.72) 48%, rgba(11, 15, 23, 0) 100%)',
        }}
      >
        <p
          key={captionIndex}
          className="hero-caption-in text-[14px] sm:text-[16px] lg:text-[17px] leading-snug font-medium text-white"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          {CAPTIONS[captionIndex]}
        </p>

        <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-3 sm:gap-5">
          {STEPS.map((step, i) => {
            const active = i === stepIndex;
            const fill = prefersReducedMotion ? 1 : progress(t, step.start, step.end);
            return (
              <button
                key={step.label}
                type="button"
                onClick={() => setElapsed(step.jump)}
                aria-current={active ? 'step' : undefined}
                className="group/step text-left min-w-0"
              >
                <span className="block h-[2px] rounded-full bg-white/20 overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-white"
                    style={{ width: `${fill * 100}%`, opacity: active ? 1 : 0.55 }}
                  />
                </span>
                <span
                  className={`mt-2 block text-[10.5px] sm:text-[12.5px] leading-tight font-medium transition-colors ${
                    active ? 'text-white' : 'text-white/55 group-hover/step:text-white/80'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroAutomationVisual;
