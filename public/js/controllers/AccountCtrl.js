(function () {
  angular
    .module('sound_fall')
    .controller('AccountCtrl', ['$scope', '$state', '$rootScope', '$mdToast', 'Auth', function ($scope, $state, $rootScope, $mdToast, Auth) {
      $scope.deleteAccount = function (user) {
        if (confirm('Are you sure?  This action will be permanent.')) {
          Auth
          .deleteUser(user._id)
          .then(
            function (response) {
              // success flash message
              var successMsg = $mdToast.simple()
                .content("Account deleted successfully.")
                .hideDelay(3000);

              $mdToast.show(successMsg);
              $rootScope.currentUser = null;
              $state.go('home');
            },
            function (err) {
              console.log('error: ', err);
            }
          );
        }
      };
    }]);
})();