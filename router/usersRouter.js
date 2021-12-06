const express = require("express");

const { getUsers } = require("../controller/userscontroller");

const router = express.Router();

router.get("/", getUsers);

module.exports = router;
