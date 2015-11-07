 'use strict';

angular.module('dnDCompanionApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-dnDCompanionApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-dnDCompanionApp-params')});
                }
                return response;
            }
        };
    });
