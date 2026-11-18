import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { skillCategories } from '../src/data/skillsData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Load upright square-cropped profile JPEG (600x600) from project assets
const jpegPath = resolve(rootDir, 'src/assets/profile-square.jpg');
const jpegBytes = readFileSync(jpegPath);

// A4 dimensions in PDF points (72 dpi)
const PAGE_W = 595.28;
const PAGE_H = 841.89;

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return `${r.toFixed(4)} ${g.toFixed(4)} ${b.toFixed(4)}`;
}

function esc(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/–/g, '-')
    .replace(/·/g, '\xb7')
    .replace(/•/g, '\x95');
}

function pdfY(topY, height = 0) {
  return +(PAGE_H - topY - height).toFixed(2);
}

const CHAR_WIDTHS = {
  ' ': 0.28, '!': 0.33, '"': 0.47, '#': 0.56, '$': 0.56, '%': 0.89, '&': 0.72, "'": 0.28,
  '(': 0.33, ')': 0.33, '*': 0.39, '+': 0.58, ',': 0.28, '-': 0.33, '.': 0.28, '/': 0.28,
  '0': 0.56, '1': 0.56, '2': 0.56, '3': 0.56, '4': 0.56, '5': 0.56, '6': 0.56, '7': 0.56,
  '8': 0.56, '9': 0.56, ':': 0.33, ';': 0.33, '<': 0.58, '=': 0.58, '>': 0.58, '?': 0.61,
  '@': 0.98, 'A': 0.72, 'B': 0.72, 'C': 0.72, 'D': 0.72, 'E': 0.67, 'F': 0.61, 'G': 0.78,
  'H': 0.72, 'I': 0.28, 'J': 0.56, 'K': 0.72, 'L': 0.61, 'M': 0.83, 'N': 0.72, 'O': 0.78,
  'P': 0.67, 'Q': 0.78, 'R': 0.72, 'S': 0.67, 'T': 0.61, 'U': 0.72, 'V': 0.67, 'W': 0.94,
  'X': 0.67, 'Y': 0.67, 'Z': 0.61, 'a': 0.56, 'b': 0.61, 'c': 0.56, 'd': 0.61, 'e': 0.56,
  'f': 0.33, 'g': 0.61, 'h': 0.61, 'i': 0.28, 'j': 0.28, 'k': 0.56, 'l': 0.28, 'm': 0.89,
  'n': 0.61, 'o': 0.61, 'p': 0.61, 'q': 0.61, 'r': 0.39, 's': 0.56, 't': 0.33, 'u': 0.61,
  'v': 0.56, 'w': 0.78, 'x': 0.56, 'y': 0.56, 'z': 0.50,
};

function measureText(str, fontSize, charSpace = 0) {
  let w = 0;
  for (const ch of String(str)) {
    w += (CHAR_WIDTHS[ch] ?? 0.58) * fontSize + charSpace;
  }
  return w;
}

function roundedRectPath(x, topY, w, h, r) {
  const y = pdfY(topY, h);
  const k = 0.5522847498;
  const kr = +(r * k).toFixed(2);
  const x0 = +x.toFixed(2);
  const y0 = +y.toFixed(2);
  const x1 = +(x + w).toFixed(2);
  const y1 = +(y + h).toFixed(2);
  return [
    `${(x0 + r).toFixed(2)} ${y0} m`,
    `${(x1 - r).toFixed(2)} ${y0} l`,
    `${(x1 - r + kr).toFixed(2)} ${y0} ${x1} ${(y0 + r - kr).toFixed(2)} ${x1} ${(y0 + r).toFixed(2)} c`,
    `${x1} ${(y1 - r).toFixed(2)} l`,
    `${x1} ${(y1 - r + kr).toFixed(2)} ${(x1 - r + kr).toFixed(2)} ${y1} ${(x1 - r).toFixed(2)} ${y1} c`,
    `${(x0 + r).toFixed(2)} ${y1} l`,
    `${(x0 + r - kr).toFixed(2)} ${y1} ${x0} ${(y1 - r + kr).toFixed(2)} ${x0} ${(y1 - r).toFixed(2)} c`,
    `${x0} ${(y0 + r).toFixed(2)} l`,
    `${x0} ${(y0 + r - kr).toFixed(2)} ${(x0 + r - kr).toFixed(2)} ${y0} ${(x0 + r).toFixed(2)} ${y0} c`,
    'h',
  ].join(' ');
}

