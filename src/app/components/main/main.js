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
            controller: ['toDoService', MainController]
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
    function MainController(toDoService) {
        var vm = this;
        vm.list = toDoService.getList();
        var date = '';
        for ( var i = 0; i < vm.list.length; i++) {
            date = new Date(vm.list[i].date).toLocaleString();
            vm.list[i].date = date;
        }
    }
})(window.angular);
