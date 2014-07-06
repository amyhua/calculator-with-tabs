app.controller('CalculatorCtrl', function($scope, $rootScope) {
  $scope.currentDisplay = '0';
  $rootScope.lastOperator = 'initialize';
  $scope.$on('updateAnswer', function(event, updatedAnswer) {
    $rootScope.currentAnswer = updatedAnswer;
    $scope.$apply();
  });

  /*
  calculator scenarios
  binarioOp:  + | * | - | /

  \null
  [binaryOp] #
  # [binaryOp]
  # #
  [binaryOp] [binaryOp]
  [clear]
  [unaryOp]

  [equal]
  [decimal]

  Bin, Un, #, C, ., =
  1. # # .. #
  2. (*) C+
  3. Bin Bin
  4. Bin Un
  5. Bin #
  6. Bin .
  7. Bin =
  8. Un #
  9. Un Bin
  10. Un Un
  11. Un .
  12. Un =
  13. # Bin
  14. # Un
  15. # .
  16. # =
  17. . .
  18. . Bin
  19. . Un
  20. . #
  21. = =
  22. = Bin
  23. = Un
  24. = #
  25. = .

  */

  $scope.calculators = [
    {
      currentDisplay: '231',
      lastBinaryOperator: '*',
      previousAnswer: '3',
      active: true
      // operator: binary
    },
    {
      currentDisplay: '111',
      lastBinaryOperator: '*',
      previousAnswer: '3',
      active: false
      // operator: binary
    },
    {
      currentDisplay: '1232',
      lastBinaryOperator: '*',
      previousAnswer: '3',
      active: false
      // operator: binary
    }
  ];

  $scope.$on('createNewCalculator', function() {
    $scope.calculators.push({
      currentDisplay: '0',
      lastBinaryOperator: 'initiate',
      previousAnswer: null
    });
  });

  console.log($scope);
});
