(function () {
  angular
    .module('sound_fall')
    .factory('Auth', ['$http', function ($http) {
      var api = {
        register: register,
        login: login,
        logout: logout
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
    }]);
})();