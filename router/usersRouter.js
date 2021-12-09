const express = require("express");
const { getUsers } = require("../controller/userscontroller");
const decoratedHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidator } = require("../middlewares/users/userValidator");
const {
  addUserValidationHendler,
} = require("../middlewares/users/userValidator");

const router = express.Router();

router.get("/", decoratedHtmlResponse("users"), getUsers);
router.post("/", avatarUpload, addUserValidator, addUserValidationHendler);

module.exports = router;
