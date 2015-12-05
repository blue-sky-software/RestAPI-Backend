module.exports = function(req, res, next) {
  if (typeof req.session.user === 'undefined') {
    return next();
  }

  return res.redirect('/dashboard');
};
