// Transcribe con tiempos por palabra el audio de una parte de «Comunicación efectiva» (Whisper base local).
// Uso: node scripts/transcribir-palabras-comunicacion.mjs <audio.mp3> <salida.json>
import { env, pipeline } from 'file:///C:/tmp/audio-transcription/node_modules/@huggingface/transformers/dist/transformers.node.mjs';
import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
const ffmpeg = 'C:/Program Files/DownloadHelper CoApp/ffmpeg.exe';
const [, , entrada, salida] = process.argv;
const run = (a) => new Promise((res, rej) => { const p = spawn(ffmpeg, a); const b = []; let e = ''; p.stdout.on('data', (x) => b.push(x)); p.stderr.on('data', (x) => (e += x)); p.on('close', (c) => (c === 0 ? res(Buffer.concat(b)) : rej(Error(e)))); });
env.allowRemoteModels = false;
const raw = await run(['-v', 'error', '-i', entrada, '-ar', '16000', '-ac', '1', '-f', 'f32le', 'pipe:1']);
const s = new Float32Array(raw.buffer, raw.byteOffset, raw.length / 4);
const dur = s.length / 16000;
let palabras = [], hecho = 0;
try { const g = JSON.parse(await readFile(salida, 'utf8')); palabras = g.palabras; hecho = g.hecho; } catch {}
const m = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', { dtype: 'q8', session_options: { intraOpNumThreads: 4, interOpNumThreads: 1 } });
const VENT = 60;
for (let off = hecho; off < dur; off += VENT) {
  // Ventana de 60 s con 2 s de margen a cada lado; se guardan solo las palabras que empiezan dentro de la ventana.
  const a = Math.max(0, off - 2), b = Math.min(dur, off + VENT + 2);
  const r = await m(s.slice(Math.round(a * 16000), Math.round(b * 16000)), { chunk_length_s: 30, stride_length_s: 5, return_timestamps: 'word', language: 'spanish', task: 'transcribe' });
  for (const c of r.chunks) {
    const t0 = (c.timestamp[0] ?? 0) + a, t1 = (c.timestamp[1] ?? c.timestamp[0] ?? 0) + a;
    if (t0 >= off && t0 < off + VENT) palabras.push({ w: c.text.trim(), t0: +t0.toFixed(2), t1: +t1.toFixed(2) });
  }
  hecho = Math.min(dur, off + VENT);
  await writeFile(salida, JSON.stringify({ duracion: dur, hecho, palabras }));
  console.log(`${hecho.toFixed(0)} / ${dur.toFixed(0)} s · ${palabras.length} palabras`);
}
