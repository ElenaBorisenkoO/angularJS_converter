/* global angular*/
(function() {
  window.app = angular.module('myApp', ['ui.router']);
  window.app.config(['rateServiceProvider', '$stateProvider', function(rateServiceProvider, $stateProvider) {
    rateServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    $stateProvider
      .state({
        name: 'converter',
        url: '/converter',
        component: 'currencyConverter'
      })
      .state({
        name: 'about',
        url: '/about',
        template: '<h3>Its currency converter app!</h3>'
      });
  }
  ]);

  window.app.run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
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
  });
}());