/* Labyrinthe Faso v2 — murs 3D high-tech, musique de fond, difficulté progressive
   Niveau 1-2 : labyrinthe + brouillard
   Niveau 3+  : drones sentinelles rouges (te renvoient au départ, -25 pts)
   Niveau 5+  : clés à ramasser (dans les impasses) avant que la sortie s'ouvre
   Niveau 8+  : boucles dans le labyrinthe (plusieurs chemins = plus de confusion)
   Chaque niveau : labyrinthe plus grand (max 18x18), vision plus courte, drones plus rapides, musique plus rapide */
G.lab=function(el,A){
el.innerHTML='<div class="nrow"><span class="l"></span><span class="k"></span><span class="t"></span><button class="mu" aria-label="Musique" style="background:none;border:1px solid rgba(61,242,255,.45);color:#3df2ff;border-radius:10px;padding:0 9px;font-size:14px;line-height:22px">&#9834;</button></div><canvas class="nx"></canvas><p class="hint">Glisse le doigt : la bille te suit. Ramasse les clés, évite les drones rouges, rejoins l\'anneau.</p>';
const Z=Math.max(240,Math.min(innerWidth-24,440,innerHeight-230)),PAD=Math.round(Z*.07),
cv=$("canvas",el),x=cv.getContext("2d"),dpr=Math.min(window.devicePixelRatio||1,2);
cv.width=Z*dpr;cv.height=(Z+PAD)*dpr;
cv.style.cssText="width:"+Z+"px;height:"+(Z+PAD)+"px;border-radius:26px;background:radial-gradient(circle at 50% 35%,#10202e,#070b10 78%);border:1px solid rgba(61,242,255,.35);box-shadow:0 0 26px rgba(61,242,255,.18),0 18px 40px rgba(0,0,0,.45);touch-action:none";
x.scale(dpr,dpr);el.style.touchAction="none";
const D=[[0,-1],[1,0],[0,1],[-1,0]],SP=7.5,OY=PAD;
let n,lvl=1,sc=0,w,ax,ay,d,p,fx,fy,t0,cell,H,TH,done=false,segs=[],seenS=[],seenC=[],tr=[],want=-1,wu=0,held=false,wt=0,lt=performance.now(),
keys=[],got=0,sent=[],grace=0,flash=0,bn=null,lockMsg=0;
const s0=A.load();if(s0){lvl=s0.lvl||1;sc=s0.sc||0}
const open=(c,i)=>!w[c][i];
const VR=()=>Math.max(2.3,4.3-lvl*.11);

/* ================= MUSIQUE (synthétisée, aucun fichier) ================= */
const mus=(function(){
let ctx,master,bus,timer,step=0,next=0,noise,muted=!!(s0&&s0.mu);
const AR=[220,261.63,293.66,329.63,392,440,523.25,587.33,659.25],
PT=[5,-1,7,6,5,-1,3,4, 4,-1,6,5,4,-1,2,3, 2,-1,4,3,2,-1,0,1, 3,-1,5,4,3,5,8,7],
BS=[110,87.31,98,82.41];
function env(g,t,a,pk,dec){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec)}
function tone(f,t,type,pk,dec,dest){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;env(g,t,.006,pk,dec);o.connect(g);g.connect(dest);o.start(t);o.stop(t+dec+.1)}
function kick(t,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(48,t+.12);env(g,t,.004,v,.26);o.connect(g);g.connect(master);o.start(t);o.stop(t+.4)}
function hat(t,v){const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noise;f.type="highpass";f.frequency.value=6500;env(g,t,.002,v,.05);s.connect(f);f.connect(g);g.connect(master);s.start(t);s.stop(t+.12)}
function ev(i,t){
const z=Math.min(1,lvl/12),bar=(i>>3)&3,s=i&7,a=PT[i%32];
if(a>=0){const f=AR[a];tone(f,t,"triangle",.15,.55,bus);tone(f*2,t,"sine",.05,.3,bus)}
else if(lvl>=6)tone(AR[(bar*2+4)%9]*2,t,"sine",.035,.25,bus);
if(s==0){tone(BS[bar],t,"sine",.5,.95,master);kick(t,.36)}
if(s==4)kick(t,.1+.2*z);
if(s==6&&lvl>=4)tone(BS[bar]*1.5,t,"triangle",.12,.3,master);
if(s&1)hat(t,.02+.04*z)}
function sched(){if(!ctx)return;const bpm=84+Math.min(lvl,24)*1.6;while(next<ctx.currentTime+.25){ev(step++,next);next+=60/bpm/2}}
function setup(){
ctx=new(window.AudioContext||window.webkitAudioContext)();
master=ctx.createGain();master.gain.value=muted?0:.55;
const cp=ctx.createDynamicsCompressor();master.connect(cp);cp.connect(ctx.destination);
bus=ctx.createGain();const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2600;bus.connect(lp);lp.connect(master);
const dl=ctx.createDelay(1),fb=ctx.createGain(),wet=ctx.createGain();dl.delayTime.value=.375;fb.gain.value=.34;wet.gain.value=.4;
lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master);
noise=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.1),ctx.sampleRate);const nd=noise.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
const dg=ctx.createGain(),df=ctx.createBiquadFilter();dg.gain.value=.05;df.type="lowpass";df.frequency.value=420;
[110,164.81].forEach(f=>{const o=ctx.createOscillator();o.type="triangle";o.frequency.value=f;o.connect(df);o.start()});
df.connect(dg);dg.connect(master);
next=ctx.currentTime+.15;timer=setInterval(sched,80)}
return{
start(){try{if(!ctx)setup();if(ctx.state=="suspended")ctx.resume()}catch(e){}},
sync(on){if(!ctx)return;try{if(on&&ctx.state=="suspended")ctx.resume();else if(!on&&ctx.state=="running")ctx.suspend()}catch(e){}},
toggle(){muted=!muted;if(ctx)master.gain.setTargetAtTime(muted?0:.55,ctx.currentTime,.05);return muted},
muted:()=>muted}})();
const mb=$(".mu",el);
function mbUp(){mb.style.opacity=mus.muted()?.4:1;mb.style.textDecoration=mus.muted()?"line-through":"none"}
mb.onclick=e=>{e.stopPropagation();mus.start();mus.toggle();mbUp();persist()};mb.onpointerdown=e=>e.stopPropagation();mbUp();
mus.start();
function persist(){A.save({lvl,sc,mu:mus.muted()})}

