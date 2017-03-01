angular
    .module('myApp')
    .directive('changeTemplate', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                showItem: '=showItemAtr',
                list: '=listAtr',
                detailsId: '=detailsAtr'
            },
            link: function(scope, element, attrs) {
                scope.contact = {
                    name: '',
                    phones: []
                };
                scope.update = function() {
                    scope.contact.name = '';
                    scope.contact.phones.length = 0;
                    scope.contact.name = scope.list[scope.detailsId].name;
                    for (var i = 0; i < scope.list[scope.detailsId].phones.length; i++) {
                        scope.contact.phones.push({
                            phoneName: scope.list[scope.detailsId].phones[i].phoneName,
                            phoneNumber: scope.list[scope.detailsId].phones[i].phoneNumber
                        });
                    };
                };
                scope.addField = function() {
                    scope.contact.phones.push({
                        phoneName: '',
                        phoneNumber: ''
                    });
                };

                scope.removeField = function(index) {
                    scope.contact.phones.splice(index, 1);
                };
                scope.changeUserInfo = function() {
                    var id = scope.detailsId;
                    scope.list[id].name = scope.contact.name;
                    scope.list[id].phones.length = 0;
                    for (var i = 0; i < scope.contact.phones.length; i++) {
                        scope.list[id].phones.push({
                            phoneName: scope.contact.phones[i].phoneName,
                            phoneNumber: scope.contact.phones[i].phoneNumber
                        });
                    };
                    localStorage.setItem('templateCache', JSON.stringify(scope.list));
                };
                scope.$watch('detailsId', function() {
                    scope.update();
                });
            },
            templateUrl: 'templates/changeTemplate.html'
        };
    })
