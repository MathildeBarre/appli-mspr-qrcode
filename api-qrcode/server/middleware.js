const jwt = require("jsonwebtoken");

const tokenCheck = (req, res ,next) => {
    if(req.path === '/api/users/login' || req.path === '/api/users/register') {
        console.log(req.path);
        next();
    } else {
        console.log(req.path);
        console.log("Nop c'est là")
        console.log(req.headers);
        let token = req.header('Authorization');
        console.log(req.header('Authorization'));
        
        if( !token ) {
            res.status(403).send('Forbidden');
            return;
        }
        
        if( token.startsWith('Bearer ') ) {
            // Remove Bearer from sting
            token = token.slice(7, token.length);
        }
        
        try {
            jwt.verify(token, "itsabigsecret", (err, decoded) => {
                if (err) { res.status(401).send("UnAuthorized"); }
        
                req.decoded = decoded;
                next();
            });
        } catch( error ) {
            res.status(401).send('Unauthorized');
            return;
        }
        res.status(400).send("Accès non autorisé.");
        return;   
    }
};

const admin = (req, res, next) => {

    if (!req.user) {
        res.status(401).send("UnAuthorized")
    } else if (!req.user.admin ) {
        res.status(401).send("UnAuthorized")
    } else {

        next();
    }
};

const logged = (req, res, next) => {
    if (!req.user) {
        /*next({redirect; ''})*/
    } else if (!req.token) {
        /*next({redirect; ''})*/
    } else {
        next();
    }
};

module.exports = {
    tokenCheck,
    admin,
    logged
};
