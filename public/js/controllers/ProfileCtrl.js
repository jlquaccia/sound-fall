(function () {
  angular
    .module('sound_fall')
    .controller('ProfileCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.overlayOpen = false;
      $scope.errorMessage = null;
      
      $scope.post = {
        title: '',
        artist: '',
        tags: []
      };

      $scope.addTag = function () {
        var tag = document.getElementsByName('tags')[0].value;

        $scope.post.tags.push(tag);
        document.getElementsByName('tags')[0].value = '';
      };
    }]);
})();