(function() {
  window.app.provider('rateService', function() {
    let API = '';

    return {
      setAPI: apiUrl => (API = apiUrl),

      list: [],

      $get: ['$http', function($http) {
        return {
          getRates: () => {
            $http.get(API)
              .then(({ data }) => {
                data.forEach(item => this.list.push(item));
              });

            return this.list;
          },
          computeRate(base, target) {
            return base / target;
          },
          computeFee(data, fee, buy) {
            const sign = buy ? 1 : -1;

            return data * fee * sign / 100;
          },

          calculateAmount(currencyFrom, currencyTo, amount, buy) {
            if (!currencyFrom.$$hashKey || !currencyTo.$$hashKey) {
              return 0;
            }

            const rate = buy ? currencyFrom.buy / currencyTo.buy : currencyFrom.sale / currencyTo.sale;

            return {
              rate,
              'count': amount * rate
            };
          }
        };
      }]
    };
  });
  window.app.constant('converterConstants', {
    'persentagesList': [0, 2, 5, 10]
  });
}());