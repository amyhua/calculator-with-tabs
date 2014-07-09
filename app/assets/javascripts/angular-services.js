app.service('display', function($rootScope) {
  var updateTabDisplay = function() {
    var displayText = $('#display').val();
    $('.tab.active').text(displayText);
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
      var displayText = $('#display').val();
      var firstDigit = displayText.split('')[0];
      if (displayText.trim() == '0' || firstDigit == '0') {
        displayText = displayText.trim().slice(1)
      }
      $('#display').val(displayText + numString);
    },
    setToNumber: function(numString) {
      $('#display').val(numString);
      updateTabDisplay();
    },
    updateTabDisplay: updateTabDisplay
  }
});