const { check } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is require")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain other than apphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .trim()
    .custom(async (value) => {
      try {
        const userEmail = await User.findOne({ email: value });
        if (userEmail) {
          throw createError("Email already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Moblie number must be a valid bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const userMobile = await User.findOne({ mobile: value });
        if (userMobile) {
          throw createError("Mobile already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

function addUserValidationHendler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const fileName = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${fileName}`),
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
    res.status(500).json({
      error: mappedErrors,
    });
  }
}

module.exports = {
  addUserValidator,
  addUserValidationHendler,
};
