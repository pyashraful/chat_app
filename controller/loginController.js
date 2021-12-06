function getLoging(req, res, next) {
  res.render("index", {
    title: "Login - chat-app",
  });
}

module.exports = {
  getLoging,
};
