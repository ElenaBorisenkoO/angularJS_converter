/* global angular*/
(function() {
  window.app = angular.module('myApp', []);
  window.app.config(['rateServiceProvider', function(rateServiceProvider) {
    rateServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }
  ]);
  window.app.directive('checkInternet', function() {
    return {
      restrict: 'A'
    };
  });

  window.app.run(function($rootScope) {
    $rootScope.online = navigator.onLine;
  });
}());