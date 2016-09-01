(function() {
    'use strict';

    angular.module('app').controller('blogController', blogController);
    blogController.$inject = ['$translatePartialLoader', '$translate', '$window', 'authService'];

    function blogController($translatePartialLoader, $translate, $window, authService) {
    	var vm = this;
    	vm.callExtern = callExtern;

    	authService.checkAuthentification();
   	
    	$translatePartialLoader.addPart('blog');
    	$translate.refresh();

			function callExtern(url){
					$window.open(url);				
			}
    };


})();

