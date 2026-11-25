/* Motor del video-tutorial: línea de tiempo dirigida por el audio, escenas animadas en HTML */
{
const D = window.VIDEO_DATA, SC = window.SCENES;
const $ = s => document.querySelector(s);
const st = { lang: 'es', voice: 'f', subs: 'es', playing: false, t: 0, scene: -1, prevP: 0, started: false };
try { const s = JSON.parse(localStorage.getItem('lab01v-' + (window.VKEY || '')) || '{}'); Object.assign(st, { lang: s.lang || 'es', voice: s.voice || 'f', subs: s.subs || s.lang || 'es' }); } catch (e) {}
const save = () => { try { localStorage.setItem('lab01v-' + (window.VKEY || ''), JSON.stringify({ lang: st.lang, voice: st.voice, subs: st.subs })); } catch (e) {} };

/* ---------- audio ---------- */
const AUD = {};
function aud(lang, voice) {
  const k = lang + '_' + voice;
  if (!AUD[k]) { const a = new Audio((window.VBASE || '') + 'audio/' + k + '.mp3'); a.preload = 'auto'; AUD[k] = a; a.addEventListener('ended', () => { pause(); st.t = total(); }); }
  return AUD[k];
}
let AC = null;
function ac() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return AC; }
let fxVol = 0.55;
function click() {
  const c = ac(); if (!c || !st.playing) return;
  const t = c.currentTime, o = c.createOscillator(), g = c.createGain(), n = c.createBufferSource();
  const b = c.createBuffer(1, c.sampleRate * 0.03, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6);
  n.buffer = b; const gn = c.createGain(); gn.gain.value = 0.5 * fxVol; n.connect(gn).connect(c.destination); n.start(t);
  o.type = 'triangle'; o.frequency.setValueAtTime(1800, t); o.frequency.exponentialRampToValueAtTime(600, t + 0.04);
  g.gain.setValueAtTime(0.18 * fxVol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.06); o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.07);
}
let lastTick = 0;
function tick() {
  const c = ac(); if (!c || !st.playing) return; const now = performance.now(); if (now - lastTick < 55) return; lastTick = now;
  const t = c.currentTime, n = c.createBufferSource(), b = c.createBuffer(1, c.sampleRate * 0.015, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
  const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400 + Math.random() * 900;
  const g = c.createGain(); g.gain.value = 0.22 * fxVol; n.buffer = b; n.connect(f).connect(g).connect(c.destination); n.start(t);
}
function whoosh() {
  const c = ac(); if (!c || !st.playing) return;
  const t = c.currentTime, n = c.createBufferSource(), len = 0.55, b = c.createBuffer(1, c.sampleRate * len, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) { const x = i / d.length; d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * x) * 0.6; }
  const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 0.8; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(3200, t + len);
  const g = c.createGain(); g.gain.value = 0.10 * fxVol; n.buffer = b; n.connect(f).connect(g).connect(c.destination); n.start(t);
}

/* ---------- tiempo ---------- */
const L = () => D.lang[st.lang];
const I0 = D.intro ? D.intro.dur : 0;
const total = () => I0 + L().total;
const inIntro = () => st.t < I0;
const IV = () => document.getElementById('introv');
function sceneAt(t) { t -= I0; const s = L().scenes; for (let i = s.length - 1; i >= 0; i--) if (t >= s[i].start) return i; return 0; }
const fmt = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

