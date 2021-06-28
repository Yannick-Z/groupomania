const jwt = require('jsonwebtoken'); //mis en place du package json web token


module.exports = (req, res, next) => {

    try {

        console.log(req.headers);
        if (!req.headers.authorization) throw ('pas de jeton'); //si pas de token alors return pas de jeton

        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }

        if (!req.body.id) throw ('l\'id n\'est pas défini'); //si pas d'id alors on retourne un message

        const token = req.headers.authorization.split(' ')[1];
      
        req.token = jwt.verify(token, process.env.SECRET);
        console.log(req.token);
        console.log(req.token.userId);
        if (req.token.userId != req.body.id) throw('les id ne sont pas bonnes'); //si le token est different de l'id alors erreur


        next();
    } catch (err) {
        console.error('error', err);

        res.status(401).json({ // erreur 401 non autorisé
            error: new Error('Invalid request!')
        });
    }
};