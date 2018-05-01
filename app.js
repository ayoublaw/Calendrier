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
    res.render('acceuil.html');
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
        password : req.body.passe
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
   };
    console.log(event);
    try{
    if (event.titre &&  await knex('event').insert(event)) {
      res.status(200).send("Succes");
    } else {
      res.send("Saisie tous les champs");
    }
    }catch(err){
        if(err.code == "ER_DUP_ENTRY"){
            res.send('Erreur : Evenement déjà remplie');
        }
      res.send("Erreur")
    }
    
});
var listener = app.listen(80, function () {
  console.log('application est en cours sur PORT ' + listener.address().port);
});
