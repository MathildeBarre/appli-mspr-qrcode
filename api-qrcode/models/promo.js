const mongoose = require('mongoose');

// Promo Schema
let PromoSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    reduction: {
        type: Number,
        trim: true,
        required: true
    },

    disabled: {
        type: Boolean,
        default: false,
        index: true
    },

    start_date: Date,

    end_date: Date,

    qr_infos : {
        type: Object,
        default: {
            path: "/api/user/:id_user/promos",
            promo_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Promo', index: true}
        }
    }

});

module.exports = mongoose.model('Promo', PromoSchema);
