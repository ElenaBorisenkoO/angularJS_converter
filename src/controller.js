(function() {
  window.app.controller('myCtrl', function($scope) {
    $scope.currencyFromAmmount = 0;
    $scope.currencyToAmmount = '';
    $scope.compute = function() {
      console.log($scope.currencyFromAmmount * $scope.currencyToAmmount);
    };
    $scope.currencyList = ['USD', 'EUR', 'UAH'];
    $scope.currency = 'Currency';
    $scope.changeTargetCurrency = function(item) {
      $scope.currency = item;
    };
  });
}());