/* ================= GÉNÉRATION ================= */
function bfs(s){const dd=Array(n*n).fill(-1),q=[s];dd[s]=0;
for(let h=0;h<q.length;h++){const c=q[h];for(let i=0;i<4;i++)if(!w[c][i]){const nc=((c/n|0)+D[i][1])*n+c%n+D[i][0];if(dd[nc]<0){dd[nc]=dd[c]+1;q.push(nc)}}}return dd}
function gen(){
n=Math.min(5+lvl,18);w=Array.from({length:n*n},()=>[1,1,1,1]);
const sn=Array(n*n).fill(0),st=[0];sn[0]=1;
while(st.length){const c=st[st.length-1],cx=c%n,cy=c/n|0,o=[];
D.forEach((q,i)=>{const nx=cx+q[0],ny=cy+q[1];if(nx>=0&&ny>=0&&nx<n&&ny<n&&!sn[ny*n+nx])o.push(i)});
if(!o.length){st.pop();continue}
const i=o[Math.random()*o.length|0],nc=(cy+D[i][1])*n+cx+D[i][0];w[c][i]=0;w[nc][(i+2)%4]=0;sn[nc]=1;st.push(nc)}
if(lvl>=8){let k=Math.floor(n*n*.035*Math.min(lvl-7,6)),g=0;
while(k>0&&g++<2000){const c=Math.random()*n*n|0,i=Math.random()*4|0,nx=c%n+D[i][0],ny=(c/n|0)+D[i][1];
if(nx<0||ny<0||nx>=n||ny>=n||!w[c][i])continue;w[c][i]=0;w[ny*n+nx][(i+2)%4]=0;k--}}
cell=Z/n;H=Math.min(13,cell*.3);TH=Math.max(3,cell*.14);
segs=[];
for(let i=0;i<n*n;i++){const cx=i%n,cy=i/n|0,c=w[i];
if(c[0])segs.push({x0:cx*cell-TH/2,y0:cy*cell-TH/2,x1:(cx+1)*cell+TH/2,y1:cy*cell+TH/2,mx:cx+.5,my:cy});
if(c[3])segs.push({x0:cx*cell-TH/2,y0:cy*cell-TH/2,x1:cx*cell+TH/2,y1:(cy+1)*cell+TH/2,mx:cx,my:cy+.5});
if(cx==n-1&&c[1])segs.push({x0:n*cell-TH/2,y0:cy*cell-TH/2,x1:n*cell+TH/2,y1:(cy+1)*cell+TH/2,mx:n,my:cy+.5});
if(cy==n-1&&c[2])segs.push({x0:cx*cell-TH/2,y0:n*cell-TH/2,x1:(cx+1)*cell+TH/2,y1:n*cell+TH/2,mx:cx+.5,my:n})}
segs.sort((a,b)=>a.y1-b.y1||a.x0-b.x0);
seenS=Array(segs.length).fill(0);seenC=Array(n*n).fill(0);
ax=0;ay=0;d=-1;p=0;fx=.5;fy=.5;want=-1;tr=[];wt=0;got=0;grace=0;flash=0;
const dist=bfs(0),ex=n*n-1;
// clés : dans les impasses éloignées
keys=[];const nk=lvl>=5?Math.min(3,1+((lvl-5)/4|0)):0;
if(nk){let pool=[];for(let i=1;i<n*n-1;i++){const op=w[i].filter(v=>!v).length;if(op==1&&dist[i]>=Math.max(4,n*.6|0))pool.push(i)}
if(pool.length<nk)for(let i=1;i<n*n-1;i++)if(dist[i]>=3&&!pool.includes(i))pool.push(i);
while(keys.length<nk&&pool.length){const j=Math.random()*pool.length|0;keys.push({c:pool[j],t:0});pool.splice(j,1)}}
// drones sentinelles
sent=[];const ns=lvl>=3?Math.min(5,1+((lvl-3)/3|0)):0;
if(ns){let pool=[];const mn=Math.max(5,n*.9|0);for(let i=1;i<n*n;i++)if(dist[i]>=mn&&i!=ex)pool.push(i);
if(!pool.length)for(let i=1;i<n*n;i++)if(dist[i]>=3)pool.push(i);
for(let k=0;k<ns&&pool.length;k++){const j=Math.random()*pool.length|0,c=pool[j];pool.splice(j,1);
const o=[0,1,2,3].filter(i=>!w[c][i]);sent.push({cx:c%n,cy:c/n|0,d:o[Math.random()*o.length|0],p:Math.random()*.9,sp:Math.min(5.5,2.2+lvl*.12)*(.9+Math.random()*.2)})}}
t0=Date.now();
$(".l",el).textContent="Niv. "+lvl;hud();
const info=[];if(ns)info.push(ns+" drone"+(ns>1?"s":""));if(nk)info.push(nk+" clé"+(nk>1?"s":""));
banner("Niveau "+lvl,info.join(" · ")||"Trouve la sortie",1900);
persist()}
function hud(){$(".k",el).textContent=keys.length?"Clés "+got+"/"+keys.length:""}
function banner(t,s,ms){bn={t,s,t0:performance.now(),ms:ms||1500}}

