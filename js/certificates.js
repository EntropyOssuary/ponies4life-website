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

function _seal(ctx, cx, cy, r, lineColor, fillColor, lines) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = lineColor; ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 8, 0, Math.PI * 2);
  ctx.lineWidth = 0.8; ctx.stroke();
  ctx.fillStyle = lineColor;
  ctx.textAlign = 'center';
  var startY = cy - (lines.length - 1) * 5.5;
  lines.forEach(function(line, i) {
    ctx.font = (i === 0 ? 'bold ' : '') + '7.5px Georgia, serif';
    ctx.fillText(line, cx, startY + i * 11);
  });
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
  ctx.fillText('Gryffin von Applegate III', 95, 485);
  ctx.fillStyle = '#4a3408'; ctx.font = '10px Georgia, serif';
  ctx.fillText('Chair, Selection Committee', 95, 498);

  ctx.beginPath(); ctx.moveTo(520, 470); ctx.lineTo(705, 470); ctx.stroke();
  ctx.textAlign = 'right';
  ctx.fillStyle = '#8b7030'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('Smokescreen, Secretary', 705, 485);
  ctx.fillStyle = '#4a3408'; ctx.font = '10px Georgia, serif';
  ctx.fillText('Ponies4.Life Official Records', 705, 498);

  // Seal
  ctx.textAlign = 'center';
  _seal(ctx, W/2, 484, 36, '#b8860b', 'rgba(184,134,11,0.10)', ['OFFICIAL', 'SEAL']);

  // Registry number
  ctx.fillStyle = '#2e1e00'; ctx.font = '9px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(_regNum('HOF'), W-18, H-10);
}

