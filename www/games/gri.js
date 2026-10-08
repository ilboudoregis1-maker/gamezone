/* Écho du Griot v2 : RYTHME
   - Même principe (regarde, écoute, répète) en version high-tech :
     3 VIES (une erreur = on réécoute la même mélodie), minuteur circulaire à chaque note,
     le nombre de pads augmente : 4 pads, puis 5 à la manche 8, puis 6 à la manche 16.
   - Toutes les 4 manches : mélodie À L'ENVERS. Points : vitesse + manche, série de bonnes notes.
   - Notes de kora (pentatonique), musique d'ambiance douce, étincelles, anneaux, secousse.
   - Écran de départ, écran de fin avec records (manche, score), confettis. */
G.gri=function(el,A){
const sv=A.load()||{};
const rec0=sv.rec||{};const rec={e:Object.assign({br:0,bsc:0},rec0.e),n:Object.assign({br:sv.br||0,bsc:sv.bsc||0},rec0.n)};
let lv=sv.lv=="n"?"n":"e",br=rec[lv].br,bsc=rec[lv].bsc,tot=sv.tot||0;
const save=()=>{rec[lv]={br,bsc};A.save({rec,lv,tot,mu:mus.muted()})};
const ML=()=>lv=="e"?5:3;

/* ================= SON ================= */
const mus=(function(){
let ctx,master,sg,bus,timer,step=0,next=0,muted=!!sv.mu,playing=false;
const AR=[130.81,146.83,164.81,196,220,261.63,293.66,329.63],PT=[0,-1,4,-1,2,-1,5,-1, 1,-1,4,-1,3,-1,6,-1],BS=[65.4,73.4];
function env(g,t,a,pk,dec){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec)}
function tone(f,t,type,pk,dec,dest){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;env(g,t,.006,pk,dec);o.connect(g);g.connect(dest);o.start(t);o.stop(t+dec+.1)}
function ev(i,t){const a=PT[i%16],s=i&7;
if(a>=0)tone(AR[a],t,"sine",.08,1.2,bus);
if(s==0)tone(BS[(i>>3)&1],t,"sine",.25,1.6,master)}
function sched(){if(!ctx)return;while(next<ctx.currentTime+.25){ev(step++,next);next+=60/62/2}}
function setup(){ctx=new(window.AudioContext||window.webkitAudioContext)();
master=ctx.createGain();master.gain.value=0;sg=ctx.createGain();sg.gain.value=muted?0:.9;
const cp=ctx.createDynamicsCompressor();master.connect(cp);sg.connect(cp);cp.connect(ctx.destination);
bus=ctx.createGain();const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=1500;bus.connect(lp);lp.connect(master);
const dl=ctx.createDelay(1),fb=ctx.createGain(),wet=ctx.createGain();dl.delayTime.value=.45;fb.gain.value=.4;wet.gain.value=.4;lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master)}
const api={
ready(){try{if(!ctx)setup();if(ctx.state=="suspended")ctx.resume()}catch(e){}},
play(){api.ready();if(!ctx||playing)return;playing=true;step=0;next=ctx.currentTime+.1;master.gain.setTargetAtTime(muted?0:.45,ctx.currentTime,.1);timer=setInterval(sched,80)},
stop(){if(!ctx||!playing)return;playing=false;clearInterval(timer);master.gain.setTargetAtTime(0,ctx.currentTime,.15)},
sync(on){if(!ctx)return;try{if(on&&ctx.state=="suspended")ctx.resume();else if(!on&&ctx.state=="running")ctx.suspend()}catch(e){}},
toggle(){muted=!muted;if(ctx){sg.gain.setTargetAtTime(muted?0:.9,ctx.currentTime,.05);master.gain.setTargetAtTime(muted||!playing?0:.45,ctx.currentTime,.05)}return muted},
muted:()=>muted,
sfx(list){if(!ctx||muted)return;const t=ctx.currentTime;list.forEach(e=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=e[3]||"triangle";o.frequency.value=e[0];env(g,t+e[1],.005,e[4]||.25,e[2]);o.connect(g);g.connect(sg);o.start(t+e[1]);o.stop(t+e[1]+e[2]+.1)})}};
return api})();
const FR=[262,330,392,523,440,294];
const kora=f=>mus.sfx([[f,0,.5,"triangle",.4],[f*2,0,.28,"sine",.14],[f*3,0,.12,"sine",.05]]),
sBad=()=>mus.sfx([[110,0,.3,"sawtooth",.28],[95,.05,.3,"square",.12]]),
sOk=()=>mus.sfx([[660,0,.12],[880,.09,.12],[1100,.18,.3]]),
sNew=()=>mus.sfx([[523,0,.15],[784,.12,.15],[1047,.24,.35]]),
sLose=()=>mus.sfx([[330,0,.25],[262,.2,.25],[196,.4,.6]]),
sRec=()=>mus.sfx([[660,0,.15],[880,.1,.15],[1100,.2,.15],[1320,.3,.5]]);

