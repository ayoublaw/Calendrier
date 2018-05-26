//Des variables pour récuperer les balises.
var calendar=document.querySelector('#calendar');
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var dete=document.querySelector('#dete');
var modal = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');

//Des variables pour le code.
var tabi;
var tabj;
var tab=[];
var date = new Date();
var jour = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
var heure = new Date('August 19, 2018 00:00:00');

// On change d de le jour actuelle a le premier jour de la semaine actuelle.
date.setDate(date.getDate()-date.getDay());

//affichage de calendrier
function calendrier(d,div){
	dete.innerHTML=mois[d.getMonth()]+" "+d.getFullYear();
	div.innerHTML='';
    let table=document.createElement('table');
    let par=div.appendChild(table);
    for (var i = 0 ; i < 49 ; i++) {
      tab[i]=[]
       tr= document.createElement('tr');
	   par.appendChild(tr);
      for (var j = 0 ; j < 8 ; j++) {
        let td=document.createElement('td');

        tab[i][j]=td;
		tr.appendChild(td);
        var nd = new Date(d);

        if (j==0 && i!=0)
        {      

          var nH = pad(heure.getHours());
          var nM = pad(heure.getMinutes());
		  
          if(nM==0){
            heure.setMinutes(30);}
          else{
            heure.setMinutes(60); }
          tab[i][j].innerHTML =nH+':'+nM;
		  tab[i][j].className='heure'
		  tab[i][j].setAttribute("datefin",nH+":"+nM);
		  
        }
        else if (i==0 && j != 0)
        {
          nd.setDate(d.getDate()+(j-1));
          nd.toLocaleDateString();
          var ch = d.getDay()+(j-1);
          if (ch>=7){
              ch=ch-7;
          }
		  tab[i][j].className='jour'
          var jo = nd.getDate();
          var n = jour[ch];
          tab[i][j].innerHTML = ''+n+' '+jo;
		  td.setAttribute("date_debut",pad(nd.getFullYear())+"-"+pad(nd.getMonth()+1)+"-"+pad(nd.getDate()));
        }
        else{
			tab[i][j].className='evenement';
            tab[i][j].onclick=action;

        }
      tab[i][j].dataset.column=j;
      tab[i][j].dataset.row=i; 
	  tab[i][j].dataset.rows=i+1; 
      }
	 
    }
    Chargerevenement(d);
}

//affichage et remplissage du formulaire d'ajout
function action(){
    if( modal.style.display == "block" || modal2.style.display == "block"){
        modal.style.display="none";
        modal2.style.display="none";
        tab[tabi][tabj].className='evenement';
    }
    else{
		modal.style.display='block';
	    document.getElementById("datefin").value =tab[event.target.dataset.rows][0].getAttribute("datefin") ; 
        document.getElementById("datedeb").value =tab[event.target.dataset.row][0].getAttribute("datefin") ; 
		document.getElementById("datte").value =tab[0][event.target.dataset.column].getAttribute("date_debut") ;
        document.getElementById("row").value=event.target.dataset.row;
        document.getElementById("ligne").value=event.target.dataset.column;
		tab[event.target.dataset.row][event.target.dataset.column].className='clic';
			  tabi=event.target.dataset.row;
			  tabj=event.target.dataset.column;
    }
}

