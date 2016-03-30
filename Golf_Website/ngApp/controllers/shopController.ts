namespace MyApp.Controllers {

    export class MyShopController {
        public itemTypes;
        public shopItems;
        public selectedItemType;
        public itemTypeDetails;
        public itemTypeFromSelection;
        public clubMakes;
        public clubMakesToList;
        public searchPhrase;
        public filteredItems;
        public productResource;
        public productsAll;
        public priceRange;
        public sortSelection;
        public sortCat;
        public paginationNum;
        public itemsPerPage;
        public itemsToShowCount;
        public pageArray;
        public showPagBool;
        public pageNumbers;
        public showItemsPerPageBool;
        public rate;
        public max;
        public isReadOnly;
        public isLoggedIn;
        public validationErrors;
        public userName;
        public itemToAdd;
        public quantity;
        public itemCount;

        constructor($resource: ng.resource.IResourceService, $routeParams: ng.route.IRouteParamsService, private $uibModal: angular.ui.bootstrap.IModalService, private shopService: MyApp.Services.ShopService, private accountService: MyApp.Services.AccountService, private $window: ng.IWindowService, private cartService: MyApp.Services.CartService, private $route: ng.route.IRouteService) {

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
            }

            this.priceRange = {
                range: {
                    min: 0,
                    max: 1500
                },
                minPrice: 0,
                maxPrice: 1500
            };
        }

        loggedIn() {
            let token = this.$window.sessionStorage.getItem('token');
            if (token) {
                return true;
            } else {
                return false;
            }
        }

        public getUserName() {
            this.userName = this.accountService.getUserName();
        }

        public getProducts() {
            this.productsAll = this.shopService.listProducts();
        }

        public addProductModal(product) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/add-product.html',
                controller: ProductAddModalController,
                controllerAs: "vm",
                resolve: {
                    data: () => product
                },
                size: "sm"
            });
        }

        public editProductModal(product) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/edit-product.html',
                controller: ProductEditModalController,
                controllerAs: "vm",
                resolve: {
                    data: () => product
                },
                size: "sm"
            });
        }

        listMakes() {
            let results = [];

            for (let details of this.itemTypeDetails) {
                if (this.selectedItemType == details.name) {
                    this.itemTypeFromSelection = details.id;
                    results = details.id;
                    break;
                } else {
                    this.itemTypeFromSelection = [];
                }
            }
        }

        savingClicked() {
            let selectedArray = [];
            for (let item of this.itemTypeFromSelection) {
                if (item.selected) {
                    selectedArray.push(item.subCat);
                }
            }
            return selectedArray;
        }

        filteringItems() {
            let makesSelected;
            if (this.savingClicked().length == 0) {
                makesSelected = ["Callaway", "Nike", "Ping", "TaylorMade", "Titleist", "Srixon", "Bridgestone", "Adidas", "FootJoy"]
            } else {
                makesSelected = this.savingClicked();
            }


            let itemsFiltered = [];
            for (let each of this.productsAll) {
                let makeString: string = each.make;
                let typeString: string = each.type;
                let shortDesc: string = each.shortDesc;
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
            let pageNumbersToShow = [];
            if (this.itemsToShowCount <= 6) {
                pageNumbersToShow = [6];
                this.showItemsPerPageBool = false;
            } else if (this.itemsToShowCount > 6 && this.itemsToShowCount < 9) {
                pageNumbersToShow = [6];
                this.showItemsPerPageBool = true;
            } else if (this.itemsToShowCount >= 9 && this.itemsToShowCount < 12) {
                pageNumbersToShow = [6, 9];
                this.showItemsPerPageBool = true;
            } else if (this.itemsToShowCount >= 12 && this.itemsToShowCount < 15) {
                pageNumbersToShow = [6, 9, 12];
                this.showItemsPerPageBool = true;
            } else {
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

            let lastPage = Math.ceil(this.itemsToShowCount / this.itemsPerPage);
            let arrayPages = [];
            for (var i = 1; i <= lastPage; i++) {
                arrayPages.push(i);
            }
            this.pageArray = arrayPages;
            if (this.pageArray.length == 1) {
                this.showPagBool = false;
            } else {
                this.showPagBool = true;
            }

            var start = this.paginationNum * this.itemsPerPage;
            var end = start + this.itemsPerPage;

            var itemPagFilter = [];

            itemsFiltered.sort((a, b) => {
                if (this.sortSelection == "price" || this.sortSelection == "-price") {
                    if (a.price == b.price) {
                        return 0
                    }
                    else {
                        if (a.price > b.price) {
                            if (this.sortSelection == "price") {
                                return 1;
                            } else {
                                return -1;
                            }

                        } else if (a.price < b.price) {
                            if (this.sortSelection == "price") {
                                return -1;
                            } else {
                                return 1;
                            }
                        }
                    }
                } else if (this.sortSelection == "make" || this.sortSelection == "-make") {
                    if (a.make == b.make) {
                        return 0;
                    }
                    else {
                        if (a.make > b.make) {
                            if (this.sortSelection == "make") {
                                return 1;
                            } else {
                                return -1;
                            }

                        } else if (a.make < b.make) {
                            if (this.sortSelection == "make") {
                                return -1;
                            } else {
                                return 1;
                            }
                        }
                    }
                } else if (this.sortSelection == "rating" || this.sortSelection == "-rating") {
                    if (a.rating == b.rating) {
                        return 0;
                    }
                    else {
                        if (a.rating > b.rating) {
                            if (this.sortSelection == "rating") {
                                return 1;
                            } else {
                                return -1;
                            }

                        } else if (a.rating < b.rating) {
                            if (this.sortSelection == "rating") {
                                return -1;
                            } else {
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
        }

        sortBy() {
            this.sortSelection = this.sortCat;
        }

        showPagination(num) {
            this.paginationNum = num;
            this.filteringItems();
        }

        findItemsPerPage(num) {
            this.itemsPerPage = num;
            this.filteringItems();
        }

        public addItemToCart(itemBeingPassed) {
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

            $(document).ready(() => {
                console.log("#" + itemBeingPassed.prodId);
                if (this.itemToAdd.quantity == 1) {
                    $("#" + itemBeingPassed.prodId).html("<td class='item_added'><span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span> 1 item added</td>");
                } else {
                    $("#" + itemBeingPassed.prodId).html("<td class='item_added'><span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span> " + this.itemToAdd.quantity + " items added</td>");
                }
                $("." + itemBeingPassed.prodId).html("<td class='proceed_to_co'><a href='/cart/" + this.userName + "'>Proceed to Checkout </a><span class='glyphicon glyphicon-forward' aria-hidden='true'></span></td>");

            });

            this.cartService.listCartItemsByUsername(this.userName).$promise.then((result) => {
                let cartCount = 0;
                for (var i in result) {
                    if (!isNaN(i)) {
                        console.log(result[i]);
                        if (result[i].userName == this.userName && result[i].itemName == this.itemToAdd.itemName && result[i].isSubmitted == false) {
                            this.itemToAdd.id = result[i].id;
                            this.itemToAdd.quantity += result[i].quantity;

                        }                       
                    }                  
                }
                this.cartService.saveCartItem(this.itemToAdd).then(() => {
                    this.cartService.listCartItemsByUsername(this.userName).$promise.then((result) => {
                        let cartCount = 0;
                        for (var i in result) {
                            if (!isNaN(i)) {
                                console.log(result[i]);
                                if (result[i].userName == this.userName && result[i].itemName == this.itemToAdd.itemName && result[i].isSubmitted == false) {
                                    this.itemToAdd.id = result[i].id;
                                    this.itemToAdd.quantity += result[i].quantity;

                                }
                                if (result[i].isSubmitted == false) {
                                    cartCount += result[i].quantity;
                                }

                            }

                        }

                        $(document).ready(() => {
                            $("#cart_count").html("" + cartCount);
                        });
                    });
                }).catch((error) => {

                    let validationErrors = [];
                    for (let i in error.data.modelState) {
                        let errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    this.validationErrors = validationErrors;
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

        }

        public getTotalItemsInCart() {
            this.itemCount = 0;
            this.cartService.listCartItemsByUsername(this.userName).$promise.then((result) => {

                if (this.userName) {
                    console.log(this.userName);
                    for (var i in result) {
                        if (i != "$promise" && i != "$resolved" && result[i].isSubmitted == false) {
                            this.itemCount += result[i].quantity;
                        }
                    }
                }
            });
        }


    }//My Shop Controller


    angular.module('MyApp').controller('MyShopController', MyShopController);

    class ProductAddModalController {

        public productResource;
        public productDetails;
        public validationErrors;
        public productsAll;
        public itemCount;
        public userName;

        constructor(public data, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $resource: ng.resource.IResourceService, private $route: ng.route.IRouteService, private shopService: MyApp.Services.ShopService) {
            //this.productResource = $resource('/api/products/:id');

        }

        closeModal() {
            this.$uibModalInstance.close();
            this.$route.reload();
        }

        public saveProduct(itemToSave) {
            this.shopService.saveProduct(itemToSave).then(() => {
                this.getProducts();
                this.closeModal();
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public getProducts() {
            this.productsAll = this.shopService.listProducts();
        }





    }

    class ProductEditModalController {

        public productResource;
        public productDetails;
        public validationErrors;
        public productsAll;

        constructor(public data, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $resource: ng.resource.IResourceService, private $route: ng.route.IRouteService, private shopService: MyApp.Services.ShopService, private cartService: MyApp.Services.CartService) {

            //this.productResource = $resource('/api/products/:id');
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }

        public editProduct(itemToEdit) {

            this.shopService.saveProduct(itemToEdit).then(() => {
                //this.productResource.save(this.data).$promise.then(() => {
                this.closeModal();
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public getProducts() {
            this.productsAll = this.shopService.listProducts();
        }

        public deleteProduct(id, name, type) {
            let answer = confirm("Are you sure you want to permanently delete " + name + " ?");
            if (answer) {
                this.shopService.deleteProduct(id, type).then(() => {
                    this.closeModal();
                    this.$route.reload();
                });
            }
        }
    }

}