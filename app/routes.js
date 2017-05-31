var User = require('./models/User')();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportApi = require('./passport/passport')(User);
var mongoose = require('mongoose');

module.exports = function (app) {
  // ======================================================================
  // users ==========================================================
  // ======================================================================
  passport.use(new LocalStrategy(passportApi.localStrategy));
  passport.serializeUser(passportApi.serializeUser);
  passport.deserializeUser(passportApi.deserializeUser);

  app.post('/api/register', function (req, res) {
    var newUser = req.body;

    User
      .findUserByUsername(newUser.username)
      .then(
        function (user) {
          // determine if there is already an existing user by the provided credentials
          if (user) {
            // user already exists
            res.json(null);
          } else {
            // user does not exist, create a new one
            return User.createUser(newUser);
          }
        },
        function (err) {
          res.status(400).send(err);
        }
      )
      .then(
        function (user) {
          if (user) {
            req.login(user, function (err) {
              console.log('user:', user);
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        },
        function (err) {
          res.status(400).send(err);
        }
      );
  });

  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;

    res.json(user);
  });

  app.post('/api/logout', function (req, res) {
    req.logOut();
    res.send(200);
  });

  app.get('/api/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.delete('/api/user/:id', authorized, function (req, res) {
    User
      .removeUser(req.params.id)
      .then(
        function (response) {
          console.log('user deleted');
          res.json(response);
        },
        function (err) {
          res.status(400).send(err);
        }
      );
  });

  app.put('/api/user/:id', authorized, function (req, res) {
    var newUser = req.body;

    User
      .updateUser(req.params.id, newUser)
      .then(
        function (user) {
          console.log('user: ', user);
          res.json(user);
        },
        function (err) {
          res.status(400).send(err);
        }
      );
  });

  function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  }

  // angular
  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });
};