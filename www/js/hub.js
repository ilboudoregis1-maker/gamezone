function isLogged(){try{return !!JSON.parse(localStorage.getItem('fr_acct')||'null')}catch(e){return false}}
const $=(s,e=document)=>e.querySelector(s);
const G={};let cur=null,t0=Date.now();const mounted={};
const fm=s=>s<60?Math.round(s)+" s":s<3600?Math.floor(s/60)+" min":(s/3600).toFixed(1)+" h";
let AC;
function beep(f,d=.1,t="sine",v=.12){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
const GAMES=[
{id:"g0",n:"Game-0",d:"Ramène la grille à zéro",i:"g0",c:["#EF2B2D","#7a0f12"],al:["game-0","game 0","game0","zero"],how:"Une grille de cellules chargées. Touche une cellule : elle et ses voisines directes perdent 1. Ramène toute la grille à zéro avant la fin de ton énergie. Annuler te rend un coup, deux fois par niveau. Trois étoiles si tu es parfait."},
{id:"tam",n:"Tam-Tam",d:"Frappe le rythme du tambour",i:"drum",c:["#FCD116","#8a6a00"],al:["tam-tam","tam tam","tamtam","tambour"],how:"Quatre pistes, des notes tombent. Touche la piste quand la note croise la ligne. Quatre vies, 7 niveaux, et le rythme se complique au fil de la musique."},
{id:"gri",n:"Écho du Griot",d:"Répète la mélodie",i:"wave",c:["#009E49","#04512a"],al:["echo","griot"],how:"Écoute la mélodie de kora, puis rejoue-la dans le même ordre. Choisis Facile (5 vies, 3 réécoutes, plus de temps) ou Normal. Elle s'allonge à chaque manche et passe à l'envers de temps en temps."},
{id:"lab",n:"Labyrinthe Faso",d:"Trouve la sortie",i:"maze",c:["#1b6b8f","#0b2f40"],al:["labyrinthe","labyrinth"],how:"Glisse le doigt : la bille te suit. Ramasse les clés, évite les drones rouges et rejoins l'anneau de sortie. Le labyrinthe grandit et le brouillard se resserre à chaque niveau."},
{id:"bao",n:"Baobab",d:"Empile sans déborder",i:"grid",c:["#c9692a","#5c2a0a"],al:["baobab"],how:"Un bloc néon glisse de gauche à droite. Touche pour le poser : ce qui dépasse est coupé. Les poses parfaites en série font regrandir le bloc. Empile le plus haut possible, de la savane à l'aurore."},
{id:"cau",n:"Éclat",d:"Trente secondes de réflexes",i:"target",c:["#7b3fa0","#2e0f45"],al:["eclat"],how:"Touche les cibles quand leur anneau rejoint le bord. Évite les pièges magenta, vise les cibles dorées pour gagner des vies. Tu as 5 vies et la partie ne s'arrête jamais avant."},
{id:"duel",n:"Duel des Cauris",d:"Réflexes à 2-4 joueurs",i:"bolt",m:"2-4",c:["#EF2B2D","#FCD116"],al:["duel","cauris"],how:"Réflexes pour deux à quatre joueurs sur le même téléphone. Attendez le signal vert, puis touchez votre zone. Premier à cinq points."},
{id:"ter",n:"Territoire",d:"Capture des carrés à 2-4",i:"shield",m:"2-4",c:["#009E49","#FCD116"],al:["territoire"],how:"Chacun son tour, tracez un trait entre deux points. Fermer un carré le capture et donne un coup de plus. Le plus de carrés gagne."}
];
function mkApi(id){const s=S.g(id);return{
score(n){if(n>s.best)s.best=n;S.save();if(cur===id)$("#gs").textContent=n+"  |  Record "+s.best},
end(n){s.last=n;if(n>s.best)s.best=n;S.save()},
save(o){s.state=o;S.save()},load(){return s.state},
on(){return cur===id&&!document.hidden}}}
function flush(){if(cur){S.g(cur).time+=(Date.now()-t0)/1000;S.save()}t0=Date.now()}
function openGame(id){flush();cur=id;const s=S.g(id),g=GAMES.find(x=>x.id==id);s.plays++;S.save();
$("#gameLayer").classList.remove("hidden");$("#gt").textContent=g.n;$("#gs").textContent="Record "+s.best;
for(const k in mounted)mounted[k].style.display="none";
if(!mounted[id]){const el=document.createElement("div");el.className="gwrap";$("#gbody").appendChild(el);mounted[id]=el;try{G[id](el,mkApi(id))}catch(e){el.style.color="#ff6b6b";el.style.padding="12px";el.textContent="ERREUR "+e+" | "+(e.stack||"").slice(0,300)}}
mounted[id].style.display="flex"}
function closeGame(){flush();cur=null;$("#gameLayer").classList.add("hidden");renderHub()}
function renderHub(){
$("#hub").innerHTML=GAMES.filter((g,i)=>isLogged()||i<3).map(g=>{const s=S.g(g.id);return '<div class="card"><div class="cover" style="--gc:'+g.c[0]+'">'+icon(g.i)+(g.m?'<span class="badge">'+icon("users")+" "+g.m+"</span>":"")+'</div><div class="info"><h3>'+g.n+"</h3><p>"+g.d+'</p><div class="meta"><span>'+icon("trophy")+" <b>"+s.best+"</b></span><span>"+icon("clock")+" <b>"+fm(s.time)+'</b></span></div><div class="meta"><span>Dernier <b>'+s.last+"</b></span><span>Parties <b>"+s.plays+'</b></span></div><button class="btn" data-g="'+g.id+'">'+((mounted[g.id]||s.state)?icon("resume")+" Reprendre":icon("play")+" Jouer")+"</button></div></div>"}).join("");if(!isLogged())$("#hub").insertAdjacentHTML("afterbegin",'<p style="color:#ffd426;padding:12px;text-align:center">Sans compte, seuls 3 jeux sont accessibles. Crée un compte pour débloquer tous les jeux.</p>');
document.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>openGame(b.dataset.g));
$("#totalTime").innerHTML="Temps de jeu<br><b>"+fm(GAMES.reduce((a,g)=>a+S.g(g.id).time,0))+"</b>"}
$("#gameLayer").innerHTML='<div class="gbar"><button class="ibtn" id="gb">'+icon("back")+'</button><b id="gt"></b><span id="gs"></span></div><div id="gbody"></div>';
$("#gb").onclick=closeGame;
document.addEventListener("visibilitychange",()=>{if(document.hidden)flush()});
window.appBack=()=>{if(window.AUTH&&AUTH.isOpen()){AUTH.close();return "1"}if(window.AI&&AI.isOpen()){AI.close();return "1"}if(cur){closeGame();return "1"}return "0"};
renderHub();
