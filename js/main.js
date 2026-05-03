// ponies4.life — shared JS

// ---- EMAIL REVEAL ----
function revealEmail(btn) {
  var u = 'ponies', d = 'ponies4.life';
  var e = u + '@' + d;
  window.location.href = 'mailto:' + e;
}

// ---- PAGE-SPECIFIC SUBMISSION EMAILS ----
function submitHallOfFame() {
  var u = 'ponies', d = 'ponies4.life';
  var body = [
    'Hi! 🏆 We are SO excited you want to nominate a pony!',
    '',
    '————————————————————————',
    '🏆 HALL OF FAME NOMINATION',
    '————————————————————————',
    'Name:',
    'Location:',
    'Why do they deserve a spot in the Hall of Fame?:',
    'Photo (attach!):',
    '',
    '————————————————————————',
    '📌 ALSO ADD TO PONIES AROUND THE WORLD? (optional)',
    '————————————————————————',
    'Location (city, country):',
    'Fun fact or description:',
    '',
    'We read every submission and we love them all. Thank you! 🌈'
  ].join('\n');
  window.location.href = 'mailto:' + u + '@' + d
    + '?subject=' + encodeURIComponent('Hall of Fame Nomination — Ponies4.life')
    + '&body=' + encodeURIComponent(body);
}

function submitWorldMap() {
  var u = 'ponies', d = 'ponies4.life';
  var body = [
    'Hi! 🗺️ We are SO excited you want to put your pony on the map!',
    '',
    '————————————————————————',
    '📌 PONIES AROUND THE WORLD',
    '————————————————————————',
    'Name:',
    'Location (city, country):',
    'Fun fact or description:',
    'Photo (attach!):',
    '',
    '————————————————————————',
    '🏆 ALSO NOMINATE FOR HALL OF FAME? (optional)',
    '————————————————————————',
    'Why do they deserve a spot in the Hall of Fame?:',
    '',
    'We read every submission and we love them all. Thank you! 🌈'
  ].join('\n');
  window.location.href = 'mailto:' + u + '@' + d
    + '?subject=' + encodeURIComponent('World Map Submission — Ponies4.life')
    + '&body=' + encodeURIComponent(body);
}

function submitMemorial() {
  var u = 'ponies', d = 'ponies4.life';
  var body = [
    'Hi! 🪦 Thank you for sharing your pony with us.',
    'We are honored to give them a place to rest.',
    '',
    '————————————————————————',
    '🪦 MEMORIAL GARDEN SUBMISSION',
    '————————————————————————',
    'Name:',
    'Dates (e.g. 2005–2022):',
    'Epitaph (50 characters max):',
    '',
    'All submissions reviewed with care. 🖤'
  ].join('\n');
  window.location.href = 'mailto:' + u + '@' + d
    + '?subject=' + encodeURIComponent('Memorial Garden Submission — Ponies4.life')
    + '&body=' + encodeURIComponent(body);
}

function submitPonyOfMonth() {
  var u = 'ponies', d = 'ponies4.life';
  var body = [
    'Hi! 🌟 You want to nominate a Pony of the Month — we love it!',
    '',
    '————————————————————————',
    '🌟 PONY OF THE MONTH NOMINATION',
    '————————————————————————',
    'Name:',
    'Why should this pony be crowned Pony of the Month?',
    '(Tell us everything. We want to hear it all.):',
    '',
    'Photo (attach!):',
    '',
    'We read every nomination. Thank you for sharing! 🌈'
  ].join('\n');
  window.location.href = 'mailto:' + u + '@' + d
    + '?subject=' + encodeURIComponent('Pony of the Month Nomination — Ponies4.life')
    + '&body=' + encodeURIComponent(body);
}

