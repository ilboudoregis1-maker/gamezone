G.ter=function(el,A){
const M=4,cols=["#ff3b4a","#ffd426","#18e07a","#3df2ff"],nm=["Rouge","Jaune","Vert","Cyan"];
let n=2,p=0,L={},B=[],sc=[],fr=[],tot=(A.load()||{}).tot||0;
function menu(){el.innerHTML='<div class="nrow"><span>Territoire</span><span>2 à 4 joueurs</span></div><p class="hint">Trace un trait entre deux points. Ferme un carré pour le capturer et rejouer.</p><div class="pick"><button class="btn sm" data-n="2">2 joueurs</button><button class="btn sm" data-n="3">3 joueurs</button><button class="btn sm" data-n="4">4 joueurs</button></div>';
el.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>start(+b.dataset.n))}
function start(k){n=k;p=0;L={};B=Array(M*M).fill(-1);sc=Array(k).fill(0);fr=[];draw()}
const box=(r,c)=>["h"+r+"_"+c,"h"+(r+1)+"_"+c,"v"+r+"_"+c,"v"+r+"_"+(c+1)].every(q=>L[q]!==undefined);
const fin=()=>B.every(b=>b>=0);
function click(t,r,c){const q=t+r+"_"+c;if(L[q]!==undefined||fin())return;L[q]=p;let got=0;fr=[];
const cand=t=="h"?[[r-1,c],[r,c]]:[[r,c-1],[r,c]];
cand.forEach(a=>{const y=a[0],z=a[1];if(y>=0&&z>=0&&y<M&&z<M&&B[y*M+z]<0&&box(y,z)){B[y*M+z]=p;sc[p]++;got++;fr.push(y*M+z)}});
beep(got?740:330,.08,"triangle");
if(fin()){tot++;A.save({tot});A.score(tot);A.end(tot);beep(988,.25,"triangle")}else if(!got)p=(p+1)%n;
draw()}
function draw(){const S0=64,o=22,Z=o*2+S0*M,done=fin();
const ln=(t,r,c,x1,y1,x2,y2)=>{const d=L[t+r+"_"+c],a='x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke-linecap="round"';
return '<line '+a+' stroke="'+(d>=0?cols[d]:"#17343a")+'" stroke-width="'+(d>=0?6:3)+'"'+(d>=0?' filter="url(#gl)"':"")+'/>'+(d===undefined?'<line '+a+' data-k="'+t+","+r+","+c+'" stroke="transparent" stroke-width="30"/>':"")};
let s='<div class="sc">'+sc.map((v,i)=>{const on=i==p&&!done;return '<span class="chip" style="background:rgba(0,0,0,.45);color:'+cols[i]+";border-color:"+cols[i]+";box-shadow:"+(on?"0 0 16px "+cols[i]+",inset 0 0 10px "+cols[i]+"66":"none")+";opacity:"+(on||done?1:.55)+'">'+nm[i]+" "+v+"</span>"}).join("")+"</div>";
s+='<svg class="tsv" viewBox="0 0 '+Z+" "+Z+'" style="background:#060b0e;border:1px solid rgba(61,242,255,.35);border-radius:16px;box-shadow:0 0 22px rgba(61,242,255,.18)"><defs><filter id="gl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><style>@keyframes tp{from{opacity:0;transform:scale(.6)}}.fx{animation:tp .35s;transform-box:fill-box;transform-origin:center}</style>';
B.forEach((b,i)=>{if(b>=0){const r=i/M|0,c=i%M;s+='<rect class="'+(fr.indexOf(i)>=0?"fx":"")+'" x="'+(o+c*S0+6)+'" y="'+(o+r*S0+6)+'" width="'+(S0-12)+'" height="'+(S0-12)+'" rx="9" fill="'+cols[b]+'" fill-opacity=".25" stroke="'+cols[b]+'" stroke-width="2" filter="url(#gl)"/>'}});
for(let r=0;r<=M;r++)for(let c=0;c<M;c++)s+=ln("h",r,c,o+c*S0,o+r*S0,o+(c+1)*S0,o+r*S0);
for(let r=0;r<M;r++)for(let c=0;c<=M;c++)s+=ln("v",r,c,o+c*S0,o+r*S0,o+c*S0,o+(r+1)*S0);
for(let r=0;r<=M;r++)for(let c=0;c<=M;c++)s+='<circle cx="'+(o+c*S0)+'" cy="'+(o+r*S0)+'" r="5" fill="#d8fbff" filter="url(#gl)" pointer-events="none"/>';
s+="</svg>";
if(done){const mx=Math.max(...sc);s+='<p class="hint" style="font-size:18px;color:#3df2ff;text-shadow:0 0 12px #3df2ff"><b>Victoire : '+nm.slice(0,n).filter((_,i)=>sc[i]==mx).join(" et ")+"</b></p>"}
el.innerHTML=s+'<button class="btn sm mb">Menu</button>';
el.querySelector("svg").onclick=e=>{const k=e.target.dataset&&e.target.dataset.k;if(k){const a=k.split(",");click(a[0],+a[1],+a[2])}};
$(".mb",el).onclick=menu}
menu();
};
