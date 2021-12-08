const { check } = require("express-validator");

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
      } catch (error) {}
    }),
];
