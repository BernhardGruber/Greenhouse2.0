(function() {
	'use strict';
	
	angular
		.module('app')
		.service('authService', authService);

	authService.$inject = ['$http', '$rootScope', '$location'];
	
	function authService($http, $rootScope, $location) {
		var self = this;
		
		self.authError = null;
		self.isAuthenticated = false;
		
		
		var authService = {
			checkAuthentification : checkAuthentification,
			getAuthError : getAuthError,
			setAuthenticated : setAuthenticated
		};
		
		return authService;
		
		function checkAuthentification(){
			if (! self.isAuthenticated){
				self.authError = 'Error not authenticated';
				$location.path("/login");
			}
		}
		
		function getAuthError(){
			return self.authError;
		}
		
		function setAuthenticated( auth ){
			self.isAuthenticated = auth;
		}

        $rootScope.$on('loginSuccessFull', function() { 
        	self.isAuthenticated = true; 
        });

		
	}

})();