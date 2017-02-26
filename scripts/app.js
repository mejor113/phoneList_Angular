angular.module('myApp', [])
    .controller('appCtrl', function($scope) {
        var localList = JSON.parse(localStorage.getItem('templateCache'));
        this.pageShowNum = 1;
        this.list = {
            user: 0
        };
        this.userDetails = {
            id: '',
            name: '',
            phones: []
        };
        this.newCont = {
            name: '',
            phones: [{
                phoneName: 'Мобильный',
                phoneNumber: ''
            }]
        };
        this.showList = [];

        function refreshShowListItems() {
            this.showList.length = 0;
            for (var key in this.list) {
                if (key == 'user') continue;
                this.showList.push({
                    name: this.list[key].name,
                    id: key
                })
            }
        };

        function createNewContact() {
            var id = 'id' + this.list.user;
            this.list[id] = {};
            this.list[id].name = this.newCont.name;
            this.list[id].phones = [];
            for (var i = 0; i < this.newCont.phones.length; i++) {
                this.list[id].phones.push({
                    phoneName: this.newCont.phones[i].phoneName,
                    phoneNumber: this.newCont.phones[i].phoneNumber
                });
            };
        };

        function clearNewListObject() {
            this.newCont.name = '';
            this.newCont.phones.length = 1;
            this.newCont.phones[0].phoneName = 'Мобильный';
            this.newCont.phones[0].phoneNumber = '';
        };

        if (localList) {
            this.list = localList;
            refreshShowListItems.call(this);
        }

        this.addNewContact = function() {
            this.list.user++;
            createNewContact.call(this);
            refreshShowListItems.call(this);
            localStorage.setItem('templateCache', JSON.stringify(this.list));
            clearNewListObject.call(this);
        };

        this.addField = function() {
            this.newCont.phones.push({
                phoneName: '',
                phoneNumber: ''
            });
        };

        this.removeField = function(index) {
            this.newCont.phones.splice(index, 1);
        }

        this.showUserDetails = function(id) {
            this.userDetails.name = '';
            this.userDetails.id = '';
            this.userDetails.phones.length = 0;
            this.userDetails.id = id;
            this.userDetails.name = this.list[id].name;
            for (var i = 0; i < this.list[id].phones.length; i++) {
                this.userDetails.phones.push({
                    phoneName: this.list[id].phones[i].phoneName,
                    phoneNumber: this.list[id].phones[i].phoneNumber
                });
            };
        };

        this.changeUserInfo = function() {
            var id = this.userDetails.id;
            this.list[id].name = this.userDetails.name;
            this.list[id].phones.length = 0;
            for (var i = 0; i < this.userDetails.phones.length; i++) {
                this.list[id].phones.push({
                    phoneName: this.userDetails.phones[i].phoneName,
                    phoneNumber: this.userDetails.phones[i].phoneNumber
                });
            };
            refreshShowListItems.call(this);
            localStorage.setItem('templateCache', JSON.stringify(this.list));
        };

        this.removeUserField = function(index) {
            this.userDetails.phones.splice(index, 1);
        };

        this.addUserInfoField = function() {
            this.userDetails.phones.push({
                phoneName: '',
                phoneNumber: ''
            })
        };

        this.removeListItem = function(item) {
            delete this.list[item];
            localStorage.setItem('templateCache', JSON.stringify(this.list));
            refreshShowListItems.call(this);
        }
    })
    .directive('firstPage', function(){
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'templates/firstPageTemplate.html'
      };
    })
    .directive('secondPage',function(){
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'templates/secondPageTemplate.html'
      };
    })
    .directive('listTemplate',function(){
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'templates/listTemplate.html'
      };
    })
    .directive('changeTemplate',function(){
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'templates/changeTemplate.html'
      };
    })
    .directive('detailsTemplate',function(){
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'templates/detailsTemplate.html'
      };
    })
