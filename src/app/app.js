(function(angular) {
    'use strict';
    angular
        .module('app', [
            'ngRoute',
            'ngMaterial',
            'ngAnimate'])
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .backgroundPalette('grey');
        }]);
}(window.angular));
