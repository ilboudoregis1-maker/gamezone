/* Ouaga Rush 2 - 9e jeu de Game-Zone by CNS.corp : Ouaga 2050, boutique, personnages, planches */
(function(){
const COL=["#EF2B2D","#FCD116","#009E49"];
const SK=[{id:"faso",n:"Faso",p:0,c:["#EF2B2D","#FCD116","#18e0ff"],a:0,t:"Le coureur du pays"},
{id:"sahel",n:"Sahel",p:150,c:["#FCD116","#7b3fa0","#ff3bd4"],a:1,t:"Écharpe du désert"},
{id:"etalon",n:"Étalon",p:300,c:["#009E49","#EF2B2D","#ffffff"],a:2,t:"Panache de champion"},
{id:"yennenga",n:"Yennenga",p:500,c:["#1a2a6b","#FCD116","#18e07a"],a:3,t:"Halo de la princesse"}];
const BD=[{id:"none",n:"À pied",p:0,t:"2 vies"},{id:"skate",n:"Skate",p:250,t:"3 vies"},{id:"hover",n:"Hoverboard",p:600,t:"3 vies + aimant à cauris"}];
GAMES.push({id:"run",n:"Ouaga Rush",d:"Cours dans Ouaga 2050, personnalise ton coureur",i:"bolt",c:["#18e0ff","#EF2B2D"],al:["ouaga","rush","surf"],
how:"Cours dans Ouaga 2050. Glisse à gauche ou à droite pour changer de voie, vers le haut pour sauter les lasers, vers le bas pour passer sous les portiques. Évite les motos. Ramasse les cauris pour enchaîner les combos, et dépense-les dans la boutique : nouveaux coureurs, skate, hoverboard."});
const CV='<svg class="cv" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="bgrun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1f5c"/><stop offset=".6" stop-color="#139fb5"/><stop offset="1" stop-color="#ffe08a"/></linearGradient></defs><rect width="160" height="120" fill="url(#bgrun)"/><circle cx="118" cy="48" r="16" fill="#FCD116"/>'+
'<g fill="#34557f"><rect x="6" y="40" width="18" height="46"/><rect x="26" y="26" width="14" height="60"/><rect x="42" y="46" width="20" height="40"/><rect x="100" y="34" width="16" height="52"/><rect x="120" y="44" width="20" height="42"/><rect x="142" y="30" width="14" height="56"/></g>'+
'<g fill="#FCD116" opacity=".8"><rect x="9" y="48" width="3" height="3"/><rect x="15" y="58" width="3" height="3"/><rect x="29" y="36" width="3" height="3"/><rect x="33" y="50" width="3" height="3"/><rect x="104" y="44" width="3" height="3"/><rect x="146" y="40" width="3" height="3"/></g>'+
'<path d="M72,84 L88,84 L150,120 L10,120Z" fill="#10162b"/><path d="M80,84 L80,120" stroke="#fff" stroke-width="1.5" stroke-dasharray="5 5" opacity=".8"/>'+
'<path d="M72,84 L10,120" stroke="#EF2B2D" stroke-width="2"/><path d="M88,84 L150,120" stroke="#009E49" stroke-width="2"/>'+
'<g transform="translate(80,112)"><rect x="-8" y="-30" width="16" height="22" rx="5" fill="#EF2B2D"/><circle cx="0" cy="-36" r="7" fill="#121a40"/><rect x="-5" y="-39" width="10" height="4" rx="2" fill="#18e0ff"/><rect x="-14" y="-6" width="28" height="4" rx="2" fill="#dff3ff"/></g>'+
'<path d="M30,18 l3,7 7,.6 -5.4,4.6 1.8,7 -6.4,-3.8 -6.4,3.8 1.8,-7 -5.4,-4.6 7,-.6z" fill="#FCD116"/></svg>';
const oc=window.cover;window.cover=function(id){return id==="run"?CV:(oc?oc(id):"")};

function ell(c,cx,cy,rx,ry,f){c.fillStyle=f;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,7);c.fill()}
function rr(c,x,y,w,h,r,f){c.fillStyle=f;c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();c.fill()}
function star(c,cx,cy,R){c.beginPath();for(let i=0;i<10;i++){const r=i%2?R*.42:R,a=-Math.PI/2+i*Math.PI/5;c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}c.closePath()}
function wingIcon(c){c.save();const g=c.createRadialGradient(0,0,2,0,0,24);g.addColorStop(0,"rgba(24,224,255,.6)");g.addColorStop(1,"rgba(24,224,255,0)");c.fillStyle=g;c.beginPath();c.arc(0,0,24,0,7);c.fill();
c.fillStyle="#e9fdff";c.strokeStyle="#18e0ff";c.lineWidth=1.5;
[1,-1].forEach(d=>{c.beginPath();c.moveTo(d*3,5);c.quadraticCurveTo(d*14,-1,d*21,-15);c.quadraticCurveTo(d*13,-9,d*15,-6);c.quadraticCurveTo(d*9,-5,d*11,0);c.quadraticCurveTo(d*5,0,d*3,5);c.closePath();c.fill();c.stroke()});c.restore()}
function limb(c,x0,y0,x1,y1,w,col){c.lineCap="round";c.lineJoin="round";c.strokeStyle="rgba(0,0,0,.4)";c.lineWidth=w+2.5;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();
c.strokeStyle=col;c.lineWidth=w;c.stroke();c.strokeStyle="rgba(255,255,255,.32)";c.lineWidth=Math.max(1,w*.26);c.beginPath();c.moveTo(x0-w*.2,y0);c.lineTo(x1-w*.2,y1);c.stroke()}
function runner(c,cx,gy,s,sk,bd,ph,J,air,sld,F,T){F=F||0;
c.save();c.translate(cx,gy);c.scale(s,s);c.rotate(T||0);
const k=sk.c,A1=k[0],A2=k[1],V=k[2],on=bd!="none"||F>.1;
ell(c,0,0,26*(1-J*.3)*(1-F*.45),7*(1-F*.4),"rgba(0,0,0,.4)");
const hg=c.createRadialGradient(0,0,2,0,0,42);hg.addColorStop(0,V+"88");hg.addColorStop(1,V+"00");c.fillStyle=hg;c.beginPath();c.ellipse(0,0,42,11,0,0,7);c.fill();
if(air)c.translate(0,-J*78);
if(F>0)c.translate(0,-F*72+Math.sin(ph*.8)*3*F);
if(sld)c.scale(1.2,.55);
if(bd=="skate"){rr(c,-28,-10,56,8,4,"#1b2142");rr(c,-28,-10,56,3,2,A2);ell(c,-18,-3,5,5,"#cfd8ff");ell(c,18,-3,5,5,"#cfd8ff")}
if(bd=="hover"){ell(c,0,-2,40,8,"rgba(24,224,255,.35)");rr(c,-30,-14,60,9,5,"#dff3ff");rr(c,-30,-8,60,3,2,"#18e0ff")}
if(bd!="none")c.translate(0,-14);
const a=Math.sin(ph),cs=Math.cos(ph);
// ailes d energie (vol)
if(F>.04){c.save();c.globalAlpha=Math.min(1,F*1.3);const fl=Math.sin(ph*1.7)*9;
[1,-1].forEach(d=>{const g=c.createLinearGradient(d*8,-84,d*70,-100);g.addColorStop(0,"rgba(255,255,255,.95)");g.addColorStop(.5,V);g.addColorStop(1,"rgba(24,224,255,0)");
c.fillStyle=g;c.shadowColor=V;c.shadowBlur=14;c.beginPath();c.moveTo(d*8,-84);c.quadraticCurveTo(d*38,-112-fl,d*(30+44*F),-118-fl*1.4);c.quadraticCurveTo(d*(46*F+14),-100,d*(44*F+8),-96-fl*.4);
c.quadraticCurveTo(d*24,-90,d*8,-76);c.closePath();c.fill()});c.shadowBlur=0;c.restore()}
// jambes articulees
const leg=(hx,fx,fy)=>{const kx=(hx+fx)/2+hx*.4,ky=(-44+fy)/2-3;limb(c,hx,-44,kx,ky,10.5,"#161d44");limb(c,kx,ky,fx,fy+3,9,"#1b2456");
c.save();c.shadowColor=V;c.shadowBlur=8;rr(c,fx-7.5,fy-3,15,8,4,A2);rr(c,fx-7.5,fy+3,15,2.5,1.2,V);c.restore()};
if(on||air){leg(6,12,-5-(air?14:0));leg(-6,-12,-5-(air?8:0))}
else{leg(6,a*16,-5-8*Math.max(0,cs*(a>0?1:-1)));leg(-6,-a*16,-5-8*Math.max(0,cs*(a>0?-1:1)))}
// flammes aux bottes (vol)
if(F>.04){const fh=(14+Math.sin(ph*9)*5)*F;[-9,9].forEach(d=>{const g=c.createLinearGradient(0,-2,0,fh+4);g.addColorStop(0,"#ffffff");g.addColorStop(.35,V);g.addColorStop(1,"rgba(24,224,255,0)");c.fillStyle=g;c.beginPath();c.moveTo(d-5,-2);c.lineTo(d+5,-2);c.lineTo(d,fh+8);c.closePath();c.fill()})}
// echarpe
if(sk.a==1){c.fillStyle=A2;c.beginPath();c.moveTo(-8,-86);c.quadraticCurveTo(-22,-80+Math.sin(ph*2)*6,-38,-70+Math.sin(ph*2+1)*8);c.lineTo(-33,-60+Math.sin(ph*2+1)*8);c.quadraticCurveTo(-20,-76,-6,-80);c.closePath();c.fill()}
// torse 3D : volume par degrade + lumiere de contour
c.fillStyle=A1;c.beginPath();c.moveTo(-19,-84);c.quadraticCurveTo(-19,-90,-12,-90);c.lineTo(12,-90);c.quadraticCurveTo(19,-90,19,-84);c.lineTo(14,-46);c.quadraticCurveTo(0,-41,-14,-46);c.closePath();c.fill();
let g=c.createLinearGradient(-19,0,19,0);g.addColorStop(0,"rgba(0,0,0,.55)");g.addColorStop(.35,"rgba(255,255,255,.18)");g.addColorStop(.7,"rgba(0,0,0,.05)");g.addColorStop(1,"rgba(0,0,0,.5)");
c.fillStyle=g;c.fill();
g=c.createLinearGradient(0,-90,0,-44);g.addColorStop(0,"rgba(255,255,255,.22)");g.addColorStop(1,"rgba(0,0,30,.35)");c.fillStyle=g;c.fill();
c.strokeStyle=V;c.lineWidth=1.6;c.globalAlpha=.9;c.stroke();c.globalAlpha=1;
// ceinture + epine lumineuse
rr(c,-15,-52,30,7,3,A2);c.save();c.shadowColor=V;c.shadowBlur=10;c.fillStyle=V;c.fillRect(-1.6,-86,3.2,32);c.fillRect(-15,-50,30,1.8);c.restore();
// sac propulseur
rr(c,-9,-82,18,22,5,"#0e1433");c.fillStyle="rgba(255,255,255,.12)";c.fillRect(-7,-80,4,18);ell(c,-4,-58,3,3,V);ell(c,4,-58,3,3,V);
if(sk.a==0){c.save();c.shadowColor="#FCD116";c.shadowBlur=8;c.fillStyle="#FCD116";star(c,0,-72,6.5);c.fill();c.restore()}
// bras articules
[[1,a],[-1,-a]].forEach(([sg,q])=>{const w=on?sg*.9:q,hy=-62-Math.abs(q)*5+(air?-10:0),hx=sg*15+w*13,ex=sg*19+w*6,ey=-72;
limb(c,sg*14,-84,ex,ey,8,A1);limb(c,ex,ey,hx,hy,7,A1);ell(c,sg*14,-85,7,7,A2);ell(c,hx,hy,5,5,"#161d44");ell(c,hx,hy,2.6,2.6,V)});
// casque : sphere brillante + visiere neon
const hd=c.createRadialGradient(-5,-106,2,0,-100,16);hd.addColorStop(0,"#5b6bd0");hd.addColorStop(.5,"#1b2457");hd.addColorStop(1,"#070b22");
c.fillStyle=hd;c.beginPath();c.arc(0,-100,14,0,7);c.fill();c.strokeStyle=A2;c.lineWidth=1.5;c.stroke();
c.save();c.shadowColor=V;c.shadowBlur=12;rr(c,-10,-107,20,8,4,V);c.restore();
c.fillStyle="rgba(255,255,255,.55)";c.beginPath();c.ellipse(-4,-105,4.5,1.6,-.2,0,7);c.fill();
c.fillStyle=A2;c.fillRect(-1.5,-114,3,6);ell(c,-13,-98,2.4,2.4,V);ell(c,13,-98,2.4,2.4,V);
if(sk.a==2){c.fillStyle=A2;c.beginPath();c.moveTo(-3,-112);c.quadraticCurveTo(0,-136+Math.sin(ph*2)*3,12,-128);c.quadraticCurveTo(5,-122,6,-112);c.closePath();c.fill()}
if(sk.a==3){c.save();c.shadowColor=A2;c.shadowBlur=10;c.strokeStyle=A2;c.lineWidth=3;c.beginPath();c.ellipse(0,-120,13,4,0,0,7);c.stroke();c.restore()}
c.restore()}

G.run=function(el,A){
const KEY="orx";let D={};try{D=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
D=Object.assign({w:0,own:["faso","none"],sk:"faso",bd:"none"},D);
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){}};
el.innerHTML='<style>.or-m,.or-p{width:min(100%,460px);flex-direction:column;gap:10px}.or-m{display:flex}.or-p{display:none;align-items:center}'+
'.or-top{display:flex;justify-content:space-between;align-items:center}.or-top b{font-size:20px;letter-spacing:1px}'+
'.or-w{padding:6px 12px;border-radius:20px;background:linear-gradient(90deg,#FCD116,#ffb300);color:#1a1200;font-weight:700}'+
'.or-pv{display:flex;gap:14px;align-items:center;padding:10px;border-radius:16px;background:linear-gradient(135deg,#0a1f5c,#0e7f86);border:1px solid #18e0ff66}'+
'.or-pv small{color:#bfeaf0;display:block;margin-top:4px}.or-tabs{display:flex;gap:8px}'+
'.or-tabs button{flex:1;padding:9px;border-radius:12px;border:1px solid #243028;background:#141a16;color:#fff;font-weight:600}.or-tabs button.on{background:#18e0ff;color:#002;border-color:#18e0ff}'+
'.or-it{display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;background:#141a16;border:1px solid #243028}.or-it.sel{border-color:#18e07a}'+
'.or-it .sw{width:34px;height:34px;border-radius:10px;flex:none}.or-it .tx{flex:1;min-width:0}.or-it small{color:#9aa;display:block}'+
'.or-it button{padding:8px 12px;border-radius:10px;border:0;font-weight:700;background:#FCD116;color:#1a1200}.or-it button.ok{background:#18e07a;color:#002}.or-it button.no{background:#333;color:#999}'+
'.or-go{padding:14px;border-radius:16px;border:0;font-size:18px;font-weight:800;color:#fff;background:linear-gradient(90deg,#EF2B2D,#ff7a1a)}'+
'.or-sh{padding:10px 18px;border-radius:12px;border:1px solid #18e0ff;background:#0b1a3a;color:#18e0ff;font-weight:700}'+'.or-m{animation:orIn .5s cubic-bezier(.2,.9,.3,1.2)}@keyframes orIn{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}.or-pv{background:linear-gradient(135deg,#0a1f5c,#0e7f86 60%,#18e0ff55);box-shadow:0 0 24px #18e0ff33,inset 0 0 20px #ffffff10}.or-pc{animation:orFloat 2.4s ease-in-out infinite}@keyframes orFloat{50%{transform:translateY(-6px)}}.or-go{box-shadow:0 6px 24px #ef2b2d66;transition:transform .15s;animation:orPulse 1.8s infinite}.or-go:active{transform:scale(.96)}@keyframes orPulse{50%{box-shadow:0 6px 34px #ff7a1aaa}}.or-it{transition:transform .15s,border-color .2s,box-shadow .2s}.or-it:active{transform:scale(.98)}.or-it.sel{box-shadow:0 0 14px #18e07a55}.or-tabs button{transition:all .2s}.or-sh{transition:transform .15s}.or-sh:active{transform:scale(.95)}</style>'+
'<div class="or-m"><div class="or-top"><b>OUAGA RUSH</b><span class="or-w"></span></div>'+
'<div class="or-pv"><canvas class="or-pc" width="120" height="150" style="width:120px;height:150px"></canvas><div><b class="or-pn"></b><small class="or-pt"></small><small class="or-rc"></small></div></div>'+
'<div class="or-tabs"><button class="t0 on">Coureurs</button><button class="t1">Planches</button></div><div class="or-ls" style="display:flex;flex-direction:column;gap:8px"></div>'+
'<button class="or-go">JOUER</button></div>'+
'<div class="or-p"><canvas class="or-c"></canvas><p class="hint">Glisse &larr; &rarr; voies, &uarr; sauter, &darr; se baisser</p><button class="or-sh">Boutique</button></div>';
const M=$(".or-m",el),PV=$(".or-p",el),cv=$(".or-c",el),x=cv.getContext("2d"),pcv=$(".or-pc",el),pc=pcv.getContext("2d");
const dpr=Math.min(window.devicePixelRatio||1,2),W=Math.min(innerWidth-20,460),H=Math.max(320,Math.min(innerHeight-240,700));
cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";cv.style.touchAction="none";cv.style.borderRadius="14px";x.scale(dpr,dpr);
pcv.width=240;pcv.height=300;pc.scale(2,2);
const hz=H*.34,gb=H-46,LW=W*.30,K=.05,PD=2,CX=W/2,SC=W/430,JT=.62,SPAWN=100;
const P=d=>1/(1+d*K),Y=p=>hz+(gb-hz)*p,LX=(l,p)=>CX+l*LW*p;
const au=new Audio("games/run.mp3");au.loop=true;au.volume=.8;
let best=+(localStorage.getItem("runbest")||0);
let vw="m",st=0,endAt=0,obs,cau,sce,dist,tm,v,cc,lives,mxl,inv,px,tl,jt,sl,nextSp,nextSc,shake,pop,ph,sc,pts,streak,pw,newRec,flash=0,gain=0,mph=0,tab=0,bd="none",sk=SK[0];
let fl=0,fa=0,nextFc=0,mg=0;
const rnd=a=>a[Math.random()*a.length|0],shuf=a=>a.slice().sort(()=>Math.random()-.5),LN=[-1,0,1];
const jy=()=>{if(jt<=0)return 0;const t=jt/JT;return 4*t*(1-t)};
const mult=()=>Math.min(5,1+Math.floor(streak/10))*(pw>0?2:1);
// fond pré-dessiné : ciel, soleil, skyline
const bg=document.createElement("canvas");bg.width=W*dpr;bg.height=H*dpr;
(function(){const c=bg.getContext("2d");c.scale(dpr,dpr);let sd=11;const R=()=>(sd=(sd*16807)%2147483647)/2147483647;
let g=c.createLinearGradient(0,0,0,hz);g.addColorStop(0,"#2f8fe8");g.addColorStop(.55,"#7fd3f7");g.addColorStop(1,"#ffe9b0");c.fillStyle=g;c.fillRect(0,0,W,H);
ell(c,W*.7,hz-50,46,46,"rgba(252,209,22,.25)");ell(c,W*.7,hz-50,32,32,"#FCD116");
c.fillStyle="#2cb0be";for(let i=0;i<4;i++)c.fillRect(W*.7-32,hz-40+i*8,64,2+i);
c.fillStyle="#9ad3ab";c.beginPath();c.moveTo(0,hz);for(let xx=0;xx<=W;xx+=8)c.lineTo(xx,hz-22-Math.sin(xx*.021+1)*14-Math.sin(xx*.057)*6);c.lineTo(W,hz);c.fill();
c.fillStyle="rgba(70,120,170,.55)";for(let i=0,xx=0;xx<W;i++){const w=22+R()*26,h=14+R()*34;c.fillRect(xx,hz-h,w,h);xx+=w+2}
c.fillStyle="#34557f";for(let xx=-4;xx<W;){const w=20+R()*28,h=18+R()*46;c.fillRect(xx,hz-h,w,h);
for(let yy=hz-h+6;yy<hz-4;yy+=9)for(let q=xx+4;q<xx+w-4;q+=7)if(R()<.4){c.fillStyle=R()<.7?"rgba(252,209,22,.85)":"rgba(24,224,255,.85)";c.fillRect(q,yy,3,4)}
c.fillStyle="#34557f";xx+=w+3}
const tx=W*.18;c.fillStyle="#2a4466";c.fillRect(tx-5,hz-170,10,170);c.fillRect(tx-1,hz-200,2,30);
COL.forEach((q,i)=>{c.fillStyle=q;c.fillRect(tx-8,hz-150+i*7,16,5)});c.fillStyle="#FCD116";star(c,tx,hz-210,9);c.fill();
c.fillStyle="#2f8f4f";for(let xx=0;xx<W;xx+=13){c.beginPath();c.arc(xx+R()*6,hz-2,8+R()*7,0,7);c.fill()}
const gg2=c.createLinearGradient(0,hz,0,H);gg2.addColorStop(0,"#e6bb82");gg2.addColorStop(1,"#b0602f");c.fillStyle=gg2;c.fillRect(0,hz,W,H-hz)})();
function spawnScene(d){const dd=d==null?SPAWN:d;const NK=[2,4,4,5,6,6,7,8,1],FK=[0,0,1,1,8,3,4,5];
[-1,1].forEach(s=>{const nr=Math.random()<.62;sce.push({s,d:dd+Math.random()*2,k:nr?NK[Math.random()*NK.length|0]:FK[Math.random()*FK.length|0],o:nr?1.95+Math.random()*.55:3+Math.random()*1.2,h:.7+Math.random()*.8,sd:Math.random()*100})})}
function coins(l,d0,n,arc){for(let i=0;i<n;i++)cau.push({l,d:d0+i*3,h:arc?Math.sin(i/(n-1)*Math.PI):0})}
function reset(){mg=0;fl=0;fa=0;nextFc=0;obs=[];cau=[];sce=[];dist=0;tm=0;v=16;cc=0;mxl=lives=bd=="none"?2:3;inv=0;px=0;tl=0;jt=0;sl=0;nextSp=14;nextSc=0;shake=0;pop=[];ph=0;sc=0;pts=0;streak=0;pw=0;newRec=false;flash=0;gain=0;
for(let d=6;d<SPAWN;d+=3.2+Math.random()*2.6)spawnScene(d);A.score(0)}
function spawnRow(){const r=Math.random(),D0=SPAWN;
if(r>.8){const ls=shuf(LN).slice(0,Math.random()<.35?2:1),L=7+(Math.random()*6|0);ls.forEach(l=>{obs.push({t:"t",l,d:D0,L,c:rnd(TC)});const n=Math.min(5,L-2);for(let i=0;i<n;i++)cau.push({l,d:D0+1.5+i*(L-3)/Math.max(1,n-1),h:1.7})});const fr=LN.filter(l=>!ls.includes(l));if(Math.random()<.7)coins(rnd(fr),D0-3,5);return}
if(r<.34){const n=Math.random()<.45?2:1,ls=shuf(LN).slice(0,n);ls.forEach(l=>obs.push({t:"m",l,d:D0,c:rnd(COL)}));
const fr=LN.filter(l=>!ls.includes(l));if(Math.random()<.7)coins(rnd(fr),D0-3,5);if(Math.random()<.1)cau.push({l:rnd(fr),d:D0-14,k:"s"});if(Math.random()<.14)cau.push({l:rnd(fr),d:D0-22,k:"w"});if(Math.random()<.1)cau.push({l:rnd(fr),d:D0-30,k:"a"})}
else if(r<.58){const all=Math.random()<.6,ls=all?LN:shuf(LN).slice(0,2);ls.forEach(l=>obs.push({t:"e",l,d:D0}));
if(all)coins(0,D0-6,5,true);else coins(LN.find(l=>!ls.includes(l)),D0-3,5)}
else if(r<.8){obs.push({t:"b",l:0,d:D0,all:true});coins(rnd(LN),D0-6,4)}
else coins(rnd(LN),D0,7)}
function say(s,c){pop.push({s,c:c||"#fff",y:H*.42,a:1})}
function start(){bd=D.bd;sk=SK.find(i=>i.id==D.sk)||SK[0];reset();st=1;try{au.currentTime=0;au.play().catch(()=>{})}catch(e){}beep(660,.12,"triangle",.15)}
function fin(){if(st!=1)return;st=2;endAt=Date.now();au.pause();A.end(sc);gain=cc;D.w+=cc;save();
newRec=sc>best&&sc>0;if(newRec){best=sc;try{localStorage.setItem("runbest",best)}catch(e){}
[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.25,"triangle",.2),i*130));
try{const u=new SpeechSynthesisUtterance("Bravo, champion du Faso !");u.lang="fr-FR";speechSynthesis.speak(u)}catch(e){}}else beep(110,.5,"sawtooth",.15)}
function ouch(){if(inv>0)return;lives--;streak=0;inv=1.6;shake=14;flash=1;beep(120,.3,"sawtooth",.2);say("Aïe !","#EF2B2D");if(lives<=0)fin()}
function jump(){if(st!=1||jt>0||sl>0)return;jt=.0001;beep(520,.08,"square",.05)}
function slide(){if(st!=1||sl>0)return;sl=.55;jt=0;beep(220,.08,"sine",.1)}
function lane(d){if(st!=1)return;const n=Math.max(-1,Math.min(1,tl+d));if(n!=tl){tl=n;beep(400,.05,"triangle",.06)}}
let sx=0,sy=0,sd=false,sw=false;
cv.onpointerdown=e=>{e.preventDefault();sx=e.clientX;sy=e.clientY;sd=true;sw=false;try{cv.setPointerCapture(e.pointerId)}catch(_){}};
cv.onpointermove=e=>{if(!sd||sw||st!=1)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<26)return;sw=true;
if(Math.abs(dx)>Math.abs(dy))lane(dx>0?1:-1);else if(dy<0)jump();else slide()};
cv.onpointerup=()=>{if(!sd)return;sd=false;if(sw)return;if(st==0)start();else if(st==2){if(Date.now()-endAt>600)start()}else jump()};
cv.onpointercancel=()=>{sd=false};
document.addEventListener("keydown",e=>{if(!A.on()||vw!="p")return;const k=e.key;
if(k=="ArrowLeft")lane(-1);else if(k=="ArrowRight")lane(1);else if(k=="ArrowUp"||k==" ")jump();else if(k=="ArrowDown")slide();else return;e.preventDefault()});
// ---- boutique ----
function buy(kind,id){const Ls=kind?BD:SK,it=Ls.find(i=>i.id==id);if(!it)return;
if(!D.own.includes(id)){if(D.w<it.p){beep(150,.2,"sawtooth");return}D.w-=it.p;D.own.push(id);beep(880,.1,"triangle",.15)}
D[kind?"bd":"sk"]=id;save();menu()}
function menu(){const Ls=tab?BD:SK,cur=tab?D.bd:D.sk;
$(".or-w",M).textContent=D.w+" cauris";$(".or-rc",M).textContent="Record : "+best;
const s0=SK.find(i=>i.id==D.sk)||SK[0],b0=BD.find(i=>i.id==D.bd)||BD[0];
$(".or-pn",M).textContent=s0.n+" + "+b0.n;$(".or-pt",M).textContent=s0.t+" · "+b0.t;
$(".t0",M).className="t0"+(tab?"":" on");$(".t1",M).className="t1"+(tab?" on":"");
$(".or-ls",M).innerHTML=Ls.map(i=>{const own=D.own.includes(i.id),sel=cur==i.id;
return '<div class="or-it'+(sel?' sel':'')+'"><span class="sw" style="background:'+(tab?'linear-gradient(135deg,#18e0ff,#0a1f5c)':'linear-gradient(135deg,'+i.c[0]+','+i.c[1]+')')+'"></span><div class="tx"><b>'+i.n+'</b><small>'+i.t+'</small></div><button data-i="'+i.id+'" class="'+(sel?'ok':own||D.w>=i.p?'':'no')+'">'+(sel?'Équipé':own?'Choisir':i.p+' cauris')+'</button></div>'}).join("");
M.querySelectorAll("button[data-i]").forEach(b=>b.onclick=()=>buy(tab,b.dataset.i))}
$(".t0",M).onclick=()=>{tab=0;menu()};$(".t1",M).onclick=()=>{tab=1;menu()};
function view(w){vw=w;M.style.display=w=="m"?"flex":"none";PV.style.display=w=="p"?"flex":"none";if(w=="m"){au.pause();menu()}}
$(".or-go",M).onclick=()=>{view("p");start()};
$(".or-sh",PV).onclick=()=>{if(st==1)fin();view("m")};
bd="none";reset();st=0;view("m");

