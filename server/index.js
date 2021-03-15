const express = require ('express')
const app = express()
const mysql = require("mysql");
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'socialmedia'
});



app.get("/register", (req, res) => {
    db.query(
        "INSERT INTO Users (username, password) VALUES ('yannick', 'password');",
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    );
});

app.listen(3001, (req, res) => {
    console.log("server running");
});