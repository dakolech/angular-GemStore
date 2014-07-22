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
  $routeProvider.when('/products/:id', {templateUrl: 'product.html', controller: 'StoreControllerOne'});
  #$routeProvider.otherwise({redirectTo: '/'});
]);
