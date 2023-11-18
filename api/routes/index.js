
const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.send("Welcome To Our ABC Banking API")
});

require("./AuthRoutes")(router);

// require("./AdminRoutes")(router);

module.exports.router = router;

