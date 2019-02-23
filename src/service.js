(function() {
  window.app.service('rateService', ['$http', function($http) {
    console.log('requested API data');
    this.getRates = function() {
      return $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(({ data }) => data);
    };
  }]);
}());