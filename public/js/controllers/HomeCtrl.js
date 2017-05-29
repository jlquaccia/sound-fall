(function () {
  angular
    .module('sound_fall')
    .controller('HomeCtrl', ['$scope', '$rootScope', '$mdToast', '$state', 'Auth', function ($scope, $rootScope, $mdToast, $state, Auth) {
      $rootScope.logout = function () {
        Auth
          .logout()
          .then(
            function (response) {
              $rootScope.currentUser = null;
              // success flash message
              var successMsg = $mdToast.simple()
                .content('You are now logged out.')
                .hideDelay(3000);

              $mdToast.show(successMsg);
              $state.go('login');
            },
            function (err) {
              console.log(err);
            }
          );
      };
    }]);
})();