function circlePath(cx, topCy, r) {
  const cy = pdfY(topCy, 0);
  const k = 0.5522847498;
  const kr = +(r * k).toFixed(2);
  return [
    `${(cx - r).toFixed(2)} ${cy.toFixed(2)} m`,
    `${(cx - r).toFixed(2)} ${(cy + kr).toFixed(2)} ${(cx - kr).toFixed(2)} ${(cy + r).toFixed(2)} ${cx.toFixed(2)} ${(cy + r).toFixed(2)} c`,
    `${(cx + kr).toFixed(2)} ${(cy + r).toFixed(2)} ${(cx + r).toFixed(2)} ${(cy + kr).toFixed(2)} ${(cx + r).toFixed(2)} ${cy.toFixed(2)} c`,
    `${(cx + r).toFixed(2)} ${(cy - kr).toFixed(2)} ${(cx + kr).toFixed(2)} ${(cy - r).toFixed(2)} ${cx.toFixed(2)} ${(cy - r).toFixed(2)} c`,
    `${(cx - kr).toFixed(2)} ${(cy - r).toFixed(2)} ${(cx - r).toFixed(2)} ${(cy - kr).toFixed(2)} ${(cx - r).toFixed(2)} ${cy.toFixed(2)} c`,
    'h',
  ].join(' ');
}

class PageCanvas {
  constructor() {
    this.ops = [];
    this.links = [];
  }

  fillRect(x, topY, w, h, fillHex) {
    const y = pdfY(topY, h);
    this.ops.push(`q ${hexToRgb(fillHex)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f Q`);
  }

  fillRoundedRect(x, topY, w, h, r, fillHex, strokeHex = null, lineWidth = 1) {
    const path = roundedRectPath(x, topY, w, h, r);
    if (strokeHex) {
      this.ops.push(`q ${lineWidth.toFixed(2)} w ${hexToRgb(fillHex)} rg ${hexToRgb(strokeHex)} RG ${path} B Q`);
    } else {
      this.ops.push(`q ${hexToRgb(fillHex)} rg ${path} f Q`);
    }
  }

  leftAccentCard(x, topY, w, h, r, fillHex, borderHex, accentHex, accentW = 4) {
    this.fillRoundedRect(x, topY, w, h, r, fillHex, borderHex, 0.8);
    const clipPath = roundedRectPath(x, topY, w, h, r);
    const y = pdfY(topY, h);
    this.ops.push(
      `q ${clipPath} W n ${hexToRgb(accentHex)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${accentW.toFixed(2)} ${h.toFixed(2)} re f Q`
    );
  }

  line(x1, topY1, x2, topY2, strokeHex, lineWidth = 1) {
    const y1 = pdfY(topY1, 0);
    const y2 = pdfY(topY2, 0);
    this.ops.push(
      `q ${lineWidth.toFixed(2)} w ${hexToRgb(strokeHex)} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S Q`
    );
  }

  text(str, x, topBaselineY, { font = 'F1', size = 10, color = '#1E293B', charSpace = 0 } = {}) {
    const y = pdfY(topBaselineY, 0);
    const cs = charSpace ? `${charSpace.toFixed(2)} Tc ` : '';
    this.ops.push(
      `BT /${font} ${size.toFixed(2)} Tf ${hexToRgb(color)} rg ${cs}1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${esc(str)}) Tj ET`
    );
  }

