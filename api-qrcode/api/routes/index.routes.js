const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const qrCodeRoutes = require('./qr_code.routes');
const promoRoutes = require('./promo.routes');

router.use("/users", userRoutes);

// router.use("/qrcodes", qrCodeRoutes);

router.use("/promos", promoRoutes);

module.exports = router;
