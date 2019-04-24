'use strict';

angular.module('Application.controllers', [])

.controller("LandingController", ["$scope", function($scope) {
}])

.controller("CoinRequestController", ["$scope", function($scope) {
    $scope.page = 1;
}])

.controller("ReserveController", ["$scope", function($scope) {
    $scope.page = 1;
}])

.controller("CheckStatusController", ["$scope", function($scope) {
    $scope.page = 2;
}])

.controller("ItemController", ["$scope", function($scope) {
}])
