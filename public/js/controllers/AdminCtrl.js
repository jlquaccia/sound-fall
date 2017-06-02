(function () {
  angular
    .module('sound_fall')
    .controller('AdminCtrl', ['$scope', '$rootScope', 'Auth', function ($scope, $rootScope, Auth) {
      Auth
        .getAllUsers()
        .then(
          function (users) {
            console.log(users);
            $scope.users = users.data;
          },
          function (err) {
            console.error(err);
          }
        );
    }]);
})();