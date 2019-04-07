var jwt = require('jsonwebtoken');
var passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// var Users = {};
/* var addUser = function(user){
  Users.user._id = user;
} */

  var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*module.exports.addUser = function (user) {
  User = {};
  Users.user._id = user;
}*/

module.exports.register = function(req, res) {
  if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields are required, please!"
    });
    return;
  }

 

  else {

  var user = {};
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.salt = bcrypt.genSaltSync(saltRounds);
  user.hash = bcrypt.hashSync(req.body.password, user.salt);
  user._id = user.salt + user.hash;
  user.type = "client";
  
  // addUser(user);
  Users[user.email]=user;

 var isValidPassword = function(reqbodypassword, userSavedHash) {
  return bcrypt.compareSync(reqbodypassword, userSavedHash);
  }
  
  var generateJwt = function(userObj) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: user._id,
      email: user.email,
      name: user.firstName,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);  // DO NOT KEEP YOUR SECRET IN THE CODE!

  }
    
  // sendJSONresponse(res, 200, user);
 var token = generateJwt(user);

sendJSONresponse(res, 200, {
  "token" : token
});

 return;
}

}

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};