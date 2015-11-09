'use strict';

angular.module('dnDCompanionApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('player', {
                parent: 'entity',
                url: '/players',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'dnDCompanionApp.player.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/player/players.html',
                        controller: 'PlayerController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('player');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('player.detail', {
                parent: 'entity',
                url: '/player/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'dnDCompanionApp.player.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/player/player-detail.html',
                        controller: 'PlayerDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('player');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Player', function($stateParams, Player) {
                        return Player.get({id : $stateParams.id});
                    }]
                }
            })
            .state('player.new', {
                parent: 'player',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/player/player-dialog.html',
                        controller: 'PlayerDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('player', null, { reload: true });
                    }, function() {
                        $state.go('player');
                    })
                }]
            })
            .state('player.edit', {
                parent: 'player',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/player/player-dialog.html',
                        controller: 'PlayerDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Player', function(Player) {
                                return Player.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('player', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
