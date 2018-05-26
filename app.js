var express = require('express');
var nunjucks= require('nunjucks');
var bodyP = require('body-parser');
var session = require('express-session');
var app = express();

nunjucks.configure('views', {
    express: app
});

app.use(bodyP.urlencoded({ extended: false }));
app.use(bodyP.json());


app.use(session({
    secret: 'calendrier',
    resave: false,
    saveUninitialized: false,
}));

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'calendrier'
  }
});

app.use('/public', express.static('public'))

app.get('/',function(req,res){
    if(req.session.user){
    res.render('calendarList.html');
    }
    else{
        res.render('index.html');
    }
});
app.get('/calender/:c',function(req,res){
    if(req.session.user){
    res.render('acceuil.html',{'name':req.params.c,'user':req.session.user});
    }
    else{
        res.render('index.html');
    }
});
app.get('/signup',function(req,res){
    if(req.session.user){
        res.redirect('/')
    }
    else{
    res.render('signup.html');
    }
})
app.post('/signup',async function(req,res){
     var user = {
        login : req.body.login,
        password : req.body.passe,
        administration : false,
        Creation : true,
        Modification : false,
        Suppression : false  
    }
    try {
    if (user.login && user.password &&  await knex('users').whereNot({login:user.login}).insert(user)) {
      req.session.user=user;
      res.redirect('/');
    } else {
      res.render('signup.html', { user: user, message: 'saisie login et Mot de passe' });
    }
  } catch (err) {
    if (err.code == 'ER_DUP_ENTRY') {
      res.render('signup.html', { user: user, message: 'user déja existe' });
    } else {
      console.error(err);
      res.status(500).send('Error');
    }
  }
})
app.get('/signin',function(req,res){
    if(req.session.user){
        res.redirect('/')
    }
    else{
    res.render('signin.html');
    }
})
app.post('/signin',async function(req,res){
    try{
    var user = await knex('users').where({
    login: req.body.login,
    password: req.body.password,
     }).first();
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.render('signin.html', { 
      login: req.body.login,
      message: 'login ou password pas juste',
    });
  }
    }catch(err){
        console.log(err);
        res.status(500).send('Err');
    }
});
app.get('/signout',function(req,res){
   req.session.user = null;
    res.redirect('/');
});
app.post('/ajouter',async function(req,res){
    var event = {
       titre : req.body.titre,
       heuredebut : req.body.heuredebut,
       heurefin : req.body.heurefin,
       datedebut : req.body.date,
       datefin : req.body.date,
       ligne : req.body.ligne,
       row : req.body.row,
       login_user : req.session.user.login,
       calendername : req.body.calendername,
       nombredeCarre : parseInt(req.body.nombredeCaree),
   };
    try{
        if (event.titre){  
            await knex('event')
            .where(function() {
                 this.where(function(){
                     this.where('heuredebut','<',event.heuredebut).andWhere('heurefin','>',event.heuredebut)
                 })
                     .orWhere(function(){
                     this.where('heuredebut','<',event.heurefin).andWhere('heurefin','>',event.heurefin)
                 })
                     .orWhere(function(){
                     this.where('heuredebut','>',event.heuredebut).andWhere('heurefin','<',event.heurefin)
                 })
            })
            .andWhere({ datedebut : event.datedebut,datefin : event.datefin,calendername : event.calendername })
            .then(async function(rows){
                if(rows.length == 0){
                  await knex('event').insert(event);
                  res.status(200).send("Succes");
                }
                else{
                  res.status(500).send("Erreur : Evnement déjà remplie");
                }
            })        
    } else {
      res.status(500).send("Saisie tous les champs");
    }
    }
    catch(err){
        if(err.code == "ER_DUP_ENTRY"){
            res.status(500).send('Erreur : Evenement déjà remplie');
        }
      console.log(err);
      res.status(404).send("Erreur")
    }
    
});
app.get('/ChargeSemaine',async function(req,res){
    try{
        var donnes = await knex('event')
        .whereBetween('datedebut',[req.query.datedebut,req.query.datefin])
        .andWhere('calendername',req.query.calendername);
        res.json(donnes);
    }
    catch(err){
    console.log(err);
    res.status('500').send('err');    }
});
app.post('/modifier',async function(req,res){
   var event = {
       titre : req.body.titre,
       heuredebut : req.body.heuredebut,
       heurefin : req.body.heurefin,
       datedebut : req.body.date,
       datefin : req.body.date,
       ligne : req.body.ligne,
       row : req.body.row,
       login_user : req.session.user.login,
       calendername : req.body.calendername,

   };
    console.log(event);
    try{
      if( event.titre && await knex('event').where({'datedebut' : event.datedebut,
         'datefin' : event.datefin,
         'heuredebut' : event.heuredebut,
         'heurefin' : event.heurefin,
         'calendername' : event.calendername}).update('titre', event.titre))
      {
          res.status(200).send("Succes");
      }
        else{
            res.status(500).send("Erreur : rempliez tous les champs");
        }
    }catch(err){
        console.log(err);
        if(err.code == "ER_DUP_ENTRY"){
            res.status(500).send('Erreur : Evenement non trouvée');
        }
      res.status(404).send("Erreur")
    }
    
});
app.post('/supprimer',async function(req,res){
   var event = {
       titre : req.body.titre,
       heuredebut : req.body.heuredebut,
       heurefin : req.body.heurefin,
       datedebut : req.body.date,
       datefin : req.body.date,
       ligne : req.body.ligne,
       row : req.body.row,
       login_user : req.session.user.login,
       calendername : req.body.calendername,
   };
    console.log(event);
    try{
      if( await knex('event').where({'datedebut' : event.datedebut,
         'datefin' : event.datefin,
         'heuredebut' : event.heuredebut,
         'heurefin' : event.heurefin,
         'calendername' : event.calendername}).del())
      {
          res.status(200).send("Succes");
      }
        else{
            res.status(500).send("Erreur : rempliez tous les champs");
        }
    }catch(err){
        console.log(err);
        if(err.code == "ER_DUP_ENTRY"){
            res.status(500).send('Erreur : Evenement non trouvée');
        }
      res.status(404).send("Erreur")
    }});
app.get('/admin',function(req,res){
   if(req.session.user && req.session.user.administration){
       res.render("tableUser.html");
   } 
    else{
        res.redirect("/");
    }
});
app.get('/chargeuser',async function(req,res){
    try{
        var donnes = await knex('users').select('login','administration','Creation','Modification','Suppression');
        res.json(donnes);
    }
    catch(err){
    console.log(err);
    res.status('500').send('err');    }
});
app.post('/changeUserRole',async function(req,res){
    if(req.body.valeur == 1){
        var valeur = 0;
    }
    else{
         var valeur = 1;
    }
     try{
      if( await knex('users').where({'login' : req.body.login}).update(req.body.colone, valeur))
      {
          res.status(200).send("Succes");
      }
        else{
            res.status(500).send("Erreur");
        }
    }catch(err){
      console.log(err);
      res.status(404).send("Erreur")
    }
});

var listener = app.listen(80, function () {
  console.log('application est en cours sur PORT ' + listener.address().port);
});
