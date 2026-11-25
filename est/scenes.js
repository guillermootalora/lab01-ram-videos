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

/* ---------- salidas reales ---------- */
const HASH = '0654752FC6628B0FA1333316B8531F440D7090E74337F429397A7F492D394736';
const VOLHDR = ['Volatility 3 Framework 2.28.2', '<span class="gr">Progress:  100.00\t\tPDB scanning finished</span>'];
const INFO = [['Variable', 'Value'], ['Kernel Base', '0xf807ee000000'], ['DTB', '0x1ae000'], ['Is64Bit', 'True'], ['IsPAE', 'False'], ['layer_name', '0 WindowsIntel32e'], ['memory_layer', '1 FileLayer'], ['KdVersionBlock', '0xf807eee0aa30'], ['Major/Minor', '15.26100'], ['MachineType', '34404'], ['KeNumberProcessors', '4'], ['SystemTime', '2026-11-22 21:45:06+00:00'], ['NtSystemRoot', 'C:\\WINDOWS'], ['NtProductType', 'NtProductWinNt'], ['NtMajorVersion', '10'], ['NtMinorVersion', '0']];
const infoLines = INFO.map(([k, v], i) => `<span id="inf${i}">${esc(k.padEnd(22))}${esc(v)}</span>`);
const PSL = ['PID\tPPID\tImageFileName\tOffset(V)\tThreads\tHandles\tSessionId\tWow64\tCreateTime', '4\t0\tSystem\t0x9b07d16c5040\t330\t-\tN/A\tFalse\t2026-11-22 21:30:24', '92\t4\tSecure System\t0x9b07d17d9040\t0\t-\tN/A\tFalse\t2026-11-22 21:30:22', '136\t4\tRegistry\t0x9b07d17f7040\t4\t-\tN/A\tFalse\t2026-11-22 21:30:22', '616\t4\tsmss.exe\t0x9b07d5fe9080\t2\t-\tN/A\tFalse\t2026-11-22 21:30:24', '908\t776\tcsrss.exe\t0x9b07def7d140\t11\t-\t0\tFalse\t2026-11-22 21:30:27', '1000\t776\twininit.exe\t0x9b07e4d3e140\t2\t-\t0\tFalse\t2026-11-22 21:30:27', '1016\t1000\tservices.exe\t0x9b07e4d40080\t8\t-\t0\tFalse\t2026-11-22 21:30:27', '1036\t1000\tlsass.exe\t0x9b07e4d4b080\t10\t-\t0\tFalse\t2026-11-22 21:30:27', '1180\t1016\tsvchost.exe\t0x9b07e4e2a080\t16\t-\t0\tFalse\t2026-11-22 21:30:28', '1408\t1016\tsvchost.exe\t0x9b07e4ee4080\t12\t-\t0\tFalse\t2026-11-22 21:30:28', '5948\t5844\texplorer.exe\t0x9b07e9df8080\t82\t-\t1\tFalse\t2026-11-22 21:30:33', '15148\t5948\tmsedge.exe\t0x9b07ed59e080\t64\t-\t1\tFalse\t2026-11-22 21:32:31', '…'];
const fmtRow = r => r.split('\t').map((c, i) => c.padEnd([7, 7, 16, 16, 8, 8, 10, 7, 20][i] || 8)).join('');
const EDGEROWS = ['15148\t5948\tmsedge.exe\t0x9b07ed59e080\t64\t-\t1\tFalse\t2026-11-22 21:32:31', '15288\t15148\tmsedge.exe\t0x9b07eeaa50c0\t8\t-\t1\tFalse\t2026-11-22 21:32:31', '15292\t15148\tmsedge.exe\t0x9b07ee925080\t20\t-\t1\tFalse\t2026-11-22 21:32:31', '8784\t15148\tmsedge.exe\t0x9b07ecfa3080\t24\t-\t1\tFalse\t2026-11-22 21:32:31', '13996\t15148\tmsedge.exe\t0x9b07eecce080\t12\t-\t1\tFalse\t2026-11-22 21:32:31', '16948\t15148\tmsedge.exe\t0x9b07f0505080\t19\t-\t1\tFalse\t2026-11-22 21:33:10', '3204\t15148\tmsedge.exe\t0x9b07eaa9b080\t18\t-\t1\tFalse\t2026-11-22 21:33:55', '18020\t15148\tmsedge.exe\t0x9b07f24ad140\t14\t-\t1\tFalse\t2026-11-22 21:34:10', '…  (38 procesos msedge.exe)'];
const FTKROWS = ['5948\t5844\texplorer.exe\t0x9b07e9df8080\t82\t-\t1\tFalse\t2026-11-22 21:30:33', '17712\t5948\tFTK Imager.exe\t0x9b07f571b080\t14\t-\t1\tFalse\t2026-11-22 21:41:13', '5812\t3280\tFTK Imager.exe\t0x9b07f72e6080\t22\t-\t1\tFalse\t2026-11-22 21:41:46'];
const NETROWS = [['Proto', 'LocalAddr', 'LocalPort', 'ForeignAddr', 'FPort', 'State', 'PID', 'Owner'], ['TCPv4', '0.0.0.0', '135', '0.0.0.0', '0', 'LISTENING', '1408', 'svchost.exe'], ['TCPv6', '::', '135', '::', '0', 'LISTENING', '1408', 'svchost.exe'], ['TCPv4', '192.168.56.1', '139', '0.0.0.0', '0', 'LISTENING', '4', 'System'], ['TCPv4', '192.168.1.10', '139', '0.0.0.0', '0', 'LISTENING', '4', 'System'], ['TCPv4', '0.0.0.0', '445', '0.0.0.0', '0', 'LISTENING', '4', 'System'], ['UDPv4', '0.0.0.0', '5353', '*', '0', '', '15148', 'msedge.exe'], ['UDPv4', '0.0.0.0', '5353', '*', '0', '', '15148', 'msedge.exe'], ['UDPv6', '::', '5353', '*', '0', '', '15148', 'msedge.exe'], ['UDPv4', '0.0.0.0', '5353', '*', '0', '', '15148', 'msedge.exe'], ['UDPv6', '::', '5353', '*', '0', '', '15148', 'msedge.exe'], ['UDPv4', '0.0.0.0', '5353', '*', '0', '', '15148', 'msedge.exe']];
const netLine = r => r.map((c, i) => c.padEnd([7, 15, 11, 13, 7, 11, 7, 12][i])).join('');

/* ---------- escenas ---------- */
const S = [];

/* 01 · Bienvenida */
S.push({ html: T => `${bgCyber}
  <svg id="chip" style="position:absolute;right:170px;top:250px;opacity:0" width="560" height="560" viewBox="0 0 560 560">
   <rect x="80" y="160" width="400" height="240" rx="14" fill="#0b1b33" stroke="#22d3ee" stroke-width="3"/>
   ${Array.from({ length: 8 }, (_, i) => `<rect x="${108 + i * 46}" y="190" width="34" height="120" rx="4" fill="#123058" stroke="#2c6aa8"/>`).join('')}
   ${Array.from({ length: 16 }, (_, i) => `<rect x="${96 + i * 23.5}" y="400" width="14" height="34" fill="#c9a227"/>`).join('')}
   <text x="280" y="360" fill="#67e8f9" font-family="JB" font-size="26" text-anchor="middle">DDR4 · 8 GB</text>
   <circle cx="280" cy="280" r="250" fill="none" stroke="rgba(34,211,238,.15)" stroke-width="2" stroke-dasharray="6 10"/></svg>
  <div style="position:absolute;left:150px;top:300px;width:1000px">
   <div class="kicker" id="k1" style="opacity:0">${T('Digital Forensics · 203028123 · Maestría en Ciberseguridad · UNAD', 'Digital Forensics · 203028123 · Master\'s in Cybersecurity · UNAD')}</div>
   <div class="ttl" id="t1" style="opacity:0;margin:22px 0 26px">${T('Laboratorio 01<br>Análisis forense de <em>memoria RAM</em>', 'Lab 01<br>Forensic analysis of <em>RAM memory</em>')}</div>
   <div id="s1" style="opacity:0;font:400 28px Plex;color:#9fb3d6">${T('Parte 1 · Lo que hace el estudiante · Volatility3 · Windows 11', 'Part 1 · What the student does · Volatility3 · Windows 11')}</div></div>`,
  frame: a => { a.show('#k1', .03, null, 'up'); a.show('#t1', .08, null, 'up'); a.show('#s1', .16, null, 'up'); const v = a.show('#chip', .12, null, 'pop'); a.set('#chip', 'transform', `rotate(${(a.u * 8 - 4).toFixed(2)}deg) scale(${.94 + .06 * v})`); } });

