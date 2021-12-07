const express = require("express");
const { getInbox } = require("../controller/inboxController");
const decoratedHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decoratedHtmlResponse("inbox"), getInbox);

module.exports = router;
