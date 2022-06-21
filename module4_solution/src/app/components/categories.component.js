(function () {
  "use strict";

  angular.module("MenuApp").component("categories", {
    templateUrl: "src/app/templates/categorieslist.template.html",
    bindings: {
      items: "<",
    },
  });
})();
