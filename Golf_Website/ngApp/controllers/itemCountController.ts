namespace MyApp.Controllers {

    export class ItemCountController {

        public userName;
        public itemCountObject;
        public itemCount;

        constructor(private itemCountService: MyApp.Services.ItemCountService, private accountService: MyApp.Services.AccountService, private $routeParams: ng.route.IRouteParamsService) {

            this.userName = accountService.getUserName();

            this.countItemsForUser();

        }

        public countItemsForUser() {

            this.itemCountService.listItemCounts().$promise.then((result) => {
                for (let i in result) {
                    if (result[i].userName == this.userName) {
                        this.itemCount = result[i].itemCount;
                        break;
                    }
                }
            });
            


        }


    }

    angular.module("MyApp").controller("ItemCountController", ItemCountController);

}