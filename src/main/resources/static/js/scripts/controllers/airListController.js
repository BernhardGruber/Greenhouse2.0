(function(){
		'use strict';

    angular.module('app').controller('airListController', airListController);
    airListController.$inject = ['$http', '$element', 'close', 'airTimes'];
		
		function airListController($http, $element, close, airTimes){
			var vm = this;			
			
			vm.addRecord = addRecord;
			
			vm.cancel = cancel;
			vm.close = close;
    	vm.deleteAir = deleteAir;
			
			vm.getAirList = getAirList;
			vm.saveAir = saveAir;
			vm.hideForm = true;
			vm.newAir;
			vm.toggleForm = toggleForm;
			vm.vegies = [];
			vm.units = [];
			
			vm.airTimes = airTimes;
			
	
			//initValues();
			
			function initValues(){
					getAirList();
			}
		
			function getAirList(){
				
    			return $http.get("/rest/air/list")
					    .then(function(response) {
					    		vm.airTimes = response.data.list;
					    		return vm.airTimes;
			    });			 
			}
			

    	function deleteAir(nr){
				return $http.get("/rest/air/delete",{
    					params: {
    						id:nr
    						}
    					})
					    .then(function(response) {
					    		console.log(response.data);			 
				    			getAirList();
			    });    			
    	}
			
			
			function addRecord(){
					vm.newAir = {id:0,airtime:'12:00',durationMin:10};
			}
			
			
			function toggleForm(){
					vm.hideForm = ! vm.hideForm;
					if (! vm.hideForm){
							addRecord();							
					} else {
							vm.newAir = null;
					}
			}

			function saveAir(){
				return $http.get("/rest/air/save",{
	    					params: {
	    						airJson: angular.toJson(  vm.newAir)
	    					}    					
    					})
					    .then(function(response) {
								console.log("saved air");			
								//$element.modal('submit');    
								vm.airTimes.push(vm.newAir);
								vm.newAir = null;
								toggleForm();
			    });    			
			}
			
			
			
  
		  function cancel() {
		    $element.modal('hide');
		    close({}, 500);
    
		    
		  };
		  			
		};
		
})()	;