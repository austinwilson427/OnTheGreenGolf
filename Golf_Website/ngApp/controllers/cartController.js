var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var CartController = (function () {
            function CartController(cartService, accountService, $routeParams, $location, $route, $uibModal) {
                this.cartService = cartService;
                this.accountService = accountService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.$route = $route;
                this.$uibModal = $uibModal;
                this.allItems = this.cartService.listCartItems();
                this.userName = this.accountService.getUserName();
                this.confirmUserName();
                this.findMyItems();
            }
            CartController.prototype.findMyItems = function () {
                var _this = this;
                if (this.pageAccess) {
                    this.cartService.listCartItemsByUsername(this.userName).$promise.then(function (items) {
                        var itemArray = [];
                        var itemNameArray = [];
                        var itemArrayObject;
                        var totalCost = 0;
                        var totalItems = 0;
                        for (var i in items) {
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
                                    }
                                    else {
                                        var someIndex = itemNameArray.indexOf(items[i].itemName);
                                        totalCost += items[i].quantity * items[i].price;
                                        totalItems += items[i].quantity;
                                        itemArray[someIndex].itemQuantity += items[i].quantity;
                                    }
                                }
                            }
                        }
                        _this.myItems = itemArray;
                        _this.totalCost = totalCost;
                        _this.totalItems = totalItems;
                    });
                }
                this.count = 0;
            };
            CartController.prototype.addCheckoutModal = function () {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/checkout.html',
                    controller: CheckoutController,
                    controllerAs: "vm",
                    resolve: {
                        data: function () { return _this.myItems; },
                        cost: function () { return _this.totalCost; },
                        access: function () { return _this.pageAccess; }
                    },
                    size: "sm"
                });
            };
            CartController.prototype.confirmUserName = function () {
                if (this.userName == this.$routeParams["username"]) {
                    this.pageAccess = true;
                }
            };
            CartController.prototype.getTotalItemsInCart = function () {
                var _this = this;
                this.itemCount = 0;
                var itemList = this.cartService.listCartItemsByUsername(this.userName);
                this.cartService.listCartItemsByUsername(this.userName).$promise.then(function (result) {
                    for (var i in result) {
                        if (i != "$promise" && i != "$resolved" && result[i].isSubmitted == false) {
                            _this.itemCount += result[i].quantity;
                        }
                    }
                    $(document).ready(function () {
                        $("#cart_count").html(_this.itemCount);
                    });
                });
            };
            CartController.prototype.showUpdateScreen = function (item) {
                for (var i in this.myItems) {
                    if (item.id != this.myItems[i].id) {
                        this.myItems[i].itemEdit = false;
                    }
                    else {
                        item.itemEdit = true;
                    }
                }
            };
            CartController.prototype.deleteItem = function (item) {
                var _this = this;
                var confirmed = confirm("Are you sure you want to delete " + item.itemName + "?");
                if (confirmed) {
                    this.cartService.deleteCartItem(item.id).then(function () {
                        _this.getTotalItemsInCart();
                        _this.$route.reload();
                    });
                }
            };
            CartController.prototype.editItemAtCheckout = function (item) {
                var _this = this;
                console.log(item);
                item.userName = this.userName;
                item.quantity = item.itemQuantity;
                item.prodId = item.itemId;
                item.price = item.itemPrice;
                item.orderDate = new Date();
                this.cartService.saveCartItem(item).then(function () {
                    _this.getTotalItemsInCart();
                    _this.$route.reload();
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
            };
            CartController.prototype.doSort = function (prop) {
                this.sortBy = prop;
                this.reverse = !this.reverse;
                console.log(prop);
            };
            return CartController;
        })();
        Controllers.CartController = CartController;
        var CheckoutController = (function () {
            function CheckoutController(data, cost, access, accountService, cartService, $location, $uibModalInstance, $route) {
                this.data = data;
                this.cost = cost;
                this.access = access;
                this.accountService = accountService;
                this.cartService = cartService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
                this.userName = this.accountService.getUserName();
            }
            CheckoutController.prototype.submitOrder = function () {
                var _this = this;
                if (this.access) {
                    this.cartService.listCartItemsByUsername(this.userName).$promise.then(function (items) {
                        for (var i in items) {
                            if (!isNaN(i)) {
                                items[i].isSubmitted = true;
                                console.log(items[i]);
                                _this.cartService.saveCartItem(items[i]);
                            }
                        }
                        alert("Your order has been submitted");
                        $(document).ready(function () {
                            $("#cart_count").html('0');
                        });
                        _this.closeModal();
                    });
                }
            };
            CheckoutController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
                this.$route.reload();
            };
            return CheckoutController;
        })();
        Controllers.CheckoutController = CheckoutController;
        angular.module('MyApp').controller('CartController', CartController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=cartController.js.map