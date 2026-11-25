/* Escenas del video Lab 01 · Parte 1 (estudiante). Escenario 1920x1080.
   html(T, lang) devuelve el marcado inicial; frame(a) lo anima según el tiempo (a.u = fracción de la escena,
   a.c(k) = inicio de la oración k de la narración, a.ce(k) = su final). */
{
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const DATE = '25/11/2026', HOUR = '9:14';

/* ---------- piezas de Windows 11 ---------- */
const ICON = {
  start: '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="9.5" height="9.5" rx="1" fill="#3fa9f5"/><rect x="12.5" y="2" width="9.5" height="9.5" rx="1" fill="#3fa9f5"/><rect x="2" y="12.5" width="9.5" height="9.5" rx="1" fill="#3fa9f5"/><rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1" fill="#3fa9f5"/></svg>',
  search: '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#fff" stroke-width="2"/><path d="M15 15l6 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>',
  explorer: '<svg width="26" height="24" viewBox="0 0 26 24"><path d="M1 5a2 2 0 012-2h7l2 2.5h11a2 2 0 012 2V20a2 2 0 01-2 2H3a2 2 0 01-2-2z" fill="#f5b82e"/><path d="M1 9h24v11a2 2 0 01-2 2H3a2 2 0 01-2-2z" fill="#ffd863"/></svg>',
  edge: '<svg width="26" height="26" viewBox="0 0 26 26"><defs><linearGradient id="eg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#36c3f0"/><stop offset="1" stop-color="#0c59a4"/></linearGradient><linearGradient id="eg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ee08a"/><stop offset="1" stop-color="#1a9e55"/></linearGradient></defs><circle cx="13" cy="13" r="12" fill="url(#eg)"/><path d="M5 17c2 6 13 7 17 1-4 2-9 1-10-3 0-3 4-5 9-4-2-5-10-6-14-2 3-1 6 0 7 2-5 0-9 3-9 6z" fill="url(#eg2)"/></svg>',
  term: '<svg width="26" height="24" viewBox="0 0 26 24"><rect x="1" y="2" width="24" height="20" rx="3" fill="#2b2b2b" stroke="#6b6b6b"/><path d="M6 8l4 4-4 4" stroke="#fff" stroke-width="2" fill="none"/><path d="M12 16h7" stroke="#fff" stroke-width="2"/></svg>',
  word: '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="5" y="2" width="17" height="20" rx="2" fill="#41a5ee"/><rect x="2" y="6" width="12" height="12" rx="1.5" fill="#185abd"/><text x="8" y="15.5" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="Segoe UI">W</text></svg>',
  excel: '<svg width="24" height="24" viewBox="0 0 24 24"><rect x="5" y="2" width="17" height="20" rx="2" fill="#21a366"/><rect x="2" y="6" width="12" height="12" rx="1.5" fill="#107c41"/><text x="8" y="15.5" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="Segoe UI">X</text></svg>',
  note: '<svg width="22" height="24" viewBox="0 0 22 24"><rect x="2" y="2" width="18" height="20" rx="2" fill="#7fd0ff"/><path d="M6 8h10M6 12h10M6 16h7" stroke="#1d4e74" stroke-width="1.6"/></svg>',
  py: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c-5 0-5 2-5 4v2h5v1H5c-2 0-3 2-3 5s1 5 3 5h2v-3c0-2 2-4 4-4h5c2 0 3-1 3-3V6c0-2-2-4-7-4z" fill="#3a76ab"/><path d="M12 22c5 0 5-2 5-4v-2h-5v-1h7c2 0 3-2 3-5s-1-5-3-5h-2v3c0 2-2 4-4 4H8c-2 0-3 1-3 3v3c0 2 2 4 7 4z" fill="#ffd43b"/></svg>',
};
const task = (active = []) => `<div class="task">${['start', 'search', 'explorer', 'edge', 'term', 'word', 'excel'].map(k => `<div class="ti ${active.includes(k) ? 'act' : ''}" data-ti="${k}" style="position:relative">${ICON[k]}</div>`).join('')}
  <div class="clock">${HOUR}<br>${DATE}</div></div>`;
const desk = (active, inner = '') => `<div class="wall"></div>
  <div class="desk-ico" style="left:22px;top:20px"><div class="g" style="background:linear-gradient(#e8eef6,#b9c6d8)"></div>Papelera de reciclaje</div>
  ${inner}${task(active)}`;
const WIN = (id, x, y, w, h, title, icon, body, cls = '') => `<div class="win ${cls}" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:0;visibility:hidden">
  <div class="tb">${ICON[icon] || ''}<div class="tt">${title}</div><div class="wb">&#8212;</div><div class="wb">&#9744;</div><div class="wb">&#10005;</div></div><div class="body">${body}</div></div>`;
const TERM = (id, x, y, w, h, inner, title = 'Windows PowerShell') => `<div class="win dark" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:0;visibility:hidden">
  <div class="tabs"><div class="tab">${ICON.term.replace('width="26" height="24"', 'width="16" height="15"')} ${title} <span style="opacity:.6;margin-left:10px">✕</span></div><div style="color:#aaa;padding:0 10px 8px">+ ⌄</div><div style="flex:1"></div><div style="color:#ccc;display:flex;gap:28px;padding:0 14px 10px">— ☐ ✕</div></div>
  <div class="body" style="top:40px"><div class="term">${inner}</div></div></div>`;
const PS = '<span class="p">PS C:\\Users\\estudiante&gt; </span>';
const PSF = '<span class="g">(vol3) </span><span class="p">PS C:\\Forense&gt; </span>';
const cmd = (id, prompt = PS) => `<div>${prompt}<span class="c" id="${id}"></span><span class="caret"></span></div>`;
const out = (id, lines, extra = '') => `<div id="${id}" ${extra}>${lines.map(l => `<div>${l === '' ? '&nbsp;' : l}</div>`).join('')}</div>`;
const EXP = (id, x, y, w, h, path, rows, side = ['Inicio', 'Escritorio', 'Descargas', 'Documentos', 'Este equipo', 'Disco local (C:)']) => WIN(id, x, y, w, h, path.split('\\').pop() || path, 'explorer',
  `<div class="exp"><div class="addr">← → ↑ ⟳ <div class="path">${esc(path)}</div><div class="path" style="flex:0 0 220px;color:#888">Buscar</div></div>
  <div class="side">${side.map(s => `<div>${s}</div>`).join('')}</div>
  <div class="main"><div class="hdr"><div>Nombre</div><div>Fecha de modificación</div><div>Tipo</div><div style="text-align:right">Tamaño</div></div>
  ${rows.map((r, k) => `<div class="it" id="${id}-r${k}"><div>${r[3] === 'd' ? '<i class="fold"></i>' : '<i class="filei"></i>'}${esc(r[0])}</div><div>${r[1]}</div><div>${r[2]}</div><div style="text-align:right">${r[4] || ''}</div></div>`).join('')}</div></div>`);
const EDGE = (id, x, y, w, h, url, page, tab = 'Nueva pestaña') => WIN(id, x, y, w, h, tab, 'edge',
  `<div class="edge"><div class="bar1">← → ⟳ <div class="url">🔒 ${esc(url)}</div>⋯</div><div class="page">${page}</div></div>`);
const NOTE = (id, x, y, w, h, title, text) => WIN(id, x, y, w, h, title + ' - Bloc de notas', 'note', `<div class="note-w"><div style="height:34px;display:flex;gap:22px;align-items:center;padding:0 16px;font-size:14px;color:#333;border-bottom:1px solid #eee">Archivo Editar Ver</div><div class="nb" style="height:calc(100% - 34px)">${text}</div></div>`);
const tag = (id, x, y, txt, c = '') => `<div class="tag ${c}" id="${id}" style="left:${x}px;top:${y}px;opacity:0;visibility:hidden">${txt}</div>`;
const box = (id, x, y, w, h) => `<div class="hl-box" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:0;visibility:hidden"></div>`;
const answer = (id, k, v, T) => `<div class="card2 ans" id="${id}" style="opacity:0;visibility:hidden"><div class="k">✔ ${k}</div><div class="v">${v}</div></div>`;
const bgCyber = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 70% 30%,#0f2a4a 0%,#06101f 55%,#03070f 100%)"></div>
  <svg style="position:absolute;inset:0" width="1920" height="1080"><defs><pattern id="gr" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="rgba(34,211,238,.07)" stroke-width="1"/></pattern></defs><rect width="1920" height="1080" fill="url(#gr)"/></svg>`;
const chapterCard = (n, title, sub) => `<div class="card2 chcard" id="chc" style="opacity:0;visibility:hidden"><div class="n">${n}</div><div class="ttl" style="font-size:58px;margin:10px 0 12px">${title}</div><div style="font-size:24px;color:#9fb3d6">${sub}</div></div>`;
// muestra una tarjeta de capítulo al inicio de la escena (primeros ~2.2 s) sobre el escritorio
const chapIntro = a => { a.show('#chc', 0, a.S(2.4), 'pop'); a.show('#chdim', 0, a.S(2.4)); };
const CH = (T, n, es, en, ses, sen) => `<div class="dim" id="chdim" style="opacity:0;visibility:hidden;z-index:20"></div><div style="position:absolute;inset:0;z-index:21;pointer-events:none">${chapterCard(n, T(es, en), T(ses, sen))}</div>`;


/* ---------- datos reales de la Parte 2 ---------- */
const H1 = '95359a64438173afe4e7853c6349e7643179532d99938fd24a772d1889b9e46d', H2 = '2b64d735d027ac632b3965f142485bebe7d8d6ee7d3c713df52673ce85e471c2';
const diffHash = (a, b) => [...b].map((c, i) => c === a[i] ? c : `<span style="color:#f87171">${c}</span>`).join('');
const EV1 = { md5: 'E4FFC0C59584D6FB30A537283BC4246A', sha1: 'F2FF287BADB7C974BFB78BCC0A3E372C21B42E6B', sha256: '0654752FC6628B0FA1333316B8531F440D7090E74337F429397A7F492D394736' };
const EV2 = { sha256: '2B62243A8593068052EEF3E2C42EABB6378E7E63C4866F1F27C15736C818F331' };
const IMGW = (id, x, y, w, src, extra = '') => `<img id="${id}" src="img/${src}.jpg" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;border-radius:8px;box-shadow:0 18px 50px rgba(0,0,0,.45);opacity:0;visibility:hidden;${extra}">`;
const PHOTO = `<div id="pres" class="card2" style="left:1240px;top:200px;width:520px;padding:26px;opacity:0;visibility:hidden;text-align:center">
  <div style="width:300px;height:300px;margin:0 auto 18px;border-radius:50%;overflow:hidden;border:3px solid #22d3ee;box-shadow:0 0 40px rgba(34,211,238,.45);background:radial-gradient(circle at 50% 35%,#2b4a75,#0b1b33)">
   <img src="img/foto.jpg" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'"></div>
  <div style="font:700 30px Chakra;color:#fff">Ing. Guillermo Otálora Luna</div>
  <div style="font:500 19px Plex;color:#9fb3d6;margin-top:6px">Digital Forensics · 203028123<br>Maestría en Ciberseguridad · UNAD</div></div>`;
const S = [];

/* 01-02 y 28 · Introducción animada (motion graphics, sin foto) */
const gid = s => document.getElementById(s);
const rnd = (i, s) => { const r = Math.sin((i + 1) * 12.9898 + s * 78.233) * 43758.5453; return r - Math.floor(r); };
const DEC = (txt, v, seed) => { const cs = '01ABCDEF#$%&*+=/'; let o = ''; const n = txt.length; for (let i = 0; i < n; i++) { const ch = txt[i]; if (ch === ' ' || v * (n + 8) > i + 8) { o += ch; continue; } o += v <= 0 ? '&nbsp;' : `<span style="color:#22d3ee">${cs[Math.floor(rnd(i, seed) * cs.length)]}</span>`; } return o; };
const HEXR = (n, seed) => { let o = ''; for (let i = 0; i < n; i++) o += '0123456789ABCDEF'[Math.floor(rnd(i, seed) * 16)]; return o; };
const NP = 46;
const IBG = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 38%,#0d2a4d 0%,#06101f 55%,#02050c 100%)"></div>
 <div id="igrid" style="position:absolute;left:-600px;right:-600px;top:600px;height:900px;transform:perspective(700px) rotateX(64deg);transform-origin:50% 0;background-image:linear-gradient(rgba(34,211,238,.30) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(34,211,238,.30) 1.5px,transparent 1.5px);background-size:90px 90px;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 25%,#000 55%,transparent 90%);mask-image:linear-gradient(to bottom,transparent 0,#000 25%,#000 55%,transparent 90%)"></div>
 <div style="position:absolute;left:0;right:0;top:590px;height:3px;background:linear-gradient(90deg,transparent,#22d3ee,transparent);box-shadow:0 0 30px #22d3ee;opacity:.6"></div>
 ${Array.from({ length: NP }, (_, i) => `<div id="ip${i}" style="position:absolute;left:${Math.round(rnd(i, 3) * 1920)}px;top:0;width:${2 + Math.round(rnd(i, 5) * 3)}px;height:${2 + Math.round(rnd(i, 5) * 3)}px;border-radius:50%;background:${i % 5 ? '#22d3ee' : '#a78bfa'};box-shadow:0 0 8px currentColor;color:#22d3ee"></div>`).join('')}
 <div id="iscan" style="position:absolute;left:0;right:0;height:140px;background:linear-gradient(to bottom,transparent,rgba(34,211,238,.06),transparent)"></div>
 <div style="position:absolute;left:40px;top:34px;width:60px;height:60px;border-left:3px solid #22d3ee;border-top:3px solid #22d3ee;opacity:.7"></div>
 <div style="position:absolute;right:40px;top:34px;width:60px;height:60px;border-right:3px solid #22d3ee;border-top:3px solid #22d3ee;opacity:.7"></div>
 <div style="position:absolute;left:40px;bottom:34px;width:60px;height:60px;border-left:3px solid #22d3ee;border-bottom:3px solid #22d3ee;opacity:.7"></div>
 <div style="position:absolute;right:40px;bottom:34px;width:60px;height:60px;border-right:3px solid #22d3ee;border-bottom:3px solid #22d3ee;opacity:.7"></div>`;
const HUD = T => `<div style="position:absolute;left:120px;top:52px;font:600 20px JB;letter-spacing:4px;color:#67e8f9">LAB 01 · ${T('PARTE 2 · DOCENTE', 'PART 2 · INSTRUCTOR')}</div>
 <div style="position:absolute;right:120px;top:50px;font:600 20px JB;letter-spacing:3px;color:#e6eefc;display:flex;gap:12px;align-items:center"><span id="irec" style="width:14px;height:14px;border-radius:50%;background:#ef4444;box-shadow:0 0 14px #ef4444"></span>FORENSIC · <span id="itc">00:00</span></div>`;
const ibg = (a, t0) => {
  a.set('#igrid', 'backgroundPosition', `0 ${(a.p * 45) % 90}px`);
  for (let i = 0; i < NP; i++) { const sp = 30 + rnd(i, 7) * 70, y = (rnd(i, 9) * 1100 - a.p * sp) % 1100; a.set('#ip' + i, 'transform', `translateY(${(y < 0 ? y + 1100 : y).toFixed(1)}px)`); a.set('#ip' + i, 'opacity', (0.25 + 0.6 * Math.abs(Math.sin(a.p * (0.6 + rnd(i, 2)) + i))).toFixed(2)); }
  a.set('#iscan', 'top', `${((a.p * 180) % 1300) - 140}px`);
  a.set('#irec', 'opacity', Math.sin(a.p * 5) > 0 ? '1' : '.25');
  const t = Math.floor(t0 + a.p); const e = gid('itc'); if (e) e.textContent = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};
/* iconos vectoriales */
const IC = {
  pc: '<svg viewBox="0 0 100 100" width="110" height="110" fill="none" stroke="#22d3ee" stroke-width="4" stroke-linejoin="round"><rect x="12" y="16" width="76" height="50" rx="5"/><path d="M40 66v12M60 66v12M28 82h44"/><path d="M24 30h30M24 40h44M24 50h22" stroke="#67e8f9" stroke-width="3" opacity=".7"/></svg>',
  ram: '<svg viewBox="0 0 100 100" width="118" height="118" fill="none" stroke="#22d3ee" stroke-width="4"><rect x="8" y="30" width="84" height="34" rx="3"/><rect x="16" y="37" width="14" height="18" fill="#22d3ee" fill-opacity=".25"/><rect x="36" y="37" width="14" height="18" fill="#22d3ee" fill-opacity=".25"/><rect x="56" y="37" width="14" height="18" fill="#22d3ee" fill-opacity=".25"/><rect x="76" y="37" width="10" height="18" fill="#22d3ee" fill-opacity=".25"/><path d="M14 64v8M22 64v8M30 64v8M38 64v8M46 64v8M62 64v8M70 64v8M78 64v8M86 64v8" stroke="#fbbf24" stroke-width="3"/></svg>',
  seal: '<svg viewBox="0 0 100 100" width="110" height="110" fill="none" stroke="#22d3ee" stroke-width="4" stroke-linejoin="round"><path d="M50 8l34 12v26c0 22-15 38-34 46C31 84 16 68 16 46V20z"/><path d="M38 38l-4 26M56 38l-4 26M30 46h30M28 56h30" stroke="#67e8f9" stroke-width="3.5"/></svg>',
  chain: '<svg viewBox="0 0 100 100" width="110" height="110" fill="none" stroke="#22d3ee" stroke-width="5"><rect x="8" y="34" width="46" height="30" rx="15" transform="rotate(-30 31 49)"/><rect x="46" y="36" width="46" height="30" rx="15" transform="rotate(-30 69 51)"/></svg>',
  user: c => `<svg viewBox="0 0 100 100" width="150" height="150" fill="none" stroke="${c}" stroke-width="4"><circle cx="50" cy="34" r="16"/><path d="M18 88c2-20 15-30 32-30s30 10 32 30"/></svg>`,
  power: '<svg viewBox="0 0 100 100" width="260" height="260" fill="none" stroke="#f87171" stroke-width="7" stroke-linecap="round"><path d="M50 14v34"/><path d="M30 26a32 32 0 1 0 40 0"/></svg>',
  file: '<svg viewBox="0 0 100 100" width="120" height="120" fill="none" stroke="#22d3ee" stroke-width="4" stroke-linejoin="round"><path d="M22 8h40l18 18v66H22z"/><path d="M62 8v18h18"/><text x="51" y="70" fill="#67e8f9" stroke="none" font-family="JetBrains Mono,monospace" font-size="17" text-anchor="middle" font-weight="700">.MEM</text></svg>'
};
const NODE = (id, x, y, icon, l1, l2) => `<div id="${id}" style="position:absolute;left:${x - 120}px;top:${y - 120}px;width:240px;text-align:center;opacity:0;visibility:hidden">
  <div class="nd" style="position:relative;width:200px;height:200px;margin:0 auto;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,rgba(34,211,238,.18),rgba(7,14,30,.95) 70%);border:2px solid #22d3ee;box-shadow:0 0 40px rgba(34,211,238,.45),inset 0 0 30px rgba(34,211,238,.25)">${icon}
   <div id="${id}r" style="position:absolute;inset:-14px;border-radius:50%;border:2px dashed rgba(34,211,238,.55)"></div></div>
  <div style="font:700 26px Chakra;color:#fff;margin-top:20px">${l1}</div><div style="font:500 19px Plex;color:#9fb3d6;margin-top:4px">${l2}</div></div>`;

/* Escena 1 · título + recapitulación + flujo */
const PX = [330, 750, 1170, 1590], PY = 560;
const INTRO1 = T => `${IBG}${HUD(T)}
 <div id="ta" style="position:absolute;left:0;right:0;top:330px;text-align:center;transform-origin:50% 0">
  <div style="font:600 26px JB;letter-spacing:10px;color:#67e8f9" id="tk">DIGITAL FORENSICS · UNAD</div>
  <div id="tt" style="font:700 132px/1 Chakra;color:#fff;letter-spacing:6px;margin-top:18px;text-shadow:0 0 40px rgba(34,211,238,.55)">&nbsp;</div>
  <div id="tl" style="height:4px;width:900px;margin:26px auto 0;background:linear-gradient(90deg,transparent,#22d3ee,#a78bfa,#22d3ee,transparent);box-shadow:0 0 24px #22d3ee;transform:scaleX(0)"></div>
  <div id="ts" style="font:600 40px Plex;color:#e6eefc;margin-top:26px;opacity:0">${T('Parte 2 · Docente — Adquisición forense de memoria RAM', 'Part 2 · Instructor — Forensic acquisition of RAM')}</div></div>
 <div id="p1" style="position:absolute;left:0;right:0;top:330px;height:520px;opacity:0;visibility:hidden">
  <div class="card2" style="left:300px;top:40px;width:620px;height:400px;padding:26px 30px;overflow:hidden">
   <div style="display:flex;gap:22px;align-items:center">${IC.file}<div><div style="font:700 30px Chakra;color:#fff">${T('Parte 1 · Estudiante', 'Part 1 · Student')}</div><div style="font:500 21px Plex;color:#9fb3d6;margin-top:6px">${T('Análisis de la imagen con Volatility 3', 'Image analysis with Volatility 3')}</div></div></div>
   <div id="hexd" style="font:500 19px/1.55 JB;color:#4b6a92;margin-top:18px;white-space:pre"></div>
   <div id="mag" style="position:absolute;left:40px;top:180px;width:130px;height:130px;border-radius:50%;border:5px solid #22d3ee;box-shadow:0 0 30px #22d3ee,inset 0 0 30px rgba(34,211,238,.35);background:rgba(34,211,238,.08)"><div style="position:absolute;right:-46px;bottom:-30px;width:60px;height:12px;background:#22d3ee;transform:rotate(45deg);border-radius:6px"></div></div></div>
  <svg style="position:absolute;left:930px;top:120px" width="300" height="240" viewBox="0 0 300 240"><path id="rarr" d="M20 200 C 100 40, 200 40, 280 140" fill="none" stroke="#a78bfa" stroke-width="6" stroke-dasharray="520" stroke-dashoffset="520" stroke-linecap="round"/><path id="rarh" d="M262 112 L282 142 L248 146" fill="none" stroke="#a78bfa" stroke-width="6" stroke-linecap="round" opacity="0"/></svg>
  <div id="q1" class="card2" style="left:1240px;top:90px;width:440px;padding:30px;opacity:0;visibility:hidden;border-color:#a78bfa;box-shadow:0 0 40px rgba(167,139,250,.35)"><div style="font:700 90px Chakra;color:#a78bfa;line-height:1">?</div><div style="font:700 34px/1.2 Chakra;color:#fff;margin-top:10px">${T('¿De dónde salió esta evidencia?', 'Where did this evidence come from?')}</div></div></div>
 <svg id="pipe" style="position:absolute;left:0;top:0;opacity:0" width="1920" height="1080"><path id="pl" d="M${PX[0]} ${PY - 20} L${PX[3]} ${PY - 20}" stroke="#22d3ee" stroke-width="4" stroke-dasharray="1260" stroke-dashoffset="1260" style="filter:drop-shadow(0 0 8px #22d3ee)"/></svg>
 ${[0, 1, 2].map(i => `<div id="pk${i}" style="position:absolute;top:${PY - 29}px;left:0;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 0 20px #22d3ee,0 0 40px #22d3ee;opacity:0"></div>`).join('')}
 ${NODE('n0', PX[0], PY, IC.pc, T('Preparar', 'Prepare'), T('el equipo y el escenario', 'the computer and scenario'))}
 ${NODE('n1', PX[1], PY, IC.ram, T('Capturar la RAM', 'Capture RAM'), 'FTK Imager · WinPmem')}
 ${NODE('n2', PX[2], PY, IC.seal, T('Sellar', 'Seal'), 'MD5 · SHA-1 · SHA-256')}
 ${NODE('n3', PX[3], PY, IC.chain, T('Custodiar', 'Custody'), T('cadena de custodia', 'chain of custody'))}
 <div id="ph" style="position:absolute;left:0;right:0;top:200px;text-align:center;font:700 54px Chakra;color:#fff;opacity:0;visibility:hidden">${T('Cómo se obtuvo la evidencia', 'How the evidence was obtained')}</div>`;
const HEXL = s => Array.from({ length: 6 }, (_, r) => `0x${(0x1A3F000 + r * 16 + (s % 50) * 96).toString(16).toUpperCase().padStart(8, '0')}  ${HEXR(8, s + r)} ${HEXR(8, s + r + 40)}  ${['msedge.exe', 'unad.edu.co', 'eltiempo.com', 'FTK Imager', 'svchost.exe', 'nescafe.com'][(r + s) % 6]}`).join('\n');
S.push({ html: INTRO1, frame: a => {
  ibg(a, 0); const c1 = a.c(1), c2 = a.c(2), e2 = a.ce(2), sp = e2 - c2;
  const dv = a.prog(.03, Math.max(.06, a.c(0) + .03)); const tt = gid('tt'); if (tt) tt.innerHTML = DEC(a.T('LABORATORIO 01', 'LAB 01'), dv, Math.floor(a.p * 18));
  a.set('#tl', 'transform', `scaleX(${a.ease(a.c(0), a.c(0) + .06).toFixed(3)})`); a.set('#ts', 'opacity', a.ease(a.c(0) + .03, a.c(0) + .08).toFixed(3));
  a.set('#tk', 'opacity', a.ease(0, .04).toFixed(3));
  const out = a.ease(c1 - .03, c1 + .01); a.set('#ta', 'opacity', (1 - out).toFixed(3)); a.set('#ta', 'transform', `scale(${(1 + .25 * out).toFixed(3)})`);
  a.show('#p1', c1, c2, 'up'); const hd = gid('hexd'); if (hd) hd.textContent = HEXL(Math.floor(a.p * 4));
  const mg = a.prog(c1, c2); a.set('#mag', 'transform', `translate(${(Math.sin(mg * 6.3) * 180 + 200).toFixed(0)}px,${(Math.cos(mg * 4) * 40).toFixed(0)}px)`);
  const ra = a.ease(c1 + (c2 - c1) * .35, c1 + (c2 - c1) * .7); a.set('#rarr', 'strokeDashoffset', (520 * (1 - ra)).toFixed(0)); a.set('#rarh', 'opacity', ra > .95 ? '1' : '0');
  a.show('#q1', c1 + (c2 - c1) * .6, c2, 'pop');
  a.show('#ph', c2, null, 'up');
  const ks = [.08, .4, .64, .82].map(f => c2 + sp * f);
  a.set('#pipe', 'opacity', u2(a, c2)); a.set('#pl', 'strokeDashoffset', (1260 * (1 - a.ease(ks[0], ks[3]))).toFixed(0));
  ks.forEach((k, i) => { a.show('#n' + i, k, null, 'pop'); a.set('#n' + i + 'r', 'transform', `rotate(${(a.p * 30 * (i % 2 ? -1 : 1)).toFixed(1)}deg)`); });
  for (let i = 0; i < 3; i++) { const f = ((a.p * .35 + i / 3) % 1); a.set('#pk' + i, 'left', `${(PX[0] + (PX[3] - PX[0]) * f - 9).toFixed(0)}px`); a.set('#pk' + i, 'opacity', a.u > ks[3] ? '1' : '0'); }
} });
function u2(a, k) { return a.ease(k, k + .03).toFixed(3); }

/* Escena 2 · para quién y meta */
const INTRO2 = T => `${IBG}${HUD(T)}
 <div id="who" style="position:absolute;inset:0">
  <div style="position:absolute;left:330px;top:330px;width:300px;text-align:center"><div style="width:240px;height:240px;margin:0 auto;border-radius:50%;display:grid;place-items:center;border:2px solid #22d3ee;box-shadow:0 0 40px rgba(34,211,238,.4);background:rgba(7,14,30,.9)">${IC.user('#22d3ee')}</div><div style="font:700 34px Chakra;color:#fff;margin-top:18px">${T('Docente', 'Instructor')}</div><div style="font:500 21px Plex;color:#9fb3d6">${T('prepara la evidencia', 'prepares the evidence')}</div></div>
  <div style="position:absolute;left:1290px;top:330px;width:300px;text-align:center"><div style="width:240px;height:240px;margin:0 auto;border-radius:50%;display:grid;place-items:center;border:2px solid #a78bfa;box-shadow:0 0 40px rgba(167,139,250,.4);background:rgba(7,14,30,.9)">${IC.user('#a78bfa')}</div><div style="font:700 34px Chakra;color:#fff;margin-top:18px">${T('Estudiante', 'Student')}</div><div style="font:500 21px Plex;color:#9fb3d6">${T('entiende el proceso completo', 'understands the whole process')}</div></div>
  <svg style="position:absolute;left:0;top:0" width="1920" height="1080"><path id="bm1" d="M630 450 L840 450" stroke="#22d3ee" stroke-width="4" stroke-dasharray="14 12"/><path id="bm2" d="M1080 450 L1290 450" stroke="#a78bfa" stroke-width="4" stroke-dasharray="14 12"/></svg>
  <div style="position:absolute;left:840px;top:330px;width:240px;height:240px">
   <div id="cr1" style="position:absolute;inset:0;border-radius:50%;border:3px solid transparent;border-top-color:#22d3ee;border-bottom-color:#a78bfa"></div>
   <div id="cr2" style="position:absolute;inset:26px;border-radius:50%;border:2px dashed rgba(103,232,249,.6)"></div>
   <div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;font:700 24px/1.2 Chakra;color:#fff">${T('Proceso<br>completo', 'Whole<br>process')}</div></div></div>
 <div id="goal" style="position:absolute;inset:0;opacity:0;visibility:hidden">
  <div style="position:absolute;left:360px;top:250px;width:520px;height:520px">
   <svg width="520" height="520" viewBox="0 0 520 520" style="position:absolute;inset:0;transform:rotate(-90deg)"><circle cx="260" cy="260" r="230" stroke="rgba(34,211,238,.15)" stroke-width="14" fill="none"/><circle id="gring" cx="260" cy="260" r="230" stroke="#22d3ee" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="1445" stroke-dashoffset="1445" style="filter:drop-shadow(0 0 12px #22d3ee)"/></svg>
   <div style="position:absolute;inset:0;display:grid;place-items:center"><svg viewBox="0 0 100 100" width="250" height="250" fill="rgba(34,211,238,.10)" stroke="#22d3ee" stroke-width="3.5" stroke-linejoin="round"><path d="M50 8l34 12v26c0 22-15 38-34 46C31 84 16 68 16 46V20z"/><path id="gchk" d="M33 50l12 12 22-24" fill="none" stroke="#4ade80" stroke-width="6" stroke-linecap="round" stroke-dasharray="70" stroke-dashoffset="70"/></svg></div></div>
  <div style="position:absolute;left:990px;top:270px;font:700 50px/1.15 Chakra;color:#fff;width:800px">${T('Adquirir la RAM de forma', 'Acquire RAM in a way that is')}</div>
  ${[[T('Documentada', 'Documented'), T('cada paso, con hora y responsable', 'every step, with time and owner')], [T('Verificable', 'Verifiable'), T('hashes MD5 · SHA-1 · SHA-256', 'MD5 · SHA-1 · SHA-256 hashes')], [T('Defendible', 'Defensible'), T('cadena de custodia completa', 'complete chain of custody')]].map((g, i) => `<div class="card2" id="gk${i}" style="left:990px;top:${400 + i * 130}px;width:720px;padding:20px 28px;display:flex;gap:22px;align-items:center;opacity:0;visibility:hidden"><div style="width:54px;height:54px;border-radius:50%;background:#4ade80;display:grid;place-items:center;font:800 32px Plex;color:#05210f;box-shadow:0 0 20px #4ade80">✓</div><div><div style="font:700 32px Chakra;color:#fff">${g[0]}</div><div style="font:500 21px Plex;color:#9fb3d6">${g[1]}</div></div></div>`).join('')}</div>`;
S.push({ html: INTRO2, frame: a => {
  ibg(a, 25); const c1 = a.c(1), e1 = a.ce(1);
  a.show('#who', 0, c1, 'fade'); a.set('#bm1', 'strokeDashoffset', `${(-a.p * 60).toFixed(0)}`); a.set('#bm2', 'strokeDashoffset', `${(a.p * 60).toFixed(0)}`);
  a.set('#cr1', 'transform', `rotate(${(a.p * 90).toFixed(1)}deg)`); a.set('#cr2', 'transform', `rotate(${(-a.p * 40).toFixed(1)}deg)`);
  a.show('#goal', c1, null, 'pop'); const g = a.ease(c1, e1); a.set('#gring', 'strokeDashoffset', (1445 * (1 - g)).toFixed(0));
  a.set('#gchk', 'strokeDashoffset', (70 * (1 - a.ease(e1 - .06, e1))).toFixed(0));
  [.2, .45, .7].forEach((f, i) => a.show('#gk' + i, c1 + (e1 - c1) * f, null, 'left'));
} });

/* Escena 28 · resumen del recorrido */
const VB = [['CPU · registros', 'CPU · registers', 'ns', 6], ['Caché', 'Cache', 'ns', 10], [T0 => T0('Memoria RAM', 'RAM'), null, '⏻', 46], ['Disco', 'Disk', T0 => T0('años', 'years'), 100]];
const INTRO3 = T => `${IBG}${HUD(T)}
 <div id="sg0" style="position:absolute;inset:0;opacity:0;visibility:hidden">
  <div style="position:absolute;left:0;right:0;top:140px;text-align:center;font:700 52px Chakra;color:#fff">${T('1 · La RAM primero', '1 · RAM first')}</div>
  <div style="position:absolute;left:170px;top:330px;width:700px;height:330px">
   <div style="position:absolute;left:0;top:40px;width:700px;height:200px;border-radius:10px;background:linear-gradient(#0f5132,#0b3d26);border:2px solid #22d3ee;box-shadow:0 0 50px rgba(34,211,238,.35)">
    ${Array.from({ length: 8 }, (_, i) => `<div style="position:absolute;left:${26 + i * 84}px;top:34px;width:66px;height:110px;border-radius:4px;background:#0b1220;border:1px solid #334155;overflow:hidden">${Array.from({ length: 12 }, (_, j) => `<div id="rb${i}_${j}" style="height:6px;margin:3px 6px;background:#22d3ee;border-radius:2px"></div>`).join('')}</div>`).join('')}
    <div style="position:absolute;left:0;right:0;bottom:-26px;height:26px;background:repeating-linear-gradient(90deg,#fbbf24 0 10px,transparent 10px 16px)"></div></div>
   ${Array.from({ length: 16 }, (_, i) => `<div id="rp${i}" style="position:absolute;left:${40 + (i * 43) % 640}px;top:40px;font:700 22px JB;color:#67e8f9">${i % 2}</div>`).join('')}
   <div style="position:absolute;left:0;top:290px;font:500 24px Plex;color:#9fb3d6;width:700px">${T('Procesos · conexiones · URLs · claves… se pierden al apagar', 'Processes · connections · URLs · keys… lost on shutdown')}</div></div>
  <div style="position:absolute;left:1000px;top:320px;width:760px">
   <div style="font:600 22px JB;color:#67e8f9;letter-spacing:3px;margin-bottom:18px">${T('ORDEN DE VOLATILIDAD · RFC 3227', 'ORDER OF VOLATILITY · RFC 3227')}</div>
   ${VB.map((v, i) => `<div id="vr${i}" style="display:grid;grid-template-columns:230px 1fr 90px;gap:16px;align-items:center;margin-bottom:22px;opacity:0"><span style="font:600 24px Plex;color:${i === 2 ? '#fff' : '#cbd5e1'}">${typeof v[0] === 'function' ? v[0](T) : T(v[0], v[1])}</span><div style="height:26px;border-radius:13px;background:rgba(148,163,184,.15);overflow:hidden"><div id="vb${i}" style="height:100%;width:0;border-radius:13px;background:${i === 2 ? 'linear-gradient(90deg,#22d3ee,#a78bfa)' : '#475569'};box-shadow:${i === 2 ? '0 0 20px #22d3ee' : 'none'}"></div></div><span style="font:600 20px JB;color:#9fb3d6">${typeof v[2] === 'function' ? v[2](T) : v[2]}</span></div>`).join('')}
   <div id="vtag" class="tag" style="position:relative;display:inline-block;opacity:0;font-size:22px">${T('1º RAM  →  2º disco', '1st RAM  →  2nd disk')}</div></div></div>
 <div id="sg1" style="position:absolute;inset:0;opacity:0;visibility:hidden">
  <div style="position:absolute;left:0;right:0;top:140px;text-align:center;font:700 52px Chakra;color:#fff">${T('2 · Capturar y sellar', '2 · Capture and seal')}</div>
  <div class="card2" id="tw0" style="left:150px;top:270px;width:780px;height:420px;overflow:hidden;opacity:0;visibility:hidden"><div style="height:46px;background:#e5e7eb;color:#111;font:600 19px Plex;display:flex;align-items:center;padding:0 18px;gap:10px">🗂 FTK Imager · Memory Progress</div>
   <div style="padding:26px 30px;background:#f8fafc;height:374px;color:#111;font:500 19px Plex"><div>Destination: D:\\Evidencias\\LAB01_FTK_GUILLE_20261122.mem</div><div style="margin-top:26px;height:30px;border:1px solid #94a3b8;background:#fff"><div id="fb" style="height:100%;width:0;background:linear-gradient(90deg,#16a34a,#22c55e)"></div></div>
    <div id="fst" style="margin-top:16px;color:#334155">Status: …</div><div style="margin-top:30px;font:600 17px JB;color:#475569">SHA-256</div><div id="fh" style="font:600 17px JB;color:#0f766e;word-break:break-all"></div></div></div>
  <div class="card2" id="tw1" style="left:990px;top:270px;width:780px;height:420px;overflow:hidden;opacity:0;visibility:hidden;background:#0c0c0c"><div style="height:46px;background:#1f2937;color:#e5e7eb;font:600 19px Plex;display:flex;align-items:center;padding:0 18px">⌨ ${T('Administrador: Símbolo del sistema', 'Administrator: Command Prompt')} · WinPmem</div>
   <div style="padding:22px 26px;font:500 18px/1.5 JB;color:#d1d5db;white-space:pre"><div>C:\\Herramientas\\winpmem&gt; winpmem_mini_x64_rc2.exe D:\\Evidencias\\…raw</div><div id="wpd" style="color:#4ade80"></div><div id="wst" style="color:#9ca3af"></div><div style="margin-top:18px;color:#6b7280">SHA-256</div><div id="wh" style="color:#67e8f9;white-space:normal;word-break:break-all"></div></div></div>
  ${[['🔒', T('Solo lectura', 'Read-only')], ['🕓', T('Hora registrada', 'Time recorded')], ['#', T('3 hashes por imagen', '3 hashes per image')]].map((b, i) => `<div class="card2" id="sb${i}" style="left:${330 + i * 450}px;top:760px;width:400px;padding:18px 24px;display:flex;gap:16px;align-items:center;opacity:0;visibility:hidden"><span style="font:700 34px JB;color:#22d3ee">${b[0]}</span><span style="font:600 26px Plex;color:#fff">${b[1]}</span></div>`).join('')}
  <div id="stamp" style="position:absolute;left:760px;top:360px;width:400px;padding:20px 0;text-align:center;border:6px solid #4ade80;border-radius:14px;color:#4ade80;font:800 50px Chakra;letter-spacing:4px;transform:rotate(-10deg);background:rgba(2,20,10,.75);box-shadow:0 0 40px rgba(74,222,128,.5);opacity:0;visibility:hidden">${T('SELLADO', 'SEALED')}</div></div>
 <div id="sg2" style="position:absolute;inset:0;opacity:0;visibility:hidden">
  <div style="position:absolute;left:0;right:0;top:140px;text-align:center;font:700 52px Chakra;color:#fff">${T('3 · Cadena de custodia', '3 · Chain of custody')}</div>
  <svg style="position:absolute;left:0;top:0" width="1920" height="1080"><path id="chl" d="M260 400 L1660 400" stroke="#22d3ee" stroke-width="5" stroke-dasharray="1400" stroke-dashoffset="1400" style="filter:drop-shadow(0 0 8px #22d3ee)"/></svg>
  ${[[T('Adquisición', 'Acquisition'), '16:46'], [T('Sellado', 'Sealing'), 'SHA-256'], [T('Verificación', 'Verification'), T('antes de analizar', 'before analysis')], ['Google Drive', T('copia', 'copy')], [T('Entrega y firma', 'Hand-over & sign'), '✍']].map((n, i) => `<div id="cn${i}" style="position:absolute;left:${260 + i * 350 - 110}px;top:310px;width:220px;text-align:center;opacity:0;visibility:hidden"><div style="width:180px;height:180px;margin:0 auto;border-radius:50%;display:grid;place-items:center;background:rgba(7,14,30,.95);border:3px solid #22d3ee;box-shadow:0 0 30px rgba(34,211,238,.45)">${IC.chain.replace('width="110" height="110"', 'width="90" height="90"')}</div><div style="font:700 26px Chakra;color:#fff;margin-top:16px">${n[0]}</div><div style="font:500 20px Plex;color:#9fb3d6">${n[1]}</div></div>`).join('')}
  <div id="bal" style="position:absolute;left:610px;top:650px;width:700px;height:200px;opacity:0;visibility:hidden">
   <div style="position:absolute;left:340px;top:30px;width:20px;height:150px;background:#22d3ee;border-radius:6px"></div>
   <div id="beam" style="position:absolute;left:40px;top:30px;width:620px;height:10px;background:#22d3ee;border-radius:5px;transform-origin:50% 50%;box-shadow:0 0 16px #22d3ee">
    <div class="card2" style="left:-60px;top:20px;width:220px;padding:12px;text-align:center;font:700 24px Chakra">FTK Imager</div><div class="card2" style="right:-60px;top:20px;width:220px;padding:12px;text-align:center;font:700 24px Chakra">WinPmem</div></div>
   <div style="position:absolute;left:0;right:0;top:-40px;text-align:center;font:600 24px Plex;color:#67e8f9">${T('¿Qué herramienta conviene en cada caso?', 'Which tool fits each case?')}</div></div></div>
 <div id="sg3" style="position:absolute;inset:0;opacity:0;visibility:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,rgba(239,68,68,.28),transparent 60%)"></div>
  <div style="position:absolute;left:810px;top:220px;width:300px;height:300px;display:grid;place-items:center">
   <div id="pw1" style="position:absolute;inset:0;border-radius:50%;border:4px solid #ef4444"></div><div id="pw2" style="position:absolute;inset:0;border-radius:50%;border:4px solid #ef4444"></div>${IC.power}
   <div id="pslash" style="position:absolute;left:-30px;top:144px;width:360px;height:12px;background:#ef4444;border-radius:6px;transform:rotate(-40deg) scaleX(0);box-shadow:0 0 20px #ef4444"></div></div>
  <div style="position:absolute;left:0;right:0;top:600px;text-align:center"><div style="font:700 64px Chakra;color:#fff;text-shadow:0 0 30px rgba(239,68,68,.6)">${T('Nunca reiniciar ni apagar', 'Never restart or shut down')}</div><div style="font:500 30px Plex;color:#fca5a5;margin-top:14px">${T('el equipo sospechoso, en un caso real', 'the suspect computer, in a real case')}</div></div></div>
 <div id="sg4" style="position:absolute;inset:0;opacity:0;visibility:hidden;display:grid;place-items:center"><div id="go" style="font:700 140px Chakra;color:#fff;letter-spacing:8px;text-shadow:0 0 50px #22d3ee">&nbsp;</div></div>
 <div id="flash" style="position:absolute;inset:0;background:#e0faff;opacity:0;pointer-events:none"></div>`;
const SC28 = { html: INTRO3, frame: a => {
  ibg(a, 40); const c = [0, 1, 2, 3, 4].map(a.c), e = [0, 1, 2, 3, 4].map(a.ce);
  // seg 0
  a.show('#sg0', .01, c[1], 'up');
  for (let i = 0; i < 8; i++) for (let j = 0; j < 12; j++) a.set(`#rb${i}_${j}`, 'opacity', rnd(i * 12 + j, Math.floor(a.p * 7)) > .45 ? '1' : '.15');
  const dz = a.prog(c[0] + .02, c[1]); for (let i = 0; i < 16; i++) { const f = (dz * 1.6 + rnd(i, 1)) % 1; a.set('#rp' + i, 'transform', `translateY(${(-f * 140).toFixed(0)}px)`); a.set('#rp' + i, 'opacity', (dz > 0 ? (1 - f) * .9 : 0).toFixed(2)); }
  VB.forEach((v, i) => { const k = c[0] + (c[1] - c[0]) * (.15 + i * .14); a.set('#vr' + i, 'opacity', a.ease(k, k + .02).toFixed(3)); a.set('#vb' + i, 'width', `${(v[3] * a.ease(k, k + .04)).toFixed(1)}%`); });
  a.set('#vtag', 'opacity', a.ease(c[0] + (c[1] - c[0]) * .75, c[0] + (c[1] - c[0]) * .8).toFixed(3));
  // seg 1
  const s1 = c[1], l1 = c[2] - c[1]; a.show('#sg1', s1, c[2], 'up');
  a.show('#tw0', s1 + l1 * .02, null, 'pop'); a.show('#tw1', s1 + l1 * .2, null, 'pop');
  const fp = a.prog(s1 + l1 * .05, s1 + l1 * .45); a.set('#fb', 'width', `${(fp * 100).toFixed(1)}%`);
  const fs = gid('fst'); if (fs) fs.textContent = fp < 1 ? `Status: ${a.T('copiando', 'copying')} ${Math.round(fp * 10240)} / 10240 MB` : 'Memory capture finished successfully · 96 s';
  const wp = a.prog(s1 + l1 * .22, s1 + l1 * .55), wd = gid('wpd'); if (wd) { const n = Math.floor(wp * 54); let d = ''; for (let i = 0; i < n; i++) d += (i % 9 === 0 ? '\n' : '') + (rnd(i, 4) > .93 ? 'x' : '.'); wd.textContent = d.trimStart(); }
  const ws = gid('wst'); if (ws) ws.textContent = wp >= 1 ? a.T('Captura terminada · 118 s · driver descargado', 'Capture finished · 118 s · driver unloaded') : '';
  const hk = Math.floor(a.p * 14);
  const fh = gid('fh'); if (fh) fh.textContent = fp < 1 ? '' : (a.u < s1 + l1 * .58 ? HEXR(64, hk) : EV1.sha256);
  const wh = gid('wh'); if (wh) wh.textContent = wp < 1 ? '' : (a.u < s1 + l1 * .64 ? HEXR(64, hk + 9) : EV2.sha256);
  a.show('#stamp', s1 + l1 * .64, c[2] - .01, 'pop');
  [.72, .8, .88].forEach((f, i) => a.show('#sb' + i, s1 + l1 * f, null, 'up'));
  // seg 2
  const s2 = c[2], l2 = c[3] - c[2]; a.show('#sg2', s2, c[3], 'up');
  a.set('#chl', 'strokeDashoffset', (1400 * (1 - a.ease(s2 + l2 * .02, s2 + l2 * .47))).toFixed(0));
  for (let i = 0; i < 5; i++) a.show('#cn' + i, s2 + l2 * (.02 + i * .1), null, 'pop');
  a.show('#bal', s2 + l2 * .58, null, 'up'); a.set('#beam', 'transform', `rotate(${(Math.sin(a.p * 1.8) * 7).toFixed(2)}deg)`);
  // seg 3
  const s3 = c[3], l3 = c[4] - c[3]; a.show('#sg3', s3, c[4], 'pop');
  const pf = (a.p * .9) % 1; a.set('#pw1', 'transform', `scale(${(1 + pf * .6).toFixed(3)})`); a.set('#pw1', 'opacity', (1 - pf).toFixed(2));
  const pf2 = (a.p * .9 + .5) % 1; a.set('#pw2', 'transform', `scale(${(1 + pf2 * .6).toFixed(3)})`); a.set('#pw2', 'opacity', (1 - pf2).toFixed(2));
  a.set('#pslash', 'transform', `rotate(-40deg) scaleX(${a.ease(s3 + l3 * .25, s3 + l3 * .4).toFixed(3)})`);
  // seg 4
  a.show('#sg4', c[4], null, 'fade'); const go = gid('go'); if (go) go.innerHTML = DEC(a.T('COMENCEMOS', "LET'S BEGIN"), a.prog(c[4], e[4]), Math.floor(a.p * 18));
  a.set('#go', 'transform', `scale(${(1 + .15 * a.prog(c[4], 1)).toFixed(3)})`);
  const fl = a.prog(e[4] + .005, 1); a.set('#flash', 'opacity', (fl < .5 ? fl * .9 : (1 - fl) * .9).toFixed(3));
} };

