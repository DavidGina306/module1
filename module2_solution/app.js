(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var itemAdder = this;
    itemAdder.items = ShoppingListCheckOffService.getItems();
    itemAdder.name = "";
    itemAdder.itemQuantity = "";

    itemAdder.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
    itemAdder.itemsSize = ShoppingListCheckOffService.getSizeItems();
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var showList = this;

    showList.items = ShoppingListCheckOffService.getItemsBought();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    var items = [
      {
        name: 'Cookie',
        quantity: 10
      },
      {
        name: 'Bread',
        quantity: 40
      },
      {
        name: "Milk",
        quantity: 2
      }, {
        name: "Cornflex",
        quantity: 4
      }, {
        name: "Shampoo",
        quantity: 5
      }
    ];

    var itemsBought = [];



    service.addItem = function (name, quantity) {
      var item = {
        name: name,
        quantity: quantity
      };
      itemsBought.push(item);
    };

    service.removeItem = function (itemIndex) {
      service.addItem(items[itemIndex].name, items[itemIndex].quantity)
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };

    service.getSizeItems =  function () {
      console.log(items.length);
      return items.length;
    };
    service.getItemsBought = function () {
      return itemsBought;
    };
  }

})();
