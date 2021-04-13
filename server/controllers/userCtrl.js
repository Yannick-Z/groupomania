const modelUser = require("../models/userModel");
const db = require('../config/db');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');


module.exports = {
    
    
    register: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err, hash){
        db.query(
            "INSERT INTO Users (username, password, role) VALUES (?, ?, ?);",
            [username, hash, 'user'],
            (err, results) => {
                console.log(err);
                console.log (results);
                res.send(results);
            }
        );
    })
    // db.query(
    //     "INSERT INTO Users (username, password, role) VALUES (?, ?, ?);",
    //     [username, password, 'user'],
    //     (err, results) => {
    //         console.log(err);
    //         console.log (results);
    //         res.send(results);
    //     }
    // );
},

login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM Users WHERE username = ?",
    [username], 
        (err, results) => {
            
            bcrypt.compare(password, results[0].password, function(err, result) {
                if (err) {
                    res.json({loggedIn: false, message: "Wrong username/password combo"});
                    

                } else {  
                    res.json({
                        loggedIn: true,
                        username: username,
                        password: password,
                        id :  user._id,                  
                        role : user.role,
                        token: jwt.sign({ userId : user._id}, process.env.SECRET, {expiresIn: '24'})
                        });
                }
            });
        //     if(err){
        //     console.log(err);
        // }
        // if (results.length > 0) {
        //     if (password == results[0].password){
        //         res.json({loggedIn: true, username: username});
        //     } else {
        //         res.json({loggedIn: false, message: "Wrong username/password combo"});
        //     }
                
        // } else {
           
        //     res.json({loggedIn: false, message: "doesn't exist"});
        // }
        
        }
    
    
    );


    },

    loginWithSession: (req,res) => {
        if (req.session.user) {
            res.send({ loggedIn: true, user: req.session.user})

        } else {
            res.send({loggedIn: false});
        }
    }
}
