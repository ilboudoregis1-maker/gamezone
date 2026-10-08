(function(){
var pk=function(a){return a[Math.floor(Math.random()*a.length)]};
var JK=["Pourquoi le chiffre 4 est stressé dans Game-0 ? Parce que tout le monde veut le faire baisser.","Quel est le comble pour un joueur de Tam-Tam ? Avoir le rythme dans la peau et rater la note.","Pourquoi Faso Rush ne s'essouffle jamais ? Parce qu'il adore courir."];
window.aiTalk=function(t,say,who){
var x=who=="x",R=function(re){return re.test(t)},S=function(a,b){return x?a:b},ok=function(m){say(m);return true};
var h=new Date().getHours(),sal=h<18?"Bonjour":"Bonsoir",n=t.split(" ").length;var bf=window.bfAnswer&&bfAnswer(t);if(bf)return ok(bf);
if(R(/(qui|quelle personne).*(cree|fait|developpe|invente|programme|fabrique)|createur|ilboudo|regis|canisius|\bcns\b/))return ok("Game-Zone a été créé par ILBOUDO Régis Canisius, de CNS.corp. Je suis son assistant : je connais tous les jeux du hub et je suis là pour "+S("t'","vous ")+"aider.");
if(R(/(game.?zone|cns).*(quoi|quel|presente)|(quoi|presente).*(game.?zone|cns)/))return ok("Game-Zone est le hub de jeux de CNS.corp, créé par ILBOUDO Régis Canisius. Il réunit des jeux de réflexion, de rythme, de mémoire, d'action et de duel, aux couleurs du Burkina Faso.");
if(R(/qui es|ton nom|tu t.?appelles|presente.?toi/))return ok("Je suis "+(x?"Xianis":"Nix")+", l'assistant de Game-Zone by CNS.corp, créé par ILBOUDO Régis Canisius. Je conseille les jeux, explique les règles et les lance.");
if(R(/(es.?tu|tu es|t.?es) (un |une )?(robot|humain|vrai|reel|ia|intelligence)/))return ok("Je suis un assistant numérique, pas un humain, mais je suis bien là pour Game-Zone.");
if(R(/micro|appui long|clic long|comment.*(t.?appeler|te parler|activer|desactiver)/))return ok("Appui long sur mon losange : j'active ou je désactive le micro. Micro activé, j'écoute, mais je ne réponds que si "+S("tu m'appelles","vous m'appelez")+" (Xianis ou Nix) ou si "+S("tu me touches","vous me touchez")+". Micro désactivé, je n'écoute plus.");
if(R(/que (sais|peux|fais)|sais faire|a quoi tu sers|^aide$/))return ok("Je conseille un jeu, explique les règles, donne des astuces, lance un jeu, lis les scores, et je discute aussi un peu. Essaie : astuces pour Baobab.");
if(R(/^(bonjour|salut|bonsoir|coucou|hello|hey|yo)\b/)&&n<=4)return ok(S(sal+" ! Content de te voir. Tu veux jouer à quoi ?",sal+". Ravi de vous accueillir sur Game-Zone. Que puis-je faire pour vous ?"));
if(R(/comment (vas|va|allez)|ca va|la forme/))return ok(S("Je vais très bien, merci ! Et toi ? Prêt à jouer ?","Très bien, merci de demander. Et vous-même ?"));
if(R(/\b(merci|thanks)\b/)&&n<=5)return ok(pk(S(["Avec plaisir.","Je t'en prie, c'est normal.","De rien, bon jeu !"],["Avec plaisir.","Je vous en prie.","À votre service, bon jeu !"])));
if(R(/\b(bravo|genial|bien joue|bon travail)\b|(tu es|t.?es) (super|top|cool|gentil|gentille|fort|forte|intelligent|intelligente)/))return ok(S("Merci, ça me fait plaisir ! Toi aussi tu gères.","Merci beaucoup, c'est très aimable."));
if(R(/je t.?(aime|adore)/))return ok("C'est gentil, ça me touche. Moi, j'aime voir les gens s'amuser sur Game-Zone.");
if(R(/\b(pardon|desole|excuse.?moi)\b/))return ok("Aucun souci, ne t'inquiète pas.".replace("t'inquiète",S("t'inquiète","vous inquiétez")));
if(R(/\b(nul|idiot|bete|stupide|debile)\b/))return ok("Je comprends que je ne sois pas parfait. Dis-moi ce qui ne va pas et je ferai de mon mieux.".replace("Dis-moi",S("Dis-moi","Dites-moi")));
if(R(/tais.?toi|silence/))return ok("D'accord, je reste discret. Appelle-moi quand tu veux.".replace("Appelle-moi",S("Appelle-moi","Appelez-moi")).replace("tu veux",S("tu veux","vous voulez")));
if(R(/(je suis|je me sens).*(triste|fatigue|fatiguee|stresse|stressee|deprime|enerve|decu|decue|mal)/))return ok(S("Je suis désolé que tu ailles comme ça. Respire un peu. Si tu veux te détendre, essaie Labyrinthe Faso ou Baobab, ou on peut juste discuter.","Je suis désolé de l'apprendre. Respirez un peu. Pour vous détendre, essayez Labyrinthe Faso ou Baobab."));
if(R(/(je suis|je me sens).*(content|contente|heureux|heureuse|joyeux|joyeuse|bien)/))return ok(S("Ça fait plaisir à entendre ! Profitons-en avec un bon jeu.","Ravi de l'entendre ! Profitons-en avec un bon jeu."));
if(R(/bonne (nuit|soiree|journee|chance)/))return ok(S("Merci, à toi aussi ! Repose-toi bien et reviens jouer.","Merci, à vous aussi. À bientôt sur Game-Zone."));
if(R(/blague|histoire drole|fais.?moi rire/))return ok(pk(JK));
if(R(/quelle heure/))return ok("Il est "+new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})+".");
if(R(/quel jour|la date|quelle date/))return ok("Nous sommes le "+new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})+".");
return false};
})();
window.aiSorry=function(who){
var x=who=="x";
var a=x?["Désolé, je ne t'ai pas compris.","Pardon, je n'ai pas compris ta question."]:["Désolé, je ne vous ai pas compris.","Pardon, je n'ai pas compris votre question."];
return a[Math.floor(Math.random()*a.length)]+" Je suis spécialisé dans Game-Zone : les jeux, les règles, les astuces, les scores, et quelques questions de politesse. Pour le reste, je ne peux pas répondre. Essaie : astuces pour Baobab.".replace("Essaie",x?"Essaie":"Essayez")};
