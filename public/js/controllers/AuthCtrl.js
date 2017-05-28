(function () {
  angular
    .module('sound_fall')
    .controller('AuthCtrl', ['$scope', function ($scope) {
      $scope.test = 'brought to you from AuthCtrl';
    }]);
})();