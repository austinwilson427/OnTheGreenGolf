namespace MyApp.Controllers {

    export class CartController {

        public allItems;
        public myItems;
        public userName;
        public pageAccess;
        public totalCost;
        public totalItems;
        public count;
        public itemCount;
        public updateDisplay;
        public sortBy;
        public reverse;
       
        constructor(private cartService: MyApp.Services.CartService, private accountService: MyApp.Services.AccountService, private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private $uibModal: angular.ui.bootstrap.IModalService) {
            
            this.allItems = this.cartService.listCartItems();
            this.userName = this.accountService.getUserName();
            this.confirmUserName();
            this.findMyItems();
        }

        

        public findMyItems() {
            if (this.pageAccess) {
                this.cartService.listCartItemsByUsername(this.userName).$promise.then((items) => {
                    let itemArray = [];
                    let itemNameArray = [];
                    let itemArrayObject;
                    let totalCost = 0;
                    let totalItems = 0;
                    for (let i in items) {

                        if (!isNaN(i)) {
                            if (items[i].isSubmitted == false) {
                                if (itemNameArray.indexOf(items[i].itemName) == -1) {
                                    totalCost += items[i].quantity * items[i].price;
                                    totalItems += items[i].quantity;
                                    itemArrayObject = ({
                                        id: items[i].id,
                                        itemName: items[i].itemName,
                                        itemPrice: items[i].price,
                                        itemId: items[i].prodId,
                                        itemDate: items[i].date,
                                        itemQuantity: items[i].quantity,
                                        itemTotal: items[i].quantity * items[i].price,
                                        itemEdit: false
                                    });
                                    itemArray.push(itemArrayObject);
                                    itemNameArray.push(items[i].itemName);

                                } else {
                                    let someIndex = itemNameArray.indexOf(items[i].itemName);
                                    totalCost += items[i].quantity * items[i].price;
                                    totalItems += items[i].quantity;
                                    itemArray[someIndex].itemQuantity += items[i].quantity;
                                }
                            }
                        }
                    }
                    this.myItems = itemArray;
                    this.totalCost = totalCost;
                    this.totalItems = totalItems;
                });




            }
            this.count = 0;
        }

        public addCheckoutModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/checkout.html',
                controller: CheckoutController,
                controllerAs: "vm",
                resolve: {
                    data: () => this.myItems,
                    cost: () => this.totalCost,
                    access: () => this.pageAccess
                },
                size: "sm"
            });

        }



        public confirmUserName() {
            if (this.userName == this.$routeParams["username"]) {
                this.pageAccess = true;
            }
        }

        public getTotalItemsInCart() {
            this.itemCount = 0;
            let itemList = this.cartService.listCartItemsByUsername(this.userName);
            this.cartService.listCartItemsByUsername(this.userName).$promise.then((result) => {

                for (var i in result) {
                    if (i != "$promise" && i != "$resolved" && result[i].isSubmitted == false) {
                        this.itemCount += result[i].quantity;
                    }
                }

                $(document).ready(() => {
                    $("#cart_count").html(this.itemCount);
                });
            });
        }

        public showUpdateScreen(item) {
            for (var i in this.myItems) {
                if (item.id != this.myItems[i].id) {
                    this.myItems[i].itemEdit = false;
                } else {
                    item.itemEdit = true;
                }
            }


        }

        public deleteItem(item) {
            let confirmed = confirm("Are you sure you want to delete " + item.itemName + "?");
            if (confirmed) {
                this.cartService.deleteCartItem(item.id).then(() => {
                    this.getTotalItemsInCart();
                    this.$route.reload();

                });

            }
            

        }
        public editItemAtCheckout(item) {
            console.log(item);

            item.userName = this.userName
            item.quantity = item.itemQuantity;
            item.prodId = item.itemId;
            item.price = item.itemPrice;
            item.orderDate = new Date();
            this.cartService.saveCartItem(item).then(() => {
                this.getTotalItemsInCart();
                this.$route.reload();
            });
            
            //this.cartService.listCartItems().$promise.then((items) => {

            //    for (var i in this.myItems) {
            //        console.log(this.myItems.length);
                    
            //        if (!isNaN(i)) {
            //            for (var j in items) {
            //                if (!isNaN(j)) {

            //                    if (this.myItems[i].itemName == items[j].itemName && this.userName == items[j].userName && this.myItems[i].itemQuantity != items[j].quantity) {
            //                        let itemToSave = {
            //                            id: items[j].id,
            //                            userName: this.userName,
            //                            quantity: this.myItems[i].itemQuantity,
            //                            itemName: this.myItems[i].itemName,
            //                            prodId: this.myItems[i].itemId,
            //                            price: this.myItems[i].itemPrice,
            //                            orderDate: new Date()
            //                        };
            //                        console.log(itemToSave);
            //                        this.cartService.saveCartItem(itemToSave).then(() => {

            //                        });
            //                        continue;
            //                    }
            //                }
            //            }//End j loop
            //        }//End i loop
                    
            //   }

                
                    
            //});



            this.findMyItems();
            this.$location.path('/cart/' + this.userName);
            this.updateDisplay = false;

        }

        public doSort(prop) {
            this.sortBy = prop;
            this.reverse = !this.reverse;
            console.log(prop);
        }


    }

    export class CheckoutController {

        public userName;

        constructor(public data, public cost, public access, private accountService: MyApp.Services.AccountService, private cartService: MyApp.Services.CartService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private $route: ng.route.IRouteService) {
            this.userName = this.accountService.getUserName();
        }

        public submitOrder() {
            if (this.access) {
                this.cartService.listCartItemsByUsername(this.userName).$promise.then((items) => {
                    for (let i in items) {

                        if (!isNaN(i)) {
                            items[i].isSubmitted = true;
                            console.log(items[i]);
                            this.cartService.saveCartItem(items[i]);
                        }
                    }
                    alert("Your order has been submitted");
                    $(document).ready(() => {
                        $("#cart_count").html('0');
                    });
                    this.closeModal();

                });
            }
        }

        closeModal() {
            this.$uibModalInstance.close();
            this.$route.reload();
        }
    }

    angular.module('MyApp').controller('CartController', CartController);








}