/* 03 · Qué guarda la RAM */
const RAMI = [['🖥', 'Procesos', 'Processes'], ['🔌', 'Conexiones', 'Connections'], ['🌐', 'Páginas abiertas', 'Open pages'], ['🔑', 'Claves y contraseñas', 'Keys and passwords'], ['🦠', 'Malware sin archivo', 'Fileless malware']];
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:130px;font:700 54px Chakra;color:#fff">${T('Qué guarda la memoria RAM', 'What RAM holds')}</div>
  <div class="card2" style="left:150px;top:260px;width:1620px;height:420px"></div>
  ${RAMI.map((r, i) => `<div id="r${i}" style="position:absolute;left:${200 + i * 310}px;top:330px;width:270px;text-align:center;opacity:0"><div style="font-size:90px">${r[0]}</div><div style="font:600 28px Plex;color:#fff;margin-top:14px">${T(r[1], r[2])}</div></div>`).join('')}
  <div class="card2" id="off" style="left:450px;top:760px;width:1020px;padding:24px 32px;opacity:0;visibility:hidden;border-color:#f87171;text-align:center"><div style="font:700 34px Chakra;color:#f87171">⏻ ${T('Al apagar o reiniciar: todo desaparece', 'Shut down or restart: everything is gone')}</div></div>`,
  frame: a => { for (let i = 0; i < 5; i++) { const v = a.show('#r' + i, .08 + i * .1, null, 'up'); const gone = a.ease(a.c(1), a.c(1) + .08); if (a.u > a.c(1)) a.set('#r' + i, 'opacity', String(Math.max(.18, 1 - gone * .82))); } a.show('#off', a.c(1), null, 'pop'); } });

/* 04 · Orden de volatilidad */
const VOL = [['Registros y caché de la CPU', 'CPU registers and cache', 'ns', 100], ['Tabla de procesos, ARP, rutas', 'Process table, ARP, routes', 's', 88], ['Memoria RAM', 'RAM', T0 => T0('hasta apagar', 'until shutdown'), 74], ['Archivos temporales y paginación', 'Temp and paging files', 'min–h', 56], ['Disco duro', 'Hard disk', T0 => T0('años', 'years'), 38], ['Copias de seguridad', 'Backups', T0 => T0('años', 'years'), 22]];
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:110px;font:700 50px Chakra;color:#fff">${T('Orden de volatilidad · RFC 3227', 'Order of volatility · RFC 3227')}</div>
  <div style="position:absolute;left:150px;top:180px;font:500 24px Plex;color:#9fb3d6">${T('Se recolecta primero lo que se pierde más rápido', 'Collect first what is lost fastest')}</div>
  ${VOL.map((v, i) => `<div id="v${i}" style="position:absolute;left:150px;top:${260 + i * 115}px;width:1620px;height:92px;opacity:0"><div style="position:absolute;left:0;top:0;height:92px;width:${v[3]}%;border-radius:12px;background:linear-gradient(90deg,${i === 2 ? 'rgba(34,211,238,.55),rgba(34,211,238,.12)' : 'rgba(103,132,180,.35),rgba(103,132,180,.06)'});border:1px solid ${i === 2 ? '#22d3ee' : 'rgba(120,150,200,.35)'}"></div>
   <div style="position:absolute;left:28px;top:24px;font:600 32px Plex;color:#fff">${i + 1}. ${T(v[0], v[1])}${i === 2 ? ' ← ' + T('este laboratorio', 'this lab') : ''}</div><div style="position:absolute;right:30px;top:26px;font:600 28px JB;color:#67e8f9">${typeof v[2] === 'function' ? v[2](T) : v[2]}</div></div>`).join('')}`,
  frame: a => { for (let i = 0; i < 6; i++) a.show('#v' + i, a.c(1) + i * .05, null, 'left'); } });