/* ================= STYLE + DOM ================= */
el.innerHTML='<style>.gwp{position:relative}.grow,.gbtns{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap}.gov .gbtns{margin-top:4px}.gov .btn.sm{min-width:110px}'+
'.gmu{background:none;border:1px solid rgba(61,242,255,.45);color:#3df2ff;border-radius:10px;padding:0 11px;font-size:16px;line-height:34px}'+
'.gov{position:absolute;top:0;left:0;right:0;bottom:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:rgba(4,8,12,.86);text-align:center;overflow:hidden;animation:govin .4s;padding:8px}'+
'@keyframes govin{from{opacity:0;transform:scale(.94)}}.gov h2{font-size:26px;letter-spacing:2px;color:#FCD116;text-shadow:0 0 18px rgba(252,209,22,.8)}.gov .big{font-size:22px;font-weight:800;color:#3df2ff}.gov p{color:#9fe9ff;font-size:13px;max-width:92%}.gov .rec{color:#b6ff3b;font-weight:800;text-shadow:0 0 12px #b6ff3b;animation:grp 1s infinite alternate}'+
'@keyframes grp{to{opacity:.45}}.gcf{position:absolute;top:-12px;width:8px;height:12px;animation:gcfall linear forwards}@keyframes gcfall{to{transform:translateY(520px) rotate(540deg);opacity:.9}}</style>'+
'<div class="nrow"><span class="m1"></span><span class="m2"></span></div><div class="gwp"><canvas class="nx"></canvas></div><p class="hint"></p><div class="grow"></div>';
const cv=$("canvas",el),x=cv.getContext("2d"),Z=Math.max(240,Math.min(innerWidth-24,420,innerHeight-260)),dpr=Math.min(window.devicePixelRatio||1,2);
cv.width=cv.height=Z*dpr;cv.style.width=cv.style.height=Z+"px";x.scale(dpr,dpr);
const wp=$(".gwp",el),h=$(".hint",el),m1=$(".m1",el),m2=$(".m2",el);
const mb=document.createElement("button");mb.className="gmu";mb.innerHTML="&#9834;";
const up=()=>{mb.style.opacity=mus.muted()?.4:1;mb.style.textDecoration=mus.muted()?"line-through":"none"};
mb.onclick=()=>{mus.ready();mus.toggle();up();save()};up();$(".grow",el).appendChild(mb);
const hb=document.createElement("button");hb.className="gmu";hb.style.cssText="padding:0 14px;font-size:13px;font-weight:700;display:none";$(".grow",el).appendChild(hb);
cv.style.touchAction="none";

