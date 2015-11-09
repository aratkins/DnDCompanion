'use strict';

angular.module('dnDCompanionApp')
    .controller('CharacterDetailController', function ($scope, $rootScope, $stateParams, entity, Character) {
        $scope.character = entity;
        $scope.load = function (id) {
            Character.get({id: id}, function(result) {
                $scope.character = result;
            });
        };
        var unsubscribe = $rootScope.$on('dnDCompanionApp:characterUpdate', function(event, result) {
            $scope.character = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
