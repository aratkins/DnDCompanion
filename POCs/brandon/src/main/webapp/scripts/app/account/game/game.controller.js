'use strict';

angular.module('dnDCompanionApp')
    .controller('GameController', function ($scope, Principal, Auth, Language, $translate) {
    	 $scope.success = null;
         $scope.error = null;
         Principal.identity(true).then(function(account) {
             $scope.gameAccount = account;
         });
         
         $scope.rollDice = function () {
             $scope.d1 = Math.floor(Math.random() * 6) + 1;
             $scope.d2 = Math.floor(Math.random() * 6) + 1;
             
             $scope.diceTotal = $scope.d1 + $scope.d2;
             
         };
        
    });
