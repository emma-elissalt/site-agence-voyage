// tableau qui contient les informations sur les destinations:
// le nom de la ville (ou du pays),la première image, la deuxieme
// le prix par jour et par adulte, la météo et la vidéo youtube
var destinations=[
  ["Le Caire","lecaire.png","lecaire2.png",120,"cairo","Gurfp-b-lXs"],
  ["Casablanca","casablanca.png","casablanca2.png",80,"casablanca","33p-G9vOIDo"],
  ["Johannesburg","Johannesburg.png","Johannesburg2.png",200,"johannesburg","40Sttr0AiJs"],
  ["Madagascar","Madagascar.png","Madagascar2.png",100,"antananarivo","KnCFzro1jU8"],
  ["Zimbabwe","Zimbabwe.png","Zimbabwe2.png",50,"harare","jzf60b9WSbg"],
  ["Tanzanie","Tanzanie.png","Tanzanie2.png",60,"dodoma","QgrDdtcLQuk"]
];

// initialisation de variable globale
var nom='';
var indiceDestination=-1;


//Elle teste à vérifier et retrouver l'utilisateur loggué
function initialisation()
{
  console.log("Teste si utilisateur déjà loggé")
  //détection
  if (typeof sessionStorage!='undefined'){
    //récupération du nom et mot de passe si il existe
    nom=sessionStorage.getItem("nom");
    if (nom!=null){
      //un nom existe donc utilisateur déjà loggé
      console.log("OUI - Utilisateur : "+nom);
      afficheUtilisateurOk(nom);
    } else {
      console.log("Aucun utilisateur");
    }
  }
  else {
    alert("Stockage local non supporté")
  }
};

//Initialise la première page
function initialisationPremierePage()
{
  initialisation();
  faireImage();
};

//Création de la liste des images 
function faireImage()
{
  let parent=document.getElementById("images");
  for (let i = 0; i < destinations.length; i+=1) {
  var monDiv = document.createElement("div");
  monDiv.onmouseenter = function() {sourisSurImage(i,'image'+i,'popup'+i,'meteo'+i)};
  monDiv.onmouseleave = function() {sourisSortImage(i,'image'+i,'popup'+i)};
  monDiv.className = "container";
  monDiv.id = "monIDImage"+i;
  parent.appendChild(monDiv);
  console.log("Création des images");
  var monImage = document.createElement("img");
   monImage.src="image/"+destinations[i][1];
   monImage.alt="Image de "+destinations[i][0]; 
   monImage.id="image"+i; 
   monImage.onclick = function() {cliqueImage(i)};
   monDiv.appendChild(monImage);

   var monDiv2 = document.createElement("div");
   monDiv2.className = "text";
   monDiv2.id = "popup"+i;
   monDiv2.hidden = true;
   monDiv.appendChild(monDiv2);

   // pour ajouter le nom des villes sur les images
   var monh1 = document.createElement("h1");  
   monh1.innerHTML = destinations[i][0];
   monDiv2.appendChild(monh1);

   // pour ajouter le prix sur les images
   var monh2 = document.createElement("h2");
   monh2.innerHTML = destinations[i][3]+" par jour et par personne.";
   monDiv2.appendChild(monh2);

   // pour ajouter la météo sur les images
   var monh22 = document.createElement("h2");
   monh22.innerHTML = "";
   monh22.id = "meteo"+i;
   monDiv2.appendChild(monh22);
  };
};

//Initialise le formulaire
function initialisationFormulaire()
{
  initialisation();
  //récupération de l'indice destination si il existe  
  console.log("Teste si une destination existe")
  //détection
  if (typeof sessionStorage!='undefined'){
    //récupération de la destination
    indiceDestination=sessionStorage.getItem("destination");
    if ((indiceDestination!=null) && (indiceDestination>-1) ){
      //une destination existe
      console.log("OUI - indice : "+indiceDestination);
      document.getElementById("Choix").selectedIndex = indiceDestination;
    } else {
      console.log("Aucun utilisateur");
    }
  }
  else {
    alert("Stockage local non supporté")
  }
  //Initialisation des champs date et nombre de personne par défaut
  remplirParDefautFormulaire();
};

