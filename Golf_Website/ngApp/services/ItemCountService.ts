namespace MyApp.Services {

    export class ItemCountService {

        private itemCountResource;

        constructor($resource: ng.resource.IResourceService) {

            this.itemCountResource = $resource('/api/itemcount');

        }

        public listItemCounts() {

            return this.itemCountResource.query();

        }


    }

    angular.module("MyApp").service("itemCountService", ItemCountService);

}