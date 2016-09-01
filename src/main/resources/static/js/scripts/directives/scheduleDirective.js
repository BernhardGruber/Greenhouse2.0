(function() {
    'use strict';

        angular
        .module('app')
        .directive('scheduleArea', scheduleArea);


    function scheduleArea() {
        var directive = {
            restrict: 'AE',
		        templateUrl: 'app/views/schedule.html',
		        controller: 'scheduleController',
		        controllerAs: 'scheduleVm',
		        bindToController: true
        };

        return directive;
    }


})();