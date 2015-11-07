'use strict';

angular.module('dnDCompanionApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('account', {
                abstract: true,
                parent: 'site'
            });
    });
