var app = angular.module('app', []);

app.directive('calcButton', function() {
  return {
    restrict: 'E',
    scope: {
      size: '@',
      action: '@'
    },
    replace: true,
    template: '<button class="calc-btn btn-{{size}}">{{action}}</button>',
    link: function($scope, element) {

    }
  }
});

app.directive('tab', function() {
  return {
    restrict: 'E',
    scope: {
      total: '@'
    },
    replace: true,
    template: '<div class="tab">{{total}}</div>',
    link: function($scope, element) {
      console.log('tab!', element);
      element.on('click', function(){
        // make tab "active"
        $('.tab').removeClass('active');
        element.addClass('active');

        // change display, ordering digits backwards
        var digits = _.map($scope.total.split(''), function(numString) {
          return Number(numString);
        });
        var $display = $('.display .total');

        $display.html('');
        _.each(digits, function(digit) {
          var spanHtml = '<span class="digit">' + digit + '</span>';
          $display.prepend(spanHtml);
        });

      });
    }
  }
})