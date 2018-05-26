## **Projet AWS " *Calendrier de gestion d’événements *"**

**La structure de notre projet est la suivante:**

	

 - Une base de données (calendrie.db) : **database.js**

		Elle contient les différentes tables dont on a besoin pour notre projet :
			-une table pour les utilisateurs (users),
			-une table pour les événements (events).
            -le user admin (admin,12345).
		

 - Un serveur : **server.js**

		Il contient les configurations ainsi que nos routes découpées en gestionnaires, ils sont au nombre de 10:

		Route /: (GET) représente notre page principale d'accueil
		Route /calender/:c' : (GET) affiche le calendrier selon celui choisi.
		Route /signin : (POST ET GET) permettant de créer un nouvel utilisateur(POST ET GET). Redirige vers / après une inscription réussie.
		Route /signup : (POST ET GET) permettant de se connecter. Redirige vers / après un login réussi.
		Route /signout : (GET) permettant de se déconnecter. Redirige vers / après un signout réussi.
		Route /ChargeSemaine : (GET) permettant de remplir les dates au niveau du calendrier lorsque l'utilisateur veut se positionner sur la semaine suivante ou précédente relativement à la semaine ou il se trouve , il renvoit la liste des événements au format JSON (Par AJAX).
        Route /ajouter : (POST) permettant d’ajouter un événement, retourne succée si l'ajout est réussis, erreur le cas contraire **#AJAX**
		Route /modifier : (POST) permettant de modifier un événement . retourne succeé si la modification est réussite, erreur le cas contraire **#AJAX**
		Route /supprimer : (POST) permettant de supprimer un événement ,retourne succeé si la suppression est réussite, erreur le cas contraire **#AJAX**
        Route /admin : (GET) Affiche la liste des comptes utilisateurs si l'utilisateur est un administrateur,sinon il le redirige vers / . 
        Route /chargeuser : (GET) renvoie un Objet JSON qui contient tous les comptes utilisateurs **#AJAX**
        Route /ChangeuserRole : (POST) Permettant de changer niveau d'accés d'un utilisateur **#AJAX**


 - Une page d'accueil : **index.html**
 - Une page de connexion : **login.html** 	  //*Formulaire de connexion*
 - Une page d'inscription : **signin.html**     // *Formulaire
   d'inscription*
 - Une page principale : **accueil.html**  // *Le Calendrier Choisit*
 - Une page de gestion : **app.js**        //*Dans lequel figure nos différents fonction pour la  gestion des interactions entre notre application et le client.*
 - Un fichier **package-lock.json** //*Qui nous permet de recharger notre serveur de manière automatique.*
 - Un fichier **package.json**    //*Contenant les packages utilisés.*
 - Un fichier **script.js**      //*Contient les différentes fonction *"création du calendrier,ajout,suppr,modif"* pour la gestion des interactions entre notre application et le client.*
 - Un fichier **sciptAdmin.js** //*Contient les fonctions AJAX pour charger et changer les niveaux d'accés des utilisateurs*
 - liste des calendrier : **calenderList.html**
 - Des feuille de style CSS.

============================================================================================================================================

Les instructions pour lancer le projet :
--------------------------------------

  **Les instructions techniques:**
  
  - Installation de serveur nodeJS et MySQL
  - execution de la commande npm install
  - Change host,user et mot de passe de MySQL sur app.js ligne 24.
  - execution de la commande node database.js pour crée les tables de la base de données et l'utilisateur admin(admin,12345)

Au lancement du projet y'a la page index ou l'utilisateur peut choisir sois de se connecter grâce au bouton **connexion** ou de s'inscrire  grâce au bouton **S'inscrire**
Une fois connecté vous pouvez choisir quel calendrier choisir ,après sa vous aurez accès a se dernier et le visualisé .
alors vous avez la possibilités créer un événement sur une case, renseigner la description et cliquer sur enregistrer ( *la date et l'heure pour ce type d'événements est prédéfinie selon la case sélectionné* ).
Une fois l'événement créé vous pouvez le visualiser sur le tableau automatiquement grâce a **"AJAX"**.

 - **Pour modifier** un événement vous pouvez cliquer sur l'événement et sur le bouton modifier ( *image modification* ), la modification
   concerne juste la description de l'événement.Seul le créateur de
   l'événement a le droit de le Modifier.
 - **Pour supprimer** un événement vous pouvez cliquer sur le boutton supprimer(image supprimer), seul le créateur de l'événement a le   
   droit de le supprimer.
   
Si vous connecter avec l'utilisateur admin vous pouvez acceder a l'url /admin pour voir les comptes utilisateurs, et vous pouvez changer les niveaux d'accés si vous cliquer sur l'image  (croix ou valider).

*L'admin* ( **login : admin / Mot de passe : 12345** ) a le droit de modifier/supprimer/ajouter les événements de tout le monde.