/* Game-0 v2 : RÉACTEUR
   - Même principe (ramener la grille à zéro) en version high-tech : cellules néon qui changent de couleur
     selon leur charge, réaction en chaîne visuelle, barre d'énergie qui vire au rouge.
   - Musique adaptative : le tempo monte quand l'énergie baisse. Chaque touche joue la note suivante de la gamme.
   - Étoiles par niveau (3 = coups parfaits), bouton Annuler (2 par niveau), vibration.
   - Écran de départ, écran de victoire et de défaite, records (niveau max, meilleur score). */
G.g0=function(el,A){
const sv=A.load()||{};
let bl=sv.bl||0,bs=sv.bs||0,tot=sv.tot||0,lvl=1,gr=[],mv=0,sc=0,k=0,lim=0,N=4,ph="ready",hist=[],ul=2,stars=0,tmo=0,newRec=false;
const save=()=>A.save({lvl,gr,mv,sc,k,lim,N,bl,bs,tot,mu:mus.muted()});

/* ================= SON ================= */
const mus=(function(){
let ctx,master,sg,bus,timer,step=0,next=0,muted=!!sv.mu,playing=false;
const AR=[196,220,261.63,293.66,329.63,392,440,523.25],PT=[0,-1,2,-1,4,-1,3,-1, 5,-1,4,-1,2,-1,1,-1],BS=[98,87.3,110,98];
function env(g,t,a,pk,dec){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec)}
function tone(f,t,type,pk,dec,dest){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;env(g,t,.006,pk,dec);o.connect(g);g.connect(dest);o.start(t);o.stop(t+dec+.1)}
function ev(i,t){const a=PT[i%16],s=i&7;
if(a>=0){tone(AR[a],t,"square",.035,.35,bus);tone(AR[a]*2,t,"sine",.05,.5,bus)}
if(s==0)tone(BS[(i>>3)&3],t,"sine",.3,1,master);
if(s==4||s==6)tone(55,t,"sine",.18,.14,master)}
function sched(){if(!ctx)return;while(next<ctx.currentTime+.25){ev(step++,next);next+=60/api.bpm/2}}
function setup(){ctx=new(window.AudioContext||window.webkitAudioContext)();
master=ctx.createGain();master.gain.value=0;sg=ctx.createGain();sg.gain.value=muted?0:.8;
const cp=ctx.createDynamicsCompressor();master.connect(cp);sg.connect(cp);cp.connect(ctx.destination);
bus=ctx.createGain();const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2200;bus.connect(lp);lp.connect(master);
const dl=ctx.createDelay(1),fb=ctx.createGain(),wet=ctx.createGain();dl.delayTime.value=.3;fb.gain.value=.33;wet.gain.value=.3;lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master)}
const api={bpm:88,
ready(){try{if(!ctx)setup();if(ctx.state=="suspended")ctx.resume()}catch(e){}},
play(){api.ready();if(!ctx||playing)return;playing=true;step=0;next=ctx.currentTime+.1;master.gain.setTargetAtTime(muted?0:.5,ctx.currentTime,.1);timer=setInterval(sched,80)},
stop(){if(!ctx||!playing)return;playing=false;clearInterval(timer);master.gain.setTargetAtTime(0,ctx.currentTime,.15)},
sync(on){if(!ctx)return;try{if(on&&ctx.state=="suspended")ctx.resume();else if(!on&&ctx.state=="running")ctx.suspend()}catch(e){}},
toggle(){muted=!muted;if(ctx){sg.gain.setTargetAtTime(muted?0:.8,ctx.currentTime,.05);master.gain.setTargetAtTime(muted||!playing?0:.5,ctx.currentTime,.05)}return muted},
muted:()=>muted,
sfx(list){if(!ctx||muted)return;const t=ctx.currentTime;list.forEach(e=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=e[3]||"triangle";o.frequency.value=e[0];env(g,t+e[1],.005,e[4]||.25,e[2]);o.connect(g);g.connect(sg);o.start(t+e[1]);o.stop(t+e[1]+e[2]+.1)})}};
return api})();
const PEN=[392,440,523.25,587.33,659.25,784,880,1046.5];
const sTap=n=>mus.sfx([[PEN[n%8],0,.14,"triangle",.3],[PEN[n%8]*2,.03,.18,"sine",.12]]),
sClr=()=>mus.sfx([[1318.5,0,.12,"sine",.18]]),
sNope=()=>mus.sfx([[140,0,.12,"square",.12]]),
sUndo=()=>mus.sfx([[600,0,.08,"triangle",.2],[420,.07,.1,"triangle",.2]]),
sWin=n=>mus.sfx([[523,0,.18],[659,.12,.18],[784,.24,.18],[1047,.36,.5]].concat(n>=3?[[1319,.5,.5,"sine",.25]]:[])),
sLose=()=>mus.sfx([[330,0,.25,"sawtooth",.2],[262,.2,.25,"sawtooth",.2],[196,.4,.6,"sawtooth",.2]]),
sRec=()=>mus.sfx([[660,0,.15],[880,.1,.15],[1100,.2,.15],[1320,.3,.5]]);

