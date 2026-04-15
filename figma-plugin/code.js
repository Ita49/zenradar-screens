// ============================================================
// ZenRadar — Splash Screen Builder (Figma Plugin)
// Targets: Frame node 1:2 in ZenRadar_Screens
// Design spec: screen-01-splash.html + tokens.css
// Colours: #1A3D7C (primary-dark) · #2E72C2 (primary) · #5BB3E0 (primary-light)
// Typography: DM Sans — Bold 36 / Light 36 / Regular 13 / Medium 11
// Canvas: 393 × 852 (iPhone 14 & 15 Pro)
// ============================================================

async function buildSplash() {
  // ── 0. Load fonts ──────────────────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: "DM Sans", style: "Light" }),
    figma.loadFontAsync({ family: "DM Sans", style: "Regular" }),
    figma.loadFontAsync({ family: "DM Sans", style: "Medium" }),
    figma.loadFontAsync({ family: "DM Sans", style: "Bold" }),
  ]);

  // ── 1. Locate target frame ─────────────────────────────────
  const frame = figma.currentPage.findOne(n => n.id === "1:2");
  if (!frame || frame.type !== "FRAME") {
    figma.closePlugin("❌ Frame 1:2 not found. Open ZenRadar_Screens and try again.");
    return;
  }

  frame.name = "Screen 01 — Splash";
  [...frame.children].forEach(c => c.remove()); // clear canvas

  const W = frame.width;   // 393
  const H = frame.height;  // 852
  const CX = W / 2;        // 196.5
  const CY = H / 2;        // 426

  // ── Helpers ────────────────────────────────────────────────

  // Hex string → Figma RGB (0–1 range)
  function hex(h) {
    return {
      r: parseInt(h.slice(1, 3), 16) / 255,
      g: parseInt(h.slice(3, 5), 16) / 255,
      b: parseInt(h.slice(5, 7), 16) / 255,
    };
  }

  // Solid white paint at given opacity
  function white(opacity) {
    return { type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity, blendMode: "NORMAL", visible: true };
  }

  // Linear gradient transform from CSS angle (degrees, CSS convention: 0° = top)
  // Maps gradient UV space: (0,0)=start → (1,0)=end, in normalised [0,1] node space.
  function linGradTransform(deg) {
    const θ = (deg * Math.PI) / 180;
    const s = Math.sin(θ);
    const c = Math.cos(θ);
    // Direction vector (s, -c) in screen coords (y↓), perpendicular is (c, s)
    return [
      [s,  c, 0.5 - 0.5 * s],
      [-c, s, 0.5 + 0.5 * c],
    ];
  }

  // ── 2. Background gradient rect ────────────────────────────
  // CSS: linear-gradient(160deg, #1F4F9A 0%, #1A3D7C 40%, #132E60 100%)
  const bgRect = figma.createRectangle();
  bgRect.name = "BG / Base Gradient";
  bgRect.resize(W, H);
  bgRect.x = 0; bgRect.y = 0;
  bgRect.fills = [{
    type: "GRADIENT_LINEAR",
    gradientTransform: linGradTransform(160),
    gradientStops: [
      { color: { ...hex("#1F4F9A"), a: 1 }, position: 0 },
      { color: { ...hex("#1A3D7C"), a: 1 }, position: 0.4 },
      { color: { ...hex("#132E60"), a: 1 }, position: 1 },
    ],
    visible: true, opacity: 1, blendMode: "NORMAL",
  }];
  frame.appendChild(bgRect);

  // ── 3. Radial glow — top ────────────────────────────────────
  // CSS: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(91,179,224,0.18) → transparent)
  const glowTop = figma.createEllipse();
  glowTop.name = "BG / Glow Top";
  glowTop.resize(W * 0.8, H * 0.6);
  glowTop.x = CX - (W * 0.4);
  glowTop.y = H * 0.3 - (H * 0.3);
  glowTop.fills = [{
    type: "GRADIENT_RADIAL",
    gradientTransform: [[0.5, 0, 0.5], [0, 0.5, 0.5]],
    gradientStops: [
      { color: { ...hex("#5BB3E0"), a: 0.18 }, position: 0 },
      { color: { ...hex("#5BB3E0"), a: 0 },    position: 1 },
    ],
    visible: true, opacity: 1, blendMode: "NORMAL",
  }];
  frame.appendChild(glowTop);

  // ── 4. Radial glow — bottom ─────────────────────────────────
  // CSS: radial-gradient(ellipse 60% 80% at 80% 80%, rgba(46,114,194,0.25) → transparent)
  const glowBot = figma.createEllipse();
  glowBot.name = "BG / Glow Bottom";
  glowBot.resize(W * 0.6, H * 0.8);
  glowBot.x = W * 0.8 - (W * 0.3);
  glowBot.y = H * 0.8 - (H * 0.4);
  glowBot.fills = [{
    type: "GRADIENT_RADIAL",
    gradientTransform: [[0.5, 0, 0.5], [0, 0.5, 0.5]],
    gradientStops: [
      { color: { ...hex("#2E72C2"), a: 0.25 }, position: 0 },
      { color: { ...hex("#2E72C2"), a: 0 },    position: 1 },
    ],
    visible: true, opacity: 1, blendMode: "NORMAL",
  }];
  frame.appendChild(glowBot);

  // ── 5. Radar rings ──────────────────────────────────────────
  // Three concentric rings centred on the frame
  const rings = [[280, 0.04], [420, 0.04], [560, 0.025]];
  rings.forEach(([sz, op], i) => {
    const ring = figma.createEllipse();
    ring.name = `BG / Ring ${i + 1}`;
    ring.resize(sz, sz);
    ring.x = CX - sz / 2;
    ring.y = CY - sz / 2;
    ring.fills = [];
    ring.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: op, blendMode: "NORMAL", visible: true }];
    ring.strokeWeight = 1;
    ring.strokeAlign = "CENTER";
    frame.appendChild(ring);
  });

  // ── 6. Logo SVG ─────────────────────────────────────────────
  // Recreates the ZenRadar radar mark using flat colours (gradient approx)
  const logoSvg = `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 14 48 A 34 34 0 1 1 48 82" stroke="#5BB3E0" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.7"/>
  <path d="M 22 48 A 26 26 0 1 1 48 74" stroke="#7EC8E8" stroke-width="3"   stroke-linecap="round" fill="none" opacity="0.85"/>
  <path d="M 30 48 A 18 18 0 1 1 48 66" stroke="#2E72C2" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <line x1="48" y1="48" x2="74" y2="18" stroke="#FFFFFF"  stroke-width="3"   stroke-linecap="round" opacity="0.9"/>
  <circle cx="48" cy="48" r="5"   fill="white"   opacity="0.95"/>
  <circle cx="48" cy="48" r="2.5" fill="#2E72C2"/>
</svg>`;
  const logo = figma.createNodeFromSvg(logoSvg);
  logo.name = "Logo / Icon";
  logo.resize(96, 96);

  // ── 7. Wordmark — "Zen" (Bold) + "Radar" (Light) ───────────
  const wordmark = figma.createFrame();
  wordmark.name = "Wordmark";
  wordmark.fills = [];
  wordmark.layoutMode = "HORIZONTAL";
  wordmark.primaryAxisAlignItems = "MIN";
  wordmark.counterAxisAlignItems = "MAX"; // bottom-align ≈ baseline
  wordmark.itemSpacing = 0;
  wordmark.paddingLeft = wordmark.paddingRight = 0;
  wordmark.paddingTop = wordmark.paddingBottom = 0;
  wordmark.primaryAxisSizingMode = "AUTO";
  wordmark.counterAxisSizingMode = "AUTO";

  const tZen = figma.createText();
  tZen.name = "Zen";
  tZen.fontName = { family: "DM Sans", style: "Bold" };
  tZen.fontSize = 36;
  tZen.characters = "Zen";
  tZen.letterSpacing = { value: -2, unit: "PERCENT" };
  tZen.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 1, blendMode: "NORMAL", visible: true }];
  tZen.textAutoResize = "WIDTH_AND_HEIGHT";

  const tRadar = figma.createText();
  tRadar.name = "Radar";
  tRadar.fontName = { family: "DM Sans", style: "Light" };
  tRadar.fontSize = 36;
  tRadar.characters = "Radar";
  tRadar.letterSpacing = { value: -1, unit: "PERCENT" };
  tRadar.fills = [white(0.75)];
  tRadar.textAutoResize = "WIDTH_AND_HEIGHT";

  wordmark.appendChild(tZen);
  wordmark.appendChild(tRadar);

  // ── 8. Tagline ──────────────────────────────────────────────
  // token: --text-sm (13px) · --font-regular · letter-spacing 0.12em
  const tTagline = figma.createText();
  tTagline.name = "Tagline";
  tTagline.fontName = { family: "DM Sans", style: "Regular" };
  tTagline.fontSize = 13;
  tTagline.characters = "FRESH TECH JOBS · DAILY";
  tTagline.letterSpacing = { value: 12, unit: "PERCENT" };
  tTagline.fills = [white(0.45)];
  tTagline.textAutoResize = "WIDTH_AND_HEIGHT";

  // ── 9. Append content to frame and measure ─────────────────
  // Append first so Figma computes real dimensions.
  frame.appendChild(logo);
  frame.appendChild(wordmark);
  frame.appendChild(tTagline);

  // Content block height: logo 96 + gap 20 + wordmark + gap 10 + tagline
  const contentH = logo.height + 20 + wordmark.height + 10 + tTagline.height;
  const topY = CY - contentH / 2;

  logo.x = CX - logo.width / 2;
  logo.y = topY;

  wordmark.x = CX - wordmark.width / 2;
  wordmark.y = topY + logo.height + 20;

  tTagline.x = CX - tTagline.width / 2;
  tTagline.y = wordmark.y + wordmark.height + 10;

  // ── 10. Loader progress bar ─────────────────────────────────
  // Shown at 80% loaded (static mockup state)
  const loaderY = H - 72;

  const lTrack = figma.createRectangle();
  lTrack.name = "Loader / Track";
  lTrack.resize(48, 3);
  lTrack.x = CX - 24; lTrack.y = loaderY;
  lTrack.cornerRadius = 99;
  lTrack.fills = [white(0.12)];
  frame.appendChild(lTrack);

  const lFill = figma.createRectangle();
  lFill.name = "Loader / Fill (80%)";
  lFill.resize(38, 3); // 80% of 48px track
  lFill.x = CX - 24; lFill.y = loaderY;
  lFill.cornerRadius = 99;
  lFill.fills = [{
    type: "GRADIENT_LINEAR",
    gradientTransform: [[1, 0, 0], [0, 1, 0.5]], // left → right
    gradientStops: [
      { color: { ...hex("#5BB3E0"), a: 1 }, position: 0 },
      { color: { r: 1, g: 1, b: 1, a: 1 },  position: 1 },
    ],
    visible: true, opacity: 1, blendMode: "NORMAL",
  }];
  frame.appendChild(lFill);

  // ── 11. Bottom brand — "Vijetan Careers" ───────────────────
  // token: font-size 11px · --font-medium · letter-spacing 0.1em
  const tBrand = figma.createText();
  tBrand.name = "Bottom Brand";
  tBrand.fontName = { family: "DM Sans", style: "Medium" };
  tBrand.fontSize = 11;
  tBrand.characters = "VIJETAN CAREERS";
  tBrand.letterSpacing = { value: 10, unit: "PERCENT" };
  tBrand.fills = [white(0.25)];
  tBrand.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(tBrand);
  tBrand.x = CX - tBrand.width / 2;
  tBrand.y = H - 36 - tBrand.height;

  // ── 12. Done ────────────────────────────────────────────────
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.closePlugin("✅ Screen 01 — Splash built in Frame 1:2");
}

buildSplash().catch(err => figma.closePlugin("❌ " + err.message));
