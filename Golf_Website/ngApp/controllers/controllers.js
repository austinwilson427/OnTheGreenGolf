var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var NavController = (function () {
            function NavController($uibModal, accountService, $location, cartService) {
                var _this = this;
                this.$uibModal = $uibModal;
                this.accountService = accountService;
                this.$location = $location;
                this.cartService = cartService;
                this.getLoggedInUserName();
                this.getExternalLogins().then(function (results) {
                    _this.externalLogins = results;
                });
                this.getTotalItemsInCart();
            }
            NavController.prototype.getLoggedInUserName = function () {
                this.loggedInName = this.accountService.getUserName();
            };
            NavController.prototype.getTotalItemsInCart = function () {
                var _this = this;
                this.itemCount = 0;
                var itemList = this.cartService.listCartItemsByUsername(this.loggedInName);
                itemList.$promise.then(function (result) {
                    for (var i in result) {
                        if (i != "$promise" && i != "$resolved") {
                            _this.itemCount += result[i].quantity;
                        }
                    }
                });
            };
            NavController.prototype.showLogInModal = function () {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/login.html',
                    controller: LogInModalController,
                    controllerAs: "vm",
                    resolve: {},
                    size: "sm"
                });
            };
            NavController.prototype.showProfileModal = function (username) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/profile-modal.html',
                    controller: Controllers.MyProfileModalController,
                    controllerAs: "vm",
                    resolve: {
                        userNamePassed: function () { return username; }
                    },
                    size: "lg"
                });
            };
            NavController.prototype.getClaim = function (type) {
                return this.accountService.getClaim(type);
            };
            NavController.prototype.isLoggedIn = function () {
                return this.accountService.isLoggedIn();
            };
            NavController.prototype.logout = function () {
                this.accountService.logout();
            };
            NavController.prototype.getExternalLogins = function () {
                return this.accountService.getExternalLogins();
            };
            return NavController;
        })();
        var LogInModalController = (function () {
            function LogInModalController(accountService, $location, $uibModalInstance, $route) {
                this.accountService = accountService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
            }
            LogInModalController.prototype.login = function () {
                var _this = this;
                this.accountService.login(this.loginUser).then(function () {
                    _this.$uibModalInstance.close();
                    _this.$route.reload();
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            LogInModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return LogInModalController;
        })();
        Controllers.LogInModalController = LogInModalController;
        angular.module("MyApp").controller("NavController", NavController);
        var MyIndexController = (function () {
            function MyIndexController() {
                this.center = { latitude: 30.1775, longitude: -95.503889 };
                this.zoom = 9;
                this.markers = [
                    {
                        id: 0,
                        options: {
                            title: 'On the Green Golf',
                        },
                        icon: 'ngApp/Star.png',
                        latitude: 30.1775,
                        longitude: -95.503889
                    }
                ];
            }
            return MyIndexController;
        })();
        Controllers.MyIndexController = MyIndexController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=controllers.js.map