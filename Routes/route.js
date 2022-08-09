const express = require("express");
const router = express.Router();
const { getAllProduct } = require("../Controllers/controllers");

router.route("/").get(getAllProduct);

module.exports = router;
