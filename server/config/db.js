const mysql = require('mysql');

const db = mysql.createConnection({ //Lien connexion base de données
    host     : process.env.HOST, //
    user     : process.env.USER, 
    password : process.env.PASSWORD, //MDP base de données
    database : process.env.DATABASE 
  
});

module.exports = db;