/* ---------- api de escena ---------- */
const easeIO = x => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
function mkApi(p, dur, prevP, cues) {
  const u = p / dur, S = s => s / dur;
  const q = sel => typeof sel === 'string' ? document.querySelector('#cam ' + sel) || document.querySelector('#stage ' + sel) : sel;
  const api = {
    u, p, dur, S, lang: st.lang,
    c: k => (cues[Math.min(k, cues.length - 1)] || [0])[0] / dur, ce: k => (cues[Math.min(k, cues.length - 1)] || [0, 0])[1] / dur, T: (es, en) => st.lang === 'es' ? es : en,
    prog: (a, b) => clamp((u - a) / Math.max(1e-6, b - a)),
    ease: (a, b) => easeIO(clamp((u - a) / Math.max(1e-6, b - a))),
    show(sel, a, b, how = 'fade') {
      const el = q(sel); if (!el) return 0;
      const fi = S(0.35); let v = clamp((u - a) / fi); if (b != null) v = Math.min(v, clamp((b - u) / fi));
      v = easeIO(v); el.style.opacity = v; el.style.visibility = v <= 0.001 ? 'hidden' : 'visible';
      if (how === 'pop') el.style.transform = `scale(${0.94 + 0.06 * v})`;
      else if (how === 'up') el.style.transform = `translateY(${(1 - v) * 24}px)`;
      else if (how === 'left') el.style.transform = `translateX(${(1 - v) * -40}px)`;
      return v;
    },
    win(sel, a, b) { return api.show(sel, a, b, 'pop'); },
    type(sel, text, a, b) {
      const el = q(sel); if (!el) return;
      const n = Math.round(text.length * clamp((u - a) / Math.max(1e-6, b - a)));
      const pn = Math.round(text.length * clamp((prevP / dur - a) / Math.max(1e-6, b - a)));
      if (n > pn && st.playing && n < text.length + 1) tick();
      el.textContent = text.slice(0, n);
      const c = el.nextElementSibling; if (c && c.classList.contains('caret')) c.style.visibility = (u >= a - S(1) && u <= b + S(0.8) && (Math.floor(p * 2) % 2 === 0 || u < b)) ? 'visible' : 'hidden';
    },
    lines(sel, a, b) {
      const el = q(sel); if (!el) return; const k = el.children.length; const n = Math.ceil(k * clamp((u - a) / Math.max(1e-6, b - a)));
      for (let i = 0; i < k; i++) el.children[i].style.display = i < n ? '' : 'none';
    },
    at(target, dx = 0, dy = 0) {
      const tg = q(target), cam = document.getElementById('cam'); if (!tg) return [960, 540];
      const cr = cam.getBoundingClientRect(), sc = cr.width / 1920, r = tg.getBoundingClientRect();
      return [(r.left - cr.left) / sc + Math.min(r.width / sc / 2, 60) + dx, (r.top - cr.top) / sc + r.height / sc / 2 + dy];
    },
    af(target, fx, fy) {
      const tg = q(target), cam = document.getElementById('cam'); if (!tg) return [960, 540];
      const cr = cam.getBoundingClientRect(), sc = cr.width / 1920, r = tg.getBoundingClientRect();
      return [(r.left - cr.left) / sc + r.width / sc * fx, (r.top - cr.top) / sc + r.height / sc * fy];
    },
    cur(keys) {
      keys = keys.map(k => typeof k[1] === 'string' ? (([x, y]) => [k[0], x, y, k[4]])(api.at(k[1], k[2], k[3])) : k);
      const el = document.getElementById('cursor'); el.style.display = 'block';
      let x = keys[0][1], y = keys[0][2];
      for (let i = 0; i < keys.length; i++) {
        const [ku, kx, ky, ck] = keys[i];
        if (u >= ku) { x = kx; y = ky; if (i + 1 < keys.length) { const [nu, nx, ny] = keys[i + 1]; const mv = Math.min(S(0.9), nu - ku); const e = easeIO(clamp((u - (nu - mv)) / mv)); x = kx + (nx - kx) * e; y = ky + (ny - ky) * e; } }
        if (ck && prevP / dur < ku && u >= ku) click();
        if (ck) { const r = document.getElementById('rip' + i); const v = clamp((u - ku) / S(0.5)); if (r) { r.style.display = (u >= ku && v < 1) ? 'block' : 'none'; r.style.left = kx + 'px'; r.style.top = ky + 'px'; r.style.transform = `scale(${0.4 + v})`; r.style.opacity = 1 - v; } }
      }
      el.style.transform = `translate(${x - 4}px,${y - 2}px)`;
    },
    cam(keys) {
      const c = document.getElementById('cam'); let s = 1, x = 960, y = 540;
      for (let i = 0; i < keys.length; i++) { const [ku, kx, ky, ks] = keys[i]; if (u >= ku) { x = kx; y = ky; s = ks; if (i + 1 < keys.length) { const [nu, nx, ny, ns] = keys[i + 1]; const mv = Math.min(S(1.2), nu - ku); const e = easeIO(clamp((u - (nu - mv)) / mv)); x += (nx - x) * e; y += (ny - y) * e; s += (ns - s) * e; } } }
      const tx = 960 - x * s, ty = 540 - y * s; c.style.transform = `translate(${Math.min(0, Math.max(1920 - 1920 * s, tx))}px,${Math.min(0, Math.max(1080 - 1080 * s, ty))}px) scale(${s})`;
    },
    pin(sel, target, o = {}) {
      const el = q(sel), tg = q(target), cam = document.getElementById('cam'); if (!el || !tg) return;
      const cr = cam.getBoundingClientRect(), sc = cr.width / 1920, r = tg.getBoundingClientRect(); if (!r.width) return;
      const x = (r.left - cr.left) / sc, y = (r.top - cr.top) / sc, w = r.width / sc, h = r.height / sc * (o.hmul || 1), pad = o.pad == null ? 6 : o.pad;
      if (o.box) { el.style.left = (x - pad) + 'px'; el.style.top = (y - pad) + 'px'; el.style.width = ((o.w || w) + 2 * pad) + 'px'; el.style.height = (h + 2 * pad) + 'px'; }
      else if (o.side === 'below') { el.style.left = (x + (o.dx || 0)) + 'px'; el.style.top = (y + h + pad + (o.dy || 0)) + 'px'; }
      else { el.style.left = (x + (o.w || w) + 14 + (o.dx || 0)) + 'px'; el.style.top = (y + h / 2 - 18 + (o.dy || 0)) + 'px'; }
    },
    set(sel, prop, val) { const el = q(sel); if (el) el.style[prop] = val; },
    cls(sel, c, on) { const el = q(sel); if (el) el.classList.toggle(c, !!on); },
    text(sel, t) { const el = q(sel); if (el && el.textContent !== t) el.textContent = t; },
  };
  return api;
}

