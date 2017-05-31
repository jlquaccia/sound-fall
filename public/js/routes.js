angular
  .module('sound_fall')
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$qProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);

    $locationProvider
      .html5Mode({
        enabled: true
      });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/views/home.html'
      })
      .state('profile', {
        url: '/profile/:id',
        controller: 'ProfileCtrl as profile',
        templateUrl: '/views/profile.html'
      })
      .state('account', {
        url: '/account/:id',
        controller: 'AccountCtrl as account',
        templateUrl: '/views/account.html',
        resolve: {
          checkUsername: checkUsername
        }
      })
      // auth
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as auth',
        templateUrl: 'views/auth/login.html'
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as auth',
        templateUrl: 'views/auth/register.html'
      });

    $urlRouterProvider
      .otherwise('/');
  }])
  .run(['$q', '$http', '$rootScope', function ($q, $http, $rootScope) {
    var deferred = $q.defer();

    $http.get('/api/loggedin')
      .then(
        function (user) {
          $rootScope.errorMessage = null;

          if (user.data !== '0') {
            // User is Authenticated
            $rootScope.currentUser = user.data;
            console.log('user is logged in');
            deferred.resolve();
          } else {
            // User is not Authenticated
            deferred.reject();
            console.log('user is not logged in');
          }
        },
        function (err) {
          console.log(err);
          deferred.reject();
        }
      );

      return deferred.promise;
  }]);

function checkUsername ($q, $http, $rootScope, $stateParams, $state, $mdToast) {
  var deferred = $q.defer();

  $http.get('/api/loggedin')
    .then(
      function (user) {
        $rootScope.errorMessage = null;

        var errorMsg = $mdToast.simple()
          .content('Access denied.')
          .hideDelay(3000);

        if (user.data !== '0') {
          $rootScope.currentUser = user.data;

          if ($rootScope.currentUser.username === $stateParams.id) {
            console.log('access granted');
            deferred.resolve();
          } else {
            console.log('access denied');

            $mdToast.show(errorMsg);
            $state.go('home');
            deferred.reject();
          }
        } else {
          console.log("you're not logged in");
          $mdToast.show(errorMsg);
          $state.go('home');
          deferred.reject();
        }
      },
      function (err) {
        console.log(err);
        deferred.reject();
      }
    );

    return deferred.promise;
}