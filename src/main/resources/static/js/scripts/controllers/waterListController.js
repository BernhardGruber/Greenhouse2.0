(function(){
		'use strict';

    angular.module('app').controller('waterListController', waterListController);
    waterListController.$inject = ['$http', '$element', 'close','waterTimes'];
		
		function waterListController($http, $element, close,waterTimes){
			var vm = this;			
			
			vm.addRecord = addRecord;
			
			vm.cancel = cancel;
			vm.close = close;
    	vm.deleteWater = deleteWater;
			
			vm.getWaterList = getWaterList;
			vm.saveWater = saveWater;
			vm.hideForm = true;
			vm.newWatering;
			vm.toggleForm = toggleForm;
			vm.vegies = [];
			vm.units = [];
			
			vm.waterTimes = waterTimes;
			
	
			//initValues();
			
			function initValues(){
					//console.log("PD: " + vm.attributes.plantdate);
					//getWaterList();
			}
		
			function getWaterList(){
				
    			return $http.get("/rest/water/list")
					    .then(function(response) {
					    		vm.waterTimes = response.data;
					    		return vm.waterTimes;
			    });			 
			}
			

    	function deleteWater(nr){
				return $http.get("/rest/water/delete",{
    					params: {
    						id:nr
    						}
    					})
					    .then(function(response) {
					    		console.log(response.data);			 
				    			getWaterList();
			    });    			
    	}
			
			function addRecord(){
					vm.newWatering = {id:0,watertime:'12:00',durationMin:10};
					//vm.waterTimes.push(vm.newWatering);
			}
			
			function toggleForm(){
					vm.hideForm = ! vm.hideForm;
					if (! vm.hideForm){
							addRecord();							
					} else {
							vm.newWatering = null;
					}
			}
			
			function saveWater(){
				return $http.get("/rest/water/save",{
	    					params: {
	    						waterJson: angular.toJson(  vm.newWatering)
	    					}    					
    					})
					    .then(function(response) {
								console.log("saved");			
								//$element.modal('submit');    
								vm.waterTimes.push(vm.newWatering);
								vm.newWatering = null;
								toggleForm();
			    });    			
			}
			
			
  
		  function cancel() {
		  	console.log("canceled");		
		    $element.modal('hide');
		    close({}, 500);
    
		    
		  };
		  			
		};
		
})()	;