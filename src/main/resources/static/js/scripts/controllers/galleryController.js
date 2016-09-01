(function() {
    'use strict';

    angular.module('app').controller('galleryController', galleryController);
    galleryController.$inject = ['ModalService','confService', 'authService'];

    function galleryController(ModalService, confService, authService) {
    	var vm = this;
    	vm.imgCount = confService.getPreference('galleryImageCount');
    	vm.allImageNames = getAllImageNames();    	
    	vm.allImageIndices = getAllImageIndices();    	
    	vm.showImg = showImg;
    	
    	authService.checkAuthentification();
    	
    	function getAllImageNames(){
    			var arr = [];
    			for (var i = 1; i <= vm.imgCount; i++){
    					var num = (i < 10) ? '0' + i : i;
    					arr.push( 'greenhouse' + num + '.jpg');
    			}
    			return arr;
    	}
    	
    	function getAllImageIndices(){
    			var arr = [];
    			for (var i = 1; i <= vm.imgCount; i++){
    				var num = (i < 10) ? '0' + i : i;
    					arr.push( num);
    			}
    			return arr;
    	}
    	
    	
    	function showImg(nr){

		    ModalService.showModal({
			      templateUrl: "views/modalImg.html",
			      controller: "modalImgController",
			      controllerAs: "modalImgVm",
			      inputs: {
			        imgNr: nr
			      }
			    }).then(function(modal) {
			      modal.element.modal();
			      modal.close.then(function(result) {
			        //$scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
			      });
			    });
			
			  };

    	
    	
    };


})();

