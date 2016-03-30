var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var MyShopController = (function () {
            function MyShopController($resource, $routeParams, $uibModal, shopService, accountService, $window, cartService, $route) {
                this.$uibModal = $uibModal;
                this.shopService = shopService;
                this.accountService = accountService;
                this.$window = $window;
                this.cartService = cartService;
                this.$route = $route;
                this.getProducts();
                this.pageArray = [];
                this.pageNumbers = [];
                this.searchPhrase = "";
                this.rate = 3;
                this.max = 5;
                this.isReadOnly = true;
                this.itemTypes = ["Drivers", "Woods", "Hybrids", "Iron Sets", "Putters", "Golf Balls", "Golf Shirts", "Golf Shoes"];
                this.itemTypeDetails = [
                    {
                        name: "Golf Bags", id: [
                            { innerId: 1, subCat: "Callaway" },
                            { innerId: 2, subCat: "Nike" },
                            { innerId: 3, subCat: "Ping" },
                            { innerId: 4, subCat: "TaylorMade" },
                            { innerId: 5, subCat: "Titleist" }
                        ]
                    },
                    {
                        name: "Golf Balls", id: [
                            { innerId: 1, subCat: "Bridgestone" },
                            { innerId: 2, subCat: "Callaway" },
                            { innerId: 3, subCat: "Nike" },
                            { innerId: 4, subCat: "Srixon" },
                            { innerId: 5, subCat: "TaylorMade" },
                            { innerId: 6, subCat: "Titleist" }
                        ]
                    },
                    {
                        name: "Drivers", id: [
                            { innerId: 1, subCat: "Callaway" },
                            { innerId: 2, subCat: "Nike" },
                            { innerId: 3, subCat: "Ping" },
                            { innerId: 4, subCat: "TaylorMade" },
                            { innerId: 5, subCat: "Titleist" }
                        ]
                    },
                    {
                        name: "Woods", id: [
                            { innerId: 1, subCat: "Callaway" },
                            { innerId: 2, subCat: "Nike" },
                            { innerId: 3, subCat: "Ping" },
                            { innerId: 4, subCat: "TaylorMade" },
                            { innerId: 5, subCat: "Titleist" }
                        ]
                    },
                    {
                        name: "Hybrids", id: [
                            { innerId: 1, subCat: "Callaway" },
                            { innerId: 2, subCat: "Nike" },
                            { innerId: 3, subCat: "Ping" },
                            { innerId: 4, subCat: "TaylorMade" },
                            { innerId: 5, subCat: "Titleist" }
                        ]
                    },
                    {
                        name: "Iron Sets", id: [
                            { innerId: 1, subCat: "Callaway" },
                            { innerId: 2, subCat: "Nike" },
                            { innerId: 3, subCat: "Ping" },
                            { innerId: 4, subCat: "TaylorMade" },
                            { innerId: 5, subCat: "Titleist" }
                        ]
                    },
                    {
                        name: "Putters", id: [
                            { innerId: 1, subCat: "Nike" },
                            { innerId: 2, subCat: "Ping" },
                            { innerId: 3, subCat: "TaylorMade" },
                        ]
                    },
                    {
                        name: "Golf Shirts", id: [
                            { innerId: 1, subCat: "Adidas" },
                            { innerId: 2, subCat: "Callaway" },
                            { innerId: 3, subCat: "Nike" },
                            { innerId: 4, subCat: "FootJoy" }
                        ]
                    },
                    {
                        name: "Golf Shoes", id: [
                            { innerId: 1, subCat: "Adidas" },
                            { innerId: 2, subCat: "Callaway" },
                            { innerId: 3, subCat: "Nike" },
                            { innerId: 4, subCat: "FootJoy" },
                            { innerId: 5, subCat: "Titleist" }
                        ]
                    }
                ];
                this.isLoggedIn = this.loggedIn();
                this.getUserName();
                this.getTotalItemsInCart();
                this.selectedItemType = "None";
                this.itemToAdd = {
                    id: 0,
                    userName: "",
                    quantity: 0,
                    itemName: "",
                    prodId: "",
                    price: 0,
                    orderDate: new Date()
                };
                this.priceRange = {
                    range: {
                        min: 0,
                        max: 1500
                    },
                    minPrice: 0,
                    maxPrice: 1500
                };
            }
            MyShopController.prototype.loggedIn = function () {
                var token = this.$window.sessionStorage.getItem('token');
                if (token) {
                    return true;
                }
                else {
                    return false;
                }
            };
            MyShopController.prototype.getUserName = function () {
                this.userName = this.accountService.getUserName();
            };
            MyShopController.prototype.getProducts = function () {
                this.productsAll = this.shopService.listProducts();
            };
            MyShopController.prototype.addProductModal = function (product) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/add-product.html',
                    controller: ProductAddModalController,
                    controllerAs: "vm",
                    resolve: {
                        data: function () { return product; }
                    },
                    size: "sm"
                });
            };
            MyShopController.prototype.editProductModal = function (product) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/edit-product.html',
                    controller: ProductEditModalController,
                    controllerAs: "vm",
                    resolve: {
                        data: function () { return product; }
                    },
                    size: "sm"
                });
            };
            MyShopController.prototype.listMakes = function () {
                var results = [];
                for (var _i = 0, _a = this.itemTypeDetails; _i < _a.length; _i++) {
                    var details = _a[_i];
                    if (this.selectedItemType == details.name) {
                        this.itemTypeFromSelection = details.id;
                        results = details.id;
                        break;
                    }
                    else {
                        this.itemTypeFromSelection = [];
                    }
                }
            };
            MyShopController.prototype.savingClicked = function () {
                var selectedArray = [];
                for (var _i = 0, _a = this.itemTypeFromSelection; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.selected) {
                        selectedArray.push(item.subCat);
                    }
                }
                return selectedArray;
            };
            MyShopController.prototype.filteringItems = function () {
                var _this = this;
                var makesSelected;
                if (this.savingClicked().length == 0) {
                    makesSelected = ["Callaway", "Nike", "Ping", "TaylorMade", "Titleist", "Srixon", "Bridgestone", "Adidas", "FootJoy"];
                }
                else {
                    makesSelected = this.savingClicked();
                }
                var itemsFiltered = [];
                for (var _i = 0, _a = this.productsAll; _i < _a.length; _i++) {
                    var each = _a[_i];
                    var makeString = each.make;
                    var typeString = each.type;
                    var shortDesc = each.shortDesc;
                    makeString = makeString.toLowerCase();
                    typeString = typeString.toLowerCase();
                    shortDesc = shortDesc.toLowerCase();
                    if (makesSelected.indexOf(each.make) != -1 && (makeString.indexOf(this.searchPhrase.toLowerCase()) != -1 || typeString.indexOf(this.searchPhrase.toLowerCase()) != -1 || shortDesc.indexOf(this.searchPhrase.toLowerCase()) != -1)) {
                        if (each.price < this.priceRange.maxPrice && each.price > this.priceRange.minPrice && each.type == this.selectedItemType) {
                            itemsFiltered.push(each);
                        }
                    }
                }
                this.itemsToShowCount = itemsFiltered.length;
                var pageNumbersToShow = [];
                if (this.itemsToShowCount <= 6) {
                    pageNumbersToShow = [6];
                    this.showItemsPerPageBool = false;
                }
                else if (this.itemsToShowCount > 6 && this.itemsToShowCount < 9) {
                    pageNumbersToShow = [6];
                    this.showItemsPerPageBool = true;
                }
                else if (this.itemsToShowCount >= 9 && this.itemsToShowCount < 12) {
                    pageNumbersToShow = [6, 9];
                    this.showItemsPerPageBool = true;
                }
                else if (this.itemsToShowCount >= 12 && this.itemsToShowCount < 15) {
                    pageNumbersToShow = [6, 9, 12];
                    this.showItemsPerPageBool = true;
                }
                else {
                    pageNumbersToShow = [6, 9, 12, 15];
                    this.showItemsPerPageBool = true;
                }
                this.pageNumbers = pageNumbersToShow;
                if (!this.paginationNum) {
                    this.paginationNum = 0;
                }
                if (!this.itemsPerPage) {
                    this.itemsPerPage = 6;
                }
                var lastPage = Math.ceil(this.itemsToShowCount / this.itemsPerPage);
                var arrayPages = [];
                for (var i = 1; i <= lastPage; i++) {
                    arrayPages.push(i);
                }
                this.pageArray = arrayPages;
                if (this.pageArray.length == 1) {
                    this.showPagBool = false;
                }
                else {
                    this.showPagBool = true;
                }
                var start = this.paginationNum * this.itemsPerPage;
                var end = start + this.itemsPerPage;
                var itemPagFilter = [];
                itemsFiltered.sort(function (a, b) {
                    if (_this.sortSelection == "price" || _this.sortSelection == "-price") {
                        if (a.price == b.price) {
                            return 0;
                        }
                        else {
                            if (a.price > b.price) {
                                if (_this.sortSelection == "price") {
                                    return 1;
                                }
                                else {
                                    return -1;
                                }
                            }
                            else if (a.price < b.price) {
                                if (_this.sortSelection == "price") {
                                    return -1;
                                }
                                else {
                                    return 1;
                                }
                            }
                        }
                    }
                    else if (_this.sortSelection == "make" || _this.sortSelection == "-make") {
                        if (a.make == b.make) {
                            return 0;
                        }
                        else {
                            if (a.make > b.make) {
                                if (_this.sortSelection == "make") {
                                    return 1;
                                }
                                else {
                                    return -1;
                                }
                            }
                            else if (a.make < b.make) {
                                if (_this.sortSelection == "make") {
                                    return -1;
                                }
                                else {
                                    return 1;
                                }
                            }
                        }
                    }
                    else if (_this.sortSelection == "rating" || _this.sortSelection == "-rating") {
                        if (a.rating == b.rating) {
                            return 0;
                        }
                        else {
                            if (a.rating > b.rating) {
                                if (_this.sortSelection == "rating") {
                                    return 1;
                                }
                                else {
                                    return -1;
                                }
                            }
                            else if (a.rating < b.rating) {
                                if (_this.sortSelection == "rating") {
                                    return -1;
                                }
                                else {
                                    return 1;
                                }
                            }
                        }
                    }
                });
                for (var i = start; i < end; i++) {
                    itemPagFilter[i] = itemsFiltered[i];
                }
                this.filteredItems = itemPagFilter;
            };
            MyShopController.prototype.sortBy = function () {
                this.sortSelection = this.sortCat;
            };
            MyShopController.prototype.showPagination = function (num) {
                this.paginationNum = num;
                this.filteringItems();
            };
            MyShopController.prototype.findItemsPerPage = function (num) {
                this.itemsPerPage = num;
                this.filteringItems();
            };
            MyShopController.prototype.addItemToCart = function (itemBeingPassed) {
                var _this = this;
                this.getUserName();
                if (!this.userName || !itemBeingPassed.quantity) {
                    console.log("false");
                    return false;
                }
                this.itemToAdd;
                this.itemToAdd.userName = this.userName;
                this.itemToAdd.quantity = itemBeingPassed.quantity;
                this.itemToAdd.itemName = itemBeingPassed.shortDesc;
                this.itemToAdd.prodId = itemBeingPassed.prodId;
                this.itemToAdd.price = itemBeingPassed.price;
                this.itemToAdd.orderDate = new Date();
                $(document).ready(function () {
                    console.log("#" + itemBeingPassed.prodId);
                    if (_this.itemToAdd.quantity == 1) {
                        $("#" + itemBeingPassed.prodId).html("<td class='item_added'><span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span> 1 item added</td>");
                    }
                    else {
                        $("#" + itemBeingPassed.prodId).html("<td class='item_added'><span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span> " + _this.itemToAdd.quantity + " items added</td>");
                    }
                    $("." + itemBeingPassed.prodId).html("<td class='proceed_to_co'><a href='/cart/" + _this.userName + "'>Proceed to Checkout </a><span class='glyphicon glyphicon-forward' aria-hidden='true'></span></td>");
                });
                this.cartService.listCartItemsByUsername(this.userName).$promise.then(function (result) {
                    var cartCount = 0;
                    for (var i in result) {
                        if (!isNaN(i)) {
                            console.log(result[i]);
                            if (result[i].userName == _this.userName && result[i].itemName == _this.itemToAdd.itemName && result[i].isSubmitted == false) {
                                _this.itemToAdd.id = result[i].id;
                                _this.itemToAdd.quantity += result[i].quantity;
                            }
                        }
                    }
                    _this.cartService.saveCartItem(_this.itemToAdd).then(function () {
                        _this.cartService.listCartItemsByUsername(_this.userName).$promise.then(function (result) {
                            var cartCount = 0;
                            for (var i in result) {
                                if (!isNaN(i)) {
                                    console.log(result[i]);
                                    if (result[i].userName == _this.userName && result[i].itemName == _this.itemToAdd.itemName && result[i].isSubmitted == false) {
                                        _this.itemToAdd.id = result[i].id;
                                        _this.itemToAdd.quantity += result[i].quantity;
                                    }
                                    if (result[i].isSubmitted == false) {
                                        cartCount += result[i].quantity;
                                    }
                                }
                            }
                            $(document).ready(function () {
                                $("#cart_count").html("" + cartCount);
                            });
                        });
                    }).catch(function (error) {
                        var validationErrors = [];
                        for (var i_1 in error.data.modelState) {
                            var errorMessage = error.data.modelState[i_1];
                            validationErrors = validationErrors.concat(errorMessage);
                        }
                        _this.validationErrors = validationErrors;
                    });
                });
                //this.cartService.saveCartItem(this.itemToAdd).then(() => {
                //    this.itemCount = 0;
                //    this.cartService.listCartItemsByUsername(this.userName).$promise.then((result) => {
                //        this.getTotalItemsInCart();
                //    });
                //}).catch((error) => {
                //    let validationErrors = [];
                //    for (let i in error.data.modelState) {
                //        let errorMessage = error.data.modelState[i];
                //        validationErrors = validationErrors.concat(errorMessage);
                //    }
                //    this.validationErrors = validationErrors;
                //});
            };
            MyShopController.prototype.getTotalItemsInCart = function () {
                var _this = this;
                this.itemCount = 0;
                this.cartService.listCartItemsByUsername(this.userName).$promise.then(function (result) {
                    if (_this.userName) {
                        console.log(_this.userName);
                        for (var i in result) {
                            if (i != "$promise" && i != "$resolved" && result[i].isSubmitted == false) {
                                _this.itemCount += result[i].quantity;
                            }
                        }
                    }
                });
            };
            return MyShopController;
        })();
        Controllers.MyShopController = MyShopController; //My Shop Controller
        angular.module('MyApp').controller('MyShopController', MyShopController);
        var ProductAddModalController = (function () {
            function ProductAddModalController(data, $uibModalInstance, $resource, $route, shopService) {
                //this.productResource = $resource('/api/products/:id');
                this.data = data;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
                this.shopService = shopService;
            }
            ProductAddModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
                this.$route.reload();
            };
            ProductAddModalController.prototype.saveProduct = function (itemToSave) {
                var _this = this;
                this.shopService.saveProduct(itemToSave).then(function () {
                    _this.getProducts();
                    _this.closeModal();
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            ProductAddModalController.prototype.getProducts = function () {
                this.productsAll = this.shopService.listProducts();
            };
            return ProductAddModalController;
        })();
        var ProductEditModalController = (function () {
            function ProductEditModalController(data, $uibModalInstance, $resource, $route, shopService, cartService) {
                this.data = data;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
                this.shopService = shopService;
                this.cartService = cartService;
                //this.productResource = $resource('/api/products/:id');
            }
            ProductEditModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            ProductEditModalController.prototype.editProduct = function (itemToEdit) {
                var _this = this;
                this.shopService.saveProduct(itemToEdit).then(function () {
                    //this.productResource.save(this.data).$promise.then(() => {
                    _this.closeModal();
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            ProductEditModalController.prototype.getProducts = function () {
                this.productsAll = this.shopService.listProducts();
            };
            ProductEditModalController.prototype.deleteProduct = function (id, name, type) {
                var _this = this;
                var answer = confirm("Are you sure you want to permanently delete " + name + " ?");
                if (answer) {
                    this.shopService.deleteProduct(id, type).then(function () {
                        _this.closeModal();
                        _this.$route.reload();
                    });
                }
            };
            return ProductEditModalController;
        })();
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=shopController.js.map