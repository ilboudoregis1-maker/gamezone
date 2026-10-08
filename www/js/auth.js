/*v6-valid*/(function(){
var SB='https://jbjeqxubpqqypysfsubd.supabase.co';
var KEY='sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR';
var K='fr_acct',mode='in',box,root,fab,busy=false,showPw=false;

function ld(){try{return JSON.parse(localStorage.getItem(K)||'null')}catch(e){return null}}
function sv(a){try{a?localStorage.setItem(K,JSON.stringify(a)):localStorage.removeItem(K)}catch(e){}}
function junk(d){return /^(\d)\1+$/.test(d)||'0123456789'.indexOf(d)>-1||'9876543210'.indexOf(d)>-1}
function okbf(d){return d.length==8&&/^(0[12567]|[67][0-9])/.test(d)&&!junk(d)}
function norm(id){id=String(id||'').trim();
  if(id.indexOf('@')>-1){id=id.toLowerCase();return /^[a-z0-9._%+\-]+@[a-z0-9\-]+(\.[a-z0-9\-]+)*\.[a-z]{2,}$/.test(id)?id:null}
  if(/[^0-9+\s.\-()]/.test(id))return null;
  var t=id.replace(/[\s.\-()]/g,''),intl=false,d;
  if(t.indexOf('+')==0){intl=true;d=t.slice(1).replace(/\D/g,'')}
  else if(t.indexOf('00')==0){intl=true;d=t.slice(2).replace(/\D/g,'')}
  else d=t.replace(/\D/g,'');
  if(intl){
    if(d.length<8||d.length>15||d.charAt(0)=='0'||junk(d))return null;
    if(d.indexOf('226')==0){var l=d.slice(3);return okbf(l)?'226'+l+'@gamezone.app':null}
    return d+'@gamezone.app'}
  if(d.length==11&&d.indexOf('226')==0){d=d.slice(3);return okbf(d)?'226'+d+'@gamezone.app':null}
  if(d.length==8)return okbf(d)?'226'+d+'@gamezone.app':null;
  if(d.charAt(0)=='0'&&d.length>=9&&d.length<=10&&!junk(d))return d+'@gamezone.app';
  return null}
function fr(j,s){var m=String(j.msg||j.error_description||j.message||'').toLowerCase(),c=j.error_code||'';
  if(c=='user_already_exists'||m.indexOf('already registered')>-1)return 'Ce compte existe déjà. Connecte-toi.';
  if(c=='invalid_credentials'||m.indexOf('invalid login')>-1)return 'Identifiant ou mot de passe incorrect.';
  if(c=='over_request_rate_limit'||c=='over_email_send_rate_limit'||s==429)return 'Trop de tentatives. Réessaie dans un moment.';
  if(c=='weak_password')return 'Mot de passe trop faible (6 caractères minimum).';
  if(m.indexOf('email')>-1&&m.indexOf('invalid')>-1)return 'Email ou numéro invalide.';
  return 'Erreur ('+(s||'?')+'). Réessaie.'}
function call(path,opt,tok){
  var ac=new AbortController();var tm=setTimeout(function(){ac.abort()},30000);
  var h={'apikey':KEY,'Content-Type':'application/json'};if(tok)h.Authorization='Bearer '+tok;
  return fetch(SB+path,{signal:ac.signal,method:opt.method||'POST',headers:h,body:opt.body?JSON.stringify(opt.body):undefined})
  .then(function(r){clearTimeout(tm);return r.text().then(function(t){var j={};try{j=JSON.parse(t)}catch(e){}
    if(!r.ok){var er=new Error(fr(j,r.status));er.status=r.status;throw er}return j})},
  function(e){clearTimeout(tm);throw new Error(e&&e.name=='AbortError'?'Le serveur ne répond pas. Réessaie.':'Connexion impossible. Vérifie ton réseau.')})}
function prof(a){return call('/rest/v1/profiles?select=name,code&id=eq.'+a.uid,{method:'GET'},a.token).then(function(r){var p=r&&r[0];if(!p)throw new Error('Profil introuvable.');return p})}
function refresh(a){return call('/auth/v1/token?grant_type=refresh_token',{body:{refresh_token:a.refresh}}).then(function(r){a.token=r.access_token;a.refresh=r.refresh_token;sv(a);return a})}
function sess(r,ident,fb){var a={token:r.access_token,refresh:r.refresh_token,uid:r.user.id,ident:ident,srv:SB};
  return prof(a).catch(function(){return{name:(r.user.user_metadata&&r.user.user_metadata.name)||fb||'Joueur',code:'------'}})
  .then(function(p){a.user={id:ident,name:p.name,code:p.code};return a})}

var ICON={
 user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
 lock:'<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
 tag:'<svg viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/></svg>',
 gift:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 13h18M12 8c-3 0-5-1-5-3s3-2.5 5 3c2-5.5 5-5 5-3s-2 3-5 3"/></svg>',
 eye:'<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
 eyeoff:'<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 3.9M6.6 6.6A17 17 0 0 0 2 12s4 7 10 7c1.6 0 3-.4 4.3-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
 out:'<svg viewBox="0 0 24 24"><path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9"/></svg>',
 share:'<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/></svg>',
 me:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8.2" r="3.7"/><path d="M4.8 20c.9-3.7 3.6-5.7 7.2-5.7s6.3 2 7.2 5.7"/></svg>',
 close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 play:'<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',
 pad:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="11" rx="4"/><path d="M8 10v5M5.5 12.5h5M15.5 11.5h.01M18 13.5h.01"/></svg>',
 copy:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6a2 2 0 012-2h9"/></svg>',
 check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
 refresh:'<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 10-2.3 5.7M20 5v6h-6"/></svg>'
};

var css='\
#au{position:fixed;inset:0;z-index:99;display:none;flex-direction:column;background:var(--bg);overflow:auto;-webkit-overflow-scrolling:touch}\
#au.on{display:flex}\
#au .fabric{z-index:0;opacity:.6}\
#au .stripe{position:relative;z-index:1;height:6px;flex:none;background:linear-gradient(90deg,var(--red) 33.3%,var(--yellow) 33.3% 66.6%,var(--green) 66.6%);margin-top:env(safe-area-inset-top)}\
#au .wrap{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;justify-content:center;width:100%;max-width:420px;margin:0 auto;padding:20px 22px calc(env(safe-area-inset-bottom) + 20px)}\
#au .hero{text-align:center;margin-bottom:22px}\
#au .hero img{width:84px;height:84px;border-radius:24px;box-shadow:0 10px 30px rgba(0,158,73,.35),0 0 0 2px rgba(252,209,22,.5);object-fit:cover}\
#au .hero h1{margin-top:14px;font-size:26px;font-weight:800;letter-spacing:4px}\
#au .hero p{margin-top:4px;color:var(--yellow);font-size:13px;letter-spacing:1px}\
#au .panel{background:rgba(20,26,22,.92);border:1px solid var(--line);border-radius:24px;padding:18px;backdrop-filter:blur(10px);box-shadow:0 20px 50px rgba(0,0,0,.45)}\
#au .seg{position:relative;display:grid;grid-template-columns:1fr 1fr;background:#0b0f0c;border:1px solid var(--line);border-radius:14px;padding:4px;margin-bottom:16px}\
#au .seg button{position:relative;z-index:1;border:0;background:none;color:var(--mute);font-weight:700;font-size:14px;padding:11px 0;border-radius:10px;transition:color .2s}\
#au .seg button.on{color:#000}\
#au .seg i{position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:10px;background:var(--yellow);transition:transform .25s cubic-bezier(.3,.9,.3,1)}\
#au .seg.up i{transform:translateX(100%)}\
#au .f{position:relative;margin-bottom:10px}\
#au .f svg.l{position:absolute;left:14px;top:50%;width:19px;height:19px;margin-top:-9.5px;stroke:var(--mute);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}\
#au .f input{width:100%;padding:15px 14px 15px 44px;border-radius:14px;border:1.5px solid var(--line);background:#0b0f0c;color:var(--text);font-size:16px;outline:0;transition:border-color .2s,box-shadow .2s}\
#au .f input::placeholder{color:#5f6d64}\
#au .f input:focus{border-color:var(--green);box-shadow:0 0 0 3px rgba(0,158,73,.2)}\
#au .f.bad input{border-color:var(--red)}\
#au .f .eye{position:absolute;right:4px;top:50%;margin-top:-20px;width:40px;height:40px;border:0;background:none;display:flex;align-items:center;justify-content:center}\
#au .f .eye svg{width:20px;height:20px;stroke:var(--mute);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\
#au .e{min-height:20px;margin:2px 2px 6px;color:#ff8a8a;font-size:13px}\
#au .go{width:100%;border:0;border-radius:14px;padding:15px;font-weight:800;font-size:16px;color:#fff;background:linear-gradient(135deg,#00b255,var(--green));box-shadow:0 8px 20px rgba(0,158,73,.35);display:flex;align-items:center;justify-content:center;gap:10px}\
#au .go:active{transform:scale(.98)}\
#au .go[disabled]{opacity:.7}\
#au .sp{width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.35);border-top-color:#fff;animation:auspin .7s linear infinite}\
@keyframes auspin{to{transform:rotate(360deg)}}\
#au .ghost{width:100%;margin-top:12px;border:0;background:none;color:var(--mute);font-size:14px;padding:10px}\
#au .sw{margin-top:14px;text-align:center;color:var(--mute);font-size:13px}\
#au .sw b{color:var(--yellow);font-weight:700}\
#au .who{text-align:center}\
#au .av{width:76px;height:76px;margin:0 auto 12px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#000;background:var(--yellow);box-shadow:0 0 0 4px rgba(252,209,22,.25)}\
#au .who h2{font-size:22px}\
#au .who p{color:var(--mute);font-size:13px;margin-top:3px;word-break:break-all}\
#au .code{margin:18px 0 6px;padding:14px;border:1.5px dashed var(--yellow);border-radius:16px}\
#au .code small{display:block;color:var(--mute);font-size:12px;margin-bottom:4px}\
#au .code b{font-size:22px;letter-spacing:4px;color:var(--yellow)}\
#au .btn2{width:100%;margin-top:10px;border:1px solid var(--line);border-radius:14px;padding:14px;font-weight:700;font-size:15px;color:var(--text);background:#18211b;display:flex;align-items:center;justify-content:center;gap:8px}\
#au .btn2 svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\
#au .btn2.r{color:#ff8a8a;border-color:rgba(239,43,45,.4);background:rgba(239,43,45,.08)}\
#au .btn2.g{background:var(--green);border-color:var(--green);color:#fff}\
#au .shake{animation:aushake .35s}@keyframes aushake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}\
';

var css2=`
#frb{position:relative;flex:none;width:42px;height:42px;margin-left:8px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:var(--yellow);border:1.6px solid transparent;
background:linear-gradient(#10150f,#10150f) padding-box,conic-gradient(from 210deg,var(--red),var(--yellow),var(--green),var(--red)) border-box;box-shadow:0 0 16px rgba(252,209,22,.22);transition:transform .15s,box-shadow .2s}
#frb:active{transform:scale(.92)}
#frb svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
#frb .dot{position:absolute;right:-1px;top:-1px;width:11px;height:11px;border-radius:50%;background:var(--green);border:2px solid var(--bg);display:none;box-shadow:0 0 8px var(--green)}
#frb.in .dot{display:block}
#au.sheet{background:rgba(2,5,4,.7);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);justify-content:flex-end;align-items:center;overflow:hidden}
#au.sheet .stripe,#au.sheet .fabric{display:none}
#au.sheet .wrap{flex:none;justify-content:flex-start;max-width:480px;max-height:94%;padding:0;margin:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;border-radius:30px 30px 0 0;
background:linear-gradient(180deg,#131b16,#0b0f0c 60%);border:1px solid rgba(255,255,255,.09);border-bottom:0;box-shadow:0 -24px 70px rgba(0,0,0,.65);animation:pfin .5s cubic-bezier(.2,.9,.2,1)}
@media (min-width:560px){#au.sheet{justify-content:center}#au.sheet .wrap{border-radius:30px;border-bottom:1px solid rgba(255,255,255,.09)}}
@keyframes pfin{from{transform:translateY(70px);opacity:0}}
@keyframes aurot{to{transform:rotate(360deg)}}
@keyframes pfup{from{opacity:0;transform:translateY(14px)}}
.pfh{position:relative;overflow:hidden;padding:10px 20px 54px;
background:radial-gradient(120% 140% at 12% 0%,rgba(0,158,73,.6),transparent 55%),radial-gradient(110% 120% at 100% 0%,rgba(239,43,45,.5),transparent 55%),radial-gradient(90% 100% at 50% 110%,rgba(252,209,22,.3),transparent 60%),#0d130f}
.pfh::before{content:"";position:absolute;left:-40%;top:-90%;width:180%;height:300%;background:conic-gradient(from 0deg,transparent,rgba(252,209,22,.16),transparent 28%,rgba(0,158,73,.16),transparent 58%);animation:aurot 16s linear infinite;pointer-events:none}
.pfh>*{position:relative}
.pfh .k-grab{width:44px;height:4px;border-radius:4px;background:rgba(255,255,255,.35);margin:2px auto 0}
.pfh .k-x{position:absolute;top:10px;right:12px;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(0,0,0,.35);color:#fff;display:flex;align-items:center;justify-content:center}
.pfh .k-x svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}
.k-avw{position:relative;width:108px;height:108px;margin:16px auto 0}
.k-avw .k-ring{position:absolute;left:0;top:0;width:100%;height:100%;animation:aurot 9s linear infinite;filter:drop-shadow(0 0 8px rgba(252,209,22,.5))}
#au .k-avw .av{position:absolute;left:10px;top:10px;right:10px;bottom:10px;width:auto;height:auto;margin:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800;color:var(--yellow);
background:radial-gradient(circle at 30% 22%,#22332a,#0a0e0b);box-shadow:inset 0 0 24px rgba(252,209,22,.18),0 10px 30px rgba(0,0,0,.5)}
.k-avw .k-lvb{position:absolute;right:-6px;bottom:0;min-width:36px;height:36px;padding:0 9px;border-radius:18px;background:var(--yellow);color:#000;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;border:3px solid #0d130f;box-shadow:0 4px 12px rgba(0,0,0,.5)}
.pfb{position:relative;padding:0 16px calc(env(safe-area-inset-bottom) + 18px);margin-top:-30px}
.pfb>*{animation:pfup .5s both}.pfb>*:nth-child(2){animation-delay:.05s}.pfb>*:nth-child(3){animation-delay:.1s}.pfb>*:nth-child(4){animation-delay:.15s}.pfb>*:nth-child(5){animation-delay:.2s}
.pfn{text-align:center;padding-top:34px}
.pfn h2{font-size:23px;font-weight:800;letter-spacing:.3px}
.pfn p{color:var(--mute);font-size:13px;margin-top:2px;word-break:break-all}
.k-ttl{display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:5px 12px 5px 9px;border-radius:20px;font-size:12px;font-weight:700;color:var(--yellow);background:rgba(252,209,22,.1);border:1px solid rgba(252,209,22,.35)}
.k-ttl svg{width:14px;height:14px;fill:var(--yellow);stroke:none}
.k-xp{margin-top:16px;padding:14px;border-radius:18px;background:rgba(255,255,255,.04);border:1px solid var(--line)}
.k-xp .k-xr{display:flex;justify-content:space-between;align-items:baseline;font-size:13px}.k-xp .k-xr span{color:var(--mute);font-size:12px}
.k-xp .k-bar{margin-top:10px;height:9px;border-radius:9px;background:rgba(255,255,255,.08);overflow:hidden}
.k-xp .k-bar i{display:block;height:100%;border-radius:9px;background:linear-gradient(90deg,var(--red),var(--yellow),var(--green));box-shadow:0 0 12px rgba(252,209,22,.5);transition:width .8s cubic-bezier(.2,.9,.2,1)}
.k-sg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
.k-sg .k-t{padding:12px 6px;text-align:center;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid var(--line)}
.k-sg .k-t svg{width:20px;height:20px;fill:none;stroke:var(--yellow);stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.k-sg .k-t b{display:block;margin-top:6px;font-size:16px}.k-sg .k-t small{display:block;color:var(--mute);font-size:11px;margin-top:2px}
.k-sh{margin:20px 2px 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--mute);font-weight:700}
.k-rl{display:flex;flex-direction:column;gap:8px}
.k-rw{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:16px;background:rgba(255,255,255,.035);border:1px solid var(--line)}
.k-rw.off{opacity:.5}
.k-rw .k-ri{flex:none;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--gc);background:color-mix(in srgb,var(--gc) 16%,transparent);border:1px solid color-mix(in srgb,var(--gc) 40%,transparent)}
.k-rw .k-ri svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.k-rw .k-rt{flex:1;min-width:0}.k-rw .k-rt b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.k-rw .k-rt small{display:block;color:var(--mute);font-size:11px;margin-top:1px}
.k-rw .k-rb{height:4px;border-radius:4px;background:rgba(255,255,255,.08);margin-top:6px;overflow:hidden}.k-rw .k-rb i{display:block;height:100%;border-radius:4px;background:var(--gc)}
.k-rw .k-rs{text-align:right}.k-rw .k-rs small{display:block;color:var(--mute);font-size:10px;letter-spacing:1px;text-transform:uppercase}.k-rw .k-rs b{font-size:18px;color:var(--yellow)}
.k-cd{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:18px;padding:14px 14px 14px 16px;border-radius:18px;border:1.5px dashed rgba(252,209,22,.7);background:rgba(252,209,22,.06)}
.k-cd small{display:block;color:var(--mute);font-size:12px;margin-bottom:4px}.k-cd b{font-size:22px;letter-spacing:4px;color:var(--yellow)}
.k-cd .k-cp{flex:none;width:44px;height:44px;border-radius:14px;border:1px solid rgba(252,209,22,.5);background:rgba(252,209,22,.12);color:var(--yellow);display:flex;align-items:center;justify-content:center}
.k-cd .k-cp svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.k-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media (max-height:640px){.pfh{padding-bottom:40px}.k-avw{width:84px;height:84px}#au .k-avw .av{font-size:32px}}
`;

function el(h){var d=document.createElement('div');d.innerHTML=h;return d.firstChild}
function $(s){return box.querySelector(s)}
function E(m){var e=$('.e');if(e)e.textContent=m||''}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function copy(t){try{var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove();return true}catch(e){return false}}
function field(id,icon,ph,type,extra){
  return '<div class="f" id="f'+id+'">'+ICON[icon].replace('<svg','<svg class="l"')
   +'<input id="'+id+'" type="'+(type||'text')+'" placeholder="'+ph+'" autocapitalize="none" autocomplete="off" '+(extra||'')+'>'
   +(id=='i2'?'<button type="button" class="eye" id="eye">'+(showPw?ICON.eyeoff:ICON.eye)+'</button>':'')+'</div>'}
function bad(id,msg){var f=$('#f'+id);f.classList.add('bad','shake');setTimeout(function(){f.classList.remove('shake')},400);E(msg);$('#'+id).focus()}

function stats(){
  var o={lvl:1,title:'Recrue',cur:0,need:1,pct:0,time:'0 s',plays:0,tried:0,n:0,rows:''};
  try{
    var GG=(typeof GAMES!=='undefined'?GAMES:[]),tp=0,tt=0,tr=0,mx=1;
    GG.forEach(function(g){var s=S.g(g.id);tp+=s.plays;tt+=s.time;if(s.plays>0)tr++;if(s.time>mx)mx=s.time});
    var lv=1+Math.floor(Math.sqrt(tp)),lo=(lv-1)*(lv-1),hi=lv*lv;
    o.lvl=lv;o.title=['Recrue','Joueur','Challenger','Expert','Maître du Faso','Légende'][Math.min(5,Math.floor((lv-1)/2))];
    o.cur=tp-lo;o.need=hi-lo;o.pct=Math.max(4,Math.round((tp-lo)/(hi-lo)*100));
    o.time=fm(tt);o.plays=tp;o.tried=tr;o.n=GG.length;
    o.rows=GG.map(function(g){var s=S.g(g.id);
      return '<div class="k-rw'+(s.plays?'':' off')+'" style="--gc:'+g.c[0]+'"><span class="k-ri">'+icon(g.i)+'</span><div class="k-rt"><b>'+esc(g.n)+'</b><small>'+(s.plays?s.plays+' partie'+(s.plays>1?'s':'')+' · '+fm(s.time):'Pas encore joué')+'</small><div class="k-rb"><i style="width:'+Math.round(s.time/mx*100)+'%"></i></div></div><div class="k-rs"><small>Record</small><b>'+s.best+'</b></div></div>'}).join('');
  }catch(e){}
  return o}
function tile(ic,v,l){return '<div class="k-t">'+ic+'<b>'+esc(v)+'</b><small>'+l+'</small></div>'}
function syncFab(){if(fab)fab.classList.toggle('in',!!ld())}

function draw(){
  var a=ld();root.classList.toggle('sheet',!!a);syncFab();
  if(!a){
    var up=mode=='up';
    box.innerHTML=
     '<div class="hero"><img src="logo.png" alt=""><h1>GAME-ZONE</h1><p>'+(up?'Rejoins la communauté':'Content de te revoir')+'</p></div>'
    +'<div class="panel">'
    +'<div class="seg'+(up?' up':'')+'"><i></i><button class="'+(up?'':'on')+'" id="m1">Connexion</button><button class="'+(up?'on':'')+'" id="m2">Inscription</button></div>'
    +field('i1','user','Email ou numéro +226','text','inputmode="email"')
    +(up?field('i3','tag','Pseudo','text','maxlength="20"'):'')
    +field('i2','lock','Mot de passe (6 caractères min)',showPw?'text':'password')
    +(up?field('i4','gift','Code d\'invitation (facultatif)','text'):'')
    +'<div class="e"></div>'
    +'<button class="go" id="go">'+(up?'Créer mon compte':'Se connecter')+'</button>'
    +'<div class="sw">'+(up?'Déjà un compte ? <b id="sw">Se connecter</b>':'Pas de compte ? <b id="sw">Créer un compte</b>')+'</div>'
    +'</div>'
    +'<button class="ghost" id="cl">Continuer sans compte</button>';
    var keep={};
    $('#m1').onclick=function(){mode='in';draw()};
    $('#m2').onclick=function(){mode='up';draw()};
    $('#sw').onclick=function(){mode=up?'in':'up';draw()};
    $('#cl').onclick=close;
    $('#eye').onclick=function(){var i=$('#i2'),v=i.value;showPw=!showPw;draw();$('#i2').value=v;$('#i2').focus()};
    box.querySelectorAll('input').forEach(function(i){
      i.oninput=function(){i.parentNode.classList.remove('bad');E('')};
      i.onkeydown=function(e){if(e.key=='Enter')$('#go').click()}});
    $('#go').onclick=function(){
      if(busy)return;
      var id=$('#i1').value.trim(),pass=$('#i2').value;
      if(!id)return bad('i1','Entre ton email ou ton numéro.');
      if(up&&!$('#i3').value.trim())return bad('i3','Choisis un pseudo.');
      if(pass.length<6)return bad('i2','Mot de passe : 6 caractères minimum.');
      var em=norm(id);if(!em)return bad('i1',id.indexOf('@')>-1?'Email invalide.':'Numéro invalide. Vérifie-le (avec +indicatif pour un numéro étranger, ex : +225…) ou entre un email.');
      var b={id:id,pass:pass};
      if(up){b.name=$('#i3').value.trim();b.ref=$('#i4').value.trim()}
      busy=true;var g=$('#go');g.disabled=true;g.innerHTML='<span class="sp"></span>'+(up?'Création…':'Connexion…');E('');
      (up?call('/auth/v1/signup',{body:{email:em,password:pass,data:{name:b.name,ref:b.ref}}}).then(function(r){if(!r.access_token)throw new Error('Inscription impossible : la confirmation email est encore activée.');return r})
        :call('/auth/v1/token?grant_type=password',{body:{email:em,password:pass}}))
      .then(function(r){return sess(r,id,b.name)}).then(function(a){busy=false;sv(a);draw()})
      .catch(function(e){
        busy=false;g.disabled=false;g.textContent=up?'Créer mon compte':'Se connecter';
        E(e.message);box.querySelector('.panel').classList.add('shake');
        setTimeout(function(){box.querySelector('.panel').classList.remove('shake')},400)})}
  }else{
    var u=a.user||{},st=stats(),ini=esc((u.name||'?').charAt(0).toUpperCase());
    box.innerHTML=
     '<div class="pf"><div class="pfh"><div class="k-grab"></div><button class="k-x" id="cl" aria-label="Fermer">'+ICON.close+'</button>'
    +'<div class="k-avw"><svg class="k-ring" viewBox="0 0 108 108"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EF2B2D"/><stop offset=".5" stop-color="#FCD116"/><stop offset="1" stop-color="#009E49"/></linearGradient></defs><circle cx="54" cy="54" r="50" fill="none" stroke="url(#rg)" stroke-width="4" stroke-linecap="round" stroke-dasharray="260 54"/></svg>'
    +'<div class="av">'+ini+'</div><span class="k-lvb">'+st.lvl+'</span></div></div>'
    +'<div class="pfb"><div class="pfn"><h2>'+esc(u.name)+'</h2><p>'+esc(u.id)+'</p><span class="k-ttl">'+ICON.star+st.title+'</span></div>'
    +'<div class="k-xp"><div class="k-xr"><b>Niveau '+st.lvl+'</b><span>'+st.cur+' / '+st.need+' parties</span></div><div class="k-bar"><i style="width:'+st.pct+'%"></i></div></div>'
    +'<div class="k-sg">'+tile(ICON.clock,st.time,'Temps de jeu')+tile(ICON.play,st.plays,'Parties')+tile(ICON.pad,st.tried+'/'+st.n,'Jeux testés')+'</div>'
    +'<h3 class="k-sh">Mes records</h3><div class="k-rl">'+st.rows+'</div>'
    +'<div class="k-cd"><div><small>Ton code d\'invitation</small><b>'+esc(u.code)+'</b></div><button class="k-cp" id="cp" aria-label="Copier le code">'+ICON.copy+'</button></div>'
    +'<div class="e"></div>'
    +'<button class="btn2 g" id="iv">'+ICON.share+'Inviter des amis</button>'
    +'<div class="k-two"><button class="btn2" id="rf">'+ICON.refresh+'Actualiser</button><button class="btn2 r" id="lo">'+ICON.out+'Déconnexion</button></div>'
    +'</div></div>';
    box.scrollTop=0;
    $('#cl').onclick=close;
    $('#lo').onclick=function(){sv(null);mode='in';draw()};
    $('#cp').onclick=function(){var b=$('#cp');copy(u.code);b.innerHTML=ICON.check;setTimeout(function(){if(b)b.innerHTML=ICON.copy},1400)};
    $('#rf').onclick=function(){prof(a).catch(function(e){if(e.status==401)return refresh(a).then(prof);throw e}).then(function(p){a.user.name=p.name;a.user.code=p.code;sv(a);draw()}).catch(function(e){E(e.message)})};
    $('#iv').onclick=function(){
      var m='Rejoins-moi sur Game-Zone ! Crée ton compte et entre mon code d\'invitation : '+u.code;
      if(navigator.share){navigator.share({text:m}).catch(function(){})}
      else{E(copy(m)?'Message copié : colle-le dans une discussion.':m)}}
  }}
function close(){root.classList.remove('on')}
function open(){draw();root.classList.add('on')}
function init(){
  var s=document.createElement('style');s.textContent=css+css2;document.head.appendChild(s);
  root=el('<div id="au"><div class="fabric"></div><div class="stripe"></div><div class="wrap"></div></div>');
  document.body.appendChild(root);box=root.querySelector('.wrap');
  fab=el('<button id="frb" aria-label="Profil">'+ICON.me+'<i class="dot"></i></button>');
  var top=document.querySelector('.top');(top||document.body).appendChild(fab);
  fab.onclick=open;root.addEventListener('click',function(e){if(e.target===root&&root.classList.contains('sheet'))close()});syncFab();window.AUTH={isOpen:function(){return root.classList.contains('on')},close:close};
  if(!ld())setTimeout(open,800)}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
