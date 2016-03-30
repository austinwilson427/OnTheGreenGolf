var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var CartService = (function () {
            function CartService($resource) {
                this.cartResource = $resource('/api/cart/:userName');
            }
            CartService.prototype.listCartItems = function () {
                return this.cartResource.query();
            };
            CartService.prototype.listCartItemsByUsername = function (userName) {
                return this.cartResource.query({ userName: userName });
            };
            CartService.prototype.saveCartItem = function (itemToSave) {
                return this.cartResource.save(itemToSave).$promise;
            };
            CartService.prototype.deleteCartItem = function (id) {
                return this.cartResource.delete({ id: id }).$promise;
            };
            return CartService;
        })();
        Services.CartService = CartService; //End of cart service class
        angular.module("MyApp").service("cartService", CartService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=CartService.js.map