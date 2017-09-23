(function(angular) {
    'use strict';
    /**
     * @ngdoc component
     * @name app.component:main
     *
     * @description
     * Main component of the application
     */
    angular
        .module('app')
        .component('main', {
            controllerAs: 'vm',
            templateUrl: 'main/main.html',
            controller: [MainController]
        });
    angular
        .module('app')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                name: 'main',
                component: 'main',
                url: '/',
                template: '<main></main>'
            });
        }]);
    function MainController() {
        var vm = this;
        vm.message = 'Main component';
    }
})(window.angular);