/* ---------- render ---------- */
const stage = $('#stage');
function build(i) {
  const s = SC[i];
  let ripples = ''; for (let k = 0; k < 40; k++) ripples += `<div class="ripple" id="rip${k}" style="display:none"></div>`;
  stage.innerHTML = `<div id="cam">${s.html(st.lang === 'es' ? ((a, b) => a) : ((a, b) => b), st.lang)}${ripples}
   <svg class="cursor" id="cursor" viewBox="0 0 24 24" style="display:none"><path d="M3 2l15 9.5-6.6 1.3 3.9 7.6-2.9 1.4-3.9-7.7L3 19z" fill="#fff" stroke="#111" stroke-width="1.3" stroke-linejoin="round"/></svg></div>
   <div id="fadebk" style="position:absolute;inset:0;background:#000;pointer-events:none;z-index:60"></div>`;
  st.scene = i;
}
function render() {
  if (inIntro()) { renderIntro(); return; }
  IV() && (IV().style.display = 'none'); $('#narr').style.display = '';
  const t = st.t - I0, i = sceneAt(st.t), sc = L().scenes[i];
  if (i !== st.scene) { const changed = st.scene !== -1; build(i); if (changed && st.playing) whoosh(); }
  const p = t - sc.start, dur = sc.dur;
  const api = mkApi(p, dur, st.prevP > p ? -1 : st.prevP, sc.cues[st.voice]);
  try { SC[i].frame(api); } catch (e) { console.error('escena', i + 1, e); }
  const fb = document.getElementById('fadebk'); if (fb) fb.style.opacity = Math.max(clamp(1 - p / 0.45), clamp(1 - (dur - p) / 0.35)) * (i === 0 && p < .45 ? 1 : 0.85);
  st.prevP = p;
  // subtítulos
  const box = $('#subs'); let txt = '';
  if (st.subs !== 'off') {
    const cues = sc.cues[st.voice];
    if (st.subs === st.lang) { for (const [a, b, k] of cues) if (p >= a && p <= b + 0.25) txt = D.text[st.lang][i][k]; }
    else {
      const sent = D.text[st.subs][i], a0 = cues[0][0], b0 = cues[cues.length - 1][1], tl = sent.reduce((x, y) => x + y.length, 0);
      let acc = a0; for (const s of sent) { const d = (b0 - a0) * s.length / tl; if (p >= acc && p <= acc + d + 0.25) txt = s; acc += d; }
    }
  }
  if (box.dataset.t !== txt) { box.dataset.t = txt; box.innerHTML = txt ? '<span></span>' : ''; if (txt) box.firstChild.textContent = txt; }
  // barra
  bar(i);
  // indicador
  const bars = document.querySelectorAll('.narr .bars i'); const speaking = st.playing && sc.cues[st.voice].some(([a, b]) => p >= a && p <= b);
  bars.forEach((b, k) => b.style.height = speaking ? (25 + 75 * Math.abs(Math.sin(performance.now() / (90 + k * 23) + k))) + '%' : '22%');
}
function bar(i) {
  const tt = total(), t = st.t; $('#fill').style.width = (100 * t / tt) + '%'; $('#knob').style.left = (100 * t / tt) + '%';
  $('#time').textContent = fmt(t) + ' / ' + fmt(tt);
  document.querySelectorAll('.chap').forEach((c, k) => { const ch = CH()[k], nx = CH()[k + 1]; c.classList.toggle('now', st.t >= chT(ch) - .01 && (!nx || st.t < chT(nx) - .01)); });
}
function renderIntro() {
  const v = IV(); v.style.display = 'block'; $('#narr').style.display = 'none'; $('#subs').innerHTML = ''; $('#subs').dataset.t = '';
  if (!st.playing && Math.abs(v.currentTime - st.t) > 0.3) { try { v.currentTime = st.t; } catch (e) {} }
  if (st.scene !== -2) { stage.innerHTML = ''; st.scene = -2; }
  bar(-1);
}
function loop() {
  if (st.playing) {
    if (inIntro()) { const v = IV(); st.t = v.currentTime; if (v.ended || v.currentTime >= I0 - 0.05) { v.pause(); st.t = I0; const a = aud(st.lang, st.voice); a.currentTime = 0; a.play(); } }
    else { const a = aud(st.lang, st.voice); st.t = I0 + a.currentTime; }
  }
  render(); requestAnimationFrame(loop);
}

