(function() {
  window.app.controller('myCtrl', ['$scope', 'rateService', function($scope, rateService) {
    $scope.rate = '0.00';
    $scope.indicator = true;
    $scope.currencyFromAmmount = 0;
    $scope.currencyToAmmount = 0;
    $scope.currencyList = ['USD', 'EUR', 'RUR', 'BTC', 'UAH'];
    $scope.persentagesList = ['0%', '2%', '5%', '10%'];
    $scope.baseCurrency = 'Choose Currency';
    $scope.comission = 'Commission 0%';
    $scope.targetCurrency = 'USD';

    rateService.getRates().then(data => {
      console.log(data[0].buy);
      console.log(data[0].sale);
      console.log(data);

      $scope.calculateAmount = function() {
        data.forEach(elem => {
          if (elem.ccy === $scope.baseCurrency) {
            if ($scope.targetCurrency === 'UAH') {
              !$scope.indicator ? $scope.currencyToAmmount = $scope.currencyFromAmmount * elem.sale :
                $scope.currencyToAmmount = $scope.currencyFromAmmount * elem.buy;
              !$scope.indicator ? $scope.rate = elem.sale : $scope.rate = elem.buy;
            } else {
              $scope.find = data.find(el => el.ccy === $scope.targetCurrency);
              !$scope.indicator ? $scope.currencyToAmmount = $scope.currencyFromAmmount * $scope.find.sale / elem.sale :
                $scope.currencyToAmmount = $scope.currencyFromAmmount * $scope.find.buy / elem.buy;
              !$scope.indicator ? $scope.rate = $scope.find.sale / elem.sale :
                $scope.rate = $scope.find.buy / elem.buy;
            }
          }
        });
      };
    })
      .catch(err => {
        console.log(err);
      });
    $scope.indicateToggle = function($event) {
      if ($event.currentTarget.firstElementChild.classList.contains('off')) {
        $scope.indicator = false;
        console.log($scope.indicator);
      } else {
        $scope.indicator = true;
        console.log($scope.indicator);
      }
      $scope.calculateAmount();
    };


    // $scope.inputCurrency = 0;
    // $scope.exchangeRate = 0;
    // $scope.outputTemp = 0;
    // $scope.fee = 0;
    // $scope.feeDirection = 1;
    // $scope.outputCurrency = 0;


    $scope.changeTargetCurrency = function($event, item) {
      if ($event.currentTarget.parentNode.previousElementSibling.innerHTML === $scope.baseCurrency) {
        if ($scope.targetCurrency === item) {
          $scope.baseCurrency = 'Choose Currency';
        } else {
          $scope.baseCurrency = item;
        }
      } else if ($scope.baseCurrency === item) {
        $scope.targetCurrency = 'Target Currency';
      } else {
        $scope.targetCurrency = item;
      }
      $scope.calculateAmount();
    };
    $scope.changePersantage = function(elem) {
      $scope.comission = `Commission ${elem}`;
      $scope.currencyToAmmount += elem.replace(/\D/g, '') / 100;
    };

    // $scope.applyToggleDirection = function(direction) {
    //   $scope.feeDirection = direction * -1;
    //   console.log($scope.feeDirection);
    // };
  }]);
}());