// ---- PONIES AROUND THE WORLD CERTIFICATE (parchment, who's-who bureaucratic) ----
function drawPATWCertificate(canvas, ponuName, ownerName, location) {
  var W = 800, H = 560;
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');

  // Parchment background
  var bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#f7f2e4'); bg.addColorStop(1, '#ede4c8');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  // Subtle age lines
  ctx.fillStyle = 'rgba(139,109,56,0.025)';
  for (var i = 0; i < W; i += 3) { ctx.fillRect(i, 0, 1, H); }

  // Borders
  ctx.strokeStyle = '#1a2844'; ctx.lineWidth = 5;
  ctx.strokeRect(10, 10, W-20, H-20);
  ctx.strokeStyle = '#2a3e6e'; ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, W-40, H-40);
  ctx.strokeStyle = '#c8a96e'; ctx.lineWidth = 0.8;
  ctx.strokeRect(25, 25, W-50, H-50);

  // Header band
  ctx.fillStyle = '#1a2844'; ctx.fillRect(10, 10, W-20, 68);

  // Header text
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f0d88c'; ctx.font = 'bold 24px Georgia, serif';
  ctx.fillText('PONIES AROUND THE WORLD', W/2, 43);
  ctx.fillStyle = '#b8a870'; ctx.font = '10px Georgia, serif';
  ctx.fillText('INTERNATIONAL EQUINE DIRECTORY & OFFICIAL REGISTRY  ·  VOLUME XII  ·  YEAR OF THE HORSE EDITION', W/2, 62);

  // Verified badge in header
  ctx.beginPath(); ctx.arc(745, 40, 18, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(240,216,140,0.15)'; ctx.fill();
  ctx.strokeStyle = '#f0d88c'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.fillStyle = '#f0d88c'; ctx.font = 'bold 7px Georgia, serif';
  ctx.fillText('REGISTRY', 745, 37); ctx.font = '6.5px Georgia, serif';
  ctx.fillText('VERIFIED', 745, 47);

  // Certify text
  ctx.fillStyle = '#2a3e6e'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('This is to certify, attest, and confirm that the following has been duly entered into the official record:', W/2, 107);

  // Pony name
  ctx.fillStyle = '#0d1a33'; ctx.font = 'bold 40px Georgia, serif';
  ctx.fillText(ponuName, W/2, 157);
  var nw = ctx.measureText(ponuName).width;
  ctx.strokeStyle = '#1a2844'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W/2 - nw/2 - 14, 165); ctx.lineTo(W/2 + nw/2 + 14, 165); ctx.stroke();

  var afterY = 185;
  if (ownerName) {
    ctx.fillStyle = '#3a4a6a'; ctx.font = 'italic 13px Georgia, serif';
    ctx.fillText('of record to ' + ownerName, W/2, afterY);
    afterY += 18;
  }
  if (location) {
    ctx.fillStyle = '#5a3a00'; ctx.font = 'bold 14px Georgia, serif';
    ctx.fillText('— ' + location + ' —', W/2, afterY);
  }

  // Decorative rules
  _hRule(ctx, 60, 217, 740, '#1a2844', 0.8);
  _hRule(ctx, 60, 220, 740, '#c8a96e', 0.4);

  // Bureaucratic body
  ctx.fillStyle = '#2a2a2a'; ctx.font = '12.5px Georgia, serif';
  _certWrap(ctx, 'is hereby officially listed, documented, and entered into the permanent record of the Ponies Around the World International Registry — the world\'s most comprehensive and authoritative directory of documented equines and equine-adjacent companions. This listing shall persist in perpetuity within the official archive, cross-referenced in the General Index, the Continental Supplement, and the Year of the Horse Special Edition.', W/2, 240, 660, 20);

  // Year of Horse ribbon
  ctx.fillStyle = '#1a2844'; ctx.fillRect(150, 320, 500, 26);
  ctx.strokeStyle = '#f0d88c'; ctx.lineWidth = 1; ctx.strokeRect(150, 320, 500, 26);
  ctx.fillStyle = '#f0d88c'; ctx.font = 'bold 11px Georgia, serif';
  ctx.fillText('✦  INDUCTED 2026  ·  YEAR OF THE HORSE  ·  ANNO EQUI  ✦', W/2, 337);

  // Verification box
  ctx.strokeStyle = '#1a2844'; ctx.lineWidth = 1;
  ctx.strokeRect(180, 356, 440, 46);
  ctx.fillStyle = 'rgba(26,40,68,0.05)'; ctx.fillRect(180, 356, 440, 46);
  ctx.fillStyle = '#1a2844'; ctx.font = 'bold 10px Georgia, serif';
  ctx.fillText('VERIFIED BY THE BOARD OF DIRECTORS', W/2, 372);
  ctx.fillStyle = '#5a5a5a'; ctx.font = 'italic 10px Georgia, serif';
  ctx.fillText('Ponies Around the World International Registry Committee', W/2, 386);
  ctx.font = '9px Georgia, serif';
  ctx.fillText('Established on the Internet · Editorial decisions are final and beyond appeal · All species welcome', W/2, 398);

  // Signatures
  ctx.strokeStyle = '#9999bb'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(78, 432); ctx.lineTo(268, 432); ctx.stroke();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#3a4a6a'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('Danielle N., Registrar', 78, 447);
  ctx.fillStyle = '#888'; ctx.font = '9px Georgia, serif';
  ctx.fillText('Director of Geographic Operations', 78, 459);

  ctx.beginPath(); ctx.moveTo(532, 432); ctx.lineTo(722, 432); ctx.stroke();
  ctx.textAlign = 'right';
  ctx.fillStyle = '#3a4a6a'; ctx.font = 'italic 13px Georgia, serif';
  ctx.fillText('Gryffin von Applegate III', 722, 447);
  ctx.fillStyle = '#888'; ctx.font = '9px Georgia, serif';
  ctx.fillText('Chairpony, Admissions Committee', 722, 459);

  // Seal
  ctx.textAlign = 'center';
  _seal(ctx, W/2, 484, 36, '#1a2844', 'rgba(26,40,68,0.08)', ['OFFICIAL', 'REGISTRY', 'SEAL']);

  // Registry number
  ctx.fillStyle = '#aaaaaa'; ctx.font = '9px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(_regNum('PATW') + ' · ponies4.life', W-18, H-10);
}
