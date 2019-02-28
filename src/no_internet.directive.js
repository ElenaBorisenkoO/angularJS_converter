(function() {
  window.app.directive('noInet', function() {
    return {
      restrict: 'E',
      templateUrl: '../no_internet.template.html'
    };
  });
}());