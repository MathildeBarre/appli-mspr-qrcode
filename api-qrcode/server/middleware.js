const jwt = require("jsonwebtoken");

const tokenCheck = (req, res ,next) => {
    if(req.path === '/api/users/login' || req.path === '/api/users/register') {
        next();
    } else {
        let token = req.header('Authorization');
        console.log(token)
        
        if( !token ) {
            console.log("Ca passe pas")
            return res.status(403).send('Forbidden');
        }
        
        if( token.startsWith('Bearer ') ) {
            // Remove Bearer from sting
            token = token.slice(7, token.length);
        }
        
        try {
            jwt.verify(token, "itsabigsecret", (err, decoded) => {
                if (err) { 
                    res.status(401).send("UnAuthorized");
                    console.log(err);
                }
                console.log("DECODE", decoded)
                req.decoded = decoded;
                next();
            });
        } catch( error ) {
            console.log(error)    
            return res.status(400).send("Accès non autorisé.");
        }
        // next();
    }
};

module.exports = {
    tokenCheck
};
