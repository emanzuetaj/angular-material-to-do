(function(angular) {
    'use strict';
    /**
     * @ngdoc component
     * @name app.component:add
     *
     * @description
     * Add component of the application
     */
    angular
        .module('app')
        .component('add', {
            controllerAs: 'vm',
            templateUrl: 'add/add.html',
            controller: [AddController]
        });
    angular
        .module('app')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/add', {
                name: 'add',
                component: 'add',
                url: '/add',
                template: '<add></add>'
            });
        }]);
    function AddController() {
        var vm = this;
        vm.newItem = {
            'title': null,
            'description': null,
            'complete': false,
            'canceled': false,
            'date': null
        };
    }
})(window.angular);
