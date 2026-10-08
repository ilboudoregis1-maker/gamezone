/* Baobab v2 : TOUR NÉON
   - Même principe (empiler sans déborder) mais en version high-tech :
     4 zones qui changent le décor (Savane, Crépuscule, Nuit néon, Aurore), blocs lumineux 3D,
     étoiles et soleil en parallaxe, silhouette de baobab au départ.
   - Poses PARFAITES en série : le bloc regrandit (x3), mode ZEN ralenti (x5), secousse + vibration.
   - Musique adaptative qui s'accélère avec la hauteur, sons montants à chaque pose parfaite.
   - Écran de départ, écran de fin avec records (hauteur, plus longue série parfaite), confettis. */
G.bao=function(el,A){
const sv=A.load()||{};
let bs=sv.bs||0,bcb=sv.bc||0,tot=sv.tot||0;
const save=()=>A.save({bs,bc:bcb,tot,mu:mus.muted()});

/* ================= SON ================= */
const mus=(function(){
let ctx,master,sg,bus,timer,step=0,next=0,muted=!!sv.mu,playing=false;
const AR=[196,220,261.63,293.66,329.63,392,440,523.25],PT=[5,-1,3,-1,4,-1,2,-1, 3,-1,6,-1,5,-1,7,-1],BS=[98,110,87.3,98];
function env(g,t,a,pk,dec){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec)}
function tone(f,t,type,pk,dec,dest){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;env(g,t,.006,pk,dec);o.connect(g);g.connect(dest);o.start(t);o.stop(t+dec+.1)}
function ev(i,t){const a=PT[i%16],s=i&7;
if(a>=0){tone(AR[a],t,"sine",.1,.8,bus);tone(AR[a]*2,t,"triangle",.03,.4,bus)}
if(s==0)tone(BS[(i>>3)&3],t,"sine",.32,1.1,master);
if(s==4)tone(60,t,"sine",.22,.18,master)}
function sched(){if(!ctx)return;while(next<ctx.currentTime+.25){ev(step++,next);next+=60/api.bpm/2}}
function setup(){ctx=new(window.AudioContext||window.webkitAudioContext)();
master=ctx.createGain();master.gain.value=0;sg=ctx.createGain();sg.gain.value=muted?0:.8;
const cp=ctx.createDynamicsCompressor();master.connect(cp);sg.connect(cp);cp.connect(ctx.destination);
bus=ctx.createGain();const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2400;bus.connect(lp);lp.connect(master);
const dl=ctx.createDelay(1),fb=ctx.createGain(),wet=ctx.createGain();dl.delayTime.value=.36;fb.gain.value=.35;wet.gain.value=.35;lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master)}
const api={bpm:84,
ready(){try{if(!ctx)setup();if(ctx.state=="suspended")ctx.resume()}catch(e){}},
play(){api.ready();if(!ctx||playing)return;playing=true;step=0;next=ctx.currentTime+.1;master.gain.setTargetAtTime(muted?0:.5,ctx.currentTime,.1);timer=setInterval(sched,80)},
stop(){if(!ctx||!playing)return;playing=false;clearInterval(timer);master.gain.setTargetAtTime(0,ctx.currentTime,.15)},
sync(on){if(!ctx)return;try{if(on&&ctx.state=="suspended")ctx.resume();else if(!on&&ctx.state=="running")ctx.suspend()}catch(e){}},
toggle(){muted=!muted;if(ctx){sg.gain.setTargetAtTime(muted?0:.8,ctx.currentTime,.05);master.gain.setTargetAtTime(muted||!playing?0:.5,ctx.currentTime,.05)}return muted},
muted:()=>muted,
sfx(list){if(!ctx||muted)return;const t=ctx.currentTime;list.forEach(e=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=e[3]||"triangle";o.frequency.value=e[0];env(g,t+e[1],.005,e[4]||.25,e[2]);o.connect(g);g.connect(sg);o.start(t+e[1]);o.stop(t+e[1]+e[2]+.1)})}};
return api})();
const PEN=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.5];
const sPlace=()=>mus.sfx([[330,0,.12,"triangle",.28]]),
sPerf=n=>mus.sfx([[PEN[Math.min(7,n%8)],0,.18,"triangle",.3],[PEN[Math.min(7,n%8)]*2,.04,.22,"sine",.15]]),
sZen=()=>mus.sfx([[880,0,.15],[1175,.1,.15],[1568,.2,.4]]),
sZone=()=>mus.sfx([[523,0,.2],[659,.12,.2],[784,.24,.2],[1047,.36,.5]]),
sOver=()=>mus.sfx([[330,0,.25],[262,.2,.25],[196,.4,.6]]),
sRec=()=>mus.sfx([[660,0,.15],[880,.1,.15],[1100,.2,.15],[1320,.3,.5]]);

