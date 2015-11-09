'use strict';

angular.module('dnDCompanionApp')
    .controller('CharacterController', function ($scope, Character, ParseLinks) {
        $scope.characters = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Character.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.characters = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Character.get({id: id}, function(result) {
                $scope.character = result;
                $('#deleteCharacterConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Character.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCharacterConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.character = {
                name: null,
                type: null,
                id: null
            };
        };
    });
