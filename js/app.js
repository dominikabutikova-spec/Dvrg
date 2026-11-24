/* ============================================================
   ОБЩАЯ ЛОГИКА, ИЛЛЮСТРАЦИИ И ШАБЛОНЫ
   ============================================================ */

ensureDefaultUsers();

/* ---------- Утилиты ---------- */
function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
  });
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString('ru-RU') + ' ₽';
}

function imageUrl(path) {
  if (!path) return '';
  return 'img/' + String(path).split('/').map(function (part) {
    return encodeURIComponent(part);
  }).join('/');
}

function pluralRu(number, one, few, many) {
  const mod10 = number % 10;
  const mod100 = number % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function currentPage() {
  return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
}

function categoryName(id) {
  const category = CATEGORIES.find(function (item) { return item.id === id; });
  return category ? category.name : 'Подарок';
}

function badgeLabel(code) {
  if (code === 'hit') return 'Хит продаж';
  if (code === 'new') return 'Новинка';
  return '';
}

/* ---------- Уведомления ---------- */
function showToast(message, type) {
  const oldToast = document.querySelector('.toast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast ' + (type === 'error' ? 'toast-error' : 'toast-success');
  toast.innerHTML =
    '<span class="toast-icon">' + (type === 'error' ? '!' : '✓') + '</span>' +
    '<span>' + escapeHtml(message) + '</span>';
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.classList.add('toast-out');
    setTimeout(function () { toast.remove(); }, 250);
  }, 2700);
}

/* ============================================================
   ИЛЛЮСТРАЦИИ (SVG)
   ============================================================ */
let artSeq = 0;

function artSparkle(cx, cy, size, color, opacity) {
  const s = size;
  return '<path d="M' + cx + ' ' + (cy - s) +
    ' Q' + (cx + s * 0.18) + ' ' + (cy - s * 0.18) + ' ' + (cx + s) + ' ' + cy +
    ' Q' + (cx + s * 0.18) + ' ' + (cy + s * 0.18) + ' ' + cx + ' ' + (cy + s) +
    ' Q' + (cx - s * 0.18) + ' ' + (cy + s * 0.18) + ' ' + (cx - s) + ' ' + cy +
    ' Q' + (cx - s * 0.18) + ' ' + (cy - s * 0.18) + ' ' + cx + ' ' + (cy - s) +
    ' Z" fill="' + color + '" opacity="' + (opacity == null ? 0.8 : opacity) + '"/>';
}

function blossom(cx, cy, radius, petal, center, rotation) {
  const r = radius;
  let shape = '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + (rotation || 0) + ')">';
  for (let i = 0; i < 5; i += 1) {
    shape += '<ellipse cx="0" cy="' + (-r * 0.56).toFixed(1) + '" rx="' + (r * 0.38).toFixed(1) +
      '" ry="' + (r * 0.56).toFixed(1) + '" fill="' + petal + '" transform="rotate(' + (i * 72) + ')"/>';
  }
  shape += '<circle r="' + (r * 0.21).toFixed(1) + '" fill="' + center + '"/>';
  shape += '</g>';
  return shape;
}

function leaf(cx, cy, rx, ry, rotation, fill, opacity) {
  return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
    '" fill="' + fill + '" opacity="' + (opacity == null ? 1 : opacity) +
    '" transform="rotate(' + rotation + ' ' + cx + ' ' + cy + ')"/>';
}

function artScene(content, background) {
  const id = 'art' + (++artSeq);
  return '<svg class="art-svg" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
    '<defs>' +
      '<linearGradient id="bg' + id + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + background[0] + '"/>' +
        '<stop offset="1" stop-color="' + background[1] + '"/>' +
      '</linearGradient>' +
      '<radialGradient id="glow' + id + '" cx="50%" cy="42%" r="62%">' +
        '<stop offset="0" stop-color="#FFF9F2" stop-opacity=".92"/>' +
        '<stop offset="1" stop-color="#FFF9F2" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<rect width="320" height="240" fill="url(#bg' + id + ')"/>' +
    '<circle cx="160" cy="112" r="116" fill="url(#glow' + id + ')"/>' +
    '<circle cx="276" cy="33" r="48" fill="#FFFFFF" opacity=".14"/>' +
    '<circle cx="42" cy="207" r="66" fill="#FFFFFF" opacity=".1"/>' +
    '<circle cx="294" cy="201" r="4" fill="#4A100A" opacity=".14"/>' +
    '<circle cx="24" cy="48" r="3" fill="#4A100A" opacity=".12"/>' +
    artSparkle(286, 62, 9, '#FFF9F2', 0.75) +
    artSparkle(38, 178, 7, '#FFF9F2', 0.6) +
    artSparkle(250, 174, 5, '#FFF9F2', 0.55) +
    content +
    '</svg>';
}

const FLOWER_PALETTES = [
  { bg: ['#FBE4DB', '#F2C5BC'], p1: '#F2B0B1', p2: '#FFF2E7', center: '#D8B268', wrap: '#FFF9EF', accent: '#C56B78', leaf: '#8FA574' },
  { bg: ['#F9EAD7', '#EDCEB1'], p1: '#FFF4E3', p2: '#F0C4B4', center: '#B77C45', wrap: '#FFF9EF', accent: '#8B8451', leaf: '#7E9663' },
  { bg: ['#F7DAD7', '#EBAFB1'], p1: '#C84856', p2: '#E89AA2', center: '#F1DCA9', wrap: '#FFF9EF', accent: '#7A2A1E', leaf: '#7F9664' },
  { bg: ['#FBE3E8', '#EFC6CB'], p1: '#F5C1D0', p2: '#FFF2E8', center: '#C79A4E', wrap: '#F9EFE2', accent: '#9E5D6A', leaf: '#8FA574' }
];

function tulipFlower(cx, cy, height, color, highlight) {
  return '<g transform="translate(' + cx + ' ' + cy + ')">' +
    '<path d="M0 0 C-' + (height * 0.9) + ' -' + (height * 0.25) + ' -' + (height * 0.8) + ' -' + (height * 1.1) + ' 0 -' + (height * 1.35) +
    ' C' + (height * 0.8) + ' -' + (height * 1.1) + ' ' + (height * 0.9) + ' -' + (height * 0.25) + ' 0 0 Z" fill="' + color + '"/>' +
    '<path d="M0 0 C-' + (height * 0.28) + ' -' + (height * 0.5) + ' -' + (height * 0.22) + ' -' + (height * 1.15) + ' 0 -' + (height * 1.35) +
    ' C' + (height * 0.22) + ' -' + (height * 1.15) + ' ' + (height * 0.28) + ' -' + (height * 0.5) + ' 0 0 Z" fill="' + highlight + '" opacity=".75"/>' +
  '</g>';
}

function artFlowers(variant) {
  const pal = FLOWER_PALETTES[variant % 4];
  let content = '<g transform="translate(160 126)">';

  /* стебли */
  content += '<path d="M0 62 C-10 26 -34 4 -54 -18" stroke="' + pal.leaf + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
  content += '<path d="M0 62 C-2 22 -8 -10 -18 -42" stroke="' + pal.leaf + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
  content += '<path d="M0 62 C8 24 26 0 48 -22" stroke="' + pal.leaf + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
  content += '<path d="M0 62 C14 34 38 20 58 -4" stroke="' + pal.leaf + '" stroke-width="4" fill="none" stroke-linecap="round"/>';

  /* листья */
  content += leaf(-46, 24, 11, 26, -42, pal.leaf, 0.95);
  content += leaf(-64, 42, 9, 20, -18, pal.leaf, 0.8);
  content += leaf(46, 32, 10, 24, 38, pal.leaf, 0.9);
  content += leaf(70, 46, 8, 18, 18, pal.leaf, 0.75);
  content += leaf(-22, 8, 9, 21, -18, pal.leaf, 0.8);

  /* упаковка */
  content += '<path d="M-38 68 L-84 -6 Q0 -30 84 -6 L38 68 Z" fill="' + pal.wrap + '" stroke="#E5CFC0" stroke-width="1.4"/>';
  content += '<path d="M-84 -6 Q0 26 84 -6" fill="none" stroke="' + pal.accent + '" stroke-width="4" opacity=".85"/>';
  content += '<path d="M-38 68 Q0 80 38 68 L30 56 Q0 68 -30 56 Z" fill="' + pal.accent + '" opacity=".9"/>';

  /* цветы */
  if (variant === 3) {
    content += tulipFlower(-54, -18, 27, pal.p1, pal.p2);
    content += tulipFlower(-24, -34, 30, pal.p1, pal.p2);
    content += tulipFlower(10, -44, 32, pal.p1, pal.p2);
    content += tulipFlower(42, -28, 28, pal.p1, pal.p2);
    content += tulipFlower(62, -4, 24, pal.p1, pal.p2);
  } else {
    content += blossom(-54, -20, 23, pal.p1, pal.center, -12);
    content += blossom(-18, -45, 27, pal.p2, pal.center, 8);
    content += blossom(26, -33, 24, pal.p1, pal.center, 20);
    content += blossom(56, -6, 19, pal.p2, pal.center, -8);
    content += blossom(-4, -6, 21, pal.p1, pal.center, 0);
    content += blossom(22, 4, 13, pal.p2, pal.center, 14);
  }

  /* маленькие бутоны */
  content += '<circle cx="-74" cy="-2" r="6" fill="' + pal.p2 + '"/>';
  content += '<circle cx="76" cy="-16" r="5" fill="' + pal.p1 + '"/>';
  content += '<circle cx="-30" cy="12" r="4" fill="' + pal.p2 + '"/>';

  /* лента */
  content += '<g transform="translate(0 58)">' +
    '<path d="M-4 0 C-22 -12 -38 0 -20 11 C-8 17 -4 8 -4 0 Z" fill="' + pal.accent + '"/>' +
    '<path d="M4 0 C22 -12 38 0 20 11 C8 17 4 8 4 0 Z" fill="' + pal.accent + '"/>' +
    '<circle r="6" fill="' + pal.accent + '"/>' +
    '<path d="M-3 5 L-12 24 M3 5 L12 24" stroke="' + pal.accent + '" stroke-width="4" stroke-linecap="round"/>' +
  '</g>';

  content += '</g>';
  return artScene(content, pal.bg);
}

