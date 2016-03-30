namespace MyApp.Services {

    export class CartService {

        private cartResource;

        constructor($resource: ng.resource.IResourceService) {

            this.cartResource = $resource('/api/cart/:userName');

        }

        public listCartItems() {

            return this.cartResource.query();

        }

        public listCartItemsByUsername(userName) {
            return this.cartResource.query({ userName: userName });
        }

        public saveCartItem(itemToSave) {

            return this.cartResource.save(itemToSave).$promise;

        }

        public deleteCartItem(id) {
            return this.cartResource.delete({ id: id }).$promise;
        }



    }//End of cart service class
    angular.module("MyApp").service("cartService", CartService);
}