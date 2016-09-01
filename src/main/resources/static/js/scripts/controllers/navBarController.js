(function() {
    'use strict';

    angular.module('app').controller('navBarController', navBarController);
    navBarController.$inject = ['$translatePartialLoader','$translate','$timeout', 'confService', '$location', '$rootScope', 'authService'];

    function navBarController($translatePartialLoader,$translate,$timeout, confService, $location, $rootScope, authService) {
        var vm = this;
        vm.changeLanguage = changeLanguage;
        vm.toggleAnimation = toggleAnimation;
        vm.isNavbarVisible = false; //($location.url() !== '/login');
        vm.loginText = 'navBar.logout';
        
        $rootScope.$on('loginSuccessFull', function() { 
        	vm.isNavbarVisible = true; 
        });
        
        $rootScope.$on('loginActive', function() { 
        	vm.isNavbarVisible = false; 
        });
      
      //confService.initConfig();
       
      var lng = confService.getPreference('languageKey');
      changeLanguage (lng);
        
    	$translatePartialLoader.addPart('navbar');
    	$translate.refresh();
        
      function changeLanguage(lng){
      		$translate.use(lng);
      		confService.saveConfig('languageKey',lng);
      		$timeout(function() {
        		$translate.refresh();
    			}, 300);
      }
      
      function toggleAnimation(){
      		var animState = confService.getPreference('animationSetting');
      		var newState = (animState == 'running') ? 'paused' : 'running';
      		confService.saveConfig('animationSetting',newState);
      }
      
      function logout(){
		  $http.post('logout', {}).finally(function() {
			  authService.setAuthenticated(false);
			    $location.path("/login");
			  });
    	  
      }
      
    }


})();
