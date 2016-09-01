(function() {
    'use strict';

    angular.module('app').controller('modalImgController', modalImgController);
    modalImgController.$inject = ['$scope', '$element', 'imgNr', 'close','confService'];

    function modalImgController($scope, $element, imgNr, close,confService) {
    	var vm = this;
    	vm.doClose = doClose;
    	vm.imgNr = imgNr;
    	vm.imgCount = confService.getPreference('galleryImageCount');
    	vm.prevImg = prevImg;
    	vm.nextImg = nextImg;
    	
		  function doClose() {
		 	  close({
		      name: $scope.name,
		      age: $scope.age
		    }, 500); // close, but give 500ms for bootstrap to animate
		  };
		  
		  function prevImg(){
		  	var nr = parseInt(vm.imgNr);
		  	if (nr > 1)
		  		nr--;
		  	if (nr == 1)
		  		nr = vm.imgCount;
		  	paddImgNr(nr);
		  }
		  
		  function nextImg(){
		  	var nr = parseInt(vm.imgNr);
		  	if (nr < vm.imgCount)
		  		nr++;
		  	if (nr == vm.imgCount)
		  		nr = 1;
		  	paddImgNr(nr);
		  }
		  
		  function paddImgNr(nr){
		  	var num = '' + nr;
		  	if (nr < 10)
		  		num = '0' + nr;
		  	vm.imgNr = num;
		  }
    	
    };


})();

