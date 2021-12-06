function getInbox(req, res, next) {
  res.render("inbox", { title: "inbox" });
  // res.render("users", {
  //   title: "Users",
  // });
}

module.exports = {
  getInbox,
};
