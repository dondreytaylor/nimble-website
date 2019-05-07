'use strict';

angular.module('Application', [
  'ngRoute',
  'Application.controllers',
  'Application.factory'
]).
config(['$locationProvider', '$interpolateProvider', '$routeProvider', function($locationProvider, $interpolateProvider, $routeProvider) {

    // URL prefix
    $locationProvider.html5Mode(true);

    // Application routing
    $routeProvider
      .when("/", {
          templateUrl : "/static/views/pages/landing.html"
      })
      .when("/invite/:code", {
          templateUrl : "/static/views/pages/landing.html"
      })
      .when("/faq", {
          templateUrl : "/static/views/pages/faq.html"
      })
      .when("/support", {
          templateUrl : "/static/views/pages/support.html"
      })
      .when("/coinrequest", {
          templateUrl : "/static/views/pages/coinrequest.html"
      })
      .when("/reserve", {
          templateUrl : "/static/views/pages/reserve.html"
      })
      .when("/checkstatus", {
          templateUrl : "/static/views/pages/checkstatus.html"
      })
      .when("/store", {
          templateUrl : "/static/views/pages/store.html"
      })
      .when("/product/:coin", {
          templateUrl : "/static/views/pages/item.html"
      })
      .when("/legal", {
          templateUrl : "/static/views/pages/legal.html"
      })
      .when("/returns", {
          templateUrl : "/static/views/pages/doc-returns.html"
      })
      .when("/terms", {
          templateUrl : "/static/views/pages/doc-terms.html"
      })
      .when("/privacy", {
          templateUrl : "/static/views/pages/doc-privacy.html"
      })
      .otherwise("/");
}]);
