angular
    .module('myApp')
    .directive('listTemplate', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                showItem: '=showItemAtr',
                showList: '=showAtr',
                delete: '=deleteAtr',
                details: '=detailsAtr'
            },
            link: function(scope, element, attrs) {
                scope.deleteFunc = function(item) {
                    scope.delete = item;
                };
                scope.detailsFunc = function(id) {
                    scope.details = id;
                    scope.showItem = 'details';
                }
            },
            templateUrl: 'templates/listTemplate.html'
        };
    })