//Initialise les champs du formulaire par défaut
function remplirParDefautFormulaire(){
  var debut = new Date(); // par défaut a la date actuel
  document.getElementById("datedepart").valueAsDate=debut   
  var fin = new Date();
  fin.setDate(debut.getDate()+7); // on initialise la date retour une semaine après la date de début
  document.getElementById("dateretour").valueAsDate=fin;
  document.getElementById("nbadultes").value="1"; // comme ça un enfant ne pourra jamais voyager seul
  document.getElementById("nbenfants").value="0";
  calculerAvecElementsPage(); // calcul du prix avec les éléments par défaut
}

//Initialise la page récapitulatif
function initialisationRecapitulatif()
{
  initialisation();
  ajouteLigne();
};

// vérifie si l'utilisateur est loggé pour pouvoir accéder à la réservation du voyage
function afficheUtilisateurOk(nom){
  console.log("Passe la page en mode loggé");
  document.getElementById("demandeLogin").hidden = true;
  document.getElementById("legendeBienvenue").innerHTML = nom; 
  document.getElementById("loginOK").hidden = false;
  document.getElementById("lienPrincipal").href = "PremierePage.html";
  document.getElementById("lienReservation").href = "formulaire.html";
}

// Fonction qui rend l'image "dynamique" au passage de la souris 
function sourisSurImage(destination,image,popup,legende) {
  document.getElementById(image).src = "image/"+destinations[destination][2];
  document.getElementById(popup).hidden = false; // on ne cache plus la deuxième image
  // météo en temps réel sur notre image
  var requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+destinations[destination][4]+"&appid=f91b893343f33c08a48d7ec7a2dcaec5";
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
    request.onload = function() {
    var infoMeteo = request.response;
    afficheMeteo(infoMeteo,legende);
  }
}

// Affcihe la météo et l'humidité 
function afficheMeteo(info,legende){
  let temperature = info.main.temp; //elle est en kelvin !
  let humidity = info.main.humidity; 
  temperature = (+temperature - 273.15); // elle est maintenant en degré celsius 
  document.getElementById(legende).innerHTML = parseFloat(temperature).toFixed(1)+"°C ("+parseFloat(humidity).toFixed(1)+"%)";
}

// quand on enlève la souris de l'image, on revient a la première image 
function sourisSortImage(destination,image,popup) {
  document.getElementById(image).src = "image/"+destinations[destination][1];
  document.getElementById(popup).hidden = true; // on recache donc le reste
}

//Fonction qui nous envoie sur la page formulaire quand on clique sur une image si l'utilisateur est loggé 
function cliqueImage(destination){
  console.log("clique sur image");
  if (nom!=null){
    //un nom existe donc utilisateur déjà loggé
    indiceDestination = destination;
    // sauvegarde de la destination du coté client le temps de la session
    sessionStorage.setItem("destination",indiceDestination);
    console.log("destination choisie : "+indiceDestination);
    document.location.href="formulaire.html";
    afficheUtilisateurOk(nom);
  } else {
    console.log("Aucun utilisateur docn pas de réaction");
  }
}

// base de données des utilisateur
// fonction qui verifie que la personne est bien dans la base de données
function validerLogin()
{
  let user = document.getElementById("IDlogin").value;   
  let userMajuscule = user.toUpperCase();
  let password=document.getElementById("IDpass").value;
  let autorise=false;
  console.log("Teste si utilisateur "+user+" est connu.")
    /* teste si le couple login/password est autorisé */
  if ((userMajuscule=="EMMA") && (password=="emma")) {
    autorise = true;
  }
  if ((userMajuscule=="ADRIEN") && (password=="adrien")) {
    autorise = true;
  }
  if ((userMajuscule=="SUPERPROF") && (password=="superprof")) {
    autorise = true;
  }
  if (autorise) {
    console.log("Login autorisé - stockage en session")
    /*sauvegarde de l'utilisateur du coté client le temps de la session*/
    nom=user;
    sessionStorage.setItem("nom",user);
    afficheUtilisateurOk(user);
  }
  else
  {
    console.log("Login non autorisé - efface les champs")
    /* login incorrect, on efface le login et le mot de passe */
    document.getElementById("IDlogin").value = "";
    document.getElementById("IDpass").value = "";
  }
  /* retourne FAUX pour empêcher le comportement par défaut de la form */
  return false;
}

