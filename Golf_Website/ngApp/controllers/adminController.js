var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AdminController = (function () {
            function AdminController(scorecardService, accountService, $routeParams, $location, $route, $uibModal, $filter, cartService) {
                this.scorecardService = scorecardService;
                this.accountService = accountService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.$route = $route;
                this.$uibModal = $uibModal;
                this.$filter = $filter;
                this.cartService = cartService;
                this.type = $routeParams["type"];
                this.getProductsFromType();
            }
            AdminController.prototype.getProductsFromType = function () {
                var _this = this;
                if (this.type == "products") {
                    this.cartItems = this.cartService.listCartItems();
                    this.cartItems.$promise.then(function (result) {
                        for (var i in result) {
                            if (!isNaN(i)) {
                                _this.cartItems[i].totalPrice = _this.cartItems[i].quantity * _this.cartItems[i].price;
                            }
                        }
                    });
                    this.cartBool = true;
                }
            };
            AdminController.prototype.doSort = function (prop) {
                this.sortBy = prop;
                this.reverse = !this.reverse;
            };
            return AdminController;
        })();
        Controllers.AdminController = AdminController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=adminController.js.map