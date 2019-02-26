/* global myApp, angular*/
(function() {
  window.app.service('rateService', ['$http', function($http) {
    this.currencyList = [];
    this.rate = 0;
    this.getRates = function() {
      return $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(({ data }) => {
        data.forEach(item => this.currencyList.push(item));
        return this.currencyList;
      }
      );
    };
    this.calculate = function(base, rate) {
      return base * rate;
    };
    this.convertRate = function(base, rate) {
      return base / rate;
    };
    this.calculateAmount = function() {
      this.currencyList.forEach(elem => {
        if (elem.ccy === this.baseCurrency) {
          const mode = !this.indicator ? 1 : -1;

          if (this.targetCurrency === 'UAH') {
            this.currencyToAmmount = !this.indicator ? this.currencyFromAmmount * elem.sale :
              this.currencyFromAmmount * elem.buy;
            this.rate = !this.indicator ? Math.round((elem.sale) * 1000) / 1000
              : Math.round((elem.buy) * 1000) / 1000;
          } else {
            this.findElem = this.currencyList.find(el => el.ccy === this.targetCurrency);
            const rate = this.indicator ? this.convertRate(elem.buy, this.findElem.buy) :
              this.convertRate(elem.sale, this.findElem.sale);
            this.rate = Math.round((rate) * 1000) / 1000;
            this.currencyToAmmount = this.calculate(this.currencyFromAmmount, rate);
          }

          if (this.fee !== 0) {
            this.currencyToAmmount += (this.currencyToAmmount * this.fee * mode);
          }
        }
      });
    };
  }]);
  window.app.constant('converterConstants', {
    'persentagesList': [0, 2, 5, 10]
  });
}());