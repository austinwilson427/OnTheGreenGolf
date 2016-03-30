var MyApp;
(function (MyApp) {
    angular.module("MyApp", ["ngRoute", "ngResource", "ui.bootstrap", "ui-rangeSlider", "ngAnimate", "angular-filepicker", "uiGmapgoogle-maps"]).config(function ($routeProvider, $locationProvider, filepickerProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({});
        filepickerProvider.setKey('	AVQ1Qhe3bThOKLE9WfDiYz');
        $routeProvider
            .when("/", {
            templateUrl: '/ngApp/views/index.html',
            controller: MyApp.Controllers.MyIndexController,
            controllerAs: "vm"
        })
            .when('/register', {
            templateUrl: '/ngApp/views/register.html',
            controller: MyApp.Controllers.RegisterController,
            controllerAs: 'vm'
        })
            .when('/externalLogin', {
            templateUrl: '/ngApp/views/externalLogin.html',
            controller: MyApp.Controllers.ExternalLoginController,
            controllerAs: 'controller'
        })
            .when('/externalRegister', {
            templateUrl: '/ngApp/views/externalRegister.html',
            controller: MyApp.Controllers.ExternalRegisterController,
            controllerAs: 'controller'
        })
            .when('/confirmEmail', {
            templateUrl: '/ngApp/views/confirmEmail.html',
            controller: MyApp.Controllers.ConfirmEmailController,
            controllerAs: 'controller'
        })
            .when("/shop", {
            templateUrl: '/ngApp/views/shop.html',
            controller: MyApp.Controllers.MyShopController,
            controllerAs: "vm"
        })
            .when("/book/:course", {
            templateUrl: '/ngApp/views/book.html',
            controller: MyApp.Controllers.MyBookController,
            controllerAs: "vm"
        })
            .when("/profile/:userName", {
            templateUrl: '/ngApp/views/profile.html',
            controller: MyApp.Controllers.MyProfileController,
            controllerAs: "vm"
        })
            .when("/cart/:username", {
            templateUrl: '/ngApp/views/shopping-cart.html',
            controller: MyApp.Controllers.CartController,
            controllerAs: "vm"
        })
            .when("/scorecards/:userName", {
            templateUrl: '/ngApp/views/scorecards.html',
            controller: MyApp.Controllers.ScorecardController,
            controllerAs: "vm"
        })
            .when("/admin/:type", {
            templateUrl: '/ngApp/views/admin.html',
            controller: MyApp.Controllers.AdminController,
            controllerAs: "vm"
        })
            .when("/home/:userId", {
            templateUrl: '/ngApp/views/home.html',
            controller: MyApp.Controllers.HomeController,
            controllerAs: "vm"
        })
            .otherwise({
            redirectTo: '/ngApp/views/notFound.html'
        });
        $locationProvider.html5Mode(true);
    });
    angular.module('MyApp').factory('authInterceptor', function ($q, $window, $location) {
        return ({
            request: function (config) {
                config.headers = config.headers || {};
                var token = $window.sessionStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                }
                return response || $q.when(response);
            }
        });
    });
    angular.module('MyApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})(MyApp || (MyApp = {}));
//# sourceMappingURL=app.js.map