/* ---------- control ---------- */
function play() {
  if (st.t >= total() - 0.2) st.t = 0;
  ac() && AC.state === 'suspended' && AC.resume();
  let pr;
  if (inIntro()) { const v = IV(); if (Math.abs(v.currentTime - st.t) > 0.25) v.currentTime = st.t; v.volume = +$('#vol').value; pr = v.play(); }
  else { const a = aud(st.lang, st.voice); const lt = st.t - I0; if (Math.abs(a.currentTime - lt) > 0.25) a.currentTime = lt; pr = a.play(); }
  st.playing = true; ui();
  pr && pr.catch(() => { st.playing = false; ui(); });
  $('#big').classList.add('hide'); st.started = true;
}
function pause() { Object.values(AUD).forEach(a => a.pause()); IV() && IV().pause(); st.playing = false; ui(); }
function seek(t) {
  const was = st.playing; st.t = clamp(t, 0, total()); st.prevP = 1e9;
  if (inIntro()) { Object.values(AUD).forEach(a => a.pause()); const v = IV(); try { v.currentTime = st.t; } catch (e) {} if (was) v.play(); }
  else { IV() && IV().pause(); const a = aud(st.lang, st.voice); try { a.currentTime = st.t - I0; } catch (e) {} if (was && a.paused) a.play(); } if (!st.started) { $('#big').classList.add('hide'); st.started = true; } }
function switchTo(lang, voice) {
  const was = st.playing; pause();
  if (inIntro()) { st.lang = lang; st.voice = voice; save(); ui(); chapters(); if (was) play(); return; }
  const i = sceneAt(st.t), s0 = L().scenes[i], f = (st.t - I0 - s0.start) / s0.dur;
  st.lang = lang; st.voice = voice;
  const s1 = L().scenes[i]; st.t = I0 + s1.start + f * s1.dur; st.scene = -1; seek(st.t); save(); ui(); chapters();
  if (was) play();
}
function ui() {
  $('#pp').innerHTML = st.playing ? '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>';
  $('#pp').setAttribute('aria-label', st.playing ? 'Pausa' : 'Reproducir');
  document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === st.lang));
  document.querySelectorAll('[data-voice]').forEach(b => b.classList.toggle('on', b.dataset.voice === st.voice));
  document.querySelectorAll('[data-subs]').forEach(b => b.classList.toggle('on', b.dataset.subs === st.subs));
  $('#narr-t').textContent = (st.lang === 'es' ? 'Narración · ' : 'Narration · ') + (st.lang === 'es' ? (st.voice === 'f' ? 'voz femenina' : 'voz masculina') : (st.voice === 'f' ? 'female voice' : 'male voice'));
  const tr = window.UI_TEXT[st.lang]; document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = tr[e.dataset.i18n]);
  document.documentElement.lang = st.lang;
}
const CH = () => (D.intro ? [{ intro: 1, es: D.intro.es, en: D.intro.en }] : []).concat(D.chapters);
const chT = c => c.intro ? 0 : I0 + L().scenes[c.scene].start;
function chapters() {
  const ul = $('#chaps'); ul.innerHTML = '';
  CH().forEach((c, k) => {
    const li = document.createElement('li'), b = document.createElement('button'); b.className = 'chap';
    const t0 = chT(c); b.innerHTML = '<b></b><span></span>'; b.firstChild.textContent = fmt(t0); b.lastChild.textContent = (D.intro ? k : k + 1) + '. ' + c[st.lang];
    b.addEventListener('click', () => { seek(t0 + 0.01); if (!st.playing) play(); }); li.appendChild(b); ul.appendChild(li);
  });
  const sk = $('#ticks'); sk.innerHTML = ''; CH().forEach(c => { const d = document.createElement('i'); d.className = 'tick'; d.style.left = (100 * chT(c) / total()) + '%'; sk.appendChild(d); });
}
function fit() { const sc = $('#screen'), w = sc.clientWidth; stage.style.transform = `scale(${w / 1920})`; }
new ResizeObserver(fit).observe($('#screen'));

