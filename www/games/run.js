/* Ouaga Rush - 9e jeu de Game-Zone by CNS.corp
   Course sans fin dans un marché de Ouagadougou. Aucun fichier existant n'est modifié
   sauf une ligne <script> dans index.html. */
(function(){
GAMES.push({id:"run",n:"Ouaga Rush",d:"Cours dans le marché, esquive les motos",i:"bolt",m:"",c:["#FCD116","#EF2B2D"],al:["ouaga","rush","surf"],
how:"Tu cours dans un marché de Ouaga. Glisse à gauche ou à droite pour changer de voie, vers le haut pour sauter les étals, vers le bas pour passer sous les banderoles. Évite les motos, ramasse les cauris. Tu as deux vies et ça accélère."});

const CV='<svg class="cv" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="bgrun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb5ea"/><stop offset="1" stop-color="#ffe9a8"/></linearGradient></defs>'+
'<rect width="160" height="120" fill="url(#bgrun)"/><circle cx="122" cy="26" r="13" fill="#FCD116"/>'+
'<path d="M0,60 Q30,46 62,60 T124,58 T160,56 V120 H0Z" fill="#2f8f4f"/>'+
'<path d="M74,56 L86,56 L152,120 L8,120Z" fill="#b5532b"/><path d="M80,58 L80,120" stroke="#ffe9a8" stroke-width="2" stroke-dasharray="6 6" opacity=".8"/>'+
'<path d="M24,66 q-4,-22 0,-30 q4,8 0,30z" fill="#6b4a2b"/><circle cx="24" cy="34" r="9" fill="#1f6b3a"/>'+
'<g transform="translate(58,108)"><circle cx="-10" cy="-6" r="6" fill="#222"/><circle cx="10" cy="-6" r="6" fill="#222"/><path d="M-12,-8 L-3,-20 L8,-20 L14,-9Z" fill="#EF2B2D"/><circle cx="2" cy="-30" r="5" fill="#3a2a1a"/><rect x="-4" y="-26" width="12" height="12" fill="#fff"/></g>'+
'<g fill="#fff3d6" stroke="#8a5a2b" stroke-width="1"><ellipse cx="104" cy="96" rx="4.5" ry="6"/><ellipse cx="112" cy="84" rx="4" ry="5.5"/><ellipse cx="119" cy="74" rx="3.5" ry="5"/></g>'+
'<rect x="0" y="0" width="160" height="5" fill="#EF2B2D"/><rect x="0" y="5" width="160" height="5" fill="#FCD116"/><rect x="0" y="10" width="160" height="5" fill="#009E49"/></svg>';
const oc=window.cover;window.cover=function(id){return id==="run"?CV:(oc?oc(id):"")};

G.run=function(el,A){
el.innerHTML='<canvas></canvas><p class="hint">Glisse &larr; &rarr; pour changer de voie, &uarr; sauter, &darr; se baisser</p>';
const cv=$("canvas",el),x=cv.getContext("2d"),dpr=Math.min(window.devicePixelRatio||1,2),
W=Math.min(innerWidth-20,460),H=Math.max(320,Math.min(innerHeight-170,740));
cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";cv.style.touchAction="none";cv.style.borderRadius="14px";x.scale(dpr,dpr);
const hz=H*.30,gb=H-46,LW=W*.30,K=.05,PD=2,CX=W/2,SC=W/430,JT=.62,SPAWN=100;
const P=d=>1/(1+d*K),Y=p=>hz+(gb-hz)*p,LX=(l,p)=>CX+l*LW*p;
const au=new Audio("games/run.mp3");au.loop=true;au.volume=.8;
let best=+(localStorage.getItem("runbest")||0);
let st=0,endAt=0,obs,cau,sce,dist,tm,v,cc,lives,inv,px,tl,jt,sl,nextSp,nextSc,shake,pop,ph,sc,newRec,flash=0;
const COL=["#EF2B2D","#009E49","#FCD116"],LN=[-1,0,1];
const rnd=a=>a[Math.random()*a.length|0],shuf=a=>a.slice().sort(()=>Math.random()-.5);
const jy=()=>{if(jt<=0)return 0;const t=jt/JT;return 4*t*(1-t)};
function reset(){obs=[];cau=[];sce=[];dist=0;tm=0;v=16;cc=0;lives=2;inv=0;px=0;tl=0;jt=0;sl=0;nextSp=14;nextSc=0;shake=0;pop=[];ph=0;sc=0;newRec=false;flash=0;
for(let d=6;d<SPAWN;d+=5+Math.random()*4)spawnScene(d);A.score(0)}
function spawnScene(d){const s=Math.random()<.5?-1:1;sce.push({s,d:d==null?SPAWN:d,k:Math.random()*4|0,o:2.3+Math.random()*1.6})}
function coins(l,d0,n,arc){for(let i=0;i<n;i++)cau.push({l,d:d0+i*3,h:arc?Math.sin(i/(n-1)*Math.PI):0})}
function spawnRow(){const r=Math.random(),D=SPAWN;
if(r<.34){const n=Math.random()<.45?2:1,ls=shuf(LN).slice(0,n);
ls.forEach(l=>obs.push({t:"m",l,d:D,c:rnd(COL)}));
const fr=LN.filter(l=>!ls.includes(l));if(Math.random()<.7)coins(rnd(fr),D-3,5)}
else if(r<.58){const all=Math.random()<.6,ls=all?LN:shuf(LN).slice(0,2);
ls.forEach(l=>obs.push({t:"e",l,d:D}));
if(all)coins(0,D-6,5,true);else coins(LN.find(l=>!ls.includes(l)),D-3,5)}
else if(r<.8){obs.push({t:"b",l:0,d:D,all:true});coins(rnd(LN),D-6,4)}
else coins(rnd(LN),D,7)}
function say(s,c){pop.push({s,c:c||"#fff",y:H*.42,a:1})}
function start(){reset();st=1;try{au.currentTime=0;au.play().catch(()=>{})}catch(e){}beep(660,.12,"triangle",.15)}
function fin(){if(st!=1)return;st=2;endAt=Date.now();au.pause();A.end(sc);
newRec=sc>best&&sc>0;if(newRec){best=sc;try{localStorage.setItem("runbest",best)}catch(e){}
[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.25,"triangle",.2),i*130));
try{const u=new SpeechSynthesisUtterance("Bravo, champion du Faso !");u.lang="fr-FR";speechSynthesis.speak(u)}catch(e){}}
else beep(110,.5,"sawtooth",.15)}
function ouch(){if(inv>0)return;lives--;inv=1.6;shake=14;flash=1;beep(120,.3,"sawtooth",.2);say("Aïe !","#EF2B2D");if(lives<=0)fin()}
function jump(){if(st!=1||jt>0||sl>0)return;jt=.0001;beep(520,.08,"square",.05)}
function slide(){if(st!=1||sl>0)return;sl=.55;jt=0;beep(220,.08,"sine",.1)}
function lane(d){if(st!=1)return;const n=Math.max(-1,Math.min(1,tl+d));if(n!=tl){tl=n;beep(400,.05,"triangle",.06)}}
let sx=0,sy=0,sd=false,sw=false;
cv.onpointerdown=e=>{e.preventDefault();sx=e.clientX;sy=e.clientY;sd=true;sw=false;try{cv.setPointerCapture(e.pointerId)}catch(_){}};
cv.onpointermove=e=>{if(!sd||sw||st!=1)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<26)return;sw=true;
if(Math.abs(dx)>Math.abs(dy))lane(dx>0?1:-1);else if(dy<0)jump();else slide()};
cv.onpointerup=()=>{if(!sd)return;sd=false;if(sw)return;if(st==0)start();else if(st==2){if(Date.now()-endAt>600)start()}else jump()};
cv.onpointercancel=()=>{sd=false};
document.addEventListener("keydown",e=>{if(!A.on())return;const k=e.key;
if(k=="ArrowLeft")lane(-1);else if(k=="ArrowRight")lane(1);else if(k=="ArrowUp"||k==" ")jump();else if(k=="ArrowDown")slide();else return;e.preventDefault()});
reset();

