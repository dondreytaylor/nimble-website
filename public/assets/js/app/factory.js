'use strict';

angular.module('Application.factory', [])

.factory("Coins", [function($scope) {
    return {
      supported: [
        {preorder: true, name:"Bithereum"},
        {preorder: false, name:"Ethereum"},
        {preorder: false, name:"Bitcoin"},
        {preorder: false, name:"Bitcoin Cash"},
        {preorder: false, name:"Bitcoin SV"},
        {preorder: false, name:"TRON"}
      ]
    }
}])
