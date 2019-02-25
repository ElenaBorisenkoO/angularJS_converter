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
    $scope.data = [];
    $scope.fee = 0;

    rateService.getRates().then(data => {
      $scope.data = data;
    })
      .catch(err => {
        console.log(err);
      });

    $scope.calculate = function(base, rate) {
      return base * rate;
    };
    $scope.convertRate = function(base, rate) {
      return base / rate;
    };

    $scope.calculateAmount = function() {
      $scope.data.forEach(elem => {
        if (elem.ccy === $scope.baseCurrency) {
          const mode = $scope.indicator ? 1 : -1;

          if ($scope.targetCurrency === 'UAH') {
            $scope.currencyToAmmount = !$scope.indicator ? $scope.currencyFromAmmount * elem.sale :
              $scope.currencyFromAmmount * elem.buy;
            $scope.rate = !$scope.indicator ? Math.round((elem.sale) * 1000) / 1000 : Math.round((elem.buy) * 1000) / 1000;
          } else {
            $scope.findElem = $scope.data.find(el => el.ccy === $scope.targetCurrency);
            const rate = $scope.indicator ? $scope.convertRate(elem.buy, $scope.findElem.buy) :
              $scope.convertRate(elem.sale, $scope.findElem.sale);
            $scope.rate = Math.round((rate) * 1000) / 1000;
            $scope.currencyToAmmount = $scope.calculate($scope.currencyFromAmmount, rate);
          }

          if ($scope.fee !== 0) {
            $scope.currencyToAmmount += ($scope.currencyToAmmount * $scope.fee * mode);
          }
        }
      });
    };

    $scope.indicateToggle = function($event) {
      if ($event.currentTarget.firstElementChild.classList.contains('off')) {
        $scope.indicator = false;
      } else {
        $scope.indicator = true;
      }
      $scope.calculateAmount();
    };

    $scope.changeTargetCurrency = function($event, item) {
      if ($event.currentTarget.parentNode.previousElementSibling.innerHTML === $scope.baseCurrency) {
        $scope.baseCurrency = item;
      } else {
        $scope.targetCurrency = item;
      }
      $scope.calculateAmount();
    };

    $scope.changePersantage = function(elem) {
      $scope.comission = `Commission ${elem}`;
      $scope.fee = elem.replace(/\D/g, '') / 100;
      $scope.calculateAmount();
    };
  }]);
}());