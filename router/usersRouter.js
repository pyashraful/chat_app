const express = require("express");
const { getUsers } = require("../controller/userscontroller");
const decoratedHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decoratedHtmlResponse("users"), getUsers);

module.exports = router;