/* ================= STYLE ================= */
el.innerHTML='<style>'+
'.g0w{position:relative;width:min(94vw,460px);display:flex;flex-direction:column;align-items:center;gap:10px}'+
'.g0top{display:flex;width:100%;align-items:center;justify-content:space-between;color:#9fe9ff;font-size:15px}.g0top b{color:#fff;font-size:20px}'+
'.g0mu{background:none;border:1px solid rgba(61,242,255,.45);color:#3df2ff;border-radius:10px;padding:0 11px;font-size:16px;line-height:34px}'+
'.g0bar{width:100%;height:8px;border-radius:6px;background:rgba(255,255,255,.08);overflow:hidden}.g0bar i{display:block;height:100%;width:100%;background:#3df2ff;box-shadow:0 0 12px currentColor;transition:width .25s,background .3s}'+
'.g0bd{display:grid;gap:8px;width:100%}'+
'.g0c{aspect-ratio:1;border-radius:14px;border:1px solid #16282c;background:#070d10;color:#1d3a40;font-size:24px;font-weight:800;transition:background .2s,box-shadow .2s,color .2s}'+
'.g0c.a1{color:#fff;border-color:#3df2ff;background:rgba(61,242,255,.14);box-shadow:0 0 12px #3df2ff,inset 0 0 14px rgba(61,242,255,.35)}'+
'.g0c.a2{color:#fff;border-color:#b6ff3b;background:rgba(182,255,59,.14);box-shadow:0 0 14px #b6ff3b,inset 0 0 14px rgba(182,255,59,.35)}'+
'.g0c.a3{color:#fff;border-color:#FCD116;background:rgba(252,209,22,.16);box-shadow:0 0 16px #FCD116,inset 0 0 14px rgba(252,209,22,.4)}'+
'.g0c.a4{color:#fff;border-color:#ff3b5c;background:rgba(255,59,92,.18);box-shadow:0 0 18px #ff3b5c,inset 0 0 16px rgba(255,59,92,.45)}'+
'.g0c.pop{animation:g0p .25s}.g0c.clr{animation:g0c .45s}'+
'@keyframes g0p{40%{transform:scale(.88)}}@keyframes g0c{0%{transform:scale(1.18);box-shadow:0 0 26px #fff}100%{transform:scale(1)}}'+
'.g0h{color:#9fe9ff;font-size:13px;text-align:center;margin:0;min-height:34px}'+
'.g0row{display:flex;gap:10px}.g0b{background:none;border:1px solid rgba(61,242,255,.45);color:#3df2ff;border-radius:12px;padding:10px 18px;font-size:13px;letter-spacing:1px;text-transform:uppercase}.g0b[disabled]{opacity:.35}'+
'.g0ov{position:absolute;inset:-6px;border-radius:18px;background:rgba(3,8,10,.88);display:none;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;color:#fff;padding:14px}'+
'.g0ov h2{margin:0;font-size:34px;color:#EF2B2D;letter-spacing:2px}.g0ov .s1{color:#3df2ff;font-size:14px}.g0ov .s2{color:#9fe9ff;font-size:13px;max-width:90%}.g0ov .s3{color:#b6ff3b;font-size:15px}.g0ov .st{font-size:38px;color:#FCD116;letter-spacing:6px}.g0ov .go{font-size:17px;margin-top:10px;animation:g0b 1.2s infinite}'+
'@keyframes g0b{50%{opacity:.35}}</style>'+
'<div class="g0w"><div class="g0top"><span class="g0l"></span><span class="g0e"></span><button class="g0mu">&#9834;</button></div>'+
'<div class="g0bar"><i></i></div><div class="g0bd"></div><p class="g0h"></p>'+
'<div class="g0row"><button class="g0b" data-a="u">Annuler</button><button class="g0b" data-a="r">Recharger</button></div><div class="g0ov"></div></div>';
const bd=$(".g0bd",el),la=$(".g0l",el),lb=$(".g0e",el),bar=$(".g0bar i",el),ht=$(".g0h",el),ov=$(".g0ov",el),bu=$('[data-a="u"]',el),br=$('[data-a="r"]',el),mb=$(".g0mu",el);
const up=()=>{mb.style.opacity=mus.muted()?.4:1;mb.style.textDecoration=mus.muted()?"line-through":"none"};
mb.onclick=()=>{mus.ready();mus.toggle();up();save()};up();