/* 02 · Ruta en cinco pasos */
const STEPS = [['1', 'Verificar', 'Verify', 'hash SHA-256'], ['2', 'Instalar', 'Install', 'Python + Volatility3'], ['3', 'Volatility3', 'Volatility3', '5 plugins'], ['4', 'Resultados', 'Results', 'CSV + hash'], ['5', 'Informe', 'Report', 'Word']];
S.push({ html: T => `${bgCyber}<div class="kicker" style="position:absolute;left:150px;top:180px">${T('La ruta del laboratorio', 'The lab route')}</div>
  <div style="position:absolute;left:150px;top:240px;font:700 54px Chakra;color:#fff">${T('Cinco pasos, en orden', 'Five steps, in order')}</div>
  ${STEPS.map((s, i) => `<div class="card2" id="st${i}" style="left:${150 + i * 330}px;top:420px;width:290px;height:300px;padding:30px;opacity:0">
   <div style="font:700 72px Chakra;color:#22d3ee">${s[0]}</div><div style="font:700 34px Chakra;color:#fff;margin:6px 0">${T(s[1], s[2])}</div><div style="font:500 20px JB;color:#9fb3d6">${s[3]}</div></div>
   ${i < 4 ? `<div id="ar${i}" style="position:absolute;left:${445 + i * 330}px;top:555px;color:#22d3ee;font-size:40px;opacity:0">›</div>` : ''}`).join('')}
  <div id="menuhint" class="tag" style="left:150px;top:800px;opacity:0;font-size:22px">${T('☰ Menú de capítulos: debajo del video', '☰ Chapter menu: below the video')}</div>`,
  frame: a => { const k = [a.c(1), a.c(2), a.c(3), a.c(3) + .08, a.c(3) + .16]; for (let i = 0; i < 5; i++) { a.show('#st' + i, k[i] - .02, null, 'up'); if (i < 4) a.show('#ar' + i, k[i + 1] - .02); const on = a.u >= k[i] && (i === 4 ? a.u < a.c(4) : a.u < k[i + 1]); a.set('#st' + i, 'borderColor', on ? '#22d3ee' : 'rgba(34,211,238,.25)'); a.set('#st' + i, 'boxShadow', on ? '0 0 50px rgba(34,211,238,.45)' : 'none'); } a.show('#menuhint', a.c(4), null, 'up'); } });

/* 03 · El caso */
S.push({ html: T => `${bgCyber}<div class="kicker" style="position:absolute;left:150px;top:150px">${T('Caso LAB01-2026-001', 'Case LAB01-2026-001')}</div>
  <div style="position:absolute;left:150px;top:205px;font:700 54px Chakra;color:#fff">${T('Adquisición en vivo de un equipo Windows 11', 'Live acquisition of a Windows 11 computer')}</div>
  <svg id="lap" style="position:absolute;left:170px;top:380px;opacity:0" width="420" height="300" viewBox="0 0 420 300"><rect x="50" y="20" width="320" height="200" rx="12" fill="#0b1b33" stroke="#22d3ee" stroke-width="3"/><rect x="66" y="36" width="288" height="168" fill="#1d4ed8"/><rect x="66" y="36" width="288" height="168" fill="url(#lg)" opacity=".5"/><path d="M20 232h380l-30 36H50z" fill="#16243d" stroke="#22d3ee" stroke-width="2"/><circle cx="350" cy="60" r="8" fill="#34d399"/><text x="210" y="130" text-anchor="middle" fill="#fff" font-family="Plex" font-size="22">${T('encendido', 'running')}</text></svg>
  <div id="arw" style="position:absolute;left:640px;top:500px;font:700 80px Chakra;color:#22d3ee;opacity:0">→</div>
  <div class="card2" id="f1" style="left:790px;top:380px;width:900px;padding:28px 34px;opacity:0"><div style="font:600 30px JB;color:#fff">LAB01_FTK_GUILLE_20261122.mem</div><div style="font:500 22px Plex;color:#9fb3d6;margin-top:6px">${T('Imagen RAW de la memoria · 10 GiB · 10.737.418.240 bytes', 'RAW memory image · 10 GiB · 10,737,418,240 bytes')}</div></div>
  <div class="card2" id="f2" style="left:790px;top:520px;width:430px;padding:22px 28px;opacity:0"><div style="font:600 22px JB;color:#fff">.mem.hashes.txt</div><div style="font:500 19px Plex;color:#9fb3d6">MD5 · SHA-1 · SHA-256</div></div>
  <div class="card2" id="f3" style="left:1260px;top:520px;width:430px;padding:22px 28px;opacity:0"><div style="font:600 22px Plex;color:#fff">${T('Cadena de custodia', 'Chain of custody')}</div><div style="font:500 19px Plex;color:#9fb3d6">${T('quién, cuándo, cómo', 'who, when, how')}</div></div>
  <div class="tag g" id="mis" style="left:790px;top:690px;font-size:26px;padding:10px 20px;opacity:0">${T('Misión: responder 5 preguntas con evidencia', 'Mission: answer 5 questions with evidence')}</div>`,
  frame: a => { a.show('#lap', .02, null, 'pop'); a.show('#arw', a.c(1), null, 'left'); a.show('#f1', a.c(1) + .04, null, 'up'); a.show('#f2', a.c(2), null, 'up'); a.show('#f3', a.c(2) + .05, null, 'up'); a.show('#mis', a.c(3), null, 'up'); } });

