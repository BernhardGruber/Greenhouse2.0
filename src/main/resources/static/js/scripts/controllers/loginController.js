(function() {
    'use strict';

    angular.module('app').controller('loginController', loginController);
    loginController.$inject = ['$translatePartialLoader', '$translate','$http', '$rootScope', '$location', 'authService'];

    function loginController($translatePartialLoader, $translate,$http, $rootScope, $location, authService) {
    	var vm = this;
    	vm.authenticate = authenticate;
    	vm.login = login;
    	vm.logout = logout;
    	vm.credentials = {};
    	vm.errorMsg = authService.getAuthError();
    	
    	$rootScope.authenticated = false;
    	
    	$rootScope.$emit('loginActive');
    	
    	console.log("login controller");
    	
    	$translatePartialLoader.addPart('login');
    	$translate.refresh();
    	
		
		function authenticate(credentials, callback){
			
		    var headers = credentials ? {authorization : "Basic "
		        + btoa(credentials.username + ":" + credentials.password)
		    } : {};

		    $http.get('user', {headers : headers}).then(function(response) {
		      if (response.data.name) {
		        $rootScope.authenticated = true;
		      } else {
		        $rootScope.authenticated = false;
		      }
		      callback && callback();
		    }, function() {
		      $rootScope.authenticated = false;
		      callback && callback();
		    });
		}
		
		function login() {
		      authenticate(vm.credentials, function() {
			        if ($rootScope.authenticated) {
			        	$rootScope.$emit('loginSuccessFull');
			        	authService.setAuthenticated(true);
			        	$location.path("/start");
			        	vm.error = false;
			        } else {
			        	$location.path("/login");
			        	vm.error = true;
			        }
			  });
		}
		
		function logout(){
			$http.post('logout', {}).finally(function() {
				$rootScope.authenticated = false;
				$location.path("/");
			});			
		}
    	
    };


})();
