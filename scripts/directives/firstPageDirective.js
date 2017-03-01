angular
    .module('myApp')
    .directive('firstPage', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                list: '=listAtr'
            },
            link: function(scope, element, attrs) {
                function createNewContact() {
                    var id = 'id' + scope.list.user;
                    scope.list[id] = {};
                    scope.list[id].name = scope.newCont.name;
                    scope.list[id].phones = [];
                    for (var i = 0; i < scope.newCont.phones.length; i++) {
                        scope.list[id].phones.push({
                            phoneName: scope.newCont.phones[i].phoneName,
                            phoneNumber: scope.newCont.phones[i].phoneNumber
                        });
                    };
                };
                function clearNewListObject() {
                    scope.newCont.name = '';
                    scope.newCont.phones.length = 1;
                    scope.newCont.phones[0].phoneName = 'Мобильный';
                    scope.newCont.phones[0].phoneNumber = '';
                };
                scope.newCont = {
                    name: '',
                    phones: [{
                        phoneName: 'Мобильный',
                        phoneNumber: ''
                    }]
                };
                scope.addNewContact = function() {
                    scope.list.user++;
                    createNewContact();
                    localStorage.setItem('templateCache', JSON.stringify(scope.list));
                    clearNewListObject();
                };
                scope.addField = function() {
                    scope.newCont.phones.push({
                        phoneName: '',
                        phoneNumber: ''
                    });
                };
                scope.removeField = function(index) {
                    scope.newCont.phones.splice(index, 1);
                }
            },
            templateUrl: 'templates/firstPageTemplate.html'
        };
    })
