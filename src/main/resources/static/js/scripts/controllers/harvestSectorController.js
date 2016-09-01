(function(){
		'use strict';

    angular.module('app').controller('harvestSectorController', harvestSectorController);
    harvestSectorController.$inject = ['$location','sectorNr','$http', '$element', 'close','$filter'];
		
		function harvestSectorController($location, sectorNr,$http, $element, close,$filter){
			var vm = this;			
			
			vm.attributes = {};
			vm.attributes.plantdate = new Date();
			
			vm.cancel = cancel;
			vm.close = close;
			vm.getVegies = getVegies;
			vm.save = save;
			vm.vegies = [];
			vm.units = [];
			
			
			vm.sectorNr = sectorNr;
	
			initValues();
			
			function initValues(){
					//vm.attributes.plantdate = new Date(2013, 9, 22);
					console.log("PD: " + vm.attributes.plantdate);
					
					vm.attributes.sector = vm.sectorNr;
					getVegies();
					getUnits();
			}
			
			function getVegies(val){
				
    			return $http.get("/rest/plants/harvest/valuelist",{
    					params: {
    						type:"vegetable",
    						clientValue:val
    						}
    					})
					    .then(function(response) {
					    		vm.vegies = response.data;
					    		return vm.vegies;
			    });
			 
			}
			
			function getUnits(){
    			return $http.get("/rest/plants/harvest/valuelist?type=unit")
					    .then(function(response) {
			        		console.log(response.data);
			        		vm.units = response.data;
			    });
			}
			
			
			
			function save(){
					vm.attributes.plantdate = $filter('date')(vm.attributes.plantdate, "dd.MM.yyyy");

    			return $http.get("/rest/plants/harvest/save",{
    					params: {
    						harvestJson: angular.toJson(  vm.attributes)
    						}
    					})
					    .then(function(response) {
					    		//$element.modal('hide');
					    		close({}, 500);
			    });
			    
			}
			
			
  
		  function cancel() {		
		    $element.modal('hide');
		    close({}, 500);
		  };
		  			
		};
		
})()	;