/* 05 · Nunca reiniciar */
S.push({ html: T => `${bgCyber}
  <svg id="pw" style="position:absolute;left:190px;top:300px;opacity:0" width="420" height="420" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="#f87171" stroke-width="5"/><path d="M50 22v26" stroke="#f87171" stroke-width="7" stroke-linecap="round"/><path d="M33 33a24 24 0 1034 0" fill="none" stroke="#f87171" stroke-width="7" stroke-linecap="round"/><path d="M14 86L86 14" stroke="#f87171" stroke-width="6"/></svg>
  <div class="card2" id="w1" style="left:700px;top:240px;width:1060px;padding:34px 40px;opacity:0;visibility:hidden"><div style="font:600 24px Plex;color:#fbbf24">${T('En este laboratorio (didáctico)', 'In this lab (for teaching)')}</div><div style="font:500 30px Plex;color:#fff;margin-top:8px">${T('Se reinició para tener una RAM limpia y fácil de interpretar.', 'It was restarted to get a clean, easy-to-read RAM.')}</div></div>
  <div class="card2" id="w2" style="left:700px;top:500px;width:1060px;padding:34px 40px;opacity:0;visibility:hidden;border-color:#f87171"><div style="font:700 30px Chakra;color:#f87171">${T('En un caso real: NUNCA se reinicia ni se apaga', 'In a real case: NEVER restart or shut down')}</div><div style="font:500 26px Plex;color:#e6eefc;margin-top:10px">${T('Documentar la escena · anotar la hora · adquirir la RAM tal como está', 'Document the scene · record the time · acquire the RAM as it is')}</div></div>`,
  frame: a => { a.show('#pw', .03, null, 'pop'); a.show('#w1', a.c(1) - .02, null, 'up'); a.show('#w2', a.c(2) - .02, null, 'up'); } });

