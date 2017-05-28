angular
  .module('sound_fall')
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
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
  }]);