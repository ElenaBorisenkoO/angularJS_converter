(function() {
  window.app.controller('myCtrl', ['$scope', 'rateService', function($scope, rateService) {
    // $scope.exchangeRatesData = {};
    rateService.getRates().then(data => {
      console.log(data[0].buy);
      console.log(data[0].sale);
      // console.log(data);

      $scope.calculateAmount = function() {
        data.forEach(elem => {
          if (elem.ccy === $scope.baseCurrency) {
            if ($scope.targetCurrency === 'UAH') {
              $scope.indicator === 'sale' ? $scope.currencyToAmmount = $scope.currencyFromAmmount * elem.sale :
                $scope.currencyToAmmount = $scope.currencyFromAmmount * elem.buy;
            } else {
              $scope.find = data.find(el => el.ccy === $scope.targetCurrency);
              console.log($scope.find);

              $scope.indicator === 'sale' ? $scope.currencyToAmmount = $scope.currencyFromAmmount * $scope.find.sale / elem.sale :
                $scope.currencyToAmmount = $scope.currencyFromAmmount * $scope.find.buy / elem.buy;
            }
          }
        });
      };

      // $scope.exchangeRatesData = data;
    })
      .catch(err => {
        console.log(err);
      });
    $scope.indicator = '';
    $scope.test = function($event) {
      if ($event.currentTarget.firstElementChild.classList.contains('off')) {
        $scope.indicator = 'sale';
        console.log($scope.indicator);
      } else {
        $scope.indicator = 'buy';
        console.log($scope.indicator);
      }
    };


    $scope.currencyFromAmmount = '';
    $scope.currencyToAmmount = '';
    $scope.currencyList = ['USD', 'EUR', 'RUR', 'BTC', 'UAH'];
    $scope.persentagesList = ['2%', '5%', '10%']; // {label: 2%, data: 0.02}
    $scope.baseCurrency = 'Base Currency';
    $scope.targetCurrency = 'Target Currency';
    $scope.comission = 'Comission 0%';

    // $scope.inputCurrency = 0;
    // $scope.exchangeRate = 0;
    // $scope.outputTemp = 0;
    // $scope.fee = 0;
    // $scope.feeDirection = 1;s
    // $scope.outputCurrency = 0;


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

    // $scope.applyToggleDirection = function(direction) {
    //   $scope.feeDirection = direction * -1;
    //   console.log($scope.feeDirection);
    // };
  }]);
}());