/* 06 · Hash: un segundo cambia todo */
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:120px;font:700 52px Chakra;color:#fff">${T('El hash: la huella digital del archivo', 'The hash: a file\'s fingerprint')}</div>
  <div class="card2" id="h1" style="left:150px;top:260px;width:1620px;padding:28px 34px;opacity:0"><div style="font:500 27px JB;color:#e6eefc">Evidencia EV-01: imagen de RAM adquirida el 22/11/2026 16:45:<b style="color:#34d399">06</b> -05:00</div><div style="font:600 26px JB;color:#67e8f9;margin-top:14px">SHA-256 ${H1}</div></div>
  <div class="card2" id="h2" style="left:150px;top:520px;width:1620px;padding:28px 34px;opacity:0"><div style="font:500 27px JB;color:#e6eefc">Evidencia EV-01: imagen de RAM adquirida el 22/11/2026 16:45:<b style="color:#f87171">07</b> -05:00</div><div style="font:600 26px JB;color:#67e8f9;margin-top:14px">SHA-256 ${diffHash(H1, H2)}</div></div>
  <div class="tag r" id="tg" style="left:150px;top:780px;font-size:26px;padding:10px 20px;opacity:0;visibility:hidden">${T('1 segundo distinto → casi todo el hash cambia', '1 second different → almost the whole hash changes')}</div>`,
  frame: a => { a.show('#h1', .05, null, 'up'); a.show('#h2', a.c(2) - .04, null, 'up'); a.show('#tg', a.c(2) + .1, null, 'up'); } });

/* 07 · Disco vs RAM */
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:110px;font:700 50px Chakra;color:#fff">${T('Dos capturas de RAM nunca dan el mismo hash', 'Two RAM captures never give the same hash')}</div>
  <div class="card2" id="dk" style="left:150px;top:230px;width:780px;height:500px;padding:34px;opacity:0"><div style="font:700 34px Chakra;color:#fff">💽 ${T('Disco apagado + bloqueador', 'Disk off + write blocker')}</div><div style="font:500 26px JB;color:#34d399;margin-top:40px">${T('imagen 1', 'image 1')}: 7c1e…a90f <span style="color:#9fb3d6;font-size:18px">(${T('ejemplo', 'example')})</span></div><div style="font:500 26px JB;color:#34d399;margin-top:14px">${T('imagen 2', 'image 2')}: 7c1e…a90f</div><div style="font:700 30px Plex;color:#34d399;margin-top:40px">= ${T('mismo hash', 'same hash')}</div></div>
  <div class="card2" id="rm" style="left:990px;top:230px;width:780px;height:500px;padding:34px;opacity:0"><div style="font:700 34px Chakra;color:#fff">🧠 ${T('RAM en un equipo encendido', 'RAM on a running computer')}</div><div style="font:500 26px JB;color:#fbbf24;margin-top:40px">EV-01: 0654752F…2D394736</div><div style="font:500 26px JB;color:#fbbf24;margin-top:14px">EV-02: 2B62243A…C818F331</div><div style="font:700 30px Plex;color:#fbbf24;margin-top:40px">≠ ${T('cambia mientras se copia', 'changes while being copied')}</div></div>
  <div class="card2" id="k" style="left:150px;top:780px;width:1620px;padding:24px 32px;opacity:0;visibility:hidden;border-color:#34d399"><div style="font:600 28px Plex;color:#fff">${T('En la RAM, el hash prueba que el <b style="color:#34d399">archivo no cambió desde que se adquirió</b>.', 'With RAM, the hash proves the <b style="color:#34d399">file has not changed since it was acquired</b>.')}</div></div>`,
  frame: a => { a.show('#dk', a.c(1) - .03, null, 'up'); a.show('#rm', a.c(2) - .03, null, 'up'); a.show('#k', a.c(4) - .02, null, 'up'); } });