/* ================= LOGIQUE ================= */
function win(){done=true;wt=performance.now();const sec=(Date.now()-t0)/1000;sc+=100+Math.max(0,Math.round(200-sec*4))+n*5;A.score(sc);A.end(sc);
beep(660,.12,"triangle");setTimeout(()=>beep(880,.12,"triangle"),120);setTimeout(()=>beep(1175,.3,"triangle"),240);
lvl++;setTimeout(()=>{done=false;gen()},1300)}
function hit(){const now=performance.now();flash=now;grace=now+1600;sc=Math.max(0,sc-25);A.score(sc);
ax=0;ay=0;d=-1;p=0;want=-1;tr=[];beep(130,.3,"sawtooth",.14);banner("Touché !  −25","Retour au départ",1000);persist()}
function arrive(){
if(ax==n-1&&ay==n-1){if(got>=keys.length){d=-1;p=0;win();return}
if(performance.now()-lockMsg>2500){lockMsg=performance.now();banner("Sortie verrouillée","Ramasse toutes les clés",1400);beep(220,.15,"square",.08)}}
const c=ay*n+ax,rv=(d+2)%4,o=[0,1,2,3].filter(i=>i!=rv&&open(c,i));let nd=-1;
if(want>=0&&want!=rv&&open(c,want)){nd=want;if(!held)want=-1}
else if(held||want>=0){if(open(c,d))nd=d}
else if(o.length==1)nd=o[0];
d=nd}
function stepSent(s,dt){
s.p+=s.sp*dt;
while(s.p>=1){s.p-=1;s.cx+=D[s.d][0];s.cy+=D[s.d][1];
const c=s.cy*n+s.cx,rv=(s.d+2)%4;let o=[0,1,2,3].filter(i=>i!=rv&&open(c,i));
if(!o.length)o=[rv];
let nd=o[Math.random()*o.length|0];
if(lvl>=7&&o.length>1&&Math.random()<.4){let b=1e9;o.forEach(i=>{const q=Math.abs(s.cx+D[i][0]-ax)+Math.abs(s.cy+D[i][1]-ay);if(q<b){b=q;nd=i}})}
s.d=nd}}
const spos=s=>[s.cx+.5+D[s.d][0]*s.p,s.cy+.5+D[s.d][1]*s.p];
function upd(dt){if(done)return;const now=performance.now();
if(want>=0&&!held&&now>wu)want=-1;
if(d>=0){if(want>=0&&want==(d+2)%4){ax+=D[d][0];ay+=D[d][1];d=want;p=1-p;if(!held)want=-1}
p+=SP*dt;while(d>=0&&p>=1){p-=1;ax+=D[d][0];ay+=D[d][1];arrive();if(d<0){p=0}}}
else if(want>=0&&open(ay*n+ax,want)){d=want;p=0;if(!held)want=-1}
fx=ax+.5+(d>=0?D[d][0]*p:0);fy=ay+.5+(d>=0?D[d][1]*p:0);
const l=tr[tr.length-1];if(!l||Math.hypot(l[0]-fx,l[1]-fy)>.12){tr.push([fx,fy]);if(tr.length>26)tr.shift()}else if(d<0&&tr.length>1&&Math.random()<.2)tr.shift();
keys.forEach(k=>{if(k.t)return;const kx=k.c%n+.5,ky=(k.c/n|0)+.5;if(Math.hypot(fx-kx,fy-ky)<.5){k.t=1;got++;sc+=40;A.score(sc);hud();
beep(880,.08,"triangle");setTimeout(()=>beep(1320,.18,"triangle"),70);
banner(got>=keys.length?"Sortie déverrouillée !":"Clé "+got+"/"+keys.length,"+40",1100);persist()}});
sent.forEach(s=>{stepSent(s,dt);if(now>grace){const q=spos(s);if(Math.hypot(fx-q[0],fy-q[1])<.55)hit()}})}

