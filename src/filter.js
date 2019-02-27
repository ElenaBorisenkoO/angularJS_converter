(function() {
  window.app.filter('currencyFilter', function() {
    return function(target, value) {
      const result = [];

      if (target) {
        target.forEach(function(item) {
          if (value !== item) {
            result.push(item);
          }
        });
      }
      return result;
    };
  });
  window.app.directive('toggleCheckbox', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link(scope, element, attributes, ngModelController) {
        element.on('change.toggle', function(event) {
          const checked = element.prop('checked');
          ngModelController.$setViewValue(checked);
        });
        ngModelController.$render = function() {
          element.bootstrapToggle(ngModelController.$viewValue ? 'on' : 'off');
        };
        scope.$on('$destroy', function() {
          element.off('change.toggle');
          element.bootstrapToggle('destroy');
        });
        const initialValue = scope.$eval(attributes.ngModel);
        element.prop('checked', initialValue);
      }
    };
  });
}());