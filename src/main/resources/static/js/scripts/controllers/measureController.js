(function() {
    'use strict';

    angular.module('app').controller('measureController', measureController);
    measureController.$inject = ['$translatePartialLoader','$translate', '$http', 'chartService', 'ModalService', 'authService'];

    function measureController($translatePartialLoader, $translate, $http, chartService, ModalService, authService) {
    	var vm = this;
    	vm.airTimes = {};
    	vm.currentBatteryValue = 0;
    	vm.currentTemperature = 0;
    	vm.currentWater = 0;
    	
    	vm.chartDiv = 'chart_div';
    	vm.click = click;
    	
    	vm.showAirList = showAirList;
    	vm.showWaterList = showWaterList;
    	
    	vm.temperatureGauge = null;
    	vm.toggleWindow = toggleWindow;
    	vm.togglePump = togglePump;
    	vm.waterGauge = null;
    	
    	vm.waterTimes = {};
    	
    	vm.windowOpen = false;
    	vm.pumpOn = false;
    	
    	authService.checkAuthentification();
    	
    	
    	$translatePartialLoader.addPart('measure');
    	$translate.refresh();
    	
    	init();
    	
    	
    	function init(){

		    	getTemperature();
		    	getWater();
		    	getBatteryValue();
		    	toggleWindow();
		    	togglePump();
		    	getWaterTimes();
		    	getAirTimes();
    	}
    
	    function click(){
	    	initialize();
	    		//vm.chartDiv = 'chart_div2';
	    		//vm.currentTemperature = 100;
	    		var val = vm.dataWater.getValue(0, 1);
	    		val += 900;
	    		vm.dataWater.setValue(0, 1, val);
	    		//vm.dataWater.setValue(0, 2, 200);
	    		//drawChart();
	    		vm.chartWater.draw(vm.dataWater, vm.optionsWater);
	    		
	    }
	    
	    function getWaterTimes(){
	    			return $http.get("/rest/water/next")
						    .then(function(response) {					    	
						    		vm.waterTimes = response.data;	
				    });
	    }
	    
	    function getAirTimes(){
	    			return $http.get("/rest/air/next")
						    .then(function(response) {					    	
						    		vm.airTimes = response.data;	
				    });	    	
	    }
	    
	    function getTemperature(){
	    			return $http.get("/rest/measure/temperature")
						    .then(function(response) {					    	
						    		vm.currentTemperature = response.data.value;	
						    		vm.temperatureGauge = chartService.createGauge("temperature", "Temperature", 0, 50);	
						    		vm.temperatureGauge.render();
						    		vm.temperatureGauge.redraw(vm.currentTemperature);
				    });
	    	
	    }
	    
	    function getWater(){
	    			return $http.get("/rest/measure/water")
						    .then(function(response) {					    	
						    		vm.currentWater = response.data.value;	
						    		vm.waterGauge = chartService.createGauge("water", "Water", 0, 100);	
						    		vm.waterGauge.render();
						    		vm.waterGauge.redraw(vm.currentWater);
				    });
	    	
	    }
	    
	    function getBatteryValue(){
	    			return $http.get("/rest/measure/energy")
						    .then(function(response) {					    	
						    		vm.currentBatteryValue = response.data.value;	
						    		vm.batteryGauge = chartService.createGauge("battery", "Battery", 0, 100);	
						    		vm.batteryGauge.render();
						    		vm.batteryGauge.redraw(vm.currentBatteryValue);
				    });
	    	
	    }
	    
	    
	    function toggleWindow(){
	    		console.log("toggleWindow");
		    	var btn = document.getElementById("windowButton");
	    		if (vm.windowOpen){
		    		btn.className = 'glyphicon glyphicon-triangle-top';
		    		btn.style.color = 'red';
	    		} else {
		    		btn.className = 'glyphicon glyphicon-triangle-bottom';
		    		btn.style.color = 'green';
	    		}
	    		vm.windowOpen = !  vm.windowOpen;
	    		
	    			return $http.get("/rest/measure/window?doOpen=" + vm.windowOpen)
						    .then(function(response) {					    	
						    		vm.windowOpen = response.data.windowOpen;	
						    		var win = document.getElementById("displayWindow");
						    		if (! vm.windowOpen)
						    			win.style.backgroundImage = "url('images/misc/win_closed01.jpg')"; 
						    		else
						    			win.style.backgroundImage = "url('images/misc/win_open01.jpg')"; 
				    });
	    	
	    }
					
	    
	    function togglePump(){
	    	console.log("togglePump");
		    	var btn = document.getElementById("pumpButton");
	    		if (vm.pumpOn){
		    		btn.className = 'glyphicon glyphicon-play';
		    		btn.style.color = 'green';
	    		} else {
		    		btn.className = 'glyphicon glyphicon-stop';
		    		btn.style.color = 'red';
	    		}
	    		vm.pumpOn = !  vm.pumpOn;
	    			
	    			return $http.get("/rest/measure/pump?doStart=" + vm.pumpOn)
						    .then(function(response) {					    	
						    		vm.pumpOn = response.data.pumpOn;	
						    		var win = document.getElementById("displayPump");
						    		if (! vm.pumpOn)
						    			win.style.backgroundImage = "url('images/misc/Shower_symbol02.svg')"; 
						    		else
						    			win.style.backgroundImage = "url('images/misc/Shower_symbol.svg')"; 
				    });
	    	
	    }

			
			function showWaterList(nr){
    			return $http.get("/rest/water/list")
					    .then(function(response) {
					    		vm.waterTimes = response.data.list;
					    		
							    var $modalInstance = ModalService.showModal({
								      templateUrl: "views/waterList.html",
								      controller: "waterListController",
								      controllerAs: "waterListVm",
								      inputs: {
								        waterTimes: vm.waterTimes					        
								      },
											submit:function(result){
												console.log("submit");
			              		$modalInstance.close(result);
			            		}					      
								    }).then(function(modal) {
								      modal.element.modal();
								      modal.close.then(function(result) {
								        console.log("back2");
								        
								      });
								    });

					    		return vm.waterTimes;
			    });			 


        
			}

			
			function showAirList(){
    			return $http.get("/rest/air/list")
					    .then(function(response) {
					    		vm.airTimes = response.data.list;



				    var $modalInstance = ModalService.showModal({
					      templateUrl: "views/airList.html",
					      controller: "airListController",
					      controllerAs: "airListVm",
					      inputs: {
								        airTimes: vm.airTimes					        
								      }					      
					    }).then(function(modal) {
					      modal.element.modal();
					      modal.close.then(function(result) {
					        console.log("back");
					        
					      });
					    });
					    
					    return vm.airTimes;

			    });			 
        
			}

    };


})();

