/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var config = require('../../assets/basic/config.js');
var basic = require('../../assets/basic/basic.js');
var ret_code = require('../../assets/basic/retcode.js');

module.exports = {

  sendalert: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.token === 'undefined' || typeof req.body.state === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param});

    var token = req.body.token;
    var state = req.body.state;
    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        if (!user)
            return res.json({
                status: false,
                err_code: ret_code.non_logined});
        else {

            User
              .findOne()
              .where({ id: user.id })
              .exec(function(err, user) {
                if(err || !user) {
                    return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist});
                }
        
                User.update({id: user.id },{sendalert:state})
                .exec(function afterwards(err, updated){});
                return res.json({
                    status: true,
                    err_code: ret_code.non_error
                });
            });
        }
    });
  },

  listusers: function (req, res) {

   if(typeof req.query === 'undefined' || typeof req.query['token'] === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param});

    var token = req.query['token'];
    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        if (!user)
            return res.json({
                status: false,
                err_code: ret_code.non_logined});
        else {

            User
              .find()
              .exec(function(err, users) {
                if(!users) {
                    return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist});
                }

                return res.json({
                    status: true,
                    err_code: ret_code.non_error,
                    data: users
                });
            });
        }
    });
  },

  setuseradmin: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.token === 'undefined' || typeof req.body.userid === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param});

    var token = req.body.token;
    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        if (!user)
            return res.json({
                status: false,
                err_code: ret_code.non_logined});
        else {
    
            userid = req.body.userid;

            User
              .findOne()
              .where({ id: userid })
              .exec(function(err, user) {
                if(!user) {
                    return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist});
                }
                User.update({id: user.id },{isAdmin:true})
                .exec(function afterwards(err, updated){});
                return res.json({
                    status: true,
                    err_code: ret_code.non_error
                });
            });
        }
    });
  },

  detailuser: function (req, res) {

   if(typeof req.query === 'undefined' || typeof req.query['token'] === 'undefined' || typeof req.query['userid'] === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param});

    var token = req.query['token'];
    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        if (!user)
            return res.json({
                status: false,
                err_code: ret_code.non_logined});
        else {

            userid = req.query['userid'];

            User
              .findOne()
              .where({ id: userid })
              .exec(function(err, user) {
                if(!user) {
                    return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist});
                }
                return res.json({
                    status: true,
                    err_code: ret_code.non_error,
                    fistname: user.firstname,
                    lastname: user.lastname,
                    emailid: user.emailid,
                    photoid: user.phptoid,
                    isGrad: user.isGrad,
                    isAdmin: user.isAdmin
                });
            });
        }
    });
  },

  updateuser: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.token === 'undefined' || typeof req.body.userid === 'undefined' || typeof req.body.firstname === 'undefined' || typeof req.body.lastname === 'undefined' || typeof req.body.emailid === 'undefined' || typeof req.body.photoid === 'undefined' || typeof req.body.isGrad === 'undefined' || typeof req.body.isAdmin === 'undefined' || typeof req.body.password === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param});

    var token = req.body.token;

    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        if (!user)
            return res.json({
                status: false,
                err_code: ret_code.non_logined});
        else {

            userid = req.body.userid;
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var emailid = req.body.emailid;
            var photoid = req.body.photoid;
            var isGrad = req.body.isGrad;
            var isAdmin = req.body.isAdmin;
            var password = req.body.password;

            User
              .findOne()
              .where({ id: userid })
              .exec(function(err, user) {
                if(!user) {
                    return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist});
                }
                User.update({id: user.id },
                    {firstname: firstname,
                     lastname: lastname,
                     emailid: emailid,
                     photoid: photoid,
                     isGrad: isGrad,
                     isAdmin: isAdmin,
                     password: password})
                .exec(function afterwards(err, updated){});
                return res.json({
                    status: true,
                    err_code: ret_code.non_error
                });
            });
        }
    });
  },

  deleteuser: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.token === 'undefined' || typeof req.body.userid === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param});

    var token = req.body.token;
    var userid = req.body.userid;

    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        if (!user)
            return res.json({
                status: false,
                err_code: ret_code.non_logined});
        else {

            User
              .findOne()
              .where({ id: userid })
              .exec(function(err, user) {
                if(!user) {
                    return res.json({
                        status: false,
                        err_code: ret_code.user_nonexist});
                }

                User
                  .destroy({id: userid})
                  .exec(function(err) {
                    if(err) {
                        return res.json({
                            status: false,
                            err_code: ret_code.user_deletefail});
                    }
                    return res.json({
                        status: true,
                        err_code: ret_code.non_error});
                });
            });
        }
    });
  },

  adduser: function (req, res) {

   if(typeof req.body === 'undefined' || typeof req.body.token === 'undefined' || typeof req.body.firstname === 'undefined' || typeof req.body.lastname === 'undefined' || typeof req.body.emailid === 'undefined' || typeof req.body.photoid === 'undefined' || typeof req.body.isGrad === 'undefined' || typeof req.body.isAdmin === 'undefined' || typeof req.body.password === 'undefined')
        return res.json({
            status: false,
            err_code: ret_code.invalid_param});

    var token = req.body.token;

    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        if (!user)
            return res.json({
                status: false,
                err_code: ret_code.non_logined});
        else 
        {

            token = basic.gentoken();
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var emailid = req.body.emailid;
            var photoid = req.body.photoid;
            var isGrad = req.body.isGrad;
            var isAdmin = req.body.isAdmin;
            var password = req.body.password;

            User
              .findOne()
              .where({ emailid: emailid })
              .exec(function(err, user) {
                if(user) {
                    return res.json({
                        status: false,
                        err_code: ret_code.user_exist});
                }

                /* create roomrequest */
                var data = {
                    firstname: firstname,
                    lastname: lastname,
                    emailid: emailid,
                    photoid: photoid,
                    isGrad: isGrad,
                    isAdmin: isAdmin,
                    token: token,
                    password: password
                };

                User
                  .create(data)
                  .exec(function(err, created) {
                    if(err) {
                        return res.json({
                            status: false,
                            err_code: ret_code.user_createfail});
                    }
                    return res.json({
                        status: true,
                        id: created.id,
                        err_code: ret_code.non_error});
                });
            });
        }
    });
  },
};