/* ================= ÉTAT ================= */
const C=["#3df2ff","#ff3bd4","#b6ff3b","#ffd426","#ff3b5c","#a56bff"];
let np=4,P=[],R=0,seq=[],exp=[],pos=0,busy=true,ph="menu",glow=[0,0,0,0,0,0],beams=[],lastP=-1,hints=0,rings=[],sparks=[],run=0,round=0,lives=3,score=0,combo=0,tl=-1,tmax=4,rev=false,shake=0,tt=0,last=performance.now(),ov=null;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function layout(){P=[];for(let i=0;i<np;i++){const a=-Math.PI/2+i*2*Math.PI/np;P.push([Z/2+Math.cos(a)*Z*.34,Z/2+Math.sin(a)*Z*.34])}R=Z*(np==4?.14:np==5?.125:.105)}
layout();
const setHint=t=>h.textContent=t;
function info(){m1.innerHTML="Manche <b>"+round+"</b> · <b>"+score+"</b> pts";m2.innerHTML=(rev&&ph=="play"?'<span style="color:#ff3bd4">INVERSE</span> ':"")+'<span style="color:#ff3b5c">'+"♥".repeat(Math.max(0,lives))+'</span><span style="opacity:.3">'+"♥".repeat(Math.max(0,ML()-lives))+"</span>"}
function flash(i){glow[i]=1;if(lastP>=0&&lastP!=i)beams.push({a:lastP,b:i,al:1});lastP=i;
rings.push({x:P[i][0],y:P[i][1],r:R,c:C[i],a:1});
for(let k=0;k<8;k++){const a=Math.random()*6.28,s=1+Math.random()*2.5;sparks.push({x:P[i][0],y:P[i][1],vx:Math.cos(a)*s,vy:Math.sin(a)*s,a:1,c:C[i]})}
kora(FR[i]);try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}}
function updHb(){hb.style.display=ph=="play"?"":"none";hb.textContent="\u21BA R\u00e9\u00e9couter ("+hints+")";hb.style.opacity=hints>0?1:.4}
hb.onclick=()=>{if(busy||ph!="play"||hints<=0)return;hints--;updHb();play()};
function hideOv(){if(ov){ov.remove();ov=null}}
function showOv(html,conf){hideOv();ov=document.createElement("div");ov.className="gov";ov.innerHTML=html;wp.appendChild(ov);
if(conf)for(let i=0;i<46;i++){const s=document.createElement("span");s.className="gcf";s.style.cssText="left:"+Math.random()*100+"%;background:"+["#FCD116","#3df2ff","#ff3bd4","#b6ff3b"][i%4]+";animation-duration:"+(1.8+Math.random()*1.8)+"s;animation-delay:"+Math.random()*.8+"s";ov.appendChild(s)}
return ov}

/* ================= PARTIE ================= */
function start(){run++;ph="play";seq=[];round=0;lives=ML();score=0;combo=0;np=4;layout();beams=[];rings=[];sparks=[];glow=[0,0,0,0,0,0];lastP=-1;hints=lv=="e"?3:1;updHb();hideOv();mus.ready();mus.play();A.score(0);nextRound()}
function nextRound(){round++;const old=np;const t1=lv=="e"?10:8,t2=lv=="e"?20:16;np=round<t1?4:round<t2?5:6;if(np!=old){layout();sNew()}
seq.push(Math.random()*np|0);tmax=lv=="e"?Math.max(3.2,6-round*.08):Math.max(1.8,4.2-round*.1);play(np!=old)}
async function play(newPad){const my=run;busy=true;tl=-1;rev=round%(lv=="e"?6:4)==0;lastP=-1;exp=rev?seq.slice().reverse():seq.slice();info();
setHint(newPad?"Nouveau pad ! Écoute…":rev?"Écoute… puis rejoue À L'ENVERS":"Écoute…");
await wait(650);if(my!=run)return;
for(const i of seq){flash(i);await wait(lv=="e"?Math.max(300,720-seq.length*16):Math.max(240,560-seq.length*14));if(my!=run)return}
busy=false;pos=0;tl=tmax;setHint(rev?"À l'envers !":"À toi !")}
function press(i){if(busy||ph!="play")return;flash(i);
if(i!=exp[pos]){mistake("Mauvaise note");return}
combo++;score+=5+Math.ceil(Math.max(0,tl)/tmax*5)+(combo>8?2:0);pos++;tl=tmax;info();
if(pos==exp.length){busy=true;tl=-1;const b=10*round;score+=b;A.score(score);info();setHint("Bravo ! +"+b);sOk();const my=run;setTimeout(()=>{if(my==run)nextRound()},900)}}
function mistake(msg){busy=true;tl=-1;combo=0;lives--;shake=9;sBad();info();try{navigator.vibrate&&navigator.vibrate(60)}catch(e){}
if(lives<=0){over();return}
setHint(msg+" · il te reste "+lives+" vie"+(lives>1?"s":"")+". Écoute encore");const my=run;setTimeout(()=>{if(my==run)play()},1200)}
function over(){ph="over";run++;mus.stop();tot++;const done=Math.max(0,round-1),rR=done>br,rS=score>bsc;if(rR)br=done;if(rS)bsc=score;save();A.end(score);
const win=(rR||rS)&&score>0;win?sRec():sLose();info();setHint("");
const o=showOv('<h2>'+(win?"FÉLICITATIONS !":"SIGNAL PERDU")+'</h2><div class="big">Manche '+done+' · '+score+' pts</div><p>Mode '+(lv=="e"?"Facile":"Normal")+'</p><p>'+(win?"":"Record : manche "+br+" · "+bsc+" pts")+'</p>'+(rR?'<p class="rec">Record de manches : '+br+' ★</p>':"")+(rS?'<p class="rec">Record de score : '+bsc+' ★</p>':"")+'<div class="gbtns"><button class="btn sm o1">Rejouer</button><button class="btn sm o2">Menu</button></div>',win);
$(".o1",o).onclick=start;$(".o2",o).onclick=home;updHb()}
cv.onpointerdown=e=>{if(ph!="play")return;mus.ready();const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*Z/r.width,py=(e.clientY-r.top)*Z/r.height;
let b=-1,bd=1e9;P.forEach((p,i)=>{const d=Math.hypot(px-p[0],py-p[1]);if(d<bd){bd=d;b=i}});if(bd<R*2.6)press(b)};

