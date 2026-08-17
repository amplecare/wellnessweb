/**
 * WCAG 2.2 contrast verification for the Ample Care "Aurora" palette.
 *
 * Glass interfaces fail accessibility more often than any other visual style,
 * because the blur gets checked and the text sitting on it does not. The rule in
 * this system is that text never sits on translucency alone — every text-bearing
 * surface has a solid backing colour beneath the blur, and those solid values are
 * what this script verifies.
 *
 * Run `npm run contrast`. Nothing ships below AA.
 *
 * AA thresholds: 4.5:1 normal text, 3.0:1 large text (>=24px, or >=18.66px bold)
 * and non-text UI components / graphical objects.
 */

const tokens = {
  // --- Canvas. The ground everything floats on. ---------------------------
  void: '#050411',
  abyss: '#0A0819',
  deep: '#110D24',
  'deep-raised': '#191333',

  // Effective solid values of the glass surfaces at their stated opacity over
  // the canvas. These — not the translucent declarations — are what text sits on.
  'glass-solid': '#191333',
  'glass-raised-solid': '#241C48',

  // --- Violet — primary identity ------------------------------------------
  'violet-50': '#F5F3FF',
  'violet-100': '#ECE8FF',
  'violet-200': '#DAD2FF',
  'violet-300': '#BFB0FF',
  'violet-400': '#A184FF',
  'violet-500': '#8257FE',
  'violet-600': '#6D38F5',
  'violet-700': '#5B27D8',
  'violet-800': '#4A1FAE',
  'violet-900': '#3C1C88',
  'violet-950': '#240F5C',

  // --- Mint — accent, confirmation ----------------------------------------
  'mint-100': '#D5FBEC',
  'mint-200': '#AEF5DA',
  'mint-300': '#6FE9C1',
  'mint-400': '#2FD6A3',
  'mint-500': '#02A074',
  'mint-600': '#01966F',
  'mint-700': '#00785B',
  'mint-800': '#035F4A',
  'mint-900': '#044E3E',

  // --- Amber — attention ---------------------------------------------------
  'amber-100': '#FFF2D6',
  'amber-300': '#FFD27A',
  'amber-400': '#FBB838',
  'amber-600': '#B97309',
  'amber-800': '#8A5406',

  // --- Rose — urgency ------------------------------------------------------
  'rose-100': '#FFE4E9',
  'rose-300': '#FFA8B8',
  'rose-400': '#FB7189',
  'rose-600': '#D51E42',
  'rose-800': '#A01031',

  // --- Neutrals ------------------------------------------------------------
  ink: '#120F1E',
  'ink-soft': '#3D3752',
  'ink-muted': '#5D5673',
  paper: '#FFFFFF',
  white: '#FFFFFF',
  'paper-lumen': '#F8F7FD',
  line: '#E6E2F2',
  'line-strong': '#7D7594',

  // --- Text on the deep canvas --------------------------------------------
  lumen: '#F4F2FF',
  'lumen-soft': '#CDC6EC',
  'lumen-muted': '#A49BC9',

  // --- Chart marks ---------------------------------------------------------
  'chart-accent': '#6D38F5',
  'chart-accent-deep': '#4A1FAE',
  'chart-baseline': '#8B6BFF',
  'chart-muted': '#5D5673',
};

