(function() {
  window.app.controller('myCtrl', ['rateService', 'converterConstants', '$scope',
    function(rateService, converterConstants, $scope) {
      this.rate = rateService.rate;
      this.indicator = true;
      this.currencyFromAmmount = 0;
      this.currencyToAmmount = 0;
      this.data = rateService.getRates();
      this.persentagesList = converterConstants.persentagesList;
      this.baseCurrency = { ccy: 'Choose currency' };
      this.targetCurrency = { ccy: 'Target currency' };
      this.fee = 0;
      this.tax = 0;

      this.refreshOnDataChanged = function() {
        const result = rateService.calculateAmount(this.baseCurrency, this.targetCurrency,
          this.currencyFromAmmount, this.indicator);
        this.currencyToAmmount = result['count'];
        this.rate = result.rate;
        this.tax = rateService.computeFee(this.currencyToAmmount, this.fee, this.indicator);
      };

      this.changeTargetCurrency = function(item, target) {
        if (target.ccy === this.baseCurrency.ccy) {
          this.baseCurrency = item;
        } else {
          this.targetCurrency = item;
        }
        this.refreshOnDataChanged();
      };

      this.changePersantage = function(elem) {
        this.fee = elem;
        this.refreshOnDataChanged();
      };

      $scope.$watchGroup(['ctr.indicator', 'ctr.currencyFromAmmount'], () => {
        this.refreshOnDataChanged();
      });
      // $scope.$watch('online', function(newStatus) { ... });
    }]);
}());