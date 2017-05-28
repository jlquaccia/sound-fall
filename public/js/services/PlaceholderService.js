(function () {
  angular
    .module('sound_fall')
    .factory('Placeholder', ['$https', function ($http) {
      var api = {
        get: get,
        create: create,
        delete: remove
      };

      return api;

      function get () {
        return $http.get('/api/placeholders');
      }

      function create (placeholderData) {
        return $http.post('/api/placeholders', placeholderData);
      }

      function remove (id) {
        return $http.delete('/api/placeholders/' + id);
      }
    }]);
})();