//affichage et remplissage du formulaire de modification et suppression.
function actionModSup(){
    if( modal.style.display == 'block' || modal2.style.display == 'block'){
        modal.style.display="none";
        modal2.style.display="none";
        tab[tabi][tabj].className='evenement';
    }
    else{
		modal2.style.display='block';
        document.getElementById("area2").value = tab[event.target.dataset.row][event.target.dataset.column].children[0].innerHTML;
	    document.getElementById("datefin2").value =event.target.dataset.heurefin; 
        document.getElementById("datedeb2").value =event.target.dataset.heuredebut ; 
		document.getElementById("datte2").value =event.target.dataset.datedebut ;
        document.getElementById("row2").value=event.target.dataset.row;
        document.getElementById("ligne2").value=event.target.dataset.column;
		tab[event.target.dataset.row][event.target.dataset.column].className='clic';
        tabi=event.target.dataset.row;
        tabj=event.target.dataset.column;
        if( (ModifactionAccess != 0 && tab[event.target.dataset.row][event.target.dataset.column].children[0].innerHTML == userLogin) || Administrationuser != 0){
            document.getElementById("modif").disabled = false;
            document.getElementById("area2").disabled = false;
        }
        else{
            document.getElementById("modif").disabled = true;
            document.getElementById("area2").disabled = true;
        }
        if( (SuppressionAccess !=0 && tab[event.target.dataset.row][event.target.dataset.column].children[0].innerHTML == userLogin) || Administrationuser != 0){
            document.getElementById("corb").disabled = false;
        }
        else{
            document.getElementById("corb").disabled = true;
        }
    }        
}

//function pour ajouter les zero gauches a les mois et jours 
function pad(number) { 
  return (number < 10 ? '0' : '') + number 
}

// on fait appelle a la fonction calendrier 
calendrier(date,calendar);

//changement de semaine
next.onclick= nextWeek;
prev.onclick= prevWeek;
function nextWeek(){
	
	
	date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
	calendrier(date,calendar);
		
}
function prevWeek(){
	var res = date.setTime(date.getTime() - (7 * 24 * 60 * 60 * 1000));
	date = new Date(res);
	calendrier(date,calendar);
}

//annuler la formulaire d'ajout
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
  tab[tabi][tabj].className='evenement';
    
}
//annuler la formulaire de modification et suppression. 
var span2 = document.getElementById("close");
span2.onclick = function() {
  modal2.style.display = "none";
  tab[tabi][tabj].className='evenement';
    
}

/*
*****Traitement AJAX ********
*/

// envoie de requette ajax pour ajouter l'evenement et on recoit le reponse ("Succes" ou "Erreur")
function AjouterEvent(){
    var hd = parseInt(document.getElementsByName('heuredebut')[0].value.split(":")[0]);
    var hf = parseInt(document.getElementsByName('heurefin')[0].value.split(":")[0]);
    var md = parseInt(document.getElementsByName('heuredebut')[0].value.split(":")[1]);
    var mf = parseInt(document.getElementsByName('heurefin')[0].value.split(":")[1]);
    if(hd>hf ||(hd==hf && md>mf)){
       document.getElementById("demo").innerHTML =
      "<p class='Erreur'>Heure debut superieur a heure de fin</p>"; 
    }
    else{
    var nombreCaree = (hf*2) - (hd*2);
    nombreCaree = (mf==30) ? nombreCaree+1 : nombreCaree;
    nombreCaree = (md==30) ? nombreCaree-1 : nombreCaree;
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      document.getElementById("demo").innerHTML =
      "<p class='Succes'>"+this.response+"</p>";
        modal.style.display = "none";
        calendrier(date,calendar);
      }
    else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
        document.getElementById("demo").innerHTML =
      "<p class='Erreur'>"+this.response+"</p>";
    }
    };
    
    xhr.open('POST', '/ajouter');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('titre='+document.getElementsByName('titre')[0].value
             +'&row='+document.getElementsByName('row')[0].value
             +'&ligne='+document.getElementsByName('ligne')[0].value
             +'&date='+document.getElementsByName('date')[0].value
             +'&heurefin='+document.getElementsByName('heurefin')[0].value
             +'&heuredebut='+document.getElementsByName('heuredebut')[0].value
             +'&calendername='+name
             +'&nombredeCaree='+nombreCaree

            );
}
}

