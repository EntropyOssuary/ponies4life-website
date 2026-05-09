// ponies4.life — Certificate generators (Canvas-based, no server required)

function _certWrap(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';
  var curY = y;
  for (var i = 0; i < words.length; i++) {
    var test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[i] + ' ';
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY;
}

function _hRule(ctx, x1, y, x2, color, w) {
  ctx.strokeStyle = color; ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
}

function _regNum(prefix) {
  return prefix + '-' + (Math.floor(Math.random() * 9000) + 1000) + '-2026';
}

function _horseshoe(ctx, cx, cy, size, color) {
  // U-shape open at bottom: arch goes clockwise from 210° to 330°, passing through 270° (top)
  var outerR = size;
  var innerR = size * 0.58;
  var a1 = Math.PI * 7 / 6;  // 210°
  var a2 = Math.PI * 11 / 6; // 330°
  var prongLen = size * 0.65;

  ctx.fillStyle = color;

  // Arch: clockwise (anticlockwise=false) from a1 to a2 passes through 270° (top)
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, a1, a2, false);
  ctx.arc(cx, cy, innerR, a2, a1, true);
  ctx.closePath();
  ctx.fill();

  // Left prong
  var lox = cx + outerR * Math.cos(a1), loy = cy + outerR * Math.sin(a1);
  var lix = cx + innerR * Math.cos(a1), liy = cy + innerR * Math.sin(a1);
  ctx.beginPath();
  ctx.moveTo(lox, loy); ctx.lineTo(lox, loy + prongLen);
  ctx.lineTo(lix, liy + prongLen); ctx.lineTo(lix, liy);
  ctx.closePath(); ctx.fill();

  // Right prong
  var rox = cx + outerR * Math.cos(a2), roy = cy + outerR * Math.sin(a2);
  var rix = cx + innerR * Math.cos(a2), riy = cy + innerR * Math.sin(a2);
  ctx.beginPath();
  ctx.moveTo(rox, roy); ctx.lineTo(rox, roy + prongLen);
  ctx.lineTo(rix, riy + prongLen); ctx.lineTo(rix, riy);
  ctx.closePath(); ctx.fill();

  // Nail holes
  var midR = (outerR + innerR) / 2;
  var nailR = Math.max(1.2, size * 0.055);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  for (var i = 0; i < 6; i++) {
    var angle = a1 + (i + 0.5) / 6 * (a2 - a1);
    ctx.beginPath();
    ctx.arc(cx + midR * Math.cos(angle), cy + midR * Math.sin(angle), nailR, 0, Math.PI * 2);
    ctx.fill();
  }
}

function _seal(ctx, cx, cy, r, lineColor, fillColor) {
  // Circles
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = fillColor; ctx.fill();
  ctx.strokeStyle = lineColor; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 8, 0, Math.PI * 2);
  ctx.lineWidth = 0.8; ctx.stroke();

  // Horseshoe — centered slightly above middle so prongs balance the arch
  _horseshoe(ctx, cx, cy + 4, r - 14, lineColor);

  // Label
  ctx.fillStyle = lineColor; ctx.textAlign = 'center';
  ctx.font = 'bold 7px Georgia, serif';
  ctx.fillText('OFFICIAL SEAL', cx, cy + r - 11);
}

