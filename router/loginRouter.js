const express = require("express");
const { getLoging, loginUser } = require("../controller/loginController");
const {
  doLoginValidators,
  loginValidationHandler,
} = require("../middlewares/login/loginvalidator");

const decoratedHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

const pageTitle = "login";

router.get("/", decoratedHtmlResponse(pageTitle), getLoging);

router.post(
  "/",
  decoratedHtmlResponse(pageTitle),
  doLoginValidators,
  loginValidationHandler,
  loginUser
);

module.exports = router;