function chocolate(cx, cy, radius, color, swirl) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" fill="' + color + '"/>' +
    '<path d="M' + (cx - radius * 0.55) + ' ' + cy + ' Q' + cx + ' ' + (cy - radius * 0.55) + ' ' + (cx + radius * 0.55) + ' ' + cy +
    ' Q' + cx + ' ' + (cy + radius * 0.55) + ' ' + (cx - radius * 0.55) + ' ' + cy + ' Z" fill="none" stroke="' + swirl + '" stroke-width="1.8" opacity=".7"/>';
}

function strawberry(cx, cy, scale, dipped) {
  const s = scale;
  return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
    '<path d="M0 0 C-23 7 -25 35 0 54 C25 35 23 7 0 0 Z" fill="#D95362"/>' +
    '<path d="M0 30 C-20 30 -24 38 0 54 C24 38 20 30 0 30 Z" fill="' + dipped + '"/>' +
    '<path d="M-15 -1 Q0 -14 15 -1 Q7 5 0 0 Q-7 5 -15 -1 Z" fill="#7E9663"/>' +
    '<path d="M0 -1 L0 -12" stroke="#7E9663" stroke-width="2.5" stroke-linecap="round"/>' +
    '<g fill="#FFF3E6" opacity=".8"><circle cx="-8" cy="12" r="1.4"/><circle cx="7" cy="18" r="1.3"/><circle cx="-3" cy="26" r="1.2"/><circle cx="10" cy="35" r="1.2"/></g>' +
  '</g>';
}

function artSweets(variant) {
  let content = '<g transform="translate(160 128)">';
  content += '<ellipse cx="0" cy="84" rx="92" ry="11" fill="#4A100A" opacity=".12"/>';

  if (variant === 1) {
    /* клубника в шоколаде */
    content += '<rect x="-82" y="-4" width="164" height="82" rx="14" fill="#4A100A"/>';
    content += '<rect x="-72" y="6" width="144" height="62" rx="9" fill="#FFF3E6"/>';
    content += strawberry(-50, -6, 0.95, '#5B3A2A');
    content += strawberry(-16, -14, 1.03, '#5B3A2A');
    content += strawberry(22, -8, 0.98, '#F7E7DA');
    content += strawberry(54, -2, 0.86, '#5B3A2A');
    content += strawberry(-8, 24, 0.9, '#F7E7DA');
    content += strawberry(34, 28, 0.82, '#5B3A2A');
    content += '<rect x="-88" y="-18" width="176" height="18" rx="9" fill="#F4C6AC"/>';
    content += '<path d="M-88 -9 Q0 8 88 -9" fill="none" stroke="#D7B36A" stroke-width="3" opacity=".8"/>';
  } else if (variant === 2) {
    /* банка с мармеладом */
    content += '<rect x="-54" y="-58" width="108" height="136" rx="24" fill="#FFF9F2" opacity=".55" stroke="#E5CFC0" stroke-width="2"/>';
    content += '<rect x="-60" y="-68" width="120" height="22" rx="10" fill="' + '#C56B78' + '"/>';
    content += '<path d="M-54 -46 L54 -46" stroke="#FFF9F2" stroke-width="3" opacity=".8"/>';
    const candyColors = ['#E7A0A6', '#F4C6AC', '#C56B78', '#D7B36A', '#8FA574', '#F0C4B4'];
    const candyPositions = [[-28, -18], [0, -26], [28, -14], [-16, 12], [16, 16], [-32, 38], [4, 42], [30, 40], [-4, 66]];
    candyPositions.forEach(function (pos, index) {
      content += '<circle cx="' + pos[0] + '" cy="' + pos[1] + '" r="13" fill="' + candyColors[index % candyColors.length] + '"/>';
      content += '<circle cx="' + (pos[0] - 3) + '" cy="' + (pos[1] - 4) + '" r="3" fill="#FFF9F2" opacity=".45"/>';
    });
    content += '<path d="M-54 58 Q0 70 54 58" fill="none" stroke="#E5CFC0" stroke-width="2"/>';
    content += '<path d="M-6 74 L0 94 M6 74 L0 94" stroke="#C56B78" stroke-width="4" stroke-linecap="round"/>';
  } else {
    /* коробка конфет / трюфелей */
    content += '<rect x="-96" y="-58" width="192" height="32" rx="10" fill="#F2C3AE"/>';
    content += '<path d="M-86 -42 L86 -42" stroke="#D7B36A" stroke-width="3" opacity=".8"/>';
    content += '<rect x="-84" y="-24" width="168" height="94" rx="13" fill="#4A100A"/>';
    content += '<rect x="-72" y="-13" width="144" height="72" rx="8" fill="#FFF3E6"/>';
    const colors = variant === 3
      ? ['#5B3A2A', '#8A5B45', '#C79A74', '#6B3B2A', '#A9744F', '#D7B36A']
      : ['#5B3A2A', '#C56B78', '#FFF7EC', '#8A5B45', '#E7A0A6', '#6B3B2A'];
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        content += chocolate(-48 + col * 32, 4 + row * 32, 13, colors[(row * 4 + col) % colors.length], '#FFF3E6');
      }
    }
    content += '<rect x="-10" y="-58" width="20" height="128" fill="#D7B36A" opacity=".9"/>';
    content += '<g transform="translate(0 -58)">' +
      '<path d="M-6 0 C-30 -16 -48 2 -24 14 C-10 20 -6 8 -6 0 Z" fill="#D7B36A"/>' +
      '<path d="M6 0 C30 -16 48 2 24 14 C10 20 6 8 6 0 Z" fill="#D7B36A"/>' +
      '<circle r="7" fill="#D7B36A"/>' +
    '</g>';
    content += chocolate(-112, 40, 15, '#5B3A2A', '#FFF3E6');
    content += chocolate(112, 34, 13, '#C56B78', '#FFF3E6');
  }

  content += '</g>';
  return artScene(content, variant === 1 ? ['#FBE6E4', '#F1C9C6'] : ['#F8E4D2', '#EFC7A8']);
}

