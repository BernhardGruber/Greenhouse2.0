(function() {
    'use strict';

        angular
        .module('app')
        .directive('greenNavBar', greenNavBar);


    function greenNavBar() {
        var directive = {
            restrict: 'AE',
            templateUrl: '/views/navBar.html',
            controller: 'navBarController',
            controllerAs: 'navBarVm',
            bindToController: true
        };

        return directive;
    }


})();