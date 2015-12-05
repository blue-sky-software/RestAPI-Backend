/**
 * UserviewController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var config = require('../../assets/basic/config.js');
var basic = require('../../assets/basic/basic.js');
var ret_code = require('../../assets/basic/retcode.js');

module.exports = {

  dashboard: function (req, res) {
    User
      .find()
      .exec(function(err, users) {
		if(err) res.locals.usercnt = 0; else res.locals.usercnt = users.length;

		Book
		 .find()
		 .exec(function(err, books) {
			if(err) res.locals.bookcnt = 0; else res.locals.bookcnt = books.length;

			Bookrequests
			 .find()
			 .exec(function(err, bookrequests) {
				if(err) res.locals.bookrequestscnt = 0; else res.locals.bookrequestscnt = bookrequests.length;

				Roomrequests
				 .find()
				 .exec(function(err, roomrequsts) {
					if(err) res.locals.roomrequestscnt = 0; else res.locals.roomrequestscnt = roomrequsts.length;

					Room
					 .find()
					 .exec(function(err, rooms) {
						if(err) res.locals.roomcnt = 0; else res.locals.roomcnt = rooms.length;

						Beacon
						 .find()
						 .exec(function(err, beacons) {
							if(err) res.locals.beaconcnt = 0; else res.locals.beaconcnt = beacons.length;

							Alerts
							 .find()
							 .exec(function(err, alerts) {
								if(err) res.locals.alertscnt = 0; else res.locals.alertscnt = alerts.length;
									return res.view();
							});
						});
					});
				});
			});
		});
    });
  },

  globalapis: function (req, res) {
	return res.view();
  },

  localapis: function (req, res) {
	return res.view();
  },

  usermanage: function (req, res) {
    res.locals.users = null;

    User
      .find()
      .exec(function(err, users) {
        res.locals.users = users;
	    return res.view();
    });
  },

  adduser: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.firstname === 'undefined' || typeof req.body.lastname === 'undefined' || typeof req.body.emailid === 'undefined' || typeof req.body.photoid === 'undefined' || typeof req.body.isGrad === 'undefined' || typeof req.body.isAdmin === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.sendalert === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param,
            reason: 'invalid parameter!'});

    token = basic.gentoken();
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var emailid = req.body.emailid;
    var photoid = req.body.photoid;
    var isGrad = req.body.isGrad;
    var isAdmin = req.body.isAdmin;
    var password = req.body.password;
	var sendalert = req.body.sendalert;

    User
      .findOne()
      .where({ emailid: emailid })
      .exec(function(err, user) {
        if(user) {
            return res.json({
                        status: false,
                        err_code: ret_code.user_exist,
                        reason: 'user exist!'});
        }

        /* create userrequest */
        var data = {
            firstname: firstname,
            lastname: lastname,
            emailid: emailid,
            photoid: photoid,
            isGrad: isGrad,
            isAdmin: isAdmin,
            token: token,
            password: password,
			sendalert: sendalert,
        };

        User
          .create(data)
          .exec(function(err, created) {
            if(err) {
                return res.json({
                    status: false,
                    err_code: ret_code.user_createfail,
                    reason: 'user create fail!'});
            }
            return res.json({
                status: true,
                err_code: ret_code.non_error});
        });
    });
  },

  updateuser: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.firstname === 'undefined' || typeof req.body.lastname === 'undefined' || typeof req.body.emailid === 'undefined' || typeof req.body.photoid === 'undefined' || typeof req.body.isGrad === 'undefined' || typeof req.body.isAdmin === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.sendalert === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param,
            reason: 'invalid parameter!'});

    token = basic.gentoken();
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var emailid = req.body.emailid;
    var photoid = req.body.photoid;
    var isGrad = req.body.isGrad;
    var isAdmin = req.body.isAdmin;
    var password = req.body.password;
	var sendalert = req.body.sendalert;

    User
      .findOne()
      .where({ emailid: emailid })
      .exec(function(err, user) {
        if(!user) {
            return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist,
                        reason: 'user donot exist!'});
        }

        /* upate userrequest */
		User.update({id: user.id },
			{firstname: firstname,
			lastname: lastname,
			emailid: emailid,
			photoid: photoid,
			isGrad: isGrad,
			isAdmin: isAdmin,
			password: password,
			sendalert: sendalert})
		 .exec(function afterwards(err, updated){
			if(err) {
				return res.json({
					status: false,
					err_code: ret_code.user_updatefail,
					reason: 'user update fail!'});
			}
			return res.json({
				status: true,
				err_code: ret_code.non_error});
		});

    });
  },

  getuser: function (req, res) {

   if(typeof req.query === 'undefined' || typeof req.query.id === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param,
            reason: 'invalid parameter!'});

    var id = req.query.id;
    User
      .findOne()
      .where({ id: id })
      .exec(function(err, user) {
        if(!user) {
            return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist,
                        reason: 'user donot exist!'});
        }
			
		return res.json({
			status: true,
			err_code: ret_code.non_error,
			data: user
		});

    });
  },

  deleteuser: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.id === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param,
            reason: 'invalid parameter!'});

    var id = req.body.id;

    User
      .findOne()
      .where({ id: id })
      .exec(function(err, user) {
        if(!user) {
            return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist,
                        reason: 'user donot exist!'});
        }
			
		User
         .destroy({id: id})
         .exec(function(err) {
			if(err) {
				return res.json({
					status: false,
					err_code: ret_code.user_deletefail,
					reason: 'user delete fail!'});
			}
			return res.json({
				status: true,
				err_code: ret_code.non_error});
		});
    });
  },
};

