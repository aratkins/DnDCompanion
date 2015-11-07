'use strict';

angular.module('dnDCompanionApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                abstract: true,
                parent: 'site'
            });
    });
