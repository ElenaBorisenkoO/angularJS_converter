(function() {
  window.app.service('rateService', ['$http', function($http) {
    // https://api.privatbank.ua/p24api/exchange_rates?json&date=20.02.2019
    console.log('requested API data');
    this.getRates = function() {
      return $http({
        method: 'GET',
        url: 'https://www.cbr-xml-daily.ru/daily_json.js'
      }).then(({ data }) => data);
    };
  }]);
}());