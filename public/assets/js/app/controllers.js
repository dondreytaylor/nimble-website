'use strict';

angular.module('Application.controllers', [])

.controller("DocController", ["$scope", "$routeParams", function($scope, $routeParams) {
      $scope.isHeaderHidden = $routeParams.hide_header === "true"
}])

.controller("LandingController", ["$scope", "$routeParams", function($scope, $routeParams) {
    let code = ($routeParams.code || "").toUpperCase();
    if (code && typeof localStorage === "object") {
        localStorage.setItem("referrer", code);
    }
}])

.controller("StoreController", ["$scope", "$routeParams", function($scope, $routeParams) {
}])

.controller("CoinRequestController", ["$scope", "$anchorScroll", function($scope, $anchorScroll) {
    $scope.page = 1;
    $scope.form = {};
    $scope.isValid = function() {
        return (
            $scope.form.chain &&
            $scope.form.github &&
            $scope.form.twitter &&
            $scope.form.website &&
            $scope.form.based &&
            $scope.form.contact_name &&
            $scope.form.contact_email &&
            $scope.form.contact_support
        );
    };
    $scope.send = function() {
        $scope.page = 2;
        $.post("/api/coinrequest", $scope.form);
        $anchorScroll();
    };
}])

.controller("ReserveController", ["$scope", "Coins", "$routeParams", "$location", "$anchorScroll", "$rootScope", "$timeout", function($scope, Coins, $routeParams, $location, $anchorScroll, $rootScope, $timeout) {
    $scope.page = 1;
    $scope.form = {};
    $scope.coin = Coins.supported.filter(function(coin) {
        return coin.name == $routeParams.coin;
    })[0];

    if (!$scope.coin || !$routeParams.qty || !($routeParams.qty > 0)) {
        $location.path("store");
    }

    $scope.form.coin = $scope.coin;
    $scope.form.qty = $routeParams.qty;
    $scope.form.referrer = (typeof localStorage === "object") ? (localStorage.getItem("referrer") | "") : "";

    $scope.isValid = function() {
        return (
            $scope.form.firstname &&
            $scope.form.lastname &&
            $scope.form.email &&
            $scope.form.country &&
            $scope.form.found_out_about_nimble &&
            $scope.form.referred_by
        );
    };
    $scope.send = function() {
        $rootScope.isLoadingIndicatorShown = true;
        $rootScope.LoadingIndicatorText = "Processing Order"
        $.post("/api/reserve", JSON.parse(angular.toJson($scope.form))).then(function(data) {
              $timeout(function() {
                  $scope.page = 2;
                  $rootScope.isLoadingIndicatorShown = false;
                  $scope.ordernumber = data.ordernumber;
                  $scope.referralcode = data.referralcode;
              });
        });
        $anchorScroll();
    };
}])

.controller("CheckStatusController", ["$scope", "$rootScope", "$timeout", function($scope, $rootScope, $timeout) {
    $scope.page = 1;
    $scope.form = {};
    $scope.status = "";
    $scope.isInvalidOrderNumber = false;
    $scope.checkStatus = function() {
        $rootScope.isLoadingIndicatorShown = true;
        $rootScope.LoadingIndicatorText = "Searching for order"
        $.post("/api/checkstatus", $scope.form).then(function(data) {
              $timeout(function() {
                    $rootScope.isLoadingIndicatorShown = false;
                    $scope.isInvalidOrderNumber = false;
                    if (data.status) {
                        $scope.status = data.status;
                    }
                    else if (data.ordersAhead == 0) {
                        $scope.status = "YOUR ORDER IS NEXT TO BE PROCESSED";
                    }
                    else if (data.ordersAhead > 0) {
                        $scope.status = data.ordersAhead + " ORDER"+(data.ordersAhead != 1 ? "S" : "")+" AHEAD OF YOU";
                    }
                    else {
                        $scope.isInvalidOrderNumber = true;
                        return;
                   }
                   $scope.page = 2;
              });
        });
    };
    $scope.$watch("form.ordernumber", function() {
        if ($scope.isInvalidOrderNumber) $scope.isInvalidOrderNumber = false;
    });
}])

.controller("ItemController", ["$scope", "Coins", "$location", "$routeParams", function($scope, Coins, $location, $routeParams) {


    $scope.coin = Coins.supported.filter(function(coin) {
        return coin.name == $routeParams.coin;
    })[0];


    if (!$scope.coin) {
        $location.path("/store");
        return;
    }

    $scope.product = {
        name: "nimbleNODE",
        subname: "lime green special edition",
        price: 119,
        sale: 0.25210084033,
        special: "Get a one-time only discount for  "+ ($scope.coin.preorder ? "pre-ordering." : "joining the waitlist."),
        previews: [
            "/static/assets/images/products/nimble-limegreen/1.png",
            "/static/assets/images/products/nimble-limegreen/2.png",
            "/static/assets/images/products/nimble-limegreen/3.png",
            "/static/assets/images/products/nimble-limegreen/4.png",
        ]
    };

    $scope.coins = Coins.supported;
    $scope.selection = {
      qty: "1",
      coin: $scope.coin
    };
    $scope.mainpreview = $scope.product.previews[0];
    $scope.setPreview = function(preview) {
        $scope.mainpreview = preview;
    };
    $scope.continue = function() {
        $location.path("reserve").search({coin:$scope.selection.coin.name, qty:$scope.selection.qty});
    };
}])

.controller("StoreController", ["$scope", "$location", "Coins", function($scope, $location, Coins) {
      $scope.coins = Coins.supported;
}])
