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
      $rootScope.currentDisplay = 0;
      $rootScope.currentAnswer = 0;
      $rootScope.lastOperator = 'reset';
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