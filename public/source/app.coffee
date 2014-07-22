'use strict'


# Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/view1', {templateUrl: 'views/product.html', controller: 'MyCtrl1'});
  $routeProvider.when('/products/:id', {templateUrl: 'product.html', controller: 'StoreControllerOne'});
  $routeProvider.otherwise({redirectTo: '/'});
]);
