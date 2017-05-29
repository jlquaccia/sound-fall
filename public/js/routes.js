angular
  .module('sound_fall')
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$qProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/views/home.html'
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