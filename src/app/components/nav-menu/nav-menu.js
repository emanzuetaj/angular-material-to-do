(function(angular) {
    'use strict';
    /**
     * @ngdoc component
     * @name app.component:NavMenu
     *
     * @description
     * Menu component of the application
     */
    angular
        .module('app')
        .component('navMenu', {
            controllerAs: 'vm',
            templateUrl: 'nav-menu/nav-menu.html',
            controller: ['$rootScope', '$mdSidenav', '$location', NavMenuController]
        });
    function NavMenuController($rootScope, $mdSidenav, $location) {
        var vm = this;
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
        // select option on first load
        for (var i = 0; i < vm.options.length; i++) {
            if (vm.options[i].url.replace('./#!', '') === $location.path()) {
                vm.selectOption(vm.options[i]);
                break;
            }
        }
    }
})(window.angular);