// on charge les evenments de la semaine 
function Chargerevenement(d){

  var date_d = encodeURIComponent(pad(d.getFullYear())+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()));
  var der = new Date();
  der.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
  var date_f = encodeURIComponent(pad(der.getFullYear())+"-"+pad(der.getMonth()+1)+"-"+pad(der.getDate()));
  var xhr = new XMLHttpRequest();
               
  xhr.open('GET', '/ChargeSemaine'
    + '?datedebut=' + date_d + '&datefin=' + date_f+ '&calendername=' + name );

  xhr.onload = function() {
    var liste = xhr.response;
    for (var i = 0; i < liste.length; i++) {
      let p1=document.createElement('p');
      let p2=document.createElement('p');  
        p1.innerHTML=liste[i].titre;
        p2.innerHTML=liste[i].login_user;
      tab[liste[i].row][liste[i].ligne].appendChild(p1);
      tab[liste[i].row][liste[i].ligne].appendChild(p2);
        
        for(var k = 0;k < liste[i].nombredeCarre; k++){
          tab[liste[i].row+k][liste[i].ligne].dataset.heuredebut = tab[liste[i].row][0].getAttribute("datefin"); 
          tab[liste[i].row+k][liste[i].ligne].dataset.heurefin = tab[liste[i].row+liste[i].nombredeCarre][0].getAttribute("datefin"); 
          tab[liste[i].row+k][liste[i].ligne].dataset.datefin = tab[0][liste[i].ligne].getAttribute("date_debut");
          tab[liste[i].row+k][liste[i].ligne].dataset.datedebut = tab[0][liste[i].ligne].getAttribute("date_debut");             
          tab[liste[i].row+k][liste[i].ligne].onclick=actionModSup;
          tab[liste[i].row+k][liste[i].ligne].style.background="gray";
        }
        
    }
  }
  xhr.responseType = 'json';
  xhr.send();
}

// envoie de requette ajax pour modifier l'evenement et on recoit le reponse ("Succes" ou "Erreur")
function Modificationevent(){
     var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      document.getElementById("demo").innerHTML =
      "<p class='Succes'>"+this.response+"</p>";
        modal2.style.display = "none";
        calendrier(date,calendar);
      }
    else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
        document.getElementById("demo").innerHTML =
      "<p class='Erreur'>"+this.response+"</p>";
    }
    };
    
    xhr.open('POST', '/modifier');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('titre='+document.getElementsByName('titre2')[0].value
             +'&row='+document.getElementsByName('row2')[0].value
             +'&ligne='+document.getElementsByName('ligne2')[0].value
             +'&date='+document.getElementsByName('date2')[0].value
             +'&heurefin='+document.getElementsByName('heurefin2')[0].value
             +'&heuredebut='+document.getElementsByName('heuredebut2')[0].value
                          +'&calendername='+name
            );
}

// on affiche une alerte pour confirmation de supprission de l'evenment
function SuppressionConfirmation() {
    if (confirm("Voulez-vous vraiment supprimer cette evenement ?")) {
         Suppression(); 
    }
}

// envoie de requette ajax pour supprimer l'evenement et on recoit le reponse ("Succes" ou "Erreur")
function Suppression(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      document.getElementById("demo").innerHTML =
      "<p class='Succes'>"+this.response+"</p>";
        modal2.style.display = "none";
        calendrier(date,calendar);

      }
    else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
        document.getElementById("demo").innerHTML =
      "<p class='Erreur'>"+this.response+"</p>";
    }
    };
    
    xhr.open('POST', '/supprimer');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('titre='+document.getElementsByName('titre2')[0].value
             +'&row='+document.getElementsByName('row2')[0].value
             +'&ligne='+document.getElementsByName('ligne2')[0].value
             +'&date='+document.getElementsByName('date2')[0].value
             +'&heurefin='+document.getElementsByName('heurefin2')[0].value
             +'&heuredebut='+document.getElementsByName('heuredebut2')[0].value
                          +'&calendername='+name
            );
    
}

