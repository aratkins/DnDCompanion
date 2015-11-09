'use strict';

angular.module('dnDCompanionApp')
    .factory('Character', function ($resource, DateUtils) {
        return $resource('api/characters/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
