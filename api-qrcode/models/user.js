const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
let UserSchema = mongoose.Schema({

    lname: {
        type: String,
        trim: true,
        required: true
    },


    fname: {
        type: String,
        trim: true,
        default: '',
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        index: {
            unique: true
        }
    },

    password: String,

    admin: {
        type: Boolean,
        default: false,
        index: true
    },

    promos : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Promo', index: true}
    ],

    // token: String
});

module.exports = mongoose.model('User', UserSchema);
