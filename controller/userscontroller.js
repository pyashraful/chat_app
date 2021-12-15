const bcrypt = require("bcrypt");

// internal import
const User = require("../models/peopleModel");

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", { users });
  } catch (err) {
    next(err);
  }
}

async function addUsser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].fileName,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    console.log("adding");
    const result = await newUser.save();
    console.log("added");
    res.status(200).json({ message: "User was added successfully " });
    console.log("send ...");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  addUsser,
};
