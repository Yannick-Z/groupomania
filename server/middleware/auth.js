const jwt = require('jsonwebtoken');


module.exports =  (req, res, next) => {

    try {
        console.log("req.body", req);
        
         if (!req.headers.authorization) throw ("pas de jeton");
        if (!req.body.userId) {
            console.log(req.body);
            req.body = JSON.parse(req.body.data);
            console.log(req.body);
            if (!req.body.userId) throw ("l'id n'est pas défini");
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId !== userId) {
            throw 'Invalid user ID';
        }
        next();
    } catch (err) {
        console.error("error",err);
        
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};