function update(dt){if(st!=1)return;
tm+=dt;v=Math.min(38,16+tm*.35);const dd=v*dt;dist+=dd;ph+=dt*(9+v*.12);
px+=(tl-px)*Math.min(1,dt*13);
if(jt>0){jt+=dt;if(jt>=JT)jt=0}if(sl>0)sl-=dt;if(inv>0)inv-=dt;shake*=.9;flash*=.9;
obs.forEach(o=>o.d-=dd);cau.forEach(c=>c.d-=dd);sce.forEach(s=>s.d-=dd);
if(dist>=nextSp){spawnRow();nextSp=dist+v*Math.max(.85,1.35-tm*.008)}
if(dist>=nextSc){spawnScene();nextSc=dist+5+Math.random()*4}
for(const o of obs){if(o.hit||o.d>PD+1||o.d<PD-1)continue;
if(!(o.all||Math.abs(px-o.l)<.62))continue;
const hit=o.t=="m"?true:o.t=="e"?jy()<.42:sl<=0;
if(hit){o.hit=true;ouch()}}
for(const c of cau){if(c.got||c.d>PD+1.2||c.d<PD-1.2)continue;
if(Math.abs(px-c.l)<.6){c.got=true;cc++;beep(880+Math.min(cc,20)*20,.07,"triangle",.1)}}
obs=obs.filter(o=>o.d>-8);cau=cau.filter(c=>c.d>-8&&!c.got);sce=sce.filter(s=>s.d>-8);
const n=Math.floor(dist/4)+cc*5;if(n!=sc){sc=n;A.score(sc)}
pop.forEach(p=>{p.y-=1;p.a-=.02});pop=pop.filter(p=>p.a>0)}