function artSets(variant) {
  let content = '<g transform="translate(160 132)">';
  content += '<ellipse cx="0" cy="82" rx="98" ry="12" fill="#4A100A" opacity=".14"/>';
  const palettes = [
    { box: '#4A100A', lid: '#F4C6AC', ribbon: '#D7B36A', bg: ['#F8DCD2', '#EFBEB2'] },
    { box: '#6F693C', lid: '#FFF3E6', ribbon: '#D7B36A', bg: ['#F1E8D4', '#D9D4B4'] },
    { box: '#C56B78', lid: '#F9D9C6', ribbon: '#FFF3E6', bg: ['#FBE4DD', '#F0C4B9'] },
    { box: '#E8C9B4', lid: '#FFF9EF', ribbon: '#8B8451', bg: ['#F8EBDD', '#EFD6C2'] }
  ];
  const pal = palettes[variant % 4];

  if (variant === 0) {
    content += '<path d="M78 -66 C112 -86 138 -48 108 -28 C90 -16 74 -36 78 -66 Z" fill="#EFA9A2"/>';
    content += '<path d="M88 -28 C84 16 80 38 76 62" stroke="#C56B78" stroke-width="1.6" fill="none" opacity=".65"/>';
    content += blossom(-100, -38, 18, '#F4C6C0', '#D8B268', -15);
    content += leaf(-92, -8, 7, 18, -20, '#8FA574');
  } else if (variant === 1) {
    content += '<g transform="translate(-100 -46)">' +
      '<rect x="-24" y="-20" width="48" height="54" rx="12" fill="#FFF9EF"/>' +
      '<path d="M-24 -6 Q0 8 24 -6" fill="none" stroke="#8B8451" stroke-width="3"/>' +
      '<path d="M-12 34 L-12 46 M12 34 L12 46" stroke="#8B8451" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="-30" y="-28" width="60" height="12" rx="6" fill="#8B8451"/>' +
      '<path d="M-28 -28 C-38 -48 -18 -52 -14 -34" fill="none" stroke="#8B8451" stroke-width="2"/>' +
    '</g>';
  } else if (variant === 2) {
    content += '<g opacity=".95">' +
      '<circle cx="-74" cy="-60" r="22" fill="#E8A6A0"/><path d="M-74 -38 C-80 -8 -84 8 -88 26" stroke="#C56B78" stroke-width="1.4" fill="none"/>' +
      '<circle cx="0" cy="-82" r="24" fill="#F4C6AC"/><path d="M0 -58 C2 -26 2 -8 0 18" stroke="#C56B78" stroke-width="1.4" fill="none"/>' +
      '<circle cx="76" cy="-58" r="20" fill="#D7B36A"/><path d="M76 -38 C82 -12 84 6 82 24" stroke="#C56B78" stroke-width="1.4" fill="none"/>' +
    '</g>';
    content += '<g fill="#F4C6AC" opacity=".8"><circle cx="-116" cy="18" r="4"/><circle cx="104" cy="-12" r="3"/><circle cx="116" cy="18" r="2.5"/><circle cx="-94" cy="-4" r="2.5"/></g>';
  } else {
    content += '<g transform="translate(-104 2) rotate(-10)">' +
      '<rect x="-28" y="-24" width="56" height="68" rx="6" fill="#FFF9EF" stroke="#E5CFC0"/>' +
      '<path d="M-28 -24 L0 -4 L28 -24" fill="none" stroke="#8B8451" stroke-width="2"/>' +
      '<path d="M-14 14 Q0 4 14 14" fill="none" stroke="#C56B78" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="0" cy="28" r="12" fill="#C56B78" opacity=".85"/>' +
    '</g>';
    content += blossom(-98, -38, 14, '#F4C6C0', '#D8B268', 10);
  }

  content += '<rect x="-78" y="-16" width="156" height="90" rx="11" fill="' + pal.box + '"/>';
  content += '<rect x="-88" y="-44" width="176" height="32" rx="9" fill="' + pal.lid + '"/>';
  content += '<rect x="-18" y="-44" width="36" height="118" fill="' + pal.ribbon + '" opacity=".92"/>';
  content += '<path d="M-78 6 L78 6" stroke="#FFF9F2" stroke-width="2" opacity=".1"/>';
  content += '<g transform="translate(0 -44)">' +
    '<path d="M-7 0 C-32 -17 -50 3 -25 16 C-10 23 -7 9 -7 0 Z" fill="' + pal.ribbon + '"/>' +
    '<path d="M7 0 C32 -17 50 3 25 16 C10 23 7 9 7 0 Z" fill="' + pal.ribbon + '"/>' +
    '<circle r="8" fill="' + pal.ribbon + '"/>' +
    '<path d="M-4 7 L-14 28 M4 7 L14 28" stroke="' + pal.ribbon + '" stroke-width="5" stroke-linecap="round"/>' +
  '</g>';
  content += '</g>';
  return artScene(content, pal.bg);
}