function _sparkle(ctx, x, y, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 2;
  ctx.beginPath();
  for (var i = 0; i < 8; i++) {
    var angle = (i * Math.PI) / 4;
    var r = i % 2 === 0 ? size : size * 0.35;
    if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
    else ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ---- HALL OF FAME CERTIFICATE (dark gold, hunt-club) ----
function drawHOFCertificate(canvas, ponuName, ownerName) {
  var W = 800, H = 560;
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');

  // Background
  var bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0e0900'); bg.addColorStop(1, '#1c1200');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  // Borders
  ctx.strokeStyle = '#b8860b'; ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, W-20, H-20);
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1;
  ctx.strokeRect(18, 18, W-36, H-36);
  ctx.strokeStyle = '#6a4c10'; ctx.lineWidth = 0.5;
  ctx.strokeRect(23, 23, W-46, H-46);

  // Corner diamonds
  [[30,30],[W-30,30],[30,H-30],[W-30,H-30]].forEach(function(p) {
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]-9); ctx.lineTo(p[0]+9, p[1]);
    ctx.lineTo(p[0], p[1]+9); ctx.lineTo(p[0]-9, p[1]);
    ctx.closePath(); ctx.fill();
  });

  ctx.textAlign = 'center';

  // Top ornament
  ctx.fillStyle = '#7a5c10'; ctx.font = '13px Georgia, serif';
  ctx.fillText('✦  ✦  ✦', W/2, 50);

  // Title
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 30px Georgia, serif';
  ctx.fillText('PONIES4.LIFE', W/2, 81);
  ctx.fillStyle = '#c8a96e'; ctx.font = 'bold 16px Georgia, serif';
  ctx.fillText('H A L L   O F   F A M E', W/2, 103);

  // Rule + horse
  _hRule(ctx, 70, 115, 328, '#b8860b', 1);
  _hRule(ctx, 472, 115, 730, '#b8860b', 1);
  ctx.fillStyle = '#ffd700'; ctx.font = '17px serif';
  ctx.fillText('🏇', W/2, 120);

  // Certificate of Induction
  ctx.fillStyle = '#c8a96e'; ctx.font = 'italic 15px Georgia, serif';
  ctx.fillText('Certificate of Induction', W/2, 146);

  // Year of Horse ribbon
  ctx.fillStyle = '#190e00'; ctx.fillRect(140, 156, 520, 26);
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1;
  ctx.strokeRect(140, 156, 520, 26);
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 11px Georgia, serif';
  ctx.fillText('FREE ENTRY · CLASS OF 2026 · YEAR OF THE HORSE · FREE ENTRY', W/2, 173);

  // Intro
  ctx.fillStyle = '#8b6914'; ctx.font = 'italic 12px Georgia, serif';
  ctx.fillText('By authority of the Committee, be it known to all who encounter this document:', W/2, 203);

  // Pony name
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold italic 42px Georgia, serif';
  ctx.fillText(ponuName, W/2, 256);
  var nw = ctx.measureText(ponuName).width;
  ctx.strokeStyle = '#b8860b'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W/2 - nw/2 - 14, 264); ctx.lineTo(W/2 + nw/2 + 14, 264); ctx.stroke();

  // Owner
  var bodyY = 292;
  if (ownerName) {
    ctx.fillStyle = '#c8a96e'; ctx.font = 'italic 14px Georgia, serif';
    ctx.fillText('companion to ' + ownerName, W/2, 287);
    bodyY = 312;
  }

  // Body
  ctx.fillStyle = '#c8a96e'; ctx.font = '12.5px Georgia, serif';
  _certWrap(ctx, 'has demonstrated qualities of sufficient distinction to warrant permanent enshrinement in these hallowed halls. The committee has reviewed this nomination with appropriate gravity and found it meritorious in all respects. This induction is irrevocable, binding, and recorded for posterity.', W/2, bodyY, 640, 20);

  // Lower rule
  _hRule(ctx, 70, 400, 730, '#b8860b', 1);

  // Year & motto
  ctx.fillStyle = '#6a4c10'; ctx.font = 'italic 12px Georgia, serif';
  ctx.fillText('Anno Domini MMXXVI · In the Year of the Horse', W/2, 419);
  ctx.fillStyle = '#c8a96e'; ctx.font = 'bold italic 14px Georgia, serif';
  ctx.fillText('Per Equum ad Astra', W/2, 439);

  // Signatures
  ctx.strokeStyle = '#4a3408'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(95, 470); ctx.lineTo(280, 470); ctx.stroke();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#8b7030'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('Sonny Wimps Gunshot', 95, 485);
  ctx.fillStyle = '#4a3408'; ctx.font = '10px Georgia, serif';
  ctx.fillText('Chair, Selection Committee', 95, 498);

  ctx.beginPath(); ctx.moveTo(520, 470); ctx.lineTo(705, 470); ctx.stroke();
  ctx.textAlign = 'right';
  ctx.fillStyle = '#8b7030'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('Gryffins Sonny Mojo', 705, 485);
  ctx.fillStyle = '#4a3408'; ctx.font = '10px Georgia, serif';
  ctx.fillText('Secretary, Official Records', 705, 498);

  // Seal
  ctx.textAlign = 'center';
  _seal(ctx, W/2, 484, 36, '#b8860b', 'rgba(184,134,11,0.10)');

  // Registry number
  ctx.fillStyle = '#2e1e00'; ctx.font = '9px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(_regNum('HOF'), W-18, H-10);
}

