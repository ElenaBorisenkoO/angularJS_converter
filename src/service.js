/* global myApp, angular*/
(function() {
  window.app.service('rateService', ['$http', function($http) {
    this.list = [];
    this.getRates = function() {
      if (this.list.length === 0) {
        $http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
          .then(({ data }) => {
            data.forEach(item => this.list.push(item));
          });
      }
      return this.list;
    };
    this.computeRate = function(base, target) {
      return base / target;
    };
    this.computeFee = function(data, fee, buy) {
      const sign = buy ? 1 : -1;

      return data * fee * sign / 100;
    };

    this.calculateAmount = function(currencyFrom, currencyTo, amount, buy) {
      if (!currencyFrom.$$hashKey || !currencyTo.$$hashKey) {
        return 0;
      }

      const rate = buy ? currencyFrom.buy / currencyTo.buy : currencyFrom.sale / currencyTo.sale;

      return {
        rate,
        'count': amount * rate
      };
    };
  }]);
  window.app.constant('converterConstants', {
    'persentagesList': [0, 2, 5, 10]
  });
}());