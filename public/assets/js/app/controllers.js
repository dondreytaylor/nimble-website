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
    $scope.product = {
        name: "nimbleNODE",
        subname: "lime green special edition",
        price: 99.49,
        sale: 0.1,
        special: "Get an additional 10% off when you pre-order between May 1st and June 1st.",
        previews: [
            "/static/assets/images/products/nimble-limegreen/1.png",
            "/static/assets/images/products/nimble-limegreen/2.png",
            "/static/assets/images/products/nimble-limegreen/3.png",
            "/static/assets/images/products/nimble-limegreen/4.png",
        ]
    };
    $scope.coins = [
        {preorder: true, name:"Bithereum"},
        {preorder: false, name:"Ethereum"},
        {preorder: false, name:"Bitcoin"},
        {preorder: false, name:"Bitcoin Cash"},
        {preorder: false, name:"Bitcoin SV"},
        {preorder: false, name:"TRON"}
    ];
    $scope.selection = {
      qty: "1",
      coin: $scope.coins[0]
    };
    $scope.mainpreview = $scope.product.previews[0];
    $scope.setPreview = function(preview) {
        $scope.mainpreview = preview;
    };
}])
