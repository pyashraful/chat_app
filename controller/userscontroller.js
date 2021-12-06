function getUsers(req, res, next) {
  res.render("users", {
    title: "Users",
  });
}

module.exports = {
  getUsers,
};
