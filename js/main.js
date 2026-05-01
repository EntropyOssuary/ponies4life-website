// ponies4.life — shared JS

// ---- EMAIL REVEAL ----
function revealEmail(btn) {
  var u = 'ponies', d = 'ponies4.life';
  var e = u + '@' + d;
  window.location.href = 'mailto:' + e;
}

// ---- AUTOPLAY POPUP (YouTube IFrame API — works in Safari) ----
function initAutoplay(ytId) {
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
      playerVars: { autoplay: 0, loop: 1, playlist: ytId, controls: 0, rel: 0, playsinline: 1 },
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

// ---- VISITOR COUNTER ----
(function () {
  var key = 'p4l_hits';
  var n   = parseInt(localStorage.getItem(key) || '41337', 10) + 1;
  localStorage.setItem(key, n);
  var el  = document.getElementById('visitor-count');
  if (el) el.textContent = String(n).padStart(7, '0');
})();

// ---- LOAD JSON & RENDER GRAVESTONES ----
function loadGravestones() {
  var grid = document.getElementById('grave-grid');
  if (!grid) return;
  fetch('data/gravestones.json')
    .then(function (r) { return r.json(); })
    .then(function (stones) {
      var countEl = document.getElementById('grave-count');
      if (countEl) countEl.textContent = stones.length;
      grid.innerHTML = stones.map(function (s) {
        var tilt = (Math.random() * 6 - 3).toFixed(1);
        return [
          '<div class="gravestone" style="transform:rotate(' + tilt + 'deg)">',
            deathHeadSVG(),
            '<div class="stone-name">' + esc(s.name) + '</div>',
            s.dates ? '<div class="stone-dates">' + esc(s.dates) + '</div>' : '',
            s.epitaph ? '<div class="stone-epitaph">' + esc(s.epitaph) + '</div>' : '',
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
        L.marker([p.lat, p.lng], { icon: icon })
          .bindPopup(
            '<b>' + esc(p.name) + '</b><br>' +
            (p.location   ? esc(p.location)   + '<br>' : '') +
            (p.continent  ? '<i>' + esc(p.continent) + '</i><br>' : '') +
            (p.description ? esc(p.description) : '')
          )
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
  return '<svg class="death-head" width="48" height="40" viewBox="0 0 48 40" xmlns="http://www.w3.org/2000/svg">' +
    // left wing
    '<path d="M0,20 Q4,8 12,14 Q6,18 8,24 Q4,26 0,20Z" fill="#8899aa" opacity="0.8"/>' +
    '<path d="M0,20 Q2,12 8,16" stroke="#aab" stroke-width="0.8" fill="none"/>' +
    '<path d="M1,22 Q3,16 9,19" stroke="#aab" stroke-width="0.8" fill="none"/>' +
    '<path d="M2,24 Q4,20 10,22" stroke="#aab" stroke-width="0.8" fill="none"/>' +
    // right wing
    '<path d="M48,20 Q44,8 36,14 Q42,18 40,24 Q44,26 48,20Z" fill="#8899aa" opacity="0.8"/>' +
    '<path d="M48,20 Q46,12 40,16" stroke="#aab" stroke-width="0.8" fill="none"/>' +
    '<path d="M47,22 Q45,16 39,19" stroke="#aab" stroke-width="0.8" fill="none"/>' +
    '<path d="M46,24 Q44,20 38,22" stroke="#aab" stroke-width="0.8" fill="none"/>' +
    // skull
    '<ellipse cx="24" cy="18" rx="10" ry="11" fill="#c8c8d8" stroke="#666" stroke-width="0.8"/>' +
    // eye sockets
    '<ellipse cx="20" cy="17" rx="3" ry="3.5" fill="#1a1a2a"/>' +
    '<ellipse cx="28" cy="17" rx="3" ry="3.5" fill="#1a1a2a"/>' +
    // nose
    '<path d="M23,22 L24,24 L25,22Z" fill="#1a1a2a"/>' +
    // jaw
    '<rect x="16" y="26" width="16" height="7" rx="2" fill="#b0b0c0" stroke="#666" stroke-width="0.6"/>' +
    '<line x1="20" y1="26" x2="20" y2="33" stroke="#666" stroke-width="0.6"/>' +
    '<line x1="24" y1="26" x2="24" y2="33" stroke="#666" stroke-width="0.6"/>' +
    '<line x1="28" y1="26" x2="28" y2="33" stroke="#666" stroke-width="0.6"/>' +
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
