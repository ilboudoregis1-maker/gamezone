(function(){
GAMES.push({id:"faso",n:"Faso Rush",d:"Cours sur les rails de Ouaga",i:"bolt",m:"",c:["#FCD116","#EF2B2D"],al:["faso","rush","rails"],how:"Glisse à gauche ou à droite pour changer de voie, vers le haut pour sauter, vers le bas pour te baisser sous les portiques. Ramasse les pièces, évite les trains et les barrières. Achète des boosts et débloque des personnages."});
const oc=window.cover;window.cover=function(id){return id==="faso"?'<img class="cv" src="img/home.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top">':(oc?oc(id):"")};
const st=document.createElement("style");st.textContent=`
.fr{position:relative;overflow:hidden;border-radius:16px;margin:0 auto;background:#0b1d4a;color:#fff;font-family:system-ui,sans-serif;-webkit-user-select:none;user-select:none}
.fr .bg{position:absolute;inset:0;background-size:cover;background-position:center}
.fr .sh{position:absolute;inset:0;background:linear-gradient(rgba(11,29,74,0.133),rgba(11,29,74,0.933))}
.fr .top{position:absolute;left:0;right:0;top:0;padding:8px 10px;background:#0a1f55;border-bottom:2px solid #2f5fd0;display:flex;gap:8px;align-items:center;z-index:3}.fr .av{width:36px;height:36px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #ffd43b}.fr .dk{position:absolute;inset:0;background:linear-gradient(#0b1d4a,#08123a)}.fr .art{position:absolute;left:0;right:0;top:54px;height:calc(86% - 54px);background-size:100% auto;background-position:top;background-repeat:no-repeat;-webkit-mask-image:linear-gradient(#000 80%,transparent);mask-image:linear-gradient(#000 80%,transparent)}.fr .sd{position:absolute;right:8px;top:34%;display:flex;flex-direction:column;gap:10px;z-index:3}.fr .sd b{width:64px;height:62px;border-radius:14px;background:rgba(10,37,102,0.867);border:2px solid #2f5fd0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9px;gap:3px;white-space:nowrap}.fr .sd svg{width:26px;height:26px}
.fr .pill{background:#0a2566;border:2px solid #2f5fd0;border-radius:20px;padding:4px 12px;font-weight:800;display:flex;gap:6px;align-items:center;font-size:15px}
.fr .co{width:16px;height:16px;border-radius:50%;background:radial-gradient(#ffe066,#f59f00);border:2px solid #e67700;display:inline-block}
.fr .gm{width:13px;height:13px;background:linear-gradient(135deg,#74c0fc,#1971c2);transform:rotate(45deg);display:inline-block;border:1px solid #a5d8ff}
.fr .ttl{position:absolute;left:0;right:0;top:56px;text-align:center;font-weight:900;font-style:italic;font-size:56px;line-height:.92;color:#ffd43b;text-shadow:0 3px 0 #c92a2a,0 6px 0 #7a1010,0 10px 14px #000a;transform:rotate(-5deg);z-index:2}
.fr .ttl small{display:block;font-size:17px;color:#fff;text-shadow:0 2px 4px #000;margin-top:6px;font-style:normal}
.fr .hero{position:absolute;left:50%;top:34%;width:40%;transform:translateX(-50%);border-radius:18px;border:3px solid #ffd43b;box-shadow:0 8px 24px #000a;z-index:2}
.fr .play{position:absolute;left:12%;right:12%;bottom:84px;height:62px;border:0;border-radius:18px;background:linear-gradient(#ffe066,#fab005);color:#12265e;font-size:28px;font-weight:900;box-shadow:0 5px 0 #b87400,0 10px 20px #0009;z-index:3;display:flex;align-items:center;justify-content:center;gap:12px}
.fr .tri{border-left:22px solid #12265e;border-top:13px solid transparent;border-bottom:13px solid transparent;display:inline-block}
.fr .nav{position:absolute;left:0;right:0;bottom:0;height:62px;background:#0a1f55;border-top:2px solid #2f5fd0;display:flex;z-index:3}
.fr .nav b{flex:1;display:flex;align-items:center;justify-content:center;font-size:13px;color:#9db4ee}
.fr .nav b.on{color:#ffd43b;box-shadow:inset 0 3px 0 #ffd43b}
.fr .hd{position:absolute;left:0;right:0;top:0;height:54px;display:flex;align-items:center;gap:10px;padding:0 10px;z-index:3;font-size:21px;font-weight:800}
.fr .bk{width:38px;height:38px;border-radius:50%;background:#1a3c9a;border:2px solid #4d7cf0;display:flex;align-items:center;justify-content:center;font-size:22px}
.fr .hd .pill{margin-left:auto;font-size:14px}
.fr .grid{position:absolute;left:10px;right:10px;top:60px;bottom:72px;overflow:auto;display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:start;z-index:2}
.fr .cd{position:relative;border-radius:14px;overflow:hidden;border:3px solid #2f5fd0;background:#102a70}
.fr .cd.sel{border-color:#51cf66}
.fr .cd img{width:100%;display:block;aspect-ratio:1/.8;object-fit:cover;object-position:top}
.fr .cd span{display:block;padding:6px 8px 0;background:#0a1f55;font-weight:800;font-size:17px;color:#fff}
.fr .cd em{display:block;padding:2px 8px 8px;font-style:normal;font-size:17px;background:#0a1f55;color:#ffd43b;font-weight:700}
.fr .list{position:absolute;left:10px;right:10px;top:60px;bottom:72px;overflow:auto;z-index:2;display:flex;flex-direction:column;gap:10px}
.fr .row{display:flex;align-items:center;gap:12px;background:#0d2468;border:2px solid #2a4fb8;border-radius:14px;padding:10px}
.fr .row svg{width:46px;height:46px;flex:none}
.fr .row div{flex:1;font-size:13px;color:#b9c9f5}
.fr .row div b{display:block;font-size:16px;color:#fff}
.fr .pr{border:0;border-radius:12px;padding:8px 12px;background:linear-gradient(#ffe066,#fab005);color:#12265e;font-weight:900;font-size:15px}
.fr .bar{height:10px;border-radius:6px;background:#06143a;margin-top:6px;overflow:hidden}
.fr .bar i{display:block;height:100%;background:linear-gradient(#4dabf7,#1c7ed6)}
.fr canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}
.fr .hud{position:absolute;left:10px;right:10px;top:10px;display:flex;justify-content:space-between;z-index:3;pointer-events:none}
.fr .pz{width:42px;height:42px;border-radius:12px;background:#1a56d6;border:2px solid #7fa6ff;display:flex;gap:6px;align-items:center;justify-content:center;pointer-events:auto}
.fr .pz i{width:6px;height:18px;background:#fff;border-radius:2px}
.fr .cp{display:flex;align-items:center;gap:6px;background:#0a2566;border:3px solid #2f7dff;border-radius:14px;padding:4px 8px}.fr .cp svg{width:28px;height:28px}.fr .cp u{display:flex;gap:3px;text-decoration:none}.fr .cp u i{width:10px;height:15px;background:#1b4d2a;border-radius:2px}.fr .cp u i.f{background:#69db7c}.fr .sc{text-align:right;font-weight:900;font-size:22px;text-shadow:0 2px 4px #000}
.fr .sc b{color:#ffd43b;margin-right:8px}
.fr .ch{position:absolute;left:10px;bottom:10px;z-index:3;display:flex;gap:6px;font-size:12px;font-weight:800}
.fr .ch span{background:#0a2566;border:2px solid #2f5fd0;border-radius:10px;padding:3px 8px}
.fr .ov{position:absolute;inset:0;background:#000a;z-index:5;display:flex;align-items:center;justify-content:center}
.fr .pn{width:78%;background:#0d2468;border:2px solid #2f5fd0;border-radius:20px;padding:18px;display:flex;flex-direction:column;gap:12px;text-align:center}
.fr .pn h2{margin:0;font-size:30px}
.fr .pn p{margin:0;color:#b9c9f5}
.fr .pn button{border:0;border-radius:12px;height:48px;font-size:19px;font-weight:800;color:#fff}
.fr .g{background:linear-gradient(#69db7c,#2f9e44)}.fr .b{background:linear-gradient(#4dabf7,#1c7ed6)}.fr .o{background:linear-gradient(#ffa94d,#f76707)}.fr .r{background:linear-gradient(#ff6b6b,#e03131)}
.fr .tt{position:absolute;left:0;right:0;bottom:80px;text-align:center;z-index:6;pointer-events:none}
.fr .tt span{background:#e03131;border-radius:12px;padding:6px 14px;font-weight:800}
.fr #fv{position:absolute;left:10px;top:56px;display:flex;gap:3px;z-index:3;pointer-events:none}.fr #fv svg{width:22px;height:22px;filter:drop-shadow(0 2px 2px #0008)}
.fr .hud,.fr #fv,.fr #ch,.fr #fl{transition:opacity .6s}.fr.intro .hud,.fr.intro #fv,.fr.intro #ch,.fr.intro #fl{opacity:0}
.fr #cin i{position:absolute;left:0;right:0;height:12%;background:#000;z-index:4;transition:transform .7s}.fr #cin .t{top:0}.fr #cin .b{bottom:0}.fr #cin.off i.t{transform:translateY(-100%)}.fr #cin.off i.b{transform:translateY(100%)}
.fr #sub{position:absolute;left:6%;right:6%;bottom:14%;text-align:center;z-index:4;font:800 17px/1.25 system-ui,sans-serif;color:#fff;text-shadow:0 2px 4px #000;pointer-events:none}
.fr #skip{position:absolute;right:12px;bottom:13%;z-index:4;background:#0009;border:1px solid #fff6;border-radius:14px;padding:6px 12px;font:800 13px system-ui,sans-serif;color:#fff}
.fr #sir{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0}
`;document.head.appendChild(st);

const CH=[{id:"faso",n:"Faso Boy",p:0,hd:"spr",jk:"#c0392b",pn:"#2b4f94",sh:"#d52b1e",bp:"#2f9e44",sk:"#8a5a33",ac:"#d52b1e",pd:"Le coureur de base"},
{id:"aicha",n:"Aïcha",p:3000,hd:"braid",jk:"#ff7eb6",pn:"#3b3b6e",sh:"#f8f9fa",bp:"#e64980",sk:"#8a5a33",ac:"#e64980",pk:{c:.1},pd:"Pièces +10 %"},
{id:"issa",n:"Issa",p:5000,hd:"curl",jk:"#f59f00",pn:"#1c3d8a",sh:"#f8f9fa",bp:"#3b5bdb",sk:"#6e4425",ac:"#3b5bdb",pk:{j:1},pd:"Super saut permanent"},
{id:"zara",n:"Zara",p:6000,hd:"bun",jk:"#9c36b5",pn:"#2b2b4a",sh:"#ffd43b",bp:"#d6336c",sk:"#8a5a33",ac:"#d6336c",pk:{m:1},pd:"Aimant au départ"},
{id:"tiga",n:"Tiga",p:9000,hd:"hood",jk:"#2b2f36",pn:"#1b1f26",sh:"#f1f3f5",bp:"#495057",sk:"#6e4425",ac:"#fcc419",pk:{s:1},pd:"Bouclier au départ"},
{id:"mariam",n:"Mariam",p:12000,hd:"wrap",jk:"#2f9e44",pn:"#7b4a24",sh:"#fcc419",bp:"#f08c00",sk:"#7a4a28",ac:"#f08c00",pk:{l:1},pd:"+1 vie"}];
const IC={mag:'<svg viewBox="0 0 24 24"><path d="M5 3v9a7 7 0 0 0 14 0V3h-4v9a3 3 0 0 1-6 0V3z" fill="#e03131"/><rect x="5" y="3" width="4" height="3" fill="#dee2e6"/><rect x="15" y="3" width="4" height="3" fill="#dee2e6"/></svg>',
snk:'<svg viewBox="0 0 24 24"><path d="M3 15l5-1 3-6 3 3 6 2v4H3z" fill="#f8f9fa" stroke="#e03131" stroke-width="1.5"/></svg>',
shd:'<svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="#339af0" stroke="#a5d8ff" stroke-width="1.5"/></svg>',
jet:'<svg viewBox="0 0 24 24"><path d="M12 2c4 2 5 7 4 11l-2 3h-4l-2-3C7 9 8 4 12 2z" fill="#f1f3f5"/><circle cx="12" cy="9" r="2" fill="#339af0"/><path d="M8 14l-3 4 4-1zM16 14l3 4-4-1z" fill="#e03131"/><path d="M10 17h4l-2 5z" fill="#fcc419"/></svg>'};
IC.dbl='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fcc419" stroke="#e67700" stroke-width="2"/><text x="12" y="16" font-size="10" font-weight="800" text-anchor="middle" fill="#7a4a00" font-family="sans-serif">x2</text></svg>';
IC.mmg=IC.mag.replace('</svg>','<circle cx="12" cy="12" r="11" fill="none" stroke="#74c0fc" stroke-width="1.6"/></svg>');
IC.vie='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" fill="#ff4d6d"/><path d="M12 9v6M9 12h6" stroke="#fff" stroke-width="2"/></svg>';
IC.slo='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e7f5ff" stroke="#1971c2" stroke-width="2"/><path d="M12 6v6l4 2" stroke="#1971c2" stroke-width="2" fill="none"/></svg>';
IC.gho='<svg viewBox="0 0 24 24"><path d="M5 21V11a7 7 0 0 1 14 0v10l-3-2-2 2-2-2-2 2-2-2z" fill="#f1f3f5"/><circle cx="9.5" cy="11" r="1.4" fill="#212529"/><circle cx="14.5" cy="11" r="1.4" fill="#212529"/></svg>';
IC.mot='<svg viewBox="0 0 24 24"><circle cx="6" cy="17" r="3.5" fill="none" stroke="#fcc419" stroke-width="2"/><circle cx="18" cy="17" r="3.5" fill="none" stroke="#fcc419" stroke-width="2"/><path d="M6 17l4-7h5l3 7M10 10l-1-3h3" stroke="#ff6b6b" stroke-width="2" fill="none"/></svg>';
const ZL=600,ZN=[{n:"OUAGADOUGOU",g:0xb07a45,r:0xffffff,w:0xffffff,f:0xf0d9b0},{n:"LA FORÊT",g:0x2f6b2f,r:0x9a8a6e,w:0x6b8f5a,f:0xa8cfae},{n:"LE GRAND PONT",g:0x2a6fa8,r:0xc9ccd1,w:0xbcc2c8,f:0xb4d8f0},{n:"LE DÉSERT",g:0xe3b866,r:0xffe3b0,w:0xf0d9a8,f:0xf5d9a0},{n:"L'ÉCOLE",g:0x6fa84a,r:0xffffff,w:0xffe9a6,f:0xd9efc0},{n:"L'HÔPITAL",g:0xc4ccd2,r:0xe6e6ea,w:0xffffff,f:0xdfeaf2}];
const zAt=w=>Math.floor(Math.max(0,w)/ZL)%ZN.length;
(function(){const st2=document.createElement("style");st2.textContent=`.fr #gad{position:absolute;right:10px;bottom:10px;z-index:4;display:flex;flex-direction:column;gap:8px}.fr .gb{position:relative;width:58px;height:58px;border-radius:14px;background:rgba(10,37,102,0.867);border:2px solid #2f7dff;display:flex;align-items:center;justify-content:center}.fr .gb svg{width:34px;height:34px}.fr .gb small{position:absolute;right:4px;bottom:1px;font:800 12px sans-serif;color:#ffd43b}.fr.intro #gad{opacity:0}`;document.head.appendChild(st2)})();
const BO=[{k:"mag",n:"Aimant à pièces",d:"Attire les pièces autour de toi.",p:500},{k:"snk",n:"Super Sneakers",d:"Permet de sauter plus haut.",p:750},{k:"shd",n:"Bouclier",d:"Protège pendant quelques secondes.",p:1000},{k:"jet",n:"Jetpack",d:"Voler temporairement.",p:1500},{k:"dbl",n:"Double Pièces",d:"Toutes les pièces comptent double pendant la course.",p:8000},{k:"mmg",n:"Méga Aimant",d:"Aimant géant : aspire les pièces de toute la route pendant 60 s.",p:12000},{k:"vie",n:"Cœurs de réserve",d:"+2 vies pour la prochaine course.",p:15000},{k:"slo",n:"Ralentisseur de temps",d:"En course, touche l'icône : tout ralentit pendant 15 s.",p:20000},{k:"gho",n:"Cape Fantôme",d:"En course, touche l'icône : tu traverses tout pendant 8 s.",p:35000},{k:"mot",n:"Moto Turbo",d:"En course, touche l'icône : 10 s invincible, vitesse et score x3.",p:60000}];
const MI=[{k:"c",n:"Collecter 500 pièces",t:500,r:1500},{k:"j",n:"Faire 3 sauts",t:3,r:2000},{k:"d",n:"Échapper au contrôleur (500 m)",t:1,r:3000},{k:"z",n:"Traverser 3 zones en une course",t:3,r:5000}];

G.faso=function(el,A){
const W=Math.min(innerWidth-16,460),H=Math.max(460,Math.min(innerHeight-90,800));
el.innerHTML='<div class="fr"></div>';const R=$(".fr",el);R.style.width=W+"px";R.style.height=H+"px";
const D={coins:1250,gems:10,own:["faso"],sel:"faso",bo:{mag:0,snk:0,shd:0,jet:0},m:{c:0,j:0,d:0},cl:{},best:0};
try{const o=JSON.parse(localStorage.getItem("faso_d")||"{}");for(const k in o)D[k]=o[k]}catch(e){}
D.bo=Object.assign({mag:0,snk:0,shd:0,jet:0,dbl:0,mmg:0,vie:0,slo:0,gho:0,mot:0},D.bo);D.m=Object.assign({c:0,j:0,d:0,z:0},D.m);
const sv=()=>{try{localStorage.setItem("faso_d",JSON.stringify(D))}catch(e){}};
let mode="home",paused=false,snd=true;
const bgI=new Image();bgI.src="img/bg_ouaga.jpg";const spr=new Image();spr.src="data:image/webp;base64,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";
const bp=(f,v)=>snd&&sfx(f,v);
const top=()=>'<div class="top"><img class="av" src="img/c_'+D.sel+'.jpg"><span class="pill"><i class="co"></i>'+D.coins+'</span><span class="pill"><i class="gm"></i>'+D.gems+'</span></div>';
const nav=a=>'<div class="nav">'+[["home","Accueil"],["chars","Personnages"],["shop","Boutique"],["mis","Missions"]].map(x=>'<b data-a="'+x[0]+'" class="'+(x[0]===a?"on":"")+'">'+x[1]+'</b>').join("")+'</div>';
const hd=t=>'<div class="hd"><span class="bk" data-a="home">&#8249;</span>'+t+'<span class="pill"><i class="co"></i>'+D.coins+'</span></div>';
const bgs='<div class="bg" style="background-image:url(img/bg_ouaga.jpg)"></div><div class="sh"></div>';
function toast(t){const d=document.createElement("div");d.className="tt";d.innerHTML="<span>"+t+"</span>";R.appendChild(d);setTimeout(()=>d.remove(),1400)}
function show(s){mode=s;paused=false;try{if(G3&&G3.sir)G3.sir.g.gain.value=0}catch(e){}R.classList.remove("intro");
if(s==="load"){R.innerHTML='<div class="dk"></div><div class="art" style="top:0;height:84%;background-image:url(img/load.jpg)"></div><div style="position:absolute;left:14%;right:14%;bottom:60px;text-align:center;z-index:3"><div style="margin-bottom:8px;font-weight:700">Chargement...</div><div class="bar" style="height:16px;border:2px solid #fff3"><i id="lb" style="width:0%;background:linear-gradient(#ffe066,#fab005);transition:width 1.1s"></i></div></div>';setTimeout(()=>{const b=$("#lb",R);if(b)b.style.width="100%"},30);setTimeout(()=>mode==="load"&&show("home"),1300);return}
if(s==="home"){R.innerHTML='<div class="dk"></div><div class="art" style="background-image:url(img/load.jpg)"></div>'+top()+''+'<div class="sd"><b data-a="rk"><svg viewBox="0 0 24 24"><path d="M3 8l5 4 4-7 4 7 5-4-2 11H5z" fill="#fcc419"/></svg>Classement</b><b data-a="rw"><svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" fill="#e03131"/><rect x="2" y="6" width="20" height="4" fill="#ff6b6b"/><rect x="11" y="6" width="2" height="15" fill="#ffe066"/></svg>Récompenses</b><b data-a="mis"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2" fill="#f1f3f5"/><rect x="3" y="4" width="18" height="5" fill="#e03131"/><circle cx="8" cy="14" r="1.6" fill="#1971c2"/><circle cx="12" cy="14" r="1.6" fill="#1971c2"/><circle cx="16" cy="14" r="1.6" fill="#1971c2"/></svg>Quotidien</b></div>'+'<button class="play" data-a="play"><i class="tri"></i>JOUER</button>'+nav("home");return}
if(s==="chars"){R.innerHTML=bgs+hd("Personnages")+'<div class="grid">'+CH.map(c=>{const o=D.own.includes(c.id);return '<div class="cd '+(c.id===D.sel?"sel":"")+'" data-a="ch:'+c.id+'"><img src="img/c_'+c.id+'.jpg"><span>'+c.n+'</span><em>'+(c.id===D.sel?"Équipé":o?"Choisir":String(c.p).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" pièces")+(c.pd?'<br><small style="opacity:1;font-weight:600;font-size:12px;color:#fff">'+c.pd+"</small>":"")+'</em></div>'}).join("")+'</div>'+nav("chars");return}
if(s==="shop"){R.innerHTML=bgs+hd("Boutique")+'<div class="list">'+BO.map(b=>'<div class="row">'+IC[b.k]+'<div><b>'+b.n+(D.bo[b.k]?" (x"+D.bo[b.k]+")":"")+'</b>'+b.d+'</div><button class="pr" data-a="bo:'+b.k+'">'+b.p+'</button></div>').join("")+'</div>'+nav("shop");return}
if(s==="mis"){R.innerHTML=bgs+hd("Missions du jour")+'<div class="list">'+MI.map(m=>{const v=Math.min(D.m[m.k],m.t),dn=v>=m.t;return '<div class="row"><div><b>'+m.n+'</b><span>'+v+"/"+m.t+'</span><div class="bar"><i style="width:'+v/m.t*100+'%"></i></div></div>'+(D.cl[m.k]?'<span>Fait</span>':dn?'<button class="pr" data-a="cl:'+m.k+'">+'+m.r+'</button>':'<span class="pill" style="font-size:13px"><i class="co"></i>'+m.r+'</span>')+'</div>'}).join("")+'</div>'+nav("mis");return}
}
R.addEventListener("click",e=>{const t=e.target.closest("[data-a]");if(!t)return;const a=t.dataset.a;
if(a.startsWith("gd:")){useGad(a.slice(3));return}
if(a==="rk"){toast("Record : "+D.best);return}
if(a==="rw"){const td=new Date().toDateString();if(D.dl===td)toast("Déjà récupérée aujourd'hui");else{D.dl=td;D.coins+=500;sv();toast("+500 pièces");show("home")}return}
if(["home","chars","shop","mis"].includes(a)){bp(520);show(a);return}
if(a==="play"){bp(700);musInit();run();return}
if(a.startsWith("ch:")){const c=CH.find(x=>x.id===a.slice(3));if(D.own.includes(c.id))D.sel=c.id;else if(D.coins>=c.p){D.coins-=c.p;D.own.push(c.id);D.sel=c.id;bp(880)}else toast("Pas assez de pièces");sv();show("chars");return}
if(a.startsWith("bo:")){const b=BO.find(x=>x.k===a.slice(3));if(D.coins>=b.p){D.coins-=b.p;D.bo[b.k]++;bp(880);sv()}else toast("Pas assez de pièces");show("shop");return}
if(a.startsWith("cl:")){const m=MI.find(x=>x.k===a.slice(3));D.cl[m.k]=1;D.coins+=m.r;bp(880);sv();show("mis");return}
});

/* ===== COURSE ===== */
let cv,x,hud,raf=0,last=0,S;
const SCN=()=>W/430;
function run(){mode="play";paused=false;
R.innerHTML='<canvas></canvas><div class="hud"><div class="pz" data-a="pause"><i></i><i></i></div><div class="sc"><b id="fm"></b><span id="fs">0</span><div style="font-size:16px;margin-top:2px"><i class="co"></i> <span id="fc">0</span></div></div></div><div class="ch" id="ch"></div><div id="fv"></div><div id="sir"></div><div id="cin"><i class="t"></i><i class="b"></i><div id="sub"></div><div id="skip">Passer &#8250;</div></div>';R.classList.add("intro");setTimeout(()=>{const k=$("#skip",R);if(k)k.onclick=()=>{if(S&&S.intro>0)S.it=Math.max(S.it,5.2)}},0);
cv=$("canvas",R);const dpr=Math.min(devicePixelRatio||1,2);cv.width=W*dpr;cv.height=H*dpr;x=cv.getContext("2d");x.scale(dpr,dpr);
S={lane:0,px:0,jt:0,v:16,dist:0,score:0,rc:0,obs:[],cn:[],nr:20,sh:D.bo.shd>0?1:0,jet:D.bo.jet>0?6:0,mag:D.bo.mag>0?20:0,snk:D.bo.snk>0,t:0,dead:false,lv:5,inv:0,intro:5.2,it:0,pop:[]};
["mag","snk","shd","jet"].forEach(k=>{if(D.bo[k]>0)D.bo[k]--});
{const P_=(CH.find(k=>k.id===D.sel)||CH[0]).pk||{};S.cmul=1+(P_.c||0);S.sg=P_.g||1;S.sx=P_.x||1;S.rcf=0;S.zc=0;S.zn=0;S.lvm=5;S.slo=0;S.gho=0;S.mot=0;
if(P_.j)S.snk=true;if(P_.m)S.mag=Math.max(S.mag,20);if(P_.s)S.sh=1;if(P_.l){S.lv+=P_.l;S.lvm+=P_.l}
if(D.bo.dbl>0){D.bo.dbl--;S.dbl=1}if(D.bo.mmg>0){D.bo.mmg--;S.mmg=1;S.mag=60}if(D.bo.vie>0){D.bo.vie--;S.lv+=2;S.lvm+=2}}
sv();
let sx=0,sy=0,dn=false;
cv.onpointerdown=e=>{sx=e.clientX;sy=e.clientY;dn=true};
cv.onpointermove=e=>{if(!dn)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>28||Math.abs(dy)>28){if(Math.abs(dx)>Math.abs(dy))mv(dx>0?1:-1);else if(dy<0)jump();else slide();sx=e.clientX;sy=e.clientY}};
cv.onpointerup=()=>{dn=false};
$(".pz",R).onclick=pause;gadUI();
if(!raf){last=performance.now();raf=requestAnimationFrame(loop)}
}
const mv=d=>{if(mode!=="play"||paused||S.dead||S.intro>0)return;S.lane=Math.max(-1,Math.min(1,S.lane+d));bp(400,.06)};
const slide=()=>{if(mode!=="play"||paused||S.dead||S.intro>0)return;if(S.jt>0)S.jt=Math.min(S.jt,.07);S.sl=.65;bp(300,.06)};
const jump=()=>{if(mode!=="play"||paused||S.dead||S.jt>0||S.intro>0)return;S.sl=0;S.jt=S.snk?.85:.62;D.m.j++;bp(600,.08)};
document.addEventListener("keydown",e=>{if(!A.on()||mode!=="play")return;if(e.key==="ArrowLeft")mv(-1);if(e.key==="ArrowRight")mv(1);if(e.key==="ArrowUp"||e.key===" ")jump();if(e.key==="ArrowDown")slide();if(e.key==="Escape")pause()});
function gadUI(){const o=$("#gad",R);if(o)o.remove();const L=["slo","gho","mot"].filter(k=>D.bo[k]>0);if(!L.length)return;const d=document.createElement("div");d.id="gad";d.innerHTML=L.map(k=>'<b class="gb" data-a="gd:'+k+'">'+IC[k]+'<small>x'+D.bo[k]+'</small></b>').join("");R.appendChild(d)}
function useGad(k){if(mode!=="play"||paused||S.dead||S.intro>0||!(D.bo[k]>0))return;if(S[k]>0)return;D.bo[k]--;sv();if(k==="slo")S.slo=15;if(k==="gho")S.gho=8;if(k==="mot")S.mot=10;bp(880,.1);gadUI()}
function pause(){if(mode!=="play"||paused||S.dead)return;paused=true;const o=document.createElement("div");o.className="ov";o.innerHTML='<div class="pn"><h2>Pause</h2><button class="g" id="p1">Reprendre</button><button class="b" id="p2">Menu principal</button><button class="o" id="p3">Son : '+(snd?"oui":"non")+'</button><button class="r" id="p4">Quitter</button></div>';R.appendChild(o);
$("#p1",o).onclick=()=>{o.remove();paused=false;last=performance.now()};
$("#p2",o).onclick=()=>{sv();show("home")};
$("#p3",o).onclick=()=>{snd=!snd;$("#p3",o).textContent="Son : "+(snd?"oui":"non")};
$("#p4",o).onclick=()=>{sv();show("home");closeGame()}}
function over(){S.dead=true;S.shk=.4;S.bd=Math.floor(S.dist/10)+(S.zc||0)*50;D.coins+=S.rc+S.bd;D.m.z=Math.max(D.m.z||0,S.zc||0);if(S.dist>=500)D.m.d=1;if(Math.floor(S.score)>D.best)D.best=Math.floor(S.score);D.m.c+=S.rc;sv();A.score(Math.floor(S.score));A.end(Math.floor(S.score));bp(150,.3);
const o=document.createElement("div");o.className="ov";o.innerHTML='<div class="pn"><h2>Attrapé !</h2><p>La brigade Laabal vous a rattrapé</p><p>Score '+Math.floor(S.score)+' &middot; Record '+D.best+'</p><p>Distance '+Math.floor(S.dist)+' m &middot; zones '+(S.zc||0)+'</p><p>+'+(S.rc+S.bd)+' pièces (dont bonus : '+S.bd+')</p><button class="g" id="o1">Rejouer</button><button class="b" id="o2">Menu principal</button></div>';R.appendChild(o);
$("#o1",o).onclick=run;$("#o2",o).onclick=()=>show("home")}
function spawn0(){const r=Math.random(),L=[-1,0,1].sort(()=>Math.random()-.5);
if(r<.34){const n=Math.random()<.4?2:1;for(let i=0;i<n;i++)S.obs.push({t:Math.random()<.45?"bu":"tr",l:L[i],z:150,len:7,c:0});for(let k=0;k<6;k++)S.cn.push({l:L[2],z:150+k*3,h:0})}
else if(r<.58){const n=Math.random()<.5?2:1;for(let i=0;i<n;i++)S.obs.push({t:"ba",l:L[i],z:150,len:1,v:Math.random()<.5});for(let k=0;k<5;k++)S.cn.push({l:L[2],z:150+k*3,h:0})}
else if(r<.8){const n=Math.random()<.5?2:1;for(let i=0;i<n;i++)S.obs.push({t:"hi",l:L[i],z:150,len:1});for(let k=0;k<6;k++)S.cn.push({l:L[0],z:150+k*3,h:0})}
else{for(let k=0;k<9;k++)S.cn.push({l:L[0],z:150+k*3,h:k>2&&k<6?.8:0})}}
function spawn(){const n0=S.obs.length,zn=Math.floor((S.dist+150)/ZL)%ZN.length;spawn0();
for(let i=n0;i<S.obs.length;i++)S.obs[i].zn=zn;
if(S.dist>700&&Math.random()<Math.min(.55,.12+S.dist*.00005)){const oc=[0,0,0];for(const o of S.obs)if(o.z>100&&o.t!=="ba")oc[o.l+1]=1;
const fr=[-1,0,1].filter(l=>!oc[l+1]);if(fr.length>=2){const l=fr[Math.floor(Math.random()*fr.length)];S.obs.push({t:"mv",l,z:175,len:2.6,c:0,sp:5+Math.random()*5+Math.min(6,S.dist*.002),zn})}}}
function amb(){if(!snd||!AX||S.dead)return;try{const r=Math.random();if(r<.4){tn(520,0,.09,"square",.03);tn(520,0,.09,"square",.03,.16)}else if(r<.75){nz(.7,650,.06,.6)}else{tn(330,0,.5,"sine",.04);tn(495,0,.5,"sine",.03,.04)}}catch(e){}}
function intro(dt){S.it+=dt;const it=S.it;S.intro=5.2-it;
if(it>1.55&&!S.f1){S.f1=1;bp(600,.08)}
if(it>2.3&&!S.f2){S.f2=1;bp(300,.05)}
if(it>2.5&&!S.f3){S.f3=1;try{if(snd){tn(2400,2000,.22,"sine",.06,.1);tn(2400,2000,.3,"sine",.06,.4)}}catch(e){}}
if(it>3.2){S.dist+=16*Math.min(1,(it-3.2)/1.2)*dt}
const tx=it<.3?"":it<1.7?"Ouagadougou. Un midi comme les autres.":it<2.5?"Et hop, dans la rue !":it<4?"Brigade Laabal : Eh ! Ramasse ça tout de suite !":"Cours !";
const sb=$("#sub",R);if(sb&&sb.dataset.t!==tx){sb.dataset.t=tx;sb.textContent=tx}
if(S.intro<=0){S.intro=0;S.bz=4.8;R.classList.remove("intro");const c=$("#cin",R);if(c){c.classList.add("off");setTimeout(()=>c.remove(),800)}}}
function upd(dt){if(S.intro>0){intro(dt);return}S.t+=dt;{const zz=Math.floor(S.dist/ZL);if(zz!==S.zn){S.zn=zz;S.zc=zz;toast(ZN[zz%ZN.length].n+" !");bp(880,.12)}}S.am=(S.am===undefined?5:S.am)-dt;if(S.am<=0){S.am=6+Math.random()*7;amb()}if(Math.floor(S.dist/500)>(S.ms||0)){S.ms=Math.floor(S.dist/500);toast(S.ms*500+" m !")}S.v=Math.min(46,16+S.dist*.0125*(S.sg||1));if(S.slo>0)S.v*=.7;if(S.mot>0)S.v*=1.35;const d=S.v*dt;S.dist+=d;const mu=1+Math.min(4,Math.floor(S.dist/400));S.score+=d*mu*(S.sx||1)*(S.mot>0?3:1);S.mu=mu;
S.px+=(S.lane-S.px)*Math.min(1,dt*14);if(S.jt>0)S.jt-=dt;if(S.sl>0)S.sl-=dt;if(S.jet>0)S.jet-=dt;if(S.inv>0)S.inv-=dt;if(S.mag>0)S.mag-=dt;if(S.slo>0)S.slo-=dt;if(S.gho>0){S.gho-=dt;if(S.gho<=0)S.inv=Math.max(S.inv,1.5)}if(S.mot>0){S.mot-=dt;if(S.mot<=0)S.inv=Math.max(S.inv,1.5)}
S.nr-=d;if(S.nr<=0){spawn();S.nr=Math.max(12,16+Math.random()*10-Math.min(8,S.dist*.0016))}
const jh=S.jet>0?1:(S.jt>0?4*(S.jt/(S.snk?.85:.62))*(1-S.jt/(S.snk?.85:.62)):0);S.jh=jh;
for(const o of S.obs){o.z-=d+(o.sp||0)*dt;if(S.jet>0||S.dead||S.inv>0||S.gho>0||S.mot>0)continue;if(o.z<1&&o.z+o.len>-.4&&Math.abs(S.px-o.l)<.55){if(o.t==="ba"&&jh>.35)continue;if(o.t==="hi"&&S.sl>0)continue;if(S.sh){S.sh=0;o.z=-99;bp(300,.2)}else{S.lv--;if(S.lv<=0){S.lv=0;over();return}S.inv=2;S.shk=.4;bp(150,.3);toast("La brigade Laabal se rapproche !");try{if(snd){tn(2400,2000,.22,"sine",.06,.1);tn(2400,2000,.3,"sine",.06,.4)}}catch(e){}}}}
for(const c of S.cn){c.z-=d;if(S.mag>0&&c.z<(S.mmg?40:16)&&c.z>0&&Math.abs(c.l-S.px)<(S.mmg?3.2:1.6)){c.l+=(S.px-c.l)*Math.min(1,dt*7);c.z-=14*dt}
if(!c.g&&c.z<1.4&&c.z>-.6&&Math.abs(c.l-S.px)<.6&&Math.abs((c.h||0)-jh)<1.4){c.g=1;S.rcf+=(S.cmul||1)*(S.dbl?2:1);S.rc=Math.floor(S.rcf);S.pop.push({t:0,dx:(Math.random()-.5)*30});bp(900+S.rc%5*60,.05,.07)}}
S.obs=S.obs.filter(o=>o.z+o.len>-3);S.cn=S.cn.filter(c=>!c.g&&c.z>-3)}
function rr(a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function plr(cx,gb,sc){const c=CH.find(k=>k.id===D.sel)||CH[0],sl=S.sl>0,run=S.jt<=0&&S.jet<=0,air=S.jt>0||S.jet>0,ph=S.t*13,jp=(S.jh||0)*(S.snk?55:42)*sc,fy=gb-4-jp;
x.fillStyle="rgba(0,0,0,.35)";x.beginPath();x.ellipse(cx,gb-2,(24-jp*.12)*sc,7*sc,0,0,7);x.fill();
if(S.jet>0){x.fillStyle="#fcc419";x.beginPath();x.moveTo(cx-10*sc,fy);x.lineTo(cx+10*sc,fy);x.lineTo(cx,fy+40*sc+Math.random()*14);x.fill()}
if(run){for(let i=0;i<3;i++){x.fillStyle="rgba(235,205,150,"+(.15+Math.random()*.15)+")";x.beginPath();x.arc(cx+(Math.random()-.5)*34*sc,gb-3*sc,(3+Math.random()*6)*sc,0,7);x.fill()}}
const bob=run&&!sl?Math.abs(Math.sin(ph))*6*sc:0,TH=108*sc,hip=-58*sc;
x.save();x.translate(cx,fy);x.rotate((S.lane-S.px)*.2+(run?Math.sin(ph)*.045:-.08)+(sl?.28:0));if(air)x.scale(1.04,1.04);if(sl)x.scale(1.12,.55);x.lineCap="round";
for(const k of[0,1]){const sd=k?1:-1,sn=Math.sin(ph+k*Math.PI),lf=air?.85:Math.max(0,sn),hx=sd*9*sc,fx=sd*(11+lf*3)*sc,fyy=hip+(58-lf*26)*sc-(air?6*sc:0);
x.strokeStyle=c.pn;x.lineWidth=17*sc;x.beginPath();x.moveTo(hx,hip);x.lineTo(fx,fyy);x.stroke();
x.strokeStyle="rgba(255,255,255,.16)";x.lineWidth=5*sc;x.beginPath();x.moveTo(hx-3*sc,hip);x.lineTo(fx-3*sc,fyy);x.stroke();
x.fillStyle=c.sh;x.beginPath();x.ellipse(fx,fyy+3*sc,11*sc,6.5*sc,0,0,7);x.fill();x.fillStyle="#f8f9fa";x.beginPath();x.ellipse(fx,fyy+7*sc,11*sc,3*sc,0,0,7);x.fill()}
let tw=50*sc;const top0=hip-TH+8*sc-bob;
if(c.hd==="spr"){if(spr.complete&&spr.naturalWidth){const iw=spr.naturalWidth,ih=spr.naturalHeight,sw=.62*iw,sh=.585*ih;tw=TH*sw/sh;x.drawImage(spr,.19*iw,0,sw,sh,-tw/2,top0,tw,TH)}}
else{const y0=top0+TH*.34,hh=(hip+8*sc-bob)-y0,hy=top0+TH*.2,hr=16*sc,cir=(a,b,r)=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()};
x.fillStyle=c.jk;rr(-tw/2,y0,tw,hh,9*sc);x.fill();x.fillStyle="rgba(0,0,0,.18)";rr(-tw/2,y0,tw*.2,hh,9*sc);x.fill();
x.fillStyle=c.bp;rr(-tw*.36,y0+hh*.1,tw*.72,hh*.62,7*sc);x.fill();x.fillStyle="rgba(0,0,0,.22)";rr(-tw*.28,y0+hh*.38,tw*.56,hh*.28,4*sc);x.fill();x.fillStyle="#ffd43b";cir(0,y0+hh*.3,4.5*sc);
x.fillStyle=c.sk;x.fillRect(-5*sc,y0-8*sc,10*sc,12*sc);cir(-hr,hy+2*sc,3.5*sc);cir(hr,hy+2*sc,3.5*sc);cir(0,hy,hr);
if(c.hd==="braid"){x.fillStyle="#17120f";cir(0,hy,hr+1.5*sc);x.fillStyle=c.ac;x.fillRect(-hr*.95,hy-4*sc,hr*1.9,5*sc);x.strokeStyle="#17120f";x.lineWidth=6*sc;for(const s of[-1,1]){x.beginPath();x.moveTo(s*hr*.6,hy+hr*.5);x.lineTo(s*hr*1.05,y0+hh*.5);x.stroke();x.fillStyle=c.ac;cir(s*hr*1.05,y0+hh*.5,3.5*sc)}}
else if(c.hd==="curl"){x.fillStyle="#1a1410";cir(0,hy,hr+2*sc);for(let a=0;a<7;a++){const an=Math.PI+a/6*Math.PI;cir(Math.cos(an)*hr*1.05,hy+Math.sin(an)*hr*1.05,5.5*sc)}}
else if(c.hd==="bun"){x.fillStyle="#1a1410";cir(0,hy,hr+1.5*sc);cir(0,hy-hr-4*sc,8.5*sc);x.strokeStyle=c.ac;x.lineWidth=3.5*sc;x.beginPath();x.arc(0,hy-hr+1*sc,7*sc,0,Math.PI);x.stroke()}
else if(c.hd==="hood"){x.fillStyle="#1d2127";cir(0,hy,hr+3.5*sc);x.strokeStyle="#3a4048";x.lineWidth=2*sc;x.beginPath();x.moveTo(0,hy-hr-2*sc);x.lineTo(0,hy+hr);x.stroke();x.strokeStyle=c.ac;x.lineWidth=2.5*sc;x.beginPath();x.arc(0,hy,hr+3.5*sc,Math.PI*1.15,Math.PI*1.85);x.stroke()}
else if(c.hd==="wrap"){x.fillStyle=c.ac;cir(0,hy,hr+2*sc);x.lineWidth=3*sc;x.strokeStyle="#2f9e44";x.beginPath();x.arc(0,hy,hr*.62,Math.PI*1.05,Math.PI*1.95);x.stroke();x.strokeStyle="#ffd43b";x.beginPath();x.arc(0,hy,hr*.95,Math.PI*1.05,Math.PI*1.95);x.stroke();x.fillStyle=c.ac;cir(hr*.35,hy-hr-2*sc,7*sc);x.strokeStyle="#2f9e44";x.beginPath();x.arc(hr*.35,hy-hr-2*sc,7*sc,0,Math.PI);x.stroke()}}
for(const k of[0,1]){const sd=k?1:-1,a=air?-1:Math.sin(ph+k*Math.PI+Math.PI),sx=sd*tw*.44,sy=top0+TH*.5,hx=sx+sd*(8+Math.abs(a)*3)*sc,hy2=sy+(air?-6:26-a*13)*sc;
x.strokeStyle=c.hd==="spr"?(k?"#27406b":"#1f6b57"):c.jk;x.lineWidth=11*sc;x.beginPath();x.moveTo(sx,sy);x.lineTo(hx,hy2);x.stroke();
x.fillStyle=c.sk||"#8a5a33";x.beginPath();x.arc(hx,hy2+2*sc,5.5*sc,0,7);x.fill()}
x.restore();
if(S.sh){x.strokeStyle="#74c0fc";x.lineWidth=3;x.beginPath();x.arc(cx,fy-70*sc,64*sc,0,7);x.stroke()}
for(const q of S.pop){q.t+=.016;x.globalAlpha=Math.max(0,1-q.t/.6);x.fillStyle="#ffd43b";x.font="900 "+(18*sc)+"px sans-serif";x.textAlign="center";x.fillText("+1",cx+q.dx,fy-130*sc-q.t*70);x.globalAlpha=1}
S.pop=S.pop.filter(q=>q.t<.6)}
function draw2(){const sc=SCN(),hz=H*.32,gb=H-26,LW=W*.25,CX=W/2,K=.04,p=z=>1/(1+z*K),Y=q=>hz+(gb-hz)*q,LX=(l,q)=>CX+l*LW*q,P0=p(300),T=S.t,SO="source-over",LT="lighter",COL=["#EF2B2D","#FCD116","#009E49"],DBG=false;
const quad=(a,b,c,d,f)=>{x.fillStyle=f;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineTo(c[0],c[1]);x.lineTo(d[0],d[1]);x.fill()};
const wall=(l,z0,z1,lo,hi,f)=>{z0=Math.max(.3,z0);if(z1<=z0)return;const q0=p(z0),q1=p(z1),xa=LX(l,q0),xb=LX(l,q1),ya=Y(q0),yb=Y(q1);quad([xa,ya-lo*q0*sc],[xa,ya-hi*q0*sc],[xb,yb-hi*q1*sc],[xb,yb-lo*q1*sc],f)};
const flat=(l0,l1,z0,z1,h,f)=>{z0=Math.max(.3,z0);if(z1<=z0)return;const q0=p(z0),q1=p(z1),ya=Y(q0)-h*q0*sc,yb=Y(q1)-h*q1*sc;quad([LX(l0,q0),ya],[LX(l1,q0),ya],[LX(l1,q1),yb],[LX(l0,q1),yb],f)};
const face=(l0,l1,z,lo,hi,f)=>{z=Math.max(.3,z);const q=p(z),y=Y(q),a=LX(l0,q),b=LX(l1,q);x.fillStyle=f;x.fillRect(a,y-hi*q*sc,b-a,(hi-lo)*q*sc)};
x.save();if(S.shk>0){x.translate((Math.random()-.5)*10,(Math.random()-.5)*6);S.shk-=.02}
let g=x.createLinearGradient(0,0,0,hz);g.addColorStop(0,"#4aa3e6");g.addColorStop(1,"#fbe8b8");x.fillStyle=g;x.fillRect(-10,-10,W+20,hz+12);
if(bgI.complete&&bgI.naturalWidth){const iw=bgI.naturalWidth,sh_=.64*bgI.naturalHeight,k_=Math.max(W/iw,(hz+34)/sh_),sw_=W/k_,sh2=(hz+34)/k_;x.drawImage(bgI,(iw-sw_)/2,Math.max(0,sh_-sh2),sw_,sh2,0,0,W,hz+34)}
g=x.createLinearGradient(0,hz+30,0,H);g.addColorStop(0,"#c98f55");g.addColorStop(1,"#8f5a2e");x.fillStyle=g;x.fillRect(-10,hz+30,W+20,H-hz);
const pal=["#d9894a","#c9693f","#e0a65c","#b9744a","#d98d6a"],aw=["#2f6fb5","#3d9a55","#c94a3c"];
for(const sd of[-1,1]){const i0=Math.floor(S.dist/14);for(let i=i0+22;i>=i0;i--){const z=i*14-S.dist;if(z>300||z<-6)continue;const zn=Math.max(.3,z),zf=z+12,qn=p(zn),qf=p(zf),hh=(120+(i*37%80))*sc,c=pal[(i*3+(sd>0?2:0))%5],xi=LX(sd*4.2,qn),xo=LX(sd*7.5,qn),xif=LX(sd*4.2,qf),yb=Y(qn),yf=Y(qf),L=Math.min(xi,xo),Wd=Math.abs(xo-xi);
quad([xi,yb],[xi,yb-hh*qn],[xif,yf-hh*qf],[xif,yf],c);x.fillStyle="rgba(0,0,0,.28)";x.fill();
x.fillStyle=c;x.fillRect(L,yb-hh*qn,Wd,hh*qn);
for(let r=0;r<2;r++)for(let k=0;k<3;k++){x.fillStyle=(i+r+k)%4===0?"#ffe066":"#3b2a24";x.fillRect(L+(k*.3+.1)*Wd,yb-hh*qn+(r*.3+.18)*hh*qn,.16*Wd,.17*hh*qn)}
x.fillStyle=aw[i%3];x.fillRect(L,yb-hh*qn*.42,Wd,.1*hh*qn)}}
const car=(l,z0,z1,lift,h,c)=>{const dr=l<0?-1:1;flat(l,l+dr,z0,z1,lift+h,"#c4c9cf");wall(l,z0,z1,lift,lift+h,c);wall(l,z0,z1,lift+h*.3,lift+h*.42,"#d3322b");const n=5,dz=(z1-z0)/n;for(let k=0;k<n;k++)wall(l,z0+dz*(k+.18),z0+dz*(k+.82),lift+h*.5,lift+h*.86,"#1b3552")};
const train=(l,lift,h,spd,off)=>{const cl=15,per=16.5,sh=(S.dist*spd+off)%per;for(let z=-sh-per;z<300;z+=per)car(l,z,z+cl,lift,h,"#e6eaee")};
flat(2.3,3.7,.3,300,0,"#6d6a66");flat(2.55,2.62,.3,300,0,"#c9ccd0");flat(3.2,3.27,.3,300,0,"#c9ccd0");train(2.5,0,150,.45,0);
flat(-4.6,-2.4,.3,300,70,"#7a6a5a");wall(-2.4,.3,300,0,70,"#8b8e93");const o8=S.dist%8;for(let z=-o8;z<300;z+=8)wall(-2.4,z,z+1.3,0,70,"#6f7378");
flat(-3.3,-3.23,.3,300,70,"#c9ccd0");train(-3,70,100,.3,7);
g=x.createLinearGradient(0,hz,0,H);g.addColorStop(0,"#d3914f");g.addColorStop(1,"#b66f35");
quad([LX(-1.5,P0),Y(P0)],[LX(1.5,P0),Y(P0)],[LX(1.5,1.12),Y(1.12)],[LX(-1.5,1.12),Y(1.12)],g);
const o3=S.dist%3,r0=Math.floor(S.dist/3);
for(const sd of[-1,1]){quad([LX(sd*1.5,P0),Y(P0)],[LX(sd*2.2,P0),Y(P0)],[LX(sd*2.2,1.12),Y(1.12)],[LX(sd*1.5,1.12),Y(1.12)],"#8e9196");
for(let z=-o3,j=0;z<120;z+=3,j++){if(z<.3)continue;const q=p(z),y=Y(q),y2=Y(p(Math.max(.3,z-3))),jx=LX(sd*(1.5+((r0+j)%2?.25:.5)),q);x.strokeStyle="rgba(50,52,58,.55)";x.lineWidth=Math.max(.6,1.6*q*sc);x.beginPath();x.moveTo(LX(sd*1.5,q),y);x.lineTo(LX(sd*2.2,q),y);x.moveTo(jx,y);x.lineTo(jx,y2);x.stroke()}}
const o6=S.dist%6;for(const l of[-.5,.5])for(let z=-o6;z<200;z+=6)flat(l-.03,l+.03,z,z+2.5,0,"rgba(255,255,255,.5)");
g=x.createLinearGradient(0,hz-50,0,hz+90);g.addColorStop(0,"rgba(255,233,168,0)");g.addColorStop(.45,"rgba(255,233,168,.5)");g.addColorStop(1,"rgba(255,233,168,0)");x.fillStyle=g;x.fillRect(0,hz-50,W,140);
const it=[];S.obs.forEach(o=>it.push({z:o.z+o.len,k:"o",o}));S.cn.forEach(c=>it.push({z:c.z,k:"c",o:c}));it.push({z:0,k:"p"});it.sort((a,b)=>b.z-a.z);
for(const e of it){
if(e.k==="o"){const o=e.o,zb=Math.min(300,o.z+o.len);if(zb<0)continue;const zn=Math.max(.3,o.z),qn=p(zn),yn=Y(qn),xn=LX(o.l,qn),wl=.43,l0=o.l-wl,l1=o.l+wl,s=qn*sc;let hb=60,nm="Caisse";
if(o.t==="tr"||o.t==="bu"){const bus=o.t==="bu",h=bus?100:150;hb=h;nm=bus?"Bus":"Train";
if(o.l!==0){const ls=o.l+(o.l<0?1:-1)*wl;wall(ls,o.z,zb,0,h,bus?"#9d9677":"#a8241a");wall(ls,o.z,zb,h*.5,h*.85,"#1b3552")}
flat(l0,l1,o.z,zb,h,bus?"#bdb598":"#c9ced4");face(l0,l1,zn,0,h,bus?"#cfc7a8":"#dfe3e8");
if(bus){face(l0+.06,l1-.06,zn,h*.42,h*.9,"#2e4f5a");face(l0,l1,zn,0,h*.12,"#3a3a3a");face(l0+.1,l1-.1,zn,h*.9,h*.98,"#2f8f4a")}
else{face(l0+.07,l1-.07,zn,h*.55,h*.92,"#16336b");face(l0,l1,zn,h*.28,h*.42,"#d52b1e");face(l0,l1,zn,0,h*.12,"#222")}
x.fillStyle="#fff6a8";for(const sg of[-1,1]){x.beginPath();x.arc(xn+sg*wl*.62*LW*qn,yn-h*.2*s,Math.max(2,6*s),0,7);x.fill()}}
else if(o.t==="ba"){if(o.v){hb=100;nm="Personne";x.fillStyle="#2b3a5a";x.fillRect(xn-13*s,yn-44*s,11*s,44*s);x.fillRect(xn+2*s,yn-44*s,11*s,44*s);x.fillStyle="#c29a4b";x.fillRect(xn-17*s,yn-88*s,34*s,46*s);x.fillStyle="#6b4226";x.beginPath();x.arc(xn,yn-100*s,12*s,0,7);x.fill()}
else{const w=(LX(l1,qn)-LX(l0,qn))*.8,hh=58*s;flat(l0+.09,l1-.09,o.z,o.z+.8,58,"#c28f55");x.fillStyle="#a2713d";x.fillRect(xn-w/2,yn-hh,w,hh);x.strokeStyle="#5e3d1c";x.lineWidth=Math.max(1,2.5*s);x.strokeRect(xn-w/2,yn-hh,w,hh);x.beginPath();x.moveTo(xn-w/2,yn-hh);x.lineTo(xn+w/2,yn);x.moveTo(xn+w/2,yn-hh);x.lineTo(xn-w/2,yn);x.stroke()}}
else{hb=122;nm="Portique";const bw=.46*LW*qn,bh=122*s;x.fillStyle="#2b2f36";x.fillRect(xn-bw,yn-bh,7*s,bh);x.fillRect(xn+bw-7*s,yn-bh,7*s,bh);const by=yn-bh,th=26*s;x.fillStyle="#111827";x.fillRect(xn-bw,by,2*bw,th);for(let k=0;k<6;k++){x.fillStyle=COL[k%3];x.fillRect(xn-bw+k*bw/3,by+th*.2,bw/3-2*qn,th*.6)}x.globalCompositeOperation=LT;x.fillStyle="rgba(255,230,120,"+(.35+.25*Math.sin(T*8))+")";x.fillRect(xn-bw,by+th,2*bw,6*s);x.globalCompositeOperation=SO}
if(DBG){const hh2=hb*s,bw2=wl*LW*qn;x.strokeStyle=o.t==="ba"?"#ff5555":"#d6e84a";x.lineWidth=2;x.strokeRect(xn-bw2,yn-hh2,2*bw2,hh2);x.fillStyle="#fff";x.font="700 "+Math.max(9,12*s)+"px sans-serif";x.textAlign="center";x.fillText("AABB: "+nm+", "+Math.round(o.z*100),xn,yn-hh2-4)}}
else if(e.k==="c"){const c=e.o;if(c.z<-.5)continue;const q=p(Math.max(0,c.z)),cx=LX(c.l,q),cy=Y(q)-(26+(c.h||0)*60)*q*sc,r=12*q*sc,wr=Math.max(r*.25,Math.abs(Math.cos(T*6+c.z*.3))*r);
x.globalCompositeOperation=LT;x.fillStyle="rgba(255,200,60,.3)";x.beginPath();x.arc(cx,cy,r*1.7,0,7);x.fill();x.globalCompositeOperation=SO;
x.fillStyle="#c98a00";x.beginPath();x.ellipse(cx,cy,wr,r,0,0,7);x.fill();x.fillStyle="#ffd23f";x.beginPath();x.ellipse(cx,cy,wr*.84,r*.84,0,0,7);x.fill();
if(wr>r*.5&&r>5){x.fillStyle="#e0a000";x.font="900 "+(r*1.1)+"px sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText("\u2605",cx,cy+r*.05);x.textBaseline="alphabetic"}}
else{const cx=LX(S.px,1),jp=(S.jh||0)*(S.snk?55:42)*sc;
if(S.snk){x.globalCompositeOperation=LT;const rg=x.createRadialGradient(cx,gb,0,cx,gb,46*sc);rg.addColorStop(0,"rgba(60,255,120,.6)");rg.addColorStop(1,"rgba(60,255,120,0)");x.fillStyle=rg;x.fillRect(cx-50*sc,gb-50*sc,100*sc,100*sc);x.globalCompositeOperation=SO}
plr(cx,gb,sc);
if(S.sh){const dy=gb-66*sc-jp,rx=54*sc,ry=82*sc,dg=x.createRadialGradient(cx,dy,ry*.3,cx,dy,ry);dg.addColorStop(0,"rgba(120,200,255,.05)");dg.addColorStop(1,"rgba(120,200,255,.32)");x.fillStyle=dg;x.beginPath();x.ellipse(cx,dy,rx,ry,0,0,7);x.fill();x.strokeStyle="rgba(190,235,255,"+(.65+.15*Math.sin(T*6))+")";x.lineWidth=2.2*sc;x.stroke();x.strokeStyle="rgba(255,255,255,.55)";x.lineWidth=3*sc;x.beginPath();x.ellipse(cx,dy,rx*.78,ry*.78,0,Math.PI*1.15,Math.PI*1.45);x.stroke()}}}
g=x.createRadialGradient(CX,H*.55,H*.25,CX,H*.55,H*.8);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,10,30,.3)");x.fillStyle=g;x.fillRect(-10,-10,W+20,H+20);
x.restore();
const seg=f=>{let s="";for(let i=0;i<5;i++)s+='<i class="'+(i<f*5?"f":"")+'"></i>';return"<u>"+s+"</u>"};
$("#fs",R).textContent=String(Math.floor(S.score)).padStart(6,"0");$("#fm",R).textContent="x"+(S.mu||1);$("#fc",R).textContent=S.rc;if(S.lvs!==S.lv){S.lvs=S.lv;let h="";for(let i=0;i<5;i++)h+='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" fill="'+(i<S.lv?"#ff4d6d":"#3b2a3a")+'"/></svg>';$("#fv",R).innerHTML=h}
if(!$("#fl",R)){const d=document.createElement("div");d.id="fl";d.textContent="OUAGADOUGOU";d.style.cssText="position:absolute;left:14px;top:84px;background:rgba(18,24,36,.82);color:#fff;font:800 14px/1 sans-serif;letter-spacing:1.5px;padding:9px 14px;border-radius:12px;pointer-events:none;z-index:3";R.appendChild(d)}
const ch=(S.sh?'<span class="cp">'+IC.shd+"</span>":"")+(S.mag>0?'<span class="cp">'+IC.mag+seg(S.mag/20)+"</span>":"")+(S.jet>0?'<span class="cp">'+IC.jet+seg(S.jet/6)+"</span>":"")+(S.snk?'<span class="cp">'+IC.snk+'<small style="font:800 12px sans-serif;color:#fff;margin:0 6px">Super Sneakers</small>'+seg(1)+"</span>":"");
if(ch!==S.chs){S.chs=ch;$("#ch",R).innerHTML=ch}}

let AX=null;
function nz(du,fr,vol,q){const a=AX,n=a.sampleRate*du|0,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=a.createBufferSource();s.buffer=b;const fl=a.createBiquadFilter();fl.type="bandpass";fl.frequency.value=fr;fl.Q.value=q||1;const g=a.createGain();g.gain.value=vol;s.connect(fl);fl.connect(g);g.connect(a.destination);s.start()}
function tn(f,f2,du,ty,vol,t0){const a=AX,t=a.currentTime+(t0||0),o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+du);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+du);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+du+.02)}
function sfx(f,v){try{AX=AX||new(window.AudioContext||window.webkitAudioContext)();if(AX.state==="suspended")AX.resume();
if(f>=900){tn(1318,0,.09,"square",.05);tn(1760,0,.18,"square",.05,.07)}
else if(f===880){tn(523,0,.1,"triangle",.12);tn(784,0,.14,"triangle",.12,.09)}
else if(f===400){nz(.14,1800,.16,.8)}
else if(f===300&&v<.1){nz(.28,900,.18,.6);tn(300,110,.22,"sine",.08)}
else if(f===300){nz(.3,2500,.22,1);tn(900,200,.25,"sawtooth",.08)}
else if(f===600){tn(280,760,.22,"sine",.14);nz(.1,3000,.06,1)}
else if(f===150){nz(.55,300,.6,.5);tn(110,35,.5,"sawtooth",.22)}
else tn(f,0,.1,"triangle",v||.1)}catch(e){}}
const MU={on:false,cu:null,nx:null,xf:false,V:.5,XF:3};
function musInit(){if(MU.on)return;MU.on=true;
const C=["games/kora.mp3","games/Kora.mp3","games/musique.mp3","games/faso.mp3","games/song.mp3","games/run.mp3"];
const mk=u=>{const a=new Audio(u);a.preload="auto";a.volume=0;return a};
const pick=i=>{if(i>=C.length){try{toast("Aucune musique trouvée")}catch(e){}return}const a=mk(C[i]);let done=false;
a.addEventListener("error",()=>{if(!done){done=true;pick(i+1)}});
a.addEventListener("loadedmetadata",()=>{if(done)return;done=true;MU.cu=a;MU.nx=mk(C[i]);a.volume=MU.V;if(i>0){try{toast("games/kora.mp3 introuvable : musique par défaut")}catch(e){}}});
a.load()};
pick(0);
setInterval(()=>{const cu=MU.cu,nx=MU.nx;if(!cu)return;
const w=snd&&mode==="play"&&!paused&&S&&!S.dead&&A.on();
if(!w){if(!cu.paused)cu.pause();if(!nx.paused)nx.pause();return}
if(cu.paused)cu.play().catch(()=>{});if(MU.xf&&nx.paused)nx.play().catch(()=>{});
if(!MU.xf&&!cu.paused&&isFinite(cu.duration)&&cu.duration-cu.currentTime<MU.XF){MU.xf=true;nx.currentTime=0;nx.volume=0;nx.play().catch(()=>{})}
if(MU.xf){const st=MU.V/(MU.XF*10);cu.volume=Math.max(0,cu.volume-st);nx.volume=Math.min(MU.V,nx.volume+st);if(cu.volume<=.001||cu.ended){cu.pause();cu.currentTime=0;MU.cu=nx;MU.nx=cu;MU.xf=false}}
else if(cu.volume<MU.V)cu.volume=Math.min(MU.V,cu.volume+.05)},100)}
function audio3(){musInit()}
function zoneUpd(G){const dist=S.dist;
for(const b of G.BL){const a=((b.k*12-dist)%192+192)%192;b.m.position.z=-a+6;b.m.visible=zAt(dist+a)===0}
for(let z=1;z<G.ZP.length;z++)for(const b of G.ZP[z]){const a=((b.k*12-dist)%192+192)%192;b.m.position.z=-a+6;b.m.visible=b.on&&zAt(dist+a)===z}}
function envUpd(G){const zi=zAt(S.dist+60),Z=G.zcol[zi];
G.gd.material.color.lerp(Z.g,.05);G.rdM.color.lerp(Z.r,.05);G.cobM.color.lerp(Z.w,.05);G.zf.lerp(Z.f,.04);
G.gd.position.y+=((zi===2?-3.2:-.05)-G.gd.position.y)*.06;
const zr=zi===0||zi===4||zi===5;G.RS.forEach(m=>m.visible=zr);const br=zi===2||zAt(S.dist-20)===2;G.BRG.forEach(m=>m.visible=br)}
let G3=null;
function init3(){const LN=2.2;
const r=new THREE.WebGLRenderer({antialias:true});r.setPixelRatio(Math.min(devicePixelRatio||1,2));r.setSize(W,H);
r.setClearColor(0xf0d9b0,1);const c3=r.domElement;c3.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%";R.insertBefore(c3,cv);
const sc=new THREE.Scene();sc.fog=new THREE.Fog(0xf0d9b0,30,150);
const cam=new THREE.PerspectiveCamera(72,W/H,.1,320);
const hl=new THREE.HemisphereLight(0xfff4e0,0x8a6a4a,.72);sc.add(hl);const dl=new THREE.DirectionalLight(0xffe2b0,.6);dl.position.set(-10,22,12);sc.add(dl);
const cvt=(w,h,fn,rx,ry)=>{const c=document.createElement("canvas");c.width=w;c.height=h;fn(c.getContext("2d"));const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx||1,ry||1);return t};
sc.background=cvt(4,256,c=>{const g=c.createLinearGradient(0,0,0,256);g.addColorStop(0,"#2f7fd8");g.addColorStop(.5,"#8cc4ee");g.addColorStop(.82,"#ffe2a8");g.addColorStop(1,"#ffd196");c.fillStyle=g;c.fillRect(0,0,4,256)});const GB=new THREE.BoxGeometry(1,1,1),GC=new THREE.CylinderGeometry(.38,.38,.07,16),GS=new THREE.SphereGeometry(1,14,10);
const M=(c,e)=>new THREE.MeshLambertMaterial({color:c,emissive:e||0}),tx=(w,h,fn)=>new THREE.MeshLambertMaterial({map:cvt(w,h,fn)});
const bx=(w,h,d,m,px,py,pz,par)=>{const o=new THREE.Mesh(GB,m);o.scale.set(w,h,d);o.position.set(px,py,pz);if(par)par.add(o);return o};
const roadT=cvt(128,256,c=>{c.fillStyle="#c98a4b";c.fillRect(0,0,128,256);for(let i=0;i<500;i++){c.fillStyle=i%2?"rgba(90,55,25,.18)":"rgba(230,180,120,.2)";c.fillRect(Math.random()*128,Math.random()*256,2+Math.random()*3,2+Math.random()*3)}c.fillStyle="rgba(255,255,255,.55)";[43,85].forEach(u=>c.fillRect(u-1.5,0,3,100))},1,50);
const cobT=cvt(128,128,c=>{c.fillStyle="#9a9da2";c.fillRect(0,0,128,128);c.strokeStyle="#5d6066";c.lineWidth=3;for(let i=0;i<4;i++){c.strokeRect(((i%2)*16)-16,i*32,64,32);c.strokeRect(((i%2)*16)+48,i*32,64,32)}},1,222);
const rdM=new THREE.MeshLambertMaterial({map:roadT}),cobM=new THREE.MeshLambertMaterial({map:cobT});const rd=new THREE.Mesh(new THREE.PlaneGeometry(3*LN,400),rdM);rd.rotation.x=-Math.PI/2;rd.position.set(0,0,-150);sc.add(rd);
for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.PlaneGeometry(1.8,400),cobM);w.rotation.x=-Math.PI/2;w.position.set(s*(3.3+.9),.04,-150);sc.add(w)}
const gd=new THREE.Mesh(new THREE.PlaneGeometry(500,500),M(0xb07a45));gd.rotation.x=-Math.PI/2;gd.position.set(0,-.05,-150);sc.add(gd);
const WM=["#d9894a","#c9693f","#e0a65c","#b9744a","#d98d6a"].map((col,i)=>tx(128,128,c=>{c.fillStyle=col;c.fillRect(0,0,128,128);for(let a=0;a<2;a++)for(let k=0;k<3;k++){c.fillStyle=(a+k+i)%4==0?"#ffe066":"#3b2a24";c.fillRect(10+k*38,14+a*40,24,26)}c.fillStyle=["#2f6fb5","#3d9a55","#c94a3c"][i%3];c.fillRect(0,100,128,14)}));
const BL=[];for(const sd of[-1,1])for(let k=0;k<16;k++){const w=6+(k*5%4),h=7+(k*7%6);BL.push({k,m:bx(w,h,10,WM[(k+(sd>0?2:0))%5],sd*(15+w/2),h/2,0,sc)})}
const MC={},Mc=(c,e)=>{const k=c+"_"+(e||0);return MC[k]||(MC[k]=M(c,e))};
const ZP=[null,[],[],[],[],[]],zg=x=>{const g=new THREE.Group();g.position.set(x,0,0);g.visible=false;sc.add(g);return g};
const zwin=(c,col,rows,y0)=>{for(let a=0;a<rows;a++)for(let k=0;k<3;k++){c.fillStyle=col;c.fillRect(12+k*38,y0+a*34,24,22)}};
const SCHW=tx(128,128,c=>{c.fillStyle="#ffd24d";c.fillRect(0,0,128,128);zwin(c,"#2b5f9e",3,12);c.fillStyle="#2f6fb5";c.fillRect(0,112,128,16)});
const SCHS=tx(128,128,c=>{c.fillStyle="#ffd24d";c.fillRect(0,0,128,128);c.fillStyle="#fff";c.fillRect(8,8,112,30);c.fillStyle="#d52b1e";c.font="bold 22px sans-serif";c.textAlign="center";c.fillText("ÉCOLE",64,31);zwin(c,"#2b5f9e",2,50);c.fillStyle="#2f6fb5";c.fillRect(0,112,128,16)});
const HOSW=tx(128,128,c=>{c.fillStyle="#f4f6f8";c.fillRect(0,0,128,128);zwin(c,"#5aa9f0",3,12);c.fillStyle="#c9d1d6";c.fillRect(0,112,128,16)});
const HOSC=tx(128,128,c=>{c.fillStyle="#f4f6f8";c.fillRect(0,0,128,128);c.fillStyle="#e03131";c.fillRect(54,6,20,38);c.fillRect(45,15,38,20);zwin(c,"#5aa9f0",2,56);c.fillStyle="#c9d1d6";c.fillRect(0,112,128,16)});
const FLG=tx(96,64,c=>{c.fillStyle="#ef2b2d";c.fillRect(0,0,96,32);c.fillStyle="#009e49";c.fillRect(0,32,96,32);c.fillStyle="#fcd116";c.beginPath();c.arc(48,32,10,0,7);c.fill()});
for(const sd of[-1,1])for(let k=0;k<16;k++){
{const g=zg(sd*(8+(k*7+(sd>0?3:0))%9+(k%3)));const h=4+(k*5%4);bx(.8,h,.8,Mc(0x6b4423),0,h/2,0,g);const a=new THREE.Mesh(GS,Mc([0x1f6b2a,0x2b8a3e,0x237a33][k%3]));a.scale.set(2.6,2.2+(k%3)*.4,2.6);a.position.set(0,h+.6,0);g.add(a);if(k%2){const b=new THREE.Mesh(GS,Mc(0x2f9e44));b.scale.set(1.8,1.6,1.8);b.position.set(.5,h+2.3,0);g.add(b)}ZP[1].push({k,m:g,on:true})}
{const g=zg(sd*6.6);if(k%2===0){const pc=Mc(0xb0b6bd);bx(.7,12,.7,pc,0,6,0,g);bx(1.8,.45,.5,pc,-sd*.8,11.7,0,g);bx(.4,.4,.4,Mc(0xfff2a0,0xaa9a30),-sd*1.6,11.3,0,g);const cc=Mc(0xd0d5da);const c1=bx(.1,.1,16.3,cc,0,6,6,g);c1.rotation.x=.74;const c2=bx(.1,.1,16.3,cc,0,6,-6,g);c2.rotation.x=-.74}ZP[2].push({k,m:g,on:k%2===0})}
{const g=zg(sd*(15+(k*3%5)*3));const d=new THREE.Mesh(GS,Mc([0xe2b765,0xd9a94f,0xeac477][k%3]));d.scale.set(8+(k%4)*2.5,2.5+(k%3)*1.2,9);d.position.set(0,-.3,0);g.add(d);ZP[3].push({k,m:g,on:true})}
{const g=zg(sd*(7+(k%4)*1.2)),cg=Mc(0x2f8f4a);if(k%3===0){bx(.5,2.4,.5,cg,0,1.2,0,g);bx(.9,.3,.3,cg,.5,1.5,0,g);bx(.3,.9,.3,cg,.85,1.9,0,g);bx(.9,.3,.3,cg,-.5,1.2,0,g);bx(.3,.8,.3,cg,-.85,1.55,0,g)}ZP[3].push({k,m:g,on:k%3===0})}
{const g=zg(sd*19.5);bx(9,5.5,10,k%4===0?SCHS:SCHW,0,2.75,0,g);bx(9.4,.5,10.4,Mc(0x1c5aa8),0,5.7,0,g);ZP[4].push({k,m:g,on:true})}
{const g=zg(sd*10.5);if(k%4===2){bx(.15,8,.15,Mc(0xcccccc),0,4,0,g);bx(.05,1,1.7,new THREE.MeshLambertMaterial({map:FLG.map}),.1,7.4,.9,g)}ZP[4].push({k,m:g,on:k%4===2})}
{const g=zg(sd*20);const hh=10+(k*3%4)*2;bx(10,hh,11,k%3===0?HOSC:HOSW,0,hh/2,0,g);bx(10.4,.5,11.4,Mc(0xdee2e6),0,hh+.2,0,g);ZP[5].push({k,m:g,on:true})}
}
const BRG=[bx(.25,1.1,400,Mc(0x8d949b),5.35,.55,-150,sc),bx(.25,1.1,400,Mc(0x8d949b),-5.35,.55,-150,sc),bx(11,1.2,400,Mc(0x4a4f55),0,-.7,-150,sc)];BRG.forEach(m=>m.visible=false);
const top=M(0xc4c9cf);
const tSide=tx(256,96,c=>{c.fillStyle="#e8ecef";c.fillRect(0,0,256,96);c.fillStyle="#d3322b";c.fillRect(0,40,256,12);c.fillStyle="#009e49";c.fillRect(0,52,256,8);c.fillStyle="#1b3552";for(let k=0;k<5;k++)c.fillRect(10+k*50,10,36,24)});
const tFront=tx(128,128,c=>{c.fillStyle="#dfe3e8";c.fillRect(0,0,128,128);c.fillStyle="#16336b";c.fillRect(14,14,100,48);c.fillStyle="#d52b1e";c.fillRect(0,70,128,14);c.fillStyle="#222";c.fillRect(0,112,128,16);c.fillStyle="#fff6a8";[28,100].forEach(u=>{c.beginPath();c.arc(u,98,8,0,7);c.fill()})});
const bSide=tx(256,96,c=>{c.fillStyle="#cfc7a8";c.fillRect(0,0,256,96);c.fillStyle="#2e4f5a";for(let k=0;k<5;k++)c.fillRect(8+k*49,12,43,32);c.fillStyle="#2f8f4a";c.fillRect(0,58,256,8);c.fillStyle="#3a3a3a";c.fillRect(0,86,256,10)});
const bFront=tx(128,128,c=>{c.fillStyle="#cfc7a8";c.fillRect(0,0,128,128);c.fillStyle="#2e4f5a";c.fillRect(10,22,108,56);c.fillStyle="#2f8f4a";c.fillRect(32,4,64,14);c.fillStyle="#3a3a3a";c.fillRect(0,108,128,20);c.fillStyle="#fff6a8";[22,106].forEach(u=>{c.beginPath();c.arc(u,94,8,0,7);c.fill()})});
const TM=[tSide,tSide,top,top,tFront,tFront],BM=[bSide,bSide,top,top,bFront,bFront];
const CM=tx(64,64,c=>{c.fillStyle="#a2713d";c.fillRect(0,0,64,64);c.strokeStyle="#5e3d1c";c.lineWidth=4;c.strokeRect(2,2,60,60);c.beginPath();c.moveTo(2,2);c.lineTo(62,62);c.moveTo(62,2);c.lineTo(2,62);c.stroke()});
const BEAM=tx(128,32,c=>{["#EF2B2D","#FCD116","#009E49"].forEach((cl,i)=>{c.fillStyle=cl;c.fillRect(i*43,0,43,32)})});
const CR=[];for(let j=0;j<12;j++){CR.push({j,sp:.45,off:0,m:bx(3,3.6,15,TM,7.4,2,0,sc)});CR.push({j,sp:.3,off:7,m:bx(3,3.2,15,TM,-9.5,4.8,0,sc)})}
const RS=[bx(5,.2,300,M(0x6d6a66),7.4,.1,-130,sc),bx(1,3,300,M(0x8b8e93),-5.8,1.5,-130,sc),bx(8,.4,300,M(0x7a6a5a),-9.5,3,-130,sc)];
const skin=M(0x6b4226),red=M(0xcc2b2b),jeans=M(0x274a8a),green=M(0x1f8f4a),yel=M(0xfcd116),shoeM=M(0xf2f2f2);
const P=new THREE.Group();
const legs=[-1,1].map(s=>{const g=new THREE.Group();g.position.set(s*.2,.95,0);bx(.3,.75,.32,jeans,0,-.4,0,g);bx(.34,.2,.5,shoeM,0,-.85,-.08,g);P.add(g);return g});
const arms=[-1,1].map(s=>{const g=new THREE.Group();g.position.set(s*.5,1.85,0);bx(.24,.7,.26,red,0,-.35,0,g);bx(.22,.22,.22,skin,0,-.78,0,g);P.add(g);return g});
bx(.75,.85,.42,red,0,1.45,0,P);bx(.5,.62,.26,green,0,1.5,.32,P);bx(.2,.2,.05,yel,0,1.55,.46,P);
const hd=new THREE.Mesh(GS,skin);hd.scale.set(.27,.3,.27);hd.position.set(0,2.2,0);P.add(hd);
const cap=new THREE.Mesh(new THREE.SphereGeometry(.3,12,8,0,Math.PI*2,0,Math.PI/2),red);cap.position.set(0,2.28,0);P.add(cap);const brim=bx(.4,.05,.3,red,0,2.3,-.28,P),cpb=bx(.2,.15,.04,green,0,2.36,.3,P);
const hrM=M(0x15100c),hair=new THREE.Mesh(new THREE.SphereGeometry(.3,12,8,0,Math.PI*2,0,Math.PI/2),hrM);hair.position.set(0,2.27,0);P.add(hair);const bun=new THREE.Mesh(GS,hrM);bun.scale.set(.13,.13,.13);bun.position.set(0,2.62,.05);P.add(bun);const br1=bx(.09,.5,.09,hrM,-.26,2,.12,P),br2=bx(.09,.5,.09,hrM,.26,2,.12,P);
const hood=new THREE.Mesh(new THREE.SphereGeometry(.34,12,8,0,Math.PI*2,0,Math.PI*.62),red);hood.position.set(0,2.24,.02);P.add(hood);const wrapM=M(0xf08c00),wrap=new THREE.Mesh(GS,wrapM);wrap.scale.set(.33,.17,.33);wrap.position.set(0,2.42,0);P.add(wrap);
P.scale.set(1.05,1.05,1.05);sc.add(P);
const sh=new THREE.Mesh(new THREE.CircleGeometry(.6,16),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.35}));sh.rotation.x=-Math.PI/2;sh.position.y=.06;sc.add(sh);
const sd=new THREE.Mesh(GS,new THREE.MeshBasicMaterial({color:0x66ccff,transparent:true,opacity:.28,depthWrite:false}));sd.scale.set(1.85,2.35,1.85);sc.add(sd);
const gl=new THREE.PointLight(0x33ff77,0,6);sc.add(gl);
const GOLD=M(0xffc933,0x6a4a00);const CL=[];for(let i=0;i<7;i++){const c=new THREE.Mesh(GS,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.85,fog:false}));c.scale.set(10+i*2,2.5,4);c.position.set(0,18+(i%3)*5,-140-(i%2)*30);sc.add(c);CL.push(c)}const sun=new THREE.Mesh(GS,new THREE.MeshBasicMaterial({color:0xfff2c0,fog:false}));sun.scale.set(7,7,7);sun.position.set(14,30,-190);sc.add(sun);
const ZSK=[null,{a:0x6b4a2b,b:0xc9a06a,h:3.2},{a:0x2b6cb0,b:0xffd43b,h:3.4},{a:0xd9a441,b:0xa05a1a,h:3},{a:0xf2c200,b:0x222222,h:2.8},{a:0xf8f9fa,b:0xe03131,h:3}];
const zsk=(o,g,L)=>{const z=o.zn|0;
if(o.t==="mv"){const c=[0xc92a2a,0x1971c2,0x2f9e44,0xf08c00][(o.l+1+z)%4];bx(1.5,.9,L,Mc(c),0,.6,0,g);bx(1.3,.7,L*.5,Mc(0x9fd3ff),0,1.3,0,g);bx(1.6,.15,L*1.02,Mc(0xffffff),0,.95,0,g);return true}
if(z>0&&(o.t==="tr"||o.t==="bu")){const q=ZSK[z],h=q.h;bx(1.9,h,L,Mc(q.a),0,h/2,0,g);bx(1.95,.4,L*1.01,Mc(q.b),0,h*.55,0,g);bx(1.6,.5,L*.25,Mc(0x203040),0,h+.25,L*.3,g);return true}
if(z>0&&o.t==="ba"&&!o.v){const q=[null,[1.7,.9,.8,0x6b4423],[1.6,1.1,.5,0xff7a00],[.7,1.5,.7,0x2f9e44],[1.5,1,.8,0x8b5a2b],[1.7,.8,.9,0xf1f3f5]][z];bx(q[0],q[1],q[2],Mc(q[3]),0,q[1]/2,0,g);if(z===3){bx(1.1,.3,.3,Mc(0x2f9e44),.5,.9,0,g);bx(.3,.7,.3,Mc(0x2f9e44),.9,1.1,0,g)}if(z===5)bx(.5,.15,.9,Mc(0xe03131),0,.85,0,g);return true}
return false};
const mk=o=>{const g=new THREE.Group(),L=o.len;
if(zsk(o,g,L)){}else if(o.t==="tr")bx(1.9,3.4,L,TM,0,1.7,0,g);else if(o.t==="bu")bx(1.9,2.8,L,BM,0,1.4,0,g);
else if(o.t==="ba"&&o.v){bx(.22,.9,.25,jeans,-.15,.45,0,g);bx(.22,.9,.25,jeans,.15,.45,0,g);bx(.6,.7,.3,M(0xc29a4b),0,1.25,0,g);const h=new THREE.Mesh(GS,skin);h.scale.set(.2,.22,.2);h.position.set(0,1.8,0);g.add(h);bx(.18,.6,.2,M(0xc29a4b),-.4,1.2,0,g);bx(.18,.6,.2,M(0xc29a4b),.4,1.2,0,g)}
else if(o.t==="ba")bx(1.5,1.3,1,CM,0,.65,0,g);
else{const pm=M(0x2b2f36);bx(.2,2.6,.3,pm,-.95,1.3,0,g);bx(.2,2.6,.3,pm,.95,1.3,0,g);bx(2.1,.55,.3,BEAM,0,2,0,g)}
g.position.set(o.l*LN,0,0);return g};
const mkCoin=()=>{const g=new THREE.Group(),d=new THREE.Mesh(GC,GOLD);d.rotation.x=Math.PI/2;g.add(d);return g};
const uni=M(0x1d3557),chem=M(0x5b8bd0),kep=M(0x14213d),bnd=M(0xfcd116),sk2=M(0x5a3820),blk=M(0x111111);
const mkAg=()=>{const g=new THREE.Group();
const lg=[-1,1].map(q=>{const t=new THREE.Group();t.position.set(q*.2,.95,0);bx(.3,.75,.32,uni,0,-.4,0,t);bx(.34,.2,.5,blk,0,-.85,-.08,t);g.add(t);return t});
const ar=[-1,1].map(q=>{const t=new THREE.Group();t.position.set(q*.5,1.85,0);bx(.24,.7,.26,chem,0,-.35,0,t);bx(.22,.22,.22,sk2,0,-.78,0,t);g.add(t);return t});
bx(.75,.85,.42,chem,0,1.45,0,g);bx(.78,.12,.44,bnd,0,1.2,0,g);bx(.78,.12,.44,bnd,0,1.62,0,g);bx(.8,.1,.44,blk,0,1.02,0,g);
const hh=new THREE.Mesh(GS,sk2);hh.scale.set(.27,.3,.27);hh.position.set(0,2.2,0);g.add(hh);
const kp=new THREE.Mesh(new THREE.SphereGeometry(.31,12,8,0,Math.PI*2,0,Math.PI/2),kep);kp.position.set(0,2.27,0);g.add(kp);bx(.42,.05,.3,kep,0,2.3,-.28,g);bx(.34,.07,.34,bnd,0,2.3,0,g);
g.scale.set(1.05,1.05,1.05);return{g,lg,ar,x:0}};
const AG=[0,1].map(()=>{const a=mkAg();a.g.visible=false;sc.add(a.g);return a});
const eyW=M(0xffffff),eyK=M(0x111111),mth=M(0x7a2a2a),gld=M(0xffc933,0x6a4a00),drk=M(0x1a1a1a);
[-1,1].forEach(q=>{const e=new THREE.Mesh(GS,eyW);e.scale.set(.055,.065,.03);e.position.set(q*.1,2.22,-.245);P.add(e);const p=new THREE.Mesh(GS,eyK);p.scale.set(.03,.04,.02);p.position.set(q*.1,2.22,-.262);P.add(p);const er=new THREE.Mesh(GS,skin);er.scale.set(.06,.08,.05);er.position.set(q*.27,2.2,0);P.add(er)});
bx(.1,.025,.02,mth,0,2.1,-.262,P);bx(.16,.14,.16,skin,0,1.98,0,P);bx(.78,.08,.44,M(0x2a1d14),0,1.05,0,P);bx(.77,.09,.44,wrapM,0,1.3,0,P);bx(.4,.07,.3,wrapM,0,1.9,-.02,P);
const exGl=[-1,1].map(q=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.07,.012,6,14),drk);r.position.set(q*.1,2.22,-.272);P.add(r);return r});exGl.push(bx(.06,.014,.014,drk,0,2.23,-.272,P));
const exEr=[-1,1].map(q=>{const g=new THREE.Mesh(GS,gld);g.scale.set(.035,.035,.035);g.position.set(q*.28,2.09,0);P.add(g);return g});
const exTi=[-1,1].map(q=>bx(.1,.06,.1,wrapM,q*.26,1.78,.12,P));
const exGa=bx(.32,.14,.3,wrapM,0,2.0,-.02,P),exSc=bx(.2,.65,.1,wrapM,.3,1.5,-.24,P);
const EX={gl:exGl,er:exEr,ti:exTi,ga:exGa,sc:exSc};
const TR=new THREE.Group(),tb=M(0x2b2f36),tc=M(0xa9b2bb),tp=M(0xf1f1f1),tk=M(0xc94a3c);
const bag=new THREE.Mesh(GS,tb);bag.scale.set(.32,.28,.3);bag.position.y=.2;TR.add(bag);bx(.12,.2,.12,tc,.3,.1,.1,TR);bx(.3,.03,.2,tp,-.3,.02,.15,TR);bx(.18,.14,.18,tk,.1,.07,-.25,TR);
TR.visible=false;sc.add(TR);
G3={ZP,gd,rdM,cobM,RS,BRG,zf:new THREE.Color(0xf0d9b0),zcol:ZN.map(z=>({g:new THREE.Color(z.g),r:new THREE.Color(z.r),w:new THREE.Color(z.w),f:new THREE.Color(z.f)})),hl,dl,sun,ex:EX,TR,AG,mats:{skin,red,jeans,green,shoeM},hr:{cap,brim,cpb,hair,bun,br1,br2,hood,wrap,wrapM},CL,r,c3,sc,cam,roadT,cobT,BL,CR,P,legs,arms,sh,sd,gl,shoeM,mk,mkCoin,om:new Map(),cm:new Map(),LN};audio3()}
function dbg(t){let f=$("#fl",R);if(!f){f=document.createElement("div");f.id="fl";f.style.cssText="position:absolute;left:14px;top:84px;background:rgba(18,24,36,.9);color:#fff;font:700 12px/1.3 sans-serif;padding:8px 10px;border-radius:10px;pointer-events:none;z-index:9;max-width:80%";R.appendChild(f)}f.textContent=t}
function draw(){try{return drawB()}catch(e){dbg("ERR "+(e&&e.message))}}
function drawB(){if(typeof THREE==="undefined"){dbg("THREE absent");return draw2()}
if(!G3)init3();else if(G3.c3.parentNode!==R)R.insertBefore(G3.c3,cv);
cv.style.background="transparent";cv.style.border="0";x.clearRect(-10,-10,W+20,H+20);
const G=G3,LN=G.LN,T=S.t,sc=G.sc,cam=G.cam,P=G.P,jh=S.jh||0,run=S.jt<=0&&S.jet<=0&&!S.dead,ph=T*13;
G.CL.forEach((c,i)=>{c.position.x=((i*14+T*2+50)%100)-50});G.roadT.offset.y=S.dist/8;G.cobT.offset.y=S.dist/1.8;
zoneUpd(G);envUpd(G);
for(const c of G.CR){const a=((c.j*16.5-S.dist*c.sp-c.off)%198+198)%198;c.m.position.z=-a+8;const zq=zAt(S.dist+a);c.m.visible=zq===0||zq===4||zq===5}
const lo=new Set();for(const o of S.obs){let m=G.om.get(o);if(!m){m=G.mk(o);G.om.set(o,m);sc.add(m)}m.position.z=-(o.z+o.len/2);lo.add(o)}
for(const[o,m]of G.om)if(!lo.has(o)){sc.remove(m);G.om.delete(o)}
const lc=new Set();for(const c of S.cn){let m=G.cm.get(c);if(!m){m=G.mkCoin();G.cm.set(c,m);sc.add(m)}m.position.set(c.l*LN,.95+(c.h||0)*1.6,-c.z);m.rotation.y=T*5+c.z;lc.add(c)}
for(const[c,m]of G.cm)if(!lc.has(c)){sc.remove(m);G.cm.delete(c)}
const px=S.px*LN,py=jh*(S.snk?2.8:2.2);P.position.set(px,py,0);const cc=CH.find(k=>k.id===D.sel)||CH[0];if(G.sel!==cc.id){G.sel=cc.id;const m=G.mats,h=G.hr,t=cc.hd;m.red.color.set(cc.jk);m.jeans.color.set(cc.pn);m.shoeM.color.set(cc.sh);m.green.color.set(cc.bp);m.skin.color.set(cc.sk);h.wrapM.color.set(cc.ac);h.cap.visible=h.brim.visible=h.cpb.visible=t==="spr";h.hair.visible=t==="braid"||t==="curl"||t==="bun";h.bun.visible=t==="bun";h.br1.visible=h.br2.visible=t==="braid";h.hood.visible=t==="hood";h.wrap.visible=t==="wrap";const X=G.ex;X.gl.forEach(v=>v.visible=cc.id==="issa");X.er.forEach(v=>v.visible=t==="bun"||t==="braid");X.ti.forEach(v=>v.visible=t==="braid");X.ga.visible=t==="hood";X.sc.visible=t==="wrap";const k=t==="curl"?1.25:1;h.hair.scale.set(k,k,k)}
P.visible=S.inv>0?Math.floor(S.t*14)%2===0:true;P.rotation.z=(S.px-S.lane)*.35;P.scale.set(1.05,S.sl>0?.62:1.05,1.05);
G.legs[0].rotation.x=run?Math.sin(ph)*.9:.5;G.legs[1].rotation.x=run?-Math.sin(ph)*.9:-.4;G.arms[0].rotation.x=run?-Math.sin(ph)*.8:-1;G.arms[1].rotation.x=run?Math.sin(ph)*.8:-1;
if(S.intro>0){const it=S.it,rn=it>3.2,w=Math.sin(it*13);
G.legs[0].rotation.x=rn?w*.9:0;G.legs[1].rotation.x=rn?-w*.9:0;G.arms[0].rotation.x=rn?-w*.8:.15;
G.arms[1].rotation.x=it<.9?.1:it<1.4?.1+(it-.9)/.5*(-2.4):it<1.6?-2.3+(it-1.4)/.2*3.6:(rn?w*.8:1.3-Math.min(1,(it-1.6)/.8)*1.1);
P.position.y=rn?Math.abs(w)*.1:0;P.rotation.x=rn?-.14:0;P.rotation.y=0}
else{P.position.y+=run?Math.abs(Math.sin(ph))*.09:0;P.rotation.x=run?-.14:(S.jt>0||S.jet>0?-.08:0);P.rotation.y=run?Math.sin(ph)*.14:0;
const H2=G.hr;H2.br1.rotation.x=run?Math.sin(ph-.9)*.3:.15;H2.br2.rotation.x=run?Math.sin(ph-1.3)*.3:.15;H2.bun.position.y=2.62+(run?Math.abs(Math.sin(ph))*.05:0);G.ex.sc.rotation.z=run?Math.sin(ph)*.1:0}
{const it=S.intro>0?S.it:99,T2=G.TR;
if(it<1.55)T2.visible=false;
else if(it<2.3){const u=(it-1.55)/.75;T2.visible=true;T2.position.set(px+.5-.05*u,1.9*(1-u)+.12*u+Math.sin(Math.PI*u)*1.6,-.4-2.2*u);T2.rotation.set(u*9,u*6,0)}
else{const zz=-2.6+S.dist;T2.visible=zz<10;T2.rotation.set(0,.6,0);T2.position.set(.45,0,zz)}}
G.sh.position.x=px;G.sh.scale.set(.6-jh*.15,.6-jh*.15,.6-jh*.15);G.sd.visible=!!(S.sh||S.gho>0||S.mot>0);G.sd.position.set(px,py+1.6,0);
G.shoeM.emissive.setHex(S.snk?0x18c040:0);G.gl.intensity=S.snk?1.6:0;G.gl.position.set(px,.3,0);
if(S.intro>0){const u=Math.max(0,Math.min(1,(S.it-3.2)/2)),e=u*u*(3-2*u),k=Math.min(S.it,3.2)/3.2;cam.position.set(-2.2*(1-e),1.5+3.5*e,(-5.5+k)*(1-e)+8.2*e);cam.lookAt(0,1.5*(1-e)+e,1.5*(1-e)-14*e)}
else{cam.position.set(S.px*LN*.55+(S.shk>0?(Math.random()-.5)*.4:0),5,8.2);if(S.shk>0)S.shk-=.02;cam.lookAt(S.px*LN*.4,1,-14)}
if(S.bz===undefined)S.bz=9;const zt=4-(4-S.lv)*.8,ii=S.intro>0,ia=ii?S.it:99;if(!ii)S.bz+=(zt-S.bz)*.07;
G.AG.forEach((a,i)=>{const ph2=ph*.95+i*2;a.g.visible=ii?ia>=2.4:S.bz<6;
if(ii){const rn=ia>3.2,zz=3.6+Math.max(0,ia-3.2)*.6;S.bz=zz;a.x=px+(i?1.1:-1.1);a.g.position.set(a.x,rn?Math.abs(Math.sin(ia*12+i*2))*.12:0,zz+(i?.7:0));a.lg[0].rotation.x=rn?Math.sin(ia*12+i*2)*.9:0;a.lg[1].rotation.x=rn?-Math.sin(ia*12+i*2)*.9:0;a.ar[0].rotation.x=1.5+Math.sin(ia*14)*.15;a.ar[1].rotation.x=rn?Math.sin(ia*12+i*2)*.8:.2;return}
const tg=px+(i?.8:-.8);a.x+=(tg-a.x)*.1;a.g.position.set(a.x,Math.abs(Math.sin(ph2))*.12,S.bz+(i?.7:0));a.lg[0].rotation.x=Math.sin(ph2)*.9;a.lg[1].rotation.x=-Math.sin(ph2)*.9;a.ar[0].rotation.x=1.4;a.ar[1].rotation.x=Math.sin(ph2)*.8});
{const PL=G.pal||(G.pal=[["#2f7fd8","#8cc4ee","#ffe2a8","#ffd196","#f0d9b0","#fff4e0",.72,"#ffe2b0",.6,"#fff2c0",30],["#3a3f8f","#d9708a","#ffb36b","#ffcf8a","#e8a878","#ffd0a0",.6,"#ff9a60",.55,"#ffb070",16],["#0c1433","#243a7a","#7a5a8a","#c98a7a","#4a4468","#7080b0",.45,"#8090d0",.3,"#c07a6a",8]].map(a=>a.map(v=>typeof v==="string"?new THREE.Color(v):v)));
const tmp=G.tmp||(G.tmp=[0,1,2,3].map(()=>new THREE.Color())),p3=(S.dist%2000)/2000,kk=p3<.3?0:p3<.45?(p3-.3)/.15:p3<.6?1+(p3-.45)/.15:p3<.8?2:2+(p3-.8)/.2,i0=Math.min(2,Math.floor(kk)),f0=kk-i0,A=PL[i0],B=PL[(i0+1)%3];
for(let j=0;j<4;j++)tmp[j].copy(A[j]).lerp(B[j],f0);
sc.fog.color.copy(A[4]).lerp(B[4],f0).lerp(G.zf,.35);G.hl.color.copy(A[5]).lerp(B[5],f0);G.hl.intensity=A[6]+(B[6]-A[6])*f0;G.dl.color.copy(A[7]).lerp(B[7],f0);G.dl.intensity=A[8]+(B[8]-A[8])*f0;G.sun.material.color.copy(A[9]).lerp(B[9],f0);G.sun.position.y=A[10]+(B[10]-A[10])*f0;
const q=Math.floor(S.dist/6);if(G.skq!==q){G.skq=q;const cx=sc.background.image.getContext("2d"),g=cx.createLinearGradient(0,0,0,256);g.addColorStop(0,"#"+tmp[0].getHexString());g.addColorStop(.5,"#"+tmp[1].getHexString());g.addColorStop(.82,"#"+tmp[2].getHexString());g.addColorStop(1,"#"+tmp[3].getHexString());cx.fillStyle=g;cx.fillRect(0,0,4,256);sc.background.needsUpdate=true}}
{const c=Math.max(0,Math.min(1,(5.6-S.bz)/3.6)),on=snd&&AX&&S.intro<=0&&!paused&&!S.dead&&mode==="play";
if(on&&!G.sir){const o=AX.createOscillator(),g=AX.createGain(),fl=AX.createBiquadFilter();o.type="triangle";fl.type="lowpass";fl.frequency.value=1800;g.gain.value=0;o.connect(fl);fl.connect(g);g.connect(AX.destination);o.start();G.sir={o,g}}
if(G.sir){G.sir.g.gain.setTargetAtTime(on?.05*c:0,AX.currentTime,.15);G.sir.o.frequency.setTargetAtTime(Math.floor(S.t*2.2)%2?960:720,AX.currentTime,.02)}
const el=$("#sir",R);if(el){const fl2=Math.floor(S.t*4)%2;if(S.sf!==fl2){S.sf=fl2;el.style.background="radial-gradient(ellipse at center,transparent 50%,"+(fl2?"rgba(255,40,40,.6)":"rgba(40,90,255,.6)")+")"}el.style.opacity=S.intro>0?0:c*.9}}
G.r.render(sc,cam);G.dbg="r"+THREE.REVISION+" gl"+G.c3.width+"x"+G.c3.height+" css"+G.c3.clientWidth+"x"+G.c3.clientHeight+" cv"+cv.clientWidth+"x"+cv.clientHeight+" R"+R.clientWidth+"x"+R.clientHeight+" err"+G.r.getContext().getError();
const seg=f=>{let s="";for(let i=0;i<5;i++)s+='<i class="'+(i<f*5?"f":"")+'"></i>';return"<u>"+s+"</u>"};
$("#fs",R).textContent=String(Math.floor(S.score)).padStart(6,"0");$("#fm",R).textContent="x"+(S.mu||1);$("#fc",R).textContent=S.rc;if(S.lvs!==S.lv){S.lvs=S.lv;let h="";for(let i=0;i<(S.lvm||5);i++)h+='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" fill="'+(i<S.lv?"#ff4d6d":"#3b2a3a")+'"/></svg>';$("#fv",R).innerHTML=h}
if(!$("#fl",R)){const d=document.createElement("div");d.id="fl";d.textContent="OUAGADOUGOU";d.style.cssText="position:absolute;left:14px;top:84px;background:rgba(18,24,36,.82);color:#fff;font:800 14px/1 sans-serif;letter-spacing:1.5px;padding:9px 14px;border-radius:12px;pointer-events:none;z-index:3";R.appendChild(d)}
$("#fl",R).textContent=ZN[zAt(S.dist)].n;$("#fl",R).style.maxWidth="80%";$("#fl",R).style.whiteSpace="normal";const ch=(S.gho>0?'<span class="cp">'+IC.gho+seg(S.gho/8)+"</span>":"")+(S.mot>0?'<span class="cp">'+IC.mot+seg(S.mot/10)+"</span>":"")+(S.slo>0?'<span class="cp">'+IC.slo+seg(S.slo/15)+"</span>":"")+(S.dbl?'<span class="cp">'+IC.dbl+"</span>":"")+(S.sh?'<span class="cp">'+IC.shd+"</span>":"")+(S.mag>0?'<span class="cp">'+IC.mag+seg(S.mag/(S.mmg?60:20))+"</span>":"")+(S.jet>0?'<span class="cp">'+IC.jet+seg(S.jet/6)+"</span>":"")+(S.snk?'<span class="cp">'+IC.snk+'<small style="font:800 12px sans-serif;color:#fff;margin:0 6px">Super Sneakers</small>'+seg(1)+"</span>":"");
if(ch!==S.chs){S.chs=ch;$("#ch",R).innerHTML=ch}}

