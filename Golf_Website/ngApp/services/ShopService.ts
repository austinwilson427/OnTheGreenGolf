namespace MyApp.Services {

    export class ShopService {

        private shopResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.shopResource = $resource('/api/shop/:type/:id');
        }

        // Return all products
        public listProducts() {
            return this.shopResource.query();
        }

        //Get individual product from shop
        public getProduct(id, type) {
            return this.shopResource.get({ id: id, type: type });
        }

        //Save product to shop
        public saveProduct(product) {
            return this.shopResource.save(product).$promise;
        }

        //Delete product from shop
        public deleteProduct(id, type) {
            return this.shopResource.delete({ id: id, type: type }).$promise;
        }


    }

    angular.module("MyApp").service('shopService', ShopService);
}