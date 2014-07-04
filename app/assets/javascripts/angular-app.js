var app = angular.module('app', []);

app.service('display', function() {
  return {
    erase: function() {
      $('#display').html('');
    },
    appendNumber: function(numString) {
      // clear leading zero, if any
      var firstDigit = $('#display .digit')[0];
      if ($(firstDigit).text() == '0') {
        $(firstDigit).remove();
      }
      var digits = _.map(numString.split(''), function(numString) {
        return Number(numString);
      });
      _.each(digits, function(digit) {
        var spanHtml = '<span class="digit">' + digit + '</span>';
        $('#display').prepend(spanHtml);
      });
    }
  }
})
app.directive('calcButton', function(display) {
  var $display = $('#display');
  return {
    restrict: 'E',
    scope: {
      size: '@',
      action: '@',
      operator: '@'
    },
    replace: true,
    template: '<button class="calc-btn btn-{{size}}">{{action}}</button>',
    link: function($scope, element) {
      element.on('click', function() {
        if ($scope.operator == 'clear') {
          $display.html('<span class="digit">0</span>');
          // TODO: create displayHelpers
        }
        if ($scope.operator == 'number') {
          // append to display, for now
          display.appendNumber($scope.action);
        }
      })
    }
  }
});

app.directive('tab', function(display) {
  var $display = $('#display');
  return {
    restrict: 'E',
    scope: {
      total: '@'
    },
    replace: true,
    template: '<div class="tab">{{total}}</div>',
    link: function($scope, element) {
      element.on('click', function(){
        // make tab "active"
        $('.tab').removeClass('active');
        element.addClass('active');

        display.erase();
        display.appendNumber($scope.total);
      });
    }
  }
})