/* 04 · Cinco preguntas */
const QS = [['🖥', 'Sistema y momento de la captura', 'System and capture time'], ['🌐', 'Navegador, desde cuándo y cuántos procesos', 'Browser, since when, how many processes'], ['🛠', 'Rastros de una herramienta forense', 'Traces of a forensic tool'], ['🔌', 'Puertos y conexiones de red', 'Network ports and connections'], ['🔎', 'Sitios web visitados', 'Visited websites']];
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:130px;font:700 54px Chakra;color:#fff">${T('Las cinco preguntas del caso', 'The five questions of the case')}</div>
  ${QS.map((q, i) => `<div class="card2" id="q${i}" style="left:150px;top:${250 + i * 140}px;width:1620px;height:112px;display:flex;align-items:center;gap:28px;padding:0 34px;opacity:0"><div style="font:700 44px Chakra;color:#22d3ee;width:50px">${i + 1}</div><div style="font-size:44px">${q[0]}</div><div style="font:600 34px Plex;color:#fff">${T(q[1], q[2])}</div></div>`).join('')}`,
  frame: a => { for (let i = 0; i < 5; i++) { a.show('#q' + i, a.c(i) - .01, null, 'left'); const on = a.u >= a.c(i) && a.u < a.ce(i) + .02; a.set('#q' + i, 'borderColor', on ? '#22d3ee' : 'rgba(34,211,238,.25)'); } } });

/* 05 · PowerShell y carpetas */
S.push({ html: T => desk(['term', 'explorer'], `
  <div class="startm" id="sm" style="opacity:0;visibility:hidden"><div class="srch">${ICON.search.replace('#fff', '#aaa')}&nbsp;&nbsp;<span id="smq"></span><span class="caret" style="background:#ddd;height:18px"></span></div>
   <div style="margin-top:20px;font-size:14px;color:#bbb">${T('Mejor coincidencia', 'Best match')}</div>
   <div class="res" id="smr" style="opacity:0"><div class="ic">&gt;_</div><div><div style="font-size:20px">Windows PowerShell</div><div style="font-size:14px;color:#bbb">${T('Aplicación', 'App')}</div></div></div></div>
  ${TERM('w1', 130, 90, 1100, 520, cmd('c1') + out('o1', ['', '', '    Directorio: C:\\Forense', '', 'Mode          LastWriteTime   Length Name', '----          -------------   ------ ----', 'd-----   25/11/2026  9:14 a. m.        evidencia', 'd-----   25/11/2026  9:14 a. m.        resultados', 'd-----   25/11/2026  9:14 a. m.        informe']))}
  ${EXP('w2', 760, 330, 1040, 560, 'C:\\Forense', [['evidencia', '25/11/2026 9:14', 'Carpeta de archivos', 'd'], ['informe', '25/11/2026 9:14', 'Carpeta de archivos', 'd'], ['resultados', '25/11/2026 9:14', 'Carpeta de archivos', 'd']])}
  ${tag('tg1', 1300, 560, T('3 carpetas de trabajo', '3 working folders'), 'g')}`),
  frame: a => {
    const t0 = .04, ts = .10, tc = .2;
    a.cur([[0, 900, 700], [t0, '[data-ti=search]', -40, 0, 1], [ts + .06, '#smr', 60, 0], [tc, '#smr', 60, 0, 1], [tc + .05, 700, 400], [.62, '[data-ti=explorer]', -40, 0], [.66, '[data-ti=explorer]', -40, 0, 1], [.8, 1400, 700]]);
    a.show('#sm', t0 + .01, tc + .01, 'up'); a.type('#smq', 'PowerShell', t0 + .03, ts); a.show('#smr', ts - .01);
    a.win('#w1', tc + .01); a.type('#c1', 'mkdir C:\\Forense\\evidencia, C:\\Forense\\resultados, C:\\Forense\\informe', tc + .05, .5); a.lines('#o1', .51, .58);
    a.win('#w2', .66); a.lines('#w2 .main', .67, .72); a.show('#tg1', .74, null, 'up');
    a.cam([[0, 960, 540, 1], [tc + .05, 680, 320, 1.35], [.58, 680, 320, 1.35], [.64, 960, 540, 1]]);
  } });

/* 06 · Descarga desde Google Drive */
const DRV = [['LAB01_FTK_GUILLE_20261122.mem', '22 nov 2026', '10 GB'], ['LAB01_FTK_GUILLE_20261122.mem.hashes.txt', '22 nov 2026', '637 bytes'], ['LAB01_WinPmem_GUILLE_20261122_164926.raw', '22 nov 2026', '10 GB'], ['LAB01_WinPmem_GUILLE_20261122_164926.raw.hashes.txt', '22 nov 2026', '685 bytes']];
S.push({ html: T => desk(['edge'], `${EDGE('w1', 60, 40, 1800, 960, 'drive.google.com/drive/folders/Artefacto_RAW',
  `<div class="drive"><div class="dl"><div class="new">＋ ${T('Nuevo', 'New')}</div><div style="padding:8px 12px">${T('Mi unidad', 'My Drive')}</div><div style="padding:8px 12px">${T('Compartidos conmigo', 'Shared with me')}</div><div style="padding:8px 12px">${T('Recientes', 'Recent')}</div></div>
   <div class="dm"><div class="crumb">${T('Compartidos conmigo', 'Shared with me')} › Artefacto_RAW</div>
   <div class="row2 h"><div>${T('Nombre', 'Name')}</div><div>${T('Modificado', 'Modified')}</div><div>${T('Tamaño', 'Size')}</div></div>
   ${DRV.map((r, i) => `<div class="row2" id="dr${i}"><div>${i % 2 ? '📄' : '🗂'}&nbsp; ${r[0]}</div><div>${r[1]}</div><div>${r[2]}</div></div>`).join('')}</div></div>`, 'Artefacto_RAW - Google Drive')}
   <div class="ctx" id="cx" style="left:420px;top:250px;opacity:0;visibility:hidden"><div>${T('Abrir con', 'Open with')}</div><div class="on">⬇ ${T('Descargar', 'Download')}</div><div>${T('Cambiar nombre', 'Rename')}</div><div>${T('Compartir', 'Share')}</div><div>${T('Información del archivo', 'File information')}</div></div>
   <div class="dim" id="dd" style="opacity:0;visibility:hidden;top:40px"></div>
   <div class="dlg" id="dg" style="left:610px;top:300px;opacity:0;visibility:hidden"><h4>${T('Google Drive no puede analizar este archivo en busca de virus', 'Google Drive can\'t scan this file for viruses')}</h4>${T('LAB01_FTK_GUILLE_20261122.mem (10 GB) es demasiado grande para analizarlo. ¿Desea descargarlo de todas formas?', 'LAB01_FTK_GUILLE_20261122.mem (10 GB) is too large to scan. Do you still want to download it?')}<div class="bt"><span>${T('Cancelar', 'Cancel')}</span><span class="pri">${T('Descargar de todas formas', 'Download anyway')}</span></div></div>
   <div class="dlbar" id="db" style="left:1460px;top:130px;opacity:0;visibility:hidden"><b>${T('Descargas', 'Downloads')}</b><div style="margin-top:8px">LAB01_FTK_GUILLE_20261122.mem</div><div class="pb"><i id="dbp" style="width:0"></i></div><div id="dbt" style="color:#666;font-size:12px;margin-top:4px"></div><div id="db2" style="margin-top:10px;opacity:0">LAB01_FTK_GUILLE_20261122.mem.hashes.txt ✔</div></div>`),
  frame: a => {
    const r1 = a.c(1), dlg = a.c(2), fin = a.c(3);
    a.win('#w1', 0);
    const row = a.u >= fin ? '#dr1' : '#dr0'; a.pin('#cx', row, { side: 'below', dx: 160, pad: -14 });
    a.cur([[0, 1100, 800], [r1, '#dr0', 120, 0, 1], [r1 + .05, '#cx div:nth-child(2)', 0, 0], [r1 + .08, '#cx div:nth-child(2)', 0, 0, 1], [dlg + .06, '#dg .pri', 0, 0], [dlg + .12, '#dg .pri', 0, 0, 1], [fin, '#dr1', 120, 0], [fin + .04, '#dr1', 120, 0, 1], [fin + .07, '#cx div:nth-child(2)', 0, 0], [fin + .1, '#cx div:nth-child(2)', 0, 0, 1], [.95, 900, 700]]);
    a.cls('#dr0', 'sel', a.u >= r1 && a.u < fin); a.cls('#dr1', 'sel', a.u >= fin);
    a.show('#cx', r1 + .005, r1 + .085); if (a.u >= fin) a.show('#cx', fin + .045, fin + .105);
    a.show('#dd', dlg, dlg + .13); a.show('#dg', dlg, dlg + .13, 'pop');
    a.show('#db', dlg + .13); const pr = a.prog(dlg + .13, .98); a.set('#dbp', 'width', (pr * 100) + '%'); a.text('#dbt', (pr * 10).toFixed(1).replace('.', ',') + ' GB / 10 GB'); a.show('#db2', fin + .11);
    a.cam([[0, 960, 540, 1], [r1 - .03, 760, 400, 1.35], [dlg - .02, 760, 400, 1.35], [dlg + .02, 960, 540, 1.1], [dlg + .14, 1500, 300, 1.6], [fin - .03, 1500, 300, 1.6], [fin, 760, 400, 1.3], [.97, 960, 540, 1]]);
  } });

/* 07 · Mover a evidencia y comprobar tamaño */
S.push({ html: T => desk(['explorer'], `${EXP('w1', 110, 70, 1700, 880, 'C:\\Users\\estudiante\\Downloads', [['LAB01_FTK_GUILLE_20261122.mem', '25/11/2026 9:31', 'Archivo MEM', 'f', '10.485.760 KB'], ['LAB01_FTK_GUILLE_20261122.mem.hashes.txt', '25/11/2026 9:31', 'Documento de texto', 'f', '1 KB']], ['Inicio', 'Escritorio', 'Descargas', 'Documentos', 'Este equipo', '&nbsp;&nbsp;Forense', '&nbsp;&nbsp;&nbsp;&nbsp;evidencia', '&nbsp;&nbsp;&nbsp;&nbsp;informe', '&nbsp;&nbsp;&nbsp;&nbsp;resultados'])}
  <div id="ghost" style="position:absolute;left:0;top:0;opacity:0;background:rgba(0,120,215,.85);color:#fff;font-size:15px;padding:6px 12px;border-radius:6px">+ ${T('Mover a evidencia', 'Move to evidencia')}</div>
  ${box('bx', 0, 0, 10, 10)}${tag('tg', 0, 0, '10.485.760 KB = 10.737.418.240 bytes', 'g')}
  <div class="card2" id="warn" style="left:300px;top:640px;width:1320px;padding:26px 34px;opacity:0;visibility:hidden;border-color:#fbbf24"><div style="font:700 28px Plex;color:#fbbf24">⚠ ${T('Descargue archivo por archivo', 'Download file by file')}</div><div style="font:500 24px Plex;color:#e6eefc;margin-top:6px">${T('Si descarga la carpeta completa, Drive la comprime en partes de 2 GB y la imagen puede quedar incompleta.', 'If you download the whole folder, Drive splits it into 2 GB parts and the image may be incomplete.')}</div></div>`),
  frame: a => {
    a.win('#w1', 0); const d0 = .06, d1 = .3, sz = Math.max(d1 + .06, a.c(0) + .55 * (a.ce(0) - a.c(0)));
    const pth = a.u < d1 + .02 ? 'C:\\Users\\estudiante\\Downloads' : 'C:\\Forense\\evidencia'; a.text('#w1 .path', pth); a.text('#w1 .tt', a.u < d1 + .02 ? 'Descargas' : 'evidencia');
    a.cls('#w1-r0', 'sel', a.u > d0 && a.u < d1 + .02); a.cls('#w1-r1', 'sel', a.u > d0 + .04 && a.u < d1 + .02);
    a.cur([[0, 900, 600], [d0, '#w1-r0', 200, 0, 1], [d0 + .04, '#w1-r1', 200, 0, 1], [d0 + .09, '#w1-r0', 200, 0], [d1, '#w1 .side div:nth-child(7)', 0, 0, 1], [sz, '#w1-r0 > div:nth-child(4)', 40, 0], [.95, '#w1-r0 > div:nth-child(4)', 40, 0]]);
    const g = document.getElementById('ghost'); const dg = a.u > d0 + .09 && a.u < d1; g.style.opacity = dg ? 1 : 0; if (dg) { const [x0, y0] = a.at('#w1-r0', 200, 10), [x1, y1] = a.at('#w1 .side div:nth-child(7)', 20, 10); const e = a.ease(d0 + .09, d1); g.style.left = (x0 + (x1 - x0) * e) + 'px'; g.style.top = (y0 + (y1 - y0) * e) + 'px'; }
    a.pin('#bx', '#w1-r0 > div:nth-child(4)', { box: 1 }); a.pin('#tg', '#w1-r0 > div:nth-child(4)', { side: 'below', dx: -330, pad: 22 }); a.show('#bx', sz, a.c(1)); a.show('#tg', sz + .02, a.c(1), 'up'); a.show('#warn', a.c(1), null, 'up');
    a.cam([[0, 960, 540, 1], [sz - .02, 1500, 300, 1.7], [a.c(1) - .02, 1500, 300, 1.7], [a.c(1) + .03, 960, 600, 1]]);
  } });

/* 08 · Hash */
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 50, 1780, 930, cmd('c1') + cmd('c2', '<span class="p">PS C:\\Forense\\evidencia&gt; </span>') + out('o2', ['', 'Algorithm : MD5    E4FFC0C59584D6FB30A537283BC4246A', 'Algorithm : SHA256 <span id="h1">' + HASH + '</span>', '']) + cmd('c3', '<span class="p">PS C:\\Forense\\evidencia&gt; </span>') + out('o3', ['', 'Algorithm       Hash                                                                    Path', '---------       ----                                                                    ----', 'SHA256          <span id="h2">' + HASH + '</span> C:\\Forense\\evidencia\\LAB01_FTK…', '']) + cmd('c4', '<span class="p">PS C:\\Forense\\evidencia&gt; </span>') + out('o4', ['SHA256 hash de .\\LAB01_FTK_GUILLE_20261122.mem:', '<span id="h3">' + HASH.toLowerCase() + '</span>', 'CertUtil: -hashfile comando completado correctamente.']))}
  ${tag('tr', 1180, 250, T('registrado en .hashes.txt', 'recorded in .hashes.txt'), 'v')}${tag('tc', 1180, 440, T('calculado ahora', 'computed now'))}
  <div class="card2" id="ok" style="left:610px;top:620px;width:700px;padding:26px 34px;text-align:center;opacity:0;visibility:hidden;border-color:#34d399"><div style="font:700 44px Chakra;color:#34d399">✔ ${T('Coincide', 'It matches')}</div><div style="font:500 22px Plex;color:#e6eefc">${T('La evidencia está intacta', 'The evidence is intact')}</div></div>`),
  frame: a => {
    a.win('#w1', 0); const k1 = a.c(1), k2 = a.c(2), k4 = a.c(4);
    a.type('#c1', 'cd C:\\Forense\\evidencia', .02, .07);
    a.type('#c2', 'Get-Content .\\LAB01_FTK_GUILLE_20261122.mem.hashes.txt', .08, k1 - .01); a.lines('#o2', k1, k1 + .02);
    a.type('#c3', 'Get-FileHash .\\LAB01_FTK_GUILLE_20261122.mem -Algorithm SHA256', k1 + .03, k1 + .12); a.lines('#o3', k1 + .2, k1 + .22);
    a.pin('#tr', '#h1'); a.pin('#tc', '#h2', { dx: -260, dy: 44 }); a.cls('#h1', 'hl', a.u > k2 && a.u < k4); a.cls('#h2', 'hl', a.u > k2 && a.u < k4); a.show('#tr', k2, k4, 'up'); a.show('#tc', k2 + .03, k4, 'up');
    a.show('#ok', a.c(3), k4, 'pop');
    a.type('#c4', 'certutil -hashfile .\\LAB01_FTK_GUILLE_20261122.mem SHA256', k4, k4 + .1); a.lines('#o4', k4 + .14, k4 + .16);
    a.cam([[0, 960, 540, 1], [k1 + .2, 860, 330, 1.2], [a.c(3) - .02, 860, 330, 1.2], [k4, 960, 560, 1.15], [.97, 960, 540, 1]]);
  } });

