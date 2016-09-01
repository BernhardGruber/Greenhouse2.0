
var app = angular.module('app', ['ngRoute','pascalprecht.translate','angularModalService','ui.bootstrap']);

app.config(['$translateProvider','$translatePartialLoaderProvider', '$httpProvider', function ($translateProvider, $translatePartialLoaderProvider, $httpProvider) {
 

        
	
	$translateProvider.useLoader('$translatePartialLoader', {
	  //urlTemplate: '/i18n/{part}/{lang}.json'
	  urlTemplate: '/i18n/{lang}/{part}.json'
	});
	
  //ConfService.initConfig();
	//var lng = ConfService.getPreference('languageKey');
	
	$translateProvider.useSanitizeValueStrategy('escaped');
	$translateProvider.preferredLanguage('de');
	
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	
  
}]);


app.run(function(confService) {
    confService.initConfig();
});


