/* Éclat v3 — mode INTERMINABLE
   5 vies (max 7). Une cible ratée ou un piège magenta coûte une vie. La partie ne s'arrête que quand les vies sont à zéro.
   Niveaux sans fin : +1 niveau tous les 8 bons coups. Chaque niveau : cibles plus rapides, plus petites,
   plus de pièges, plus de cibles en même temps. Niveau 2+ : cibles dorées (+10 pts, +1 vie).
   Niveau 4+ : cibles qui se déplacent. +1 vie tous les 10 coups parfaits d'affilée.
   Musique qui accélère, effets sonores, particules, écran de fin avec félicitations et record. */
G.cau=function(el,A){
el.innerHTML='<div class="nrow"><span class="tm">Vies <b>♥♥♥♥♥</b></span><span class="cb"></span><span class="ht">Points <b>0</b></span></div><canvas class="nx"></canvas><p class="hint">Touche chaque cible quand son anneau rejoint le bord. Évite les magenta. L\'or donne +10 et +1 vie. 5 vies : une cible ratée ou un piège en coûte une. Ça ne s\'arrête jamais !</p><div style="display:flex;gap:10px;align-items:center"><button class="btn sm">Jouer</button><button class="mu" aria-label="Musique" style="background:none;border:1px solid rgba(61,242,255,.45);color:#3df2ff;border-radius:10px;padding:0 11px;font-size:16px;line-height:34px">&#9834;</button></div>';
const cv=$("canvas",el),x=cv.getContext("2d"),dpr=Math.min(window.devicePixelRatio||1,2),W=Math.min(innerWidth-20,460),H=Math.max(280,Math.min(innerHeight-230,640)),
b=$(".btn",el),tm=$(".tm",el),ht=$(".ht",el),cb=$(".cb",el),mb=$(".mu",el);
cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";x.scale(dpr,dpr);
const s0=A.load();
let run=false,sc=0,lives=5,tsec=0,combo=0,hits=0,L=1,en=[],tx=[],pt=[],sw=[],sp=0,last=performance.now(),flash=0,shake=0,bn=null,
endT=0,best0=0,rec=false,scroll=0,endMsg="",gen=0;
const BEST=()=>{try{return S.g("cau").best||0}catch(e){return 0}};
const stars=Array.from({length:34},()=>({x:Math.random()*W,y:Math.random()*H*.2,p:Math.random()*6}));

/* ================= SON ================= */
const mus=(function(){
let ctx,master,sg,bus,timer,step=0,next=0,noise,muted=!!(s0&&s0.mu),playing=false;
const AR=[220,261.63,293.66,329.63,392,440,523.25,587.33,659.25,784],
PT=[5,7,6,7,8,-1,7,5, 6,8,7,8,9,-1,8,6, 4,6,5,6,7,-1,6,4, 5,7,6,5,3,-1,4,5],
BS=[110,110,87.31,98];
function env(g,t,a,pk,dec){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec)}
function tone(f,t,type,pk,dec,dest){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;env(g,t,.005,pk,dec);o.connect(g);g.connect(dest);o.start(t);o.stop(t+dec+.1)}
function kick(t,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.setValueAtTime(155,t);o.frequency.exponentialRampToValueAtTime(46,t+.11);env(g,t,.004,v,.24);o.connect(g);g.connect(master);o.start(t);o.stop(t+.35)}
function hat(t,v){const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noise;f.type="highpass";f.frequency.value=7000;env(g,t,.002,v,.045);s.connect(f);f.connect(g);g.connect(master);s.start(t);s.stop(t+.12)}
function ev(i,t){
const bar=(i>>3)&3,s=i&7,a=PT[i%32],z=Math.min(1,L/10);
if(a>=0){const f=AR[a];tone(f,t,"triangle",.13,.4,bus);tone(f*2,t,"sine",.045,.25,bus)}
if(s==0||s==4)kick(t,s==0?.4:.28);
if(s==0)tone(BS[bar],t,"sine",.5,.7,master);
if(s==3||s==6)tone(BS[bar]*2,t,"triangle",.14,.18,master);
if(s==2||s==5||s==7)tone(1250,t,"square",.018,.03,master);
if(s&1)hat(t,.02+.04*z);
if(L>=3&&s==6)tone(BS[bar]*1.5,t,"sawtooth",.05,.2,bus);
if(L>=6&&(s==1||s==5))kick(t,.12)}
function sched(){if(!ctx)return;const bpm=108+Math.min(L,16)*3.5;while(next<ctx.currentTime+.25){ev(step++,next);next+=60/bpm/2}}
function setup(){
ctx=new(window.AudioContext||window.webkitAudioContext)();
master=ctx.createGain();master.gain.value=0;sg=ctx.createGain();sg.gain.value=muted?0:.8;
const cp=ctx.createDynamicsCompressor();master.connect(cp);sg.connect(cp);cp.connect(ctx.destination);
bus=ctx.createGain();const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=3000;bus.connect(lp);lp.connect(master);
const dl=ctx.createDelay(1),fb=ctx.createGain(),wet=ctx.createGain();dl.delayTime.value=.27;fb.gain.value=.3;wet.gain.value=.35;
lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master);
noise=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.1),ctx.sampleRate);const nd=noise.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1}
const api={
ready(){try{if(!ctx)setup();if(ctx.state=="suspended")ctx.resume()}catch(e){}},
play(){api.ready();if(!ctx||playing)return;playing=true;step=0;next=ctx.currentTime+.1;master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(muted?0:.55,ctx.currentTime,.05);timer=setInterval(sched,80)},
stop(){if(!ctx||!playing)return;playing=false;clearInterval(timer);master.gain.setTargetAtTime(0,ctx.currentTime,.15)},
sync(on){if(!ctx)return;try{if(on&&ctx.state=="suspended")ctx.resume();else if(!on&&ctx.state=="running")ctx.suspend()}catch(e){}},
toggle(){muted=!muted;if(ctx){sg.gain.setTargetAtTime(muted?0:.8,ctx.currentTime,.05);master.gain.setTargetAtTime(muted||!playing?0:.55,ctx.currentTime,.05)}return muted},
muted:()=>muted,
sfx(list){if(!ctx||muted)return;const t=ctx.currentTime;list.forEach(e=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=e[3]||"triangle";o.frequency.value=e[0];env(g,t+e[1],.005,e[4]||.25,e[2]);o.connect(g);g.connect(sg);o.start(t+e[1]);o.stop(t+e[1]+e[2]+.1)})},
thud(){if(!ctx||muted)return;const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type="sawtooth";o.frequency.setValueAtTime(180,t);o.frequency.exponentialRampToValueAtTime(45,t+.25);env(g,t,.004,.35,.3);o.connect(g);g.connect(sg);o.start(t);o.stop(t+.4)}};
return api})();
const PENT=[0,2,4,7,9,12,14,16];
const perfect=c=>{const f=660*Math.pow(2,PENT[Math.min(c,7)]/12);mus.sfx([[f,0,.18,"triangle",.28],[f*1.5,.05,.2,"sine",.16]])};
function mbUp(){mb.style.opacity=mus.muted()?.4:1;mb.style.textDecoration=mus.muted()?"line-through":"none"}
mb.onclick=()=>{mus.ready();mus.toggle();mbUp();A.save({mu:mus.muted()})};mbUp();

