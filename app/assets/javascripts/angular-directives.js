app.directive('calculator', function($rootScope, display) {
  return {
    restrict: 'A',
    link: function($scope, element) {
      console.log('calc');
      $scope.$watch('currentDisplay', function(currentDisplay) {
        console.log('currentDisplay', currentDisplay);
      });

      $scope.$watch('currentAnswer', function(currentAnswer) {
        console.log('currentAnswer', currentAnswer);
      });
    }
  }
})

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
          display.reset();
        } else if ($scope.operator == 'number') {
          // append to display, for now
          display.appendNumber($scope.action);

        // MATH OPERATORS

        } else if ($scope.operator == 'plus') {
          if ($rootScope.lastOperator == 'plus' || $rootScope.lastOperator == 'initialize') {
            // remember last number, treat as argument to add to last display
            var numberToAdd = Number($rootScope.currentDisplay);
            var updatedAnswer = ($rootScope.currentAnswer || 0) + numberToAdd;
            // TODO: order of operations
            $scope.$emit('updateAnswer', updatedAnswer);
            $rootScope.lastOperator = 'plus';
            display.erase();
          }
        } else if ($scope.operator == 'equal') {
          // equal sign requires remembering last operator.
          // (prevAnswer lastOperator currentDisplay = ... ?)
          if ($rootScope.lastOperator == 'plus') {
            var updatedAnswer = Number($rootScope.currentAnswer) + Number($rootScope.currentDisplay);
            $scope.$emit('updateAnswer', updatedAnswer);
            // put on display
            display.setToNumber(updatedAnswer);
            $rootScope.lastOperator = 'equal';
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
});

app.directive('tabNew', function() {
  return {
    restrict: 'C',
    link: function($scope, element) {
      console.log('newTab');
      element.on('click', function() {
        $scope.$emit('createNewCalculator');
        $scope.$digest();
      });
    }
  }
});