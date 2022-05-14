const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Mobile number or email required"),

  check("password").isLength({ min: 1 }).withMessage("password required"),
];

const loginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      error: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  loginValidationHandler,
};
