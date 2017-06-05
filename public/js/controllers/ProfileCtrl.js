(function () {
  angular
    .module('sound_fall')
    .controller('ProfileCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.overlayOpen = false;
      $scope.errorMessage = null;
    }]);
})();