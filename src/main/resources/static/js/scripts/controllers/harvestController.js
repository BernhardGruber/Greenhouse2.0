(function() {
    'use strict';

    angular.module('app').controller('harvestController', harvestController);
    harvestController.$inject = ['$http', 'ModalService','$translatePartialLoader', '$translate', 'confService', 'authService'];

    function harvestController($http, ModalService, $translatePartialLoader, $translate, confService, authService) {
    	var vm = this;
    	vm.animationSetting = confService.getPreference('animationSetting');
    	vm.currentSector = 1;
    	vm.deleteHarvest = deleteHarvest;
    	vm.onClick = onClick;
    	vm.harvests = null;
    	
    	authService.checkAuthentification();
    	
    	$translatePartialLoader.addPart('harvest');
    	$translate.refresh();
    	
    	initAnimation();    	
    	initHarvests();
    	
    	function initAnimation(){
    		for (var i = 1; i <= 10; i++){
    				$('.innerPoly'+i).css("-webkit-animation-play-state", vm.animationSetting); 
    				$('.outerPoly'+i).css("-webkit-animation-play-state", vm.animationSetting); 
    		}
    	}
 
    	
    	function initHarvests(){
    			console.log("pattern: " + document.getElementById("pattern2"));
    			$http.get("/rest/plants/harvest/list")
			    .then(function(response) {
	        		//console.log(response.data);
	        		vm.harvests = response.data.list;
			    });
			    
    			$http.get("/rest/plants/seeds/list")
					    .then(function(response) {
			        		//console.log(response.data);
			        		vm.seeds = response.data.list;
			        		var sectorMap = [];
			        		
			        		for (var i = 0; i < vm.seeds.length; i++){
			        			var sector = vm.seeds[i].sector;
				    				//console.log(sector);				    				
				    				//setPlanted(sector);
				    				//var pattern = createPattern();
				    				var sectorVegs = sectorMap[sector];
				    				if (sectorVegs == null){
				    					sectorVegs = [];
				    					sectorVegs.push(vm.seeds[i]);	
				    					sectorMap[sector] = sectorVegs;
				    				} else {
				    					sectorVegs.push(vm.seeds[i]);	
				    					sectorMap[sector] = sectorVegs;
				    				}
				    			}
				    			
				    			for (sector in sectorMap){
				    					var patternName = 'patternSector' + sector;
				    					createPattern(patternName, sectorMap[sector]);
				    					$('svg polygon')[sector].setAttribute('style','fill: url(#' + patternName + ');');
				    			}
			        		
			    });
    
    	}

			/**    	
			 * onClick either set table to current sector, or if this is already the case, show add-harvest form
			 */
    	function onClick(nr){
    			if (vm.currentSector != nr){
    				vm.currentSector = parseInt(nr);
    				console.log("vm.currentSector: " + vm.currentSector );    
    			} else {
						showModal(nr);
    			}
			};
			
			function showModal(nr){
		    var $modalInstance = ModalService.showModal({
			      templateUrl: "views/harvestSector.html",
			      controller: "harvestSectorController",
			      controllerAs: "harvestSectorVm",
			      inputs: {
			        sectorNr: nr					        
			      }
			    }).then(function(modal) {
			      modal.element.modal();
			      modal.close.then(function(result) {
			        initHarvests();
			      });
			    });

        
			}
			  
    	function deleteHarvest(nr){

				return $http.get("/rest/plants/harvest/delete",{
    					params: {
    						id:nr
    						}
    					})
					    .then(function(response) {
					    		console.log(response.data);			        		
				    			initHarvests();
			    });
			        		
    	}

    	function setPlanted(nr){
    	}
    	
        	function createPattern(patternId, seedings){
						//var SVG_NS =  $('svg')[0].namespaceURI;
						
						var w = 300;
						var h = 150;
						if (seedings.length == 3){
							w = 450;
						}
						
						var pattern = createPatternBasics(patternId, w, h);
						/*
						var pattern = document.createElementNS(SVG_NS,'pattern');
						pattern.setAttribute('id',patternId);
						pattern.setAttribute('patternUnits','userSpaceOnUse');
						pattern.setAttribute('width',w);
						pattern.setAttribute('height',h);
						pattern.setAttribute('x','0');
						pattern.setAttribute('y','0');
						*/
						
						if (seedings.length == 1){
							var imgName = seedings[0].vegetable.toLowerCase() + '.jpg';
							var pattern = createSingleImgPattern(patternId, imgName, seedings[0].vegetable);
						} else if (seedings.length == 2){
							var pattern = createDoubleImgPattern( patternId, seedings ); 
						} else if (seedings.length == 3){
							var pattern = createTrippleImgPattern( patternId, seedings );
						} else {
							var pattern = createMultiImgPattern(patternId, seedings );							
						}
						//document.querySelector('#testP2').appendChild(svg);    
						var defs = $('svg')[0].querySelector('defs');
						defs.appendChild(pattern);
						
						//$('svg path')[0].setAttribute('style','fill: url(#testPattern);');
        		return pattern;        		
        	}
        	
        	function createSingleImgPattern(patternId, imgName, vegetable){
        		var pattern = createPatternBasics(patternId, 150, 150);
				var imgName = vegetable.toLowerCase() + '.jpg';
				createPatternImage(pattern, imgName, 0, 0);
				return pattern;
        	}
        	
        	function createDoubleImgPattern(patternId, seedings){
        		var pattern = createPatternBasics(patternId, 300, 300);
				var imgName0 = seedings[0].vegetable.toLowerCase() + '.jpg';
				var imgName1 = seedings[1].vegetable.toLowerCase() + '.jpg';
				createPatternImage(pattern, imgName0, 0, 0);
				createPatternImage(pattern, imgName1, 150, 0);
				createPatternImage(pattern, imgName1, 0, 150);
				createPatternImage(pattern, imgName0, 150, 150);
				return pattern;
        	}
        	
        	function createTrippleImgPattern(patternId, seedings){
        		var pattern = createPatternBasics(patternId, 450, 450);
				var imgName0 = seedings[0].vegetable.toLowerCase() + '.jpg';
				var imgName1 = seedings[1].vegetable.toLowerCase() + '.jpg';
				var imgName2 = seedings[2].vegetable.toLowerCase() + '.jpg';
				createPatternImage(pattern, imgName0, 0, 0);
				createPatternImage(pattern, imgName1, 150, 0);
				createPatternImage(pattern, imgName2, 300, 0);
				createPatternImage(pattern, imgName1, 0, 150);
				createPatternImage(pattern, imgName2, 150, 150);
				createPatternImage(pattern, imgName0, 300, 150);
				createPatternImage(pattern, imgName2, 0, 300);
				createPatternImage(pattern, imgName0, 150, 300);
				createPatternImage(pattern, imgName1, 300, 300);
				
				return pattern;
        	}
        	
        	/**
        	 * only first four images handled
        	 */
        	function createMultiImgPattern(patternId, seedings){
        		var pattern = createPatternBasics(patternId, 300, 300);
				var imgName0 = seedings[0].vegetable.toLowerCase() + '.jpg';
				var imgName1 = seedings[1].vegetable.toLowerCase() + '.jpg';
				createPatternImage(pattern, imgName0, 0, 0);
				createPatternImage(pattern, imgName1, 150, 0);
				createPatternImage(pattern, imgName1, 0, 150);
				createPatternImage(pattern, imgName0, 150, 150);
				return pattern;
        	}
        	
        	
        	function createPatternBasics(patternId, w, h){
        		var SVG_NS =  $('svg')[0].namespaceURI;
				var pattern = document.createElementNS(SVG_NS,'pattern');
				pattern.setAttribute('id',patternId);
				pattern.setAttribute('patternUnits','userSpaceOnUse');
				pattern.setAttribute('width',w);
				pattern.setAttribute('height',h);
				pattern.setAttribute('x','0');
				pattern.setAttribute('y','0');
				return pattern;
        	}
        	
        	function createPatternImage(pattern, imgName, xPos, yPos){
							var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
							svgimg.setAttribute('height','150');
							svgimg.setAttribute('width','150');
							svgimg.setAttribute('id','testimg2');
							svgimg.setAttribute('href','/images/bg/' + imgName);
							svgimg.setAttribute('x',xPos);
							svgimg.setAttribute('y',yPos);
							
							pattern.appendChild(svgimg);
        	}
    	
  
      	
    };


})();

