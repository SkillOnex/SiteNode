exports.index = (req, res, next) => {
  res.render("dashboard");
  next();
};

