'use strict';

angular.module('Application', [
  'ngRoute',
  'Application.controllers'
]).
config(['$locationProvider', '$interpolateProvider', '$routeProvider', function($locationProvider, $interpolateProvider, $routeProvider) {

    // URL prefix
    $locationProvider.hashPrefix('!');

    // Change angular interpolate symbols to prevent
    // clash with template engine
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.startSymbol(']]');

    // Application routing
    $routeProvider
      .when("/", {
          templateUrl : "/static/views/pages/landing.html"
      });
}]);
