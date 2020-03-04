const router = require('express').Router();
const promoController = require("../../controllers/promo.controller");

// ******** PROMOS ********

router
    .route("/")
    .get(promoController.getAllPromos)
    .post(promoController.createPromo);

router
    .route("/:id_pro")
    .get(promoController.getPromo);
    // .post(promoController.editPromo);

router
    .route("/:id_pro/disabled")
    .post(promoController.disablePromo);

// router
//     .route("/:id_pro/enabled")
//     .post(promoController.enablePromo);

router
    .route("/:id_pro/delete")
    .post(promoController.deletePromo);

// ******** QR CODES ********

// router
//     .route("/qrcodes")
//     // .get(promoController.getQrCodes)
//     .post(promoController.addQrCodeInfos);

module.exports = router;