/* ================= JEU ================= */
const lvlP=()=>({sp:Math.max(.2,.85-.05*(L-1)),life:Math.max(.55,1.7-.07*(L-1)),rs:Math.max(.55,1-.025*(L-1)),bad:Math.min(.42,.2+.02*L),max:Math.min(12,5+(L/2|0)),
gold:L>=2?.06:0,mov:L>=4?Math.min(.7,.1*(L-3)):0});
function spawn(){const q=lvlP();if(en.length>=q.max)return;
const u=Math.random(),gold=u<q.gold,bad=!gold&&Math.random()<q.bad,r=(gold?22:bad?30:24+Math.random()*14)*q.rs,mg=r*2.3,
life=gold?.95:bad?Math.max(.9,1.5-.03*L):q.life,mv=!gold&&Math.random()<q.mov,a=Math.random()*6.283,v=mv?Math.min(260,30+L*8):0;
en.push({x:mg+Math.random()*(W-mg*2),y:mg+Math.random()*(H-mg*2),r,bad,gold,t:0,life,vx:Math.cos(a)*v,vy:Math.sin(a)*v})}
function say(s,c,px,py){tx.push({s,c,x:px,y:py,a:1})}
function burst(px,py,c,n,sp){for(let i=0;i<n&&pt.length<260;i++){const a=Math.random()*6.283,v=(.4+Math.random())*sp;pt.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c,s:1.5+Math.random()*2.5})}}
function banner(t,s,ms){bn={t,s,t0:performance.now(),ms:ms||1200}}
function livesUp(){tm.innerHTML="Vies <b>"+"♥".repeat(Math.max(0,lives))+"♡".repeat(Math.max(0,5-lives))+"</b>"}
function loseLife(px,py){if(!run||lives<=0)return;lives--;combo=0;livesUp();shake=Math.max(shake,.35);say("−1 ♥","#ff6b81",px,py-10);if(lives==1)banner("DERNIÈRE VIE !","Concentre-toi",1100)}
function hud(){ht.innerHTML="Points <b>"+sc+"</b>";cb.textContent=run?"NIV "+L+(combo>1?" · x"+combo:""):""}
function lvlUp(){L++;banner("NIVEAU "+L,"Ça accélère !",1100);mus.sfx([[523,0,.12],[659,.08,.12],[784,.16,.12],[1047,.24,.3]])}
function hitAt(px,py){
let bi=-1,bd=1e9;en.forEach((g,i)=>{const d=Math.hypot(px-g.x,py-g.y);if(d<g.r*2.2&&d<bd){bd=d;bi=i}});if(bi<0)return;
const g=en.splice(bi,1)[0],ring=g.r*(2.2-1.6*g.t/g.life);
if(g.bad){sc=Math.max(0,sc-3);flash=1;shake=.5;mus.thud();say("-3","#ff3bd4",g.x,g.y);burst(g.x,g.y,"#ff3bd4",16,160);loseLife(g.x,g.y)}
else if(g.gold){sc+=10;lives=Math.min(7,lives+1);livesUp();combo++;hits++;mus.sfx([[1319,0,.14,"triangle",.3],[1568,.07,.14,"triangle",.3],[2093,.14,.3,"triangle",.3]]);say("+10  +1 ♥","#FCD116",g.x,g.y);burst(g.x,g.y,"#FCD116",30,260);sw.push({x:g.x,y:g.y,r:g.r,a:1,c:"252,209,22"})}
else if(ring<=g.r*1.45){const p=3+Math.min(combo,5);sc+=p;combo++;hits++;perfect(combo);say("PARFAIT +"+p,"#b6ff3b",g.x,g.y);burst(g.x,g.y,"#b6ff3b",22,220);sw.push({x:g.x,y:g.y,r:g.r,a:1,c:"182,255,59"})}
else{sc+=1;combo=0;hits++;mus.sfx([[420,0,.08,"triangle",.2]]);say("+1","#3df2ff",g.x,g.y);burst(g.x,g.y,"#3df2ff",10,130)}
if(!g.bad&&combo>0&&combo%10==0&&lives<7){lives++;livesUp();say("+1 ♥","#ff6b81",g.x,g.y-24)}
if(!g.bad&&1+(hits/8|0)>L)lvlUp();
hud();A.score(sc)}
cv.onpointerdown=e=>{mus.ready();if(!run)return;const rc=cv.getBoundingClientRect();hitAt((e.clientX-rc.left)*W/rc.width,(e.clientY-rc.top)*H/rc.height)};

