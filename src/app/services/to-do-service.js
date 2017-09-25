(function(angular) {
    'use strict';
    /**
     * @ngdoc service
     * @name app.toDoService
     *
     * @description
     * Service handles the information flow of to-do lists.
     *
     * @returns {object} Current to do list
     */
    angular
        .module('app')
        .factory('toDoService', function() {
            var service = {};
            var list = [
                {
                    'id': 1,
                    'title': 'first todo',
                    'description': 'pick up milk',
                    'complete': true,
                    'canceled': true,
                    'date': 1389878466730
                },
                {
                    'id': 2,
                    'title': 'second todo',
                    'description': 'learn backbone',
                    'complete': false,
                    'canceled': false,
                    'date': 1389988926901
                },
                {
                    'id': 3,
                    'title': 'third todo',
                    'description': 'go for a run',
                    'complete': false,
                    'canceled': false,
                    'date': 1389992494240
                }
            ];
            service.getList = function() {
                return list;
            };
            return service;
        });
})(window.angular);
