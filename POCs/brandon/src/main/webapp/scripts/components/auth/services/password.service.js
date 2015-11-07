'use strict';

angular.module('dnDCompanionApp')
    .factory('Password', function ($resource) {
        return $resource('api/account/change_password', {}, {
        });
    });

angular.module('dnDCompanionApp')
    .factory('PasswordResetInit', function ($resource) {
        return $resource('api/account/reset_password/init', {}, {
        })
    });

angular.module('dnDCompanionApp')
    .factory('PasswordResetFinish', function ($resource) {
        return $resource('api/account/reset_password/finish', {}, {
        })
    });