function endGame(){run=false;A.end(sc);mus.stop();en=[];endT=performance.now();rec=sc>best0&&sc>0;
const tier=sc<30?"Pas mal !":sc<80?"Bien joué !":sc<150?"Excellent !":"LÉGENDAIRE !";endMsg=tier;
mus.sfx([[523,0,.14],[659,.13,.14],[784,.26,.14],[1047,.39,.55]]);
if(rec){setTimeout(()=>mus.sfx([[1047,0,.12],[1319,.1,.12],[1568,.2,.5]]),700);for(let i=0;i<90;i++)pt.push({x:Math.random()*W,y:-10-Math.random()*H*.4,vx:(Math.random()-.5)*80,vy:60+Math.random()*160,l:1.6,c:["#FCD116","#3df2ff","#ff3bd4","#b6ff3b"][i%4],s:2+Math.random()*3})}
b.textContent="Rejouer ("+sc+" pts)";hud()}

/* ================= DESSIN ================= */
const hue=()=>(190+(L-1)*16)%360;
function bgDraw(dt,now){
scroll=(scroll+dt*(.25+L*.04))%1;const hz=H*.22,cx=W/2,h=hue();
x.fillStyle="hsla("+h+",100%,60%,.07)";x.fillRect(0,hz-1,W,2);
stars.forEach(s=>{x.fillStyle="rgba(255,255,255,"+(.25+.25*Math.sin(now/600+s.p))+")";x.fillRect(s.x,s.y,1.6,1.6)});
x.lineWidth=1;
for(let i=-8;i<=8;i++){x.strokeStyle="hsla("+h+",100%,60%,.12)";x.beginPath();x.moveTo(cx+i*10,hz);x.lineTo(cx+i*W*.26,H);x.stroke()}
for(let k=0;k<10;k++){const z=((k+scroll)/10),y=hz+(H-hz)*z*z;x.strokeStyle="hsla("+h+",100%,60%,"+(.05+z*.18)+")";x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke()}}
function target(g,now){
const ease=Math.min(1,g.t/.16),sc2=ease<1?1+2.2*Math.pow(ease-1,3)+1.2*Math.pow(ease-1,2):1,r=g.r*sc2,rem=g.life-g.t,al=rem<.18?Math.max(0,rem/.18):1,
ring=g.r*(2.2-1.6*g.t/g.life),ok=!g.bad&&ring<=g.r*1.45,
pal=g.bad?["#ffc2f0","#ff3bd4","#5a0a4c","255,59,212"]:g.gold?["#fff6c2","#FCD116","#7a5a00","252,209,22"]:["#d2fcff","#3df2ff","#07566e","61,242,255"];
x.globalAlpha=al;
x.fillStyle="rgba(0,0,0,.4)";x.beginPath();x.ellipse(g.x+3,g.y+r*.95+6,r*.95,r*.34,0,0,7);x.fill();
x.globalCompositeOperation="lighter";const gl=x.createRadialGradient(g.x,g.y,r*.4,g.x,g.y,r*2.3);gl.addColorStop(0,"rgba("+pal[3]+",.35)");gl.addColorStop(1,"rgba("+pal[3]+",0)");x.fillStyle=gl;x.fillRect(g.x-r*2.4,g.y-r*2.4,r*4.8,r*4.8);x.globalCompositeOperation="source-over";
x.fillStyle=pal[2];x.beginPath();x.arc(g.x,g.y+5,r,0,7);x.fill();
const fg=x.createRadialGradient(g.x-r*.35,g.y-r*.4,r*.1,g.x,g.y,r);fg.addColorStop(0,pal[0]);fg.addColorStop(.45,pal[1]);fg.addColorStop(1,pal[2]);
x.fillStyle=fg;x.beginPath();x.arc(g.x,g.y,r,0,7);x.fill();
x.strokeStyle="rgba(255,255,255,.55)";x.lineWidth=1.5;x.beginPath();x.arc(g.x,g.y,r*.98,3.6,5.2);x.stroke();
x.strokeStyle="rgba(255,255,255,.8)";x.lineWidth=2;
if(g.bad){x.beginPath();x.moveTo(g.x-r*.4,g.y-r*.4);x.lineTo(g.x+r*.4,g.y+r*.4);x.moveTo(g.x+r*.4,g.y-r*.4);x.lineTo(g.x-r*.4,g.y+r*.4);x.stroke()}
else if(g.gold){x.fillStyle="rgba(255,255,255,.85)";x.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4+now/500,rr=i%2?r*.2:r*.5;x.lineTo(g.x+Math.cos(a)*rr,g.y+Math.sin(a)*rr)}x.closePath();x.fill()}
else{x.beginPath();x.arc(g.x,g.y,r*.38,0,7);x.stroke()}
x.strokeStyle=ok?"#b6ff3b":"rgb("+pal[3]+")";x.lineWidth=ok?4:3;
x.globalCompositeOperation="lighter";x.beginPath();x.arc(g.x,g.y,Math.max(r,ring),0,7);x.stroke();x.globalCompositeOperation="source-over";
x.globalAlpha=1}
function draw(dt){const now=performance.now();
x.save();if(shake>0){x.translate((Math.random()-.5)*shake*14,(Math.random()-.5)*shake*14);shake=Math.max(0,shake-dt*2.2)}
x.clearRect(-20,-20,W+40,H+40);
if(flash>0){x.fillStyle="rgba(255,59,212,"+flash*.2+")";x.fillRect(0,0,W,H);flash=Math.max(0,flash-dt*3)}
bgDraw(dt,now);
en=en.filter(g=>{g.t+=dt;if(g.vx||g.vy){g.x+=g.vx*dt;g.y+=g.vy*dt;const m=g.r*2.2;if(g.x<m||g.x>W-m)g.vx*=-1;if(g.y<m||g.y>H-m)g.vy*=-1}
if(g.t>=g.life){if(!g.bad&&!g.gold){loseLife(g.x,g.y);hud();burst(g.x,g.y,"#667788",6,70);mus.sfx([[200,0,.12,"square",.1]])}return false}return true});
en.forEach(g=>target(g,now));
sw=sw.filter(s=>{s.r+=dt*180;s.a-=dt*2.4;if(s.a<=0)return false;x.strokeStyle="rgba("+s.c+","+s.a+")";x.lineWidth=3;x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.stroke();return true});
x.globalCompositeOperation="lighter";
pt=pt.filter(p=>{p.l-=dt*1.6;if(p.l<=0)return false;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=120*dt;x.globalAlpha=Math.min(1,p.l);x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,p.s,0,7);x.fill();return true});
x.globalAlpha=1;x.globalCompositeOperation="source-over";
tx=tx.filter(f=>f.a>.03);tx.forEach(f=>{f.y-=40*dt;f.a-=dt*1.4;x.save();x.globalAlpha=Math.max(0,f.a);x.fillStyle=f.c;x.font="bold 16px system-ui,sans-serif";x.textAlign="center";x.fillText(f.s,f.x,f.y);x.restore()});
const vg=x.createRadialGradient(W/2,H/2,Math.min(W,H)*.45,W/2,H/2,Math.max(W,H)*.75);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,.5)");x.fillStyle=vg;x.fillRect(0,0,W,H);
if(bn){const k=(now-bn.t0)/bn.ms;if(k>=1)bn=null;else{const a=k<.15?k/.15:k>.7?(1-k)/.3:1;x.globalAlpha=a;x.textAlign="center";x.fillStyle="#fff";x.shadowColor="rgba(61,242,255,.9)";x.shadowBlur=14;x.font="800 26px system-ui,sans-serif";x.fillText(bn.t,W/2,H*.42);x.shadowBlur=0;x.fillStyle="#9fe9ff";x.font="600 13px system-ui,sans-serif";x.fillText(bn.s,W/2,H*.42+22);x.globalAlpha=1}}
if(!run&&endT){const k=Math.min(1,(now-endT)/500),pu=.5+.5*Math.sin(now/260);
x.fillStyle="rgba(4,8,12,"+.72*k+")";x.fillRect(0,0,W,H);x.globalAlpha=k;x.textAlign="center";
x.shadowColor="rgba(252,209,22,.8)";x.shadowBlur=18;x.fillStyle="#FCD116";x.font="800 28px system-ui,sans-serif";x.fillText("FÉLICITATIONS !",W/2,H*.3);
x.shadowBlur=0;x.fillStyle="#fff";x.font="700 18px system-ui,sans-serif";x.fillText(endMsg,W/2,H*.3+30);
x.font="800 54px system-ui,sans-serif";x.fillStyle="#3df2ff";x.fillText(sc,W/2,H*.3+100);
x.font="600 14px system-ui,sans-serif";x.fillStyle="#9fe9ff";x.fillText("points  ·  niveau "+L+"  ·  "+(tsec|0)+" s",W/2,H*.3+124);
if(rec){x.globalAlpha=k*(.65+.35*pu);x.fillStyle="#b6ff3b";x.shadowColor="#b6ff3b";x.shadowBlur=14;x.font="800 20px system-ui,sans-serif";x.fillText("NOUVEAU RECORD !",W/2,H*.3+162);x.shadowBlur=0}
else{x.fillStyle="#9fe9ff";x.font="600 14px system-ui,sans-serif";x.fillText("Record : "+best0+" pts",W/2,H*.3+162)}
x.globalAlpha=1}
if(!run&&!endT){x.textAlign="center";x.fillStyle="rgba(255,255,255,.85)";x.shadowColor="rgba(61,242,255,.9)";x.shadowBlur=14;x.font="800 26px system-ui,sans-serif";x.fillText("ÉCLAT",W/2,H*.4);x.shadowBlur=0;x.font="600 13px system-ui,sans-serif";x.fillStyle="#9fe9ff";x.fillText("Appuie sur Jouer",W/2,H*.4+24)}
x.restore()}

(function lp(){requestAnimationFrame(lp);const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;if(!A.on())return;
if(run){tsec+=dt;sp-=dt;if(sp<=0){spawn();sp=lvlP().sp}if(lives<=0)endGame()}
draw(dt)})();
setInterval(()=>mus.sync(A.on()),400);
b.onclick=()=>{mus.ready();best0=BEST();sc=0;lives=5;tsec=0;livesUp();run=true;combo=0;hits=0;L=1;en=[];tx=[];pt=[];sw=[];sp=0;endT=0;rec=false;bn=null;ht.innerHTML="Points <b>0</b>";A.score(0);b.textContent="En cours...";hud();mus.play();banner("NIVEAU 1","Prêt ? Go !",900)};
};
