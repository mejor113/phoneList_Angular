angular.module('myApp', [])
    .controller('appCtrl', function($scope) {
        var localList = JSON.parse(localStorage.getItem('templateCache'));
        this.pageShowNum = 1;
        this.list = {
            user: 0
        };
        this.showList = [];
        this.deleteListItem = false;

        this.refreshShowListItems = function() {
            this.showList.length = 0;
            for (var key in this.list) {
                if (key == 'user') continue;
                this.showList.push({
                    name: this.list[key].name,
                    id: key
                })
            }
        };

        if (localList) {
            this.list = localList;
            this.refreshShowListItems();
        }

        this.removeListItem = function(item) {
            delete this.list[item];
            localStorage.setItem('templateCache', JSON.stringify(this.list));
            this.refreshShowListItems();
        }
    })
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
    .directive('secondPage', function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'templates/secondPageTemplate.html'
        };
    })
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