/* 08 · Flujo */
const FL = [['📝', 'Documentar', 'Document'], ['📸', 'Adquirir', 'Acquire'], ['🔏', 'Sellar', 'Seal'], ['📦', 'Empaquetar', 'Package'], ['📋', 'Custodia', 'Custody'], ['🗄', 'Resguardar', 'Safeguard'], ['🔍', T0 => T0('Analizar copia', 'Analyze copy')]];
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:140px;font:700 52px Chakra;color:#fff">${T('Adquirir · sellar · empaquetar · resguardar', 'Acquire · seal · package · safeguard')}</div>
  ${FL.map((f, i) => `<div class="card2" id="f${i}" style="left:${100 + i * 250}px;top:420px;width:210px;height:230px;padding:24px 12px;text-align:center;opacity:0"><div style="font-size:64px">${f[0]}</div><div style="font:700 26px Chakra;color:#fff;margin-top:14px">${typeof f[1] === 'function' ? f[1](T) : T(f[1], f[2])}</div></div>${i < 6 ? `<div id="fa${i}" style="position:absolute;left:${314 + i * 250}px;top:500px;color:#22d3ee;font:700 40px Chakra;opacity:0">›</div>` : ''}`).join('')}
  <div class="tag" id="dot" style="left:120px;top:690px;opacity:0">●</div>`,
  frame: a => { const ks = [a.c(1), a.c(2), a.c(3), a.c(4), a.c(4) + .05, a.c(4) + .1, a.c(5)]; for (let i = 0; i < 7; i++) { a.show('#f' + i, ks[i] - .02, null, 'up'); if (i < 6) a.show('#fa' + i, ks[i + 1] - .03); const on = a.u >= ks[i] && (i === 6 || a.u < ks[i + 1]); a.set('#f' + i, 'borderColor', on ? '#22d3ee' : 'rgba(34,211,238,.25)'); a.set('#f' + i, 'boxShadow', on ? '0 0 46px rgba(34,211,238,.5)' : 'none'); } } });

/* 09 · Escenario: Edge con 5 pestañas */
S.push({ html: T => desk(['edge'], `${EDGE('w1', 40, 30, 1840, 990, 'www.unad.edu.co', '<img id="ed" src="img/paso-04-02-pestanas-abiertas.jpg" style="margin-top:-44px">', 'Universidad Nacional Abierta y a Distancia')}
  <div class="tag v" id="tb" style="left:330px;top:84px;font-size:22px;opacity:0;visibility:hidden">${T('5 pestañas del caso', '5 case tabs')}</div>
  <div class="tag g" id="tt" style="left:1500px;top:940px;font-size:22px;opacity:0;visibility:hidden">${T('arranque 16:30:22', 'boot 16:30:22')}</div>`),
  frame: a => { a.win('#w1', 0); a.show('#tt', .06, a.c(1), 'up'); a.show('#tb', a.c(1), null, 'up'); a.cam([[0, 960, 540, 1], [a.c(1), 600, 150, 1.8], [.97, 900, 300, 1.4]]); } });

/* 10 · Navegar las páginas */
S.push({ html: T => desk(['edge'], `${['paso-04-03-unad', 'paso-04-04-eltiempo', 'paso-04-06-nescafe-receta-moca'].map((f, i) => IMGW('p' + i, 160 + i * 90, 80 + i * 60, 1400, f)).join('')}
  <div class="card2" id="ck" style="left:1100px;top:760px;width:700px;padding:22px 30px;opacity:0;visibility:hidden"><div style="font:600 25px Plex;color:#fff">${T('Sabemos qué debe aparecer en la memoria → podemos verificar el análisis', 'We know what must appear in memory → we can verify the analysis')}</div></div>`),
  frame: a => { a.show('#p0', .02, null, 'pop'); a.show('#p1', .22, null, 'pop'); a.show('#p2', .42, null, 'pop'); a.show('#ck', a.c(1), null, 'up'); } });

/* 11 · Descargar FTK Imager */
S.push({ html: T => desk(['edge'], `${EDGE('w1', 40, 30, 1840, 990, 'www.exterro.com/ftk-product-downloads', '<img id="e1" src="img/paso-02b-01-exterro-descarga.jpg" style="margin-top:-44px"><img id="e2" src="img/paso-02b-02-exterro-formulario.jpg" style="position:absolute;left:0;top:-44px;width:100%;opacity:0">', 'FTK Product Downloads | Exterro')}
  <div class="dlbar" id="db" style="left:1480px;top:130px;opacity:0;visibility:hidden"><b>${T('Descargas', 'Downloads')}</b><div style="margin-top:8px">FTK Imager 8.3.0.27.zip</div><div class="pb"><i id="dbp" style="width:0"></i></div><div id="dbt" style="color:#666;font-size:12px;margin-top:4px"></div></div>`),
  frame: a => { a.win('#w1', 0); a.show('#e2', a.c(1) + .05); a.show('#db', a.c(2) - .02); const pr = a.prog(a.c(2), .95); a.set('#dbp', 'width', (pr * 100) + '%'); a.text('#dbt', Math.round(387 * pr) + ' MB / 387 MB'); a.cur([[0, 900, 600], [a.c(1), ...a.af('#e1', .5, .55), 1], [a.c(2) - .02, ...a.af('#e2', .5, .8), 1], [.97, 1200, 700]]); a.cam([[0, 960, 540, 1], [a.c(1) - .02, 900, 520, 1.3], [a.c(2) + .03, 900, 520, 1.3], [a.c(2) + .08, 960, 540, 1]]); } });

/* 12 · Extraer e instalar */
S.push({ html: T => desk(['explorer'], `${IMGW('x1', 120, 60, 1680, 'paso-02b-05-extraer-todo')}
  ${['paso-02b-08-bienvenida', 'paso-02b-09-carpeta-opciones', 'paso-02b-11-completado'].map((f, i) => IMGW('i' + i, 540, 170, 840, f)).join('')}
  <div class="hl-box" id="bx" style="opacity:0;visibility:hidden"></div>
  <div class="tag r" id="tg" style="opacity:0;visibility:hidden">${T('Exclusión del antivirus: si la deja marcada, documéntelo', 'Antivirus exclusion: if left checked, document it')}</div>`),
  frame: a => { const k1 = a.c(1), k3 = a.c(3); a.show('#x1', 0, k1 + .04, 'pop'); a.show('#i0', k1 + .04, k1 + .16, 'pop'); a.show('#i1', k1 + .16, null, 'pop'); a.show('#i2', k3 + .12, null, 'pop');
    const [bx, by] = a.af('#i1', .095, .775), [ex] = a.af('#i1', .85, .775); a.set('#bx', 'left', (bx - 10) + 'px'); a.set('#bx', 'top', (by - 26) + 'px'); a.set('#bx', 'width', (ex - bx + 20) + 'px'); a.set('#bx', 'height', '52px'); a.set('#tg', 'left', (bx) + 'px'); a.set('#tg', 'top', (by + 40) + 'px');
    a.show('#bx', a.c(2), k3 + .1); a.show('#tg', a.c(2) + .03, k3 + .1, 'up');
    a.cur([[0, 900, 700], [.05, ...a.af('#x1', .085, .285), 1], [.12, ...a.af('#x1', .27, .285)], [k1 - .02, ...a.af('#x1', .27, .285), 1], [k1 + .1, ...a.af('#i0', .77, .93), 1], [k1 + .15, ...a.af('#i0', .77, .93), 1], [k3, ...a.af('#i1', .77, .93), 1], [k3 + .2, ...a.af('#i2', .77, .93), 1], [.97, 1200, 800]]);
    a.cam([[0, 960, 540, 1], [a.c(2) - .02, 960, 540, 1], [a.c(2) + .03, 900, 640, 1.45], [k3 + .08, 900, 640, 1.45], [k3 + .12, 960, 540, 1]]); } });

/* 13 · FTK Imager: File → Capture Memory */
const FTKMENU = ['Create Disk Image...', 'Export Disk Image...', 'Add Evidence Item...', 'Add All Attached Devices', 'Image Mounting...', '—', 'Remove Evidence Item', 'Remove All Evidence Items', '—', 'Create Custom Content Image...', '—', 'Capture Memory...', 'Obtain Protected Files...', 'Detect EFS Encryption', '—', 'Exit'];
S.push({ html: T => desk(['term'], `<div class="win" id="w1" style="left:120px;top:50px;width:1680px;height:940px;opacity:0;visibility:hidden;background:#f0f0f0">
   <div class="tb" style="background:#fff">🗂 <div class="tt">AccessData FTK Imager 8.3.0.27 · ${T('Administrador', 'Administrator')}</div><div class="wb">—</div><div class="wb">☐</div><div class="wb">✕</div></div>
   <div class="body" style="font:14px Segoe UI,Plex;color:#111">
    <div style="height:30px;display:flex;gap:22px;align-items:center;padding:0 12px;background:#fafafa;border-bottom:1px solid #ddd"><span id="mf" style="padding:3px 8px">File</span><span>View</span><span>Mode</span><span>Help</span></div>
    <div style="height:38px;background:#f5f5f5;border-bottom:1px solid #ddd"></div>
    <div style="position:absolute;left:8px;top:80px;width:420px;bottom:300px;background:#fff;border:1px solid #ccc"><div style="background:#e8e8e8;padding:4px 8px;font-size:13px">Evidence Tree</div></div>
    <div style="position:absolute;left:436px;top:80px;right:8px;bottom:300px;background:#fff;border:1px solid #ccc"><div style="background:#e8e8e8;padding:4px 8px;font-size:13px">File List</div></div>
    <div style="position:absolute;left:8px;right:8px;bottom:8px;height:284px;background:#fff;border:1px solid #ccc"></div>
    <div id="menu" style="position:absolute;left:8px;top:30px;width:300px;background:#fff;border:1px solid #bbb;box-shadow:0 6px 18px rgba(0,0,0,.25);padding:4px 0;opacity:0;visibility:hidden">${FTKMENU.map((m, i) => m === '—' ? '<div style="height:1px;background:#ddd;margin:4px 0"></div>' : `<div id="mi${i}" style="padding:5px 26px">${m}</div>`).join('')}</div>
   </div></div>
  ${IMGW('dlg', 700, 230, 520, 'paso-05a-02-dialogo-capture-memory')}
  <div class="tag v" id="adm" style="left:820px;top:100px;opacity:0;visibility:hidden">${T('Ejecutar como administrador', 'Run as administrator')}</div>`),
  frame: a => { a.win('#w1', 0); a.show('#adm', .05, a.c(1), 'up'); a.show('#menu', a.c(1), a.c(1) + .2); a.set('#mi11', 'background', a.u > a.c(1) + .12 ? '#cce4f7' : ''); a.set('#mf', 'background', a.u > a.c(1) && a.u < a.c(1) + .2 ? '#cce4f7' : '');
    a.show('#dlg', a.c(1) + .21, null, 'pop'); a.cur([[0, 900, 600], [a.c(1) - .03, ...a.af('#mf', .5, .5), 1], [a.c(1) + .12, ...a.af('#mi11', .3, .5)], [a.c(1) + .18, ...a.af('#mi11', .3, .5), 1], [.97, 1000, 700]]);
    a.cam([[0, 960, 540, 1], [a.c(1) - .02, 500, 300, 1.7], [a.c(1) + .19, 500, 300, 1.7], [a.c(1) + .24, 960, 540, 1.1]]); } });

/* 14 · Ventana de captura */
S.push({ html: T => desk(['term'], `${IMGW('d1', 560, 120, 800, 'paso-05a-03-elegir-carpeta')}${IMGW('d2', 560, 120, 800, 'paso-05a-05-nombre-archivo')}
  <div class="tag g" id="t1" style="left:1380px;top:240px;opacity:0;visibility:hidden">${T('fuera de OneDrive', 'outside OneDrive')}</div>
  <div class="tag" id="t2" style="left:1380px;top:400px;opacity:0;visibility:hidden">LAB01 · FTK · GUILLE · 20261122</div>
  <div class="tag r" id="t3" style="left:1380px;top:560px;opacity:0;visibility:hidden">${T('sin pagefile y sin AD1 → RAW puro', 'no pagefile, no AD1 → pure RAW')}</div>`),
  frame: a => { a.show('#d1', 0, a.c(1)); a.show('#d2', a.c(1)); a.show('#t1', .08, null, 'up'); a.show('#t2', a.c(1) + .05, null, 'up'); a.show('#t3', a.c(2), null, 'up'); a.cur([[0, 1000, 700], [.06, ...a.af('#d1', .5, .95), 1], [a.c(1) + .03, ...a.af('#d2', .45, .4), 1], [a.c(2) + .04, ...a.af('#d2', .05, .53), 0], [a.c(2) + .1, ...a.af('#d2', .05, .73), 0], [.97, 1100, 800]]); } });

/* 15 · Progreso y finalización */
S.push({ html: T => desk(['term'], `${['paso-05a-06-progreso-13', 'paso-05a-07-progreso-57', 'paso-05a-08-captura-finalizada'].map((f, i) => IMGW('g' + i, 500, 260, 920, f)).join('')}
  <div class="card2" id="ok" style="left:610px;top:720px;width:700px;padding:22px 30px;text-align:center;opacity:0;visibility:hidden;border-color:#34d399"><div style="font:700 36px Chakra;color:#34d399">✔ 16:46:42 · 96 s</div><div style="font:500 22px Plex;color:#e6eefc">EV-01 · 10.737.418.240 bytes</div></div>`),
  frame: a => { a.show('#g0', 0, .3, 'pop'); a.show('#g1', .3, a.c(1)); a.show('#g2', a.c(1)); a.show('#ok', a.c(2), null, 'up'); a.cur([[0, 900, 600], [.05, ...a.af('#g0', .07, .05), 1], [.9, 1100, 800]]); } });

/* 16 · WinPmem: preparar */
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 50, 1780, 930, cmd('c1', '<span class="p">C:\\Windows\\system32&gt; </span>') + cmd('c2', '<span class="p">C:\\Herramientas\\winpmem&gt; </span>') + out('o2', ['SHA256 hash de winpmem_mini_x64_rc2.exe:', '<span class="gr">[hash SHA-256 de la herramienta, se registra en la cadena de custodia]</span>', 'CertUtil: -hashfile comando completado correctamente.', '']) + cmd('c3', '<span class="p">C:\\Herramientas\\winpmem&gt; </span>'), T('Administrador: Símbolo del sistema', 'Administrator: Command Prompt'))}
  <div class="tag v" id="t1" style="left:1250px;top:120px;opacity:0;visibility:hidden">${T('portable · código abierto · 527 KB', 'portable · open source · 527 KB')}</div>
  <div class="tag g" id="t2" style="left:1250px;top:250px;opacity:0;visibility:hidden">${T('hash de la herramienta', 'tool hash')}</div>`),
  frame: a => { a.win('#w1', 0); a.show('#t1', .04, null, 'up'); a.type('#c1', 'cd C:\\Herramientas\\winpmem', .06, .14); a.type('#c2', 'certutil -hashfile winpmem_mini_x64_rc2.exe SHA256', a.c(2), a.c(2) + .1); a.lines('#o2', a.c(2) + .12, a.c(2) + .14); a.show('#t2', a.c(2) + .14, null, 'up'); a.type('#c3', 'winpmem_mini_x64_rc2.exe D:\\Evidencias\\LAB01_WinPmem_GUILLE_20261122_164926.raw', a.c(2) + .2, .95); } });

