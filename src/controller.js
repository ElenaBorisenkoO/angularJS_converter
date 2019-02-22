(function() {
  window.app.controller('myCtrl', ['$scope', 'rateService', function($scope, rateService) {
    $scope.exchangeRatesData = {};
    rateService.getRates().then(data => {
      console.log(data);
      $scope.exchangeRatesData = data;
    })
      .catch(err => {
        console.log(err);
      });

    $scope.currencyFromAmmount = '';
    $scope.currencyToAmmount = 10;
    $scope.currencyList = ['USD', 'EUR', 'UAH', 'GBP', 'RUB'];
    $scope.persentagesList = ['2%', '5%', '10%']; // {label: 2%, data: 0.02}
    $scope.baseCurrency = 'Base Currency';
    $scope.targetCurrency = 'Target Currency';
    $scope.comission = 'Comission 0%';

    $scope.inputCurrency = 0;
    $scope.exchangeRate = 0;
    $scope.outputTemp = 0;
    $scope.fee = 0;
    $scope.feeDirection = 1;
    $scope.outputCurrency = 0;


    $scope.changeTargetCurrency = function($event, item) {
      if ($event.currentTarget.parentNode.previousElementSibling.innerHTML === $scope.baseCurrency) {
        if ($scope.targetCurrency === item) {
          $scope.baseCurrency = 'Base Currency';
        } else {
          $scope.baseCurrency = item;
        }
      } else if ($scope.baseCurrency === item) {
        $scope.targetCurrency = 'Target Currency';
      } else {
        $scope.targetCurrency = item;
      }
    };
    $scope.changePersantage = function(elem) {
      $scope.comission = elem;
      $scope.currencyToAmmount += elem.replace(/\D/g, '') / 100;
    };

    $scope.applyToggleDirection = function(direction) {
      $scope.feeDirection = direction * -1;
      console.log($scope.feeDirection);
    };
  }]);
}());