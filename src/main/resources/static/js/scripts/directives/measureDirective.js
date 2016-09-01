(function() {
    'use strict';

        angular
        .module('app')
        .directive('measureArea', measureArea);


    function measureArea() {
        var directive = {
            restrict: 'AE',
		        templateUrl: 'app/views/measureView.html',
		        controller: 'measureViewController',
		        controllerAs: 'measureVm',
		        bindToController: true
        };

        return directive;
    }


})();