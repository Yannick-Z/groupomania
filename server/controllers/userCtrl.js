const modelUser = require("../models/userModel");
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const querySql = require('../config/querySql'); 


module.exports = {


    register: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) return sendError(500, err, res);
            db.query(
               querySql.register, [username, hash, 'user'],
                (err, results) => {
                    if (err) return sendError(403, err, res);
                    console.log(results);
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
            // "SELECT * FROM Users WHERE username = ?",
            querySql.login, [username],
            (err, results) => {
                if (err) return sendError(403, err, res);
                if (results[0]=== undefined) return sendError(401, {"msg":"user or password didn't matched"}, res);
                console.log("--------------------",results[0]);
                const user = results[0];
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err)
                        return sendError(500, { loggedIn: false, message: "Wrong username/password combo" }, res);

                    res.json({
                        loggedIn: true,
                        username: username,
                        password: password,
                        id: user.id,
                        role: user.role,
                        token: jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '24' })
                    });
                })
            });
    },

    loginWithToken: (req, res) => {
        res.json({ loggedIn: true })

    }
}


function sendError(status, msg, res) {
    console.error("error", msg);
    res.status = status;
    res.json({ ...msg });
}