function loop(ts){raf=requestAnimationFrame(loop);const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(mode!=="play"||!S)return;
if(!paused&&!S.dead&&!A.on())pause();
if(!paused&&!S.dead)upd(dt);if(cv&&cv.isConnected)draw()}
show("load");
};
renderHub();
})();

/* ===== XIA : ouverture high-tech + masqué dans les jeux ===== */
(function(){
const L=document.getElementById("aiLayer"),d=document.getElementById("dia"),win=document.getElementById("aiwin"),gl=document.getElementById("gameLayer");
if(!L||!d||!win||!window.AI)return;
const st=document.createElement("style");st.textContent=`
#dia.xon{animation:xon .75s ease-in-out}
@keyframes xon{0%{transform:scale(1) rotate(0)}40%{transform:scale(1.55) rotate(200deg);filter:drop-shadow(0 0 26px var(--ac)) brightness(1.7)}100%{transform:scale(1.1) rotate(360deg)}}
.xr{position:absolute;width:68px;height:68px;border:2px solid var(--ac);border-radius:50%;pointer-events:none;opacity:0;animation:xr 1.1s ease-out forwards}
@keyframes xr{0%{transform:scale(.6);opacity:.95}100%{transform:scale(5.5);opacity:0}}
#aiwin.xopen{animation:xo .6s cubic-bezier(.2,.9,.3,1)}
@keyframes xo{0%{clip-path:inset(100% 0 0 0);transform:translateY(30px)}100%{clip-path:inset(0);transform:none}}
#aiwin.xclose{animation:xc .26s ease-in forwards}
@keyframes xc{to{clip-path:inset(100% 0 0 0);opacity:0}}
.xboot{position:absolute;inset:0;z-index:6;background:rgba(4,9,8,.97);border-radius:24px 24px 0 0;font:700 14px/2 ui-monospace,monospace;color:var(--ac);padding:28px 24px;overflow:hidden;animation:xbo 1.25s forwards}
.xboot div{opacity:0;animation:xbl .2s forwards}
.xboot b{color:#fff}
@keyframes xbl{to{opacity:1}}
@keyframes xbo{0%,82%{opacity:1}100%{opacity:0;visibility:hidden}}
.xscan{position:absolute;left:0;right:0;height:3px;top:0;background:linear-gradient(90deg,transparent,var(--ac),transparent);box-shadow:0 0 14px var(--ac);animation:xs 1s linear forwards}
@keyframes xs{from{top:0}to{top:100%}}
`;document.head.appendChild(st);
let AC=null;
function ac(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume()}catch(e){}return AC}
function tone(f,t0,du,type,vol,f2){const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+t0;o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+du);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+du);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+du+.05)}
const who=()=>localStorage.getItem("aiwho")||"x";
function sfxOpen(){if(who()==="x"){tone(300,0,.55,"sine",.08,2000);[523,659,784,1047,1568].forEach((f,i)=>tone(f,.1+i*.07,.3,"triangle",.11))}else{tone(70,0,.75,"sawtooth",.08,320);tone(110,.12,.5,"square",.05,440);[196,294,392].forEach((f,i)=>tone(f,.5+i*.1,.3,"triangle",.1))}}
function sfxClose(){tone(who()==="x"?1300:320,0,.26,"triangle",.1,who()==="x"?380:90)}
function rings(n){const cx=(parseFloat(d.style.left)||0)+34,cy=(parseFloat(d.style.top)||0)+34;for(let i=0;i<n;i++){const r=document.createElement("div");r.className="xr";r.style.left=(cx-34)+"px";r.style.top=(cy-34)+"px";r.style.animationDelay=(i*.16)+"s";L.appendChild(r);setTimeout(()=>r.remove(),1500+i*160)}}
function boot(){const nm=who()==="x"?"XIANIS":"NIX",b=document.createElement("div");b.className="xboot";b.innerHTML='<div class="xscan"></div>'+["<b>"+nm+"</b> // GAME-ZONE by CNS.corp","Noyau vocal ........... OK","Catalogue des jeux .... OK","Liaison Faso .......... OK","Prêt."].map((t,i)=>'<div style="animation-delay:'+(i*.17)+'s">&gt; '+t+"</div>").join("");win.appendChild(b);setTimeout(()=>b.remove(),1300)}
let busy=false;
function toggle(){if(busy)return;if(AI.isOpen()){busy=true;sfxClose();win.classList.add("xclose");setTimeout(()=>{win.classList.remove("xclose");AI.close();busy=false},270)}
else{busy=true;sfxOpen();rings(3);d.classList.add("xon");setTimeout(()=>{d.classList.remove("xon");AI.open();win.classList.remove("xopen");void win.offsetWidth;win.classList.add("xopen");boot();busy=false},720)}}
let dr=null;
d.onpointerdown=e=>{ac();dr={sx:e.clientX,sy:e.clientY,ox:parseFloat(d.style.left)||0,oy:parseFloat(d.style.top)||0,m:false};try{d.setPointerCapture(e.pointerId)}catch(_){}};
d.onpointermove=e=>{if(!dr)return;const dx=e.clientX-dr.sx,dy=e.clientY-dr.sy;if(Math.abs(dx)+Math.abs(dy)>8)dr.m=true;if(dr.m){const a=Math.min(Math.max(0,dr.ox+dx),innerWidth-70),b=Math.min(Math.max(0,dr.oy+dy),innerHeight-70);d.style.left=a+"px";d.style.top=b+"px";dr.p={x:a,y:b}}};
d.onpointerup=()=>{if(!dr)return;if(dr.m){if(dr.p)localStorage.setItem("aipos",JSON.stringify(dr.p))}else toggle();dr=null};
const upd=()=>{const inG=!gl.classList.contains("hidden");d.style.display=inG?"none":"";if(inG&&AI.isOpen())AI.close()};
if(gl){new MutationObserver(upd).observe(gl,{attributes:true,attributeFilter:["class"]});upd()}
setInterval(()=>{if(!AI.isOpen()&&d.style.display!=="none"&&!busy)rings(1)},6000);
})();