/* 09 · Instalar Python (capturas reales) */
const PYIMG = ['paso-02a-01-python-org-descarga', 'paso-02a-02-edge-conservar-descarga', 'paso-02a-03-python-install-manager', 'paso-02a-04-config-rutas-largas', 'paso-02a-05-config-path', 'paso-02a-06-instalar-cpython'];
S.push({ html: T => desk(['edge', 'term'], `${EDGE('w1', 60, 30, 1800, 980, 'python.org/downloads/windows/', `<img id="pi0" src="img/${PYIMG[0]}.jpg">`, 'Python Releases for Windows')}
  <img id="pi1" src="img/${PYIMG[1]}.jpg" style="position:absolute;right:120px;top:120px;width:520px;border-radius:10px;box-shadow:0 18px 50px rgba(0,0,0,.4);opacity:0;visibility:hidden">
  <div class="win" id="w2" style="left:420px;top:150px;width:1080px;height:760px;opacity:0;visibility:hidden"><div class="tb">${ICON.py}<div class="tt">Python Install Manager</div><div class="wb">✕</div></div><div class="body" style="background:#000"><img id="pi2" src="img/${PYIMG[2]}.jpg" style="width:100%"><img id="pi3" src="img/${PYIMG[3]}.jpg" style="position:absolute;inset:0;width:100%;opacity:0"><img id="pi4" src="img/${PYIMG[4]}.jpg" style="position:absolute;inset:0;width:100%;opacity:0"><img id="pi5" src="img/${PYIMG[5]}.jpg" style="position:absolute;inset:0;width:100%;opacity:0"></div></div>
  ${tag('ty', 1080, 860, T('Y = sí', 'Y = yes'), 'g')}
  ${TERM('w3', 360, 300, 1200, 360, cmd('c1') + out('o1', ['Python 3.15.2']))}`),
  frame: a => {
    const k2 = a.c(2), k3 = a.c(3), k4 = a.c(4);
    a.win('#w1', 0, k3 + .02); a.cur([[0, 900, 600], [.1, 520, 470, 1], [k2, 1350, 470], [k2 + .03, 1350, 470, 1], [k3 + .05, 960, 600], [.97, 960, 600]]);
    a.show('#pi1', k2 - .02, k2 + .05, 'pop');
    a.win('#w2', k3, k4 + .01); a.show('#pi3', k3 + .06); a.show('#pi4', k3 + .12); a.show('#pi5', k3 + .18); a.show('#ty', k3 + .06, k4, 'up');
    a.win('#w3', k4); a.type('#c1', 'py --version', k4 + .02, k4 + .07); a.lines('#o1', k4 + .09, k4 + .1);
    a.cam([[0, 960, 540, 1], [.06, 600, 420, 1.35], [k2 - .03, 600, 420, 1.35], [k2, 960, 540, 1]]);
  } });

