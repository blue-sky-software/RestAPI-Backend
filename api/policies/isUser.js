module.exports = function(req, res, next) {
  if (typeof req.session.user !== 'undefined') {
    User
      .findById(req.session.user.id)
      .exec(function(err, users) {
        if(err) {
          delete req.session.user;
          return res.redirect('/login');
        }

        res.locals.user = users[0];
		res.locals.tags = req._modifiedRouteParams[0];
		var moment = require('moment');
		res.locals.moment = moment;
        return next();
      });
      return;
  }

  return res.redirect('/login');
};
