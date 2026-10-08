(function(){
var d=document.querySelector("#dia"),mic=document.querySelector("#aimic");
if(!d||!mic)return;
var tm=null,lp=false,sx=0,sy=0,tt=null;
var st=document.createElement("style");
st.textContent="#aitip{position:fixed;left:12px;right:12px;bottom:150px;max-width:340px;margin:0 auto;z-index:99999;background:#0a120d;border:1px solid #FCD116;border-radius:16px;padding:14px 16px;color:#f3f1e8;font:14px/1.45 sans-serif;box-shadow:0 8px 30px #000a}#aitip.off{display:none}#aitip b{display:block;font-size:15px;margin-bottom:6px}#aitip i{font-style:normal;color:#FCD116}#aitip button{display:block;margin:10px 0 0 auto;border:1px solid #009E49;background:rgba(0,158,73,0.200);color:#fff;border-radius:10px;padding:6px 16px}#dia.micoff{filter:grayscale(1) opacity(.55)}#dia.micon{filter:drop-shadow(0 0 8px var(--ac))}";
document.head.appendChild(st);
var tip=document.createElement("div");tip.id="aitip";tip.className="off";document.body.appendChild(tip);
function isOn(){return mic.classList.contains("on")}
function paint(){d.classList.toggle("micon",isOn());d.classList.toggle("micoff",!isOn())}
function hide(){tip.className="off"}
function info(){var on=isOn();return "<b>"+(on?"Micro activé":"Micro désactivé")+"</b>"+(on?"Je vous écoute en continu, mais je ne réponds que si vous m'appelez par mon nom, <i>Xianis</i> ou <i>Nix</i>, ou si vous me touchez pour ouvrir la discussion.":"Je n'écoute plus rien. Vous pouvez toujours me toucher et m'écrire.")+"<br><br><i>Appui long</i> sur moi : "+(on?"désactiver":"activer")+" le micro."}
function show(h,ms){tip.innerHTML=h+'<button id="aitipok">OK</button>';tip.className="";document.querySelector("#aitipok").onclick=hide;clearTimeout(tt);tt=setTimeout(hide,ms||9000)}
window.micLP=function(){if(navigator.vibrate)navigator.vibrate(40);mic.click();paint();show(info())};var od=d.onpointerdown,om=d.onpointermove,ou=d.onpointerup;
d.onpointerdown=function(e){lp=false;sx=e.clientX;sy=e.clientY;clearTimeout(tm);tm=setTimeout(function(){lp=true;if(navigator.vibrate)navigator.vibrate(40);},450);if(od)od(e)};
d.onpointermove=function(e){if(lp)return;if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>8)clearTimeout(tm);if(om)om(e)};
d.onpointerup=function(e){clearTimeout(tm);if(lp){lp=false;return}if(ou)ou(e)};
d.oncontextmenu=function(e){e.preventDefault()};
new MutationObserver(paint).observe(mic,{attributes:true,attributeFilter:["class"]});
setTimeout(paint,1500);
setTimeout(function(){try{if(!localStorage.getItem("aimictip")){localStorage.setItem("aimictip","1");show(info(),12000)}}catch(e){}},3000);
})();
(function(){
document.addEventListener("contextmenu",function(e){e.preventDefault()},true);
document.addEventListener("selectstart",function(e){var n=e.target&&e.target.nodeName;if(n!="INPUT"&&n!="TEXTAREA")e.preventDefault()},true);
})();
(function(){
var T=null,F=false,X=0,Y=0;
function hit(e){return e.target&&e.target.closest&&e.target.closest("#dia")}
document.addEventListener("pointerdown",function(e){if(!hit(e))return;F=false;X=e.clientX;Y=e.clientY;clearTimeout(T);T=setTimeout(function(){F=true;if(window.micLP)window.micLP()},450)},true);
document.addEventListener("pointermove",function(e){if(!T||F)return;if(Math.abs(e.clientX-X)+Math.abs(e.clientY-Y)>30){clearTimeout(T);T=null}},true);
document.addEventListener("pointerup",function(e){clearTimeout(T);T=null;if(F){F=false;e.stopImmediatePropagation();e.preventDefault()}},true);
})();
