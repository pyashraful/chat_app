const express = require("express");
const {
  getUsers,
  addUsser,
  removeUser,
} = require("../controller/userscontroller");
const decoratedHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHendler,
} = require("../middlewares/users/userValidator");

const router = express.Router();

router.get("/", decoratedHtmlResponse("users"), getUsers);
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHendler,
  addUsser
);
router.delete("/:id", removeUser);

module.exports = router;
