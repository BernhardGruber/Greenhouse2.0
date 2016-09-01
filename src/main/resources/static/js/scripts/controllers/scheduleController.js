(function() {
    'use strict';

    angular.module('app').controller('scheduleController', scheduleController);
    scheduleController.$inject = ['$location'];

    function scheduleController($location) {
    	var vm = this;
    	vm.msg = 'A Message from the schedule Controller';
    };


})();

