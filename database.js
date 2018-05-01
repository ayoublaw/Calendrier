//configuration et initialisation de la connection
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'calendrier'
  }
});

//User's table 
async function init_users() 
{
  await knex.schema.dropTableIfExists('users');
  //création de la table user avec utilisation de raw SQL
  await knex.raw(`CREATE TABLE users(
  login VARCHAR(255) PRIMARY KEY NOT NULL,
  password VARCHAR(30) NOT NULL)`);

//Nous récupérons les informations sur chaque colonne de notre BD et on l'affiche avec console.log pour les utilisateurs
  var cols = await knex('users').columnInfo();
  console.log('Columns:', cols);  
  //Nous récupérons les informations sur chaque lignes(tuples) de notre BD et on l'affiche avec console.log pour les utilisateurs
  var rows = await knex('users');
  console.log('Rows:', rows);
  
}


async function init_events() 
{
  await knex.schema.dropTableIfExists('event');
  //création de la table event avec utilisation de raw SQL
  await knex.schema.createTable('event',function (table){
      table.increments('id');
      table.string('titre',255);
      table.time('heuredebut');
      table.time('heurefin');
      table.date('datedebut');
      table.date('datefin');
      table.integer('ligne');
      table.integer('row');
      table.string('login_user');
      table.string('calendername');
      table.unique(['heuredebut','heurefin','datedebut','datefin']);
      table.foreign('login_user').references('users.login');
  });
  //Nous récupérons les informations sur chaque colonne de notre BD et on l'affiche avec console.log pour les evenements
  var cols = await knex('event').columnInfo();
  console.log('Columns:', cols);  
  //Nous récupérons les informations sur chaque lignes(tuples) de notre BD et on l'affiche avec console.logpour les evenements
  var rows = await knex('event');
  console.log('Rows:', rows);
  
}  

init_users();
init_events();