/* 17 · WinPmem: salida real */
const WP = ['WinPmem64', 'Extracting driver to C:\\Users\\GUILL~1.GUI\\AppData\\Local\\Temp\\pme751D.tmp', 'Loaded Driver C:\\Users\\GUILL~1.GUI\\AppData\\Local\\Temp\\pme751D.tmp.', '<span id="st1">The system time is: 21:49:26</span>', 'Will generate a RAW image', ' 6 memory ranges:', 'Start 0x00001000 - Length 0x0009E000', 'Start 0x00100000 - Length 0x6FA45000', 'Start 0x6FB46000 - Length 0x00027000', 'Start 0x6FB6E000 - Length 0x001E7000', 'Start 0x71EFF000 - Length 0x00001000', 'Start 0x100000000 - Length 0x180000000', 'max_physical_memory_ 0x280000000', 'Acquitision mode PTE Remapping', '00% 0x00100000 ...<span class="r">xxxx</span>...........................................', '31% 0x0C8000000 ..........................................', '63% 0x190000000 ..........................................', '94% 0x25E000000 ..................................', '<span id="st2">The system time is: 21:51:24</span>', 'Driver Unloaded.'];
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 50, 1780, 930, '<div><span class="p">C:\\Herramientas\\winpmem&gt; </span><span class="c">winpmem_mini_x64_rc2.exe D:\\Evidencias\\LAB01_WinPmem_GUILLE_20261122_164926.raw</span></div>' + out('o1', WP), T('Administrador: Símbolo del sistema', 'Administrator: Command Prompt'))}
  <div class="tag" id="t1" style="opacity:0;visibility:hidden">21:49:26 UTC = 16:49:26</div><div class="tag r" id="t2" style="opacity:0;visibility:hidden">${T('x = páginas no legibles (normal)', 'x = unreadable pages (normal)')}</div><div class="tag g" id="t3" style="opacity:0;visibility:hidden">${T('16:51:24 · 118 s', '16:51:24 · 118 s')}</div>`),
  frame: a => { a.win('#w1', 0); a.lines('#o1', .03, a.c(2) + .15); a.pin('#t1', '#st1', { dx: 20 }); a.pin('#t2', '#o1 > div:nth-child(15)', { w: 900 }); a.pin('#t3', '#st2', { dx: 20 }); a.show('#t1', a.c(0) + .08, null, 'up'); a.show('#t2', a.c(1), null, 'up'); a.show('#t3', a.c(2) + .16, null, 'up'); a.cam([[0, 960, 540, 1], [a.c(1) - .02, 840, 520, 1.25], [.97, 840, 520, 1.25]]); } });

/* 18 · Sellar EV-01 */
const PSE = '<span class="p">PS D:\\com.gaol.unad\\laboratorio_01\\evidencias_laboratorio\\RAM&gt; </span>';
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 50, 1780, 930, cmd('c1', PSE) + out('o1', ['2026-11-22 16:49:24 -05:00']) + cmd('c2', PSE) + out('o2', ['Algorithm       Hash                                                                    Path', '---------       ----                                                                    ----', 'MD5             E4FFC0C59584D6FB30A537283BC4246A                                 D:\\…\\LAB01_FTK_GUILLE_20261122.mem']) + cmd('c3', PSE) + out('o3', ['Algorithm       Hash                                                                    Path', '---------       ----                                                                    ----', 'SHA1            F2FF287BADB7C974BFB78BCC0A3E372C21B42E6B                         D:\\…\\LAB01_FTK_GUILLE_20261122.mem']) + cmd('c4', PSE) + out('o4', ['Algorithm       Hash                                                                    Path', '---------       ----                                                                    ----', 'SHA256          0654752FC6628B0FA1333316B8531F440D7090E74337F429397A7F492D394736 D:\\…\\LAB01_FTK_GUILLE_20261122.mem']) + cmd('c5', PSE))}
  <div class="tag g" id="t1" style="opacity:0;visibility:hidden">${T('hora del sellado', 'sealing time')}</div>
  <div class="card2" id="ht" style="left:1100px;top:600px;width:680px;padding:22px 28px;opacity:0;visibility:hidden"><div style="font:600 24px JB;color:#fff">LAB01_FTK_GUILLE_20261122.mem.hashes.txt</div><div style="font:500 20px Plex;color:#9fb3d6;margin-top:6px">MD5 · SHA-1 · SHA-256 · ${T('fecha y hora', 'date and time')}</div></div>`),
  frame: a => { a.win('#w1', 0); a.type('#c1', 'Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"', .04, a.c(1) - .02); a.lines('#o1', a.c(1), a.c(1) + .01); a.pin('#t1', '#o1', { w: 420 }); a.show('#t1', a.c(1) + .01, null, 'up');
    const k = a.c(1) + .05; a.type('#c2', 'Get-FileHash .\\LAB01_FTK_GUILLE_20261122.mem -Algorithm MD5', k, k + .1); a.lines('#o2', k + .12, k + .13); a.type('#c3', 'Get-FileHash .\\LAB01_FTK_GUILLE_20261122.mem -Algorithm SHA1', k + .15, k + .24); a.lines('#o3', k + .26, k + .27); a.type('#c4', 'Get-FileHash .\\LAB01_FTK_GUILLE_20261122.mem -Algorithm SHA256', k + .29, k + .38); a.lines('#o4', k + .4, k + .41); a.show('#ht', a.c(2), null, 'pop'); } });

