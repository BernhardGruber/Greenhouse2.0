(function() {
    'use strict';

        angular
        .module('app')
        .directive('startArea', startArea);


    function firstArea() {
        var directive = {
            restrict: 'AE',
		        templateUrl: 'views/startView.html',        
		        controller: 'startViewController',
		        controllerAs: 'startVm',
		        bindToController: true        
        };

        return directive;
    }


})();