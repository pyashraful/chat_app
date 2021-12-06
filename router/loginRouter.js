const express = require("express");
const { getLoging } = require("../controller/loginController");

const router = express.Router();

router.get("/", getLoging);

module.exports = router;
