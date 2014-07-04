var app = angular.module('app', []);

app.service('display', function($rootScope) {
  var updateTabDisplay = function() {
    var displayText = $('#display').text();
    $('.tab.active').text(displayText);
    $rootScope.currentDisplay = displayText;
  };

  return {
    erase: function() {
      $('#display').html('');
    },
    reset: function() {
      $('#display').html('0');
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
    setToNumber: function(numString) {
      $('#display').text(numString);
    },
    updateTabDisplay: updateTabDisplay
  }
});

app.controller('CalculatorCtrl', function($scope, $rootScope) {
  console.log('CalculatorCtrl');
  $scope.currentDisplay = '0';
  console.log('$scope', $scope);
  $scope.$on('updateAnswer', function(event, updatedAnswer) {
    console.log(updatedAnswer);
    $rootScope.currentAnswer = updatedAnswer;
    $scope.$apply();
  });
});

app.directive('calcButton', function(display, $rootScope) {
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
          display.updateTabDisplay();
        } else if ($scope.operator == 'number') {
          // append to display, for now
          display.appendNumber($scope.action);

        // MATH OPERATORS

        } else if ($scope.operator == 'plus') {
          // remember last number
          var numberToAdd = Number($rootScope.currentDisplay);
          var updatedAnswer = ($rootScope.currentAnswer || 0) + numberToAdd;
          // TODO: order of operations
          $scope.$emit('updateAnswer', updatedAnswer);
          $rootScope.lastOperator = 'plus';
          display.reset();
        } else if ($scope.operator == 'equal') {
          // equal sign requires remembering last operator.
          // (prevAnswer lastOperator currentDisplay = ... ?)
          if ($rootScope.lastOperator == 'plus') {
            var updatedAnswer = Number($rootScope.currentAnswer) + Number($rootScope.currentDisplay);
            $scope.$emit('updateAnswer', updatedAnswer);
            // put on display
            display.setToNumber(updatedAnswer);
          }
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