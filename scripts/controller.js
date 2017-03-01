angular
  .module('myApp')
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
