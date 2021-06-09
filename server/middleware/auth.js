const jwt = require('jsonwebtoken');


module.exports =  (req, res, next) => {

    try {
     
        console.log(req.body);
         if (!req.headers.authorization) throw ("pas de jeton");
         req.body.data = JSON.parse(req.body.data);
         if (!req.body.data) {
            // req.body.data = JSON.parse(req.body.data);
             if (!req.body.data.userId) throw ("l'id n'est pas défini");
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        console.log(req.body.data.userId);
        const userId = decodedToken.userId;
        if (req.body.data.userId !== userId) {
            
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