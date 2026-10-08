(function(){
let on=false;
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const fix=t=>t.replace(/['’`]/g,"").replace(/\b(xi|si|ci|cy|chi|ksi|csi|sci)\s?an\s?(is|ix|x|nis|nix|nics?|ice)\b/g,"xianis").replace(/\bn\s?(x|ix)\b/g,"nix").replace(/\bni\s(x|ks|cs|cks)\b/g,"nix");
const RE={x:/\b(xianis|xiannis|xyanis|sianis|zianis|chianis|kianis|sianise|cyanis|cyanix|cianis|ciannis|cyannis|siannis|sianix|xianix|scianis|sienna|siennes|sianice|cyanice|cyanisse|sianisse|xianise|chanis|xanis|sanis|zanis|tianis|cianice)\b/,n:/\b(nix|nixe|nics?|nicks?|niks?|nex|next|nyx|niques?|nikes?|knicks?|mix|mics?|nice|nisse?)\b/};
const dbg=t=>{};
function set(v){
if(!window.Android){AI.open();AI.say("L'écoute vocale marche dans l'application installée sur le téléphone.");return}
on=v;v?Android.start():Android.stop();
["ear","aimic"].forEach(i=>{const e=$("#"+i);e&&e.classList.toggle("on",on)})}

$("#aimic").onclick=()=>set(!on);
window.onHeard=function(txt){dbg("v6 F "+txt+" > "+fix(norm(txt))+(AI.speaking()?" [PARLE]":" [libre]"));
if(AI.speaking())return;
const t=fix(norm(txt));let k=null;
for(const q in RE)if(RE[q].test(t))k=q;
if(k){AI.who(k);AI.open();const rest=t.replace(RE[k],"").trim();
if(rest.length>1)AI.handle(rest);else AI.say(k=="x"?"Oui, je t'écoute.":"Je vous écoute.")}
else if(AI.isOpen())AI.handle(txt)};
window.onPartial=function(txt){dbg("v6 P "+txt+" > "+fix(norm(txt))+(AI.speaking()?" [PARLE]":" [libre]"));
if(AI.speaking())return;
const t=fix(norm(txt));let k=null;
for(const q in RE)if(RE[q].test(t))k=q;
if(!k)return;
if(t.replace(RE[k],"").trim().length>1)return;
AI.who(k);AI.open();AI.say(k=="x"?"Oui, je t'écoute.":"Je vous écoute.")};
setTimeout(function(){if(window.Android)set(true)},700);
let paused=false;
setInterval(function(){if(!window.Android)return;const g=$("#gameLayer"),open=g&&!g.classList.contains("hidden");
if(open&&on&&!paused){paused=true;Android.stop()}
else if(!open&&paused){paused=false;if(on)Android.start()}},800);
})();
