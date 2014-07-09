app.directive('calculator', function($rootScope, display) {
  return {
    restrict: 'A',
    scope: {
      activeCalculator: '='
    },
    link: function($scope, element) {
      $scope.$watch('activeCalculator', function(newCalc) {
        display.setToNumber(newCalc.currentDisplay);
        // tell buttons to switch out active calculator
        $scope.$broadcast('toggleCalculator', newCalc);
      }, true);
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
      $scope.$on('toggleCalculator', function(event, newCalc) {
        $scope.activeCalculator = newCalc;
      });

      $scope.$watch('activeCalculator', function(newCalc) {
        console.log('calcButton: modify parent activeCalc');
        $scope.$parent.activeCalculator = newCalc;
      });

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
      total: '@',
      id: '='
    },
    replace: true,
    template: '<div class="tab">{{total}}</div>',
    link: function($scope, element) {
      element.on('click', function(){
        // make tab "active"

        // CSS
        $('.tab').removeClass('active');
        element.addClass('active');

        // switch out calculators
        $scope.$emit('toggleCalculator', $scope.id);
      });
    }
  }
});

app.directive('tabNew', function($timeout) {
  return {
    restrict: 'C',
    link: function($scope, element) {
      console.log('newTab');
      element.on('click', function() {
        $scope.$emit('createNewCalculator');
        $scope.$digest();
        $timeout(function() {
          // resize tabs, if needed
          $tabs = $('.tab');
          // if ($tabs.length >= 5) {
          //   var tabPadding = $tabs.outerWidth(true) - $tabs.width(); // e.g., 15 px
          // }
          var availableWidth = $('.tabs').width(); // 63px = space of +new tab
          var tabWidth = availableWidth / $tabs.length;
          $('.tab').css({
            minWidth: 'initial',
            maxWidth: 'initial',
            width: 'initial'
          });
          $('.tab').outerWidth(tabWidth); 
          console.log('tabWidth', tabWidth);
          console.log('widths', tabWidth * $tabs.length)
          // make new tab active
          $('.tab:last-child').click();
        });
      });
    }
  }
});