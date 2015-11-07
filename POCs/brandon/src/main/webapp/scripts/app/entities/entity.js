'use strict';

angular.module('dnDCompanionApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('entity', {
                abstract: true,
                parent: 'site'
            });
    });
