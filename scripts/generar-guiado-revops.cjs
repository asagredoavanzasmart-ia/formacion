// Genera src/data/guiadoRevops.ts para la clase guiada «RevOps».
// Los audios vienen por página (salida/revops/fuentes/<audio>.mp3, con sus palabras en salida/revops/palabras/<audio>.json):
// cada página se alinea con su texto narrado y las páginas se encadenan en un solo audio con una pausa entre ellas.
// Uso: node scripts/generar-guiado-revops.cjs [--audio]   (--audio vuelve a armar src/audios_clase/revops.mp3)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..').split(path.sep).join('/');
const GUION = `${ROOT}/guiones/revops_guiones.txt`;
const CORRECCIONES = `${ROOT}/guiones/revops_correcciones`;
const NARRACION = `${ROOT}/guiones/revops_narracion.txt`;
const FUENTES = `${ROOT}/salida/revops/fuentes`;
const PALABRAS = `${ROOT}/salida/revops/palabras`;
const SALIDA = `${ROOT}/src/data/guiadoRevops.ts`;
const AUDIO = `${ROOT}/src/audios_clase/revops.mp3`;
const FFMPEG = 'C:/Program Files/DownloadHelper CoApp/ffmpeg.exe';
const PAUSA = 0.8;
const esbuild = require(`${ROOT}/node_modules/esbuild`);

const out = esbuild.buildSync({ entryPoints: [`${ROOT}/src/components/revops/indice.ts`], bundle: true, platform: 'node', format: 'cjs', write: false });
const mod = { exports: {} };
new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, require);
const { ORDEN } = mod.exports;

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/(\d)[ .](\d{3})\b/g, '$1$2').replace(/[^a-z0-9ñ]+/g, ' ').trim();
const toks = (s) => norm(s).split(' ').filter(Boolean);

/* Texto narrado de cada página: el guion, salvo las páginas corregidas a partir de lo que dice el audio. */
const textos = {};
fs.readFileSync(GUION, 'utf8').split(/^Página (\d+)\s*\n---\s*\n/m).forEach((x, i, a) => { if (i % 2 === 1) textos[+x] = a[i + 1].trim(); });
if (fs.existsSync(CORRECCIONES)) for (const f of fs.readdirSync(CORRECCIONES)) { const k = +f.replace(/\D/g, ''); textos[k] = fs.readFileSync(`${CORRECCIONES}/${f}`, 'utf8').trim(); }
fs.writeFileSync(NARRACION, Object.keys(textos).sort((a, b) => a - b).map((k) => `Página ${k}\n---\n${textos[k]}\n`).join('\n'));

const lev = (a, b) => { if (a === b) return 0; const m = a.length, n = b.length; if (!m || !n) return Math.max(m, n); let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; };
const sim = (a, b) => (a === b ? 1 : a.length > 3 && b.length > 3 ? 1 - lev(a, b) / Math.max(a.length, b.length) : 0);

/* Alineación global (Needleman–Wunsch) de los tokens del texto G con las palabras del audio A. */
function alinear(G, A, duracion) {
  const N = G.length, M = A.length, W = M + 1;
  const S = new Float32Array((N + 1) * W), T = new Uint8Array((N + 1) * W);
  for (let j = 1; j <= M; j++) { S[j] = -j; T[j] = 2; }
  for (let i = 1; i <= N; i++) {
    S[i * W] = -i; T[i * W] = 1;
    for (let j = 1; j <= M; j++) {
      let best = S[(i - 1) * W + j] - 1, tb = 1;
      const l = S[i * W + j - 1] - 1; if (l > best) { best = l; tb = 2; }
      const s = sim(G[i - 1], A[j - 1].w); const d = S[(i - 1) * W + j - 1] + (s >= 0.75 ? 2 * s : -1); if (d > best) { best = d; tb = 3; }
      S[i * W + j] = best; T[i * W + j] = tb;
    }
  }
  const tG = new Array(N).fill(null), ok = new Array(N).fill(false);
  for (let i = N, j = M; i > 0 || j > 0;) {
    const tb = T[i * W + j];
    if (tb === 3) { if (sim(G[i - 1], A[j - 1].w) >= 0.75) { tG[i - 1] = A[j - 1].t; ok[i - 1] = true; } i--; j--; }
    else if (tb === 1 || j === 0) i--; else j--;
  }
  for (let i = 0; i < N; i++) if (tG[i] == null) {
    let a = i - 1; while (a >= 0 && tG[a] == null) a--;
    let b = i + 1; while (b < N && tG[b] == null) b++;
    const ta = a >= 0 ? tG[a] : 0, tb = b < N ? tG[b] : duracion;
    tG[i] = ta + ((tb - ta) * (i - a)) / (b - a);
  }
  return { tG, ok };
}

