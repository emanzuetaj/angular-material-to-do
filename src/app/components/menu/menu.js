(function(angular) {
    'use strict';
    /**
     * @ngdoc component
     * @name app.component:Menu
     *
     * @description
     * Menu component of the application
     */
    angular
        .module('app')
        .component('menu', {
            controllerAs: 'vm',
            templateUrl: 'menu/menu.html',
            controller: ['$rootScope', '$mdSidenav', MenuController]
        });
    function MenuController($rootScope, $mdSidenav) {
        $rootScope.toggleMenu = function() {
            $mdSidenav('left').toggle();
        };
    }
})(window.angular);
