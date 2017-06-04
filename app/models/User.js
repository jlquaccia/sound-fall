var mongoose = require('mongoose');

module.exports = function () {
  var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    followers: [{type: String}],
    following: [{type: String}]
  }, {collection: 'user'});

  var UserModel = mongoose.model('UserModel', UserSchema);

  var api = {
    findUserByUsername: findUserByUsername,
    createUser: createUser,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    removeUser: removeUser,
    updateUser: updateUser,
    getAllUsers: getAllUsers,
    followUser: followUser
  };

  return api;

  function findUserByUsername (username) {
    return UserModel.findOne({username: username});
  }

  function createUser (user) {
    return UserModel.create(user);
  }

  function findUserById (userId) {
    return UserModel.findById(userId);
  }

  function findUserByCredentials (credentials) {
    return UserModel.findOne({username: credentials.username, password: credentials.password});
  }

  function removeUser (userId) {
    return UserModel.remove({_id: userId});
  }

  function updateUser (userId, user) {
    return UserModel.update({_id: userId}, {$set: user});
  }

  function getAllUsers () {
    return UserModel.find({});
  }

  function followUser (currentUserId, username) {
    return UserModel.update({_id: currentUserId}, {$addToSet: {following: username}});
  }
};