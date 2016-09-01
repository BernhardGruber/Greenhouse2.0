(function() {
    'use strict';

    angular.module('app').controller('startController', startController);
    startController.$inject = ['$translatePartialLoader', '$translate', 'authService'];

    function startController($translatePartialLoader, $translate, authService) {
    	var vm = this;
    	vm.msg = 'A Message from the Start Controller';
    	
    	$translatePartialLoader.addPart('start');
    	$translate.refresh();
    	
    	
    	authService.checkAuthentification();
    	
    	
    $('.carousel').carousel({
        interval: 15000
    })
    	
    };


})();

