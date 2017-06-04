(function () {
  angular
    .module('sound_fall')
    .controller('AdminCtrl', ['$scope', '$rootScope', '$mdToast', 'Auth', function ($scope, $rootScope, $mdToast, Auth) {
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
        if (currentUser.following.indexOf(user.username) !== -1) {
          console.log('already following this user');
          return;
        }

        Auth
          .followUser(user, currentUser._id)
          .then(
            function (response) {
              console.log(response);
              currentUser.following.push(user.username);

              var successMsg = $mdToast.simple()
                .content('You are now following ' + user.username)
                .hideDelay(3000);

              $mdToast.show(successMsg);
              $scope.init();
              console.log(currentUser);
            },
            function (err) {
              console.error(err);
            }
          );
      };
    }]);
})();