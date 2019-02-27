(function() {
  window.app = angular.module('myApp', []);
  // window.app.config(['rateServiceProvider', function(rateServiceProvider) {
  //   console.log(rateServiceProvider);
  //   rateServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  // }
  // ]);
  // window.app.run(function($window, $rootScope) {
  //   $rootScope.online = navigator.onLine;
  //   $window.addEventListener('offline', function() {
  //     $rootScope.$apply(function() {
  //       $rootScope.online = false;
  //     });
  //   }, false);

  //   $window.addEventListener('online', function() {
  //     $rootScope.$apply(function() {
  //       $rootScope.online = true;
  //     });
  //   }, false);
  // });
}());