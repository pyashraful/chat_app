const express = require("express");
const { getLoging } = require("../controller/loginController");
const decoratedHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decoratedHtmlResponse("login"), getLoging);

module.exports = router;
