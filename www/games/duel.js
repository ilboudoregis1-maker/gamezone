G.duel=function(el,A){
const cols=["#ff3b5c","#ffd426","#18e07a","#3df2ff"],nm=["Rouge","Jaune","Vert","Cyan"];
let n=2,pts=[],ph="menu",tm,t0,early=[],tot=(A.load()||{}).tot||0;
function menu(){clearTimeout(tm);ph="menu";
el.innerHTML='<h2 class="mt" style="color:var(--cy);letter-spacing:3px">DUEL DES CAURIS</h2><p class="hint">Premier à 5 points. Touche ta zone dès que le signal passe au vert. Attention aux LEURRES magenta : les toucher coûte 1 point. Départ trop tôt : -1.</p><div class="pick"><button class="btn sm" data-n="2">2 joueurs</button><button class="btn sm" data-n="3">3 joueurs</button><button class="btn sm" data-n="4">4 joueurs</button></div>';
el.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>start(+b.dataset.n))}
function start(k){n=k;pts=Array(k).fill(0);let h='<div class="dgrid d'+k+'">';
for(let i=0;i<k;i++)h+='<button class="dz'+(i<(k==2?1:2)?" flip":"")+'" style="color:'+cols[i]+";border-color:"+cols[i]+";box-shadow:0 0 14px "+cols[i]+'55"><span>'+nm[i]+'</span><b class="zp">0</b><i class="zs">Prêt</i></button>';
el.innerHTML=h+'</div><button class="btn sm mb">Menu</button>';
el.querySelectorAll(".dz").forEach((z,i)=>z.onpointerdown=()=>hit(i));
$(".mb",el).onclick=menu;round()}
const zs=(i,t)=>el.querySelectorAll(".zs")[i].textContent=t;
const all=t=>{for(let i=0;i<n;i++)zs(i,t)};
const pz=()=>el.querySelectorAll(".zp").forEach((e,i)=>e.textContent=pts[i]);
const tint=c=>el.querySelectorAll(".dz").forEach(z=>{z.classList.remove("go","fake");if(c)z.classList.add(c)});
function round(){ph="wait";early=[];tint();all("Attends...");
const fake=Math.random()<.55,d=1500+Math.random()*2500;
tm=setTimeout(()=>{if(fake){ph="fake";tint("fake");all("LEURRE ?");beep(220,.2,"square");tm=setTimeout(()=>{ph="wait";tint();all("Attends...");tm=setTimeout(go,900+Math.random()*2200)},800)}else go()},d)}
function go(){ph="go";t0=Date.now();tint("go");all("VAS-Y !");beep(880,.25,"triangle")}
function hit(i){
if((ph=="wait"||ph=="fake")&&!early[i]){early[i]=1;pts[i]=Math.max(-3,pts[i]-1);pz();zs(i,ph=="fake"?"Piégé -1":"Trop tôt -1");beep(100,.15,"square")}
else if(ph=="go"){ph="rest";tint();pts[i]++;pz();all("");zs(i,"+1 ("+(Date.now()-t0)+" ms)");beep(660,.15,"triangle");
if(pts[i]>=5){tot++;A.save({tot});A.score(tot);A.end(tot);for(let j=0;j<n;j++)zs(j,j==i?"VICTOIRE":"Perdu")}else tm=setTimeout(round,1600)}}
menu();
};
