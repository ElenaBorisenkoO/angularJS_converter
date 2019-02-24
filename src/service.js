(function() {
  window.app.service('rateService', ['$http', function($http) {
    this.getRates = function() {
      return $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(({ data }) => data);
    };
  }]);
  window.app.filter('currencyFilter', function() {
    return function(target, value) {
      const result = [];
      target.forEach(function(item) {
        if (value !== item) {
          result.push(item);
        }
      });
      return result;
    };
  });
}());