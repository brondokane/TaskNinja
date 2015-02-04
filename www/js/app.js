'use strict';

var app = angular
  .module('IonicRabbit', ['ionic','firebase','toaster'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .constant('FURL', 'https://<myUrl>.firebaseio.com/') 

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('main', {
      url: '/',
      templateUrl: 'templates/main.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'AuthController'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'AuthController'
    })

    // setup an abstract state for the tabs directive
      .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.post', {
      url: '/post',
      views: {
        'tab-post': {
          templateUrl: 'templates/tab-post.html',
          controller: 'TaskController'
        }
      }
    })
    .state('tab.edit', {
      url: '/edit/:taskId',
      views: {
        'tab-browse': {
          templateUrl: 'templates/edit.html',
          controller: 'TaskController'
        }
      }
    })
    .state('tab.browse', {
        url: '/browse',
        views: {
          'tab-browse': {
            templateUrl: 'templates/tab-browse.html',
            controller: 'TaskController'
          }
        }
    })
    .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountController'
          }
        }
    })
    .state('tab.changepassword', {
        url: '/changepassword',
        views: {
          'tab-account': {
            templateUrl: 'templates/changepass.html',
            controller: 'AuthController'
          }
        }
    })    


    $urlRouterProvider.otherwise('/');    

  });