namespace MyApp.Controllers {

    export class AdminController {


        private type;
        private cartItems;
        public cartBool;
        public sortBy;
        public reverse;

        constructor(private scorecardService: MyApp.Services.ScorecardService, private accountService: MyApp.Services.AccountService, private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private $uibModal: ng.ui.bootstrap.IModalService, private $filter: ng.IFilterDate, private cartService: MyApp.Services.CartService) {
            
            this.type = $routeParams["type"];
            this.getProductsFromType();
        }

        public getProductsFromType(){

            if (this.type == "products") {

                this.cartItems = this.cartService.listCartItems();
                this.cartItems.$promise.then((result) => {
                    for (var i in result) {
                        if (!isNaN(i)) {
                            this.cartItems[i].totalPrice = this.cartItems[i].quantity * this.cartItems[i].price;
                        }
                    }

                });

                this.cartBool = true;
            }
        }

        public doSort(prop) {
            this.sortBy = prop;
            this.reverse = !this.reverse;
        }



    }

}