function ell(cx,cy,rx,ry,c){x.fillStyle=c;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);x.fill()}
function moto(cx,gy,s,c){x.save();x.translate(cx,gy);x.scale(s,s);
ell(0,0,46,9,"rgba(0,0,0,.25)");
x.fillStyle="#1b1b1b";[-30,30].forEach(a=>{x.beginPath();x.arc(a,-16,16,0,7);x.fill()});
x.fillStyle="#bbb";[-30,30].forEach(a=>{x.beginPath();x.arc(a,-16,6,0,7);x.fill()});
x.fillStyle=c;x.beginPath();x.moveTo(-34,-20);x.lineTo(-10,-48);x.lineTo(20,-48);x.lineTo(34,-24);x.lineTo(28,-16);x.lineTo(-26,-16);x.closePath();x.fill();
x.fillStyle="#222";x.fillRect(-18,-54,34,8);
x.strokeStyle="#333";x.lineWidth=5;x.beginPath();x.moveTo(30,-18);x.lineTo(26,-62);x.lineTo(14,-66);x.stroke();
ell(36,-34,5,5,"#fff7b0");
x.fillStyle="#f4f4f4";x.fillRect(-14,-90,26,38);x.fillStyle="#EF2B2D";x.fillRect(-14,-74,26,5);
ell(-1,-102,12,12,"#3a2a1a");ell(-1,-106,13,8,"#FCD116");x.restore()}
function etal(cx,gy,s){x.save();x.translate(cx,gy);x.scale(s,s);
ell(0,0,50,8,"rgba(0,0,0,.22)");
x.fillStyle="#7a4a22";x.fillRect(-44,-20,8,20);x.fillRect(36,-20,8,20);
x.fillStyle="#FCD116";x.fillRect(-52,-36,104,18);
for(let i=0;i<6;i++){x.fillStyle=i%2?"#EF2B2D":"#009E49";x.fillRect(-52+i*17.3+4,-36,8,18)}
[[-26,-46,12,"#e0842c"],[0,-49,14,"#c9692a"],[26,-46,12,"#e0842c"]].forEach(a=>{ell(a[0],a[1],a[2],a[2]*.9,a[3]);ell(a[0]-4,a[1]-4,3,2.5,"rgba(255,255,255,.4)")});
x.restore()}
function banner(gy,p,s){const a=LX(-1.55,p),b=LX(1.55,p),h=104*s;
x.strokeStyle="#6b4a2b";x.lineWidth=Math.max(2,7*s);x.lineCap="round";
x.beginPath();x.moveTo(a,gy);x.lineTo(a,gy-h-8*s);x.moveTo(b,gy);x.lineTo(b,gy-h-8*s);x.stroke();
const y0=gy-h,hh=44*s;
x.fillStyle="#EF2B2D";x.fillRect(a,y0,b-a,hh/2);x.fillStyle="#009E49";x.fillRect(a,y0+hh/2,b-a,hh/2);
x.fillStyle="#FCD116";x.beginPath();const cx=(a+b)/2,cy=y0+hh/2,R=hh*.38;
for(let i=0;i<10;i++){const r=i%2?R*.42:R,an=-Math.PI/2+i*Math.PI/5;x.lineTo(cx+Math.cos(an)*r,cy+Math.sin(an)*r)}x.closePath();x.fill()}
function cauri(cx,cy,s,t){x.save();x.translate(cx,cy);x.scale(s,s);x.rotate(Math.sin(t)*.3);
ell(0,0,10,14,"#fff3d6");x.strokeStyle="#8a5a2b";x.lineWidth=1.5;x.beginPath();x.ellipse(0,0,10,14,0,0,7);x.stroke();
x.beginPath();x.moveTo(0,-9);x.quadraticCurveTo(3,0,0,9);x.stroke();x.restore()}
function scene(o,p){const cx=LX(o.s*o.o,p),gy=Y(p),s=p*SC*1.15;if(cx<-80||cx>W+80)return;
x.save();x.translate(cx,gy);x.scale(s,s);
if(o.k==0){x.fillStyle="#6b4a2b";x.beginPath();x.moveTo(-18,0);x.quadraticCurveTo(-26,-40,-9,-78);x.lineTo(9,-78);x.quadraticCurveTo(26,-40,18,0);x.fill();
[[-22,-86,18],[0,-96,22],[22,-86,18]].forEach(a=>ell(a[0],a[1],a[2],a[2]*.7,"#2f8f4f"))}
else if(o.k==1){x.fillStyle="#c9692a";x.fillRect(-26,-36,52,36);x.fillStyle="#d9b44a";x.beginPath();x.moveTo(-36,-34);x.lineTo(36,-34);x.lineTo(0,-80);x.closePath();x.fill();x.fillStyle="#3a1f0a";x.fillRect(-7,-24,14,24)}
else if(o.k==2){x.fillStyle="#7a4a22";x.fillRect(-3,-50,6,50);ell(0,-62,26,22,"#1f6b3a");ell(-8,-70,10,8,"#2f8f4f")}
else{x.fillStyle="#7a4a22";x.fillRect(-30,-24,5,24);x.fillRect(25,-24,5,24);x.fillStyle=o.s>0?"#EF2B2D":"#009E49";x.beginPath();x.moveTo(-40,-24);x.lineTo(40,-24);x.lineTo(30,-44);x.lineTo(-30,-44);x.closePath();x.fill();
ell(-10,-30,8,7,"#e0842c");ell(8,-30,8,7,"#FCD116")}
x.restore()}
function runner(cx,gy,s){if(inv>0&&Math.floor(inv*12)%2)return;
const J=jy(),air=jt>0,sld=sl>0;x.save();x.translate(cx,gy);x.scale(s,s);
ell(0,0,26*(1-J*.3),7,"rgba(0,0,0,.28)");
if(air)x.translate(0,-J*78);
if(sld){x.translate(0,0);x.scale(1.2,.55)}
const a=Math.sin(ph),b=-a;x.lineCap="round";x.lineWidth=9;x.strokeStyle="#009E49";
const leg=(q)=>{x.beginPath();x.moveTo(0,-44);if(air)x.lineTo(q*9,-26);else x.lineTo(q*16,-4-8*Math.max(0,Math.cos(ph)*(q>0?1:-1)));x.stroke()};
leg(a);leg(b);
x.fillStyle="#FCD116";x.beginPath();x.moveTo(-15,-42);x.lineTo(15,-42);x.lineTo(13,-86);x.lineTo(-13,-86);x.closePath();x.fill();
x.fillStyle="#EF2B2D";x.fillRect(-15,-62,30,6);
x.lineWidth=7;x.strokeStyle="#6b4226";
[a,b].forEach(q=>{x.beginPath();x.moveTo(0,-80);x.lineTo(q*20,-62+(air?-10:Math.abs(q)*-6));x.stroke()});
ell(0,-98,12,12,"#6b4226");x.fillStyle="#EF2B2D";x.fillRect(-12,-104,24,5);
x.restore()}

