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
            controller: ['$rootScope', '$mdSidenav', '$location', MenuController]
        });
    function MenuController($rootScope, $mdSidenav, $location) {
        var vm = this;
        alert($location.path());
        vm.options = [
            {
                'name': 'Main',
                'url': './#!/'
            },
            {
                'name': 'Add',
                'url': './#!/add'
            }
        ];
        $rootScope.toggleMenu = function() {
            $mdSidenav('left').toggle();
        };
        vm.selectOption = function(option) {
            vm.selected = option;
        };
        for (var i = 0; i < vm.options.length; i++) {
            if (vm.options[i].url.replace('./#!', '') === $location.path()) {
                vm.selectOption(vm.options[i]);
                break;
            }
        }
    }
})(window.angular);
