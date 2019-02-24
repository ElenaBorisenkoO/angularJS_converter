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
      // sale -% buy +%
      $scope.data.forEach(elem => {
        if (elem.ccy === $scope.baseCurrency) {
          const mode = $scope.indicator ? 1 : -1;

          if ($scope.targetCurrency === 'UAH') {
            !$scope.indicator ? $scope.currencyToAmmount = $scope.currencyFromAmmount * elem.sale :
              $scope.currencyToAmmount = $scope.currencyFromAmmount * elem.buy;
            !$scope.indicator ? $scope.rate = elem.sale : $scope.rate = elem.buy;
          } else {
            $scope.findElem = $scope.data.find(el => el.ccy === $scope.targetCurrency);
            const rate = $scope.indicator ? $scope.convertRate($scope.findElem.buy, elem.buy) :
              $scope.convertRate($scope.findElem.sale, elem.sale);
            $scope.rate = rate;
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