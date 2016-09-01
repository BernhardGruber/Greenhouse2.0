(function() {
    'use strict';

    angular.module('app').controller('seedController', seedController);
    seedController.$inject = ['$http', 'ModalService','$translatePartialLoader', '$translate', 'confService', 'authService'];

    function seedController($http, ModalService, $translatePartialLoader, $translate, confService, authService) {
    	var vm = this;
    	
    	vm.animationSetting = confService.getPreference('animationSetting');
    	vm.deleteSeed = deleteSeed;
    	vm.currentSector = 1;
    	vm.onClick = onClick;
    	vm.seedings = null;
    	
    	authService.checkAuthentification();
    	
    	$translatePartialLoader.addPart('seed');
    	$translate.refresh();
    	
    	if (!vm.isInitialized){
	    	initAnimation();    	
	    	initSeedings();
    	}
    	
    	function initAnimation(){
    		for (var i = 1; i <= 10; i++){
    				$('.innerPoly'+i).css("-webkit-animation-play-state", vm.animationSetting); 
    				$('.outerPoly'+i).css("-webkit-animation-play-state", vm.animationSetting); 
    		}
    	}
 
    	
    	function initSeedings(){
    		
    			$http.get("/rest/plants/seeds/list")
					    .then(function(response) {
			        		//console.log(response.data);
			        		vm.seedings = response.data.list;
			        		for (var i = 0; i < vm.seedings.length; i++){
			        			var sector = vm.seedings[i].sector;
				    			setPlanted(sector);
				    			
			    				var poly = $('svg polygon')[sector];
			    				var bbox = poly.getBBox();
			    				console.log(poly.getBBox());
							
			    				var txtLen =  (vm.seedings[i].vegetable.length*fSize);
								var xPos = bbox.x + (bbox.width/2); //getRandomArbitrary(bbox.x, (bbox.x + bbox.width));
								var diff = (bbox.x + bbox.width) - txtLen;
								if (diff < xPos)
									xPos = diff;
								var yPos = bbox.y + (bbox.height/2); // getRandomArbitrary(bbox.y, (bbox.y + bbox.height)); 
								var angle = getRandomArbitrary(-45,45); 
								var fSize = getRandomArbitrary(30,50);
			
								var SVG_NS =  $('svg')[0].namespaceURI;
								var newText = document.createElementNS(SVG_NS,"text");
								newText.setAttribute("x",xPos);     
								newText.setAttribute("y",yPos); 
								newText.setAttribute("font-size",fSize);
								var rot = "rotate(" + angle + "," + xPos + "," + yPos + ")";
								//var rot = "rotate(0," + xPos + "," + yPos + ")";
								newText.setAttribute("transform",rot);
								
								var textNode = document.createTextNode(vm.seedings[i].vegetable);
								newText.appendChild(textNode);
								console.log("newText: " + newText.getBBox());
								$('svg')[0].appendChild(newText);
								
				    			
				    		}

		        		
			    });
    			vm.isInitialized = true;
    	}
    	
		
		function getRandomArbitrary(min, max) {
		    return Math.random() * (max - min) + min;
		}
    	
    	
    	function onClick(nr){
    			if (vm.currentSector != nr){
    				vm.currentSector = parseInt(nr);
    				console.log("vm.currentSector: " + vm.currentSector );    
    			} else {
						showModal(nr);
    			}
    			//console.log("onClick: " + nr );    					
			};
			
			function showModal(nr){

				    var $modalInstance = ModalService.showModal({
					      templateUrl: "app/views/seedSector.html",
					      controller: "seedSectorController",
					      controllerAs: "seedSectorVm",
					      inputs: {
					        sectorNr: nr					        
					      },
								submit:function(result){
									console.log("submit");
              		$modalInstance.close(result);
            		}					      
					    }).then(function(modal) {
					      modal.element.modal();
					      modal.close.then(function(result) {
					        //$scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
					        console.log("back");
					        initSeedings();
					      });
					    });

        
			}
			  
    	function deleteSeed(nr){

				return $http.get("/rest/plants/seeds/delete",{
    					params: {
    						id:nr
    						}
    					})
					    .then(function(response) {
					    		console.log(response.data);			        		
				    			//alert("Seed-Deleted: " + nr);
				    			initSeedings();
			    });
			        		
    	}
    	
    	
    	function setPlanted(nr){
    			var ps = '.plantedSoil';
    			console.log($(ps).css('fill'));
    			var pName = '.outerPoly' + nr;
    			if (nr > 10)
    				pName = '.innerPoly' + (nr-10);
    			var className = '.' + $(pName).attr('class');
    			$(className).css('fill', '#008000');
    			//$(pName).attr('class','plantedSoil');
    	}
  
  
    	
    };


})();

app.directive('leaveOnClick', function($animate) {
  return {
    scope: {
      'leaveOnClick': '&'
    },
    link: function (scope, element) {
      scope.leaveOnClick = scope.leaveOnClick || (function() {});
      element.on('click', function() {
        scope.$apply(function() {
          $animate.leave(element, scope.leaveOnClick);
        });
      });
    }
  };
});
