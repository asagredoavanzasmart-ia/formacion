import { env, pipeline } from 'file:///C:/tmp/audio-transcription/node_modules/@huggingface/transformers/dist/transformers.node.mjs';
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const out = new URL('../salida/comunicacion/', import.meta.url);
await mkdir(out, {recursive:true});
const ffmpeg='C:/Program Files/DownloadHelper CoApp/ffmpeg.exe';
const files=['comunicaciónGenerated Audio October 31, 2026 - 12_52PM (1).wav','comunicación 2Generated Audio October 31, 2026 - 12_52PM.wav'];
function run(args) { return new Promise((resolve,reject)=> {const p=spawn(ffmpeg,args); const bufs=[];let err='';p.stdout.on('data',b=>bufs.push(b));p.stderr.on('data',b=>err+=b);p.on('close',c=>c===0?resolve(Buffer.concat(bufs)):reject(Error(err))); }); }
for(let i=0;i<files.length;i++) {
 try { await access(new URL(`comunicacion_${i+1}.mp3`,out)); continue; } catch {}
 await run(['-v','error','-n','-i','C:/Users/arsag/Downloads/'+files[i],'-codec:a','libmp3lame','-q:a','2',fileURLToPath(new URL(`comunicacion_${i+1}.mp3`,out))]);
 console.log('MP3 listo',i+1);
}
env.allowRemoteModels=false;
const model=await pipeline('automatic-speech-recognition','Xenova/whisper-base',{dtype:'q8',session_options:{intraOpNumThreads:4,interOpNumThreads:1}});
for(let i=0;i<files.length;i++) {
 const raw=await run(['-v','error','-i','C:/Users/arsag/Downloads/'+files[i],'-ar','16000','-ac','1','-f','f32le','pipe:1']);
 const samples=new Float32Array(raw.buffer,raw.byteOffset,raw.length/4);
 let chunks=[],resume=0;
 try { const saved=JSON.parse(await readFile(new URL(`raw_${i+1}.json`,out),'utf8'));chunks=saved.chunks;resume=saved.processed??Math.ceil(chunks.at(-1).timestamp[1]/120)*120; } catch {}
 for(let off=resume*16000;off<samples.length;off+=16000*120) {
  const result=await model(samples.slice(off,off+16000*120),{chunk_length_s:30,stride_length_s:5,return_timestamps:true,language:'spanish',task:'transcribe'});
  chunks.push(...result.chunks.map(c=>({...c,timestamp:c.timestamp.map(t=>t===null?null:t+off/16000)})));
  await writeFile(new URL(`raw_${i+1}.json`,out),JSON.stringify({duration:samples.length/16000,processed:Math.min(samples.length/16000,off/16000+120),chunks},null,2));
  console.log(`Audio ${i+1}: ${Math.min(samples.length/16000,off/16000+120).toFixed(0)} / ${(samples.length/16000).toFixed(0)} s`);
 }
}
