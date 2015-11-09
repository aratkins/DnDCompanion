'use strict';

angular.module('dnDCompanionApp').controller('PlayerDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Player',
        function($scope, $stateParams, $modalInstance, entity, Player) {

        $scope.player = entity;
        $scope.load = function(id) {
            Player.get({id : id}, function(result) {
                $scope.player = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('dnDCompanionApp:playerUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.player.id != null) {
                Player.update($scope.player, onSaveFinished);
            } else {
                Player.save($scope.player, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