/* 19 · certutil, solo lectura, EV-01 vs EV-02 */
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 50, 1780, 560, cmd('c1', PSE) + out('o1', ['SHA256 hash de .\\LAB01_FTK_GUILLE_20261122.mem:', EV1.sha256.toLowerCase(), 'CertUtil: -hashfile comando completado correctamente.']) + cmd('c2', PSE))}
  <div class="tag g" id="ro" style="left:1300px;top:470px;opacity:0;visibility:hidden">🔒 ${T('solo lectura', 'read-only')}</div>
  <div class="card2" id="cmp" style="left:120px;top:660px;width:1680px;padding:24px 32px;opacity:0;visibility:hidden"><table style="width:100%;border-collapse:collapse;font:500 24px JB;color:#e6eefc"><tr style="color:#9fb3d6;font:600 20px Plex"><td>ID</td><td>${T('Herramienta', 'Tool')}</td><td>${T('Captura', 'Capture')}</td><td>SHA-256</td></tr><tr><td>EV-01</td><td>FTK Imager</td><td>16:45:06</td><td style="color:#22d3ee">0654752F…2D394736</td></tr><tr><td>EV-02</td><td>WinPmem</td><td>16:49:26</td><td style="color:#fbbf24">2B62243A…C818F331</td></tr></table><div class="tag r" id="df" style="position:relative;display:inline-block;margin-top:12px;opacity:0">≠ ${T('la RAM cambió en 3 minutos', 'RAM changed in 3 minutes')}</div></div>`),
  frame: a => { a.win('#w1', 0); a.type('#c1', 'certutil -hashfile .\\LAB01_FTK_GUILLE_20261122.mem SHA256', .03, .14); a.lines('#o1', .17, .18); a.type('#c2', 'Set-ItemProperty .\\LAB01_FTK_GUILLE_20261122.mem -Name IsReadOnly -Value $true', .2, a.c(1)); a.show('#ro', a.c(1), null, 'pop'); a.show('#cmp', a.c(1) + .04, null, 'up'); a.show('#df', a.c(2) + .05, null, 'up'); } });

/* 20 · ¿Por qué 10 GiB? */
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:130px;font:700 52px Chakra;color:#fff">${T('7,75 GB de RAM → imagen de 10 GiB', '7.75 GB of RAM → 10 GiB image')}</div>
  <div style="position:absolute;left:150px;top:200px;font:500 24px Plex;color:#9fb3d6">${T('Espacio de direcciones físicas: 0x0 → 0x280000000', 'Physical address space: 0x0 → 0x280000000')}</div>
  <div id="bar" style="position:absolute;left:150px;top:380px;width:1620px;height:120px;border-radius:12px;overflow:hidden;border:2px solid #22d3ee;opacity:0">
   <div style="position:absolute;left:0;width:17.4%;height:100%;background:#22d3ee"></div><div id="gap" style="position:absolute;left:17.4%;width:22.6%;height:100%;background:repeating-linear-gradient(45deg,#334155,#334155 10px,#1e293b 10px,#1e293b 20px)"></div><div style="position:absolute;left:40%;width:60%;height:100%;background:#22d3ee"></div></div>
  <div style="position:absolute;left:150px;top:515px;font:600 22px JB;color:#9fb3d6">0x0</div><div style="position:absolute;left:765px;top:515px;font:600 22px JB;color:#9fb3d6">4 GiB</div><div style="position:absolute;left:1650px;top:515px;font:600 22px JB;color:#9fb3d6">10 GiB</div>
  <div id="lg" style="position:absolute;left:150px;top:600px;display:flex;gap:50px;font:600 26px Plex;color:#e6eefc;opacity:0"><span><b style="color:#22d3ee">■</b> ${T('RAM real', 'Real RAM')}</span><span><b style="color:#64748b">■</b> ${T('huecos de dispositivos (MMIO) → ceros', 'device gaps (MMIO) → zeros')}</span></div>
  <div class="card2" id="vk" style="left:150px;top:720px;width:1620px;padding:24px 32px;opacity:0;visibility:hidden"><div style="font:600 27px Plex;color:#fff">${T('Cada posición del archivo = su dirección física. Así lo necesita Volatility3.', 'Every file position = its physical address. That is what Volatility3 needs.')}</div></div>`,
  frame: a => { a.show('#bar', a.c(1) - .02, null, 'up'); a.show('#lg', a.c(2) - .02, null, 'up'); a.show('#vk', a.c(3), null, 'up'); } });

