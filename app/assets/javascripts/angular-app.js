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
})