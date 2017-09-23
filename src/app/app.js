(function(angular) {
    'use strict';
    angular
        .module('app', [
            'ngMaterial'])
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            $mdThemingProvider.disableTheming();
        }]);
}(window.angular));
