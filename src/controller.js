(function() {
  window.app.controller('myCtrl', ['rateService', 'converterConstants', '$scope',
    function(rateService, converterConstants, $scope) {
      this.rate = rateService.rate;
      this.indicator = true;
      this.currencyFromAmmount = 0;
      this.currencyToAmmount = 0;
      this.currencyList = ['USD', 'EUR', 'RUR', 'BTC', 'UAH'];
      this.persentagesList = converterConstants.persentagesList;
      this.baseCurrency = this.currencyList[4];
      this.targetCurrency = this.currencyList[0];
      this.data = rateService.getRates();
      this.fee = 0;
      this.indicateToggle = function($event) {
        this.indicator = !$event.currentTarget.firstElementChild.classList.contains('off');
        rateService.calculateAmount();
      };
      this.changeTargetCurrency = function(item, target) {
        if (target === this.baseCurrency) {
          this.baseCurrency = item;
        } else {
          this.targetCurrency = item;
        }
        rateService.calculateAmount();
        console.log(rateService.rate);
      };
      this.changePersantage = function(elem) {
        this.fee = elem;
        rateService.calculateAmount();
      };

      $scope.$watch('currencyFromAmmount', () => {
        rateService.calculateAmount();
      });
    }]);
}());