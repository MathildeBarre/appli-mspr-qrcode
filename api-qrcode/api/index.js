const router = require('express').Router();
const apiRoutes = require("./routes/index.routes");

// CORS ALLOWED only on api
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});



router.use("/api", apiRoutes);


module.exports = router;
