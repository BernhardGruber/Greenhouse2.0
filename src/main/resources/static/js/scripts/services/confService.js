(function() {
	'use strict';
	
	angular
		.module('app')
		.service('confService', confService);

	confService.$inject = ['$http'];
	
	function confService($http) {
		var self = this;
		self.preferences = {};
		
		var confService = {
			initConfig : initConfig,
			getPreference : getPreference,
			saveConfig : saveConfig			
		};
		
		return confService;
		
		

		function initConfig() {
			return $http.get('/rest/prefs').then(function(response) {
					    		self.preferences = response.data;
			    });
		};

		function saveConfig(k, v) {
				self.preferences[k] = v;
  			return $http.get("/rest/prefs/save",{
  					params: {
  						key:k,
  						value:v
  						}
  					})
				    .then(function(response) {
				    		console.log(response.data);
		    });
		};
		
		function getPreference(key){
			return self.preferences[key];
		}

		
	}

})();