(function () {
  angular
    .module('sound_fall')
    .controller('AdminCtrl', ['$scope', '$rootScope', 'Auth', function ($scope, $rootScope, Auth) {
      $scope.init = function () {
        Auth
        .getAllUsers()
        .then(
          function (users) {
            $scope.users = users.data;
          },
          function (err) {
            console.error(err);
          }
        );
      };

      $scope.init();

      $scope.follow = function (user, currentUser) {
        Auth
          .followUser(user, currentUser._id)
          .then(
            function (response) {
              console.log(response);
              $scope.init();
            },
            function (err) {
              console.error(err);
            }
          );
      };
    }]);
})();