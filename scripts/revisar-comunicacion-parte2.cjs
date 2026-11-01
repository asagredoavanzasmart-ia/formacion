const fs=require('fs');
const dir='salida/comunicacion_parte2/';
let reference=fs.readFileSync('guiones/comunicacion_parte2_relator.txt','utf8').trim();
// Repetición presente en el WAV, confirmada con dos reconocimientos independientes.
const repeat='hacer o dejar de hacer en reuniones y con clientes?». ¿Y hacia dónde va? ¿Qué quiere él que cambie y por qué? Tras conversarlo, Kara podría concluir que es menos asertiva que otros, pero que no quiere cambiar: sus referentes en ventas son personas calladas, humildes y profundamente curiosas por las necesidades del cliente, muy distintas del vendedor agresivo que Johann tiene en mente. El quinto paso es pedir una sola cosa. Una pregunta enorme como «¿tienes algún comentario para mí?» invita a la crítica sin foco; mejor preguntar: «¿qué es lo que me ves ';
reference=reference.replace('mejor preguntar: «¿qué es lo que me ves ', 'mejor preguntar: «¿qué es lo que me ves '+repeat);
fs.writeFileSync(dir+'referencia_audio.txt',reference,'utf8');
const ref=reference.split(/\s+/);
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const rw=ref.map(norm);
const stamp=t=>{let ms=Math.round(t*1000);const h=Math.floor(ms/3600000);ms%=3600000;const m=Math.floor(ms/60000);ms%=60000;return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(Math.floor(ms/1000)).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`;};
for(const id of process.argv.slice(2).map(Number)){
 const data=JSON.parse(fs.readFileSync(dir+`raw_${id}.json`,'utf8'));
 if(id===1){
  const repair=JSON.parse(fs.readFileSync(dir+'reparacion_1_588.json','utf8')).filter(c=>c.timestamp[0]>=613.2&&c.timestamp[0]<669.72);
  data.chunks=[...data.chunks.filter(c=>c.timestamp[0]<611.3),{timestamp:[611.3,613.2],text:'Debe averiguar de dónde viene,'},...repair,...data.chunks.filter(c=>c.timestamp[0]>=669.72)];
 }
 data.chunks=data.chunks.filter(c=>!((c.timestamp[1]-c.timestamp[0])<1.5&&c.text.trim().split(/\s+/).length/Math.max(0.01,c.timestamp[1]-c.timestamp[0])>12));
 const aw=[],ranges=[];
 for(const c of data.chunks){const start=aw.length;aw.push(...c.text.trim().split(/\s+/).map(norm));ranges.push([start,aw.length]);}
 const n=aw.length,m=rw.length,W=m+1,trace=new Uint8Array((n+1)*W);
 let prev=new Uint16Array(W),cur=new Uint16Array(W);
 for(let i=1;i<=n;i++){
  cur[0]=i;trace[i*W]=1;
  for(let j=1;j<=m;j++){
   const sub=prev[j-1]+(aw[i-1]===rw[j-1]?0:1),del=prev[j]+1,ins=cur[j-1]+1;
   if(sub<=del&&sub<=ins){cur[j]=sub;trace[i*W+j]=0;}else if(del<=ins){cur[j]=del;trace[i*W+j]=1;}else{cur[j]=ins;trace[i*W+j]=2;}
  }[prev,cur]=[cur,prev];
 }
 let j=1;for(let k=2;k<=m;k++)if(prev[k]<prev[j])j=k;
 const last=j,score=prev[j],map=new Int32Array(n).fill(-1);let i=n;
 while(i>0){const d=trace[i*W+j];if(d===0){map[i-1]=j-1;i--;j--;}else if(d===1)i--;else j--;}
 const first=j;const cues=[],timed=[],audit=[];let cursor=first;
 for(let k=0;k<data.chunks.length;k++){
  const c=data.chunks[k], [a,b]=ranges[k];let end=cursor;
  for(let x=a;x<b;x++)if(map[x]>=0)end=Math.max(end,map[x]+1);
  if(k===data.chunks.length-1)end=last;
  const words=ref.slice(cursor,end);cursor=end;if(!words.length)continue;
  let start=c.timestamp[0],stop=c.timestamp[1]??data.duration;
  if(stop<=start){audit.push({k,error:'Invalid time',c});continue;}
  const text=words.join(' '),matches=Array.from(map.slice(a,b)).filter((r,x)=>r>=0&&aw[a+x]===rw[r]).length;
  if(matches/Math.max(b-a,words.length)<0.65)audit.push({k,time:start,heard:c.text,reference:text,match:matches/Math.max(b-a,words.length)});
  const total=words.reduce((s,w)=>s+w.length+1,0);let acc=0;
  for(const w of words){const s=start+(stop-start)*acc/total;acc+=w.length+1;timed.push({start:s,end:start+(stop-start)*acc/total,text:w});}
 }
 function wrap(ws){const text=ws.map(w=>w.text).join(' ');if(text.length<=42)return text;let best=null,score=Infinity;for(let q=1;q<ws.length;q++){const a=ws.slice(0,q).map(w=>w.text).join(' '),b=ws.slice(q).map(w=>w.text).join(' ');if(a.length<=42&&b.length<=42&&Math.abs(a.length-b.length)<score){best=a+'\n'+b;score=Math.abs(a.length-b.length);}}return best;}
 for(let a=0;a<timed.length;){let b=a+1;while(b<timed.length){const curr=timed.slice(a,b),text=curr.map(w=>w.text).join(' ');if(((text.length>=35&&/[.!?;»]$/.test(curr.at(-1).text))||(text.length>=55&&/,$/.test(curr.at(-1).text)))&&timed[b-1].end-timed[a].start>=1.3)break;if(!wrap(timed.slice(a,b+1))||timed[b].end-timed[a].start>6.5)break;b++;}if(b<timed.length)while(b>a+5&&/^(de|la|el|los|las|un|una|y|o|por|con|a|en|que|su|tus|sus)$/i.test(timed[b-1].text))b--;const ws=timed.slice(a,b);cues.push({start:ws[0].start,end:ws.at(-1).end,text:wrap(ws)});a=b;}
 for(let k=0;k<cues.length-1;k++)cues[k].end=Math.min(cues[k].end,cues[k+1].start);
 fs.writeFileSync(dir+`comunicacion_${id}.srt`,'\ufeff'+cues.map((c,k)=>`${k+1}\n${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}\n`).join('\n'),'utf8');
 fs.writeFileSync(dir+`revision_${id}.json`,JSON.stringify({words:aw.length,referenceWords:last-first,errorRate:score/n,first:ref.slice(first,first+20).join(' '),last:ref.slice(last-20,last).join(' '),cues:cues.length,audit},null,2));
 console.log(id,{words:aw.length,referenceWords:last-first,errorRate:score/n,cues:cues.length,audit:audit.length});
}
