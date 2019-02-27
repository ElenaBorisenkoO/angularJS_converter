/* global angular*/
(function() {
  window.app = angular.module('myApp', []);
  window.app.config(['rateServiceProvider', function(rateServiceProvider) {
    rateServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }
  ]);
  window.app.run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    // console.log($rootScope.online);
    $window.addEventListener('offline', function() {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);

    $window.addEventListener('online', function() {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
    console.log($rootScope.online);
  });
}());