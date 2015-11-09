'use strict';

angular.module('dnDCompanionApp').controller('CharacterDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Character',
        function($scope, $stateParams, $modalInstance, entity, Character) {

        $scope.character = entity;
        $scope.load = function(id) {
            Character.get({id : id}, function(result) {
                $scope.character = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('dnDCompanionApp:characterUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.character.id != null) {
                Character.update($scope.character, onSaveFinished);
            } else {
                Character.save($scope.character, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
