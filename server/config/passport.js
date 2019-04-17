const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


// eslint-disable-next-line func-names
const isValidPassword = function (reqbodypassword, userSavedHash) {
  return bcrypt.compareSync(reqbodypassword, userSavedHash);
};


export default () => { return passport.use(new LocalStrategy({
  usernameField: 'email',
},
((username, password, done) => {
  // eslint-disable-next-line no-undef
  const user = Users[username];
  if (!user) {
    return done(null, false, {
      message: 'Incorrect username.',
    });
  }
  if (!isValidPassword(password, user.hash)) {
    return done(null, false, {
      message: 'Incorrect password.',
    });
  }
  return done(null, user);
})));

}
