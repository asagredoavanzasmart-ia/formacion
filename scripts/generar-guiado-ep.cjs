// Genera src/data/guiadoEP.ts: alinea el guion de «Enamórate del problema, no de la solución» con las palabras del audio
// y ubica cada frase ancla de las páginas en el texto del guion. Uso: node scripts/generar-guiado-ep.cjs
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..').split(path.sep).join('/');
const GUION = `${ROOT}/guiones/ep_relator.txt`;
const PALABRAS = `${ROOT}/salida/enamorate/palabras/ep.json`;
const SALIDA = `${ROOT}/src/data/guiadoEP.ts`;
const esbuild = require(`${ROOT}/node_modules/esbuild`);

const out = esbuild.buildSync({ entryPoints: [`${ROOT}/src/components/ep/indice.ts`], bundle: true, platform: 'node', format: 'cjs', write: false });
const mod = { exports: {} };
new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, require);
const { ORDEN } = mod.exports;

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/(\d)[ .](\d{3})\b/g, '$1$2').replace(/[^a-z0-9ñ]+/g, ' ').trim();
const toks = (s) => norm(s).split(' ').filter(Boolean);

// Guion: párrafos (secciones) y tokens con su párrafo.
const pars = fs.readFileSync(GUION, 'utf8').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const G = [], inicioPar = [];
pars.forEach((p, k) => { inicioPar.push(G.length); for (const w of toks(p)) G.push({ w, par: k }); });
inicioPar.push(G.length);

// Audio: palabras con su tiempo de inicio.
const { palabras, duracion } = JSON.parse(fs.readFileSync(PALABRAS, 'utf8'));
const A = [];
for (const p of palabras) { const ws = toks(p.w); ws.forEach((w, j) => A.push({ w, t: p.t0 + ((p.t1 - p.t0) * j) / ws.length })); }

// Alineación global en banda (Needleman–Wunsch) con coincidencia difusa.
const lev = (a, b) => { if (a === b) return 0; const m = a.length, n = b.length; if (!m || !n) return Math.max(m, n); let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; };
const sim = (a, b) => (a === b ? 1 : a.length > 3 && b.length > 3 ? 1 - lev(a, b) / Math.max(a.length, b.length) : 0);
const N = G.length, M = A.length, B = Math.max(500, Math.abs(N - M) + 300), WB = 2 * B + 1;
const S = new Float32Array((N + 1) * WB).fill(-1e9), T = new Uint8Array((N + 1) * WB);
const idx = (i, j) => { const c = Math.round((i * M) / N); const o = j - c + B; return o < 0 || o >= WB ? -1 : i * WB + o; };
S[idx(0, 0)] = 0;
for (let j = 1; j <= Math.min(M, B); j++) { const k = idx(0, j); if (k >= 0) { S[k] = -j; T[k] = 2; } }
for (let i = 1; i <= N; i++) {
  const c = Math.round((i * M) / N);
  for (let j = Math.max(0, c - B); j <= Math.min(M, c + B); j++) {
    const k = idx(i, j); let best = -1e9, tb = 0;
    const ku = idx(i - 1, j); if (ku >= 0 && S[ku] - 1 > best) { best = S[ku] - 1; tb = 1; }
    if (j > 0) {
      const kl = idx(i, j - 1); if (kl >= 0 && S[kl] - 1 > best) { best = S[kl] - 1; tb = 2; }
      const kd = idx(i - 1, j - 1); if (kd >= 0) { const s = sim(G[i - 1].w, A[j - 1].w); const v = S[kd] + (s >= 0.75 ? 2 * s : -1); if (v > best) { best = v; tb = 3; } }
    }
    S[k] = best; T[k] = tb;
  }
}
const tG = new Array(N).fill(null), ok = new Array(N).fill(false);
for (let i = N, j = M; i > 0 || j > 0;) {
  const k = idx(i, j), tb = T[k];
  if (tb === 3) { if (sim(G[i - 1].w, A[j - 1].w) >= 0.75) { tG[i - 1] = A[j - 1].t; ok[i - 1] = true; } i--; j--; }
  else if (tb === 1) i--; else j--;
}
// Palabras del guion sin pareja: se interpolan entre las vecinas casadas.
for (let i = 0; i < N; i++) if (tG[i] == null) {
  let a = i - 1; while (a >= 0 && tG[a] == null) a--;
  let b = i + 1; while (b < N && tG[b] == null) b++;
  const ta = a >= 0 ? tG[a] : 0, tb = b < N ? tG[b] : duracion;
  tG[i] = ta + ((tb - ta) * (i - a)) / (b - a);
}
console.log(`palabras del guion casadas: ${((100 * ok.filter(Boolean).length) / N).toFixed(1)} %`);

