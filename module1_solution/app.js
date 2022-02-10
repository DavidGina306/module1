(function () {
    'use strict';
    angular.module('App', []).controller('LunchCheckController', LunchCheckController);

    function LunchCheckController($scope) {
        $scope.lunchs = "";
        $scope.total = 0;
        $scope.message = "";

        $scope.countLunchs = function () {
            $scope.total = 0;
            if ($scope.lunchs) {
                var lunchsSplit = $scope.lunchs.split(',');
                lunchsSplit = lunchsSplit.filter(elem => elem !== '')
                $scope.total = lunchsSplit.length;
            }
            $scope.message = returnMessage($scope.total);
        }

        function returnMessage(count) {
            if (count > 0 && count <= 3) {
                return "Enjoy!";
            } else if (count > 3) {
                return "Too much!"
            }
            return "";
        }

    }
})();