/* ================= STYLE ================= */
el.innerHTML='<style>.brow{display:flex;gap:10px;align-items:center;justify-content:center;width:min(92vw,460px)}.brow .hint{margin:0;flex:1}'+
'.bmu{background:none;border:1px solid rgba(61,242,255,.45);color:#3df2ff;border-radius:10px;padding:0 11px;font-size:16px;line-height:34px}</style><canvas class="nx"></canvas><div class="brow"><span class="hint">Touche pour poser le bloc. 3 poses parfaites de suite : le bloc regrandit. 5 : mode ZEN.</span></div>';
const mb=document.createElement("button");mb.className="bmu";mb.innerHTML="&#9834;";
const up=()=>{mb.style.opacity=mus.muted()?.4:1;mb.style.textDecoration=mus.muted()?"line-through":"none"};
mb.onclick=()=>{mus.ready();mus.toggle();up();save()};up();$(".brow",el).appendChild(mb);

/* ================= JEU ================= */
const cv=$("canvas",el),x=cv.getContext("2d"),dpr=Math.min(window.devicePixelRatio||1,2),W=Math.min(innerWidth-20,460),H=Math.max(300,Math.min(innerHeight-170,720)),bh=30;
cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";x.scale(dpr,dpr);
const ZN=[{n:"Savane",t:"#1a0f2e",b:"#4a2308",s:"#ffb81c",h:28},{n:"Crépuscule",t:"#0b1030",b:"#35104f",s:"#ff3bd4",h:305},{n:"Nuit néon",t:"#02060f",b:"#073046",s:"#3df2ff",h:185},{n:"Aurore",t:"#02120c",b:"#0c4a35",s:"#b6ff3b",h:130}];
const zOf=n=>Math.floor(n/12)%4;
const hc=(i,l)=>"hsl("+((ZN[zOf(i)].h+i*9)%360)+",95%,"+(l||58)+"%)";
const stars=Array.from({length:50},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,k:Math.random()*6}));
let ph="ready",st,cur,dir,sc,cam,combo,bcmb,deb,fx,pops,zen,shake,pz,zf,pzPrev,overT=0,newRec=false,tt=0,last=performance.now();
const baseSp=()=>Math.min(2.5+sc*.16,8.5)*(zen>0?.6:1);
function reset(){st=[{x:W/2-80,w:160}];cur={x:0,w:160};dir=1;sc=0;cam=0;combo=0;bcmb=0;deb=[];fx=[];pops=[];zen=0;shake=0;pz=0;pzPrev=0;zf=0;newRec=false;A.score(0)}
reset();
function boom(px,py,c){for(let i=0;i<14;i++)fx.push({x:px,y:py,vx:(Math.random()-.5)*6,vy:-Math.random()*5,a:1,c})}
function pop(t,px,py,c){pops.push({t,x:px,y:py,c,a:1})}
function confetti(){for(let i=0;i<70;i++)fx.push({x:Math.random()*W,y:-10-Math.random()*60,vx:(Math.random()-.5)*2,vy:Math.random()*2,a:1.6,c:["#FCD116","#3df2ff","#ff3bd4","#b6ff3b"][i%4],big:1})}
function begin(){reset();ph="play";mus.bpm=84;mus.play()}
function place(){
const t=st[st.length-1],l=Math.max(cur.x,t.x),r=Math.min(cur.x+cur.w,t.x+t.w),ov=r-l,row=H-(st.length+1)*bh+cam;
if(ov<=2){ph="over";overT=Date.now();deb.push({x:cur.x,y:row,w:cur.w,vy:0,c:hc(st.length)});finish();return}
let justZen=false;
if(Math.abs(cur.x-t.x)<4){combo++;if(combo>bcmb)bcmb=combo;st.push({x:t.x,w:t.w});sPerf(combo);boom(t.x+t.w/2,row,hc(st.length));pop("PARFAIT x"+combo,t.x+t.w/2,row-8,"#b6ff3b");shake=5;try{navigator.vibrate&&navigator.vibrate(18)}catch(e){}
if(combo>=3){const b=st[st.length-1],g=Math.min(14,W*.8-b.w);if(g>0){b.x=Math.max(0,b.x-g/2);b.w+=g}}
if(combo%5==0){zen=5;justZen=true;pop("ZEN · ralenti",W/2,row-34,"#3df2ff");sZen()}}
else{combo=0;if(cur.x<l)deb.push({x:cur.x,y:row,w:l-cur.x,vy:0,c:hc(st.length)});if(cur.x+cur.w>r)deb.push({x:r,y:row,w:cur.x+cur.w-r,vy:0,c:hc(st.length)});st.push({x:l,w:ov});sPlace()}
sc++;A.score(sc);if(zen>0&&!justZen)zen--;
if(zOf(sc)!=pz){pzPrev=pz;pz=zOf(sc);zf=1;pop("Zone : "+ZN[pz].n,W/2,90,ZN[pz].s);sZone()}
mus.bpm=84+Math.min(sc,40)*1.5;
const w=st[st.length-1].w;cur={x:sc%2?W-w:0,w};dir=sc%2?-1:1}
function finish(){mus.stop();tot++;if(sc>bs){bs=sc;newRec=true}if(bcmb>bcb)bcb=bcmb;save();A.end(sc);sOver();if(newRec&&sc>2){sRec();confetti()}else newRec=false}
cv.onpointerdown=()=>{if(ph=="ready")begin();else if(ph=="over"){if(Date.now()-overT>500)begin()}else place()};