/* ================= ENTRÉES ================= */
let sx=0,sy=0;
el.onpointerdown=e=>{mus.start();held=true;sx=e.clientX;sy=e.clientY;try{el.setPointerCapture(e.pointerId)}catch(r){}};
el.onpointermove=e=>{if(!held)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<9)return;
want=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?2:0);sx=e.clientX;sy=e.clientY};
el.onpointerup=el.onpointercancel=()=>{held=false;wu=performance.now()+380};

/* ================= DESSIN 3D ================= */
const C_FR=[16,92,132],C_LO=[8,56,88],C_TOP=[125,236,255],C_ED=[61,242,255];
const sh=(c,f)=>"rgb("+(c[0]*f|0)+","+(c[1]*f|0)+","+(c[2]*f|0)+")";
function ell(cx,cy,rx,ry,fill){x.fillStyle=fill;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);x.fill()}
function draw(){
const now=performance.now(),T=now/500,vr=VR(),bx=fx*cell,by=fy*cell+OY,W=Z,Hh=Z+PAD;
x.clearRect(0,0,W,Hh);
for(let i=0;i<n*n;i++){if(Math.hypot(i%n+.5-fx,(i/n|0)+.5-fy)<=vr)seenC[i]=1}
// sol
for(let i=0;i<n*n;i++){if(!seenC[i])continue;const cx=i%n,cy=i/n|0,dd=Math.hypot(cx+.5-fx,cy+.5-fy),f=dd<=vr?1-dd/vr*.6:.25;
x.fillStyle="rgba(40,150,200,"+(.04+.09*f)+")";x.fillRect(cx*cell+1,cy*cell+OY+1,cell-2,cell-2)}
// halo de la bille
x.globalCompositeOperation="lighter";
const lg=x.createRadialGradient(bx,by,0,bx,by,vr*cell);lg.addColorStop(0,"rgba(61,242,255,.16)");lg.addColorStop(1,"rgba(61,242,255,0)");
x.fillStyle=lg;x.fillRect(0,0,W,Hh);x.globalCompositeOperation="source-over";
// sortie (sur le sol)
const ex=(n-.5)*cell,ey=(n-.5)*cell+OY,er=cell*(.3+(.5+.5*Math.sin(T))*.04),ul=got>=keys.length,ec=ul?"61,220,132":"255,70,90";
const eg=x.createRadialGradient(ex,ey,0,ex,ey,cell*1.5);eg.addColorStop(0,"rgba("+ec+","+(.3+(.5+.5*Math.sin(T))*.15)+")");eg.addColorStop(1,"rgba("+ec+",0)");
x.fillStyle=eg;x.fillRect(ex-cell*2,ey-cell*2,cell*4,cell*4);
x.strokeStyle="rgb("+ec+")";x.lineWidth=2;x.beginPath();x.ellipse(ex,ey,er,er*.6,0,0,7);x.stroke();
x.beginPath();x.ellipse(ex,ey,er*.55,er*.33,0,0,7);x.stroke();
// murs 3D
for(let k=0;k<segs.length;k++){const s=segs[k],dd=Math.hypot(s.mx-fx,s.my-fy);
if(dd<=vr+.4)seenS[k]=1;if(!seenS[k])continue;
const f=dd<=vr+.4?1-Math.max(0,dd-1.5)/vr*.55:.3,X0=s.x0,Wd=s.x1-s.x0,Y0=s.y0+OY,Th=s.y1-s.y0,Y1=Y0+Th;
x.fillStyle=sh(C_FR,f);x.fillRect(X0,Y1-H,Wd,H);
x.fillStyle=sh(C_LO,f);x.fillRect(X0,Y1-H*.38,Wd,H*.38);
x.fillStyle=sh(C_TOP,f*.92);x.fillRect(X0,Y0-H,Wd,Th);
x.fillStyle=sh(C_ED,f);x.fillRect(X0,Y1-H,Wd,1.3);
x.fillStyle="rgba(255,255,255,"+(.5*f)+")";x.fillRect(X0,Y0-H,Wd,.8)}
// traînée
for(let i=1;i<tr.length;i++){x.strokeStyle="rgba(252,209,22,"+(i/tr.length*.4)+")";x.lineWidth=cell*.18*(i/tr.length)+1;x.lineCap="round";x.beginPath();x.moveTo(tr[i-1][0]*cell,tr[i-1][1]*cell+OY-cell*.12);x.lineTo(tr[i][0]*cell,tr[i][1]*cell+OY-cell*.12);x.stroke()}
// clés
keys.forEach((k,i)=>{if(k.t)return;const kx=(k.c%n+.5)*cell,ky=((k.c/n|0)+.5)*cell+OY,dd=Math.hypot(k.c%n+.5-fx,(k.c/n|0)+.5-fy);
if(dd>vr+.4&&!seenC[k.c])return;const a=dd<=vr+.4?1:.45,r=cell*.2,yb=ky-H*.5-Math.sin(T*2+i)*2,cs=Math.max(.25,Math.abs(Math.cos(T*.8+i)));
x.globalAlpha=a;ell(kx,ky,r*.9,r*.4,"rgba(0,0,0,.4)");
const g=x.createRadialGradient(kx,yb,0,kx,yb,cell*.7);g.addColorStop(0,"rgba(252,209,22,.45)");g.addColorStop(1,"rgba(252,209,22,0)");x.fillStyle=g;x.fillRect(kx-cell,yb-cell,cell*2,cell*2);
x.fillStyle="#FCD116";x.strokeStyle="#fff";x.lineWidth=1.2;x.beginPath();x.moveTo(kx,yb-r);x.lineTo(kx+r*cs,yb);x.lineTo(kx,yb+r);x.lineTo(kx-r*cs,yb);x.closePath();x.fill();x.stroke();x.globalAlpha=1});
// drones
sent.forEach((s,i)=>{const q=spos(s),dd=Math.hypot(q[0]-fx,q[1]-fy);if(dd>vr+.4)return;
const a=dd<=vr?1:.5,sx2=q[0]*cell,sy2=q[1]*cell+OY,r=cell*.21,yb=sy2-H*.45-Math.sin(T*2.2+i*2)*2;
x.globalAlpha=a;ell(sx2,sy2,r,r*.4,"rgba(0,0,0,.45)");
x.globalCompositeOperation="lighter";const gg=x.createRadialGradient(sx2,yb,0,sx2,yb,cell*.9);gg.addColorStop(0,"rgba(255,50,80,.4)");gg.addColorStop(1,"rgba(255,50,80,0)");x.fillStyle=gg;x.fillRect(sx2-cell,yb-cell,cell*2,cell*2);x.globalCompositeOperation="source-over";
const bg=x.createRadialGradient(sx2-r*.3,yb-r*.35,r*.1,sx2,yb,r);bg.addColorStop(0,"#ff9aa5");bg.addColorStop(.5,"#e0243a");bg.addColorStop(1,"#5a0714");x.fillStyle=bg;x.beginPath();x.arc(sx2,yb,r,0,7);x.fill();
x.strokeStyle="rgba(255,130,150,.9)";x.lineWidth=1.4;x.beginPath();x.ellipse(sx2,yb,r*1.5,r*.5,T*.6+i,0,7);x.stroke();
const ang=Math.atan2(fy-q[1],fx-q[0]);x.fillStyle="#fff";x.beginPath();x.arc(sx2+Math.cos(ang)*r*.35,yb+Math.sin(ang)*r*.35,r*.28,0,7);x.fill();x.globalAlpha=1});
// bille
const rb=cell*.24,yb=by-cell*.14-Math.sin(T*1.6)*1,bl=grace>now?.45+.4*Math.sin(now/55):1;
x.globalAlpha=bl;ell(bx,by,rb*.95,rb*.4,"rgba(0,0,0,.5)");
x.globalCompositeOperation="lighter";const bgl=x.createRadialGradient(bx,yb,0,bx,yb,cell*1.6);bgl.addColorStop(0,"rgba(252,209,22,.28)");bgl.addColorStop(1,"rgba(252,209,22,0)");x.fillStyle=bgl;x.fillRect(bx-cell*2,yb-cell*2,cell*4,cell*4);x.globalCompositeOperation="source-over";
const sg=x.createRadialGradient(bx-rb*.35,yb-rb*.4,rb*.1,bx,yb,rb);sg.addColorStop(0,"#fff6c2");sg.addColorStop(.45,"#FCD116");sg.addColorStop(1,"#8f6a00");x.fillStyle=sg;x.beginPath();x.arc(bx,yb,rb,0,7);x.fill();x.globalAlpha=1;
// faisceau de la sortie
x.globalCompositeOperation="lighter";const bm=x.createLinearGradient(0,ey,0,ey-cell*1.8);bm.addColorStop(0,"rgba("+ec+","+(ul?.38:.2)+")");bm.addColorStop(1,"rgba("+ec+",0)");x.fillStyle=bm;x.fillRect(ex-er*.7,ey-cell*1.8,er*1.4,cell*1.8);x.globalCompositeOperation="source-over";
// anneau de victoire
if(done&&wt){const k=Math.min(1,(now-wt)/900);x.strokeStyle="rgba(61,220,132,"+(1-k)+")";x.lineWidth=3;x.beginPath();x.ellipse(ex,ey,cell*(.3+k*n*.9),cell*(.3+k*n*.9)*.6,0,0,7);x.stroke()}
// flash de dégât
if(now-flash<350){x.fillStyle="rgba(255,40,60,"+(1-(now-flash)/350)*.35+")";x.fillRect(0,0,W,Hh)}
// bandeau
if(bn){const k=(now-bn.t0)/bn.ms;if(k>=1)bn=null;else{const a=k<.15?k/.15:k>.7?(1-k)/.3:1;
x.globalAlpha=a;x.textAlign="center";x.fillStyle="#fff";x.shadowColor="rgba(61,242,255,.9)";x.shadowBlur=14;x.font="800 24px system-ui,sans-serif";x.fillText(bn.t,W/2,Hh*.4);
x.shadowBlur=0;x.fillStyle="#9fe9ff";x.font="600 13px system-ui,sans-serif";x.fillText(bn.s,W/2,Hh*.4+22);x.globalAlpha=1}}}

setInterval(()=>{if(A.on()&&!done)$(".t",el).textContent=((Date.now()-t0)/1000|0)+" s"},500);
setInterval(()=>mus.sync(A.on()),400);
gen();A.score(sc);
(function lp(){requestAnimationFrame(lp);const now=performance.now(),dt=Math.min(.05,(now-lt)/1000);lt=now;if(A.on()){upd(dt);draw()}})();
};
