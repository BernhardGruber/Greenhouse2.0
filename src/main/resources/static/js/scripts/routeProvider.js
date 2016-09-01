
app.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
	
    $routeProvider.
      when('/login', {
        templateUrl: '/views/login.html',        
        controller: 'loginController',
        controllerAs: 'loginVm',
        bindToController: true        
    	}).
    when('/start', {
        templateUrl: '/views/start.html',        
        controller: 'startController',
        controllerAs: 'startVm',
        bindToController: true        
    	}).
      when('/measure', {
        templateUrl: '/views/measure.html',
        controller: 'measureController',
        controllerAs: 'measureVm',
        bindToController: true
      }).
      when('/schedule', {
        templateUrl: '/views/schedule.html',
        controller: 'scheduleController',
        controllerAs: 'scheduleVm',
        bindToController: true
      }).
      when('/plants/seed', {
        templateUrl: '/views/seed.html',
        controller: 'seedController',
        controllerAs: 'seedVm',
        bindToController: true
      }).
      when('/plants/harvest', {
        templateUrl: '/views/harvest.html',
        controller: 'harvestController',
        controllerAs: 'harvestVm',
        bindToController: true
      }).
      when('/gallery', {
        templateUrl: '/views/gallery.html',
        controller: 'galleryController',
        controllerAs: 'galleryVm',
        bindToController: true
      }).
      when('/blog', {
        templateUrl: '/views/blog.html',
        controller: 'blogController',
        controllerAs: 'blogVm',
        bindToController: true
      }).
      otherwise({
        redirectTo: '/login'
      });
    
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    
}]);
