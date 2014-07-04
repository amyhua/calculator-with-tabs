var app = angular.module('app', []);

app.service('display', function() {
  var updateTabDisplay = function() {
    $('.tab.active').text($('#display').text());
  };

  return {
    erase: function() {
      $('#display').html('');
    },
    appendNumber: function(numString) {
      // clear leading zero, if any
      var displayText = $('#display').text();
      var firstDigit = displayText.split('')[0];
      if (displayText.trim() == '0' || firstDigit == '0') {
        displayText = displayText.trim().slice(1)
      }
      $('#display').text(displayText + numString);
      updateTabDisplay();
    },
    updateTabDisplay: updateTabDisplay
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
          display.updateTabDisplay();
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

        var num = element.text();
        if (num === '') {
          num = $scope.total;
        }

        display.erase();
        display.appendNumber(num);
      });
    }
  }
})