
var $=document.querySelector('#calendar');

var n = document.getElementById("next");
var p = document.getElementById("prev");
let tab=[];
var dete=document.querySelector('#dete');
var modal = document.getElementById('myModal');

let tabi;
let tabj;
var date = new Date();
var ans= date.getYear();
var jour = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var moi = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");



//var j=0;

var d = new Date;
d.setDate(d.getDate()-d.getDay());
 var i;
    let j;
    let x;
    //let tab[i][j];
	let hr = new Date('August 19, 2018 00:00:00');
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
            hr.setMinutes(60);
			
          }
		  
       
    
          tab[i][j].innerHTML = nH+':'+nM;
		  tab[i][j].className='heure'
		  tab[i][j].setAttribute("datedeb",nH+":"+nM);
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
         // tab[i][j].textContent = "bye";
          tab[i][j].addEventListener("click", action);

        }
		 tab[i][j].dataset.column=j;
      tab[i][j].dataset.row=i; 
	  tab[i][j].dataset.rows=i+1; 
      }
	 
    }

  

}

function action(){
			 
		//var w=window.open("index2.html","pop","menubar=no, status=no, scrollbars=no, menubar=no, width=400, height=480");	  
		modal.style.display='block';
		  document.getElementById("datefin").value =tab[event.target.dataset.rows][0].getAttribute("datefin") ; 
		  document.getElementById("datedeb").value =tab[event.target.dataset.row][0].getAttribute("datedeb") ; 
		document.getElementById("datte").value =tab[0][event.target.dataset.column].getAttribute("date_debut") ; 
		tab[event.target.dataset.row][event.target.dataset.column].className='clic';
			  tabi=event.target.dataset.row;
			  tabj=event.target.dataset.column;
			  
			  }
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
	  tab[tabi][tabj].className='evenement';
}}
function pad(number) { 
  return (number < 10 ? '0' : '') + number 
}
   

 
  




function remplir_heure_deb_fin(c)
{

  
 // document.getElementById("heurefin").value = this.tableau[tabi][tabj].getAttribute("heure_fin"); 

}
  
 

$.addEventListener('click',action);

calendrier(d,$);


n.onclick= nextWeek;
function nextWeek(){
	
	
	var res = d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
	d = new Date(res);
	calendrier(d,$);
		
}
p.onclick= prevWeek;
function prevWeek(){
	var res = d.setTime(d.getTime() - (7 * 24 * 60 * 60 * 1000));
	d = new Date(res);
	calendrier(d,$);
}