function update(dt){if(st!=1)return;
tm+=dt;v=Math.min(38,16+tm*.35)*(fl>0?1.25:1);const dd=v*dt;dist+=dd;ph+=dt*(9+v*.12);
px+=(tl-px)*Math.min(1,dt*13);
if(mg>0)mg-=dt;if(fl>0){fl-=dt;if(fl<=0){fl=0;inv=Math.max(inv,1.1);say("Atterrissage","#fff")}}
fa+=((fl>0?1:0)-fa)*Math.min(1,dt*5);
if(fl>0&&dist>=nextFc){coins(LN[Math.random()*3|0],SPAWN,6,true);nextFc=dist+16}
if(jt>0){jt+=dt;if(jt>=JT)jt=0}if(sl>0)sl-=dt;if(inv>0)inv-=dt;if(pw>0)pw-=dt;shake*=.9;flash*=.9;
obs.forEach(o=>o.d-=dd);cau.forEach(c=>c.d-=dd);sce.forEach(s=>s.d-=dd);
if(dist>=nextSp){spawnRow();nextSp=dist+v*Math.max(.85,1.35-tm*.008)}
if(dist>=nextSc){spawnScene();nextSc=dist+3.2+Math.random()*2.6}
for(const o of obs){if(o.t=="t"){if(fa<=.5&&!o.hit&&Math.abs(px-o.l)<.62&&o.d<PD+1&&o.d+o.L>PD-1){o.hit=true;ouch()}continue}if(fa>.5||o.hit||o.d>PD+1||o.d<PD-1)continue;if(!(o.all||Math.abs(px-o.l)<.62))continue;
const hit=o.t=="m"?true:o.t=="e"?jy()<.42:sl<=0;if(hit){o.hit=true;ouch()}}
for(const c of cau){if(c.got||(c.h>1.2&&fa<.5)||c.d>PD+(mg>0?4:1.2)||c.d<PD-1.2)continue;
if(Math.abs(px-c.l)<(mg>0?1.9:(bd=="hover"||fl>0?1.15:.6))){c.got=true;
if(c.k=="w"){fl=6;say("VOL !","#18e0ff");beep(990,.25,"triangle",.15);beep(1320,.3,"triangle",.12)}else if(c.k=="a"){mg=8;say("AIMANT","#ff3b6b");beep(700,.2,"triangle",.15)}else if(c.k=="s"){pw=8;say("Étoile ×2","#FCD116");beep(1200,.2,"triangle",.15)}
else{cc++;streak++;pts+=5*mult();beep(880+Math.min(streak,25)*20,.07,"triangle",.1);if(streak%10==0)say("Combo ×"+mult(),"#18e0ff")}}}
obs=obs.filter(o=>o.d+(o.L||0)>-8);cau=cau.filter(c=>c.d>-8&&!c.got);sce=sce.filter(s=>s.d>-8);
const n=Math.floor(dist/4)+pts;if(n!=sc){sc=n;A.score(sc)}
pop.forEach(p=>{p.y-=1;p.a-=.02});pop=pop.filter(p=>p.a>0)}

