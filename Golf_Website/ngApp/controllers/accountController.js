var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService, $location) {
                var _this = this;
                this.accountService = accountService;
                this.$location = $location;
                this.getExternalLogins().then(function (results) {
                    _this.externalLogins = results;
                });
            }
            AccountController.prototype.getClaim = function (type) {
                return this.accountService.getClaim(type);
            };
            AccountController.prototype.isLoggedIn = function () {
                return this.accountService.isLoggedIn();
            };
            AccountController.prototype.logout = function () {
                this.accountService.logout();
            };
            AccountController.prototype.getExternalLogins = function () {
                return this.accountService.getExternalLogins();
            };
            return AccountController;
        })();
        Controllers.AccountController = AccountController;
        angular.module('MyApp').controller('AccountController', AccountController);
        var RegisterController = (function () {
            function RegisterController(accountService, $location, courseService, filepickerService, $scope, profileService) {
                this.accountService = accountService;
                this.$location = $location;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.profileService = profileService;
                this.file = {
                    url: null
                };
                this.stateList = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
                this.format = 'yyyy/MM/dd';
                this.firstPage = true;
                this.secondPage = false;
                this.userProfile = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    userName: "",
                    city: "",
                    state: "",
                    zip: 0,
                    sex: "",
                    birthday: Date(),
                    homeCourse: "",
                    handiCap: 9999,
                    drivingDistance: 0,
                    picUrl: ''
                };
                this.courseList = courseService.listAllCourses();
            }
            RegisterController.prototype.register = function () {
                var _this = this;
                if (this.file.url) {
                    this.registerUser.picUrl = this.file.url;
                }
                this.accountService.register(this.registerUser).then(function () {
                    _this.addProfile();
                    _this.$location.path('/');
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            RegisterController.prototype.addProfile = function () {
                this.userProfile.firstName = this.registerUser.firstName;
                this.userProfile.lastName = this.registerUser.lastName;
                this.userProfile.email = this.registerUser.email;
                this.userProfile.userName = this.registerUser.userName;
                this.userProfile.city = this.registerUser.city;
                this.userProfile.state = this.registerUser.state;
                this.userProfile.zip = this.registerUser.zip;
                this.userProfile.sex = this.registerUser.sex;
                this.userProfile.birthday = this.registerUser.birthday;
                this.userProfile.homeCourse = this.registerUser.homeCourse;
                this.userProfile.handicap = this.registerUser.handicap;
                this.userProfile.drivingDistance = this.registerUser.drivingDistance;
                this.userProfile.picUrl = this.registerUser.picUrl;
                this.profileService.saveProfile(this.userProfile);
            };
            RegisterController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
                this.picLoaded = true;
            };
            RegisterController.prototype.fileUploaded = function (file) {
                // save file url to database
                this.file = file;
            };
            RegisterController.prototype.nextPage = function (page) {
                if (page == 1) {
                    this.firstPage = false;
                    this.secondPage = true;
                }
                else if (page == 2) {
                    this.firstPage = false;
                    this.secondPage = false;
                }
            };
            return RegisterController;
        })();
        Controllers.RegisterController = RegisterController;
        var ExternalLoginController = (function () {
            function ExternalLoginController($http, $location, accountService) {
                this.$location = $location;
                this.accountService = accountService;
                // if the user is already registered then redirect home else register
                var response = accountService.parseOAuthResponse($location.hash());
                var externalAccessToken = response['access_token'];
                accountService.getUserInfo(externalAccessToken).then(function (userInfo) {
                    if (userInfo.hasRegistered) {
                        accountService.storeUserInfo(response);
                        $location.path('/');
                    }
                    else {
                        $location.path('/externalRegister');
                    }
                });
            }
            return ExternalLoginController;
        })();
        Controllers.ExternalLoginController = ExternalLoginController;
        var ExternalRegisterController = (function () {
            function ExternalRegisterController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
                var response = accountService.parseOAuthResponse($location.hash());
                this.externalAccessToken = response['access_token'];
            }
            ExternalRegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.registerExternal(this.registerUser.email, this.externalAccessToken)
                    .then(function (result) {
                    _this.$location.path('/login');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            };
            return ExternalRegisterController;
        })();
        Controllers.ExternalRegisterController = ExternalRegisterController;
        var ConfirmEmailController = (function () {
            function ConfirmEmailController(accountService, $http, $routeParams, $location) {
                var _this = this;
                this.accountService = accountService;
                this.$http = $http;
                this.$routeParams = $routeParams;
                this.$location = $location;
                var userId = $routeParams['userId'];
                var code = $routeParams['code'];
                accountService.confirmEmail(userId, code)
                    .then(function (result) {
                    _this.$location.path('/');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            }
            return ConfirmEmailController;
        })();
        Controllers.ConfirmEmailController = ConfirmEmailController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=accountController.js.map