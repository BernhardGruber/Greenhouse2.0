(function(){
		'use strict';

    angular.module('app').controller('seedSectorController', seedSectorController);
    seedSectorController.$inject = ['$location','sectorNr','$http', '$element', 'close','$filter'];
		
		function seedSectorController($location, sectorNr,$http, $element, close,$filter){
			var vm = this;			
			
			vm.attributes = {};
			vm.attributes.plantdate = new Date();
			
			vm.cancel = cancel;
			vm.close = close;
			vm.getVegies = getVegies;
			vm.getVegies2 = getVegies2;
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
			
			function getVegies2(vegies){
					var ar = new Array();
					
					for (var key in vegies)
						ar.push(vm.vegies[key]);
						
					return ar;
			}
		
			function getVegies(val){
				
    			return $http.get("/rest/plants/seeds/valuelist",{
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
    			return $http.get("/rest/plants/seeds/valuelist?type=unit")
					    .then(function(response) {
			        		console.log(response.data);
			        		vm.units = response.data;
			    });
			}
			
			
			
			function save(){
					vm.attributes.plantdate = $filter('date')(vm.attributes.plantdate, "dd.MM.yyyy");

    			return $http.get("/rest/plants/seeds/save",{
    					params: {
    						seedJson: angular.toJson(  vm.attributes)
    						}
    					})
					    .then(function(response) {
					    		//$element.modal('hide');
					    		close({}, 500);
			    });
			    
			}
			
			
  
		  function cancel() {
		
		    //  Manually hide the modal.
		    $element.modal('hide');
		    
		    //$modalInstance.close();
		    close({}, 500);
    
		    
		  };
		  			
		};
		
})()	;