/* ================= DESSIN ================= */
function draw(dt){x.save();x.clearRect(0,0,Z,Z);
if(shake>.2){x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=Math.pow(.85,dt)}else shake=0;
const ac=rev&&ph=="play"?"#ff3bd4":"#3df2ff";
const bg=x.createRadialGradient(Z/2,Z/2,Z*.04,Z/2,Z/2,Z*.62);bg.addColorStop(0,"rgba("+parseInt(ac.slice(1,3),16)+","+parseInt(ac.slice(3,5),16)+","+parseInt(ac.slice(5,7),16)+",.2)");bg.addColorStop(1,"rgba(0,0,0,0)");
x.globalAlpha=.55+.35*(.5+.5*Math.sin(tt*.03));x.fillStyle=bg;x.fillRect(0,0,Z,Z);x.globalAlpha=1;
x.strokeStyle="rgba(61,242,255,.07)";x.lineWidth=1;for(let i=1;i<10;i++){x.beginPath();x.moveTo(i*Z/10,0);x.lineTo(i*Z/10,Z);x.moveTo(0,i*Z/10);x.lineTo(Z,i*Z/10);x.stroke()}
const ph2=tt*.012;x.save();x.translate(Z/2,Z/2);x.rotate(ph2);x.strokeStyle=ac;x.globalAlpha=.4;x.shadowColor=ac;x.shadowBlur=10;x.lineWidth=1.5;
for(let k=0;k<2;k++){x.beginPath();for(let j=0;j<6;j++){const a=j*Math.PI/3,rr=Z*(.12+k*.05);x.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}x.closePath();x.stroke();x.rotate(-ph2*2)}x.restore();
x.strokeStyle="rgba(255,255,255,.12)";x.lineWidth=1;x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.stroke();
if(ph=="play"){x.save();x.textAlign="center";x.textBaseline="middle";x.fillStyle="#fff";x.shadowColor=ac;x.shadowBlur=12;x.font="bold "+Math.round(Z*.1)+"px system-ui,sans-serif";x.fillText(rev?"\u21BA":String(round),Z/2,Z/2);x.restore()}
if(tl>=0&&ph=="play"){const f=Math.max(0,tl/tmax),rr=Z*.17;x.save();x.lineWidth=4;x.lineCap="round";x.strokeStyle=f>.5?"#b6ff3b":f>.25?"#ffd426":"#ff3b5c";x.shadowColor=x.strokeStyle;x.shadowBlur=10;x.beginPath();x.arc(Z/2,Z/2,rr,-Math.PI/2,-Math.PI/2+f*Math.PI*2);x.stroke();x.restore()}
beams=beams.filter(b=>b.al>.03);beams.forEach(b=>{b.al*=Math.pow(.9,dt);if(!P[b.a]||!P[b.b])return;x.save();x.globalCompositeOperation="lighter";x.globalAlpha=b.al;x.strokeStyle=C[b.b];x.lineWidth=3;x.shadowColor=C[b.b];x.shadowBlur=14;x.beginPath();x.moveTo(P[b.a][0],P[b.a][1]);x.lineTo(P[b.b][0],P[b.b][1]);x.stroke();x.restore()});
P.forEach((p,i)=>{const g=glow[i]||0;glow[i]=g>.01?g*Math.pow(.9,dt):0;const r=R*(1+.25*g)*(1+.03*Math.sin(tt*.05+i));
x.save();x.shadowColor=C[i];x.shadowBlur=10+26*g;x.fillStyle="rgba(8,14,18,.9)";x.strokeStyle=C[i];x.lineWidth=2+g;
x.beginPath();x.arc(p[0],p[1],r,0,7);x.fill();x.globalAlpha=g;x.fillStyle=C[i];x.fill();x.globalAlpha=1;x.stroke();
x.beginPath();x.arc(p[0],p[1],r*.45,0,7);x.globalAlpha=.35+.55*g;x.fillStyle=g>.5?"#fff":C[i];x.fill();x.restore()});
rings=rings.filter(g=>g.a>.02);rings.forEach(g=>{g.r+=3*dt;g.a*=Math.pow(.93,dt);x.save();x.globalAlpha=g.a;x.strokeStyle=g.c;x.lineWidth=3;x.shadowColor=g.c;x.shadowBlur=12;x.beginPath();x.arc(g.x,g.y,g.r,0,7);x.stroke();x.restore()});
sparks=sparks.filter(s=>s.a>.04);sparks.forEach(s=>{s.x+=s.vx*dt;s.y+=s.vy*dt;s.a*=Math.pow(.93,dt);x.save();x.globalAlpha=s.a;x.fillStyle=s.c;x.fillRect(s.x,s.y,3,3);x.restore()});
if(ph=="play"&&exp.length){const n=exp.length,wd=Math.min(14,(Z-40)/n),sx=Z/2-n*wd/2,pp=busy?0:pos;for(let k=0;k<n;k++){x.beginPath();x.arc(sx+k*wd+wd/2,Z-12,Math.min(4,wd*.32),0,7);x.fillStyle=k<pp?ac:"rgba(255,255,255,.2)";x.fill()}}
x.restore()}
(function lp(now){requestAnimationFrame(lp);const dt=Math.min(2.5,(now-last)/16.67||1);last=now;if(!A.on())return;tt+=dt;
if(ph=="play"&&!busy&&tl>=0){tl-=dt/60;if(tl<=0){tl=-1;mistake("Trop lent !")}}
draw(dt)})(performance.now());
setInterval(()=>mus.sync(A.on()),400);

/* ================= ÉCRAN DE DÉPART ================= */
function home(){ph="menu";run++;lives=ML();mus.stop();updHb();info();setHint("Facile : 5 vies, 3 réécoutes, plus de temps. Normal : le défi d'origine.");
const o=showOv('<h2>ÉCHO DU GRIOT</h2><p>Regarde et écoute la mélodie, puis rejoue-la dans le même ordre. Les points en bas montrent ta progression.</p>'
+(rec.e.br||rec.e.bsc||rec.n.br||rec.n.bsc?'<p>Records · Facile : manche <b style="color:#FCD116">'+rec.e.br+'</b> · Normal : manche <b style="color:#FCD116">'+rec.n.br+'</b></p>':"")
+'<div class="gbtns"><button class="btn sm o1">Facile</button><button class="btn sm o2">Normal</button></div>');
$(".o1",o).onclick=()=>{lv="e";br=rec.e.br;bsc=rec.e.bsc;save();start()};
$(".o2",o).onclick=()=>{lv="n";br=rec.n.br;bsc=rec.n.bsc;save();start()}}
info();home();
};