function artToys(variant) {
  const palettes = [
    { fur: '#A9744F', fur2: '#C08A63', inner: '#E9C5AC', muzzle: '#F4DFCB', accent: '#C56B78', bg: ['#F8E7D8', '#EBC9B5'] },
    { fur: '#B9B3AE', fur2: '#D2CCC7', inner: '#F0DCD5', muzzle: '#F8ECE4', accent: '#D8A3A8', bg: ['#F2E9E3', '#DCD0C9'] },
    { fur: '#C57C4E', fur2: '#DE9A68', inner: '#F5D7BE', muzzle: '#FFF1E3', accent: '#8B8451', bg: ['#F9E5D3', '#EDC7A9'] },
    { fur: '#C4A6A0', fur2: '#D8BEB8', inner: '#F1DAD4', muzzle: '#FFF4EC', accent: '#8B8451', bg: ['#F6E9E5', '#E5D2CD'] }
  ];
  const pal = palettes[variant % 4];
  let content = '<g transform="translate(160 128)">';
  content += '<ellipse cx="0" cy="88" rx="72" ry="10" fill="#4A100A" opacity=".12"/>';

  function bow(cx, cy) {
    return '<g transform="translate(' + cx + ' ' + cy + ')">' +
      '<path d="M-3 0 C-18 -10 -28 2 -14 9 C-6 13 -3 5 -3 0 Z" fill="' + pal.accent + '"/>' +
      '<path d="M3 0 C18 -10 28 2 14 9 C6 13 3 5 3 0 Z" fill="' + pal.accent + '"/>' +
      '<circle r="5" fill="' + pal.accent + '"/>' +
    '</g>';
  }

  if (variant === 1) {
    /* зайка */
    content += '<ellipse cx="0" cy="50" rx="47" ry="42" fill="' + pal.fur + '"/>';
    content += '<ellipse cx="-21" cy="-78" rx="14" ry="46" fill="' + pal.fur + '" transform="rotate(-10 -21 -78)"/>';
    content += '<ellipse cx="21" cy="-78" rx="14" ry="46" fill="' + pal.fur + '" transform="rotate(10 21 -78)"/>';
    content += '<ellipse cx="-21" cy="-78" rx="7" ry="33" fill="' + pal.inner + '" transform="rotate(-10 -21 -78)"/>';
    content += '<ellipse cx="21" cy="-78" rx="7" ry="33" fill="' + pal.inner + '" transform="rotate(10 21 -78)"/>';
    content += '<circle cx="0" cy="-24" r="43" fill="' + pal.fur + '"/>';
    content += '<ellipse cx="0" cy="-14" rx="25" ry="19" fill="' + pal.muzzle + '"/>';
    content += '<circle cx="-13" cy="-32" r="3.6" fill="#3B2119"/><circle cx="13" cy="-32" r="3.6" fill="#3B2119"/>';
    content += '<ellipse cx="0" cy="-20" rx="5" ry="4" fill="' + pal.accent + '"/>';
    content += '<path d="M0 -16 Q-5 -9 -10 -13 M0 -16 Q5 -9 10 -13" stroke="#5B3A2A" stroke-width="2" fill="none" stroke-linecap="round"/>';
    content += '<ellipse cx="-37" cy="34" rx="16" ry="25" fill="' + pal.fur2 + '" transform="rotate(22 -37 34)"/>';
    content += '<ellipse cx="37" cy="34" rx="16" ry="25" fill="' + pal.fur2 + '" transform="rotate(-22 37 34)"/>';
    content += '<ellipse cx="-20" cy="82" rx="22" ry="12" fill="' + pal.fur2 + '"/><ellipse cx="20" cy="82" rx="22" ry="12" fill="' + pal.fur2 + '"/>';
    content += bow(0, 14);
  } else if (variant === 2) {
    /* лисичка */
    content += '<ellipse cx="0" cy="50" rx="48" ry="42" fill="' + pal.fur + '"/>';
    content += '<path d="M-42 -54 L-56 -98 L-18 -74 Z" fill="' + pal.fur + '"/>';
    content += '<path d="M42 -54 L56 -98 L18 -74 Z" fill="' + pal.fur + '"/>';
    content += '<path d="M-40 -60 L-49 -86 L-24 -71 Z" fill="' + pal.inner + '"/>';
    content += '<path d="M40 -60 L49 -86 L24 -71 Z" fill="' + pal.inner + '"/>';
    content += '<circle cx="0" cy="-28" r="45" fill="' + pal.fur + '"/>';
    content += '<path d="M-28 2 Q0 -20 28 2 Q14 34 0 34 Q-14 34 -28 2 Z" fill="' + pal.muzzle + '"/>';
    content += '<circle cx="-14" cy="-36" r="3.6" fill="#3B2119"/><circle cx="14" cy="-36" r="3.6" fill="#3B2119"/>';
    content += '<ellipse cx="0" cy="-20" rx="5" ry="4" fill="#4A100A"/>';
    content += '<path d="M0 -16 Q-6 -8 -11 -12 M0 -16 Q6 -8 11 -12" stroke="#5B3A2A" stroke-width="2" fill="none" stroke-linecap="round"/>';
    content += '<ellipse cx="-38" cy="36" rx="15" ry="24" fill="' + pal.fur2 + '" transform="rotate(22 -38 36)"/>';
    content += '<ellipse cx="38" cy="36" rx="15" ry="24" fill="' + pal.fur2 + '" transform="rotate(-22 38 36)"/>';
    content += '<path d="M-44 14 Q0 32 44 14 L40 30 Q0 46 -40 30 Z" fill="' + pal.accent + '"/>';
    content += '<path d="M30 30 L38 54" stroke="' + pal.accent + '" stroke-width="5" stroke-linecap="round"/>';
    content += '<ellipse cx="-18" cy="82" rx="21" ry="12" fill="' + pal.fur2 + '"/><ellipse cx="18" cy="82" rx="21" ry="12" fill="' + pal.fur2 + '"/>';
  } else if (variant === 3) {
    /* слоник */
    content += '<ellipse cx="0" cy="50" rx="49" ry="43" fill="' + pal.fur + '"/>';
    content += '<ellipse cx="-47" cy="-28" rx="31" ry="38" fill="' + pal.fur2 + '"/>';
    content += '<ellipse cx="47" cy="-28" rx="31" ry="38" fill="' + pal.fur2 + '"/>';
    content += '<circle cx="0" cy="-30" r="43" fill="' + pal.fur + '"/>';
    content += '<path d="M0 -2 C2 22 -10 48 -2 58 C6 68 24 60 20 50" fill="none" stroke="' + pal.fur + '" stroke-width="18" stroke-linecap="round"/>';
    content += '<path d="M0 -2 C2 22 -10 44 -3 52" fill="none" stroke="' + pal.inner + '" stroke-width="5" stroke-linecap="round" opacity=".75"/>';
    content += '<circle cx="-14" cy="-38" r="3.8" fill="#3B2119"/><circle cx="14" cy="-38" r="3.8" fill="#3B2119"/>';
    content += '<path d="M-12 -16 Q0 -8 12 -16" stroke="#5B3A2A" stroke-width="2" fill="none" stroke-linecap="round"/>';
    content += '<ellipse cx="-34" cy="36" rx="16" ry="25" fill="' + pal.fur2 + '" transform="rotate(22 -34 36)"/>';
    content += '<ellipse cx="34" cy="36" rx="16" ry="25" fill="' + pal.fur2 + '" transform="rotate(-22 34 36)"/>';
    content += '<ellipse cx="-20" cy="82" rx="22" ry="12" fill="' + pal.fur2 + '"/><ellipse cx="20" cy="82" rx="22" ry="12" fill="' + pal.fur2 + '"/>';
    content += bow(0, 12);
  } else {
    /* мишка */
    content += '<ellipse cx="0" cy="52" rx="49" ry="43" fill="' + pal.fur + '"/>';
    content += '<circle cx="-35" cy="-66" r="18" fill="' + pal.fur + '"/><circle cx="35" cy="-66" r="18" fill="' + pal.fur + '"/>';
    content += '<circle cx="-35" cy="-66" r="9" fill="' + pal.inner + '"/><circle cx="35" cy="-66" r="9" fill="' + pal.inner + '"/>';
    content += '<circle cx="0" cy="-30" r="46" fill="' + pal.fur + '"/>';
    content += '<ellipse cx="0" cy="-16" rx="27" ry="21" fill="' + pal.muzzle + '"/>';
    content += '<circle cx="-14" cy="-38" r="3.8" fill="#3B2119"/><circle cx="14" cy="-38" r="3.8" fill="#3B2119"/>';
    content += '<ellipse cx="0" cy="-25" rx="6" ry="4.5" fill="#4A100A"/>';
    content += '<path d="M0 -21 Q-6 -12 -12 -16 M0 -21 Q6 -12 12 -16" stroke="#5B3A2A" stroke-width="2" fill="none" stroke-linecap="round"/>';
    content += '<ellipse cx="-40" cy="34" rx="16" ry="26" fill="' + pal.fur2 + '" transform="rotate(22 -40 34)"/>';
    content += '<ellipse cx="40" cy="34" rx="16" ry="26" fill="' + pal.fur2 + '" transform="rotate(-22 40 34)"/>';
    content += '<ellipse cx="-20" cy="84" rx="22" ry="12" fill="' + pal.fur2 + '"/><ellipse cx="20" cy="84" rx="22" ry="12" fill="' + pal.fur2 + '"/>';
    content += '<path d="M0 18 C-10 8 -22 16 -12 26 C-6 32 0 26 0 18 C0 26 6 32 12 26 C22 16 10 8 0 18 Z" fill="' + pal.accent + '" opacity=".9"/>';
    content += bow(0, 16);
  }

  content += '</g>';
  return artScene(content, pal.bg);
}

function artJewelry(variant) {
  let content = '<g transform="translate(160 128)">';
  content += '<ellipse cx="0" cy="84" rx="94" ry="11" fill="#4A100A" opacity=".11"/>';
  const palettes = [
    { bg: ['#F8EBDD', '#EDD2C1'], box: '#4A100A', lid: '#F4C6AC' },
    { bg: ['#F6EADF', '#E8D3C6'], box: '#6F693C', lid: '#FFF3E6' },
    { bg: ['#FBE8E4', '#EFCBC5'], box: '#C56B78', lid: '#F9D9C6' },
    { bg: ['#F4E9E4', '#E1CEC6'], box: '#4A100A', lid: '#E8C9B4' }
  ];
  const pal = palettes[variant % 4];

  if (variant === 1) {
    /* серьги на карточке */
    content += '<rect x="-78" y="-64" width="156" height="132" rx="12" fill="#FFF9EF" stroke="#E5CFC0" stroke-width="1.5"/>';
    content += '<path d="M-50 -30 C-50 -44 -36 -44 -36 -30" fill="none" stroke="#D7B36A" stroke-width="2.5"/>';
    content += '<path d="M36 -30 C36 -44 50 -44 50 -30" fill="none" stroke="#D7B36A" stroke-width="2.5"/>';
    content += '<path d="M-43 -28 L-43 -10 L-56 18 Q-43 34 -30 18 L-43 -10" fill="#E8A6A0"/>';
    content += '<path d="M43 -28 L43 -10 L30 18 Q43 34 56 18 L43 -10" fill="#E8A6A0"/>';
    content += '<circle cx="-43" cy="-12" r="4" fill="#D7B36A"/><circle cx="43" cy="-12" r="4" fill="#D7B36A"/>';
    content += artSparkle(-43, 10, 8, '#FFF9F2', 0.8);
    content += artSparkle(43, 10, 8, '#FFF9F2', 0.8);
  } else if (variant === 2) {
    /* браслет на подушечке */
    content += '<rect x="-74" y="-34" width="148" height="94" rx="38" fill="#F4C6AC"/>';
    content += '<circle cx="0" cy="14" r="42" fill="none" stroke="#D7B36A" stroke-width="7"/>';
    content += '<circle cx="0" cy="14" r="42" fill="none" stroke="#F7E7DA" stroke-width="2" opacity=".7"/>';
    content += blossom(0, 14, 17, '#F4C6C0', '#D7B36A', 0);
  } else if (variant === 3) {
    /* кольцо на подушечке */
    content += '<rect x="-88" y="-26" width="176" height="90" rx="30" fill="#F4C6AC"/>';
    content += '<ellipse cx="0" cy="24" rx="31" ry="12" fill="#E8A6A0" opacity=".55"/>';
    content += '<circle cx="0" cy="4" r="30" fill="none" stroke="#D7B36A" stroke-width="8"/>';
    content += '<path d="M0 -32 L-17 -3 L0 20 L17 -3 Z" fill="#E8D6EE" stroke="#D7B36A" stroke-width="2"/>';
    content += '<path d="M0 -32 L0 20 M-17 -3 L17 -3" stroke="#D7B36A" stroke-width="1" opacity=".6"/>';
    content += artSparkle(0, -6, 12, '#FFF9F2', 0.9);
  } else {
    /* колье в шкатулке */
    content += '<rect x="-96" y="-58" width="192" height="34" rx="10" fill="' + pal.lid + '"/>';
    content += '<rect x="-84" y="-28" width="168" height="98" rx="13" fill="' + pal.box + '"/>';
    content += '<rect x="-72" y="-17" width="144" height="76" rx="9" fill="#FFF3E6"/>';
    content += '<path d="M-58 28 C-52 -16 52 -16 58 28" fill="none" stroke="#D7B36A" stroke-width="3"/>';
    for (let i = 0; i < 9; i += 1) {
      const angle = Math.PI * (0.12 + (i / 8) * 0.76);
      const x = Math.cos(angle) * 58;
      const y = 28 - Math.sin(angle) * 44;
      content += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4" fill="#FFF9EF" stroke="#E5CFC0" stroke-width="1"/>';
    }
    content += '<path d="M0 30 C-13 16 -28 28 -14 42 C-6 50 0 42 0 30 C0 42 6 50 14 42 C28 28 13 16 0 30 Z" fill="#C56B78"/>';
    content += '<circle cx="0" cy="28" r="5" fill="#D7B36A"/>';
    content += artSparkle(36, 4, 8, '#FFF9F2', 0.8);
  }

  content += '</g>';
  return artScene(content, pal.bg);
}

