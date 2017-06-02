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
      })
      // admin
      .state('admin', {
        url: '/admin',
        controller: 'AdminCtrl as admin',
        templateUrl: 'views/admin.html'
      });

    $urlRouterProvider
      .otherwise('/');
  }])
  .run(['$q', '$http', '$rootScope', '$mdToast', '$state', 'Auth', function ($q, $http, $rootScope, $mdToast, $state, Auth) {
    var deferred = $q.defer();

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
            console.log('user is not logged in');
            $state.go('login');
            deferred.reject();
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

function logout (Auth) {
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
}