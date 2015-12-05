
var config = require('./config.js');

exports.gentoken = function() {
    var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function() {
        return rand() + rand(); // to make it longer
    };

    var ret_value = token();
    return ret_value;
}

exports.getuserid = function(token) {

    User
      .findOne()
      .where({ token: token })
      .exec(function(err, user) {
        console.log('userid = ' + user['id']);
        if (user)
            return user['id'];
        else
          return config.invalid_token;
    });
}
