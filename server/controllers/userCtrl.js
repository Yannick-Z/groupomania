const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const querySql = require('../config/querySql');




module.exports = {

    register: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if(password ==='') return res.status(400).send('le mot de passe ne peut pas être vide');

        bcrypt.hash(password, 10, function (err, hash) { //Hash le mot de passe
            if (err) return sendError(500, err, res);
            db.query(
                querySql.register, [username, hash, 'user'], //Insere le user dans la BDDQ
                (err, results) => {
                    console.log(results);
                    res.send(results);
                }

            );
        });

    },

    login: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        db.query(
            querySql.login, [username, password], //Recupere les information user
            (err, results) => {
                if (err)
                    return sendError(403, err, res);
                if (results[0] === undefined)
                    return sendError(401, { message: 'user or password didn\'t matched' }, res);
                console.log('---------', results[0]);
                const user = results[0];
                bcrypt.compare(password, user.password, function (err, result) { //On compare le mot de passe 
                    if (result) {
                        res.json({
                            loggedIn: true,
                            username: username,
                            password: password,
                            id: user.id,
                            role: user.role,
                            token: jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '24h' })
                        });
                    } else {
                        return sendError(403, { loggedIn: false, message: 'Wrong username/password combo' }, res); // Si le mot de passe est diff"rent alors on nous retourne un message
                    }
                });
            });
    },


    deleteUser: (req, res,) => { //Permet de supprimer un user de la page profile
        try {
            const id = req.body.userToDelete;
            db.query(querySql.getUserInfo, [id], async (err, result) => { //permet de selectionner les posts dans la base de donnée
                if (err) throw (err);
                req.body.id = parseInt(req.body.id); console.log('....', result[0], req.body.id);
                if (result[0].id !== req.body.id) {
                    const role = await getRole(req.body.id);
                    console.log('role',role);
                    if (role.role !== 'admin') {  
                        throw (err);
                    }


                }
                console.log(result[0].id);
                db.query(querySql.deleteAccount, [result[0].id], (err, result) => { //Requete sql (cf query.SQL)
                    if (err) {

                        throw (err);

                    } else {
                        console.log('result', result);
                        res.send(result);
                    }
                });

            });
        } catch (err) {
            res.status(401)
                .send({ 'msg': err }); //Retourne erreur 401
        }

    },





    loginWithToken: (req, res) => {

        res.json({ loggedIn: true }); //On se log avec le token

    }

};







function sendError(status, msg, res) {
    console.error('error', msg);
    res.status = status;
    res.json({ ...msg });
}

async function getRole(id) { //fonction avec promesse pour le getRole, permets a l'admin de supprimer un user

    new Promise((resolve, reject) => {
        db.query(
            querySql.getUserInfo, [id],
            (err, results) => {
                return  err ?  reject(err) : resolve(results);  
            });
    });
}
