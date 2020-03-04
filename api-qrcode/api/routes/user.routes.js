const router = require('express').Router();
const userController = require("../../controllers/user.controller");
const middleware = require ("../../server/middleware");


// ******** USERS ********

router
    .route('/login')
    .post(userController.login);

router
    .route("/register")
    .post(userController.signUp);

// router
//     .route("logout")
//     .get(userController.logout);

// ******** PROMOS ********

router
    .route("/:id_user")
    .get(userController.getUser);

router
    .route("/:id_user/promos")
    .get(userController.getAllPromos)
    .post(userController.addPromo);

module.exports = router;

