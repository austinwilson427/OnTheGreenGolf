namespace MyApp.Controllers {

    class NavController {

        public navListings;
        public externalLogins;
        public loggedInName;
        public itemCount;

        constructor(private $uibModal: angular.ui.bootstrap.IModalService, private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService, private cartService: MyApp.Services.CartService) {

            this.getLoggedInUserName();
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });
            this.getTotalItemsInCart();
        }

        public getLoggedInUserName() {
            this.loggedInName = this.accountService.getUserName();

        }

        public getTotalItemsInCart() {
            this.itemCount = 0;
            let itemList = this.cartService.listCartItemsByUsername(this.loggedInName);
            itemList.$promise.then((result) => {

                for (var i in result) {
                    if (i != "$promise" && i != "$resolved") {
                        this.itemCount += result[i].quantity;
                    }
                }
            });
        }

        public showLogInModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/login.html',
                controller: LogInModalController,
                controllerAs: "vm",
                resolve: {
                    
                },
                size: "sm"
            });
        }

        public showProfileModal(username) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/profile-modal.html',
                controller: MyProfileModalController,
                controllerAs: "vm",
                resolve: {
                    userNamePassed: ()=> username
                },
                size: "lg"
            });
        }

        public getClaim(type) {
            return this.accountService.getClaim(type);
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public logout() {
            this.accountService.logout();
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }


    }

    export class LogInModalController {
        public loginUser;
        public validationMessages;

        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $route: ng.route.IRouteService) {

        }

        public login() {
            this.accountService.login(this.loginUser).then(() => {
                this.$uibModalInstance.close();
                this.$route.reload();
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        closeModal() {
            this.$uibModalInstance.close();
        }
    }


    angular.module("MyApp").controller("NavController", NavController);

    export class MyIndexController {
        public center = { latitude: 30.1775, longitude: -95.503889 };
        public zoom = 9;
        public markers = [
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

}