/* ================= JEU ================= */
function nb(i){const x=i%N,y=i/N|0,r=[i];if(x>0)r.push(i-1);if(x<N-1)r.push(i+1);if(y>0)r.push(i-N);if(y<N-1)r.push(i+N);return r}
function add(i,d){nb(i).forEach(j=>gr[j]=Math.max(0,gr[j]+d))}
function gen(){N=lvl<3?4:lvl<7?5:lvl<12?6:7;gr=Array(N*N).fill(0);k=Math.min(2+lvl+(N-4)*2,26);for(let j=0;j<k;j++)add(Math.random()*N*N|0,1);lim=k+2;mv=0;hist=[];ul=2;stars=0;ph="play";ht.textContent="Touche un noyau : lui et ses voisins perdent 1 charge. Tout à zéro avant la fin de l'énergie.";mus.bpm=88;draw()}
function draw(p,cl){bd.style.gridTemplateColumns="repeat("+N+",1fr)";bd.innerHTML="";
gr.forEach((v,i)=>{const c=document.createElement("button");c.className="g0c "+(v?"a"+Math.min(v,4):"z")+(i===p?" pop":"")+(cl&&cl.indexOf(i)>=0?" clr":"");c.textContent=v;c.onclick=()=>tap(i);bd.appendChild(c)});
const left=Math.max(0,lim-mv),r=left/lim;la.innerHTML="Niveau <b>"+lvl+"</b>";lb.innerHTML="Énergie <b>"+left+"</b>";
bar.style.width=r*100+"%";bar.style.background=r>.5?"#3df2ff":r>.25?"#FCD116":"#ff3b5c";bar.style.color=bar.style.background;
bu.textContent="Annuler ("+ul+")";bu.disabled=!(ph=="play"&&hist.length&&ul>0);
if(ph=="play")mus.bpm=88+Math.round((1-r)*52);
save()}
function showOv(h,l1,l2,l3,stx,go){ov.innerHTML='<h2>'+h+'</h2>'+(stx?'<div class="st">'+stx+'</div>':'')+(l1?'<div class="s1">'+l1+'</div>':'')+(l2?'<div class="s2">'+l2+'</div>':'')+(l3?'<div class="s3">'+l3+'</div>':'')+(go?'<div class="go">'+go+'</div>':'');ov.style.display="flex"}
function hideOv(){ov.style.display="none"}
function tap(i){if(ph!="play")return;if(nb(i).every(j=>!gr[j])){sNope();return}
hist.push({g:gr.slice(),m:mv});const before=gr.slice();add(i,-1);mv++;sTap(mv);try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}
const cl=[];gr.forEach((v,j)=>{if(!v&&before[j])cl.push(j)});if(cl.length)setTimeout(sClr,90);
if(gr.every(v=>!v))win(i,cl);
else if(mv>=lim)lose(i);
else draw(i,cl)}
function win(i,cl){ph="won";stars=mv<=k?3:mv<=k+1?2:1;const gain=100+Math.max(0,(lim-mv)*15)+(stars==3?60:0);sc+=gain;A.score(sc);A.end(sc);
if(lvl>bl)bl=lvl;if(sc>bs){bs=sc;newRec=true}save();draw(i,cl);sWin(stars);
const stx="&#9733;".repeat(stars)+'<span style="opacity:.25">'+"&#9733;".repeat(3-stars)+"</span>";
showOv("RÉACTEUR STABILISÉ",null,stars==3?"Coups parfaits !":"Moins de coups = plus d'étoiles","+"+gain+" points",stx,"Touche pour continuer");
clearTimeout(tmo);tmo=setTimeout(next,2200)}
function next(){if(ph!="won")return;clearTimeout(tmo);lvl++;hideOv();gen()}
function lose(i){ph="lost";tot++;if(sc>bs){bs=sc;newRec=true}save();A.end(sc);mus.stop();draw(i);sLose();
showOv("ÉNERGIE ÉPUISÉE","Niveau atteint : "+lvl+" · Score : "+sc,newRec?"NOUVEAU RECORD ★":"Record : "+bs+" · Niveau max : "+bl,null,null,"Touche pour recommencer");
if(newRec&&sc>0)setTimeout(sRec,500);newRec=false}
function restart(){clearTimeout(tmo);lvl=1;sc=0;A.score(0);hideOv();mus.play();gen()}
bu.onclick=()=>{if(ph!="play"||!hist.length||ul<=0)return;const h=hist.pop();gr=h.g;mv=h.m;ul--;sUndo();draw()};
br.onclick=()=>{if(ph=="play"||ph=="won"){clearTimeout(tmo);hideOv();mus.play();gen()}};
ov.onclick=()=>{mus.ready();if(ph=="ready"){hideOv();mus.play();if(!gr.some(v=>v))gen();else{ph="play";draw()}}else if(ph=="won")next();else if(ph=="lost")restart()};

/* ================= DÉPART ================= */
if(sv.gr&&sv.gr.some(v=>v)&&(sv.mv||0)<(sv.lim||0)){lvl=sv.lvl||1;gr=sv.gr;mv=sv.mv||0;sc=sv.sc||0;k=sv.k||0;N=sv.N||Math.round(Math.sqrt(gr.length));lim=sv.lim||k+2;A.score(sc);ph="ready";draw();
showOv("GAME-0","Réacteur · Niveau "+lvl,"Une partie est en cours.",bs?"Record : "+bs+" · Niveau max : "+bl:null,null,"Touche pour reprendre")}
else{if(sv.lvl){lvl=sv.lvl+(sv.gr&&!sv.gr.some(v=>v)?1:0);sc=sv.sc||0}ph="ready";gen();ph="ready";bu.disabled=true;
showOv("GAME-0","RÉACTEUR","Touche une case : elle et ses voisines perdent 1. Ramène tout à zéro avant la fin de l'énergie. Moins de coups = plus d'étoiles.",bs?"Record : "+bs+" · Niveau max : "+bl:null,null,"Touche pour commencer")}
setInterval(()=>mus.sync(A.on()),400);
};