// ---- PONIES AROUND THE WORLD CERTIFICATE (dark space, globe, sparkles) ----
function drawPATWCertificate(canvas, ponuName, ownerName, location) {
  var W = 800, H = 560;
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');

  // Deep space background
  var bg = ctx.createRadialGradient(W/2, H/2, 80, W/2, H/2, 500);
  bg.addColorStop(0, '#030d20'); bg.addColorStop(1, '#000508');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  // Star field
  var stars = [[42,38],[150,22],[310,15],[490,28],[640,18],[750,40],[780,120],
               [770,250],[755,380],[720,490],[600,535],[460,542],[320,538],
               [180,530],[80,510],[28,420],[20,300],[30,170],[55,220],[700,160]];
  stars.forEach(function(s) {
    ctx.fillStyle = 'rgba(255,255,255,' + (0.3 + Math.random() * 0.5) + ')';
    ctx.beginPath(); ctx.arc(s[0], s[1], 0.8 + Math.random(), 0, Math.PI*2); ctx.fill();
  });

  // Borders
  ctx.strokeStyle = '#00ffff'; ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, W-20, H-20);
  ctx.strokeStyle = 'rgba(0,255,255,0.3)'; ctx.lineWidth = 1;
  ctx.strokeRect(17, 17, W-34, H-34);
  ctx.strokeStyle = '#ff00cc'; ctx.lineWidth = 0.5;
  ctx.strokeRect(22, 22, W-44, H-44);

  // Corner stars
  [[ 28, 28],[ W-28, 28],[ 28, H-28],[W-28, H-28]].forEach(function(p) {
    _sparkle(ctx, p[0], p[1], 7, '#00ffff');
  });

  ctx.textAlign = 'center';

  // Title
  ctx.fillStyle = '#00ffff'; ctx.font = 'bold 26px Georgia, serif';
  ctx.fillText('PONIES AROUND THE WORLD', W/2, 52);
  ctx.fillStyle = 'rgba(0,200,255,0.6)'; ctx.font = '10px Georgia, serif';
  ctx.fillText('INTERNATIONAL EQUINE DIRECTORY & OFFICIAL REGISTRY  ·  VOLUME XII  ·  YEAR OF THE HORSE EDITION', W/2, 68);

  // Globe
  var gx = W/2, gy = 128, gr = 44;
  // Globe glow
  ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 18;
  ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI*2);
  var globeGrad = ctx.createRadialGradient(gx - gr*0.3, gy - gr*0.3, gr*0.05, gx, gy, gr);
  globeGrad.addColorStop(0, '#0a3060'); globeGrad.addColorStop(1, '#010a18');
  ctx.fillStyle = globeGrad; ctx.fill();
  ctx.strokeStyle = '#00ffff'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.shadowBlur = 0;

  // Clip to globe for grid lines
  ctx.save();
  ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI*2); ctx.clip();
  ctx.strokeStyle = 'rgba(0,200,255,0.28)'; ctx.lineWidth = 0.7;
  // Latitude lines
  [-30, 0, 30].forEach(function(deg) {
    var latR = gr * Math.cos(deg * Math.PI / 180);
    var latY = gy + gr * Math.sin(deg * Math.PI / 180);
    ctx.beginPath();
    ctx.ellipse(gx, latY, latR, latR * 0.22, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
  // Longitude lines
  [0, 45, 90, 135].forEach(function(deg) {
    var a = deg * Math.PI / 180;
    ctx.beginPath();
    ctx.ellipse(gx, gy, gr * Math.abs(Math.sin(a)) + 1, gr, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
  // Equator highlight
  ctx.strokeStyle = 'rgba(0,255,255,0.5)'; ctx.lineWidth = 0.9;
  ctx.save();
  ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI*2); ctx.clip();
  ctx.beginPath(); ctx.ellipse(gx, gy, gr, gr * 0.22, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  // Sparkles around the globe
  var sparkleData = [
    [gx-70, gy-30, 5, '#ffff00'], [gx+72, gy-28, 4, '#ff00cc'],
    [gx-58, gy+48, 4, '#00ffff'], [gx+60, gy+44, 5, '#ffff00'],
    [gx-90, gy+10, 3, '#ff00cc'], [gx+90, gy+8, 3, '#00ff88'],
    [gx+20, gy-68, 4, '#00ffff'], [gx-22, gy-66, 3, '#ff00cc'],
    [150, 95, 3, '#ffff00'],      [650, 92, 3, '#ff00cc'],
    [120, 145, 2, '#00ff88'],     [680, 148, 2, '#ffff00']
  ];
  sparkleData.forEach(function(s) { _sparkle(ctx, s[0], s[1], s[2], s[3]); });

  // Certify text
  _hRule(ctx, 60, 183, 740, 'rgba(0,255,255,0.3)', 1);
  ctx.fillStyle = 'rgba(0,200,255,0.7)'; ctx.font = 'italic 12px Georgia, serif';
  ctx.fillText('This is to certify, attest, and confirm that the following has been duly entered into the official record:', W/2, 200);

  // Pony name
  ctx.fillStyle = '#ffff00'; ctx.font = 'bold italic 40px Georgia, serif';
  ctx.shadowColor = '#ffff00'; ctx.shadowBlur = 12;
  ctx.fillText(ponuName, W/2, 247);
  ctx.shadowBlur = 0;
  var nw = ctx.measureText(ponuName).width;
  ctx.strokeStyle = 'rgba(255,255,0,0.5)'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W/2 - nw/2 - 14, 254); ctx.lineTo(W/2 + nw/2 + 14, 254); ctx.stroke();

  var afterY = 272;
  if (ownerName) {
    ctx.fillStyle = 'rgba(0,200,255,0.8)'; ctx.font = 'italic 13px Georgia, serif';
    ctx.fillText('of record to ' + ownerName, W/2, afterY);
    afterY += 18;
  }
  if (location) {
    ctx.fillStyle = '#ff00cc'; ctx.font = 'bold 13px Georgia, serif';
    ctx.fillText('📍 ' + location, W/2, afterY);
  }

  _hRule(ctx, 60, 305, 740, 'rgba(0,255,255,0.25)', 0.8);

  // Bureaucratic body
  ctx.fillStyle = 'rgba(200,230,255,0.75)'; ctx.font = '12px Georgia, serif';
  _certWrap(ctx, 'is hereby officially listed, documented, and entered into the permanent record of the Ponies Around the World International Registry — the world\'s most comprehensive and authoritative directory of documented equines and equine-adjacent companions. This listing shall persist in perpetuity, cross-referenced in the General Index, Continental Supplement, and Year of the Horse Special Edition.', W/2, 322, 680, 19);

  // Year of Horse ribbon
  ctx.strokeStyle = '#ffff00'; ctx.lineWidth = 1;
  ctx.strokeRect(140, 382, 520, 25);
  ctx.fillStyle = 'rgba(255,255,0,0.07)'; ctx.fillRect(140, 382, 520, 25);
  ctx.fillStyle = '#ffff00'; ctx.font = 'bold 11px Georgia, serif';
  ctx.fillText('✦  INDUCTED 2026  ·  YEAR OF THE HORSE  ·  ANNO EQUI  ✦', W/2, 399);

  // Verification box
  ctx.strokeStyle = 'rgba(0,255,255,0.3)'; ctx.lineWidth = 1;
  ctx.strokeRect(185, 415, 430, 40);
  ctx.fillStyle = '#00ffff'; ctx.font = 'bold 9px Georgia, serif';
  ctx.fillText('VERIFIED BY THE BOARD OF DIRECTORS · PONIES AROUND THE WORLD INTERNATIONAL REGISTRY', W/2, 430);
  ctx.fillStyle = 'rgba(0,200,255,0.5)'; ctx.font = 'italic 9px Georgia, serif';
  ctx.fillText('Established on the Internet · Editorial decisions are final · All species welcome · Raccoons especially', W/2, 446);

  // Signatures
  ctx.strokeStyle = 'rgba(0,255,255,0.3)'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(75, 470); ctx.lineTo(265, 470); ctx.stroke();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#00ffcc'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('Sonny Wimps Gunshot', 75, 484);
  ctx.fillStyle = 'rgba(0,200,255,0.5)'; ctx.font = '9px Georgia, serif';
  ctx.fillText('Chair, Selection Committee', 75, 496);

  ctx.beginPath(); ctx.moveTo(535, 470); ctx.lineTo(725, 470); ctx.stroke();
  ctx.textAlign = 'right';
  ctx.fillStyle = '#00ffcc'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('Gryffins Sonny Mojo', 725, 484);
  ctx.fillStyle = 'rgba(0,200,255,0.5)'; ctx.font = '9px Georgia, serif';
  ctx.fillText('Secretary, Official Records', 725, 496);

  // Seal
  ctx.textAlign = 'center';
  _seal(ctx, W/2, 484, 36, '#00ffff', 'rgba(0,255,255,0.07)');

  // Registry number
  ctx.fillStyle = 'rgba(0,200,255,0.3)'; ctx.font = '9px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(_regNum('PATW') + ' · ponies4.life', W-18, H-10);
}
