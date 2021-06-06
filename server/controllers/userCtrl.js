const modelUser = require("../models/userModel");
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const querySql = require('../config/querySql');


module.exports = {
    
    register: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
     
        bcrypt.hash(password, 10, function (err, hash) { //Hash le mot de passe
            if (err) return sendError(500, err, res);
            db.query(
                querySql.register, [username, hash, 'user'], //Insere le user dans la BDDQ
                (err, results) => {
                    console.log(results);
                    res.send(results);
                }

              );
            })            
        
        },

    login: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        db.query(
            querySql.login, [username], //Recupere les information user
            (err, results) => {
                if (err)
                    return sendError(403, err, res);
                if (results[0] === undefined)
                    return sendError(401, { message: "user or password didn't matched" }, res);
                console.log('---------', results[0]);
                const user = results[0];
                bcrypt.compare(password, user.password,  function (err, result) { //On compare le mot de passe 
                    if (result){
                    console.log('encours')
                     res.json({
                        loggedIn: true,
                        username: username,
                        password: password,
                        id: user.id,
                        role: user.role,
                        token: jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '24h' })
                    });
                 } else {
                        return sendError(403, { loggedIn: false, message: "Wrong username/password combo" }, res); // Si le mot de passe est diff"rent alors on nous retourne un message
                    }
                })
              });
    },




    loginWithToken: (req, res) => {
       res.json({ loggedIn: true }) //On se log avec le token

    }
 }


    function sendError(status, msg, res) {
         console.error("error", msg);
         res.status = status;
         res.json({ ...msg });
     }

