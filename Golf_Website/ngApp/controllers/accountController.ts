namespace MyApp.Controllers {

    export class AccountController {
        public externalLogins;


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

        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });
        }
    }

    angular.module('MyApp').controller('AccountController', AccountController);


    export class RegisterController {
        public registerUser;
        public userProfile;
        public validationMessages;
        public stateList;
        public format;
        public courseList;
        public file;
        public firstPage;
        public secondPage;
        public picLoaded;

        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService, courseService: MyApp.Services.CourseService, private filepickerService, private $scope: ng.IScope, private profileService: MyApp.Services.ProfileService) {

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

        public register() {
            if (this.file.url) {
                this.registerUser.picUrl = this.file.url;
            }
            this.accountService.register(this.registerUser).then(() => {
                this.addProfile();
                this.$location.path('/');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        public addProfile() {

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

        }

        public pickFile() {
            this.filepickerService.pick(
                { mimetype: 'image/*' },
                this.fileUploaded.bind(this)
            );

            this.picLoaded = true;

        }

        public fileUploaded(file) {
            // save file url to database
            this.file = file;

        }

        public nextPage(page) {
            if (page == 1) {
                this.firstPage = false;
                this.secondPage = true;
            } else if (page == 2) {
                this.firstPage = false;
                this.secondPage = false;
            }

        }

    }



    export class ExternalLoginController {

        constructor($http: ng.IHttpService, private $location: ng.ILocationService, private accountService: MyApp.Services.AccountService) {
            // if the user is already registered then redirect home else register
            let response = accountService.parseOAuthResponse($location.hash());
            let externalAccessToken = response['access_token'];
            accountService.getUserInfo(externalAccessToken).then((userInfo: any) => {
                if (userInfo.hasRegistered) {
                    accountService.storeUserInfo(response);
                    $location.path('/');
                } else {
                    $location.path('/externalRegister');
                }
            });
        }
    }


    export class ExternalRegisterController {
        private externalAccessToken;
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.registerExternal(this.registerUser.email, this.externalAccessToken)
                .then((result) => {
                    this.$location.path('/login');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }

        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService) {
            let response = accountService.parseOAuthResponse($location.hash());
            this.externalAccessToken = response['access_token'];
        }

    }

    export class ConfirmEmailController {
        public validationMessages;

        constructor(
            private accountService: MyApp.Services.AccountService,
            private $http: ng.IHttpService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
        ) {
            let userId = $routeParams['userId'];
            let code = $routeParams['code'];
            accountService.confirmEmail(userId, code)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }
    }

}