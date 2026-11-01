const fs = require('fs');
const dir = 'salida/comunicacion_parte2/';
const seconds = s => { const a=s.split(/[:,]/).map(Number);return a[0]*3600+a[1]*60+a[2]+a[3]/1000; };
const texts = {}, reports=[];
for (const id of [1,2]) {
 const raw=JSON.parse(fs.readFileSync(dir+`raw_${id}.json`,'utf8'));
 const blocks=fs.readFileSync(dir+`comunicacion_${id}.srt`,'utf8').trim().split(/\r?\n\r?\n/);
 const issues=[];let previous=0;texts[id]=[];
 blocks.forEach((b,k)=>{
  const lines=b.split(/\r?\n/), match=lines[1].match(/^(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})$/);
  if(!match)throw Error('Formato de tiempo inválido');
  const start=seconds(match[1]),end=seconds(match[2]),text=lines.slice(2).join(' ');
  if(+lines[0]!==k+1||start<previous||end<=start||end>raw.duration+0.05||lines.length>4||lines.slice(2).some(l=>l.length>42))issues.push({cue:k+1,type:'format',start,end,text});
  if(end-start<0.8||text.length/(end-start)>28)issues.push({cue:k+1,type:'readability',start,end,text});
  previous=end;texts[id].push(text);
 });
 reports.push({file:id,duration:raw.duration,processed:raw.processed,cues:blocks.length,lastSubtitle:previous,issues});
}
const reference=fs.readFileSync(dir+'referencia_audio.txt','utf8').trim().replace(/\s+/g,' ');
const joined=[...texts[2],...texts[1]].join(' ');
const result={reports,completeReferenceCoverage:joined===reference};
fs.writeFileSync(dir+'validacion.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(reports.some(r=>r.issues.length||r.processed<r.duration)||!result.completeReferenceCoverage)process.exitCode=1;
