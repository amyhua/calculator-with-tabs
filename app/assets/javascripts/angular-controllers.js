app.controller('CalculatorCtrl', function($scope, $rootScope) {

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
      id: 1,
      currentDisplay: '231',
      lastBinaryOperator: '*',
      previousAnswer: '3',
      active: true
      // operator: binary
    },
    {
      id: 2,
      currentDisplay: '111',
      lastBinaryOperator: '*',
      previousAnswer: '3',
      active: false
      // operator: binary
    },
    {
      id: 3,
      currentDisplay: '1232',
      lastBinaryOperator: '*',
      previousAnswer: '3',
      active: false
      // operator: binary
    }
  ];

  $scope.activeCalculator = $scope.calculators[0];

  $scope.$on('createNewCalculator', function() {
    $scope.calculators.push({
      id: Date.now(),
      currentDisplay: '0',
      lastBinaryOperator: 'initiate',
      previousAnswer: null,
    });
  });

  $scope.$on('toggleCalculator', function(event, calcId) {
    console.log('got it! toggleCalculator');
    $scope.activeCalculator = _.find($scope.calculators, { id: calcId });
    $scope.$apply();
  });
});