/* ================= DESSIN ================= */
function grad(z,a){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,ZN[z].t);g.addColorStop(1,ZN[z].b);x.globalAlpha=a;x.fillStyle=g;x.fillRect(0,0,W,H);x.globalAlpha=1}
function txt(s,px,py,sz,c,al,w){x.font=(w||"bold")+" "+sz+"px system-ui,sans-serif";x.textAlign=al||"center";x.fillStyle=c;x.fillText(s,px,py)}
function frame(now){requestAnimationFrame(frame);if(!A.on()){last=now;return}
const dt=Math.min(2.5,(now-last)/16.67||1);last=now;tt+=dt;
if(zf>0)zf=Math.max(0,zf-.02*dt);
x.save();x.clearRect(0,0,W,H);
if(shake>.2){x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=Math.pow(.85,dt)}else shake=0;
grad(zf>0?pzPrev:pz,1);if(zf>0)grad(pz,1-zf);
const sa=Math.min(1,.12+sc/50);stars.forEach(s=>{x.globalAlpha=sa*(.5+.5*Math.sin(tt*.03+s.k));x.fillStyle="#fff";x.beginPath();x.arc(s.x,(s.y+cam*.15)%H,s.r,0,7);x.fill()});x.globalAlpha=1;
const sy=80+Math.min(cam,600)*.12;x.save();x.shadowColor=ZN[pz].s;x.shadowBlur=40;x.fillStyle=ZN[pz].s;x.globalAlpha=.85;x.beginPath();x.arc(W*.78,sy,26,0,7);x.fill();x.restore();
if(cam<420){const gy=H+cam;x.save();x.fillStyle="rgba(0,0,0,.5)";x.fillRect(0,gy-18,W,40);x.fillRect(W*.12-6,gy-120,12,104);[[W*.12,gy-128,44,22],[W*.12-30,gy-116,30,16],[W*.12+30,gy-116,30,16]].forEach(e=>{x.beginPath();x.ellipse(e[0],e[1],e[2],e[3],0,0,7);x.fill()});x.restore()}
x.strokeStyle="rgba(61,242,255,.07)";x.lineWidth=1;for(let i=0;i<14;i++){const yy=((i*60+cam*.5+tt*.5)%H+H)%H;x.beginPath();x.moveTo(0,yy);x.lineTo(W,yy);x.stroke()}for(let i=1;i<8;i++){x.beginPath();x.moveTo(i*W/8,0);x.lineTo(i*W/8,H);x.stroke()}
if(ph=="play"){cur.x+=dir*baseSp()*dt;if(cur.x<0){cur.x=0;dir=1}if(cur.x+cur.w>W){cur.x=W-cur.w;dir=-1}}
const tc=Math.max(0,(st.length-6)*bh);cam+=(tc-cam)*Math.min(1,.1*dt);
st.forEach((b,i)=>{const c=hc(i),yy=H-(i+1)*bh+cam;if(yy>H+bh||yy<-bh)return;x.save();x.shadowColor=c;x.shadowBlur=14;const g=x.createLinearGradient(0,yy,0,yy+bh);g.addColorStop(0,hc(i,72));g.addColorStop(1,hc(i,42));x.fillStyle=g;x.globalAlpha=.92;x.fillRect(b.x,yy,b.w,bh-3);x.globalAlpha=1;x.fillStyle="rgba(255,255,255,.6)";x.fillRect(b.x,yy,b.w,2);x.fillStyle="rgba(0,0,0,.25)";x.fillRect(b.x,yy+bh-6,b.w,3);x.restore()});
if(ph=="play"){const c=hc(st.length);x.save();x.shadowColor=c;x.shadowBlur=22;x.strokeStyle=zen>0?"#3df2ff":c;x.lineWidth=2;x.strokeRect(cur.x,H-(st.length+1)*bh+cam,cur.w,bh-3);x.restore()}
deb=deb.filter(d=>d.y<H+60);deb.forEach(d=>{d.vy+=.6*dt;d.y+=d.vy*dt;x.save();x.globalAlpha=.6;x.fillStyle=d.c;x.fillRect(d.x,d.y,d.w,bh-3);x.restore()});
fx=fx.filter(f=>f.a>.03&&f.y<H+20);fx.forEach(f=>{f.x+=f.vx*dt;f.vy+=.25*dt;f.y+=f.vy*dt;f.a*=f.big?Math.pow(.995,dt):Math.pow(.94,dt);x.save();x.globalAlpha=Math.min(1,f.a);x.fillStyle=f.c;x.fillRect(f.x,f.y,f.big?6:3,f.big?9:3);x.restore()});
pops=pops.filter(p=>p.a>.03);pops.forEach(p=>{p.y-=.6*dt;p.a*=Math.pow(.97,dt);x.globalAlpha=p.a;txt(p.t,p.x,p.y,15,p.c);x.globalAlpha=1});
x.restore();
txt(String(sc),14,34,28,"#fff","left");txt("Record "+bs,W-12,26,13,"#9fe9ff","right");txt(ZN[pz].n,W-12,44,11,ZN[pz].s,"right");
if(combo>1)txt("PARFAIT x"+combo,14,54,14,"#b6ff3b","left");if(zen>0)txt("ZEN "+zen,14,72,12,"#3df2ff","left");
if(ph!="play"){x.fillStyle="rgba(3,8,10,.78)";x.fillRect(0,0,W,H);const bl=.6+.4*Math.sin(tt*.08);
if(ph=="ready"){txt("BAOBAB",W/2,H/2-60,36,"#FCD116");txt("TOUR NÉON",W/2,H/2-32,14,"#3df2ff");txt("Empile les blocs sans déborder",W/2,H/2+4,15,"#fff","center","normal");txt("Vise le PARFAIT : série de 3 = bloc plus large,",W/2,H/2+28,13,"#9fe9ff","center","normal");txt("série de 5 = mode ZEN",W/2,H/2+46,13,"#9fe9ff","center","normal");if(bs)txt("Record : "+bs+" étages",W/2,H/2+78,15,"#b6ff3b");x.globalAlpha=bl;txt("Touche pour commencer",W/2,H/2+112,17,"#fff");x.globalAlpha=1}
else{txt(newRec?"FÉLICITATIONS !":"FIN DE PARTIE",W/2,H/2-64,newRec?30:26,newRec?"#FCD116":"#ff3b5c");txt("Hauteur : "+sc,W/2,H/2-20,30,"#3df2ff");txt("Plus longue série parfaite : "+bcmb,W/2,H/2+10,14,"#fff","center","normal");
if(newRec)txt("NOUVEAU RECORD ★",W/2,H/2+40,18,"#b6ff3b");else txt("Record : "+bs+" · Meilleure série : "+bcb,W/2,H/2+40,14,"#9fe9ff","center","normal");
if(Date.now()-overT>500){x.globalAlpha=bl;txt("Touche pour rejouer",W/2,H/2+80,17,"#fff");x.globalAlpha=1}}}}
requestAnimationFrame(frame);
setInterval(()=>mus.sync(A.on()),400);
};
