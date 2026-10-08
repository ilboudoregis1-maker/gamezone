(function(){
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const PER={x:{n:"Xianis",pitch:1.08,rate:.95,ac:"#FCD116",ac2:"#009E49"},n:{n:"Nix",pitch:.88,rate:.93,ac:"#EF2B2D",ac2:"#f3f1e8"}};
let who=localStorage.getItem("aiwho")||"x",mute=false,speaking=false,greeted=false,vi={x:0,n:1};
try{vi=JSON.parse(localStorage.getItem("aivi"))||vi}catch(e){}
const L=$("#aiLayer");
L.innerHTML='<div id="dia"><svg viewBox="0 0 100 100"><defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac)"/><stop offset="1" style="stop-color:var(--ac2)"/></linearGradient></defs><path d="M50 4L96 50 50 96 4 50z" fill="#0a120d" stroke="url(#dg)" stroke-width="3"/><path d="M50 18L82 50 50 82 18 50z" fill="none" stroke="url(#dg)" stroke-width="1.5" opacity=".7"/><path d="M50 4V18M96 50H82M50 96V82M4 50H18M30 30l8 8M70 30l-8 8M30 70l8-8M70 70l-8-8" stroke="var(--ac)" stroke-width="1.5" fill="none"/><circle class="spin" cx="50" cy="50" r="15" fill="none" stroke="var(--ac)" stroke-width="1.5" stroke-dasharray="4 5"/><circle class="core" cx="50" cy="50" r="8" fill="var(--ac)"/></svg></div>'+
'<div id="aiwin" class="hidden"><div class="aih"><span style="font-size:24px;color:var(--ac)">'+icon("diamond")+'</span><b id="ain"></b><button class="ibtn" id="aisw">'+icon("users")+'</button><button class="ibtn" id="aivo">'+icon("wave")+'</button><button class="ibtn" id="aimu">'+icon("volume")+'</button><button class="ibtn" id="aimic">'+icon("mic")+'</button><button class="ibtn" id="aicl">'+icon("close")+'</button></div><div id="aim"></div><div class="chips"><button>Recommande-moi un jeu</button><button>Jeux à plusieurs</button><button>Mes scores</button><button>Comment jouer à Game-0</button></div><div class="aif"><input id="aiin" placeholder="Écrire un message" autocomplete="off"><button class="ibtn" id="aisd">'+icon("send")+'</button></div></div>';
function setWho(k){who=k;localStorage.setItem("aiwho",k);L.style.setProperty("--ac",PER[k].ac);L.style.setProperty("--ac2",PER[k].ac2);$("#ain").textContent=PER[k].n.toUpperCase()}
setWho(who);
const d=$("#dia");let pos=JSON.parse(localStorage.getItem("aipos")||"null"),auto=false;
function place(){const W=Math.max(innerWidth||0,document.documentElement.clientWidth||0,320),H=Math.max(innerHeight||0,document.documentElement.clientHeight||0,480);if(!pos||!isFinite(pos.x)||!isFinite(pos.y))auto=true;if(auto)pos={x:W-84,y:H-200};d.style.left=Math.max(0,Math.min(pos.x,W-70))+"px";d.style.top=Math.max(0,Math.min(pos.y,H-70))+"px"}place();addEventListener("resize",place);document.addEventListener("visibilitychange",place);[150,500,1200,2500,5000].forEach(t=>setTimeout(place,t));
let dr=null;
d.onpointerdown=e=>{dr={sx:e.clientX,sy:e.clientY,ox:pos.x,oy:pos.y,m:false};d.setPointerCapture(e.pointerId)};
d.onpointermove=e=>{if(!dr)return;const dx=e.clientX-dr.sx,dy=e.clientY-dr.sy;if(Math.abs(dx)+Math.abs(dy)>8)dr.m=true;if(dr.m){auto=false;pos={x:dr.ox+dx,y:dr.oy+dy};place()}};
d.onpointerup=()=>{if(!dr)return;if(dr.m)localStorage.setItem("aipos",JSON.stringify(pos));else isOpen()?close():open();dr=null};
const isOpen=()=>!$("#aiwin").classList.contains("hidden");
function greet(){return who=="x"?"Bonjour, je suis Xianis. Dis-moi ce que tu aimes et je te trouve le bon jeu.":"Bonjour, je suis Nix. Dites-moi ce que vous cherchez, je vous guide vers le bon jeu."}
function open(){$("#aiwin").classList.remove("hidden");if(!greeted){greeted=true;say(greet())}}
function close(){$("#aiwin").classList.add("hidden");if(window.Android&&Android.stopSpeak)Android.stopSpeak();if(window.speechSynthesis)speechSynthesis.cancel()}
let H=[];try{H=JSON.parse(localStorage.getItem("aihist")||"[]")||[]}catch(e){H=[]}
const sty=document.createElement("style");sty.textContent=".msg{word-break:break-word}.msg.sel{outline:2px solid var(--ac)}.mdel{display:block;margin-top:8px;border:1px solid #EF2B2D;background:#EF2B2D22;color:#ff6b6b;border-radius:10px;padding:6px 10px;font-size:12px}.msg.u .mdel{color:#500;background:#fff7;border-color:#500}#aiclr{border:1px solid #EF2B2D!important;color:#ff6b6b!important}#aiclr.warn{background:#EF2B2D!important;color:#fff!important}";document.head.appendChild(sty);
function sv(){try{localStorage.setItem("aihist",JSON.stringify(H.slice(-200)))}catch(e){}}
function unsel(){document.querySelectorAll("#aim .msg.sel").forEach(x=>{x.classList.remove("sel");const b=x.querySelector(".mdel");b&&b.remove()})}
function mk(o){const m=document.createElement("div");m.className="msg "+o.c;m.textContent=o.t;
m.onclick=function(){const was=m.classList.contains("sel");unsel();if(was)return;m.classList.add("sel");const b=document.createElement("button");b.className="mdel";b.textContent="Supprimer ce message";
b.onclick=function(e){e.stopPropagation();H=H.filter(x=>x.i!==o.i);sv();m.remove()};m.appendChild(b)};
$("#aim").appendChild(m);return m}
function add(t,c){const o={i:Date.now()+"_"+Math.random().toString(36).slice(2,7),c:c,t:t};H.push(o);sv();mk(o);$("#aim").scrollTop=1e5}
H.forEach(mk);if(H.length)greeted=true;setTimeout(function(){$("#aim").scrollTop=1e5},50);
function say(t){add(t,"a");speak(t)}
function vlist(){return window.speechSynthesis?(speechSynthesis.getVoices()||[]).filter(v=>/^fr/i.test(v.lang||"")):[]}
function pick(){const a=vlist();if(!a.length)return null;const g=who==="x"?"f":"m";
const sc=v=>{const n=((v.name||"")+" "+(v.voiceURI||"")).toLowerCase();const F=/x-fr[ac]\b|x-fr[ac]-|female|femme|amelie|audrey|julie|denise|eloise|celine|lea|hortense|marie/.test(n),M=/x-fr[bd]\b|x-fr[bd]-|\bmale\b|homme|thomas|henri|claude|antoine|paul|remy|mathieu|nicolas|jean/.test(n);return(g==="f"?(F?10:0)-(M?10:0):(M?10:0)-(F?10:0))+(/fr[-_]fr/i.test(v.lang)?3:0)+(/network|neural|premium|enhanced|natural/.test(n)?2:0)};
const b=a.map((v,i)=>({v,s:sc(v),i})).sort((p,q)=>q.s-p.s||p.i-q.i);
return b[0].s<10?a[vi[who]%a.length]:b[0].v}
function speak(t){if(mute)return;if(window.Android&&Android.speak){speaking=true;setTimeout(function(){speaking=false},15000);try{Android.speak(t,who)}catch(e){speaking=false}return}if(!window.speechSynthesis)return;speechSynthesis.cancel();const p=(t.match(/[^.!?:;]+[.!?:;]*/g)||[t]),v=pick();p.forEach((s,i)=>{const u=new SpeechSynthesisUtterance(s);u.lang="fr-FR";if(v)u.voice=v;u.pitch=PER[who].pitch;u.rate=PER[who].rate;u.onstart=()=>speaking=true;u.onend=u.onerror=()=>{if(i===p.length-1)speaking=false};speechSynthesis.speak(u)})}
function handle(q){add(q,"u");setTimeout(()=>reply(q),250)}
function reply(q){const t=norm(q);if(window.aiTalk&&aiTalk(t,say,who)){return}let g=GAMES.find(x=>x.al.some(a=>t.includes(a)));if(!g&&/boutique|boost|personnage|mission|jetpack|aimant|bouclier|sneaker|moto turbo|cape|fantome|laabal|brigade|controleur|portique|coeur de reserve|ralentisseur/.test(t))g=GAMES.find(x=>x.id=="faso");const R=re=>re.test(t);
if(R(/^(bonjour|salut|bonsoir|coucou|hello|hey)\b/)){say(greet());return}
if(g&&R(/\b(lance|lancer|ouvre|ouvrir|demarre|demarrer|joue|jouer|allons)\b/)&&!R(/comment|regle|explique/)){close();openGame(g.id);speak("C'est parti pour "+g.n);return}
if(g&&window.kbAnswer){const a=kbAnswer(g,t);if(a){say(a);return}}
if(!g&&window.kbGlobal){const a=kbGlobal(t);if(a){say(a);return}}
if(g&&(R(/comment|regle|explique|marche|but|principe|apprend/)||t.split(" ").length<=3)){say(g.n+" : "+g.how);return}
if(R(/\b(score|scores|record|records|meilleur|resultat|resultats)\b/)){say("Records : "+GAMES.map(x=>x.n+" "+S.g(x.id).best).join(", ")+".");return}
if(R(/\b(temps|duree|heures)\b/)){say("Temps de jeu total : "+fm(GAMES.reduce((a,x)=>a+S.g(x.id).time,0))+".");return}
if(R(/\b(course|courir|runner|action|arcade|adrenaline|sensations?)\b/)){say("Pour l'action, Faso Rush : une course sans fin sur les rails de Ouaga, avec pièces, boosts, personnages et missions.");return}
if(R(/\b(multi|multijoueur|ami|amis|deux|trois|quatre|plusieurs|ensemble|famille|joueurs)\b/)){say("A plusieurs, il y a Duel des Cauris, un duel de réflexes, et Territoire, où l'on capture des carrés tour à tour. Les deux se jouent de deux à quatre sur le même téléphone.");return}
if(R(/\b(rapide|court|minute|minutes|vite|pause)\b/)){say("Pour quelques minutes, Éclat dure trente secondes. Baobab est rapide aussi.");return}
if(R(/\b(reflechir|reflexion|logique|cerveau|puzzle|strategie)\b/)){say("Pour réfléchir : Game-0 ou Labyrinthe Faso. Pour la stratégie à plusieurs, Territoire.");return}
if(R(/\b(musique|rythme|danse|son)\b/)){say("Côté rythme et musique : Tam-Tam et Écho du Griot.");return}
if(R(/\b(memoire|souvenir)\b/)){say("Pour la mémoire, Écho du Griot est parfait.");return}
if(R(/\b(relax|detente|calme|stress)\b/)){say("Pour se détendre : Labyrinthe Faso ou Baobab.");return}
if(R(/\b(defi|difficile|challenge|dur)\b/)){say("Pour un vrai défi : Tam-Tam, puis Baobab quand la tour monte haut.");return}
if(R(/\b(liste|quels|jeux|propose|disponible|conseil|recommande|choisir|jouer)\b/)){say("Il y a "+GAMES.length+" jeux : "+GAMES.map(x=>x.n).join(", ")+". Dis-moi si tu veux jouer seul ou à plusieurs, et combien de temps tu as.");return}
if(R(/qui es|ton nom|presente|appelles/)){say("Je suis "+PER[who].n+", l'assistant de Game-Zone by CNS.corp. Je conseille les jeux, explique les règles et les lance pour toi.");return}
if(R(/\bmerci\b/)){say("Avec plaisir. Bon jeu.");return}
if(R(/\b(bye|revoir|ferme|stop)\b/)){say("A bientôt.");setTimeout(close,1200);return}
say(window.aiSorry?aiSorry(who):"Désolé, je ne vous ai pas compris.")}
$("#aisw").onclick=()=>{setWho(who=="x"?"n":"x");say(who=="x"?"Me voici, c'est Xianis.":"Nix à votre service.")};
$("#aivo").onclick=()=>{vi[who]++;localStorage.setItem("aivi",JSON.stringify(vi));say("Voici ma nouvelle voix.")};
$("#aimu").onclick=()=>{mute=!mute;$("#aimu").classList.toggle("off",mute);if(mute&&window.Android&&Android.stopSpeak)Android.stopSpeak();if(mute&&window.speechSynthesis)speechSynthesis.cancel()};
$("#aicl").onclick=close;
function send(){const i=$("#aiin"),v=i.value.trim();if(!v)return;i.value="";handle(v)}
$("#aisd").onclick=send;$("#aiin").onkeydown=e=>{if(e.key=="Enter")send()};
document.querySelectorAll(".chips button").forEach(b=>b.onclick=()=>handle(b.textContent));
(function(){const ch=$(".chips");["Explique-moi Faso Rush","Astuces pour Baobab","Que fait le Jetpack ?"].forEach(tx=>{const b=document.createElement("button");b.textContent=tx;b.onclick=()=>handle(tx);ch.appendChild(b)});
const cb=document.createElement("button");cb.id="aiclr";cb.textContent="Effacer la discussion";ch.insertBefore(cb,ch.firstChild);let cc=0;
cb.onclick=function(){if(!cc){cb.textContent="Touche encore pour tout effacer";cb.classList.add("warn");cc=setTimeout(function(){cc=0;cb.textContent="Effacer la discussion";cb.classList.remove("warn")},3500);return}
clearTimeout(cc);cc=0;H=[];sv();try{localStorage.removeItem("aihist")}catch(e){}$("#aim").innerHTML="";greeted=false;cb.textContent="Effacer la discussion";cb.classList.remove("warn");if(window.Android&&Android.stopSpeak)Android.stopSpeak()}})();
window.onSpeakDone=function(){speaking=false};window.AI={open,close,isOpen,who:setWho,handle,say,speaking:()=>speaking};
})();
