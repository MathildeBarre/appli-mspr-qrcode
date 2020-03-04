const mongoose = require('mongoose');


// QrCode Schema
let QrcodeSchema = mongoose.Schema({

    url: {
        type: String,
        trim: true
    },

    texte: {
        type: String,
        required: true
    },

    promos : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Promo', index: true}
    ],
});

module.exports = mongoose.model('Qrcode', QrcodeSchema);
