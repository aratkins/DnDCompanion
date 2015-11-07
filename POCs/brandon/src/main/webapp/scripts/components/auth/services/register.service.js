'use strict';

angular.module('dnDCompanionApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


