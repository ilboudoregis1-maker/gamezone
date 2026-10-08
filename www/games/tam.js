G.tam=function(el,A){
el.innerHTML='<canvas></canvas><p class="hint">Touche la bonne piste quand le tambour croise la ligne</p>';
const cv=$("canvas",el),x=cv.getContext("2d"),dpr=Math.min(window.devicePixelRatio||1,2),W=Math.min(innerWidth-20,460),H=Math.max(300,Math.min(innerHeight-190,700));
cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";x.scale(dpr,dpr);
const BPM=139,OFF=.42,bt=60/BPM,hb=bt/2,hy=H-110,LW=W/4,R=LW/2-6,MAXL=7,LIVES=4;
const au=new Audio("games/tam.mp3");
const cols=["#ff3b4a","#ffd426","#18e07a"],fr=[130,165,196,247],CY="#3df2ff";
let notes=[],ps=[],tx=[],cf=[],sc=0,life=LIVES,combo=0,maxc=0,perf=0,hit=0,tot=0,lvl=1,lastL=0,ban=0,st=0,win=false,endAt=0,h=16,pl=0,shake=0,flash=0,gy=0,lf=[0,0,0,0],newRec=false;
let best=+(localStorage.getItem("tambest")||0);
const stars=[];for(let i=0;i<55;i++)stars.push({x:Math.random()*W,y:Math.random()*H,z:.3+Math.random()});
const lane=i=>(i*5+(i>>2)*3+(i>>4))%4,col=i=>(i*2+(i>>2)+(i>>3))%3;
const acc=()=>tot?Math.round(hit/tot*100):0;
function say(s,c,px,py){tx.push({s,c:c||"#ffd426",x:px||W/2,y:py||hy-90,t:1})}
function cheer(){[523,659,784,1047,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.28,"triangle",.22),i*140));
try{const u=new SpeechSynthesisUtterance("Félicitations ! Tu es un maître tambour du Faso !");u.lang="fr-FR";speechSynthesis.speak(u)}catch(e){}}
function fin(w){if(st!=1)return;st=2;win=w;endAt=Date.now();au.pause();
newRec=sc>best&&sc>0;if(newRec){best=sc;try{localStorage.setItem("tambest",best)}catch(e){}}
A.end(sc);
if(w){cheer();for(let i=0;i<140;i++)cf.push({x:Math.random()*W,y:-Math.random()*H*.6,vx:(Math.random()-.5)*2,vy:1.5+Math.random()*3,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:[cols[0],cols[1],cols[2],CY,"#fff"][i%5],s:4+Math.random()*5})}
else beep(110,.5,"sawtooth",.15)}
function begin(){notes=[];ps=[];tx=[];cf=[];sc=0;life=LIVES;combo=0;maxc=0;perf=0;hit=0;tot=0;lvl=1;lastL=0;ban=0;h=16;pl=0;lf=[0,0,0,0];win=false;newRec=false;st=1;A.score(0);au.currentTime=0;au.play().catch(()=>say("Audio bloqué"))}
au.onended=()=>{if(st==1)fin(true)};
function mk(t,l,c,fall){notes.push({t,l,c,x:(l+.5)*LW,y:-99,sp:(hy+60)/fall})}
function spawn(ct,fall){
while(h*hb+OFF<ct+fall){
const t=h*hb+OFF,on=h%2==0,b=h>>1;let add=on;
if(!on)add=lvl>=3&&((b*7+(b>>3))%(lvl>=6?2:3)==0);
if(add){let l=lane(h);if(l==pl)l=(l+1)%4;pl=l;mk(t,l,col(h),fall);
if(on&&((lvl>=4&&b%8==7)||(lvl>=6&&b%4==3)))mk(t,(l+2)%4,col(h+1),fall)}
h++}}
function rr(px,py,w,hh,r){x.beginPath();x.moveTo(px+r,py);x.arcTo(px+w,py,px+w,py+hh,r);x.arcTo(px+w,py+hh,px,py+hh,r);x.arcTo(px,py+hh,px,py,r);x.arcTo(px,py,px+w,py,r);x.closePath()}
function star(cx,cy,r,on){x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;x.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q)}x.closePath();
x.shadowColor=on?"#ffd426":"transparent";x.shadowBlur=on?16:0;x.fillStyle=on?"#ffd426":"rgba(255,255,255,.12)";x.fill();x.shadowBlur=0}
function wrap(s,cx,y,mw,lh){const w=s.split(" ");let l="";for(const k of w){const t=l?l+" "+k:k;if(x.measureText(t).width>mw&&l){x.fillText(l,cx,y);y+=lh;l=k}else l=t}x.fillText(l,cx,y);return y}
function burst(px,py,c,n){for(let i=0;i<n;i++){const a=Math.random()*6.28,v=2+Math.random()*5;ps.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c})}}
function drum(px,py,r,c){
const g=x.createRadialGradient(px-r*.3,py-r*.35,r*.05,px,py,r);g.addColorStop(0,"#fff");g.addColorStop(.28,c);g.addColorStop(1,"rgba(0,0,0,.92)");
x.shadowColor=c;x.shadowBlur=r>12?20:8;x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill();x.shadowBlur=0;
x.lineWidth=Math.max(1.5,r*.12);x.strokeStyle="rgba(255,255,255,.9)";x.beginPath();x.arc(px,py,r*.93,0,7);x.stroke();
if(r<12)return;
x.lineWidth=2;x.strokeStyle=c;x.beginPath();x.arc(px,py,r*.62,0,7);x.stroke();
x.strokeStyle="rgba(0,0,0,.45)";for(let i=0;i<12;i++){const a=i*Math.PI/6;x.beginPath();x.moveTo(px+Math.cos(a)*r*.93,py+Math.sin(a)*r*.93);x.lineTo(px+Math.cos(a+.26)*r*.62,py+Math.sin(a+.26)*r*.62);x.stroke()}
x.fillStyle="rgba(255,255,255,.95)";x.beginPath();x.arc(px,py,r*.1,0,7);x.fill()}
function bg(ct,p){
const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#02040a");g.addColorStop(.6,"#07121c");g.addColorStop(1,"#0a2a1c");x.fillStyle=g;x.fillRect(0,0,W,H);
const sp=st==1?1+lvl*.25:.4;
stars.forEach(s=>{s.y+=s.z*sp;if(s.y>H){s.y=0;s.x=Math.random()*W}x.globalAlpha=.25+.5*s.z;x.fillStyle="#cfeaff";x.fillRect(s.x,s.y,1+s.z,1+s.z*2)});x.globalAlpha=1;
for(let i=0;i<4;i++){if(lf[i]>0){const c=x.createLinearGradient(0,hy-H*.7,0,hy+20);c.addColorStop(0,"rgba(61,242,255,0)");c.addColorStop(1,"rgba(61,242,255,"+lf[i]*.38+")");x.fillStyle=c;x.fillRect(i*LW,hy-H*.7,LW,H*.7+20);lf[i]=Math.max(0,lf[i]-.07)}}
gy=(gy+1.2+lvl*.25)%40;x.lineWidth=1;x.strokeStyle="rgba(61,242,255,"+(.04+.09*p)+")";
for(let y=gy-40;y<H;y+=40){x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke()}
x.strokeStyle="rgba(61,242,255,"+(.16+.28*p)+")";x.shadowColor=CY;x.shadowBlur=6;
for(let i=0;i<=4;i++){x.beginPath();x.moveTo(i*LW,0);x.lineTo(i*LW,H);x.stroke()}x.shadowBlur=0;
const hg=x.createLinearGradient(0,0,W,0);hg.addColorStop(0,cols[0]);hg.addColorStop(.5,cols[1]);hg.addColorStop(1,cols[2]);
x.shadowColor=CY;x.shadowBlur=14+12*p;x.lineWidth=3;x.strokeStyle=hg;x.beginPath();x.moveTo(0,hy);x.lineTo(W,hy);x.stroke();x.shadowBlur=0;
x.setLineDash([5,7]);x.lineWidth=2;x.strokeStyle="rgba(255,255,255,"+(.25+.45*p)+")";
for(let i=0;i<4;i++){x.beginPath();x.arc((i+.5)*LW,hy,R,0,7);x.stroke()}x.setLineDash([])}
function hud(ct){
rr(8,8,W-16,62,16);x.fillStyle="rgba(8,20,30,.62)";x.fill();x.lineWidth=1.5;x.strokeStyle="rgba(61,242,255,.45)";x.stroke();
x.textAlign="left";x.fillStyle="#7fb6c2";x.font="10px monospace";x.fillText("SCORE",20,24);
x.fillStyle="#fff";x.font="bold 26px monospace";x.shadowColor=CY;x.shadowBlur=10;x.fillText(String(sc).padStart(6,"0"),20,48);x.shadowBlur=0;
for(let i=0;i<LIVES;i++){x.globalAlpha=i<life?1:.18;drum(W-24-i*18,58,6,cols[i%3])}x.globalAlpha=1;
x.textAlign="center";x.fillStyle="#7fb6c2";x.font="10px monospace";x.fillText("NIVEAU",W/2,24);
x.fillStyle=CY;x.font="bold 22px monospace";x.shadowColor=CY;x.shadowBlur=10;x.fillText(lvl+"/"+MAXL,W/2,48);x.shadowBlur=0;
const mult=1+Math.min(3,Math.floor(combo/10));
x.textAlign="right";x.fillStyle="#7fb6c2";x.font="10px monospace";x.fillText("COMBO",W-20,24);
x.fillStyle=combo>=10?"#ffd426":"#fff";x.font="bold 22px monospace";x.shadowColor=combo>=10?"#ffd426":"transparent";x.shadowBlur=combo>=10?12:0;x.fillText(combo+" ×"+mult,W-20,44);x.shadowBlur=0;
const dur=au.duration||180,pr=Math.max(0,Math.min(1,ct/dur));
rr(8,76,W-16,5,3);x.fillStyle="rgba(255,255,255,.1)";x.fill();
if(pr>0){const pg=x.createLinearGradient(8,0,W-8,0);pg.addColorStop(0,cols[0]);pg.addColorStop(.5,cols[1]);pg.addColorStop(1,cols[2]);rr(8,76,Math.max(6,(W-16)*pr),5,3);x.fillStyle=pg;x.fill()}}
function endScreen(){
const k=Math.min(1,(Date.now()-endAt)/600),e=1-Math.pow(1-k,3),pw=W-36,ph=win?390:345,px=18,py=Math.max(6,H/2-ph/2-10)+(1-e)*40;
x.globalAlpha=e;
rr(px,py,pw,ph,22);x.fillStyle="rgba(6,16,24,.9)";x.fill();x.lineWidth=2;
const bg2=x.createLinearGradient(px,0,px+pw,0);bg2.addColorStop(0,cols[0]);bg2.addColorStop(.5,cols[1]);bg2.addColorStop(1,cols[2]);x.strokeStyle=bg2;x.shadowColor=win?"#ffd426":CY;x.shadowBlur=18;x.stroke();x.shadowBlur=0;
x.textAlign="center";const cx=W/2;let y=py+52;
x.fillStyle=win?"#ffd426":"#fff";x.font="bold "+(win?30:26)+"px system-ui,sans-serif";x.shadowColor=win?"#ffd426":CY;x.shadowBlur=18;x.fillText(win?"FÉLICITATIONS !":"PARTIE TERMINÉE",cx,y);x.shadowBlur=0;
y+=26;x.fillStyle="#cfe9ef";x.font="15px system-ui,sans-serif";
const n=acc(),stn=win?(n>=85?3:n>=65?2:1):0;
const msg=win?(stn==3?"Maître tambour du Faso, le rythme t'appartient !":stn==2?"Superbe prestation, tu as le rythme dans le sang !":"Bravo, tu as joué jusqu'à la dernière note !"):"Courage ! Le tambour t'attend : vise le niveau "+Math.min(MAXL,lvl+1)+".";
y=wrap(msg,cx,y,pw-40,20);
if(win){y+=34;for(let i=0;i<3;i++)star(cx+(i-1)*44,y,17,i<stn)}
y+=win?36:30;
x.fillStyle="#fff";x.font="bold 34px monospace";x.shadowColor=CY;x.shadowBlur=12;x.fillText(String(sc),cx,y);x.shadowBlur=0;
x.fillStyle="#7fb6c2";x.font="11px monospace";y+=18;x.fillText(newRec?"★ NOUVEAU RECORD ★":"RECORD "+best,cx,y);
if(newRec){x.fillStyle="#ffd426"}
y+=14;const bw=(pw-60)/2,bh=52,L=["PRÉCISION","COMBO MAX","PARFAITS","NIVEAU"],V=[n+"%",maxc,perf,lvl+"/"+MAXL];
for(let i=0;i<4;i++){const bx=px+20+(i%2)*(bw+20),by=y+(i>>1)*(bh+10);rr(bx,by,bw,bh,12);x.fillStyle="rgba(61,242,255,.08)";x.fill();x.lineWidth=1.5;x.strokeStyle="rgba(61,242,255,.45)";x.stroke();
x.textAlign="center";x.fillStyle="#7fb6c2";x.font="12px monospace";x.fillText(L[i],bx+bw/2,by+17);
x.fillStyle="#fff";x.font="bold 24px monospace";x.shadowColor=CY;x.shadowBlur=8;x.fillText(String(V[i]),bx+bw/2,by+43);x.shadowBlur=0}
if(Date.now()-endAt>1200){x.fillStyle="rgba(255,255,255,"+(.55+.45*Math.sin(Date.now()/280))+")";x.font="bold 14px monospace";x.fillText("TOUCHE POUR REJOUER",cx,py+ph-18)}
x.globalAlpha=1}
function startScreen(){
x.fillStyle="rgba(2,8,14,.82)";x.fillRect(0,0,W,H);
drum(W/2,H/2-90,50+Math.sin(Date.now()/250)*4,cols[1]);
x.textAlign="center";x.shadowColor=CY;x.shadowBlur=22;x.fillStyle="#fff";x.font="bold 38px monospace";x.fillText("TAM-TAM",W/2,H/2+4);
x.shadowColor="#ffd426";x.fillStyle="#ffd426";x.font="bold 18px monospace";x.fillText("DU FASO",W/2,H/2+32);x.shadowBlur=0;
x.fillStyle="#9fd3dc";x.font="13px system-ui,sans-serif";x.fillText("7 niveaux : le rythme accélère, les notes doublent.",W/2,H/2+64);
x.fillText("Une erreur de piste coûte des points. "+LIVES+" vies.",W/2,H/2+84);
x.fillStyle="rgba(255,255,255,"+(.6+.4*Math.sin(Date.now()/300))+")";x.font="bold 15px monospace";x.fillText("TOUCHE POUR COMMENCER",W/2,H/2+120)}
(function lp(){requestAnimationFrame(lp);
if(!A.on()){if(!au.paused)au.pause();return}
if(st==1&&au.paused&&!au.ended)au.play().catch(()=>{});
const ct=st==1?au.currentTime:0;
if(st==1){const seg=Math.max(12,((au.duration||180)-8)/MAXL);lvl=Math.min(MAXL,1+Math.floor(Math.max(0,ct-6)/seg));
if(lvl>lastL){if(lastL>0){ban=1.6;beep(660,.18,"triangle",.2);setTimeout(()=>beep(880,.25,"triangle",.2),120)}lastL=lvl}}
const fall=Math.max(1,1.8-.115*(lvl-1));
const p=st==1?1-(((ct-OFF)/bt%1)+1)%1:.3;
x.save();if(shake>0){x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=.85;if(shake<.5)shake=0}
bg(ct,p);
if(st==1)spawn(ct,fall);
notes=notes.filter(n=>{if(st==1&&n.t<ct-.2){life--;tot++;combo=0;shake=14;flash=1;say("RATÉ","#ff3b4a",n.x,hy);beep(80,.2,"sawtooth",.12);if(life<=0)fin(false);return false}return true});
notes.forEach(n=>{n.y=hy-(n.t-ct)*n.sp;drum(n.x,n.y,R,cols[n.c])});
ps=ps.filter(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=.15;q.l-=.03;if(q.l<=0)return false;x.globalAlpha=q.l;x.fillStyle=q.c;x.shadowColor=q.c;x.shadowBlur=8;x.beginPath();x.arc(q.x,q.y,2+q.l*3,0,7);x.fill();return true});x.globalAlpha=1;x.shadowBlur=0;
tx=tx.filter(t=>{t.y-=1.2;t.t-=.025;if(t.t<=0)return false;x.globalAlpha=t.t;x.fillStyle=t.c;x.shadowColor=t.c;x.shadowBlur=10;x.font="bold 22px system-ui,sans-serif";x.textAlign="center";x.fillText(t.s,t.x,t.y);x.shadowBlur=0;return true});x.globalAlpha=1;
if(flash>0){x.fillStyle="rgba(255,59,74,"+flash*.28+")";x.fillRect(0,0,W,H);flash-=.08}
hud(ct);
if(ban>0&&st==1){ban-=.016;x.globalAlpha=Math.min(1,ban);x.textAlign="center";x.fillStyle=CY;x.shadowColor=CY;x.shadowBlur=24;x.font="bold 34px monospace";x.fillText("NIVEAU "+lvl,W/2,H*.36);x.font="13px monospace";x.fillStyle="#fff";x.fillText(lvl>=6?"RYTHME ENDIABLÉ":"LE RYTHME ACCÉLÈRE",W/2,H*.36+24);x.shadowBlur=0;x.globalAlpha=1}
x.restore();
if(st==0)startScreen();
if(st==2){x.fillStyle="rgba(2,6,10,.55)";x.fillRect(0,0,W,H);
if(win){cf=cf.filter(c=>{c.x+=c.vx+Math.sin(c.y/30);c.y+=c.vy;c.r+=c.vr;if(c.y>H+20)return false;x.save();x.translate(c.x,c.y);x.rotate(c.r);x.fillStyle=c.c;x.fillRect(-c.s/2,-c.s/4,c.s,c.s/2);x.restore();return true})}
endScreen()}
})();
cv.style.touchAction="none";
cv.onpointerdown=e=>{
if(st!=1){if(st==0||Date.now()-endAt>1200)begin();return}
const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*W/r.width,l=Math.max(0,Math.min(3,Math.floor(px/LW))),ct=au.currentTime;
lf[l]=1;
let b=null,bd=.24;
notes.forEach(n=>{if(n.l==l){const d=Math.abs(n.t-ct);if(d<bd){bd=d;b=n}}});
if(!b){combo=0;sc=Math.max(0,sc-10);shake=6;say("✕","#8892a0",(l+.5)*LW,hy-30);beep(90,.1,"sawtooth",.1);A.score(sc);return}
notes=notes.filter(n=>n!==b);combo++;hit++;tot++;if(combo>maxc)maxc=combo;
const mult=1+Math.min(3,Math.floor(combo/10)),pf=bd<.07,gd=bd<.14;if(pf)perf++;
sc+=(pf?100:gd?60:25)*mult;
beep(fr[b.l],.14,"triangle",.2);burst(b.x,b.y,cols[b.c],pf?26:16);
say(pf?"PARFAIT":gd?"BIEN":"OK",pf?"#fff":cols[b.c],b.x,b.y);
if(combo>0&&combo%10==0)say("COMBO ×"+(1+Math.min(3,combo/10)),"#ffd426",W/2,hy-120);
A.score(sc)};
};