// ---- SUBMISSION EMAIL ----
function submitPony() {
  var u = 'ponies', d = 'ponies4.life';
  var subject = 'Ponies4.life Submission';
  var body = [
    'Hi! 🐴 We are SO excited you want to submit a pony!',
    '',
    'You can submit for more than one category — just fill out',
    'the relevant sections below and we will take care of the rest!',
    '',
    '————————————————————————',
    '📌 PONIES AROUND THE WORLD',
    '————————————————————————',
    'Name:',
    'Location (city, country):',
    'Fun fact or description:',
    'Photo (attach!):',
    '',
    '————————————————————————',
    '🏆 HALL OF FAME',
    '————————————————————————',
    'Name:',
    'Location:',
    'Why do they deserve a spot in the Hall of Fame?:',
    'Photo (attach!):',
    '',
    '————————————————————————',
    '🌟 PONY OF THE MONTH NOMINATION',
    '————————————————————————',
    'Name:',
    'Why should this pony be crowned Pony of the Month?:',
    'Photo (attach!):',
    '',
    '————————————————————————',
    '🪦 MEMORIAL GARDEN',
    '————————————————————————',
    'Name:',
    'Dates (e.g. 2005–2022):',
    'Epitaph (50 characters max):',
    '',
    '————————————————————————',
    'We read every single submission and we love them all.',
    'Thank you for sharing your pony with us! 🌈'
  ].join('\n');
  window.location.href = 'mailto:' + u + '@' + d
    + '?subject=' + encodeURIComponent(subject)
    + '&body=' + encodeURIComponent(body);
}

// ---- AUTOPLAY POPUP (YouTube IFrame API — works in Safari) ----
function initAutoplay(ytId, startSeconds) {
  var overlay = document.getElementById('autoplay-overlay');
  var okBtn   = document.getElementById('popup-ok');
  if (!overlay || !okBtn) return;
  overlay.classList.add('active');

  var player      = null;
  var playerReady = false;
  var playWanted  = false;

  function tryPlay() {
    if (player && playerReady) {
      player.unMute();
      player.setVolume(100);
      player.playVideo();
    } else {
      playWanted = true;
    }
  }

  function createPlayer() {
    var el = document.getElementById('yt-player');
    if (!el || player) return;
    player = new YT.Player('yt-player', {
      videoId: ytId,
      playerVars: { autoplay: 0, loop: 1, playlist: ytId, controls: 0, rel: 0, playsinline: 1, start: startSeconds || 0 },
      events: {
        onReady: function () {
          playerReady = true;
          if (playWanted) tryPlay();
        }
      }
    });
  }

  // Load YT IFrame API script once
  if (!window._ytApiLoading) {
    window._ytApiLoading = true;
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }
  // onYouTubeIframeAPIReady is called globally by the YT script
  var prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (prev) prev();
    createPlayer();
  };
  // If API already loaded
  if (window.YT && window.YT.Player) createPlayer();

  okBtn.addEventListener('click', function () {
    overlay.classList.remove('active');
    tryPlay();
  });
}

// ---- CEMETERY GATE: arm autoplay for next page ----
function enterMemorialGarden() {
  sessionStorage.setItem('gardenAutoplay', '1');
  window.location.href = 'memorial-garden.html';
}

// ---- VISITOR COUNTER (real — counterapi.dev) ----
(function () {
  var el = document.getElementById('visitor-count');
  if (!el) return;
  var owner = localStorage.getItem('owner');
  var url = owner
    ? 'https://api.counterapi.dev/v1/ponies4life/hits/'
    : 'https://api.counterapi.dev/v1/ponies4life/hits/up';
  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (d) { el.textContent = String(d.count).padStart(7, '0'); })
    .catch(function () { el.textContent = '✦✦✦✦✦✦✦'; });
})();

// ---- LOAD JSON & RENDER GRAVESTONES ----
var defaultStones = [
  'gothic-headstone.png',
  'broken-headstone.png',
  'cracked-headstone.png',
  'coffin-gravestone.png',
  '3ball-gravestone.png',
  'photos/pointy-gravestone.png'
];

