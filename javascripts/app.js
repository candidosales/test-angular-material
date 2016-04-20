var app = angular.module('App', ['ngMaterial', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('home.clients', {
      url: 'clients',
      templateUrl: 'templates/clients.html',
      controller: 'ClientsCtrl'
    })
    .state('home.addresses', {
      url: 'addresses',
      templateUrl: 'templates/addresses.html',
      controller: 'AddressesCtrl'
    })
});