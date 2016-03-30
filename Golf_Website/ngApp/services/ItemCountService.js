var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ItemCountService = (function () {
            function ItemCountService($resource) {
                this.itemCountResource = $resource('/api/itemcount');
            }
            ItemCountService.prototype.listItemCounts = function () {
                return this.itemCountResource.query();
            };
            return ItemCountService;
        })();
        Services.ItemCountService = ItemCountService;
        angular.module("MyApp").service("itemCountService", ItemCountService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=ItemCountService.js.map