  wrappedText(str, x, topBaselineY, maxWidth, lineHeight, opts = {}) {
    const size = opts.size || 10;
    const words = str.split(/\s+/);
    const lines = [];
    let current = '';
    for (const w of words) {
      const candidate = current ? `${current} ${w}` : w;
      if (measureText(candidate, size, opts.charSpace || 0) > maxWidth && current) {
        lines.push(current);
        current = w;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    lines.forEach((line, i) => {
      this.text(line, x, topBaselineY + i * lineHeight, opts);
    });
    return lines.length;
  }

  badgeRight(label, rightEdgeX, topY, h, fillHex, textHex, borderHex = null) {
    const fontSize = 7.5;
    const charSpace = 0.25;
    const textW = measureText(label, fontSize, charSpace);
    const w = textW + 18;
    const x = rightEdgeX - w;
    this.fillRoundedRect(x, topY, w, h, h / 2, fillHex, borderHex, 0.75);
    const tx = x + (w - textW) / 2;
    const ty = topY + h * 0.68;
    this.text(label, tx, ty, { font: 'F2', size: fontSize, color: textHex, charSpace });
  }

  sectionHeading(title, x, topY, contentW) {
    this.fillRoundedRect(x, topY, 4.5, 16, 2, '#2563EB');
    this.text(title.toUpperCase(), x + 12, topY + 13, {
      font: 'F2',
      size: 11.5,
      color: '#0B132B',
      charSpace: 0.65,
    });
    this.line(x, topY + 21, x + contentW, topY + 21, '#DBEAFE', 1.2);
    return topY + 31;
  }

  circularImage(cx, topCy, radius) {
    const outerPath = circlePath(cx, topCy, radius + 3);
    this.ops.push(`q ${hexToRgb('#3B82F6')} rg ${outerPath} f Q`);
    const midPath = circlePath(cx, topCy, radius + 1.2);
    this.ops.push(`q ${hexToRgb('#0B132B')} rg ${midPath} f Q`);
    const clip = circlePath(cx, topCy, radius);
    const x = +(cx - radius).toFixed(2);
    const y = pdfY(topCy + radius, 0);
    const d = +(radius * 2).toFixed(2);
    this.ops.push(`q ${clip} W n ${d} 0 0 ${d} ${x} ${y} cm /Im1 Do Q`);
  }

  addLink(x, topY, w, h, uri) {
    const yBottom = pdfY(topY, h);
    const yTop = pdfY(topY, 0);
    this.links.push({
      rect: [x.toFixed(2), yBottom.toFixed(2), (x + w).toFixed(2), yTop.toFixed(2)],
      uri,
    });
  }

  footer(pageNum, totalPages) {
    const footerTop = PAGE_H - 36;
    this.fillRect(0, footerTop, PAGE_W, 36, '#F8FAFC');
    this.line(0, footerTop, PAGE_W, footerTop, '#E2E8F0', 0.8);
    this.text('Tharanithan Santhirathas  ·  Curriculum Vitae', 40, footerTop + 21, {
      font: 'F1',
      size: 8.5,
      color: '#64748B',
    });
    this.text(`Page ${pageNum} of ${totalPages}`, PAGE_W - 92, footerTop + 21, {
      font: 'F2',
      size: 8.5,
      color: '#475569',
    });
  }
}

const MARGIN_X = 40;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

// ============================================================================
// BUILD PAGE 1
// ============================================================================
const p1 = new PageCanvas();

const headerH = 148;
p1.fillRect(0, 0, PAGE_W, headerH, '#0B132B');
p1.fillRect(0, headerH - 4, PAGE_W, 4, '#2563EB');

p1.circularImage(88, 72, 46);

const hx = 152;
p1.text('THARANITHAN SANTHIRATHAS', hx, 44, {
  font: 'F2',
  size: 19.5,
  color: '#FFFFFF',
  charSpace: 0.6,
});
p1.text('Aspiring Software Developer | IT Enthusiast', hx, 64, {
  font: 'F2',
  size: 11.2,
  color: '#60A5FA',
  charSpace: 0.2,
});

p1.line(hx, 76, PAGE_W - MARGIN_X, 76, '#1E3A8A', 0.9);

const col1X = hx;
const col2X = hx + 195;

// Row 1
p1.text('Location:', col1X, 93, { font: 'F2', size: 8.8, color: '#93C5FD' });
p1.text('Sri Lanka', col1X + 46, 93, { font: 'F1', size: 8.8, color: '#F8FAFC' });

p1.text('Email:', col2X, 93, { font: 'F2', size: 8.8, color: '#93C5FD' });
p1.text('stharanithan@gmail.com', col2X + 34, 93, { font: 'F1', size: 8.8, color: '#F8FAFC' });
p1.addLink(col2X + 34, 83, 145, 13, 'mailto:stharanithan@gmail.com');

// Row 2
p1.text('Phone:', col1X, 110, { font: 'F2', size: 8.8, color: '#93C5FD' });
p1.text('076 403 8722', col1X + 46, 110, { font: 'F1', size: 8.8, color: '#F8FAFC' });
p1.addLink(col1X + 46, 100, 80, 13, 'tel:+94764038722');

p1.text('LinkedIn:', col2X, 110, { font: 'F2', size: 8.8, color: '#93C5FD' });
p1.text('linkedin.com/in/tharanithan', col2X + 46, 110, { font: 'F1', size: 8.8, color: '#60A5FA' });
p1.addLink(col2X + 46, 100, 145, 13, 'https://www.linkedin.com/in/tharanithan/');

// Row 3
p1.text('WhatsApp:', col1X, 127, { font: 'F2', size: 8.8, color: '#93C5FD' });
p1.text('+94 76 403 8722', col1X + 52, 127, { font: 'F1', size: 8.8, color: '#F8FAFC' });
p1.addLink(col1X + 52, 117, 90, 13, 'https://wa.me/94764038722');

p1.text('GitHub:', col2X, 127, { font: 'F2', size: 8.8, color: '#93C5FD' });
p1.text('github.com/tharanithan-s', col2X + 40, 127, { font: 'F1', size: 8.8, color: '#60A5FA' });
p1.addLink(col2X + 40, 117, 145, 13, 'https://github.com/tharanithan-s');

// 2. Professional Summary
let curY = 170;
curY = p1.sectionHeading('Professional Summary', MARGIN_X, curY, CONTENT_W);

p1.leftAccentCard(MARGIN_X, curY, CONTENT_W, 74, 6, '#F0F6FF', '#BFDBFE', '#2563EB', 4);
const summaryText =
  'An aspiring software developer with an educational background in Software Engineering and Networking. Interested in programming, web development, and continuously improving technical abilities through practical projects and independent learning. Experienced in undertaking freelance activities involving software development, game server hosting, and video editing.';
p1.wrappedText(summaryText, MARGIN_X + 16, curY + 20, CONTENT_W - 32, 15.5, {
  font: 'F1',
  size: 9.8,
  color: '#1E293B',
});

// 3. Education
curY += 92;
curY = p1.sectionHeading('Education', MARGIN_X, curY, CONTENT_W);

const eduItems = [
  {
    degree: 'HND in Software Engineering',
    school: 'BCAS Campus, Jaffna',
    period: 'March 2025 - August 2026',
    status: 'STATUS: COMPLETED',
  },
  {
    degree: 'Diploma in Networking',
    school: 'ESOFT',
    period: '2021',
    status: 'COMPLETED',
  },
  {
    degree: 'G.C.E. Advanced Level',
    school: "St. John's College, Jaffna",
    period: '2020',
    status: 'COMPLETED',
  },
];

for (const edu of eduItems) {
  p1.leftAccentCard(MARGIN_X, curY, CONTENT_W, 50, 6, '#F8FAFC', '#E2E8F0', '#2563EB', 3.5);
  p1.text(edu.degree, MARGIN_X + 15, curY + 20, {
    font: 'F2',
    size: 10.8,
    color: '#0B132B',
  });
  p1.text(edu.school, MARGIN_X + 15, curY + 37, {
    font: 'F1',
    size: 9.5,
    color: '#334155',
  });

  const periodW = measureText(edu.period, 9.2, 0.45);
  p1.text(edu.period, MARGIN_X + CONTENT_W - periodW - 14, curY + 19, {
    font: 'F2',
    size: 9.2,
    color: '#2563EB',
  });
  p1.badgeRight(
    edu.status,
    MARGIN_X + CONTENT_W - 14,
    curY + 26,
    17,
    '#DBEAFE',
    '#1D4ED8',
    '#93C5FD'
  );
  curY += 58;
}

// 4. Technical Skills (2x2 Grid driven by shared skillCategories from src/data/skillsData.js)
curY += 12;
curY = p1.sectionHeading('Technical Skills', MARGIN_X, curY, CONTENT_W);

const gridGapX = 14;
const gridGapY = 12;
const boxW = (CONTENT_W - gridGapX) / 2;
const rowHeights = [96, 86];

skillCategories.forEach((group, idx) => {
  const colIdx = idx % 2;
  const rowIdx = Math.floor(idx / 2);
  const bx = MARGIN_X + colIdx * (boxW + gridGapX);
  const by = curY + (rowIdx === 0 ? 0 : rowHeights[0] + gridGapY);
  const bh = rowHeights[rowIdx];

  p1.fillRoundedRect(bx, by, boxW, bh, 7, '#F0F6FF', '#BFDBFE', 0.9);
  p1.text(group.category, bx + 14, by + 20, {
    font: 'F2',
    size: 10.2,
    color: '#0B132B',
  });
  p1.line(bx + 14, by + 27, bx + boxW - 14, by + 27, '#BFDBFE', 0.8);

  const hasLevels = group.skills.some((s) => Boolean(s.level));

  if (!hasLevels) {
    let pillX = bx + 12;
    let pillY = by + 40;
    const pillH = 24;
    for (const s of group.skills) {
      const labelW = measureText(s.name, 9.0, 0.1);
      const pw = labelW + 15;
      if (pillX + pw > bx + boxW - 12) {
        pillX = bx + 12;
        pillY += pillH + 7;
      }
      p1.fillRoundedRect(pillX, pillY, pw, pillH, 5, '#FFFFFF', '#93C5FD', 0.85);
      p1.text(s.name, pillX + 7.5, pillY + 15.5, {
        font: 'F2',
        size: 9.0,
        color: '#0B132B',
      });
      pillX += pw + 6;
    }
  } else if (group.skills.length === 1) {
    const s = group.skills[0];
    const sy = by + 35;
    p1.fillRoundedRect(bx + 12, sy, boxW - 24, 39, 5, '#FFFFFF', '#DBEAFE', 0.8);
    p1.text(s.name, bx + 18, sy + 16, {
      font: 'F2',
      size: 9.4,
      color: '#0F172A',
    });
    if (s.level) {
      p1.text(s.level, bx + 18, sy + 31, {
        font: 'F2',
        size: 8.3,
        color: '#2563EB',
      });
    }
  } else {
    group.skills.forEach((s, sIdx) => {
      const sy = by + 35 + sIdx * 27;
      p1.fillRoundedRect(bx + 12, sy, boxW - 24, 23, 5, '#FFFFFF', '#DBEAFE', 0.8);
      p1.text(s.name, bx + 18, sy + 15, {
        font: 'F2',
        size: 9.1,
        color: '#0F172A',
      });
      if (s.level) {
        const lvlW = measureText(s.level, 8.0, 0.35);
        p1.text(s.level, bx + boxW - 22 - lvlW, sy + 15, {
          font: 'F2',
          size: 8.0,
          color: '#2563EB',
        });
      }
    });
  }
});

p1.footer(1, 2);

// ============================================================================
// BUILD PAGE 2
// ============================================================================
const p2 = new PageCanvas();

p2.fillRect(0, 0, PAGE_W, 46, '#0B132B');
p2.fillRect(0, 43, PAGE_W, 3, '#2563EB');
p2.text('THARANITHAN SANTHIRATHAS', MARGIN_X, 28, {
  font: 'F2',
  size: 11,
  color: '#FFFFFF',
  charSpace: 0.5,
});
p2.text('Aspiring Software Developer | IT Enthusiast', PAGE_W - MARGIN_X - 225, 28, {
  font: 'F2',
  size: 9.5,
  color: '#60A5FA',
});

let y2 = 72;

// 5. Freelance Experience
y2 = p2.sectionHeading('Freelance Experience', MARGIN_X, y2, CONTENT_W);

const freelanceItems = [
  {
    role: 'Freelance Software Developer',
    tag: 'INDEPENDENT DEVELOPMENT',
    desc: 'Practical experience undertaking software-related tasks and applying programming knowledge.',
  },
  {
    role: 'Freelance Game Server Hosting',
    tag: 'DISCORD COMMUNITIES',
    desc: 'Experience with game server hosting activities and online client coordination through Discord.',
  },
  {
    role: 'Freelance Video Editor',
    tag: 'CREATIVE PROJECTS',
    desc: 'Experience undertaking freelance video editing and creative projects.',
  },
];

for (const exp of freelanceItems) {
  p2.leftAccentCard(MARGIN_X, y2, CONTENT_W, 60, 6, '#F8FAFC', '#E2E8F0', '#2563EB', 3.5);
  p2.text(exp.role, MARGIN_X + 15, y2 + 22, {
    font: 'F2',
    size: 10.8,
    color: '#0B132B',
  });
  p2.badgeRight(
    exp.tag,
    MARGIN_X + CONTENT_W - 14,
    y2 + 10,
    17,
    '#EFF6FF',
    '#2563EB',
    '#BFDBFE'
  );
  p2.text(exp.desc, MARGIN_X + 15, y2 + 42, {
    font: 'F1',
    size: 9.6,
    color: '#334155',
  });
  y2 += 70;
}

// 6. Featured Project
y2 += 12;
y2 = p2.sectionHeading('Featured Project', MARGIN_X, y2, CONTENT_W);

p2.leftAccentCard(MARGIN_X, y2, CONTENT_W, 98, 7, '#F0F6FF', '#93C5FD', '#2563EB', 4.5);
p2.text('JD Eco-Farm Management Platform', MARGIN_X + 16, y2 + 24, {
  font: 'F2',
  size: 12,
  color: '#0B132B',
});
p2.badgeRight('COMPLETED', MARGIN_X + CONTENT_W - 14, y2 + 11, 18, '#2563EB', '#FFFFFF');

p2.text('Website / Live Project:', MARGIN_X + 16, y2 + 44, {
  font: 'F2',
  size: 9.5,
  color: '#0F172A',
});
p2.text('https://jd-eco.com/', MARGIN_X + 126, y2 + 44, {
  font: 'F2',
  size: 9.5,
  color: '#2563EB',
});
p2.line(MARGIN_X + 126, y2 + 46, MARGIN_X + 216, y2 + 46, '#2563EB', 0.8);
p2.addLink(MARGIN_X + 126, y2 + 33, 100, 15, 'https://jd-eco.com/');

p2.wrappedText(
  'A completed and deployed web platform developed to present eco-farm workflows, operational details and management functionality.',
  MARGIN_X + 16,
  y2 + 65,
  CONTENT_W - 32,
  15,
  { font: 'F1', size: 9.7, color: '#1E293B' }
);

// 7. Additional Relevant Information
y2 += 120;
y2 = p2.sectionHeading('Additional Relevant Information', MARGIN_X, y2, CONTENT_W);

const halfW = (CONTENT_W - 14) / 2;
p2.fillRoundedRect(MARGIN_X, y2, halfW, 114, 6, '#F8FAFC', '#E2E8F0', 0.8);
p2.text('Personal Development & Goals', MARGIN_X + 14, y2 + 21, {
  font: 'F2',
  size: 10,
  color: '#0B132B',
});
p2.line(MARGIN_X + 14, y2 + 28, MARGIN_X + halfW - 14, y2 + 28, '#E2E8F0', 0.8);

const devBullets = [
  'Continuous learning & improving coding skills',
  'Building practical software & web applications',
  'Developing professional communication',
  'Exploring Artificial Intelligence',
];
devBullets.forEach((b, i) => {
  p2.text('•', MARGIN_X + 14, y2 + 45 + i * 17, { font: 'F2', size: 10, color: '#2563EB' });
  p2.text(b, MARGIN_X + 24, y2 + 45 + i * 17, { font: 'F1', size: 8.8, color: '#334155' });
});

const rightBoxX = MARGIN_X + halfW + 14;
p2.fillRoundedRect(rightBoxX, y2, halfW, 114, 6, '#F8FAFC', '#E2E8F0', 0.8);
p2.text('Future Education & Languages', rightBoxX + 14, y2 + 21, {
  font: 'F2',
  size: 10,
  color: '#0B132B',
});
p2.line(rightBoxX + 14, y2 + 28, rightBoxX + halfW - 14, y2 + 28, '#E2E8F0', 0.8);

const rightBullets = [
  'Planned Study: Artificial Intelligence (ESOFT)',
  'Focus: Software Engineering & AI exploration',
  'Tamil: Native Proficiency',
  'English: Conversational Proficiency',
];
rightBullets.forEach((b, i) => {
  p2.text('•', rightBoxX + 14, y2 + 45 + i * 17, { font: 'F2', size: 10, color: '#2563EB' });
  p2.text(b, rightBoxX + 24, y2 + 45 + i * 17, { font: 'F1', size: 8.8, color: '#334155' });
});

// 8. Contact Details
y2 += 136;
y2 = p2.sectionHeading('Contact Details', MARGIN_X, y2, CONTENT_W);

p2.fillRoundedRect(MARGIN_X, y2, CONTENT_W, 88, 7, '#F0F6FF', '#BFDBFE', 0.9);

const cLeft = MARGIN_X + 16;
const cRight = MARGIN_X + halfW + 16;

// Row 1
p2.text('Email:', cLeft, y2 + 24, { font: 'F2', size: 9.4, color: '#0B132B' });
p2.text('stharanithan@gmail.com', cLeft + 62, y2 + 24, { font: 'F1', size: 9.4, color: '#2563EB' });
p2.addLink(cLeft + 62, y2 + 13, 150, 14, 'mailto:stharanithan@gmail.com');

p2.text('LinkedIn:', cRight, y2 + 24, { font: 'F2', size: 9.4, color: '#0B132B' });
p2.text('linkedin.com/in/tharanithan', cRight + 58, y2 + 24, { font: 'F1', size: 9.4, color: '#2563EB' });
p2.addLink(cRight + 58, y2 + 13, 165, 14, 'https://www.linkedin.com/in/tharanithan/');

// Row 2
p2.text('Phone:', cLeft, y2 + 47, { font: 'F2', size: 9.4, color: '#0B132B' });
p2.text('076 403 8722', cLeft + 62, y2 + 47, { font: 'F1', size: 9.4, color: '#1E293B' });
p2.addLink(cLeft + 62, y2 + 36, 95, 14, 'tel:+94764038722');

p2.text('GitHub:', cRight, y2 + 47, { font: 'F2', size: 9.4, color: '#0B132B' });
p2.text('github.com/tharanithan-s', cRight + 58, y2 + 47, { font: 'F1', size: 9.4, color: '#2563EB' });
p2.addLink(cRight + 58, y2 + 36, 165, 14, 'https://github.com/tharanithan-s');

// Row 3
p2.text('WhatsApp:', cLeft, y2 + 70, { font: 'F2', size: 9.4, color: '#0B132B' });
p2.text('+94 76 403 8722', cLeft + 62, y2 + 70, { font: 'F1', size: 9.4, color: '#2563EB' });
p2.addLink(cLeft + 62, y2 + 59, 105, 14, 'https://wa.me/94764038722');

p2.text('Location:', cRight, y2 + 70, { font: 'F2', size: 9.4, color: '#0B132B' });
p2.text('Sri Lanka', cRight + 58, y2 + 70, { font: 'F1', size: 9.4, color: '#1E293B' });

p2.footer(2, 2);

// ============================================================================
// ASSEMBLE BINARY PDF 1.4
// ============================================================================
const objects = [];
function addObject(contentBufferOrString) {
  const id = objects.length + 1;
  const buf = Buffer.isBuffer(contentBufferOrString)
    ? contentBufferOrString
    : Buffer.from(contentBufferOrString, 'binary');
  objects.push(buf);
  return id;
}

addObject('');
addObject('');
const fontRegId = addObject(
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
);
const fontBoldId = addObject(
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
);

const imgHeader = Buffer.from(
  `<< /Type /XObject /Subtype /Image /Width 600 /Height 600 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
  'binary'
);
const imgFooter = Buffer.from('\nendstream', 'binary');
const imgObjId = addObject(Buffer.concat([imgHeader, jpegBytes, imgFooter]));

function buildPageObject(pageCanvas) {
  const streamStr = pageCanvas.ops.join('\n');
  const streamBuf = Buffer.from(streamStr, 'binary');
  const contentId = addObject(
    Buffer.concat([
      Buffer.from(`<< /Length ${streamBuf.length} >>\nstream\n`, 'binary'),
      streamBuf,
      Buffer.from('\nendstream', 'binary'),
    ])
  );

  const annotIds = pageCanvas.links.map((lnk) =>
    addObject(
      `<< /Type /Annot /Subtype /Link /Rect [${lnk.rect.join(' ')}] /Border [0 0 0] /A << /Type /Action /S /URI /URI (${esc(lnk.uri)}) >> >>`
    )
  );

  const annotsEntry = annotIds.length
    ? `/Annots [${annotIds.map((id) => `${id} 0 R`).join(' ')}]`
    : '';

  return addObject(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 ${fontRegId} 0 R /F2 ${fontBoldId} 0 R >> /XObject << /Im1 ${imgObjId} 0 R >> >> /Contents ${contentId} 0 R ${annotsEntry} >>`
  );
}

const page1Id = buildPageObject(p1);
const page2Id = buildPageObject(p2);

objects[0] = Buffer.from(`<< /Type /Catalog /Pages 2 0 R >>`, 'binary');
objects[1] = Buffer.from(
  `<< /Type /Pages /Kids [${page1Id} 0 R ${page2Id} 0 R] /Count 2 >>`,
  'binary'
);

const headerChunk = Buffer.from('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n', 'binary');
const chunks = [headerChunk];
const offsets = [0];
let currentOffset = headerChunk.length;

objects.forEach((objBuf, idx) => {
  const objNum = idx + 1;
  offsets.push(currentOffset);
  const prefix = Buffer.from(`${objNum} 0 obj\n`, 'binary');
  const suffix = Buffer.from('\nendobj\n', 'binary');
  chunks.push(prefix, objBuf, suffix);
  currentOffset += prefix.length + objBuf.length + suffix.length;
});

const xrefOffset = currentOffset;
let xrefStr = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  xrefStr += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}
xrefStr += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
chunks.push(Buffer.from(xrefStr, 'binary'));

const finalPdf = Buffer.concat(chunks);
const publicDocsDir = resolve(rootDir, 'public/documents');
mkdirSync(publicDocsDir, { recursive: true });
const publicPdfPath = resolve(publicDocsDir, 'Tharanithan_Santhirathas_CV.pdf');
writeFileSync(publicPdfPath, finalPdf);

const distDocsDir = resolve(rootDir, 'dist/documents');
if (existsSync(resolve(rootDir, 'dist'))) {
  mkdirSync(distDocsDir, { recursive: true });
  copyFileSync(publicPdfPath, resolve(distDocsDir, 'Tharanithan_Santhirathas_CV.pdf'));
}

console.log('Successfully generated 2-page A4 CV PDF:', finalPdf.length, 'bytes');