function srgbToLinear(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Every foreground/background pairing the system actually ships.
 *   'body'  -> 4.5:1  (normal-size text)
 *   'large' -> 3.0:1  (>=24px or >=18.66px bold — display headings only)
 *   'ui'    -> 3.0:1  (borders, focus rings, icons, graphical objects)
 */
const pairs = [
  // ---- Text on the deep canvas -------------------------------------------
  ['lumen', 'void', 'body', 'Primary text on canvas'],
  ['lumen', 'abyss', 'body', 'Primary text on abyss'],
  ['lumen', 'deep', 'body', 'Primary text on deep'],
  ['lumen-soft', 'void', 'body', 'Secondary text on canvas'],
  ['lumen-soft', 'deep', 'body', 'Secondary text on deep'],
  ['lumen-muted', 'void', 'body', 'Muted meta text on canvas'],
  ['lumen-muted', 'abyss', 'body', 'Muted meta text on abyss'],

  // ---- Text on glass, measured against the solid backing ------------------
  ['lumen', 'glass-solid', 'body', 'Text on glass'],
  ['lumen', 'glass-raised-solid', 'body', 'Text on raised glass'],
  ['lumen-soft', 'glass-solid', 'body', 'Secondary text on glass'],
  ['lumen-soft', 'glass-raised-solid', 'body', 'Secondary on raised glass'],
  ['lumen-muted', 'glass-solid', 'body', 'Muted text on glass'],
  ['mint-300', 'glass-solid', 'body', 'Mint accent text on glass'],
  ['violet-300', 'glass-solid', 'body', 'Violet accent text on glass'],

  // ---- Accents on the canvas ---------------------------------------------
  ['mint-300', 'void', 'body', 'Mint accent on canvas'],
  ['mint-300', 'deep', 'body', 'Mint accent on deep'],
  ['violet-300', 'void', 'body', 'Violet accent on canvas'],
  ['violet-200', 'void', 'body', 'Light violet on canvas'],
  ['amber-300', 'deep', 'body', 'Amber attention text on deep'],
  ['rose-300', 'deep', 'body', 'Rose urgency text on deep'],

  // ---- Lumen mode: the dashboard -----------------------------------------
  ['ink', 'paper', 'body', 'Body text on white'],
  ['ink', 'paper-lumen', 'body', 'Body text on lumen surface'],
  ['ink-soft', 'paper', 'body', 'Secondary text on white'],
  ['ink-soft', 'paper-lumen', 'body', 'Secondary text on lumen'],
  ['ink-muted', 'paper', 'body', 'Muted meta text on white'],
  ['violet-700', 'paper', 'body', 'Violet links/headings on white'],
  ['violet-700', 'paper-lumen', 'body', 'Violet headings on lumen'],
  ['violet-800', 'violet-100', 'body', 'Violet text on violet tint'],
  ['mint-800', 'mint-100', 'body', 'Mint status text on mint tint'],
  ['amber-800', 'amber-100', 'body', 'Amber status text on amber tint'],
  ['rose-800', 'rose-100', 'body', 'Rose status text on rose tint'],

  // ---- Buttons ------------------------------------------------------------
  ['paper', 'violet-600', 'body', 'White text on primary violet button'],
  ['paper', 'violet-700', 'body', 'White text on violet-700'],
  ['ink', 'mint-300', 'body', 'Dark text on mint button'],
  ['paper', 'mint-700', 'body', 'White text on mint-700 button'],
  ['paper', 'rose-600', 'body', 'White text on destructive button'],

  ['ink', 'mint-500', 'body', 'Dark text on mint-500 fill'],
  ['white', 'violet-600', 'body', 'White text on violet-600 fill'],
  ['mint-800', 'mint-100', 'body', 'Sample-data tag, readable on any ground'],
  ['mint-700', 'mint-100', 'ui', 'Sample-data tag marker dot'],

  // ---- Large display type only --------------------------------------------
  ['violet-400', 'void', 'large', 'Large display type on canvas'],
  ['violet-600', 'paper', 'large', 'Large violet heading on white'],
  ['mint-400', 'deep', 'large', 'Large mint figure on deep'],

  // ---- Non-text UI ---------------------------------------------------------
  ['line-strong', 'paper', 'ui', 'Form control borders on white'],
  ['line-strong', 'paper-lumen', 'ui', 'Form control borders on lumen'],
  ['violet-600', 'paper', 'ui', 'Focus ring on light ground'],
  ['mint-300', 'void', 'ui', 'Focus ring on canvas'],
  ['mint-300', 'glass-solid', 'ui', 'Focus ring on glass'],
  ['violet-400', 'deep', 'ui', 'Icon strokes on deep'],
  ['lumen-muted', 'deep', 'ui', 'Hairline divider on deep'],
  ['amber-400', 'deep', 'ui', 'Attention indicator on deep'],
  ['rose-400', 'deep', 'ui', 'Urgency indicator on deep'],
  ['mint-500', 'paper', 'ui', 'Mint indicator on white'],


  // ---- Insight report: renders as a white document on the dark canvas ------
  // A report should look like the thing it is, so it is paper. Every mark inside
  // it is therefore reasoned against white rather than against the void.
  ['ink', 'paper', 'body', 'Report body text on paper'],
  ['ink-soft', 'paper', 'body', 'Report secondary text on paper'],
  ['ink-muted', 'paper', 'body', 'Report caption text on paper'],
  ['ink-muted', 'paper-lumen', 'body', 'Report caption on report chrome'],
  ['violet-700', 'paper', 'body', 'Report accent text on paper'],
  ['mint-700', 'paper', 'body', 'Report improvement text on paper'],
  ['mint-800', 'mint-100', 'body', 'Report improvement pill'],
  ['violet-600', 'paper', 'ui', 'Report value bar on paper'],
  ['violet-800', 'paper', 'ui', 'Report current-value marker'],
  ['chart-baseline', 'paper', 'ui', 'Report baseline marker'],
  ['ink-muted', 'paper', 'ui', 'Report de-emphasised mark'],
  ['line-strong', 'paper', 'ui', 'Report control border'],

  ['line-strong', 'glass-solid', 'ui', 'Form control border on glass'],
  ['mint-300', 'glass-solid', 'ui', 'Form control focus border on glass'],
  ['rose-400', 'glass-solid', 'ui', 'Form control error border on glass'],
  ['lumen', 'deep-raised', 'body', 'Native select option text'],
  ['white', 'violet-600', 'ui', 'Selected option highlight'],
  ['violet-900', 'violet-100', 'body', 'Selected option, dashboard'],

  // ---- Chart marks ---------------------------------------------------------
  ['chart-accent', 'paper', 'ui', 'Chart accent on white'],
  ['chart-accent', 'paper-lumen', 'ui', 'Chart accent on lumen'],
  ['chart-accent-deep', 'paper', 'ui', 'Chart marker, deep'],
  ['chart-baseline', 'paper', 'ui', 'Chart baseline marker'],
  ['chart-muted', 'paper', 'ui', 'De-emphasised chart mark on white'],
  ['violet-400', 'void', 'ui', 'Chart mark on canvas'],
  ['mint-400', 'void', 'ui', 'Chart accent mark on canvas'],
];

const threshold = { body: 4.5, large: 3.0, ui: 3.0 };

let failures = 0;
const rows = pairs.map(([fg, bg, level, label]) => {
  const fgHex = tokens[fg];
  const bgHex = tokens[bg];
  if (!fgHex || !bgHex) {
    throw new Error(`Unknown token in pair: ${fg} / ${bg}`);
  }
  const r = ratio(fgHex, bgHex);
  const min = threshold[level];
  const pass = r >= min;
  if (!pass) failures += 1;
  return { label, fg, bg, level, ratio: r, min, pass };
});

const pad = (s, n) => String(s).padEnd(n);
console.log('\n  Ample Care "Aurora" — WCAG 2.2 AA contrast verification\n');
console.log(`  ${pad('PAIR', 42)}${pad('LEVEL', 8)}${pad('RATIO', 9)}${pad('MIN', 7)}RESULT`);
console.log('  ' + '-'.repeat(74));
for (const row of rows) {
  console.log(
    `  ${pad(row.label, 42)}${pad(row.level, 8)}${pad(row.ratio.toFixed(2) + ':1', 9)}${pad(
      row.min.toFixed(1) + ':1',
      7
    )}${row.pass ? 'PASS' : 'FAIL'}`
  );
}
console.log('  ' + '-'.repeat(74));
console.log(
  `\n  Note: token \`line\` (${tokens['line']}) is ${ratio(tokens['line'], tokens['paper']).toFixed(2)}:1 on white`
);
console.log('  and is deliberately excluded — it is used only for decorative rules and card');
console.log('  edges, which SC 1.4.11 exempts. Anything a user must locate as a control uses');
console.log('  `line-strong`, which is tested.');

if (failures > 0) {
  console.error(`\n  ${failures} pairing(s) below WCAG AA. Palette is NOT locked.\n`);
  process.exit(1);
}
console.log(`\n  All ${rows.length} shipped pairings meet WCAG 2.2 AA. Palette locked.\n`);
