angular
    .module('myApp')
    .directive('secondPage', function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'templates/secondPageTemplate.html'
        };
    })