const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
const avisos = [], slides = [], cues = {}, marcas = {}, fines = {}, trozos = [];
let reloj = 0;
for (const e of ORDEN) {
  if (!e.audio) { avisos.push(`SIN AUDIO ${e.id}`); continue; }
  const texto = textos[e.pagina];
  if (!texto) { avisos.push(`SIN TEXTO ${e.id} (página ${e.pagina})`); continue; }
  const datos = JSON.parse(fs.readFileSync(`${PALABRAS}/${e.audio}.json`, 'utf8'));
  // Palabras en orden: se descartan las que repite la transcripción al solaparse sus ventanas.
  const pal = []; let ult = -1;
  for (const p of datos.palabras) { if (p.t0 < ult - 0.05) continue; pal.push(p); ult = p.t0; }
  // Tramos que se conservan del audio de la página y su posición en el audio unido.
  const cortes = (e.cortes ?? [[0, datos.duracion]]).map(([a, b]) => [a, Math.min(b, datos.duracion)]);
  const mapa = (t) => { let acc = 0; for (const [a, b] of cortes) { if (t >= a && t <= b) return acc + (t - a); acc += b - a; } return null; };
  const dur = cortes.reduce((s, [a, b]) => s + b - a, 0);
  const A = [];
  for (const p of pal) { const t = mapa(p.t0); if (t == null) continue; const ws = toks(p.w); ws.forEach((w, j) => A.push({ w, t: t + ((p.t1 - p.t0) * j) / ws.length })); }
  const G = toks(texto);
  const { tG, ok } = alinear(G, A, dur);
  const inicio = reloj;
  slides.push({ id: e.id, t: +inicio.toFixed(2) }); fines[e.id] = +(inicio + dur).toFixed(2);
  trozos.push({ audio: e.audio, cortes });
  const buscar = (frase, desde) => {
    const f = toks(frase);
    for (let a = desde; a + f.length <= G.length; a++) if (f.every((w, k) => G[a + k] === w)) return a;
    for (let a = desde; a + f.length <= G.length; a++) if (f.filter((w, k) => sim(G[a + k], w) >= 0.8).length >= Math.max(1, f.length - 1) && sim(G[a], f[0]) >= 0.8) return a;
    return -1;
  };
  const rel = []; let desde = 0;
  for (const f of e.frases) {
    const k = buscar(f, desde);
    if (k < 0) { avisos.push(`NO HALLADA en ${e.id}: ${f}`); rel.push(99999); continue; }
    rel.push(+Math.max(0, tG[k] - 0.2).toFixed(2)); desde = k + 1;
  }
  const kp = buscar(e.pregunta.frase, 0);
  if (kp < 0) avisos.push(`NO HALLADA pregunta en ${e.id}: ${e.pregunta.frase}`);
  rel.push(kp >= 0 ? +Math.max(0, tG[kp] - 0.2).toFixed(2) : 99999);
  marcas[e.id] = rel;
  const lista = [{ t: +(inicio + 0.3).toFixed(2), mostrar: ['titulo'], foco: null }];
  for (const tj of e.tarjetas) {
    const k = buscar(tj.frase, 0);
    if (k < 0) { avisos.push(`NO HALLADA tarjeta en ${e.id}: ${tj.frase}`); continue; }
    lista.push({ t: +(inicio + Math.max(0.4, tG[k] - 0.2)).toFixed(2), mostrar: [`n:${tj.rotulo}`], foco: `n:${tj.rotulo}` });
  }
  if (kp >= 0) lista.push({ t: +(inicio + tG[kp] - 0.2).toFixed(2), foco: null });
  lista.sort((a, b) => a.t - b.t);
  cues[e.id] = lista;
  const casadas = ok.filter(Boolean).length / G.length;
  console.log(e.id.padEnd(22), e.audio.padEnd(5), fmt(inicio).padStart(6), '+', fmt(dur).padStart(5), `${(100 * casadas).toFixed(0)}%`.padStart(5), 'marcas', rel.map((x) => (x > 9999 ? '??' : x.toFixed(1))).join(' '));
  reloj = inicio + dur + PAUSA;
}
if (avisos.length) console.log('\n' + avisos.join('\n'));

if (process.argv.includes('--audio')) {
  const tmp = `${ROOT}/salida/revops/trozos`;
  fs.mkdirSync(tmp, { recursive: true });
  execFileSync(FFMPEG, ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', String(PAUSA), `${tmp}/pausa.wav`]);
  const lista = [];
  trozos.forEach((tr, i) => {
    tr.cortes.forEach(([a, b], j) => {
      const f = `${tmp}/${String(i).padStart(2, '0')}_${j}.wav`;
      execFileSync(FFMPEG, ['-v', 'error', '-y', '-ss', String(a), '-to', String(b), '-i', `${FUENTES}/${tr.audio}.mp3`, '-ar', '24000', '-ac', '1', f]);
      lista.push(`file '${f}'`);
    });
    if (i < trozos.length - 1) lista.push(`file '${tmp}/pausa.wav'`);
  });
  fs.writeFileSync(`${tmp}/lista.txt`, lista.join('\n'));
  execFileSync(FFMPEG, ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', `${tmp}/lista.txt`, '-codec:a', 'libmp3lame', '-b:a', '64k', '-ac', '1', AUDIO]);
  console.log(`\naudio unido en ${path.relative(ROOT, AUDIO)}`);
}

fs.writeFileSync(SALIDA, `import audio from '../audios_clase/revops.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «RevOps»: audio unido de todas las páginas, inicio de cada página y marcas de sus tarjetas.
 * GENERADO por scripts/generar-guiado-revops.cjs desde la narración de cada página alineada con su audio: no editar a mano.
 */
export const guiadoRevops: GuiadoClase = {
  audio,
  slides: ${JSON.stringify(slides)},
  cues: ${JSON.stringify(cues)},
};

/* Segundos desde el inicio de cada página en que entra cada marca de su escena (la última es la pregunta). */
export const marcasRevops: Record<string, number[]> = ${JSON.stringify(marcas)};

/* Fin del tramo de audio de cada página. */
export const finesRevops: Record<string, number> = ${JSON.stringify(fines)};
`);
console.log(`\nescrito ${path.relative(ROOT, SALIDA)} · páginas ${slides.length} · avisos ${avisos.length} · duración ${fmt(reloj)}`);
