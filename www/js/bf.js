(function(){
var B=[
[/sankara/,"Thomas Sankara, capitaine, a dirigé le pays de 1983 à 1987. Il a rebaptisé la Haute-Volta en Burkina Faso et lancé de grands chantiers pour l'éducation, la santé et contre la faim. Il a été assassiné le 15 octobre 1987."],
[/compaore/,"Blaise Compaoré a dirigé le Burkina Faso de 1987 à 2014."],
[/ki.?zerbo/,"Joseph Ki-Zerbo est un grand historien burkinabè, auteur de l'Histoire de l'Afrique noire."],
[/zongo/,"Norbert Zongo était un journaliste d'investigation burkinabè, assassiné en 1998. Il reste un symbole de la liberté de la presse."],
[/fespaco/,"Le FESPACO est le Festival panafricain du cinéma et de la télévision de Ouagadougou, créé en 1969. Il a lieu tous les deux ans, et son grand prix est l'Étalon d'or de Yennenga."],
[/\bsiao\b/,"Le SIAO est le Salon international de l'artisanat de Ouagadougou, un grand rendez-vous de l'artisanat africain, organisé tous les deux ans."],
[/yennenga/,"Yennenga est une princesse guerrière légendaire, mère de Ouédraogo, l'ancêtre des Mossi. Le grand prix du FESPACO porte son nom."],
[/\bmossi\b|mogho/,"Les Mossi forment le groupe le plus nombreux du Burkina Faso. Leur chef traditionnel, le Mogho Naaba, réside à Ouagadougou."],
[/ouagadougou|\bouaga\b/,"Ouagadougou, qu'on appelle aussi Ouaga, est la capitale du Burkina Faso. Elle accueille le FESPACO et le SIAO."],
[/\bbobo\b|dioulasso/,"Bobo-Dioulasso est la deuxième ville du pays et sa capitale culturelle. Elle est connue pour sa musique et sa grande mosquée de style soudanais."],
[/faso dan fani/,"Le Faso Dan Fani est le pagne en coton tissé à la main, un symbole de fierté nationale porté lors des fêtes."],
[/balafon|bendre|djembe/,"Au Burkina Faso, la musique traditionnelle utilise le balafon, le djembé et le bendré, un tambour fait d'une calebasse."],
[/\bdolo\b|bissap|babenda|zoom.?koom|\bto\b.*(plat|sauce)/,"Le plat le plus connu est le tô, une pâte de mil, de sorgho ou de maïs servie avec une sauce. On boit aussi le dolo, une bière de mil, et le bissap, un jus d'hibiscus."],
[/barka/,"En mooré, barka veut dire merci."],
[/tour du faso/,"Le Tour du Faso est la grande course cycliste du Burkina Faso."],
[/etalons\b|football|\bcan\b/,"L'équipe nationale de football s'appelle les Étalons. Elle a joué la finale de la Coupe d'Afrique des nations en 2013."]
];
var A=[
[/capitale|ville principale/,"La capitale du Burkina Faso est Ouagadougou. La deuxième ville est Bobo-Dioulasso, la capitale culturelle."],
[/population|habitants/,"Le Burkina Faso compte plus de 20 millions d'habitants."],
[/superficie|taille|\bgrand\b|km/,"Le Burkina Faso couvre environ 274 000 kilomètres carrés, soit à peu près la moitié de la France."],
[/voisin|frontiere|entoure|limite/,"Le Burkina Faso a six voisins : le Mali au nord et à l'ouest, le Niger à l'est, le Bénin et le Togo au sud-est, le Ghana et la Côte d'Ivoire au sud."],
[/ou se trouve|situe|continent|afrique|\bmer\b|littoral|pays/,"Le Burkina Faso est un pays d'Afrique de l'Ouest, sans accès à la mer. Sa capitale est Ouagadougou."],
[/langue|on parle|parle.?t.?on/,"La langue officielle est le français. On parle aussi le mooré, le dioula, le fulfuldé et beaucoup d'autres langues nationales."],
[/monnaie|argent|franc|cfa/,"La monnaie est le franc CFA, utilisé dans plusieurs pays d'Afrique de l'Ouest."],
[/drapeau|couleurs?/,"Le drapeau a deux bandes horizontales, rouge en haut et verte en bas, avec une étoile jaune à cinq branches au centre."],
[/devise/,"La devise du Burkina Faso est : Unité, Progrès, Justice."],
[/hymne/,"L'hymne national s'appelle le Ditanyè."],
[/\bnom\b|signifie|veut dire|haute.?volta/,"Le nom Burkina Faso a été adopté le 4 août 1984 sous Thomas Sankara. Il signifie à peu près le pays des hommes intègres. Avant, le pays s'appelait la Haute-Volta."],
[/independance|colonis|histoire/,"Le pays est devenu indépendant de la France le 5 août 1960, sous le nom de Haute-Volta."],
[/fete nationale|jour ferie/,"La fête nationale est le 11 décembre. L'indépendance est célébrée le 5 août."],
[/climat|saison|pluie|chaleur|meteo/,"Le climat est tropical : une saison sèche et chaude, puis une saison des pluies d'environ juin à septembre."],
[/relief|montagne|culminant|fleuve|riviere/,"Le pays est surtout plat. Son point culminant, le Ténakourou, atteint environ 749 mètres. Les grands cours d'eau sont le Mouhoun, le Nazinon et le Nakambé, la Volta noire, rouge et blanche."],
[/economie|export|coton|\bor\b|agriculture/,"L'économie repose sur l'agriculture, l'élevage, le coton et l'or, qui est un des premiers produits d'exportation."],
[/ethnie|peuples?/,"Le Burkina compte une soixantaine de groupes ethniques. Les plus nombreux sont les Mossi, puis les Peuls, les Gourmantché, les Bobo, les Lobi, les Bissa et les Gourounsi."],
[/religion/,"On pratique au Burkina Faso l'islam, le christianisme et les religions traditionnelles."],
[/animal|faune|elephant|parc/,"Le pays a des parcs comme Nazinga, Arly et le Parc W, où l'on peut voir des éléphants."],
[/tourisme|visiter|site|cascade|\bpics?\b|\bvoir\b/,"À voir : les cascades de Banfora, les pics de Sindou, le lac de Tengrela, les ruines de Loropéni classées à l'UNESCO, et la cour royale de Tiébélé avec ses maisons peintes."],
[/cuisine|plat|manger|nourriture|repas/,"Le plat le plus connu est le tô, une pâte de mil, de sorgho ou de maïs avec une sauce. On mange aussi le riz gras et le poulet bicyclette."],
[/culture|tradition|art\b|artisanat|danse|masque|musique|vetement|pagne/,"La culture burkinabè est riche : masques bwa, nuna et bobo, musique au balafon et au djembé, pagne Faso Dan Fani, et des rendez-vous comme le FESPACO pour le cinéma et le SIAO pour l'artisanat."],
[/president|gouvernement|dirigeant|politique/,"Pour l'actualité politique, je ne suis pas à jour. Je peux te parler de l'histoire, de la culture, de la cuisine ou des lieux à visiter."]
];
window.bfAnswer=function(t){
if(/\b(rush|jeux?|scores?|mission|missions|boutique|boost|boosts|personnage|jetpack|partie|astuces?)\b/.test(t))return null;
var i;
for(i=0;i<B.length;i++)if(B[i][0].test(t))return B[i][1];
if(!/burkina|burkinabe|faso|haute.?volta/.test(t))return null;
for(i=0;i<A.length;i++)if(A[i][0].test(t))return A[i][1];
if(t.split(" ").length<=7)return "Le Burkina Faso est un pays d'Afrique de l'Ouest dont la capitale est Ouagadougou. Demande-moi par exemple : la capitale, la culture, la cuisine, le FESPACO ou Sankara.";
return null};
})();