// Fonctions pour le bouton retour en haut de page
$(function(){
	$.fn.scrollToTop = function(){
		$(this).hide().removeAttr("href");
		if($(window).scrollTop()!="0"){
			$(this).fadeIn("slow")
		}
		var scrollDiv=$(this);
		$(window).scroll(function(){
			if($(window).scrollTop()=="0"){
				$(scrollDiv).fadeOut("slow")
			}else{
				$(scrollDiv).fadeIn("slow")
			}
		});
		$(this).click(function(){
			$("html, body").animate({scrollTop:0},"slow")
		})
	}
}); 

//fonction qui appelle le bouton retour en haut de page
$(function(){
 $("#toTop").scrollToTop();
});
//Fin bouton


//Mise à jour des immages en fonction des choix utilisateurs pour le filtre
function majImage(){
  for (i=0; i<6; i++) {
    let doc=document.getElementById("monIDImage"+i);
    if (doc!=null) {doc.remove();}
  }
  faireImage();
  let nbAdulte = +document.getElementById("nbadultes").value;
  let nbEnfant = +document.getElementById("nbenfants").value;  
  let prixMax = +document.getElementById("prixMax").value;
  if (nbAdulte<1) {
    return false;
  }
  if (prixMax<=0) {
    return false;
  }
  for (i=0; i<6; i++) {
    prix=destinations[i][3]*(nbAdulte+0.4*nbEnfant);
    console.log("prix "+prix);
    console.log(prixMax);
    if (prix<=prixMax) {
      console.log("OK");
      document.getElementById("monIDImage"+i).hidden = "false"; //on affiche les images des destinations correspondantes
    } else {
      console.log("Pas OK");
      document.getElementById("monIDImage"+i).remove(); // sinon on enlève les images dont le prix est suppérieur à celui de l'utilisateur
    }
}
  return false; // on ne fait rien si les champs prix et nombre d'adulte ne sont pas correctement remplis
}
    
//Mise à jour du prix en fonction des choix utilisateurs
function calculerAvecElementsPage(){
  // récupère les informations de la page
  let debut = new Date();
  let fin = new Date();
  debut = document.getElementById("datedepart").valueAsDate;   
  fin = document.getElementById("dateretour").valueAsDate;   
  // Vérifie les dates 
  if (fin < debut)
  {
    alert("Erreur, la date de retour doit être postérieure à la date de départ");
    fin.setDate(debut.getDate()+7);
    document.getElementById("dateretour").valueAsDate=fin;
  };
  //vérifie qu'il y a au moins 1 adulte
  let nbAdulte = +document.getElementById("nbadultes").value;
  if (nbAdulte<1)
  {
    alert("Erreur, il faut au moins 1 adulte");
    document.getElementById("nbadultes").value="1";
  };
  let nbEnfant = +document.getElementById("nbenfants").value;
  let IDDest=document.getElementById("Choix").selectedIndex;
  
  let dejeuner = document.querySelector('input[name=petitdej]:checked').value;
  let animal = document.querySelector('input[name=animal]:checked').value;
  let classe = document.querySelector('input[name=classe]:checked').value;

  prixTotal = calculerPrix(IDDest,nbAdulte,nbEnfant,debut.toDateString(),fin.toDateString(),animal,dejeuner,classe); // appel de la fonction qui calcul le prix 
  document.getElementById("prix").textContent = Math.ceil(prixTotal)+' €'; 
  return false;
}