/* 21 · Cadena de custodia: definición */
const CC = [['Entidad', 'UNAD · ECBTI · Maestría en Ciberseguridad · 203028123'], ['Responsable', 'Ing. Guillermo Otálora Luna'], ['Equipo de origen', 'ASUS VivoBook X415JA · GUILLE · Windows 11 · 7,75 GB'], ['Estado', 'Encendido · Edge con 5 pestañas · OneDrive en pausa'], ['Zona horaria', 'UTC−05:00 Bogotá · SystemTime 21:45:06 UTC = 16:45:06']];
S.push({ html: T => `${desk(['word'], WIN('w1', 260, 30, 1400, 980, 'Cadena-de-Custodia-LAB01-2026-001.docx - Word', 'word', `<div class="wd"><div class="pg" style="width:1000px"><h3>${T('Registro de cadena de custodia · Caso LAB01-2026-001', 'Chain of custody record · Case LAB01-2026-001')}</h3>${CC.map((c, i) => `<div class="sec" id="cc${i}" style="display:grid;grid-template-columns:220px 1fr;gap:16px"><b>${c[0]}</b><span>${c[1]}</span></div>`).join('')}</div></div>`))}
  <div class="tag v" id="nr" style="left:330px;top:900px;font-size:22px;opacity:0;visibility:hidden">${T('Manual de la Fiscalía General de la Nación · ISO/IEC 27037', 'Attorney General\'s Office manual · ISO/IEC 27037')}</div>
  <div class="card2" id="q4" style="left:1260px;top:120px;width:560px;padding:24px 28px;opacity:0;visibility:hidden"><div style="font:700 30px Chakra;color:#22d3ee">${T('¿Quién? ¿Cuándo? ¿Cómo? ¿Para qué?', 'Who? When? How? Why?')}</div></div>`,
  frame: a => { a.win('#w1', 0); a.show('#q4', .05, null, 'pop'); for (let i = 0; i < 5; i++) a.set('#cc' + i, 'opacity', a.u > .1 + i * .05 ? '1' : '0'); a.show('#nr', a.c(1), null, 'up'); } });

/* 22 · Eventos */
const EVT = [['16:45:06 → 16:46:42', 'Adquisición EV-01 (FTK Imager)', 'EV-01 acquisition (FTK Imager)'], ['16:49:24', 'Hashes EV-01 · solo lectura', 'EV-01 hashes · read-only'], ['16:49:26 → 16:51:24', 'Adquisición EV-02 (WinPmem)', 'EV-02 acquisition (WinPmem)'], ['16:53:04', 'Hashes EV-02 · solo lectura', 'EV-02 hashes · read-only'], ['17:00 · 17:57', 'Verificación SHA-256 antes de analizar', 'SHA-256 check before analysis'], ['22/11 noche', 'Copia a Google Drive (acceso restringido)', 'Copy to Google Drive (restricted)']];
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:100px;font:700 50px Chakra;color:#fff">${T('Registro de eventos · 22/11/2026 (UTC−5)', 'Event log · 22/11/2026 (UTC−5)')}</div>
  ${EVT.map((e, i) => `<div class="card2" id="e${i}" style="left:150px;top:${200 + i * 112}px;width:1620px;height:92px;display:grid;grid-template-columns:420px 1fr 140px;align-items:center;padding:0 30px;opacity:0"><div style="font:600 28px JB;color:#22d3ee">${e[0]}</div><div style="font:600 28px Plex;color:#fff">${T(e[1], e[2])}</div><div style="font:700 26px Plex;color:#34d399">✔</div></div>`).join('')}
  <div style="position:absolute;left:150px;top:900px;display:flex;gap:40px" id="sg"><div class="card2" style="position:relative;padding:18px 26px;font:600 24px Plex">✍ ${T('Entrega', 'Hands over')}</div><div class="card2" style="position:relative;padding:18px 26px;font:600 24px Plex">✍ ${T('Recibe', 'Receives')}</div></div>`,
  frame: a => { for (let i = 0; i < 6; i++) a.show('#e' + i, a.c(0) + .2 + i * .08, null, 'left'); a.show('#sg', a.c(1), null, 'up'); } });

/* 23 · Comparativa */
const CMP = [['Interfaz', 'Interface', 'Gráfica', 'Graphical', 'Consola', 'Console'], ['Licencia', 'License', 'Gratuita (Exterro)', 'Free (Exterro)', 'Código abierto', 'Open source'], ['Instalación', 'Install', 'Instalador 387 MB', '387 MB installer', 'Portable 527 KB', 'Portable 527 KB'], ['Tiempo', 'Time', '96 s', '96 s', '118 s', '118 s'], ['Tamaño', 'Size', '10.737.418.240 B', '10,737,418,240 B', '10.737.418.240 B', '10,737,418,240 B'], ['Automatización', 'Automation', 'Limitada', 'Limited', 'Total', 'Full'], ['Huella', 'Footprint', 'Mayor', 'Larger', 'Menor', 'Smaller']];
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:100px;font:700 50px Chakra;color:#fff">FTK Imager 8.3 vs WinPmem 2.0.1</div>
  <div class="card2" style="left:150px;top:200px;width:1620px;padding:10px 30px"><table style="width:100%;border-collapse:collapse;font:500 27px Plex;color:#e6eefc">
   <tr style="font:700 28px Chakra;color:#22d3ee"><td style="padding:14px 0"></td><td>FTK Imager</td><td>WinPmem</td></tr>
   ${CMP.map((r, i) => `<tr id="cr${i}" style="border-top:1px solid rgba(34,211,238,.18);opacity:0"><td style="padding:14px 0;color:#9fb3d6">${T(r[0], r[1])}</td><td>${T(r[2], r[3])}</td><td>${T(r[4], r[5])}</td></tr>`).join('')}</table></div>`,
  frame: a => { for (let i = 0; i < 7; i++) a.set('#cr' + i, 'opacity', String(a.ease(.04 + i * .07, .1 + i * .07))); } });

/* 24 · Recomendación */
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:130px;font:700 52px Chakra;color:#fff">${T('Recomendación', 'Recommendation')}</div>
  <div class="card2" id="r1" style="left:150px;top:270px;width:780px;height:360px;padding:34px;opacity:0"><div style="font:700 34px Chakra;color:#22d3ee">🎓 ${T('Para enseñar', 'For teaching')}</div><div style="font:500 28px/1.5 Plex;color:#e6eefc;margin-top:18px">${T('FTK Imager para entender el proceso.<br>WinPmem para practicar por consola.', 'FTK Imager to understand the process.<br>WinPmem to practice on the console.')}</div></div>
  <div class="card2" id="r2" style="left:990px;top:270px;width:780px;height:360px;padding:34px;opacity:0;border-color:#fbbf24"><div style="font:700 34px Chakra;color:#fbbf24">⚖ ${T('En un caso real', 'In a real case')}</div><div style="font:500 28px/1.5 Plex;color:#e6eefc;margin-top:18px">${T('Herramienta portable desde un medio externo.<br>Registrar versión, hash de la herramienta y hora.', 'Portable tool from external media.<br>Record version, tool hash and time.')}</div></div>`,
  frame: a => { a.show('#r1', .04, null, 'up'); a.show('#r2', a.c(1) - .02, null, 'up'); } });

/* 25 · Cierre */
S.push({ html: T => `${bgCyber}${PHOTO.replace('opacity:0;visibility:hidden', 'opacity:1').replace('left:1240px', 'left:1240px')}
  <div style="position:absolute;left:150px;top:300px;width:1000px"><div class="ttl" id="t1" style="opacity:0">${T('Adquirir · sellar · custodiar · <em>analizar</em>', 'Acquire · seal · custody · <em>analyze</em>')}</div>
  <div id="t2" style="opacity:0;font:500 30px Plex;color:#9fb3d6;margin-top:24px">${T('Gracias por acompañarnos. Nos vemos en el Laboratorio 02.', 'Thank you for joining us. See you in Lab 02.')}</div></div>`,
  frame: a => { a.show('#t1', .04, null, 'up'); a.show('#t2', a.c(1) - .02, null, 'up'); } });


/* 26 · Empaquetar (va después de la escena 08) */
const SC26 = { html: T => `${bgCyber}<div style="position:absolute;left:150px;top:120px;font:700 52px Chakra;color:#fff">${T('Empaquetar y resguardar', 'Package and safeguard')}</div>
  <div class="card2" id="m1" style="left:150px;top:280px;width:520px;padding:30px;opacity:0"><div style="font-size:60px">🧠</div><div style="font:600 24px JB;color:#fff;margin-top:10px">LAB01_FTK_…mem</div><div style="font:500 20px Plex;color:#9fb3d6">+ .hashes.txt</div></div>
  <div id="ar" style="position:absolute;left:700px;top:360px;font:700 70px Chakra;color:#22d3ee;opacity:0">→</div>
  <div class="card2" id="m2" style="left:820px;top:280px;width:520px;padding:30px;opacity:0"><div style="font-size:60px">📦</div><div style="font:600 24px JB;color:#fff;margin-top:10px">LAB01_RAM.7z</div><div style="font:500 20px Plex;color:#34d399">SHA-256 ${T('del paquete', 'of the package')}</div></div>
  <div class="card2" id="m3" style="left:150px;top:620px;width:780px;padding:28px;opacity:0;visibility:hidden"><div style="font:700 30px Chakra;color:#22d3ee">🔍 ${T('Copia de trabajo', 'Working copy')}</div><div style="font:500 24px Plex;color:#e6eefc;margin-top:8px">${T('aquí se analiza', 'analyze here')}</div></div>
  <div class="card2" id="m4" style="left:990px;top:620px;width:780px;padding:28px;opacity:0;visibility:hidden;border-color:#fbbf24"><div style="font:700 30px Chakra;color:#fbbf24">🔒 ${T('Original sellado', 'Sealed original')}</div><div style="font:500 24px Plex;color:#e6eefc;margin-top:8px">${T('no se toca', 'never touched')}</div></div>`,
  frame: a => { a.show('#m1', .03, null, 'up'); a.show('#ar', a.c(2) - .02); a.show('#m2', a.c(2), null, 'up'); a.show('#m3', a.c(3), null, 'up'); a.show('#m4', a.c(3) + .05, null, 'up'); } };

/* 27 · El archivo .hashes.txt (va después de la escena 19) */
const HTXT = ['# Evidencia: LAB01_FTK_GUILLE_20261122.mem', '# Herramienta: FTK Imager 8.3.0.27 (Capture Memory)', '# Equipo: GUILLE   Usuario: GUILLE\\guill', '# Tamano: 10737418240 bytes', '# Captura: 2026-11-22 16:45:06 -05:00  ->  2026-11-22 16:46:42 -05:00', '# Hash calculado: 2026-11-22 16:49:24 -05:00 (UTC 2026-11-22 21:49:24)', '# Zona horaria: (UTC-05:00) Bogotá, Lima, Quito, Rio Branco', 'MD5     E4FFC0C59584D6FB30A537283BC4246A', 'SHA1    F2FF287BADB7C974BFB78BCC0A3E372C21B42E6B', 'SHA256  0654752FC6628B0FA1333316B8531F440D7090E74337F429397A7F492D394736', '', '0654752fc6628b0fa1333316b8531f440d7090e74337f429397a7f492d394736  LAB01_FTK_GUILLE_20261122.mem'];
const SC27 = { html: T => desk(['note'], `${NOTE('w1', 140, 80, 1300, 700, 'LAB01_FTK_GUILLE_20261122.mem.hashes.txt', HTXT.map((l, i) => `<span id="hl${i}">${l}</span>`).join('\n'))}
  <div class="card2" id="ok" style="left:300px;top:820px;width:640px;padding:22px 28px;opacity:0;visibility:hidden;border-color:#34d399"><div style="font:700 28px Chakra;color:#34d399">✔ ${T('Coincide → analizar', 'Matches → analyze')}</div></div>
  <div class="card2" id="no" style="left:1000px;top:820px;width:640px;padding:22px 28px;opacity:0;visibility:hidden;border-color:#f87171"><div style="font:700 28px Chakra;color:#f87171">✖ ${T('No coincide → reportar', 'No match → report')}</div></div>`),
  frame: a => { a.win('#w1', 0); a.set('#w1 .nb', 'fontSize', '21px'); [0, 3, 5, 7, 8, 9].forEach((i, k) => a.cls('#hl' + i, 'hl', a.u > .08 + k * .07 && a.u < a.c(1))); a.show('#ok', a.c(2), null, 'up'); a.show('#no', a.c(2) + .12, null, 'up'); } };
S.splice(8, 0, SC26); S.splice(20, 0, SC27); S.splice(2, 0, SC28);
window.SCENES = S;
}
