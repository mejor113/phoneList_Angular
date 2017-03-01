angular
    .module('myApp')
    .directive('detailsTemplate', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                showItem: '=showItemAtr',
                list: '=listAtr',
                delete: '=deleteAtr',
                detailsId: '=detailsAtr'
            },
            templateUrl: 'templates/detailsTemplate.html'
        };
    })