// Busca una frase dentro del rango de tokens [a0, a1), a partir de `desde`; devuelve el índice del primer token.
const buscar = (frase, a0, a1, desde) => {
  const f = toks(frase); a0 = Math.max(desde, a0);
  for (let a = a0; a + f.length <= a1; a++) if (f.every((w, k) => G[a + k].w === w)) return a;
  for (let a = a0; a + f.length <= a1; a++) if (f.filter((w, k) => sim(G[a + k].w, w) >= 0.8).length >= Math.max(1, f.length - 1) && sim(G[a].w, f[0]) >= 0.8) return a;
  return -1;
};
const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

// Una sección puede tener varios párrafos: va desde el que empieza con `inicio` hasta el inicio de la sección siguiente.
const parDe = ORDEN.map((e) => pars.findIndex((p) => norm(p).startsWith(norm(e.inicio))));
const avisos = [], slides = [], cues = {}, marcas = {}, fines = {};
ORDEN.forEach((e, i) => {
  const par = parDe[i];
  if (par < 0) { avisos.push(`NO HALLADA sección de ${e.id}: ${e.inicio}`); return; }
  const a0 = inicioPar[par], a1 = i + 1 < ORDEN.length && parDe[i + 1] >= 0 ? inicioPar[parDe[i + 1]] : N;
  const t = +(tG[a0] - 0.15).toFixed(2);
  const fin = a1 < N ? +(tG[a1] - 0.15).toFixed(2) : +duracion.toFixed(2);
  slides.push({ id: e.id, t }); fines[e.id] = fin;
  const rel = []; let desde = a0;
  for (const f of e.frases) {
    const k = buscar(f, a0, a1, desde);
    if (k < 0) { avisos.push(`NO HALLADA en ${e.id}: ${f}`); rel.push(99999); continue; }
    rel.push(+(tG[k] - 0.2 - t).toFixed(2)); desde = k + 1;
  }
  const kp = buscar(e.pregunta.frase, a0, a1, a0);
  if (kp < 0) avisos.push(`NO HALLADA pregunta en ${e.id}: ${e.pregunta.frase}`);
  const tPreg = kp >= 0 ? +(tG[kp] - 0.2).toFixed(2) : null;
  rel.push(tPreg != null ? +(tPreg - t).toFixed(2) : 99999);
  marcas[e.id] = rel;
  const lista = [{ t: +(t + 0.3).toFixed(2), mostrar: ['titulo'], foco: null }];
  for (const tj of e.tarjetas) {
    const k = buscar(tj.frase, a0, a1, a0);
    if (k < 0) { avisos.push(`NO HALLADA tarjeta en ${e.id}: ${tj.frase}`); continue; }
    lista.push({ t: +(tG[k] - 0.2).toFixed(2), mostrar: [`n:${tj.rotulo}`], foco: `n:${tj.rotulo}` });
  }
  if (tPreg != null) lista.push({ t: tPreg, foco: null });
  lista.sort((a, b) => a.t - b.t);
  cues[e.id] = lista;
  const casadas = ok.slice(a0, a1).filter(Boolean).length / (a1 - a0);
  console.log(e.id.padEnd(24), fmt(t).padStart(6), '→', fmt(fin).padStart(6), `${(100 * casadas).toFixed(0)}%`.padStart(5), 'marcas', rel.map((x) => (x > 9999 ? '??' : x.toFixed(1))).join(' '));
});
if (avisos.length) console.log('\n' + avisos.join('\n'));

fs.writeFileSync(SALIDA, `import audio from '../audios_clase/enamorate-problema.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «Enamórate del problema, no de la solución»: audio completo, inicio de cada página y marcas de sus
 * tarjetas. GENERADO por scripts/generar-guiado-ep.cjs desde el guion alineado con las palabras
 * del audio (${path.relative(ROOT, PALABRAS).split(path.sep).join('/')}): no editar a mano.
 */
export const guiadoEP: GuiadoClase = {
  audio,
  slides: ${JSON.stringify(slides)},
  cues: ${JSON.stringify(cues)},
};

/* Segundos desde el inicio de cada página en que entra cada marca de su escena (la última es la pregunta). */
export const marcasEP: Record<string, number[]> = ${JSON.stringify(marcas)};

/* Fin del tramo de audio de cada página (inicio de la sección siguiente del guion). */
export const finesEP: Record<string, number> = ${JSON.stringify(fines)};
`);
console.log(`\nescrito ${path.relative(ROOT, SALIDA)} · páginas ${slides.length} · avisos ${avisos.length}`);
