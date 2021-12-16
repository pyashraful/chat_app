const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
//internal import
const User = require("../models/peopleModel");

function getLoging(req, res, next) {
  res.render("index");
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObject = {
          userName: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "user",
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });
        // cookie setup
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          signed: true,
          httpOnly: true,
        });

        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again");
      }
    } else {
      throw createError("Login failed! Please try again");
    }
  } catch (err) {
    console.log(err);
    res.render(
      "index",
      { userName: req.body.username },
      {
        errors: {
          common: {
            msg: err.message,
          },
        },
      }
    );
  }
}

module.exports = {
  getLoging,
  loginUser,
};