/* 10 · Entorno virtual y Volatility3 */
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 50, 1780, 930, cmd('c1') + cmd('c2', '<span id="pr2">' + PS + '</span>') + out('o2', []) + cmd('c3', PSF.replace('<span class="g">', '<span class="g" id="v3p">')) + out('o3', ['Collecting volatility3', '  Downloading volatility3-2.28.2-py3-none-any.whl (1.1 MB)', '     <span class="g">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span> 1.1/1.1 MB 4.2 MB/s', 'Collecting pefile>=2024.8.26', '  Downloading pefile-2024.8.26-py3-none-any.whl (74 kB)', 'Installing collected packages: pefile, volatility3', '<span class="g">Successfully installed pefile-2024.8.26 volatility3-2.28.2</span>']) + cmd('c4', PSF) + out('o4', ['Volatility 3 Framework 2.28.2', 'usage: vol.exe [-h] [-c CONFIG] [--parallelism [{processes,threads,off}]]', '               [-e EXTEND] [-p PLUGIN_DIRS] [-s SYMBOL_DIRS] [-v] [-l LOG]', '               [-o OUTPUT_DIR] [-q] [-f FILE] [--write-config] …']))}
  ${box('bxp', 0, 0, 10, 10)}${tag('tp', 0, 0, T('entorno activo: (vol3)', 'active environment: (vol3)'), 'g')}`),
  frame: a => {
    a.win('#w1', 0); const k1 = a.c(1), k3 = a.c(3);
    a.type('#c1', 'py -m venv C:\\Forense\\vol3', .03, .12);
    a.type('#c2', 'C:\\Forense\\vol3\\Scripts\\Activate.ps1', .14, k1);
    a.pin('#bxp', '#v3p', { box: 1, pad: 4 }); a.pin('#tp', '#v3p', { dx: 20 }); a.show('#bxp', k1 + .02, k3); a.show('#tp', k1 + .04, k3, 'up');
    a.type('#c3', 'pip install volatility3', a.c(2), a.c(2) + .06); a.lines('#o3', a.c(2) + .08, k3 + .02);
    a.type('#c4', 'vol -h', k3 + .05, k3 + .08); a.lines('#o4', k3 + .1, k3 + .12);
    a.cam([[0, 960, 540, 1], [k1, 500, 260, 1.5], [a.c(2) - .02, 500, 260, 1.5], [a.c(2) + .03, 960, 540, 1]]);
  } });

/* 11 · Error común y las dos líneas */
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 50, 1780, 930, cmd('c1') + out('o1', ['<span class="r">vol : El término \'vol\' no se reconoce como nombre de un cmdlet, función, archivo de script</span>', '<span class="r">o programa ejecutable. Compruebe si escribió correctamente el nombre…</span>', '']) + '<div id="two" style="margin-top:14px">' + cmd('c2') + cmd('c3', PSF) + '</div>')}
  ${box('bx1', 0, 0, 10, 10)}${tag('t1', 0, 0, T('el entorno no está activado', 'the environment is not activated'), 'r')}
  ${box('bx2', 0, 0, 10, 10)}${tag('t2', 0, 0, T('cada vez que abra una consola nueva', 'every time you open a new console'), 'g')}`),
  frame: a => {
    a.win('#w1', 0); a.type('#c1', 'vol -f C:\\Forense\\evidencia\\LAB01_FTK_GUILLE_20261122.mem windows.info', .02, .1); a.lines('#o1', .11, .12);
    a.pin('#bx1', '#o1', { box: 1, w: 1580 }); a.pin('#t1', '#o1', { side: 'below', dx: 900, pad: 14 }); a.pin('#bx2', '#two', { box: 1, w: 1180 }); a.pin('#t2', '#two', { w: 1180 }); a.show('#bx1', .12, a.c(1)); a.show('#t1', .13, a.c(1), 'up');
    a.type('#c2', 'C:\\Forense\\vol3\\Scripts\\Activate.ps1', a.c(1) + .02, a.c(2)); a.type('#c3', '$IMG = "C:\\Forense\\evidencia\\LAB01_FTK_GUILLE_20261122.mem"', a.c(1) + .22, a.c(2));
    a.show('#bx2', a.c(1) + .05); a.show('#t2', a.c(1) + .07, null, 'up');
    a.cam([[0, 960, 540, 1], [.12, 820, 280, 1.25], [.97, 820, 280, 1.25]]);
  } });

