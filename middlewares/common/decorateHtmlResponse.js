function decoratedHtmlResponse(pageTitle) {
  return function (req, res, next) {
    res.locals.title = pageTitle;
    next();
  };
}

module.exports = decoratedHtmlResponse;
