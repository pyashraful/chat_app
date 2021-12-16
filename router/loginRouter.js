const express = require("express");
const { getLoging, loginUser } = require("../controller/loginController");
const decoratedHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decoratedHtmlResponse("login"), getLoging);

router.post("/", loginUser);

module.exports = router;