/* 12 · windows.info */
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 40, 1780, 950, cmd('c1', PSF) + out('o0', ['<span class="gr">Progress:   34.21\t\tDownloading https://msdl.microsoft.com/download/symbols/ntkrnlmp.pdb/CE884F70…</span>']) + out('o1', VOLHDR.concat(['', ...infoLines])))}
  ${box('b64', 0, 0, 10, 10)}${tag('g64', 0, 0, T('64 bits', '64-bit'), 'g')}
  ${box('bbd', 0, 0, 10, 10)}${tag('gbd', 0, 0, T('build 26100 = Windows 11', 'build 26100 = Windows 11'), 'g')}
  ${box('bnt', 0, 0, 10, 10)}${tag('gnt', 0, 0, T('equipo cliente', 'client computer'), 'g')}`),
  frame: a => {
    a.win('#w1', 0); a.type('#c1', 'vol -f $IMG windows.info', .02, .08);
    a.lines('#o0', .09, .1); a.set('#o0', 'display', a.u > a.c(2) ? 'none' : ''); a.lines('#o1', a.c(2), a.c(2) + .04);
    [['b64', 'g64', 3], ['bbd', 'gbd', 8], ['bnt', 'gnt', 13]].forEach(([b, g, n]) => { a.pin('#' + b, '#inf' + n, { box: 1, pad: 4 }); a.pin('#' + g, '#inf' + n, { dy: 0 }); }); const k = a.c(3); a.show('#b64', k, null); a.show('#g64', k + .02, null, 'up'); a.show('#bbd', k + .12); a.show('#gbd', k + .14, null, 'up'); a.show('#bnt', k + .26); a.show('#gnt', k + .28, null, 'up');
    a.cam([[0, 960, 540, 1], [a.c(2) + .05, 640, 560, 1.4], [.97, 640, 560, 1.4]]);
  } });

/* 13 · SystemTime y respuesta 1 */
S.push({ html: T => desk(['term'], `${TERM('w1', 70, 40, 1780, 950, '<div>' + PSF + '<span class="c">vol -f $IMG windows.info</span></div>' + out('o1', VOLHDR.concat(['', ...infoLines])))}
  ${box('bst', 0, 0, 10, 10)}
  <div class="card2" id="calc" style="left:900px;top:560px;width:900px;padding:26px 34px;opacity:0;visibility:hidden"><div style="font:600 22px Plex;color:#9fb3d6">${T('UTC → hora de Colombia (UTC−5)', 'UTC → Colombia time (UTC−5)')}</div><div style="font:700 50px JB;color:#fff;margin-top:8px">21:45:06 <span style="color:#f87171">− 5 h</span> = <span style="color:#34d399">16:45:06</span></div></div>
  ${answer('ans', T('Respuesta 1', 'Answer 1'), T('Windows 11 de 64 bits (build 26100), capturado el <b>22/11/2026 a las 16:45:06</b> (UTC−5), igual que en la cadena de custodia.', '64-bit Windows 11 (build 26100), captured on <b>22/11/2026 at 16:45:06</b> (UTC−5), as recorded in the chain of custody.'))}`),
  frame: a => { a.win('#w1', 0); a.pin('#bst', '#inf11', { box: 1, pad: 4 }); a.show('#bst', .04); a.show('#calc', a.c(1), a.c(3), 'pop'); a.show('#ans', a.c(3), null, 'pop'); a.cam([[0, 640, 600, 1.35], [a.c(1) - .02, 640, 600, 1.35], [a.c(1) + .02, 1000, 620, 1.1], [a.c(3) - .02, 1000, 620, 1.1], [a.c(3) + .02, 960, 540, 1]]); } });

/* 14 · pslist */
S.push({ html: T => desk(['term'], `${TERM('w1', 40, 30, 1840, 970, cmd('c1', PSF) + out('o1', VOLHDR.concat(['', ...PSL.map(fmtRow).map(esc)])))}
  <div class="tag" id="cnt" style="left:1420px;top:110px;font-size:30px;padding:10px 20px;opacity:0;visibility:hidden">382 ${T('procesos', 'processes')}</div>
  ${tag('cp1', 0, 0, 'PID', '')}${tag('cp2', 0, 0, 'PPID', 'v')}${tag('cp3', 0, 0, T('programa', 'program'), 'g')}${tag('cp4', 0, 0, T('inicio (UTC)', 'start (UTC)'), '')}
  ${box('bh', 0, 0, 10, 10)}`),
  frame: a => { a.win('#w1', 0); a.type('#c1', 'vol -f $IMG windows.pslist', .02, .1); a.lines('#o1', .12, .3); const H = '#o1 > div:nth-child(4)'; a.pin('#bh', H, { box: 1, pad: 4 }); [['#cp1', 0], ['#cp2', 88], ['#cp3', 176], ['#cp4', 1000]].forEach(([t, dx]) => a.pin(t, H, { side: 'below', dx, pad: 10 })); a.show('#cnt', a.c(1), null, 'pop'); a.show('#bh', a.c(2)); a.show('#cp1', a.c(2) + .04, null, 'up'); a.show('#cp2', a.c(2) + .1, null, 'up'); a.show('#cp3', a.c(2) + .2, null, 'up'); a.show('#cp4', a.c(2) + .3, null, 'up'); } });

/* 15 · Edge */
S.push({ html: T => desk(['term'], `${TERM('w1', 40, 30, 1840, 970, cmd('c1', PSF) + out('o1', ['', ...[PSL[0], ...EDGEROWS].map(fmtRow).map(esc)]) + '<div style="margin-top:22px">' + cmd('c2', PSF) + '</div>' + out('o2', [esc(fmtRow(FTKROWS[0]))]))}
  ${box('b1', 0, 0, 10, 10)}${tag('t1', 0, 0, T('proceso principal de Edge', 'main Edge process'), 'g')}
  ${tag('t2', 0, 0, 'PPID 5948 = explorer.exe', 'v')}${tag('t3', 0, 0, '21:32:31 UTC = 16:32:31', '')}
  <div class="tag" id="cnt" style="left:1420px;top:520px;font-size:30px;padding:10px 20px;opacity:0;visibility:hidden">38 msedge.exe</div>`),
  frame: a => { a.win('#w1', 0); a.type('#c1', 'vol -f $IMG windows.pslist | findstr /i "PID msedge"', .02, .12); a.lines('#o1', .13, .2); const R1 = '#o1 > div:nth-child(3)'; a.pin('#b1', R1, { box: 1, pad: 4 }); a.pin('#t1', R1, { dy: -24 }); a.pin('#t2', R1, { side: 'below', dx: 80, pad: 80 }); a.pin('#t3', R1, { dy: 24 }); a.show('#b1', a.c(1)); a.show('#t1', a.c(1) + .02, null, 'up'); a.show('#t2', a.c(1) + .14, null, 'up'); a.show('#t3', a.c(2), null, 'up'); a.show('#cnt', a.c(2) + .12, null, 'pop'); a.set('#o2', 'display', 'none'); a.cam([[0, 960, 540, 1], [a.c(1), 760, 320, 1.35], [a.c(2) + .1, 760, 320, 1.35], [a.c(2) + .14, 960, 540, 1]]); } });

/* 16 · FTK Imager y respuestas 2 y 3 */
S.push({ html: T => desk(['term'], `${TERM('w1', 40, 30, 1840, 970, cmd('c1', PSF) + out('o1', ['', ...[PSL[0], ...FTKROWS].map(fmtRow).map(esc)]))}
  ${box('b1', 0, 0, 10, 10)}${tag('t1', 0, 0, T('FTK Imager: la herramienta de captura', 'FTK Imager: the capture tool'), 'r')}${tag('t2', 0, 0, '21:41 UTC = 16:41', '')}
  ${answer('ans', T('Respuestas 2 y 3', 'Answers 2 and 3'), T('<b>Edge</b> (PID 15148) desde las 16:32:31, con 38 procesos. <b>FTK Imager</b> (PID 17712 y 5812) aparece en su propia captura: normal en una adquisición en vivo.', '<b>Edge</b> (PID 15148) since 16:32:31, with 38 processes. <b>FTK Imager</b> (PID 17712 and 5812) appears in its own capture: normal in a live acquisition.'))}`),
  frame: a => { a.win('#w1', 0); a.type('#c1', 'vol -f $IMG windows.pslist | findstr /i "PID FTK winpmem explorer"', .02, .14); a.lines('#o1', .15, .18); const R2 = '#o1 > div:nth-child(4)'; a.pin('#b1', R2, { box: 1, pad: 4, hmul: 2 }); a.pin('#t1', R2, { w: 1180 }); a.pin('#t2', R2, { w: 1180, dy: 44 }); a.show('#b1', a.c(1) - .03); a.show('#t1', a.c(1), null, 'up'); a.show('#t2', a.c(1) + .05, null, 'up'); a.show('#ans', a.c(4) - .02, null, 'pop'); a.set('#ans', 'top', '520px'); } });

/* 17 · cmdline */
const CMDL = ['PID\tProcess\tArgs', '15148\tmsedge.exe\t"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" <span id="a1">--win-session-start</span>', '15288\tmsedge.exe\t<span id="a4">-</span>', '15292\tmsedge.exe\t"C:\\…\\msedge.exe" --type=utility --utility-sub-type=<span id="a2">network.mojom.NetworkService</span> --lang=es …', '8784\tmsedge.exe\t"C:\\…\\msedge.exe" <span id="a3">--type=gpu-process</span> --gpu-recent-crash-count=0 …', '13996\tmsedge.exe\t-', '16948\tmsedge.exe\t-'];
S.push({ html: T => desk(['term'], `${TERM('w1', 40, 30, 1840, 970, cmd('c1', PSF) + out('o1', ['', ...CMDL.map(r => r.split('\t').map((c, i) => i < 2 ? c.padEnd([8, 13][i]) : c).join(''))]))}
  ${tag('t1', 0, 0, T('navegador principal', 'main browser'), 'g')}${tag('t2', 0, 0, T('red', 'network'), '')}${tag('t3', 0, 0, T('gráficos', 'graphics'), 'v')}${tag('t4', 0, 0, T('paginado al disco', 'paged to disk'), 'r')}
  <div class="card2" id="nu" style="left:520px;top:620px;width:880px;padding:24px 30px;opacity:0;visibility:hidden"><div style="font:600 26px Plex;color:#fbbf24">${T('Las URLs no están aquí → paso 3.5', 'URLs are not here → step 3.5')}</div></div>`),
  frame: a => { a.win('#w1', 0); a.type('#c1', 'vol -f $IMG windows.cmdline | findstr /i "PID msedge"', .02, .1); a.lines('#o1', .11, .14); a.pin('#t1', '#a1'); a.pin('#t4', '#a4', { dx: 10 }); [['#t2', '#a2'], ['#t3', '#a3']].forEach(([t, g]) => a.pin(t, g, { side: 'below', pad: 10 })); const k = a.c(1); a.cls('#a1', 'hl', a.u > k); a.show('#t1', k, null, 'up'); a.cls('#a2', 'hl', a.u > k + .1); a.show('#t2', k + .1, null, 'up'); a.cls('#a3', 'hl', a.u > k + .2); a.show('#t3', k + .2, null, 'up'); a.cls('#a4', 'hl', a.u > a.c(2)); a.show('#t4', a.c(2), null, 'up'); a.show('#nu', a.c(3), null, 'pop'); a.cam([[0, 960, 540, 1], [k, 760, 300, 1.35], [a.c(3) - .02, 760, 300, 1.35], [a.c(3) + .02, 960, 540, 1]]); } });

/* 18 · netscan y netstat */
S.push({ html: T => desk(['term'], `${TERM('w1', 40, 30, 1840, 970, cmd('c1', PSF) + out('o1', [...VOLHDR, 'Offset  Proto  LocalAddr  LocalPort  ForeignAddr  ForeignPort  State  PID  Owner  Created', '<span id="ns" class="y">(sin filas)</span>', '']) + cmd('c2', PSF) + out('o2', [...VOLHDR, ...NETROWS.map(netLine), '…']))}
  ${tag('t1', 0, 0, T('netscan: vacío con este build', 'netscan: empty on this build'), 'r')}
  <div class="tag g" id="cnt" style="left:1180px;top:420px;font-size:28px;padding:10px 20px;opacity:0;visibility:hidden">140 ${T('objetos: 50 TCP + 90 UDP', 'objects: 50 TCP + 90 UDP')}</div>
  <div class="card2" id="les" style="left:420px;top:780px;width:1080px;padding:22px 30px;opacity:0;visibility:hidden;border-color:#fbbf24"><div style="font:600 25px Plex;color:#fbbf24">${T('Sin datos ≠ sin actividad: pruebe otro plugin y documente ambos', 'No data ≠ no activity: try another plugin and document both')}</div></div>`),
  frame: a => { a.win('#w1', 0); a.type('#c1', 'vol -f $IMG windows.netscan', .02, .08); a.lines('#o1', a.c(1) - .02, a.c(1)); a.pin('#t1', '#ns', { dx: 10 }); a.show('#t1', a.c(1), null, 'up'); a.cls('#ns', 'hl', a.u > a.c(1)); a.type('#c2', 'vol -f $IMG windows.netstat', a.c(2) - .06, a.c(2)); a.lines('#o2', a.c(2) + .02, a.c(2) + .08); a.show('#cnt', a.c(2) + .08, null, 'pop'); a.show('#les', a.c(3), null, 'up'); } });

/* 19 · Lectura de netstat y respuesta 4 */
S.push({ html: T => desk(['term'], `${TERM('w1', 40, 30, 1840, 970, '<div>' + PSF + '<span class="c">vol -f $IMG windows.netstat</span></div>' + out('o2', [...VOLHDR, ...NETROWS.map((r, i) => `<span id="n${i}">${esc(netLine(r))}</span>`), '…']))}
  ${box('bl', 0, 0, 10, 10)}${tag('tl', 0, 0, '135 = RPC · 139/445 = SMB', 'v')}
  ${box('bu', 0, 0, 10, 10)}${tag('tu', 0, 0, T('Edge · 6 sockets UDP 5353 (mDNS)', 'Edge · 6 UDP 5353 sockets (mDNS)'), 'g')}
  ${answer('ans', T('Respuesta 4', 'Answer 4'), T('No había conexiones TCP <b>establecidas</b>. Servicios del sistema escuchando (135, 139, 445) y Edge con 6 sockets UDP 5353 desde las 16:32:49.', 'There were no <b>established</b> TCP connections. System services listening (135, 139, 445) and Edge with 6 UDP 5353 sockets since 16:32:49.'))}`),
  frame: a => { a.win('#w1', 0); a.pin('#bl', '#n1', { box: 1, pad: 4, hmul: 5, w: 1060 }); a.pin('#tl', '#n1', { w: 1060, dy: 40 }); a.pin('#bu', '#n6', { box: 1, pad: 4, hmul: 6, w: 1060 }); a.pin('#tu', '#n6', { w: 1060, dy: 50 }); a.show('#bl', a.c(1), a.c(2)); a.show('#tl', a.c(1) + .02, a.c(2), 'up'); a.show('#bu', a.c(2), a.c(3)); a.show('#tu', a.c(2) + .02, a.c(3), 'up'); a.show('#ans', a.c(3), null, 'pop'); a.set('#ans', 'top', '560px'); a.cam([[0, 700, 380, 1.3], [a.c(3) - .02, 700, 380, 1.3], [a.c(3) + .02, 960, 540, 1]]); } });

/* 20 · buscar_urls.py */
S.push({ html: T => desk(['edge', 'term'], `${EDGE('w1', 60, 40, 1800, 960, 'guillermootalora.github.io/lab01-ram-estudiantes/#descargas', `<div style="padding:50px 80px;font-family:Plex;background:#0b1220;height:100%;color:#e6eefc"><div style="font:700 40px Chakra">${T('Descargas', 'Downloads')}</div>
   <div style="margin-top:30px;border:1px solid #1e2d4a;border-radius:12px">${[['Plantilla-Informe-Forense-LAB01.docx', T('Plantilla del informe', 'Report template')], ['buscar_urls.py', T('Herramienta del curso: busca las URLs en el RAW', 'Course tool: finds URLs in the RAW')], ['SHA256SUMS-LAB01.txt', T('Hashes de verificación', 'Verification hashes')]].map((r, i) => `<div id="dl${i}" style="display:flex;gap:30px;padding:20px 26px;border-bottom:1px solid #1e2d4a;font-size:22px"><span style="color:#22d3ee;min-width:520px">${r[0]}</span><span style="color:#9fb3d6">${r[1]}</span></div>`).join('')}</div></div>`, 'Lab 01 · Memoria RAM')}
  ${TERM('w2', 70, 50, 1780, 930, cmd('c1', PSF) + cmd('c2', PSF) + out('o2', ['True']) + cmd('c3', PSF) + out('o3', ['Imagen: LAB01_FTK_GUILLE_20261122.mem (10.00 GiB)', 'Buscando 6 patrones en ASCII y UTF-16LE…', '  <span class="g">██████████████████████████████████████</span> <span id="pc">0</span> %', '']))}
  ${tag('t1', 640, 270, T('no viene en Drive: se descarga aquí', 'not in Drive: download it here'), 'v')}`),
  frame: a => { const k2 = a.c(2) + .6 * (a.ce(2) - a.c(2)); a.win('#w1', 0, k2 + .02); a.cur([[0, 900, 600], [.1, '#dl1', 60, 0], [a.c(1) + .04, '#dl1', 60, 0, 1], [k2, 1000, 700]]); a.cls('#dl1', 'x', 1); a.set('#dl1', 'background', a.u > .1 && a.u < k2 ? 'rgba(34,211,238,.12)' : ''); a.show('#t1', a.c(2) - .03, k2 + .02, 'up');
    a.win('#w2', k2); a.type('#c1', 'Invoke-WebRequest -Uri "https://guillermootalora.github.io/lab01-ram-estudiantes/descargas/buscar_urls.py.txt" -OutFile "C:\\Forense\\buscar_urls.py"', k2 + .02, k2 + .14);
    a.type('#c2', 'Test-Path C:\\Forense\\buscar_urls.py', k2 + .15, k2 + .19); a.lines('#o2', k2 + .2, k2 + .21);
    const k3 = Math.max(a.c(3), k2 + .21); a.type('#c3', 'python C:\\Forense\\buscar_urls.py $IMG C:\\Forense\\resultados', k3, k3 + .08); a.lines('#o3', k3 + .09, k3 + .1); a.text('#pc', String(Math.round(100 * a.prog(k3 + .1, .98))));
    a.cam([[0, 960, 540, 1], [.06, 700, 330, 1.4], [k2 - .02, 700, 330, 1.4], [k2 + .02, 960, 540, 1]]); } });

/* 21 · Resumen de URLs y respuesta 5 */
const RES = ['=== unad.edu.co -> 4,720 coincidencias', '   <span id="u1">  315x https://www.unad.edu.co/</span>', '=== google.com/maps -> 1,532 coincidencias', '   <span id="u2">   85x https://www.google.com/maps/@5.5420138,-73.3590799,4336m/…</span>', '=== google.com/search -> 716 coincidencias', '   <span id="u3">   37x https://www.google.com/search?q=cadena+de+custodia+evidencia+digital</span>', '=== eltiempo.com -> 2,686 coincidencias', '   <span id="u4">  727x https://www.eltiempo.com/</span>', '=== nescafe.com -> 1,523 coincidencias', '   <span id="u5">  238x https://www.nescafe.com/co/recetas/bebidas/moca</span>'];
S.push({ html: T => desk(['note'], `${NOTE('w1', 60, 40, 1300, 940, 'urls_resumen.txt', RES.join('\n'))}
  ${['paso-04-03-unad', 'paso-04-04-eltiempo', 'paso-04-06-nescafe-receta-moca'].map((f, i) => `<img id="im${i}" src="img/${f}.jpg" style="position:absolute;left:1400px;top:${60 + i * 300}px;width:460px;border-radius:10px;border:2px solid #22d3ee;box-shadow:0 14px 40px rgba(0,0,0,.45);opacity:0;visibility:hidden">`).join('')}
  ${answer('ans', T('Respuesta 5', 'Answer 5'), T('<b>Sí.</b> Las cinco direcciones del caso aparecen en la memoria (UNAD, Google Maps, la búsqueda, El Tiempo y la receta de Nescafé).', '<b>Yes.</b> All five addresses of the case appear in memory (UNAD, Google Maps, the search, El Tiempo and the Nescafé recipe).'))}
  ${tag('tb', 120, 1000, T('Opción B: Strings de Microsoft + findstr', 'Option B: Microsoft Strings + findstr'), 'v')}`),
  frame: a => { a.win('#w1', 0); const k = a.c(1); for (let i = 1; i <= 5; i++) a.cls('#u' + i, 'hl', a.u > k + (i - 1) * .06); a.set('#w1 .nb', 'fontSize', '22px'); [0, 1, 2].forEach(i => a.show('#im' + i, k + [0, .18, .24][i], a.c(2), 'pop')); a.show('#ans', a.c(2), null, 'pop'); a.set('#ans', 'top', '560px'); a.show('#tb', a.c(3), null, 'up'); } });

/* 22 · CSV y hashes */
S.push({ html: T => desk(['term', 'explorer', 'excel'], `${TERM('w1', 70, 50, 1780, 930, cmd('c0', '<span class="g">(vol3) </span><span class="p">PS C:\\Forense\\resultados&gt; </span>') + cmd('c1', '<span class="g">(vol3) </span><span class="p">PS C:\\Forense\\resultados&gt; </span>') + cmd('c2', '<span class="g">(vol3) </span><span class="p">PS C:\\Forense\\resultados&gt; </span>') + cmd('c3', '<span class="g">(vol3) </span><span class="p">PS C:\\Forense\\resultados&gt; </span>') + cmd('c4', '<span class="g">(vol3) </span><span class="p">PS C:\\Forense\\resultados&gt; </span>'))}
  ${EXP('w2', 700, 200, 1100, 520, 'C:\\Forense\\resultados', [['hashes-resultados.txt', '25/11/2026 10:02', 'Documento de texto', 'f', '1 KB'], ['urls_encontradas.csv', '25/11/2026 9:58', 'Archivo CSV', 'f', '2.114 KB'], ['urls_resumen.txt', '25/11/2026 9:58', 'Documento de texto', 'f', '6 KB'], ['windows-cmdline.csv', '25/11/2026 10:01', 'Archivo CSV', 'f', '41 KB'], ['windows-info.csv', '25/11/2026 10:00', 'Archivo CSV', 'f', '1 KB'], ['windows-netstat.csv', '25/11/2026 10:01', 'Archivo CSV', 'f', '17 KB'], ['windows-pslist.csv', '25/11/2026 10:00', 'Archivo CSV', 'f', '48 KB']])}
  ${WIN('w3', 160, 120, 1600, 800, 'windows-pslist.csv - Excel', 'excel', `<div class="xl"><div class="rib">${T('Archivo  Inicio  Insertar  Datos', 'File  Home  Insert  Data')}</div><table><tr><th></th><th>A · PID</th><th>B · PPID</th><th>C · ImageFileName ▼</th><th>D · Threads</th><th>E · SessionId</th><th>F · CreateTime</th></tr>${EDGEROWS.slice(0, 8).map((r, i) => { const c = r.split('\t'); return `<tr><th>${i + 2}</th><td>${c[0]}</td><td>${c[1]}</td><td>${c[2]}</td><td>${c[4]}</td><td>${c[6]}</td><td>${c[8]}</td></tr>`; }).join('')}</table></div>`)}`),
  frame: a => { a.win('#w1', 0, a.c(2) + .04); const k = a.c(1); a.type('#c0', 'vol -f $IMG -r csv windows.info > windows-info.csv', .02, k - .1); a.type('#c1', 'vol -f $IMG -r csv windows.pslist > windows-pslist.csv', k - .09, k); a.type('#c2', 'vol -f $IMG -r csv windows.cmdline > windows-cmdline.csv', k + .01, k + .09); a.type('#c3', 'vol -f $IMG -r csv windows.netstat > windows-netstat.csv', k + .1, a.c(2) - .06); a.type('#c4', 'Get-FileHash *.csv -Algorithm SHA256 | Format-Table -AutoSize > hashes-resultados.txt', a.c(2) - .05, a.c(2)); a.win('#w2', a.c(2) + .02, a.c(3)); a.win('#w3', a.c(3)); a.cam([[0, 960, 540, 1], [a.c(3) + .02, 960, 540, 1], [a.c(3) + .08, 700, 380, 1.5], [.97, 700, 380, 1.5]]); } });

/* 23 · Informe y línea de tiempo */
const SECS = ['1. Datos generales', '2. Objeto y alcance', '3. Evidencia recibida', '4. Herramientas', '5. Metodología', '6. Hallazgos', '7. Línea de tiempo', '8. Conclusiones', '9. Limitaciones', '10. Anexos'];
const TL = [['16:30:22', 'Arranque del sistema', 'System boot'], ['16:30:33', 'Inicio de sesión (explorer.exe)', 'User logon (explorer.exe)'], ['16:32:31', 'Microsoft Edge (PID 15148)', 'Microsoft Edge (PID 15148)'], ['16:32:49', 'Edge abre sockets UDP 5353', 'Edge opens UDP 5353 sockets'], ['16:41:13', 'FTK Imager (PID 17712 / 5812)', 'FTK Imager (PID 17712 / 5812)'], ['16:45:06', 'Captura de la memoria', 'Memory capture']];
S.push({ html: T => `${desk(['word'], WIN('w1', 260, 30, 1400, 980, 'Plantilla-Informe-Forense-LAB01.docx - Word', 'word', `<div class="wd"><div class="pg"><h3>${T('Informe forense · Caso LAB01-2026-001', 'Forensic report · Case LAB01-2026-001')}</h3>${SECS.map((s, i) => `<div class="sec" id="sc${i}">${s}</div>`).join('')}</div></div>`))}
  <div id="tlw" style="position:absolute;inset:0;opacity:0;visibility:hidden">${bgCyber}<div style="position:absolute;left:150px;top:120px;font:700 50px Chakra;color:#fff">${T('Línea de tiempo (UTC−5) · 22/11/2026', 'Timeline (UTC−5) · 22/11/2026')}</div>
   <div style="position:absolute;left:180px;top:560px;width:1560px;height:4px;background:linear-gradient(90deg,#22d3ee,#a78bfa)"></div>
   ${TL.map((e, i) => `<div id="ev${i}" style="position:absolute;left:${150 + i * 300}px;top:${i % 2 ? 600 : 300}px;width:260px;opacity:0"><div style="font:700 34px JB;color:#22d3ee">${e[0]}</div><div style="font:500 24px Plex;color:#e6eefc;margin-top:6px">${T(e[1], e[2])}</div></div><div style="position:absolute;left:${170 + i * 300}px;top:550px;width:24px;height:24px;border-radius:50%;background:#22d3ee;box-shadow:0 0 18px #22d3ee"></div>`).join('')}
   <div class="tag v" id="fx" style="left:150px;top:880px;font-size:26px;padding:10px 20px;opacity:0">${T('Hecho ≠ interpretación', 'Fact ≠ interpretation')}</div></div>`,
  frame: a => { a.win('#w1', 0); for (let i = 0; i < 10; i++) a.set('#sc' + i, 'background', a.u > .05 + i * .025 && a.u < .08 + i * .025 ? 'rgba(65,165,238,.18)' : ''); a.show('#tlw', a.c(2) - .02); for (let i = 0; i < 6; i++) a.show('#ev' + i, a.c(2) + i * .05, null, 'up'); a.show('#fx', a.c(3), null, 'up'); } });

/* 24 · Cierre */
const DONE = [['Windows 11 x64 · build 26100 · 16:45:06', 'Windows 11 x64 · build 26100 · 16:45:06'], ['Edge PID 15148 · 16:32:31 · 38 procesos', 'Edge PID 15148 · 16:32:31 · 38 processes'], ['FTK Imager en su propia captura', 'FTK Imager in its own capture'], ['Sin TCP establecidas · Edge UDP 5353', 'No established TCP · Edge UDP 5353'], ['Las 5 URLs presentes en memoria', 'All 5 URLs present in memory']];
S.push({ html: T => `${bgCyber}<div style="position:absolute;left:150px;top:120px;font:700 54px Chakra;color:#fff">${T('Cinco preguntas, cinco respuestas con evidencia', 'Five questions, five evidence-based answers')}</div>
  ${DONE.map((d, i) => `<div class="card2" id="d${i}" style="left:150px;top:${240 + i * 118}px;width:1100px;height:96px;display:flex;align-items:center;gap:24px;padding:0 30px;opacity:0"><div style="font:700 40px Chakra;color:#34d399">✔</div><div style="font:600 30px Plex;color:#fff">${T(d[0], d[1])}</div></div>`).join('')}
  <div class="card2" id="go" style="left:1330px;top:300px;width:440px;padding:36px;opacity:0;text-align:center"><div style="font:700 40px Chakra;color:#22d3ee">${T('Su turno', 'Your turn')}</div><div style="font:500 24px Plex;color:#e6eefc;margin-top:12px">${T('Descargue la imagen, siga los pasos y construya su informe.', 'Download the image, follow the steps and build your report.')}</div></div>`,
  frame: a => { for (let i = 0; i < 5; i++) a.show('#d' + i, .03 + i * .06, null, 'left'); a.show('#go', a.c(1), null, 'pop'); } });

window.SCENES = S;
}