$('#pp').addEventListener('click', () => st.playing ? pause() : play());
$('#big button').addEventListener('click', e => { e.stopPropagation(); play(); });
$('#screen').addEventListener('click', () => st.playing ? pause() : play());
$('#back').addEventListener('click', () => seek(st.t - 10));
$('#fwd').addEventListener('click', () => seek(st.t + 10));
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => { const keepSubs = st.subs; switchTo(b.dataset.lang, st.voice); if (keepSubs !== 'off') st.subs = b.dataset.lang; save(); ui(); }));
document.querySelectorAll('[data-voice]').forEach(b => b.addEventListener('click', () => switchTo(st.lang, b.dataset.voice)));
document.querySelectorAll('[data-subs]').forEach(b => b.addEventListener('click', () => { st.subs = b.dataset.subs; save(); ui(); }));
$('#vol').addEventListener('input', e => { const v = +e.target.value; Object.values(AUD).forEach(a => a.volume = v); IV() && (IV().volume = v); fxVol = 0.55 * v; });
$('#fs').addEventListener('click', () => { const p = $('#player'); try { if (document.fullscreenElement) document.exitFullscreen(); else (p.requestFullscreen || p.webkitRequestFullscreen).call(p); } catch (e) {} });
$('#theme').addEventListener('click', () => { const r = document.documentElement, n = r.dataset.theme === 'light' ? 'dark' : 'light'; r.dataset.theme = n; try { localStorage.setItem('lab01v-theme', n); } catch (e) {} });
try { const th = localStorage.getItem('lab01v-theme'); if (th) document.documentElement.dataset.theme = th; } catch (e) {}
// barra de búsqueda
const sk = $('#seek'); let drag = false;
const posT = e => { const r = sk.getBoundingClientRect(); return clamp((e.clientX - r.left) / r.width) * total(); };
sk.addEventListener('pointerdown', e => { drag = true; sk.setPointerCapture(e.pointerId); seek(posT(e)); });
sk.addEventListener('pointermove', e => { const t = posT(e), tip = $('#tip'); tip.style.display = 'block'; tip.style.left = (100 * t / total()) + '%'; let ch = CH()[0]; CH().forEach(c => { if (chT(c) <= t) ch = c; }); tip.textContent = fmt(t) + ' · ' + ch[st.lang]; if (drag) seek(t); });
sk.addEventListener('pointerup', () => drag = false);
sk.addEventListener('pointerleave', () => $('#tip').style.display = 'none');
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === ' ' || e.key === 'k') { e.preventDefault(); st.playing ? pause() : play(); }
  else if (e.key === 'ArrowRight') seek(st.t + 5); else if (e.key === 'ArrowLeft') seek(st.t - 5);
  else if (e.key === 'f') $('#fs').click(); else if (e.key === 'c') { st.subs = st.subs === 'off' ? st.lang : 'off'; save(); ui(); }
});
window.__seek = t => { seek(t); render(); };
IV() && IV().addEventListener('ended', () => { if (st.playing) { st.t = I0; const a = aud(st.lang, st.voice); a.currentTime = 0; a.play(); } });          // para pruebas
window.__set = (l, v) => { switchTo(l, v); };
chapters(); ui(); fit(); render(); requestAnimationFrame(loop);
}
