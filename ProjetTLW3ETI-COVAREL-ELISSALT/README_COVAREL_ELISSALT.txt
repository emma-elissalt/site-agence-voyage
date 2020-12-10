Le but de ce projet est de réaliser un projet de site web qui nous aurait été commandé par une agence de voyage.

C'est un travail en binome dans le cadre de la formation :

CPE Lyon - 3ETI - 2020-2021

Techniques et Langages du Web



Les pages sont codés en HTML, javaScript et css.



Installation :

Il suffit de recopier le répertoire à l'endroit désiré par l'utilisateur et surtout de le DE ZIPPER sinon il affiche N'IMPORTE QUOI 



Démarrage:

Pour commencer, il suffit d'ouvrir PremierePage.html soit à partir d'un navigateur, soit en double cliquant dessus.



Fichiers:

PremierePage.html - Page principal du site 
    --> pour les filtres : l'utilisiateur peut chosir le prix par jour TOTAL maximum qu'il souhaite, selon le nombre de personnes
                            et le prix choisi, les destinations qui ne correspondent plus aux critères "disparaissent"

Recapitulatif.html - Page affichant la commande passée --> cette page n'est accessible qu'à partir de la page Formulaire, donc une fois que le client a rentré les informations nécéssaires

Formulaire.html - Page de saisie des informations relatives au voyage ( réservation du voyage--> cette page n'est accessible que lorsque l'utilisateur s'est connecté.
                    --> l'utilisateur se connecte grace a la mini base de données créer dans le code javascript ( fonction ValiderLogin)

Contact.html - Page contenant les informations pour contacter l'agence de voyage

Carte.html - Page contenant une carte du monde avec les destinations proposées par l'agence.
            --> lorsque l'on survole la carte avec la souris, un point rouge apparait quand on est sur une de nos destinations,
                une video youtube faisant la promotion de cette destination se met en route automatiquement.


PremierePage.css - Les styles de toutes les pages sont regroupés dans une seule page

PremierePage.js - Tout le code javascript est contenu dans un seul fichier.

les images sont stockées dans le répertoire Image



Choix:

Pour permettre de garder la connexion d'un utilisateur entre 2 pages, il a été choisi de stocker les informations dans 

la session de l'explorateur plutôt que d'avoir recours au cookie:

Exemple de commande permettant de récupérer le nom de l'utilisateur loggé (si il y en a un).

nom=sessionStorage.getItem("nom");

Choix d'une destination : l'utilisateur peut soit cliquer directement sur l'image de la destination qu'il veut,  soit les trier 
                        avec les filtres, soit en survolant la carte et en regardant les vidéos de présentation, ou alors directement
                        dans l'onglet réservation ( pour y accéder je rappel qu'il faut s'être loggé avant).




Dépendance:

L'API weathermap est utilisé pour récupérer les informations de météo.

Le script :

https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js 

et

la feuille de style 

https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css

sont utilisés pour pouvoir remonter en haut de la page.

Accéssibilité : Nous avons essayer d'utiliser au maximum les balises de type h1,h2 ... par exemple, avec des titres explicites pour 
                pour qu'un utilisateur malvoyant par exemple puisse s'en sortir. Nous avons téléchargé le logiciel NVDA qui sert aux
                personnes malvoyantes à "écouter les sites web" et aprés l'avoir tester, meme si tout n'est pas parfait , au survol de la souris 
                les informations principales sont bien énoncé par le logiciel. (il nous a manqué de temps dans cette derniére séance 
                pour l'approfondir comme on le souhaitait en utilisant plus de balises faites exprés pour ca)

Auteurs :

Adrien COVAREL
Emma ELISSALT

.....



Versions :

1.0