//Fonction qui  retourne le calcul du prix total  
function calculerPrix(IDDest,nbAdultes,nbEnfants,debut,fin,animal,dejeuner,classe){
  console.log("Nombre adultes : "+nbAdultes);
  console.log("Nombre enfants : "+nbEnfants);
  let nbP = nbAdultes + 0.4*nbEnfants; // un efant paye 40% du prix d'un adulte
  console.log("Nombre personnes : "+nbP);
  console.log("Date début : "+debut);
  console.log("Date fin"+fin);
  let nbJour =  Math.floor((Date.parse(fin)-Date.parse(debut))/1000.0/60.0/60.0/24.0); // par défaut en ms on converti donc en jour
  console.log("Nombre de jour : "+nbJour);
  let nbTotal = nbP * nbJour;
  let prixParPersonne=destinations[IDDest][3]
  console.log("prix de base : "+prixParPersonne);
  if (dejeuner=="Oui") {    
    prixParPersonne=prixParPersonne+12; // on ajoute 12 euros par jour et par personne
    console.log("Petit déjeuner inclus");
  }    
  if (classe=="classique")
  {
    prixParPersonne=prixParPersonne*1.2; // on ajoute 20% du prix pour chaque personne
    console.log("Classe classique");
  }
  if (classe=="premium")
  {
    prixParPersonne=prixParPersonne*1.5; // on ajoute 50% du prix pour chaque personne
    console.log("Classe premium");
  }
  let prixTotal = +nbTotal*prixParPersonne; 
  if (animal=="Oui") {    
    prixTotal=prixTotal+5*nbJour; // on ajoute 5 euros par jour 
    console.log("Avec animal de compagnie");
  }  
  return Math.ceil(prixTotal);
}
//Fin du calcul

//Partie filtrage

//Fonction qui affiche les filtres 
function activeFiltrage(){
  document.getElementById("filtrage").hidden = !(document.getElementById("filtrage").hidden);
}

//Fin partie filtrage

//Fonction qui remet le formulaire à sa configuration par défaut 
function resetFormulaire(){
  document.getElementById("formulaire").reset();
  remplirParDefautFormulaire();  
}

//Fonction qui rempli grâce au éléments du formulaire la page récapitulatif
function ajouteLigne(){
  console.log("recap")
  // genere un nombre aléatoire pour la reservation
  let idVoyage = Math.floor(Math.random() * Math.floor(10000))+10000;
  n=new window.URLSearchParams(window.location.search)

  const fnom = n.get("nom");
  const fprenom = n.get("prenom");
  const fdest = n.get("Choix");
  const fnbAdulte = n.get("nbadultes");
  const fnbEnfant = n.get("nbenfants");
  const fdateDepart = n.get("datedepart");
  const fdateRetour = n.get("dateretour");
  const ffaireAnimal = n.get("animal");
  const ffairePetitDejeuner = n.get("petitdej");
  const ftypeClasse = n.get("classe");

  let chaine="Votre numéro de réservation est le suivant : "+idVoyage;
  let labelTemp = document.getElementById("idReservation")
  labelTemp.innerHTML = chaine ;

  chaine = "Ce numéro est à rappeler dans toutes vos demandes.";
  labelTemp = document.getElementById("recap0")
  labelTemp.innerHTML = chaine ;
  
  
  let recap1 = document.getElementById("recap1")
  chaine="Bonjour " + fnom +" "+ fprenom +" ";
  chaine = chaine + "vous avez réservé un voyage pour "+fnbAdulte+" adulte(s) et "+fnbEnfant+" enfant(s) à ";
  chaine = chaine + destinations[fdest][0] + " du "+fdateDepart+" au "+fdateRetour;
  recap1.innerHTML = chaine ;
  
  let recap2 = document.getElementById("recap2")
  chaine="Le montant total à payer est de " + calculerPrix(fdest,fnbAdulte, fnbEnfant, fdateDepart, fdateRetour, ffaireAnimal, ffairePetitDejeuner,ftypeClasse)+ " €";
  recap2.innerHTML = chaine ;
  
  let recap3 = document.getElementById("recap3")
  chaine="La prestation comprends un voyage en classe " + ftypeClasse;
  if (ffairePetitDejeuner=="Oui") {
    chaine = chaine + ", petit-déjeuner compris"
  } else {
    chaine = chaine + ", sans petit-déjeuner"
  }
  if (ffaireAnimal=="Oui") {
    chaine = chaine + ", avec animal de compagnie"
  }
  recap3.innerHTML = chaine ;
}

// fonction qui affcihe la video youtube de presentation de la ville
function entreSVG(idDestination, element) {
  document.getElementById(element).setAttribute("fill","red");
  document.getElementById("video").hidden=false 
  document.getElementById("video").src="https://www.youtube.com/embed/"+destinations[idDestination][5]+"?autoplay=1"
}

// fonction qui cache la video youtube de presentation de la ville
function sortSVG(element) {
  document.getElementById(element).setAttribute("fill","transparent"); 
  document.getElementById("video").hidden=true
}

