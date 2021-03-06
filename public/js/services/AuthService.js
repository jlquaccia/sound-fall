(function () {
  angular
    .module('sound_fall')
    .factory('Auth', ['$http', function ($http) {
      var api = {
        register: register,
        login: login,
        logout: logout,
        deleteUser: deleteUser,
        updateUser: updateUser,
        getAllUsers: getAllUsers,
        followUser: followUser,
        unfollowUser: unfollowUser
      };

      return api;

      function register (user) {
        return $http.post('/api/register', user);
      }

      function logout () {
        return $http.post('/api/logout');
      }

      function login (user) {
        return $http.post('/api/login', user);
      }

      function deleteUser (userId) {
        return $http.delete('/api/user/' + userId);
      }

      function updateUser (userId, user) {
        return $http.put('/api/user/' + userId, user);
      }

      function getAllUsers () {
        return $http.get('/api/users');
      }

      function followUser (usersObj, currentUserId) {
        return $http.post('/api/followUser/' + currentUserId, usersObj);
      }

      function unfollowUser (usersObj, currentUserId) {
        return $http.post('/api/unfollowUser/' + currentUserId, usersObj);
      }
    }]);
})();