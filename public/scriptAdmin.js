var table = document.getElementById("tableUser");
var imggoodSrc = "/public/good.png";
var imgbadSrc = "/public/bad.png";
var imggoodID = "good";
var imgbadID = "bad";

function chargerRoles(){
  var xhr = new XMLHttpRequest();
               
  xhr.open('GET', '/chargeuser' );

  xhr.onload = function() {
    var liste = xhr.response;
    for (var i = 0; i < liste.length; i++) {
      let tr=document.createElement('tr');
        table.appendChild(tr);
        for(prop in liste[i]){
            let td=document.createElement('td');  
            tr.appendChild(td);
            if(prop == "login"){
              td.innerHTML = liste[i][prop];
            }
            else{
                if(liste[i][prop] ){
                    let image = document.createElement('img');
                    td.appendChild(image);
                    image.src=imggoodSrc;
                    image.setAttribute("id",imggoodID);
                    image.dataset.login=liste[i]["login"];
                    image.dataset.colone=prop;
                    image.dataset.valeur=liste[i][prop];
                    image.onclick = changerRooles ;

                }
                else{
                    let image = document.createElement('img');
                    td.appendChild(image);
                    image.src=imgbadSrc;
                    image.setAttribute("id",imgbadID);
                    image.dataset.login=liste[i]["login"];
                    image.dataset.colone=prop;
                    image.dataset.valeur=liste[i][prop];
                    image.onclick = changerRooles;
                }
            }
        }
    }
  }
  xhr.responseType = 'json';
  xhr.send();
}
function changerRooles(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        while (table.childNodes.length > 2) {
            table.removeChild(table.lastChild);
        }
        chargerRoles();
      }
    };
    
    xhr.open('POST', '/changeUserRole');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('login='+event.target.dataset.login
             +'&colone='+event.target.dataset.colone
             +'&valeur='+event.target.dataset.valeur
            );
}
chargerRoles();