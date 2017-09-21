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
    function MainController() {
        var vm = this;
        vm.message = 'Hello World';
    }
})(window.angular);
