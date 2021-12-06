const express = require("express");
const { getInbox } = require("../controller/inboxController");

const router = express.Router();

router.get("/", getInbox);

module.exports = router;