function draw(){x.save();
if(shake>.5)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
let g=x.createLinearGradient(0,0,0,hz);g.addColorStop(0,"#4fb5ea");g.addColorStop(1,"#ffe9a8");x.fillStyle=g;x.fillRect(0,0,W,hz+2);
ell(W*.72,hz-46,38,38,"rgba(252,209,22,.35)");ell(W*.72,hz-46,26,26,"#FCD116");
x.fillStyle="#2f8f4f";x.beginPath();x.moveTo(0,hz);for(let i=0;i<=W;i+=12)x.lineTo(i,hz-10-8*Math.sin(i*.03+1)-5*Math.sin(i*.09));x.lineTo(W,hz);x.fill();
x.fillStyle="#e9c97a";x.fillRect(0,hz,W,H-hz);
const hw=LW*1.62;g=x.createLinearGradient(0,hz,0,H);g.addColorStop(0,"#e0916a");g.addColorStop(1,"#a8452a");x.fillStyle=g;
const bp=(H-hz)/(gb-hz);x.beginPath();x.moveTo(CX,hz);x.lineTo(CX+hw*bp,H);x.lineTo(CX-hw*bp,H);x.closePath();x.fill();
const DL=8,off=dist%DL;
const strip=(l,d1,d2,w,c)=>{if(d2<=0)return;d1=Math.max(d1,0);const p1=P(d1),p2=P(d2),w1=w*LW*p1,w2=w*LW*p2;
x.fillStyle=c;x.beginPath();x.moveTo(LX(l,p1)-w1,Y(p1));x.lineTo(LX(l,p1)+w1,Y(p1));x.lineTo(LX(l,p2)+w2,Y(p2));x.lineTo(LX(l,p2)-w2,Y(p2));x.closePath();x.fill()};
for(let k=0;k<16;k++){const d=k*DL-off,ci=(k+Math.floor(dist/DL))%3;
strip(-.5,d,d+DL*.45,.03,"rgba(255,244,214,.85)");strip(.5,d,d+DL*.45,.03,"rgba(255,244,214,.85)");
strip(-1.62,d,d+DL,.06,COL[ci]);strip(1.62,d,d+DL,.06,COL[ci])}
// objets triés du plus loin au plus proche
const L=[];sce.forEach(o=>L.push({d:o.d,f:()=>scene(o,P(o.d))}));
obs.forEach(o=>L.push({d:o.d,f:()=>{const p=P(o.d),s=p*SC;if(o.t=="m")moto(LX(o.l,p),Y(p),s,o.c);else if(o.t=="e")etal(LX(o.l,p),Y(p),s);else banner(Y(p),p,s)}}));
cau.forEach(c=>L.push({d:c.d,f:()=>{const p=P(c.d),s=p*SC;cauri(LX(c.l,p),Y(p)-(26+c.h*52)*s-Math.sin(tm*6+c.d)*3*s,s,tm*5+c.d)}}));
L.push({d:PD,f:()=>{const p=P(PD);runner(LX(px,p),Y(p),p*SC*1.05)}});
L.sort((a,b)=>b.d-a.d);L.forEach(o=>{if(o.d>-6)o.f()});
x.restore();
if(flash>.05){x.fillStyle="rgba(239,43,45,"+(flash*.35)+")";x.fillRect(0,0,W,H)}
// bandeau + HUD
x.fillStyle="#EF2B2D";x.fillRect(0,0,W,4);x.fillStyle="#FCD116";x.fillRect(0,4,W,4);x.fillStyle="#009E49";x.fillRect(0,8,W,4);
x.textAlign="left";x.font="bold 22px system-ui,sans-serif";x.fillStyle="#fff";x.strokeStyle="rgba(0,0,0,.55)";x.lineWidth=4;
x.strokeText(sc,12,38);x.fillText(sc,12,38);
x.textAlign="right";x.strokeText(cc+" cauris",W-12,38);x.fillText(cc+" cauris",W-12,38);
x.textAlign="center";x.font="bold 20px system-ui,sans-serif";x.fillStyle="#EF2B2D";
for(let i=0;i<2;i++){x.globalAlpha=i<lives?1:.25;x.fillText("\u2665",W/2-12+i*24,36)}x.globalAlpha=1;
pop.forEach(p=>{x.globalAlpha=p.a;x.font="bold 30px system-ui,sans-serif";x.fillStyle=p.c;x.strokeText(p.s,W/2,p.y);x.fillText(p.s,W/2,p.y)});x.globalAlpha=1;
if(st!=1){x.fillStyle="rgba(10,14,10,.62)";x.fillRect(0,0,W,H);x.textAlign="center";x.strokeStyle="rgba(0,0,0,.6)";x.lineWidth=5;
if(st==0){x.font="bold 36px system-ui,sans-serif";x.fillStyle="#FCD116";x.strokeText("OUAGA RUSH",W/2,H*.38);x.fillText("OUAGA RUSH",W/2,H*.38);
x.font="16px system-ui,sans-serif";x.fillStyle="#fff";x.fillText("Cours dans le marché, esquive les motos",W/2,H*.38+30);
x.fillText("Glisse pour changer de voie, sauter, te baisser",W/2,H*.38+54);x.font="bold 20px system-ui,sans-serif";x.fillStyle="#18e07a";x.fillText("Touche pour partir",W/2,H*.38+100)}
else{x.font="bold 30px system-ui,sans-serif";x.fillStyle="#FCD116";x.fillText(newRec?"Nouveau record !":"Fin de course",W/2,H*.34);
x.font="bold 22px system-ui,sans-serif";x.fillStyle="#fff";x.fillText("Score "+sc+"   |   "+cc+" cauris",W/2,H*.34+40);
x.font="16px system-ui,sans-serif";x.fillText("Record : "+best,W/2,H*.34+68);
x.font="bold 20px system-ui,sans-serif";x.fillStyle="#18e07a";x.fillText("Touche pour rejouer",W/2,H*.34+112)}}}

let last=0;
(function lp(now){requestAnimationFrame(lp);const dt=Math.min(.05,Math.max(0,((now||0)-last)/1000));last=now||0;
if(!A.on()){if(!au.paused)au.pause();return}
if(st==1&&au.paused)au.play().catch(()=>{});
update(dt);draw()})(0);
};
renderHub();
})();
