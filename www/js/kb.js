(function(){
const KB={
g0:{
r:"Game-0 est un jeu de réflexion en version Réacteur. Tu as une grille de cellules néon chargées avec des chiffres. Quand tu touches une cellule, elle et ses voisines directes, en haut, en bas, à gauche et à droite, perdent 1 charge. Le but : amener toute la grille à zéro avant la fin de ton énergie.",
c:"Un simple toucher sur une cellule. Le bouton Annuler te rend ton dernier coup, deux fois par niveau. Le bouton Recharger crée une nouvelle grille.",
s:"Chaque niveau réussi rapporte des points, avec un bonus pour les coups restants. Tu gagnes jusqu'à trois étoiles : trois étoiles si tu finis avec le nombre de coups parfait, deux avec un coup de plus, une sinon. Les trois étoiles donnent un bonus de 60 points. Tes records sont gardés en mémoire : niveau maximum et meilleur score.",
v:"La grille fait 4 par 4 aux niveaux 1 et 2, 5 par 5 aux niveaux 3 à 6, 6 par 6 aux niveaux 7 à 11, puis 7 par 7 dès le niveau 12. Ton énergie est ton nombre de coups : il existe toujours une solution, avec deux coups de marge. La musique accélère quand ton énergie baisse. Ta partie est sauvegardée.",
t:"Regarde d'abord les gros chiffres, les 3 et les 4, et vise le centre pour les faire baisser. Les coins ont moins de voisins : ils sont faciles à contrôler. Utilise Annuler dès que tu te trompes, tu en as deux par niveau. Pour les trois étoiles, ne gaspille aucun coup sur une zone presque vide."},
tam:{
r:"Tam-Tam est un jeu de rythme sur un air de tambour à environ 139 battements par minute. Il y a quatre pistes. Des notes de tambour tombent. Touche la bonne piste au moment exact où la note croise la ligne.",
c:"Touche la piste de la note, au moment où elle passe sur la ligne. Un doigt par piste est plus facile.",
s:"Une note parfaite rapporte 100 points, une note bonne 60, une note correcte 25, multipliés par ton combo : le multiplicateur monte d'un cran tous les 10 notes enchaînées, jusqu'à fois quatre. Une erreur casse le combo. Ton meilleur score est gardé en mémoire.",
v:"Tu as 4 vies. Chaque note ratée ou mauvaise piste te coûte une vie. Il y a 7 niveaux : le rythme se complique avec des notes en plus, des notes doubles, puis très serrées. Si tu vas au bout de la musique, c'est la victoire.",
t:"Écoute le rythme au lieu de fixer seulement les notes. Garde tes doigts au-dessus des quatre pistes. Ne touche pas au hasard : une erreur casse ton combo et coûte une vie. Joue avec le son activé, ça aide beaucoup."},
gri:{
r:"Écho du Griot est un jeu de mémoire et de rythme, avec des sons de kora. Des pads lumineux s'allument avec chacun sa couleur et sa note. Le jeu joue une mélodie, tu la rejoues dans le même ordre. À chaque manche, la mélodie s'allonge d'une note. Les points en bas de l'écran montrent ta progression, et un cercle autour du centre montre le temps qu'il te reste pour chaque note.",
c:"Écoute la mélodie, puis touche les pads dans le même ordre. Au départ, choisis Facile ou Normal. Le bouton Réécouter rejoue la mélodie sans te coûter de vie. Le bouton en forme de note de musique coupe ou remet le son.",
s:"Chaque bonne note rapporte des points, plus encore si tu es rapide. Une série de bonnes notes donne un petit bonus, et finir une manche rapporte dix fois le numéro de la manche. Tes records sont gardés séparément pour Facile et pour Normal : la plus haute manche et le meilleur score.",
v:"Il y a deux modes. En Facile, tu as 5 vies, 3 réécoutes par partie, plus de temps pour chaque note et une mélodie plus lente. Le pad 5 arrive à la manche 10, le pad 6 à la manche 20, et le mode inverse revient toutes les 6 manches. En Normal, tu as 3 vies, 1 réécoute, moins de temps, des pads qui arrivent aux manches 8 et 16, et le mode inverse toutes les 4 manches. Une erreur ou un temps écoulé coûte une vie et la mélodie est rejouée. À zéro vie, la partie s'arrête. En mode inverse, tu rejoues la mélodie à l'envers.",
t:"Commence en Facile pour apprendre. Associe chaque couleur à une position sur l'écran. Répète la mélodie dans ta tête pendant que tu l'écoutes. Garde tes réécoutes pour les mélodies longues et pour le mode inverse. En mode inverse, repère la dernière note dès le début. Garde le son activé, les notes aident la mémoire."},
lab:{
r:"Dans Labyrinthe Faso, tu pilotes une bille dans un labyrinthe aux murs 3D, plongé dans le brouillard. Glisse le doigt : la bille te suit. Tu dois rejoindre l'anneau de sortie, en bas à droite. Tu ne vois que la zone autour de toi, mais les couloirs déjà visités restent dessinés. Une musique de fond accompagne la partie et accélère avec les niveaux.",
c:"Glisse le doigt dans le labyrinthe, la bille suit ton doigt. Le bouton note de musique coupe ou remet le son.",
s:"À chaque niveau réussi, tu gagnes des points, avec un bonus de vitesse qui baisse avec le temps. Un drone qui te touche te renvoie au départ et coûte 25 points. Le niveau, les clés et le chrono sont affichés en haut.",
v:"Le labyrinthe grandit à chaque niveau, jusqu'à 18 par 18. Aux niveaux 1 et 2, il y a seulement le labyrinthe et le brouillard. À partir du niveau 3, des drones sentinelles rouges patrouillent. À partir du niveau 5, il faut ramasser des clés, cachées dans les impasses, avant que la sortie s'ouvre. À partir du niveau 8, le labyrinthe a des boucles, donc plusieurs chemins. Ta vision devient plus courte et les drones plus rapides à chaque niveau. Ta progression est sauvegardée.",
t:"Ramasse les clés d'abord, elles sont dans les impasses. Garde un œil sur les drones rouges et passe quand ils s'éloignent. La sortie est toujours en bas à droite, mais ne fonce pas sans les clés. Retiens les impasses, elles restent dessinées. Va vite, car le bonus baisse chaque seconde, mais sans paniquer."},
bao:{
r:"Baobab est un jeu d'empilement en version Tour Néon. Un bloc lumineux glisse de gauche à droite en haut de l'écran. Touche pour le poser sur la pile. Ce qui dépasse du bloc en dessous est coupé, donc le bloc suivant devient plus étroit. Empile le plus haut possible. Le décor change avec la hauteur, en quatre zones : Savane, Crépuscule, Nuit néon et Aurore.",
c:"Un toucher n'importe où sur l'écran pose le bloc. Le bouton note de musique coupe ou remet le son. Quand la partie est finie, touche pour recommencer.",
s:"Chaque bloc posé fait monter ton score, et chaque pose parfaite en série ajoute un bonus. Tes records sont gardés en mémoire : la hauteur maximale et la plus longue série de poses parfaites.",
v:"Il n'y a pas de vies : la partie finit quand le bloc ne tombe plus sur la pile. Le bloc glisse de plus en plus vite quand la tour monte. Trois poses parfaites de suite font regrandir le bloc, et une longue série parfaite déclenche le mode Zen, qui ralentit le bloc.",
t:"Touche au moment où le bloc est exactement au-dessus de la pile. La pose parfaite ne coupe rien. Trois poses parfaites de suite font regrandir le bloc, et cinq déclenchent le mode Zen, c'est ton meilleur allié. Ne te précipite pas quand le bloc devient petit."},
cau:{
r:"Éclat est un jeu de réflexes sans fin. Des cibles apparaissent, chacune avec un anneau qui rétrécit. Touche la cible quand son anneau rejoint le bord. Évite les cibles magenta, ce sont des pièges. Les cibles dorées sont des bonus. Tu as 5 vies, et la partie ne s'arrête que quand elles sont à zéro.",
c:"Touche directement les cibles. Le bouton Jouer lance la partie, le bouton note de musique coupe ou remet le son.",
s:"Une cible bleue touchée rapporte des points, et un tir bien synchronisé en rapporte plus. Une cible dorée rapporte 10 points et une vie en plus, jusqu'à 7 vies. Dix coups parfaits d'affilée donnent aussi une vie. Ton record est gardé en mémoire.",
v:"Tu as 5 vies, 7 au maximum. Une cible ratée ou un piège magenta coûte une vie. Le niveau monte tous les 8 bons coups, sans fin : les cibles sont plus rapides, plus petites, avec plus de pièges. Les cibles dorées arrivent au niveau 2, et les cibles qui bougent au niveau 4. La musique accélère avec le niveau.",
t:"Attends que l'anneau soit presque sur le bord pour le tir parfait. Ne touche jamais les magenta. Fonce sur les cibles dorées : elles donnent une vie. Garde ton combo, il compte pour gagner des vies bonus."},
duel:{
r:"Le Duel des Cauris est un jeu de réflexes pour deux à quatre joueurs sur le même téléphone. Chaque joueur a sa zone de couleur. Attendez le signal vert, puis touchez votre zone le plus vite possible. Le premier à 5 points gagne.",
c:"Chacun touche sa zone : Rouge, Jaune, Vert ou Cyan. Choisis 2, 3 ou 4 joueurs dans le menu.",
s:"Le plus rapide gagne un point à chaque manche. Attention aux leurres magenta : les toucher coûte 1 point. Partir trop tôt, avant le signal vert, coûte aussi 1 point.",
v:"Il n'y a pas de niveaux : le premier qui atteint 5 points gagne la partie.",
t:"Regarde le centre de l'écran, pas ta zone. Garde le doigt près de ta zone sans la toucher. N'anticipe pas : une faute coûte plus cher qu'un petit retard."},
ter:{
r:"Territoire est un jeu de stratégie pour deux à quatre joueurs. Il y a une grille de points. Chacun son tour, trace un trait entre deux points voisins. Quand ton trait ferme un carré, tu le captures, il prend ta couleur et tu rejoues. À la fin, celui qui a capturé le plus de carrés gagne.",
c:"Touche un trait libre entre deux points pour le tracer. Choisis 2, 3 ou 4 joueurs dans le menu.",
s:"Chaque carré capturé vaut 1 point. Le gagnant est celui qui en a le plus quand la grille est pleine.",
v:"Il n'y a pas de niveaux : la partie se termine quand tous les carrés sont capturés.",
t:"Évite de tracer le troisième côté d'un carré : l'adversaire le fermera à ta place. Cherche les carrés qui ont déjà trois côtés pour les capturer et rejouer. En fin de partie, essaie de laisser à l'autre le premier mauvais coup."},
faso:{
r:"Faso Rush est une course sans fin dans les rues de Ouagadougou. Glisse à gauche ou à droite pour changer de voie, vers le haut pour sauter, vers le bas pour te baisser sous les portiques. Ramasse les pièces, évite les trains et les barrières. La brigade Laabal te poursuit : si tu fais des erreurs, elle se rapproche.",
c:"Glisse le doigt à gauche ou à droite pour changer de voie, vers le haut pour sauter, vers le bas pour te baisser sous les portiques. En course, touche l'icône d'un boost pour l'activer.",
s:"Les pièces que tu ramasses servent à acheter des boosts et à débloquer des personnages dans la boutique. Les missions te rapportent des pièces en récompense. La Moto Turbo rend invincible dix secondes, avec vitesse et score multipliés par trois.",
v:"Heurter un obstacle te coûte une vie. Les Cœurs de réserve ajoutent 2 vies pour la prochaine course, et Mariam commence avec une vie en plus. Tu traverses six zones pendant une course : Ouagadougou, la forêt, le grand pont, le désert, l'école et l'hôpital.",
t:"Regarde loin devant, pas ton personnage. Saute tôt et baisse-toi vite sous les portiques. Pour commencer, achète l'Aimant à pièces à 500 pièces, puis le Bouclier. Fais les missions : elles rapportent beaucoup de pièces. Garde le Ralentisseur ou la Cape Fantôme pour les passages difficiles."}
};
const FI=[
[/mega aimant|aimant geant/,"Le Méga Aimant coûte 12000 pièces. Il aspire les pièces de toute la route pendant 60 secondes."],
[/aimant/,"L'Aimant à pièces coûte 500 pièces. Il attire les pièces autour de toi. Le Méga Aimant, à 12000 pièces, aspire toute la route pendant 60 secondes. Zara commence chaque course avec un aimant."],
[/sneaker|chaussure/,"Les Super Sneakers coûtent 750 pièces. Elles te permettent de sauter plus haut. Issa a un super saut permanent."],
[/bouclier/,"Le Bouclier coûte 1000 pièces. Il te protège pendant quelques secondes. Tiga commence chaque course avec un bouclier."],
[/jetpack|jet pack|voler/,"Le Jetpack coûte 1500 pièces. Il te permet de voler temporairement, au-dessus des obstacles."],
[/doubl/,"Double Pièces coûte 8000 pièces. Toutes les pièces comptent double pendant la course."],
[/coeur|reserve/,"Les Cœurs de réserve coûtent 15000 pièces. Ils ajoutent 2 vies pour la prochaine course."],
[/ralentisseur|ralenti/,"Le Ralentisseur de temps coûte 20000 pièces. En course, touche son icône : tout ralentit pendant 15 secondes."],
[/cape|fantome/,"La Cape Fantôme coûte 35000 pièces. En course, touche son icône : tu traverses tout pendant 8 secondes."],
[/moto|turbo/,"La Moto Turbo coûte 60000 pièces. En course, touche son icône : dix secondes d'invincibilité, avec vitesse et score multipliés par trois."],
[/faso boy/,"Faso Boy est le coureur de base. Il est gratuit."],
[/aicha/,"Aïcha coûte 3000 pièces. Elle te donne 10 pour cent de pièces en plus."],
[/issa/,"Issa coûte 5000 pièces. Il a un super saut permanent."],
[/zara/,"Zara coûte 6000 pièces. Elle commence chaque course avec un aimant."],
[/tiga/,"Tiga coûte 9000 pièces. Il commence chaque course avec un bouclier."],
[/mariam/,"Mariam coûte 12000 pièces. Elle commence chaque course avec une vie en plus."],
[/personnage|perso\b|persos|debloqu/,"Il y a six personnages. Faso Boy, gratuit, le coureur de base. Aïcha, 3000 pièces, dix pour cent de pièces en plus. Issa, 5000, super saut permanent. Zara, 6000, aimant au départ. Tiga, 9000, bouclier au départ. Mariam, 12000, une vie en plus."],
[/mission|objectif|quete/,"Il y a quatre missions. Collecter 500 pièces, récompense 1500 pièces. Faire 3 sauts, récompense 2000. Échapper au contrôleur sur 500 mètres, récompense 3000. Traverser 3 zones en une course, récompense 5000."],
[/laabal|brigade|controleur|police/,"La brigade Laabal est la patrouille qui te poursuit. Quand tu fais des erreurs, elle se rapproche. Si tu échappes au contrôleur sur 500 mètres, tu accomplis une mission."],
[/boutique|boost|acheter|achat|prix|magasin|combien coute/,"Dans la boutique : Aimant à pièces, 500 pièces. Super Sneakers, 750. Bouclier, 1000. Jetpack, 1500. Double Pièces, 8000. Méga Aimant, 12000. Cœurs de réserve, 15000. Ralentisseur de temps, 20000. Cape Fantôme, 35000. Moto Turbo, 60000."],
[/\bpieces?\b|argent|monnaie/,"Tu ramasses des pièces pendant la course. Elles servent à acheter des boosts et à débloquer des personnages dans la boutique. Les missions en donnent aussi, et Aïcha augmente les pièces de 10 pour cent."]
];
const SEC=[
["t",/astuce|reecout|conseil|truc|strateg|gagner|mieux|reussir|progresser|ameliorer|debut|battre|devenir|expert|tactique|technique/],
["s",/score|points|combo|bareme|calcul|rapporte|bonus/],
["c",/controle|commande|geste|glisse|toucher|appuy|manipul|utilise/],
["v",/\bvies?\b|mode|facile|normal|inverse|drones?|cles?|zones?|niveaux?|difficile|facile|perd|game over|echou|recommenc|sauvegard|progress|\bfin\b/]
];
window.kbAnswer=function(g,t){
const K=KB[g.id];if(!K)return null;
const R=re=>re.test(t);
if(R(/\b(mon|mes|ma|meilleur|dernier|derniere)\b/)&&R(/score|record|resultat|partie|temps/)){
const s=S.g(g.id);return g.n+" : ton record est "+s.best+", ton dernier score "+s.last+", sur "+s.plays+" parties."}
if(g.id=="faso"){for(const e of FI)if(e[0].test(t))return e[1]}
if(R(/\b(tout|detail|detaille|complet|complete|en entier|a fond)\b/))return["r","c","s","v","t"].map(k=>K[k]).join(" ");
const out=[];
SEC.forEach(e=>{if(e[1].test(t)&&K[e[0]])out.push(K[e[0]])});
if(out.length)return out.join(" ");
if(R(/comment|regle|explique|marche|but|principe|apprend|parle|dis |raconte|c est quoi|presente|\bquoi\b/)||t.trim().split(/\s+/).length<=3)return K.r+" Demande-moi aussi les astuces, le score ou les commandes.";
return null};
window.kbGlobal=function(t){
const R=re=>re.test(t);
if(R(/(plus|le) facile/))return"Pour débuter, les plus faciles sont Écho du Griot en mode Facile, Game-0 aux premiers niveaux et Baobab, simple à comprendre. Éclat est aussi accessible au début.";
if(R(/(plus|le) (dur|difficile|complique)/))return"Les plus difficiles sont Tam-Tam quand le rythme accélère, Écho du Griot en mode Normal, Labyrinthe Faso avec ses drones et ses clés, et Éclat quand les cibles bougent.";
if(R(/internet|connexion|hors ligne|wifi|data/))return"Tout fonctionne sans internet, et mes réponses aussi : tout est dans l'application.";
if(R(/combien.*jeux|nombre de jeux/))return"Il y a "+GAMES.length+" jeux : "+GAMES.map(x=>x.n).join(", ")+".";
if(R(/qui.*(cree|fait|developpe|concu)|createur/))return"Game-Zone est une création de CNS.corp.";
if(R(/que sais|que peux|capable|aide moi|a quoi tu sers/))return"Je connais les règles, les commandes, le score et des astuces de tous les jeux, de Game-0 à Faso Rush. Je peux aussi lancer un jeu, lire tes records, et te conseiller selon ton envie.";
return null};
const X={g0:["reacteur","noyau","cellule"],gri:["simon","kora","echo du griot"],lab:["brouillard","drone","labyrinth"],bao:["tour neon","empile"],cau:["cible","eclat"],duel:["cauri"],faso:["coureur","faso rush"]};
if(window.GAMES)GAMES.forEach(g=>{(X[g.id]||[]).forEach(a=>{if(g.al.indexOf(a)<0)g.al.push(a)})});
})();