function artHome(variant) {
  let content = '<g transform="translate(160 128)">';
  content += '<ellipse cx="0" cy="90" rx="78" ry="10" fill="#4A100A" opacity=".1"/>';

  if (variant === 1) {
    /* диффузор */
    content += '<rect x="-36" y="-14" width="72" height="100" rx="16" fill="#C98F58" opacity=".9"/>';
    content += '<rect x="-30" y="-6" width="60" height="84" rx="12" fill="#E2B07A" opacity=".55"/>';
    content += '<rect x="-22" y="-26" width="44" height="16" rx="6" fill="#8B8451"/>';
    content += '<path d="M-6 -26 L-46 -100 M6 -26 L40 -108 M0 -26 L6 -112 M12 -26 L56 -92" stroke="#8B8451" stroke-width="3" stroke-linecap="round"/>';
    content += '<rect x="-26" y="22" width="52" height="34" rx="5" fill="#FFF9EF"/>';
    content += '<path d="M-14 34 L14 34 M-14 42 L8 42" stroke="#C56B78" stroke-width="2.5" stroke-linecap="round"/>';
    content += leaf(-58, 38, 8, 21, -35, '#8FA574');
    content += leaf(58, 50, 7, 18, 30, '#8FA574');
  } else if (variant === 2) {
    /* аромасаше */
    content += '<path d="M-48 -40 L48 -40 L40 76 Q0 88 -40 76 Z" fill="#F4DFCB" stroke="#E5CFC0" stroke-width="1.5"/>';
    content += '<path d="M-48 -40 Q0 -24 48 -40" fill="none" stroke="#C56B78" stroke-width="3"/>';
    content += '<path d="M-24 -30 Q0 -52 24 -30" fill="none" stroke="#C56B78" stroke-width="3" stroke-linecap="round"/>';
    content += blossom(0, 16, 22, '#F2B0B1', '#D8B268', -8);
    content += blossom(-22, 34, 12, '#F5C1D0', '#D8B268', 12);
    content += leaf(24, 38, 7, 18, 28, '#8FA574');
    content += '<path d="M-30 62 L30 62" stroke="#C56B78" stroke-width="2" stroke-dasharray="3 5" opacity=".6"/>';
  } else if (variant === 3) {
    /* плед */
    content += '<rect x="-86" y="12" width="172" height="50" rx="12" fill="#8B8451"/>';
    content += '<rect x="-80" y="-10" width="160" height="34" rx="11" fill="#A69A67"/>';
    content += '<rect x="-74" y="-30" width="148" height="30" rx="10" fill="#C2B77D"/>';
    content += '<path d="M-74 18 L74 18 M-80 4 L80 4" stroke="#FFF9EF" stroke-width="1.5" opacity=".35"/>';
    content += '<path d="M-40 -30 L-40 62 M32 -30 L32 62" stroke="#C56B78" stroke-width="8" opacity=".85"/>';
    content += '<path d="M-40 -30 C-56 -44 -34 -54 -28 -38" fill="none" stroke="#C56B78" stroke-width="3"/>';
    content += leaf(62, -6, 8, 21, 26, '#8FA574');
    content += blossom(54, -34, 13, '#F4C6C0', '#D8B268', 0);
  } else {
    /* свеча */
    content += '<circle cx="0" cy="-56" r="34" fill="#F4C6AC" opacity=".35"/>';
    content += '<rect x="-42" y="-28" width="84" height="112" rx="14" fill="#FFF9EF" opacity=".62" stroke="#E5CFC0" stroke-width="1.5"/>';
    content += '<rect x="-34" y="-6" width="68" height="78" rx="8" fill="#F4C6AC" opacity=".6"/>';
    content += '<path d="M0 -28 L0 -44" stroke="#5B3A2A" stroke-width="3" stroke-linecap="round"/>';
    content += '<path d="M0 -62 C-12 -50 -8 -36 0 -32 C8 -36 12 -50 0 -62 Z" fill="#D7B36A"/>';
    content += '<path d="M0 -52 C-5 -46 -3 -39 0 -36 C3 -39 5 -46 0 -52 Z" fill="#FFF3D0"/>';
    content += '<rect x="-26" y="24" width="52" height="34" rx="5" fill="#FFF9EF"/>';
    content += '<path d="M-14 36 L14 36 M-14 44 L6 44" stroke="#8B8451" stroke-width="2" stroke-linecap="round"/>';
    content += leaf(-58, 42, 8, 22, -28, '#8FA574');
    content += leaf(58, 48, 7, 19, 26, '#8FA574');
  }

  content += '</g>';
  return artScene(content, variant === 0 ? ['#F7EBDD', '#E8D3C2'] : ['#EDEEDB', '#D2D8B9']);
}

