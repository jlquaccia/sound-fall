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

  // register a new user
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

  // login a user
  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;

    res.json(user);
  });

  // logout a user
  app.post('/api/logout', function (req, res) {
    req.logOut();
    res.send(200);
  });

  // check if a user is logged in or not
  app.get('/api/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // delete a user
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

  // update a user
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

  // get all users
  app.get('/api/users', function (req, res) {
    User
      .getAllUsers()
      .then(
        function (users) {
          res.json(users);
        },
        function (err) {
          console.log('error: ', err);
          res.status(500).send(err);
        }
      );
  });

  // follow another user
  app.post('/api/followUser/:currentUserId', function (req, res) {
    // console.log('req.body: ', req.body);

    // don't let the current user follow themselves
    if (req.body.currentUser.username === req.body.user.username) {
      console.log('a user cannot follow themself');
      return;
    }

    User
      .findUserById(req.params.currentUserId)
      .then(
        function (user) {
          User
            .followUser(req.params.currentUserId, req.body.user.username)
            .then(
              function (response) {
                console.log('response: ', response);
              },
              function (err) {
                console.log('error: ', error);
                res.status(500).send(err);
              }
            );
        },
        function (err) {
          console.log('error: ', err);
          res.status(500).send(err);
        }
      )
      .then(
        function () {
          User
            .addAsFollower(req.body.currentUser, req.body.user._id)
            .then(
              function (response) {
                console.log('response: ', response);
                console.log('added ' + req.body.currentUser.username + ' to ' + req.body.user.username + '\'s followers list');
                res.json(response);
              },
              function (err) {
                console.log('error: ', err);
                res.status(500).send(err);
              }
            );
        },
        function (err) {
          console.log('error: ', err);
          res.status(500).send(err);
        }
      );
  });

  // unfollow another user
  app.post('/api/unfollowUser/:currentUserId', function (req, res) {
    User
      .unfollowUser(req.params.currentUserId, req.body.user.username)
      .then(
        function (response) {
          console.log('response: ', response);
        },
        function (err) {
          console.log('error: ', error);
          res.status(500).send(err);
        }
      )
      .then(
        function () {
          User
            .removeFromFollowers(req.body.currentUser, req.body.user._id)
            .then(
              function (response) {
                console.log('response: ', response);
                console.log('removed ' + req.body.currentUser.username + ' from ' + req.body.user.username + '\'s followers list');
                res.json(response);
              },
              function (err) {
                console.log('error: ', error);
                res.status(500).send(err);
              }
            );
        },
        function (err) {
          console.log('error: ', error);
          res.status(500).send(err);
        }
      );
  });

  // check if a user is authenticated
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