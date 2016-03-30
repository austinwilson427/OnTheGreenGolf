var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ItemCountController = (function () {
            function ItemCountController(itemCountService, accountService, $routeParams) {
                this.itemCountService = itemCountService;
                this.accountService = accountService;
                this.$routeParams = $routeParams;
                this.userName = accountService.getUserName();
                this.countItemsForUser();
            }
            ItemCountController.prototype.countItemsForUser = function () {
                var _this = this;
                this.itemCountService.listItemCounts().$promise.then(function (result) {
                    for (var i in result) {
                        if (result[i].userName == _this.userName) {
                            _this.itemCount = result[i].itemCount;
                            break;
                        }
                    }
                });
            };
            return ItemCountController;
        })();
        Controllers.ItemCountController = ItemCountController;
        angular.module("MyApp").controller("ItemCountController", ItemCountController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=itemCountController.js.map