function artPackaging(kind, variant) {
  if (kind === 'custom') return artSets(3);

  let content = '<g transform="translate(160 128)">';
  content += '<ellipse cx="0" cy="88" rx="92" ry="11" fill="#4A100A" opacity=".12"/>';

  if (kind === 'heart') {
    content += '<path d="M0 74 C-78 20 -82 -34 -48 -46 C-22 -55 -4 -34 0 -18 C4 -34 22 -55 48 -46 C82 -34 78 20 0 74 Z" fill="#C56B78"/>';
    content += '<path d="M0 60 C-66 14 -68 -24 -44 -34 C-24 -41 -8 -22 0 -8 C8 -22 24 -41 44 -34 C68 -24 66 14 0 60 Z" fill="#F4C6AC"/>';
    content += '<path d="M-72 -22 Q0 12 72 -22" fill="none" stroke="#D7B36A" stroke-width="4" opacity=".9"/>';
    content += '<rect x="-8" y="-44" width="16" height="108" fill="#D7B36A" opacity=".85"/>';
    content += '<g transform="translate(0 -44)">' +
      '<path d="M-5 0 C-26 -14 -42 4 -20 14 C-9 20 -5 8 -5 0 Z" fill="#D7B36A"/>' +
      '<path d="M5 0 C26 -14 42 4 20 14 C9 20 5 8 5 0 Z" fill="#D7B36A"/>' +
      '<circle r="6" fill="#D7B36A"/>' +
    '</g>';
  } else if (kind === 'hat') {
    content += '<rect x="-72" y="-6" width="144" height="92" rx="18" fill="#F4C6AC"/>';
    content += '<ellipse cx="0" cy="-6" rx="84" ry="22" fill="#F9D9C6"/>';
    content += '<ellipse cx="0" cy="-8" rx="72" ry="16" fill="#F4C6AC"/>';
    content += '<rect x="-9" y="-8" width="18" height="94" fill="#C56B78" opacity=".9"/>';
    content += '<path d="M-72 24 Q0 42 72 24" fill="none" stroke="#D7B36A" stroke-width="4" opacity=".8"/>';
    content += '<g transform="translate(0 -8)">' +
      '<path d="M-5 0 C-28 -16 -46 4 -22 16 C-10 22 -5 9 -5 0 Z" fill="#C56B78"/>' +
      '<path d="M5 0 C28 -16 46 4 22 16 C10 22 5 9 5 0 Z" fill="#C56B78"/>' +
      '<circle r="7" fill="#C56B78"/>' +
    '</g>';
    content += blossom(54, 28, 15, '#F4C6C0', '#D8B268', 12);
    content += leaf(68, 48, 6, 16, 28, '#8FA574');
  } else if (kind === 'basket') {
    content += '<path d="M-62 16 L62 16 L48 80 Q0 94 -48 80 Z" fill="#C99A68"/>';
    content += '<path d="M-62 16 Q0 4 62 16" fill="none" stroke="#A9744F" stroke-width="7"/>';
    content += '<path d="M-52 38 L52 38 M-48 58 L48 58 M-44 76 L44 76" stroke="#A9744F" stroke-width="2" opacity=".65"/>';
    content += '<path d="M-52 38 L-22 80 M-20 38 L-6 82 M12 38 L16 82 M44 38 L34 80" stroke="#A9744F" stroke-width="2" opacity=".5"/>';
    content += '<path d="M-58 16 Q0 -54 58 16" fill="none" stroke="#A9744F" stroke-width="6"/>';
    content += '<path d="M-54 16 Q0 -40 54 16" fill="none" stroke="#D7B36A" stroke-width="2" opacity=".6"/>';
    content += '<path d="M-46 16 Q0 2 46 16 L40 30 Q0 20 -40 30 Z" fill="#FFF3E6"/>';
    content += blossom(-26, 2, 17, '#F2B0B1', '#D8B268', 8);
    content += blossom(20, -8, 19, '#F4C6C0', '#D8B268', -10);
    content += blossom(44, 12, 12, '#F5C1D0', '#D8B268', 14);
    content += leaf(-44, 22, 7, 18, -30, '#8FA574');
    content += '<path d="M-14 64 Q0 72 14 64" fill="none" stroke="#C56B78" stroke-width="4"/>';
  } else if (kind === 'envelope') {
    content += '<rect x="-80" y="-34" width="160" height="104" rx="10" fill="#FFF9EF" stroke="#E5CFC0" stroke-width="1.5"/>';
    content += '<path d="M-80 -30 L0 30 L80 -30" fill="none" stroke="#E5CFC0" stroke-width="2"/>';
    content += '<path d="M-80 66 L-20 18 M80 66 L20 18" fill="none" stroke="#E5CFC0" stroke-width="2"/>';
    content += '<circle cx="0" cy="34" r="17" fill="#C56B78"/>';
    content += '<circle cx="0" cy="34" r="12" fill="#A94E5E"/>';
    content += blossom(0, 34, 7, '#F4C6C0', '#FFF3E6', 0);
    content += blossom(56, -32, 13, '#F2B0B1', '#D8B268', 12);
    content += leaf(68, -12, 6, 16, 28, '#8FA574');
    content += '<path d="M-56 -18 Q-48 -36 -38 -30" fill="none" stroke="#8FA574" stroke-width="2"/>';
  } else {
    /* крафт-бокс */
    content += '<rect x="-80" y="-20" width="160" height="98" rx="10" fill="#D8B08A"/>';
    content += '<rect x="-88" y="-48" width="176" height="34" rx="8" fill="#E8C7A6"/>';
    content += '<path d="M-80 0 L80 0 M-80 28 L80 28 M-80 56 L80 56" stroke="#C29A73" stroke-width="1.5" opacity=".45"/>';
    content += '<rect x="-12" y="-48" width="24" height="126" fill="#C56B78" opacity=".9"/>';
    content += '<path d="M-88 -32 L88 -32" stroke="#C56B78" stroke-width="4" opacity=".75"/>';
    content += '<g transform="translate(0 -48)">' +
      '<path d="M-6 0 C-30 -16 -46 4 -22 16 C-10 22 -6 9 -6 0 Z" fill="#C56B78"/>' +
      '<path d="M6 0 C30 -16 46 4 22 16 C10 22 6 9 6 0 Z" fill="#C56B78"/>' +
      '<circle r="7" fill="#C56B78"/>' +
    '</g>';
    content += '<rect x="-56" y="16" width="46" height="24" rx="5" fill="#FFF9EF" opacity=".92"/>';
    content += '<path d="M-46 26 L-22 26 M-46 33 L-30 33" stroke="#8B8451" stroke-width="2" stroke-linecap="round"/>';
  }

  content += '</g>';
  return artScene(content, ['#F8E7D8', '#E9C9AF']);
}

function artByType(type, variant) {
  switch (type) {
    case 'flowers': return artFlowers(variant);
    case 'sweets': return artSweets(variant);
    case 'sets': return artSets(variant);
    case 'toys': return artToys(variant);
    case 'jewelry': return artJewelry(variant);
    case 'home': return artHome(variant);
    default: return artSets(variant);
  }
}

function artProduct(product) {
  return artByType(product.art || product.cat || 'sets', product.variant || 0);
}

function artPackagingCard(item) {
  return artPackaging(item.art, item.variant || 0);
}

function fillingIcon(type) {
  const open = '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">';
  const close = '</svg>';
  let content = '';

  if (type === 'candy') {
    content = '<circle cx="20" cy="20" r="11" fill="#C56B78"/>' +
      '<path d="M9 20 L2 14 L2 26 Z M31 20 L38 14 L38 26 Z" fill="#F4C6AC"/>' +
      '<path d="M15 14 Q20 20 15 26 M25 14 Q20 20 25 26" stroke="#FFF3E6" stroke-width="2" fill="none" opacity=".8"/>';
  } else if (type === 'toy') {
    content = '<circle cx="14" cy="12" r="6" fill="#A9744F"/><circle cx="26" cy="12" r="6" fill="#A9744F"/>' +
      '<circle cx="20" cy="21" r="13" fill="#C08A63"/>' +
      '<ellipse cx="20" cy="25" rx="7" ry="5" fill="#F4DFCB"/>' +
      '<circle cx="16" cy="19" r="1.5" fill="#3B2119"/><circle cx="24" cy="19" r="1.5" fill="#3B2119"/>' +
      '<circle cx="20" cy="23" r="1.7" fill="#4A100A"/>';
  } else if (type === 'card') {
    content = '<rect x="5" y="9" width="30" height="22" rx="3" fill="#FFF9EF" stroke="#E5CFC0" stroke-width="1.5"/>' +
      '<path d="M5 11 L20 22 L35 11" fill="none" stroke="#C56B78" stroke-width="2"/>' +
      '<circle cx="28" cy="27" r="4" fill="#C56B78"/>';
  } else if (type === 'candle') {
    content = '<rect x="13" y="15" width="14" height="19" rx="3" fill="#F4C6AC"/>' +
      '<path d="M20 15 L20 10" stroke="#5B3A2A" stroke-width="2"/>' +
      '<path d="M20 4 C15 9 17 13 20 15 C23 13 25 9 20 4 Z" fill="#D7B36A"/>' +
      '<path d="M20 8 C18 10 19 12 20 13 C21 12 22 10 20 8 Z" fill="#FFF3D0"/>' +
      '<path d="M14 23 L26 23" stroke="#FFF9EF" stroke-width="2" opacity=".8"/>';
  } else if (type === 'coffee') {
    content = '<path d="M8 14 H29 V26 Q29 32 23 32 H14 Q8 32 8 26 Z" fill="#F4DFCB" stroke="#A9744F" stroke-width="1.5"/>' +
      '<path d="M29 18 Q35 18 35 23 Q35 28 29 28" fill="none" stroke="#A9744F" stroke-width="2"/>' +
      '<path d="M13 10 Q11 7 13 4 M19 10 Q17 7 19 4 M25 10 Q23 7 25 4" stroke="#C4A68A" stroke-width="1.5" fill="none" stroke-linecap="round"/>';
  } else if (type === 'tea') {
    content = '<path d="M8 16 H27 V26 Q27 33 20 33 H15 Q8 33 8 26 Z" fill="#C9D8B2" stroke="#7E9663" stroke-width="1.5"/>' +
      '<path d="M27 20 Q34 20 34 25 Q34 30 27 30" fill="none" stroke="#7E9663" stroke-width="2"/>' +
      '<path d="M15 12 Q20 6 25 12" fill="none" stroke="#8B8451" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M20 13 L20 6" stroke="#8B8451" stroke-width="1.5"/>' +
      '<ellipse cx="20" cy="5" rx="5" ry="2.5" fill="#8B8451" transform="rotate(-14 20 5)"/>';
  } else if (type === 'balloon') {
    content = '<path d="M20 5 C12 5 8 12 8 19 C8 27 14 31 20 34 C26 31 32 27 32 19 C32 12 28 5 20 5 Z" fill="#E8A6A0"/>' +
      '<path d="M20 34 Q18 38 21 39" stroke="#C56B78" stroke-width="1.5" fill="none"/>' +
      '<path d="M14 13 Q17 9 20 9" stroke="#FFF9EF" stroke-width="2" fill="none" opacity=".65" stroke-linecap="round"/>';
  } else {
    content = blossom(20, 20, 13, '#F2B0B1', '#D8B268', 0) +
      '<path d="M20 27 L20 37" stroke="#8FA574" stroke-width="2" stroke-linecap="round"/>' +
      '<ellipse cx="26" cy="32" rx="3" ry="6" fill="#8FA574" transform="rotate(32 26 32)"/>';
  }

  return open + content + close;
}

