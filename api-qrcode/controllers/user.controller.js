const User = require("../models/user");
const Promo = require("../models/promo");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dao = require("../dao/user.dao");

// ******** PROMOS ********

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({email});


        if (!user) {
            return res.status(401).send({err_message: "Mauvais email ou mot-de-passe."});
        }

        const goodPass = await bcrypt.compare(password, user.password);

        if (!password || !goodPass) {
            return res.status(401).send({err_message: "Mauvais email ou mot-de-passe."});
        }

        jwt.sign({user}, "itsabigsecret", { expiresIn: "1h" }, (err, token) => {
            if (err) { console.log(err); }
            res.status(200).send({
                tkn: token,
                user: user.id
            });
        });

    } catch (err) {
        console.log(err);
        return res.send(400).send(err);
    }

};

const signUp = async (req, res, next) => {
    try {
        const { email, password, lname } = req.body;

        if (!email || !password || !lname) {
            res.status(401).send({error: "L'email et le mot-de-passe sont requis."});
            return;
        }
        const user = await User.findOne({email});
        if (user) {
            res.status(401).send({error: "Cet email est déjà utilisé."});
            return;
        }

        let newUser = await dao.userRegister(req.body);
        if (newUser.name) {
            if (newUser.name === "ValidationError" ) {
                res.status(400).send({err: "Le mot est obligatoire."});
                return;
            } else if (newUser.name === "MongoError") {
                res.status(400).send({err: "Ce compte existe déjà."});
                return;
            }
        }
        res.status(201).send({success: "Le compte à bien été créé !"});
    } catch (err) {
        console.log(err);
        res.send(400).send(err);
    }
};

// const logout = (req, res, next) => {
//
// };

const getUser = async (req, res, next) => {
    if (req.params) {
        let user = await dao.getUserById(req.params.id_user);
        if (user.name === "CastError") {
            res.status(400).send({err : "Le mot est introuvable."})
        }
        res.status(200).send(user);
    }
};

const getAllPromos = async (req, res, next) => {
    let promos = await dao.promos(req.params.id_user);
    // if (promos.name) {
    //     if (promos.name === "ValidationError" ) {
    //         res.status(400).send({err: "Le mot est obligatoire."})
    //     } else if (promos.name === "MongoError") {
    //         res.status(400).send({err: "Ce mot existe déjà."})
    //     }
    // }
    res.status(200).send(promos);
};

const addPromo = async (req, res, next) => {
    if (req.params && req.body) {
        let user = await dao.addUserProm(req.params.id_word, req.body.promo);
        if (user.name === "CastError") {
            res.status(400).send({err : "Promo introuvable."})
        }
        res.status(200).send(user);
    }
};


module.exports = {
    login,
    signUp,
    // logout,
    getUser,
    getAllPromos,
    addPromo
};
