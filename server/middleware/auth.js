const jwt = require('jsonwebtoken');


module.exports =  (req, res, next) => {

    try {
     
       
        if (!req.headers.authorization) throw ('pas de jeton');
           
        if (!req.body.data) {
            //  req.body.data = JSON.parse(req.body.data);
            if (!req.body) throw ('l\'id n\'est pas défini');
        }
       
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        req.token = jwt.verify(token,  process.env.SECRET);
        
       
        next();
    } catch (err) { 
        console.error('error',err);  
         
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};