
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        return {
            template: '<ol><li ng-repeat="item in items | filter : search">{{ item.short_name }} , {{ item.name }}, {{ item.description }} <button ng-click="remove($index);">Remove Item</button></li></ol><div class="error" ng-if="items.length">Nothing found</div>',
            scope: {
                items: '=',
                search: '=',
                remove: '&'
            }
        };
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var found = this;
        found.search = "";
        found.data = MenuSearchService.getItems();
        found.getMatchedMenuItems = async function () {
            MenuSearchService.getMatchedMenuItems(found.search);
            found.data = MenuSearchService.getItems();
        }
        found.remove = function (itemIndex) {
            found.data = MenuSearchService.remove(itemIndex);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var items = [];
        service.getMatchedMenuItems = function (shortName) {
            if (shortName) {
                return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json"),
                    params: {
                        name: shortName
                    }
                }).then(function (resp) {
                    items = resp.data.menu_items;
                    return items;
                });
            }
        };
        service.remove = function (itemIndex) {
            return items.filter(elem => elem.id !== itemIndex)
        };
        service.getItems = (() => {
            return items;
        });
    }

})();