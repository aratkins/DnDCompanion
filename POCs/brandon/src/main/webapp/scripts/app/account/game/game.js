'use strict';

angular.module('dnDCompanionApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('game', {
                parent: 'account',
                url: '/game',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.account.game'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/account/game/game.html',
                        controller: 'GameController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('game');
                        return $translate.refresh();
                    }]
                }
            });
    });