/* ---------- Герой-иллюстрация ---------- */
function artHero() {
  const id = 'hero' + (++artSeq);
  let flowers = '';
  const clusters = [
    [92, 64, 27, '#F4C6C0', '#D8B268', -12],
    [144, 34, 22, '#FFF2E7', '#D8B268', 8],
    [188, 86, 20, '#F2B0B1', '#D8B268', 20],
    [52, 120, 19, '#FFF2E7', '#D8B268', -8],
    [252, 42, 24, '#F5C1D0', '#D8B268', 12],
    [306, 98, 18, '#F4C6C0', '#D8B268', -14],
    [1080, 54, 25, '#F4C6C0', '#D8B268', -10],
    [1144, 104, 20, '#FFF2E7', '#D8B268', 14],
    [1012, 118, 18, '#F5C1D0', '#D8B268', 20],
    [868, 42, 20, '#F2B0B1', '#D8B268', -16]
  ];
  clusters.forEach(function (item) {
    flowers += blossom(item[0], item[1], item[2], item[3], item[4], item[5]);
  });

  let petals = '';
  const floating = [[180, 180, 9, -22], [268, 154, 7, 18], [344, 202, 6, -12], [780, 162, 8, 24], [910, 212, 7, -18], [1160, 180, 8, 15], [72, 245, 7, 20]];
  floating.forEach(function (p) {
    petals += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + (p[2] * 0.55) + '" fill="#FFF2E7" opacity=".65" transform="rotate(' + p[3] + ' ' + p[0] + ' ' + p[1] + ')"/>';
  });

  const svg =
    '<svg class="hero-svg" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
    '<defs>' +
      '<linearGradient id="' + id + 'bg" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#FFF0E5"/>' +
        '<stop offset=".42" stop-color="#F8D7CE"/>' +
        '<stop offset="1" stop-color="#E9AEB8"/>' +
      '</linearGradient>' +
      '<radialGradient id="' + id + 'glow" cx="76%" cy="28%" r="48%">' +
        '<stop offset="0" stop-color="#FFF9F2" stop-opacity=".8"/>' +
        '<stop offset="1" stop-color="#FFF9F2" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<linearGradient id="' + id + 'box" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#5E1A11"/>' +
        '<stop offset="1" stop-color="#3B0C07"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<rect width="1200" height="560" fill="url(#' + id + 'bg)"/>' +
    '<circle cx="890" cy="120" r="300" fill="url(#' + id + 'glow)"/>' +
    '<circle cx="1110" cy="480" r="250" fill="#F4C6AC" opacity=".42"/>' +
    '<circle cx="780" cy="510" r="190" fill="#FFF2E7" opacity=".24"/>' +
    '<path d="M-40 98 C 100 128 170 76 300 150 C 380 194 420 184 500 210" fill="none" stroke="#7A4A3A" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M1240 38 C 1110 62 1050 40 960 108" fill="none" stroke="#7A4A3A" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M-20 32 C 78 58 118 44 178 80" fill="none" stroke="#8A5B45" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M1198 16 C 1110 50 1064 38 1018 76" fill="none" stroke="#8A5B45" stroke-width="3" stroke-linecap="round"/>' +
    flowers +
    leaf(72, 112, 12, 30, -24, '#8FA574', 0.9) +
    leaf(132, 70, 10, 26, 28, '#8FA574', 0.8) +
    leaf(978, 92, 11, 27, 18, '#8FA574', 0.85) +
    leaf(1108, 74, 9, 24, -22, '#8FA574', 0.75) +
    petals +
    '<g transform="translate(928 390)">' +
      '<ellipse cx="0" cy="126" rx="150" ry="14" fill="#7A2A1E" opacity=".18"/>' +
      '<rect x="-116" y="8" width="232" height="118" rx="14" fill="url(#' + id + 'box)"/>' +
      '<rect x="-130" y="-34" width="260" height="46" rx="12" fill="#F4C6AC"/>' +
      '<rect x="-15" y="-34" width="30" height="160" fill="#D7B36A" opacity=".92"/>' +
      '<g transform="translate(0 -34)">' +
        '<path d="M-8 0 C-44 -25 -70 6 -32 24 C-15 32 -8 13 -8 0 Z" fill="#D7B36A"/>' +
        '<path d="M8 0 C44 -25 70 6 32 24 C15 32 8 13 8 0 Z" fill="#D7B36A"/>' +
        '<circle r="10" fill="#D7B36A"/>' +
        '<path d="M-6 10 L-20 42 M6 10 L20 42" stroke="#D7B36A" stroke-width="7" stroke-linecap="round"/>' +
      '</g>' +
      '<path d="M-78 42 L78 42" stroke="#FFF2E7" stroke-width="2" opacity=".16"/>' +
      '<rect x="-94" y="58" width="58" height="30" rx="6" fill="#FFF9EF" opacity=".92"/>' +
      '<path d="M-82 70 L-52 70 M-82 79 L-62 79" stroke="#8B8451" stroke-width="2" stroke-linecap="round"/>' +
    '</g>' +
    '<g transform="translate(786 418) scale(.68)">' +
      '<rect x="-102" y="-12" width="204" height="104" rx="12" fill="#E8C9B4"/>' +
      '<rect x="-112" y="-46" width="224" height="38" rx="10" fill="#FFF3E6"/>' +
      '<rect x="-12" y="-46" width="24" height="138" fill="#C56B78" opacity=".9"/>' +
      '<g transform="translate(0 -46)">' +
        '<path d="M-6 0 C-34 -18 -52 5 -24 18 C-11 24 -6 9 -6 0 Z" fill="#C56B78"/>' +
        '<path d="M6 0 C34 -18 52 5 24 18 C11 24 6 9 6 0 Z" fill="#C56B78"/>' +
        '<circle r="8" fill="#C56B78"/>' +
      '</g>' +
    '</g>' +
    '<g transform="translate(1030 300)">' +
      blossom(0, 0, 30, '#F4C6C0', '#D8B268', 0) +
      leaf(-36, 20, 9, 24, -26, '#8FA574') +
      leaf(36, 26, 8, 22, 24, '#8FA574') +
    '</g>' +
    artSparkle(700, 100, 14, '#FFF9F2', 0.8) +
    artSparkle(1120, 260, 10, '#FFF9F2', 0.7) +
    artSparkle(840, 60, 8, '#FFF9F2', 0.65) +
    '</svg>';
  return svg;
}

/* ============================================================
   ШАПКА И ПОДВАЛ
   ============================================================ */
function sakuraLogo() {
  return '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    '<circle cx="32" cy="32" r="31" fill="#FFF7EC"/>' +
    '<g fill="#EFA9A2">' +
      '<ellipse cx="32" cy="18" rx="6.5" ry="10"/>' +
      '<ellipse cx="32" cy="18" rx="6.5" ry="10" transform="rotate(72 32 32)"/>' +
      '<ellipse cx="32" cy="18" rx="6.5" ry="10" transform="rotate(144 32 32)"/>' +
      '<ellipse cx="32" cy="18" rx="6.5" ry="10" transform="rotate(216 32 32)"/>' +
      '<ellipse cx="32" cy="18" rx="6.5" ry="10" transform="rotate(288 32 32)"/>' +
    '</g>' +
    '<circle cx="32" cy="32" r="5.2" fill="#4A100A"/>' +
    '<circle cx="32" cy="32" r="2" fill="#FFE1AF"/>' +
  '</svg>';
}

function isActivePage(page) {
  const current = currentPage();
  if (page === 'index.html') return current === 'index.html' || current === '';
  return current === page;
}

function renderHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const user = currentUser();
  const page = currentPage();
  const navItems = [
    { href: 'index.html', label: 'Главная' },
    { href: 'catalog.html', label: 'Каталог' },
    { href: 'constructor.html', label: 'Собери сам' },
    { href: 'packaging.html', label: 'Упаковка' },
    { href: 'contact.html', label: 'Контакты' }
  ];

  const navHtml = navItems.map(function (item) {
    return '<a href="' + item.href + '"' + (isActivePage(item.href) ? ' class="active"' : '') + '>' + item.label + '</a>';
  }).join('');

  const mobileAuthHtml = user ? '' :
    '<div class="mobile-auth">' +
      '<a href="login.html">Вход</a>' +
      '<a href="register.html">Регистрация</a>' +
    '</div>';

  let userHtml = '';
  if (user) {
    let roleLinks = '';
    if (user.role === 'admin') roleLinks += '<a href="admin.html">Админ-панель</a>';
    if (user.role === 'assembler') roleLinks += '<a href="assembler.html">Сборка заказов</a>';
    if (user.role === 'courier') roleLinks += '<a href="courier.html">Доставка</a>';
    const initial = escapeHtml((user.name || 'Г').trim().charAt(0).toUpperCase());
    userHtml = '<details class="user-menu">' +
      '<summary><span class="avatar">' + initial + '</span><span class="user-name">' + escapeHtml(user.name) + '</span></summary>' +
      '<div class="user-dropdown">' +
        '<a href="account.html">Личный кабинет</a>' +
        roleLinks +
        '<a href="#" data-logout>Выйти</a>' +
      '</div>' +
    '</details>';
  } else {
    userHtml = '<a class="login-link" href="login.html">Войти</a>' +
      '<a class="register-link" href="register.html">Регистрация</a>';
  }

  header.innerHTML = '<div class="header-inner">' +
    '<a href="index.html" class="logo">' +
      '<span class="logo-mark">' + sakuraLogo() + '</span>' +
      '<span class="logo-text"><strong>Мир подарков</strong><small>подарок для неё и для него</small></span>' +
    '</a>' +
    '<button class="menu-toggle" id="menuToggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="mainNav">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
    '<nav class="main-nav" id="mainNav">' + navHtml + mobileAuthHtml + '</nav>' +
    '<div class="header-actions">' +
      '<a class="search-link" href="catalog.html" aria-label="Перейти в каталог">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>' +
      '</a>' +
      '<a href="cart.html" class="cart-link">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
        '<span class="cart-label">Корзина</span><span class="count">0</span>' +
      '</a>' +
      userHtml +
    '</div>' +
  '</div>';

  const toggle = header.querySelector('#menuToggle');
  const nav = header.querySelector('#mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
      });
    });
  }

  const searchLink = header.querySelector('.search-link');
  if (searchLink && page === 'catalog.html') searchLink.setAttribute('href', '#catalogSearch');

  header.querySelectorAll('[data-logout]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      logout();
    });
  });

  updateCartCount();
}

function renderFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  footer.innerHTML =
    '<div class="container footer-grid">' +
      '<div class="footer-brand-col">' +
        '<a href="index.html" class="footer-logo">' + sakuraLogo() + '</a>' +
        '<a href="index.html" class="footer-brand">Мир подарков</a>' +
        '<p class="footer-tagline">подарок для неё и для него</p>' +
        '<div class="footer-socials"><a href="#">VK</a><a href="#">Telegram</a><a href="#">WhatsApp</a></div>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Магазин</h4>' +
        '<a href="catalog.html">Каталог</a>' +
        '<a href="packaging.html">Упаковка</a>' +
        '<a href="constructor.html">Собери сам</a>' +
        '<a href="contact.html">Обратная связь</a>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Покупателям</h4>' +
        '<a href="contact.html#delivery">Доставка и оплата</a>' +
        '<a href="login.html">Вход</a>' +
        '<a href="register.html">Регистрация</a>' +
        '<a href="account.html">Личный кабинет</a>' +
      '</div>' +
      '<div class="footer-col footer-contacts">' +
        '<h4>Контакты</h4>' +
        '<p>г. Элиста, ул. Ленина, 24</p>' +
        '<p><a href="tel:+79275551408">+7 (927) 555-14-08</a></p>' +
        '<p><a href="mailto:hello@mir-podarkov.ru">hello@mir-podarkov.ru</a></p>' +
        '<p class="footer-hours">Ежедневно с 9:00 до 21:00</p>' +
      '</div>' +
    '</div>' +
    '<div class="container footer-bottom">' +
      '<p>© ' + new Date().getFullYear() + ' Мир подарков</p>' +
      '<p>Сделано с любовью в Элисте</p>' +
    '</div>';
}

/* ============================================================
   КАРТОЧКИ
   ============================================================ */
function renderProductCard(product) {
  const badge = product.badge ? '<span class="product-badge badge-' + product.badge + '">' + badgeLabel(product.badge) + '</span>' : '';
  const media = product.img
    ? '<img class="product-photo" src="' + imageUrl(product.img) + '" alt="' + escapeHtml(product.name) + '" decoding="async">'
    : artProduct(product);
  return '<article class="product-card">' +
    '<div class="product-media">' + badge + media + '</div>' +
    '<div class="product-body">' +
      '<div class="product-head">' +
        '<h3 class="product-title">' + escapeHtml(product.name) + '</h3>' +
        '<span class="product-price">' + formatPrice(product.price) + '</span>' +
      '</div>' +
      '<p class="product-desc">' + escapeHtml(product.desc) + '</p>' +
      '<div class="product-meta"><span>' + escapeHtml(categoryName(product.cat)) + '</span><span>' + escapeHtml(product.color) + '</span></div>' +
      '<button class="btn btn-primary btn-block add-btn" type="button" data-add-product="' + product.id + '">В корзину</button>' +
    '</div>' +
  '</article>';
}

function renderCategoryCard(category, index) {
  const count = PRODUCTS.filter(function (product) { return product.cat === category.id; }).length;
  const media = category.img
    ? '<img class="category-photo" src="' + imageUrl(category.img) + '" alt="' + escapeHtml(category.name) + '" decoding="async">'
    : artByType(category.art, index % 4);
  return '<a href="catalog.html?cat=' + encodeURIComponent(category.id) + '" class="category-card">' +
    '<div class="category-media">' + media + '</div>' +
    '<div class="category-body">' +
      '<div><h3>' + escapeHtml(category.name) + '</h3><p>' + escapeHtml(category.desc) + '</p></div>' +
      '<span class="category-arrow" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '<small>' + count + ' ' + pluralRu(count, 'подарок', 'подарка', 'подарков') + '</small>' +
      '</span>' +
    '</div>' +
  '</a>';
}

function renderPackagingCard(item) {
  const isCustom = item.id === 'custom';
  const actionHref = isCustom ? 'contact.html' : 'constructor.html?box=' + encodeURIComponent(item.id);
  const actionLabel = isCustom ? 'Обсудить' : 'Собрать';
  const priceLabel = isCustom ? 'индивидуально' : 'от ' + formatPrice(item.price);

  return '<article class="packaging-card">' +
    '<div class="packaging-media">' + artPackagingCard(item) +
      '<span class="packaging-tag">' + escapeHtml(item.tag) + '</span>' +
    '</div>' +
    '<div class="packaging-body">' +
      '<h3>' + escapeHtml(item.name) + '</h3>' +
      '<p>' + escapeHtml(item.desc) + '</p>' +
      '<div class="packaging-foot"><span>' + priceLabel + '</span>' +
        '<a href="' + actionHref + '">' + actionLabel + '</a>' +
      '</div>' +
    '</div>' +
  '</article>';
}

/* ============================================================
   ДЕЙСТВИЯ
   ============================================================ */
function addProductToCart(productId) {
  const product = PRODUCTS.find(function (item) { return item.id === Number(productId); });
  if (!product) return;
  addToCart({
    type: 'product',
    name: product.name,
    price: product.price,
    qty: 1,
    img: product.img || '',
    art: product.art || '',
    variant: product.variant || 0,
    cat: product.cat
  });
}

document.addEventListener('click', function (event) {
  const addButton = event.target.closest('[data-add-product]');
  if (addButton) {
    if (!addButton.dataset.originalLabel) addButton.dataset.originalLabel = addButton.textContent;
    addProductToCart(addButton.dataset.addProduct);
    addButton.textContent = 'Добавлено';
    addButton.classList.add('is-added');
    setTimeout(function () {
      addButton.textContent = addButton.dataset.originalLabel;
      addButton.classList.remove('is-added');
    }, 1400);
  }

  const logoutLink = event.target.closest('[data-logout]');
  if (logoutLink) {
    event.preventDefault();
    logout();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  renderHeader();
  renderFooter();
});
