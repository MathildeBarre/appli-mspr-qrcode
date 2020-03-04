const router = require('express').Router();
const qrcodeController = require("../../controllers/qr_code.controller");
const middleware = require("../../server/middleware");

router
    .route("/")
    .get(qrcodeController.getAllQrCodes)
    .post(qrcodeController.createQrCode);

router
    .route("/:id_qr")
    .get(qrcodeController.getQrCode);
    // .post(qrcodeController.editQrCode);

router
    .route("/:id_qr/delete")
    .post(qrcodeController.deleteQrCode);

// ******** PROMOS ********

router
    .route("/:id_qr/promos")
    // .get(qrcodeController.getPromos)
    .post(qrcodeController.addPromo);

module.exports = router;
