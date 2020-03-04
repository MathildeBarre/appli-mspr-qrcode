const User = require("../models/user");
const Promo = require("../models/promo");
const bcrypt = require('bcryptjs');

const userRegister = async (u) => {
    let salt = bcrypt.genSaltSync(10);
    let encrypted = await bcrypt.hash(u.password, salt);

    let user = new User({
        lname : u.lname,
        fname : u.fname || '',
        email : u.email,
        password: encrypted
    });

    return await user.save()
        .then(user => { return user; })
        .catch(err => { return err; });
};

const getUserById = async (id) => {
    return User.findById(id).exec()
        .then(user => { return user; })
        .catch(err => { return err; });
};

const promos = async (id) => {
    return User.findById(id).exec()
        .then(user => {
            return user.promos;
        })
        .catch(err => { return err; });
};

const addUserProm = async (userId, promoId) => {
    let user = await User.findById(userId).exec();

    user.promos.push(promoId);

    return User.findByIdAndUpdate(user, {promos: user.promo}, {new: true}).exec()
        .then(word => {
            console.log(word);
            return word;
        })
        .catch(err => { return err; });
};


module.exports = {
    userRegister,
    getUserById,
    promos,
    addUserProm
};
