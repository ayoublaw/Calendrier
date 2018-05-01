//les variables des selections
var $=document.querySelector('#calendar');
var n = document.getElementById("next");
var p = document.getElementById("prev");
var dete=document.querySelector('#dete');
var modal = document.getElementById('myModal');

//Des variables pour code
var tabi;
var tabj;
var tab=[];
var d = new Date();
var ans= d.getYear();
var jour = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var moi = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
var i;
var j;
var hr = new Date('August 19, 2018 00:00:00');

d.setDate(d.getDate()-d.getDay());

//affichage de calendrier
function calendrier(d,div){
	dete.innerHTML=moi[d.getMonth()]+" "+d.getFullYear();
	div.innerHTML='';
    let table=document.createElement('table');
    let par=div.appendChild(table);
    for ( i = 0 ; i < 49 ; i++) {
      tab[i]=[]
      //x = par.appendChild(document.createElement('tr'));
       tr= document.createElement('tr');
	   par.appendChild(tr);
      for ( j = 0 ; j < 8 ; j++) {
       // tab[i][j]=x.appendChild(document.createElement('td'));
        let td=document.createElement('td');

        tab[i][j]=td;
		tr.appendChild(td);
        var nd = new Date;

        if (j==0 && i!=0)
        {      

          var nH = pad(hr.getHours());
          var nM = pad(hr.getMinutes());
		  
          if(nM==0){
            hr.setMinutes(30);}
          else{
            hr.setMinutes(60); }
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
		  td.setAttribute("date_debut",pad(nd.getFullYear())+"-"+pad(nd.getMonth())+"-"+pad(nd.getDate()));
        }
        else{
			
			tab[i][j].className='evenement';
            tab[i][j].addEventListener("click", action);

        }
      tab[i][j].dataset.column=j;
      tab[i][j].dataset.row=i; 
	  tab[i][j].dataset.rows=i+1; 
      }
	 
    }
}

//affichage du formulaire
function action(){
    if( modal.style.display == "block"){
        modal.style.display="none";
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

//
function pad(number) { 
  return (number < 10 ? '0' : '') + number 
}
   


calendrier(d,$);

//changement de semaine
n.onclick= nextWeek;
p.onclick= prevWeek;
function nextWeek(){
	
	
	var res = d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
	d = new Date(res);
	calendrier(d,$);
		
}
function prevWeek(){
	var res = d.setTime(d.getTime() - (7 * 24 * 60 * 60 * 1000));
	d = new Date(res);
	calendrier(d,$);
}

//annuler la formulaire d'ajout
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
  tab[tabi][tabj].className='evenement';
  console.log("row",event.target.dataset.row);
    
}

/*
*****Traitement AJAX ********
*/

// Ajoutage
function AjouterEvent(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      document.getElementById("demo").innerHTML =
      "<p>"+this.response+"</p>";
        modal.style.display = "none";
      }
    };
    console.log('titre='+document.getElementsByName('titre')[0].value
             +'&row='+document.getElementsByName('row')[0].value
             +'&ligne='+document.getElementsByName('ligne')[0].value
             +'&date='+document.getElementsByName('date')[0].value
             +'&heurefin='+document.getElementsByName('heurefin')[0].value
             +'&heuredebut='+document.getElementsByName('heuredebut')[0].value
               );
    xhr.open('POST', '/ajouter');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('titre='+document.getElementsByName('titre')[0].value
             +'&row='+document.getElementsByName('row')[0].value
             +'&ligne='+document.getElementsByName('ligne')[0].value
             +'&date='+document.getElementsByName('date')[0].value
             +'&heurefin='+document.getElementsByName('heurefin')[0].value
             +'&heuredebut='+document.getElementsByName('heuredebut')[0].value
            );
}