function loadGravestones() {
  var grid = document.getElementById('grave-grid');
  if (!grid) return;
  fetch('data/gravestones.json')
    .then(function (r) { return r.json(); })
    .then(function (stones) {
      var countEl = document.getElementById('grave-count');
      if (countEl) countEl.textContent = stones.length;
      grid.innerHTML = stones.map(function (s, i) {
        var tilt = (Math.random() * 6 - 3).toFixed(1);
        var stoneImg = s.stone || defaultStones[i % defaultStones.length];
        var skipSkull = /pointy/i.test(stoneImg);
        var stoneClass = 'stone-' + stoneImg.replace(/.*\//, '').replace(/\.[^.]+$/, '').toLowerCase();
        return [
          '<div class="gravestone ' + stoneClass + '" style="transform:rotate(' + tilt + 'deg)">',
            '<img class="stone-img" src="' + esc(stoneImg) + '" alt="">',
            skipSkull ? '' : '<img class="stone-skull" src="cropped-winged-skull.png" alt="">',
            '<div class="stone-text">',
              '<div class="stone-name">' + esc(s.name) + '</div>',
              s.dates ? '<div class="stone-dates">' + esc(s.dates) + '</div>' : '',
              s.epitaph ? '<div class="stone-epitaph">' + esc(s.epitaph) + '</div>' : '',
            '</div>',
          '</div>'
        ].join('');
      }).join('');
    })
    .catch(function () {
      grid.innerHTML = '<p style="color:#888;grid-column:1/-1">No souls at rest yet.</p>';
    });
}

// ---- LOAD JSON & RENDER HOF ----
function loadHallOfFame() {
  var container = document.getElementById('hof-container');
  if (!container) return;
  fetch('data/hall-of-fame.json')
    .then(function (r) { return r.json(); })
    .then(function (entries) {
      if (!entries.length) {
        container.innerHTML = '<p style="color:var(--gold);font-style:italic">The Hall awaits its first inductee.</p>';
        return;
      }
      container.innerHTML = entries.map(function (e) {
        return [
          '<div class="hof-entry">',
            e.photo ? '<img src="' + esc(e.photo) + '" alt="' + esc(e.name) + '">' : '',
            '<div class="hof-entry-inner">',
              '<div class="hof-name">' + esc(e.name) + '</div>',
              e.location ? '<div class="hof-detail">📍 ' + esc(e.location) + '</div>' : '',
              e.year     ? '<div class="hof-detail">Inducted ' + esc(e.year) + '</div>' : '',
              e.note     ? '<div class="hof-detail">' + esc(e.note) + '</div>' : '',
            '</div>',
          '</div>'
        ].join('');
      }).join('');
    });
}

// ---- LOAD JSON & RENDER MAP PINS ----
function loadMapPins(map) {
  fetch('data/map-pins.json')
    .then(function (r) { return r.json(); })
    .then(function (pins) {
      var continentColors = {
        'Europe':       '#00ccff',
        'North America':'#ffcc00',
        'South America':'#ff6600',
        'Asia':         '#ff00cc',
        'Africa':       '#00ff88',
        'Oceania':      '#cc88ff',
        'Antarctica':   '#ffffff',
        'Iceland':      '#00ffff'
      };
      pins.forEach(function (p) {
        var color = continentColors[p.continent] || '#ff00ff';
        var icon = L.divIcon({
          html: '<div style="width:14px;height:14px;border-radius:50%;background:' + color +
                ';border:2px solid #000;box-shadow:0 0 6px ' + color + '"></div>',
          iconSize: [14, 14], iconAnchor: [7, 7], className: ''
        });
        var popupHtml =
          (p.photo ? '<img src="' + esc(p.photo) + '" style="width:160px;height:110px;object-fit:cover;display:block;border:2px solid ' + color + ';margin-bottom:6px">' : '') +
          '<b style="font-size:1.05em">' + esc(p.name) + '</b><br>' +
          (p.location   ? '<span style="color:#666;font-size:0.85em">' + esc(p.location) + '</span><br>' : '') +
          (p.continent  ? '<em style="font-size:0.8em;color:#888">' + esc(p.continent) + '</em><br>' : '') +
          (p.description ? '<span style="font-size:0.85em">' + esc(p.description) + '</span>' : '');
        L.marker([p.lat, p.lng], { icon: icon })
          .bindPopup(popupHtml, { maxWidth: 200 })
          .addTo(map);
      });
    });
}

// ---- HELPERS ----
function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function deathHeadSVG() {
  // Viewbox 0 0 60 50 — scales via CSS width/height on .death-head
  return '<svg class="death-head" width="48" height="40" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">' +
    // left wing — multi-feather
    '<path d="M0,24 Q3,6 14,14 Q7,20 9,28 Q4,30 0,24Z" fill="#7a8c9e" opacity="0.9"/>' +
    '<path d="M0,24 Q2,10 10,16" stroke="#9ab" stroke-width="1" fill="none" opacity="0.7"/>' +
    '<path d="M1,26 Q3,14 11,20" stroke="#9ab" stroke-width="1" fill="none" opacity="0.7"/>' +
    '<path d="M2,28 Q5,18 12,23" stroke="#9ab" stroke-width="1" fill="none" opacity="0.7"/>' +
    '<path d="M1,18 Q5,8 13,11 Q8,16 10,20" fill="#6a7c8e" opacity="0.6"/>' +
    '<path d="M2,14 Q7,4 14,9 Q9,14 11,17" fill="#5a6c7e" opacity="0.5"/>' +
    // right wing — mirror
    '<path d="M60,24 Q57,6 46,14 Q53,20 51,28 Q56,30 60,24Z" fill="#7a8c9e" opacity="0.9"/>' +
    '<path d="M60,24 Q58,10 50,16" stroke="#9ab" stroke-width="1" fill="none" opacity="0.7"/>' +
    '<path d="M59,26 Q57,14 49,20" stroke="#9ab" stroke-width="1" fill="none" opacity="0.7"/>' +
    '<path d="M58,28 Q55,18 48,23" stroke="#9ab" stroke-width="1" fill="none" opacity="0.7"/>' +
    '<path d="M59,18 Q55,8 47,11 Q52,16 50,20" fill="#6a7c8e" opacity="0.6"/>' +
    '<path d="M58,14 Q53,4 46,9 Q51,14 49,17" fill="#5a6c7e" opacity="0.5"/>' +
    // skull cranium — slightly weathered
    '<ellipse cx="30" cy="22" rx="13" ry="14" fill="#c4c4d4" stroke="#5a5a6a" stroke-width="1"/>' +
    '<ellipse cx="30" cy="22" rx="11" ry="12" fill="none" stroke="#9999aa" stroke-width="0.5" opacity="0.4"/>' +
    // cranial suture lines
    '<path d="M30,8 Q29,14 30,18" stroke="#aaa" stroke-width="0.5" fill="none" opacity="0.5"/>' +
    '<path d="M22,12 Q26,16 30,18" stroke="#aaa" stroke-width="0.5" fill="none" opacity="0.4"/>' +
    '<path d="M38,12 Q34,16 30,18" stroke="#aaa" stroke-width="0.5" fill="none" opacity="0.4"/>' +
    // eye sockets — deep set
    '<ellipse cx="24" cy="21" rx="4" ry="4.5" fill="#0d0d1a"/>' +
    '<ellipse cx="36" cy="21" rx="4" ry="4.5" fill="#0d0d1a"/>' +
    '<ellipse cx="23" cy="20" rx="1.5" ry="1" fill="#222230" opacity="0.5"/>' +
    '<ellipse cx="35" cy="20" rx="1.5" ry="1" fill="#222230" opacity="0.5"/>' +
    // nose cavity
    '<path d="M28,27 Q30,30 32,27 Q30,25 28,27Z" fill="#0d0d1a"/>' +
    // cheekbones
    '<path d="M18,25 Q20,28 23,27" stroke="#aaa" stroke-width="0.6" fill="none" opacity="0.4"/>' +
    '<path d="M42,25 Q40,28 37,27" stroke="#aaa" stroke-width="0.6" fill="none" opacity="0.4"/>' +
    // jaw
    '<rect x="19" y="33" width="22" height="9" rx="3" fill="#b4b4c4" stroke="#5a5a6a" stroke-width="0.8"/>' +
    '<line x1="22" y1="33" x2="22" y2="42" stroke="#888" stroke-width="0.8"/>' +
    '<line x1="26" y1="33" x2="26" y2="42" stroke="#888" stroke-width="0.8"/>' +
    '<line x1="30" y1="33" x2="30" y2="42" stroke="#888" stroke-width="0.8"/>' +
    '<line x1="34" y1="33" x2="34" y2="42" stroke="#888" stroke-width="0.8"/>' +
    '<line x1="38" y1="33" x2="38" y2="42" stroke="#888" stroke-width="0.8"/>' +
    // jawline connection
    '<path d="M19,33 Q19,30 23,29 Q30,28 37,29 Q41,30 41,33" fill="#b4b4c4" stroke="#5a5a6a" stroke-width="0.8"/>' +
  '</svg>';
}

// ---- PONY OF THE MONTH: display current month/year ----
function setCurrentMonth() {
  var el = document.getElementById('current-month-year');
  if (!el) return;
  var months = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
  var d = new Date();
  el.textContent = months[d.getMonth()] + ' ' + d.getFullYear();
}
