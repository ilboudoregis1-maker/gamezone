(function(){
var old=window.bfAnswer;
var TR="Le capitaine Ibrahim Traoré est le président du Faso, chef de l'État du Burkina Faso. Il est né en 1988, a étudié à Bobo-Dioulasso et est entré dans l'armée en 2009 ; il était capitaine d'artillerie. Il est arrivé au pouvoir le 30 septembre 2022, en renversant le lieutenant-colonel Paul-Henri Sandaogo Damiba, qui avait lui-même pris le pouvoir en janvier 2022 en renversant le président Roch Marc Christian Kaboré. Les militaires lui reprochaient de ne pas assez lutter contre l'insécurité. Il a été désigné président de la transition le 14 octobre 2022 et a prêté serment le 21 octobre. À 34 ans, il était alors le plus jeune chef d'État du monde. Depuis, le Burkina Faso s'est éloigné de la France et rapproché de partenaires comme la Russie, et a formé avec le Mali et le Niger l'Alliance des États du Sahel. Ces informations peuvent avoir changé : pour l'actualité, consulte la presse.";
window.bfAnswer=function(t){
if(/\b(rush|jeux?|scores?|mission|missions|boutique|boost|boosts|personnage|jetpack|partie|astuces?)\b/.test(t))return old?old(t):null;
if(/traore|ibrahim/.test(t)||/(president|chef de l.?etat|dirigeant|qui dirige|qui gouverne).*(burkina|faso)|(burkina|faso).*(president|chef de l.?etat|dirigeant|qui dirige|qui gouverne)/.test(t))return TR;
if(/(coup d.?etat|putsch|damiba|junte)/.test(t)&&/(burkina|faso|damiba|traore)/.test(t))return TR;
return old?old(t):null};
})();
