const dao = require("../dao/promo.dao");

// ******** PROMOS ********

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

const createPromo = async (req, res, next) => {
 // create
    console.log(req.body);
    let promo = await dao.create(req.body);
    if (promo.name) {
        if (promo.name === "ValidationError" ) {
            return res.status(400).send({err: "Le mot est obligatoire."})
        } else if (promo.name === "MongoError") {
            return res.status(400).send({err: "Ce mot existe déjà."})
        }
    }
    return res.status(201).send({success: "La promo à bien été créé !", _promo: promo});
};

const getPromo = async (req, res, next) => {
 // promo
    if (req.params) {
        let promo = await dao.promo(req.params.id_pro);
        if (promo.name === "CastError") {
            res.status(400).send({err : "Le mot est introuvable."})
        }
        res.status(200).send(promo);
    }
};

const disablePromo = async (req, res, next) => {
 // disable
    if (req.params && req.body) {
        let promo = await dao.disable(req.params.id_pro, req.body.disabled);
        if (promo.name === "CastError") {
            res.status(400).send({err : "Le mot est introuvable."})
        }
        res.status(200).send(promo);
    }
};

const deletePromo = async (req, res, next) => {
 // delPromo
    if (req.params) {
        let promo = await dao.delPromo(req.params.id_pro);
        if (promo.name === "CastError") {
            res.status(400).send({err : "La promo est introuvable."})
        }
        res.status(200).send("La promo bien été supprimé.");
    }
};

module.exports = {
    getAllPromos,
    createPromo,
    getPromo,
    // editPromo,
    disablePromo,
    // enablePromo,
    deletePromo,

    // addQrCodeInfos
};
