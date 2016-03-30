var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ShopService = (function () {
            function ShopService($resource) {
                this.$resource = $resource;
                this.shopResource = $resource('/api/shop/:type/:id');
            }
            // Return all products
            ShopService.prototype.listProducts = function () {
                return this.shopResource.query();
            };
            //Get individual product from shop
            ShopService.prototype.getProduct = function (id, type) {
                return this.shopResource.get({ id: id, type: type });
            };
            //Save product to shop
            ShopService.prototype.saveProduct = function (product) {
                return this.shopResource.save(product).$promise;
            };
            //Delete product from shop
            ShopService.prototype.deleteProduct = function (id, type) {
                return this.shopResource.delete({ id: id, type: type }).$promise;
            };
            return ShopService;
        })();
        Services.ShopService = ShopService;
        angular.module("MyApp").service('shopService', ShopService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=ShopService.js.map