const TC=["#e8453c","#2e86de","#f5b700","#2fb36d"];
function train(l,d,L,col){const p1=P(Math.max(d,-5)),p2=P(d+L),w=.4*LW,H=96*SC;
const cx1=LX(l,p1),cx2=LX(l,p2),b1=Y(p1),b2=Y(p2),t1=b1-H*p1,t2=b2-H*p2,w1=w*p1,w2=w*p2,sd=l<0?1:(l>0?-1:0);
const q=(a,f)=>{x.fillStyle=f;x.beginPath();x.moveTo(a[0],a[1]);for(let i=2;i<a.length;i+=2)x.lineTo(a[i],a[i+1]);x.closePath();x.fill()};
q([cx1-w1,t1,cx1+w1,t1,cx2+w2,t2,cx2-w2,t2],col);q([cx1-w1,t1,cx1+w1,t1,cx2+w2,t2,cx2-w2,t2],"rgba(255,255,255,.32)");
if(sd){const sx1=cx1+sd*w1,sx2=cx2+sd*w2;q([sx1,b1,sx1,t1,sx2,t2,sx2,b2],col);q([sx1,b1,sx1,t1,sx2,t2,sx2,b2],"rgba(0,0,0,.38)");
const fy=(b,t,f)=>b-(b-t)*f;q([sx1,fy(b1,t1,.5),sx1,fy(b1,t1,.74),sx2,fy(b2,t2,.74),sx2,fy(b2,t2,.5)],"rgba(180,235,255,.8)");
q([sx1,fy(b1,t1,.2),sx1,fy(b1,t1,.3),sx2,fy(b2,t2,.3),sx2,fy(b2,t2,.2)],"rgba(255,255,255,.7)")}
q([cx1-w1,b1,cx1-w1,t1,cx1+w1,t1,cx1+w1,b1],col);
const gg=x.createLinearGradient(0,t1,0,b1);gg.addColorStop(0,"rgba(255,255,255,.22)");gg.addColorStop(1,"rgba(0,0,0,.3)");q([cx1-w1,b1,cx1-w1,t1,cx1+w1,t1,cx1+w1,b1],gg);
const h1=H*p1;rr(x,cx1-w1*.82,t1+h1*.12,w1*1.64,h1*.36,Math.max(2,5*p1),"#bfeeff");x.fillStyle="rgba(255,255,255,.55)";x.fillRect(cx1-w1*.82,t1+h1*.12,w1*.5,h1*.36);
x.fillStyle="#fff";x.fillRect(cx1-w1,b1-h1*.3,w1*2,h1*.08);x.fillStyle="#222b44";x.fillRect(cx1-w1,b1-h1*.1,w1*2,h1*.1);
ell(x,cx1-w1*.7,b1-h1*.2,Math.max(2,6*p1),Math.max(2,5*p1),"#fff6c0");ell(x,cx1+w1*.7,b1-h1*.2,Math.max(2,6*p1),Math.max(2,5*p1),"#fff6c0");
x.strokeStyle="rgba(0,0,0,.35)";x.lineWidth=Math.max(1,1.5*p1);x.strokeRect(cx1-w1,t1,w1*2,b1-t1)}
function magIcon(c){c.save();const g=c.createRadialGradient(0,0,2,0,0,24);g.addColorStop(0,"rgba(255,59,107,.5)");g.addColorStop(1,"rgba(255,59,107,0)");c.fillStyle=g;c.beginPath();c.arc(0,0,24,0,7);c.fill();
c.lineWidth=7;c.lineCap="butt";c.strokeStyle="#ff3b6b";c.beginPath();c.arc(0,2,10,Math.PI,0);c.stroke();c.strokeStyle="#e9fdff";c.lineWidth=7;c.beginPath();c.moveTo(-10,2);c.lineTo(-10,10);c.moveTo(10,2);c.lineTo(10,10);c.stroke();
c.fillStyle="#ff3b6b";c.fillRect(-13.5,6,7,4);c.fillRect(6.5,6,7,4);c.restore()}
function moto(cx,gy,s,col){x.save();x.translate(cx,gy);x.scale(s,s);
ell(x,0,0,48,9,"rgba(0,0,0,.35)");x.globalAlpha=.35;ell(x,0,-2,44,6,col);x.globalAlpha=1;
[-30,30].forEach(a=>{ell(x,a,-16,16,16,"#0b0f24");x.strokeStyle=col;x.lineWidth=4;x.beginPath();x.arc(a,-16,14,0,7);x.stroke()});
x.fillStyle=col;x.beginPath();x.moveTo(-36,-22);x.lineTo(-12,-50);x.lineTo(22,-50);x.lineTo(38,-26);x.lineTo(30,-16);x.lineTo(-28,-16);x.closePath();x.fill();
x.fillStyle="rgba(255,255,255,.35)";x.fillRect(-10,-48,30,4);
ell(x,40,-34,5,5,"#aef6ff");x.globalAlpha=.3;ell(x,46,-34,12,8,"#aef6ff");x.globalAlpha=1;
rr(x,-14,-92,26,42,8,"#121a40");rr(x,-14,-76,26,5,2,"#18e0ff");ell(x,-1,-104,12,12,"#1b2457");rr(x,-8,-108,16,6,3,"#ff3bd4");x.restore()}
function laser(cx,gy,s){x.save();x.translate(cx,gy);x.scale(s,s);
ell(x,0,0,52,7,"rgba(0,0,0,.3)");rr(x,-52,-44,9,44,3,"#26325f");rr(x,43,-44,9,44,3,"#26325f");
ell(x,-48,-44,5,3,"#18e0ff");ell(x,48,-44,5,3,"#18e0ff");
x.fillStyle="rgba(255,42,85,.28)";x.fillRect(-46,-34,92,16);x.fillStyle="#ff2a55";x.fillRect(-46,-28,92,5);x.fillStyle="#fff";x.fillRect(-46,-26,92,1.5);x.restore()}
function gate(gy,p,s){const a=LX(-1.55,p),b=LX(1.55,p),h=110*s;
x.fillStyle="#26325f";x.fillRect(a-4*s,gy-h-10*s,8*s,h+10*s);x.fillRect(b-4*s,gy-h-10*s,8*s,h+10*s);
x.fillStyle="#18e0ff";x.fillRect(a-4*s,gy-h-10*s,8*s,5*s);x.fillRect(b-4*s,gy-h-10*s,8*s,5*s);
const y0=gy-h,hh=48*s;x.globalAlpha=.6;x.fillStyle="#EF2B2D";x.fillRect(a,y0,b-a,hh/2);x.fillStyle="#009E49";x.fillRect(a,y0+hh/2,b-a,hh/2);x.globalAlpha=1;
x.fillStyle="#FCD116";star(x,(a+b)/2,y0+hh/2,hh*.4);x.fill();
x.strokeStyle="#18e0ff";x.lineWidth=Math.max(1,2*s);x.strokeRect(a,y0,b-a,hh)}
function cauri(cx,cy,s,t,k){x.save();x.translate(cx,cy);x.scale(s,s);
if(k=="w"){wingIcon(x)}else if(k=="a"){magIcon(x)}else if(k=="s"){ell(x,0,0,20,20,"rgba(252,209,22,.3)");x.fillStyle="#FCD116";star(x,0,0,15);x.fill()}
else{ell(x,0,0,17,17,"rgba(24,224,255,.25)");x.rotate(Math.sin(t)*.3);ell(x,0,0,10,14,"#fff3d6");x.strokeStyle="#8a5a2b";x.lineWidth=1.5;x.beginPath();x.ellipse(0,0,10,14,0,0,7);x.stroke();x.beginPath();x.moveTo(0,-9);x.quadraticCurveTo(3,0,0,9);x.stroke()}x.restore()}
const BC=[["#c96a4a","#8c3f2a"],["#e8c07a","#b88a45"],["#6aa9d6","#3f78a8"],["#dcdce2","#9aa0b0"],["#7cc08a","#4b8f5c"]];
const WC=["#e9d3a0","#d98d5a","#9ec7e0","#e8e1d4","#c96a4a"];
const SN=["BOUTIQUE","MARCHÉ","ALIMENT.","KIOSQUE","COUTURE"];
function scene(o,p){const cx=LX(o.s*o.o,p),gy=Y(p),s=p*SC*1.15;if(cx<-170||cx>W+170||s<.03)return;
x.save();x.translate(cx,gy);x.scale(s,s);const dir=-o.s,sd=o.sd|0,h=o.h,k=o.k,B=BC[sd%5];
const box=(w,hh,c1,c2)=>{const g=x.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(-w/2,-hh,w,hh);x.fillStyle="rgba(255,255,255,.2)";x.fillRect(dir>0?w/2-4:-w/2,-hh,4,hh);x.fillStyle="rgba(0,0,0,.2)";x.fillRect(-w/2,-hh,w,5)};
if(k==0){const w=64+sd%4*9,hh=(150+sd%70)*h;box(w,hh,B[0],B[1]);
for(let yy=-hh+14,i=0;yy<-30;yy+=17,i++)for(let q=0;q<4;q++){x.fillStyle=(i*5+q*3+sd)%7<2?"#ffe9a0":"#27406b";x.fillRect(-w/2+7+q*(w-14)/4,yy,(w-14)/4-5,10)}
x.fillStyle=COL[sd%3];x.fillRect(-w/2,-hh,w,6);x.fillStyle="#4a4f66";x.fillRect(-w*.25,-hh-10,w*.3,10);x.fillRect(w*.2,-hh-26,3,26);x.fillStyle="#2a2f45";x.fillRect(-12,-24,24,24)}
else if(k==1){const w=84,hh=(70+sd%24)*h;box(w,hh,B[0],B[1]);
x.fillStyle="#1d2a44";x.fillRect(-w/2+8,-hh*.5,w-16,hh*.5-4);x.fillStyle="rgba(170,230,255,.55)";x.fillRect(-w/2+10,-hh*.5+2,(w-20)*.4,hh*.5-10);
for(let i=0;i<7;i++){x.fillStyle=i%2?"#fff":COL[sd%3];x.beginPath();x.moveTo(-w/2-4+i*(w+8)/7,-hh*.52);x.lineTo(-w/2-4+(i+1)*(w+8)/7,-hh*.52);x.lineTo(-w/2-8+(i+1)*(w+16)/7,-hh*.42);x.lineTo(-w/2-8+i*(w+16)/7,-hh*.42);x.closePath();x.fill()}
if(s>.22){rr(x,-w/2+6,-hh+8,w-12,16,4,"#10172c");x.fillStyle="#FCD116";x.font="bold 11px system-ui,sans-serif";x.textAlign="center";x.fillText(SN[sd%5],0,-hh+20)}}
else if(k==2){x.fillStyle="#3b4562";x.fillRect(-3,-130,6,130);x.fillRect(-7,-8,14,8);x.fillRect(dir>0?0:-30,-134,30,4);
ell(x,dir*30,-124,22,16,"rgba(255,235,160,.28)");rr(x,dir*30-9,-136,18,7,3,"#e9f4ff");ell(x,dir*30,-129,7,4,"#fff6c0")}
else if(k==3){x.fillStyle="#3b4562";x.fillRect(-26,-120,5,120);x.fillRect(21,-120,5,120);
rr(x,-48,-176,96,56,5,"#10172c");x.fillStyle="#EF2B2D";x.fillRect(-44,-172,88,24);x.fillStyle="#009E49";x.fillRect(-44,-148,88,24);x.fillStyle="#FCD116";star(x,0,-148,15);x.fill();
x.fillStyle="#18e0ff";for(let i=0;i<5;i++)x.fillRect(-40+i*20,-181,10,3)}
else if(k==4){const z=.85+(sd%5)*.08;x.scale(z,z);ell(x,0,0,38,7,"rgba(0,0,0,.22)");x.fillStyle="#6b4a2b";x.beginPath();x.moveTo(-7,0);x.lineTo(-4,-58);x.lineTo(4,-58);x.lineTo(7,0);x.closePath();x.fill();
ell(x,-20,-72,26,22,"#2c8247");ell(x,20,-74,27,23,"#2c8247");ell(x,0,-96,32,26,"#34993f");ell(x,-6,-70,26,22,"#3aa75d");ell(x,10,-98,18,14,"#52bf6b")}
else if(k==5){ell(x,0,0,44,8,"rgba(0,0,0,.22)");const g=x.createLinearGradient(-26,0,26,0);g.addColorStop(0,"#9a7a56");g.addColorStop(1,"#6d513a");x.fillStyle=g;x.beginPath();x.moveTo(-26,0);x.quadraticCurveTo(-18,-40,-13,-84);x.lineTo(13,-84);x.quadraticCurveTo(18,-40,26,0);x.closePath();x.fill();
x.strokeStyle="#7b5e43";x.lineCap="round";x.lineWidth=6;[[-12,-84,-34,-118],[0,-86,0,-126],[12,-84,36,-114]].forEach(b=>{x.beginPath();x.moveTo(b[0],b[1]);x.lineTo(b[2],b[3]);x.stroke();ell(x,b[2],b[3]-4,15,11,"#4fa35a");ell(x,b[2]+4,b[3]-8,9,7,"#6cc176")})}
else if(k==6){const c1=COL[sd%3],c2=["#ff8a1a","#18a0d8","#ff3bd4"][sd%3];
x.fillStyle="#5a3d26";x.fillRect(-36,-76,4,72);x.fillRect(32,-76,4,72);
if(sd%2){ell(x,0,-62,7,7,"#6b4226");rr(x,-8,-56,16,28,6,c2)}
rr(x,-38,-30,76,26,3,"#8a5a3a");for(let i=0;i<9;i++)ell(x,-30+i*7.5,-34,4.5,4.5,["#ff7a1a","#e0302a","#4fb84f","#ffd23a"][(i+sd)%4]);
for(let i=0;i<6;i++){x.fillStyle=i%2?"#fff":c1;x.beginPath();x.moveTo(-30+i*10,-104);x.lineTo(-20+i*10,-104);x.lineTo(-30.7+(i+1)*15.33,-80);x.lineTo(-46+i*15.33,-80);x.closePath();x.fill()}
for(let i=0;i<6;i++)ell(x,-38.3+i*15.33,-80,7.7,5,i%2?"#fff":c1)}
else if(k==7){const L=dir*-5;x.strokeStyle="#7a5a3a";x.lineCap="round";x.lineWidth=7;x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(L*2,-60,L,-124);x.stroke();
x.strokeStyle="#2f9a4a";x.lineWidth=5;for(let i=0;i<7;i++){const a=-Math.PI*.95+i*Math.PI*.9/6;x.beginPath();x.moveTo(L,-124);x.quadraticCurveTo(L+Math.cos(a)*22,-124+Math.sin(a)*26-6,L+Math.cos(a)*40,-124+Math.sin(a)*22+14);x.stroke()}
ell(x,L-3,-120,4,4,"#6b4a2b");ell(x,L+3,-119,4,4,"#6b4a2b")}
else{const w=86,hh=(46+sd%16)*h,wc=["#efe0b8","#f2c9a0","#d9ecf2","#f0d6e0"][sd%4];box(w,hh,wc,"#c9b48a");
x.fillStyle=["#b4472f","#8a8f99","#a05a2c"][sd%3];x.beginPath();x.moveTo(-w/2-8,-hh);x.lineTo(-w/2+10,-hh-26);x.lineTo(w/2-10,-hh-26);x.lineTo(w/2+8,-hh);x.closePath();x.fill();
x.fillStyle="rgba(255,255,255,.2)";x.fillRect(-w/2+10,-hh-26,w-20,4);
rr(x,-10,-hh*.62,20,hh*.62,3,"#4a2f1c");rr(x,-w/2+9,-hh*.7,18,16,2,"#2f6fa0");rr(x,w/2-27,-hh*.7,18,16,2,"#2f6fa0");ell(x,w/2+4,-6,9,6,"#3aa75d")}
x.restore()}
function draw(){x.save();
if(shake>.5)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
x.drawImage(bg,0,0,W,H);
let g=x.createLinearGradient(0,hz,0,H);g.addColorStop(0,"#6a7087");g.addColorStop(1,"#3a3e52");x.fillStyle=g;
const hw=LW*1.62,bp=(H-hz)/(gb-hz);x.beginPath();x.moveTo(CX,hz);x.lineTo(CX+hw*bp,H);x.lineTo(CX-hw*bp,H);x.closePath();x.fill();
const DL=8,off=dist%DL;
x.strokeStyle="rgba(24,224,255,.2)";for(let k=0;k<14;k++){const d=k*6-(dist%6);if(d<0)continue;const p=P(d);x.lineWidth=Math.max(1,2*p);x.beginPath();x.moveTo(LX(-1.62,p),Y(p));x.lineTo(LX(1.62,p),Y(p));x.stroke()}
const strip=(l,d1,d2,w,c)=>{if(d2<=0)return;d1=Math.max(d1,0);const p1=P(d1),p2=P(d2),w1=w*LW*p1,w2=w*LW*p2;
x.fillStyle=c;x.beginPath();x.moveTo(LX(l,p1)-w1,Y(p1));x.lineTo(LX(l,p1)+w1,Y(p1));x.lineTo(LX(l,p2)+w2,Y(p2));x.lineTo(LX(l,p2)-w2,Y(p2));x.closePath();x.fill()};
for(let k=0;k<16;k++){const d=k*DL-off,ci=(k+Math.floor(dist/DL))%3;
strip(-.5,d,d+DL*.45,.03,"rgba(255,255,255,.8)");strip(.5,d,d+DL*.45,.03,"rgba(255,255,255,.8)");
[-1.62,1.62].forEach(l=>{strip(l,d,d+DL,.12,"rgba(24,224,255,.22)");strip(l,d,d+DL,.05,COL[ci])})}
for(const l of LN){for(let k=0;k<32;k++){const d=k*3-(dist%3);if(d<-1)continue;strip(l,d,d+.8,.46,"rgba(120,84,52,.8)")}strip(l-.27,0,95,.016,"rgba(225,230,240,.9)");strip(l+.27,0,95,.016,"rgba(225,230,240,.9)")}
[-1,1].forEach(sg=>{strip(sg*1.81,0,95,.2,"#c9ccd6");strip(sg*1.62,0,95,.012,"rgba(255,255,255,.9)");strip(sg*2.01,0,95,.012,"#8d90a0")});
[-1,1].forEach(sg=>{for(let k=0;k<34;k++){const d1=k*3-(dist%3),idx=k+Math.floor(dist/3);if(idx%9==4)continue;const a=Math.max(d1,.3),b=d1+3;if(b<=.3)continue;
const p1=P(a),p2=P(b),xa=LX(sg*2.7,p1),xb=LX(sg*2.7,p2),ya=Y(p1),yb=Y(p2),h1=36*SC*p1,h2=36*SC*p2;
x.fillStyle=WC[idx%WC.length];x.beginPath();x.moveTo(xa,ya);x.lineTo(xa,ya-h1);x.lineTo(xb,yb-h2);x.lineTo(xb,yb);x.closePath();x.fill();
x.fillStyle=COL[idx%3];x.beginPath();x.moveTo(xa,ya-h1*.78);x.lineTo(xa,ya-h1*.9);x.lineTo(xb,yb-h2*.9);x.lineTo(xb,yb-h2*.78);x.closePath();x.fill();
x.strokeStyle="rgba(0,0,0,.28)";x.lineWidth=Math.max(1,1.5*p1);x.beginPath();x.moveTo(xa,ya);x.lineTo(xa,ya-h1);x.stroke();
x.strokeStyle="rgba(255,255,255,.55)";x.beginPath();x.moveTo(xa,ya-h1);x.lineTo(xb,yb-h2);x.stroke()}});
const Lst=[];sce.forEach(o=>Lst.push({d:o.d,f:()=>scene(o,P(o.d))}));
obs.forEach(o=>Lst.push({d:o.t=="t"?o.d+o.L:o.d,f:()=>{if(o.t=="t"){train(o.l,o.d,o.L,o.c);return}const p=P(o.d),s=p*SC;if(o.t=="m")moto(LX(o.l,p),Y(p),s,o.c);else if(o.t=="e")laser(LX(o.l,p),Y(p),s);else gate(Y(p),p,s)}}));
cau.forEach(c=>Lst.push({d:c.d,f:()=>{const p=P(c.d),s=p*SC;cauri(LX(c.l,p),Y(p)-(26+c.h*52)*s-Math.sin(tm*6+c.d)*3*s,s,tm*5+c.d,c.k)}}));
Lst.push({d:PD,f:()=>{const p=P(PD);if(!(inv>0&&Math.floor(inv*12)%2))runner(x,LX(px,p),Y(p),p*SC*1.12,sk,bd,ph,jy(),jt>0,sl>0,fa,(tl-px)*.32)}});
Lst.sort((a,b)=>b.d-a.d);Lst.forEach(o=>{if(o.d>-6)o.f()});
if(fa>.05||v>26){x.save();x.strokeStyle="rgba(255,255,255,"+Math.max(fa*.55,(v-26)/12*.3)+")";x.lineWidth=2;for(let i=0;i<16;i++){const xx=(i*61+7)%W,yy=((i*173+tm*(900+i%4*250))%(H+60))-30;x.beginPath();x.moveTo(xx,yy);x.lineTo(xx,yy+26+i%3*10);x.stroke()}x.restore()}
x.restore();
if(flash>.05){x.fillStyle="rgba(239,43,45,"+flash*.35+")";x.fillRect(0,0,W,H)}
x.fillStyle="#EF2B2D";x.fillRect(0,0,W,4);x.fillStyle="#FCD116";x.fillRect(0,4,W,4);x.fillStyle="#009E49";x.fillRect(0,8,W,4);
x.strokeStyle="rgba(0,0,0,.6)";x.lineWidth=4;x.textAlign="left";x.font="bold 26px system-ui,sans-serif";x.fillStyle="#fff";x.strokeText(sc,12,42);x.fillText(sc,12,42);
const m=mult();if(m>1&&st==1){x.font="bold 16px system-ui,sans-serif";x.fillStyle=pw>0?"#FCD116":"#18e0ff";x.strokeText("COMBO ×"+m,12,64);x.fillText("COMBO ×"+m,12,64)}
x.textAlign="right";x.font="bold 18px system-ui,sans-serif";x.fillStyle="#fff";x.strokeText(cc+" cauris",W-12,40);x.fillText(cc+" cauris",W-12,40);
if(pw>0){x.fillStyle="rgba(252,209,22,.9)";x.fillRect(W-12-80*pw/8,48,80*pw/8,5)}
if(fl>0){x.fillStyle="#18e0ff";x.fillRect(W-12-80*fl/6,58,80*fl/6,5)}
if(mg>0){x.fillStyle="#ff3b6b";x.fillRect(W-12-80*mg/8,68,80*mg/8,5)}
for(let i=0;i<mxl;i++){x.fillStyle=i<lives?"#18e0ff":"rgba(255,255,255,.2)";x.fillRect(W/2-mxl*10+i*20,20,16,8)}
x.textAlign="center";pop.forEach(p=>{x.globalAlpha=p.a;x.font="bold 30px system-ui,sans-serif";x.fillStyle=p.c;x.strokeText(p.s,W/2,p.y);x.fillText(p.s,W/2,p.y)});x.globalAlpha=1;
if(st==2){x.fillStyle="rgba(8,12,34,.7)";x.fillRect(0,0,W,H);x.strokeStyle="rgba(0,0,0,.6)";x.lineWidth=5;
x.font="bold 30px system-ui,sans-serif";x.fillStyle="#FCD116";x.fillText(newRec?"Nouveau record !":"Fin de course",W/2,H*.32);
x.font="bold 24px system-ui,sans-serif";x.fillStyle="#fff";x.fillText("Score "+sc,W/2,H*.32+42);
x.font="17px system-ui,sans-serif";x.fillStyle="#18e0ff";x.fillText("+"+gain+" cauris  ·  total "+D.w,W/2,H*.32+72);x.fillStyle="#fff";x.fillText("Record : "+best,W/2,H*.32+98);
x.font="bold 20px system-ui,sans-serif";x.fillStyle="#18e07a";x.fillText("Touche pour rejouer",W/2,H*.32+142)}}
function drawPrev(){mph+=.12;pc.clearRect(0,0,120,150);const s0=SK.find(i=>i.id==D.sk)||SK[0];runner(pc,60,128,1.0,s0,D.bd,mph,0,false,false,0)}

let last=0;
(function lp(now){requestAnimationFrame(lp);const dt=Math.min(.05,Math.max(0,((now||0)-last)/1000));last=now||0;
if(!A.on()){if(!au.paused)au.pause();return}
if(vw=="m"){drawPrev();return}
if(st==1&&au.paused)au.play().catch(()=>{});
update(dt);draw()})(0);
};
renderHub();
})();
