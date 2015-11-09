'use strict';

angular.module('dnDCompanionApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('character', {
                parent: 'entity',
                url: '/characters',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'dnDCompanionApp.character.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/character/characters.html',
                        controller: 'CharacterController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('character');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('player');
                        return $translate.refresh();
                    }]
                }
            })
            .state('character.detail', {
                parent: 'entity',
                url: '/character/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'dnDCompanionApp.character.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/character/character-detail.html',
                        controller: 'CharacterDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('character');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Character', function($stateParams, Character) {
                        return Character.get({id : $stateParams.id});
                    }]
                }
            })
            .state('character.new', {
                parent: 'character',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/character/character-dialog.html',
                        controller: 'CharacterDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    type: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('character', null, { reload: true });
                    }, function() {
                        $state.go('character');
                    })
                }]
            })
            .state('character.edit', {
                parent: 'character',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/character/character-dialog.html',
                        controller: 'CharacterDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Character', function(Character) {
                                return Character.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('character', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
