const qrCode = require("../models/qr_code");
const Promo = require("../models/promo");

const promos = async () => {
    return await Promo.find().exec();
};

const create = async (promo) => {
    let r = parseInt(promo.reduction);

    let newPromo = new Promo({
        name: promo.name,
        text: promo.text || '',
        reduction: r,
        start_date: promo.sdate,
        end_date: promo.edate,
    });

    newPromo.qr_infos.promo_id = newPromo.id;

    // console.log(newPromo);

    return newPromo.save()
        .then(promo => { return promo; })
        .catch(err => { 
            return err; 
        })
};

const promo = async (id) => {
    return Promo.findById(id).exec()
        .then(word => { return word; })
        .catch(err => { return err; });
};

// const update = async () => {
//
// };

const disable = async (id, status) => {
    return Promo.findByIdAndUpdate(id, {disabled: status}, {new: true}).exec()
        .then(promo => {
            console.log(promo);
            return promo;
        })
        .catch(err => { return err; });
};

// const enable = async () => {
//
// };

const delPromo = async (id) => {
    return Promo.findByIdAndRemove(id).exec()
        .then(promo => { return promo; })
        .catch(err => { return err; });
};

// const addQrPromo = async () => {
//
// };


module.exports = {
    promos,
    create,
    promo,
    // update,
    disable,
    // enable,
    delPromo,
    // addQrPromo
};
