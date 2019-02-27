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
}());