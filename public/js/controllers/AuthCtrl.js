(function () {
  angular
    .module('sound_fall')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$state', '$mdToast', 'Auth', function ($scope, $rootScope, $state, $mdToast, Auth) {
      $scope.errorMessage = null;
      $scope.user = {};

      $scope.register = function (user) {
        if (!user.username || user.username === null || user.username === '') {
          $scope.errorMessage = 'Please enter a username.';
          return;
        }

        if (!user.password || user.password === null || user.password === '') {
          $scope.errorMessage = 'Please enter a password.';
          return;
        }

        if (user.password !== user.password2 || !user.password || !user.password2) {
          $scope.errorMessage = "Your passwords don't match.";
          return;
        }

        if (user) {
          Auth
            .register(user)
            .then(
              function (response) {
                var user = response.data;

                if (user !== null) {
                  $rootScope.currentUser = user;
                  // success flash message
                  var successMsg = $mdToast.simple()
                    .content('Registration Successful!')
                    .hideDelay(3000);

                  $mdToast.show(successMsg);
                  $state.go('home');
                } else {
                  console.log('User already exists');
                  $scope.errorMessage = 'User already exists';
                }
              },
              function (err) {
                console.log(err);
                $scope.errorMessage = err;
              }
            );
        }
      };

      $scope.login = function (user) {
        if (!user.username || user.username === null || user.username === '') {
          $scope.errorMessage = 'Please enter your username.';
          return;
        }

        if (!user.password || user.password === null || user.password === '') {
          $scope.errorMessage = 'Please enter your password.';
          return;
        }

        if (user) {
          Auth
            .login(user)
            .then(
              function (response) {
                $rootScope.currentUser = response.data;
                // success flash message
                var successMsg = $mdToast.simple()
                  .content('Login Successful!')
                  .hideDelay(3000);

                $mdToast.show(successMsg);
                $state.go('home');
              },
              function (err) {
                $scope.errorMessage = err;
              }
            );
        }
      };
    }]);
})();