(function() {
  window.app.controller('myCtrl', function($scope) {
    $scope.currencyFromAmmount = '';
    $scope.currencyToAmmount = '';
    // $scope.compute = function() {
    //   console.log($scope.currencyFromAmmount * $scope.currencyToAmmount);
    // };
    $scope.currencyList = ['USD', 'EUR', 'UAH', 'GBR', 'RUB'];
    $scope.persentagesList = ['2%', '5%', '10%'];
    $scope.baseCurrency = 'Base Currency';
    $scope.targetCurrency = 'Target Currency';
    $scope.comission = 'Comission';

    $scope.changeTargetCurrency = function($event, item) {
      if ($event.currentTarget.parentNode.previousElementSibling.innerHTML === $scope.baseCurrency) {
        $scope.baseCurrency = item;
      } else {
        $scope.targetCurrency = item;
      }
    };
    $scope.changePersantage = function(elem) {
      $scope.comission = elem;
    };
  });
}());