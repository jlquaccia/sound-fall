var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (userModel) {
  var api = {
    localStrategy: localStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
  };

  return api;

  function localStrategy (username, password, done) {
    userModel
      .findUserByCredentials({username: username, password: password})
      .then(
        function (user) {
          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }

  function serializeUser (user, done) {
    done(null, user);
  }

  function deserializeUser (user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        }
      );
  }
};