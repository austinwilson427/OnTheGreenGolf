namespace MyApp.Controllers {

    export class MyBookController {

        public courseList;
        public selectedCourse;
        public currentCourse;
        public teeTimeResource;
        public allTeeTimes;
        public courseId;
        public validationErrors;
        public dates;
        public dateRange;
        public showTimes;

        constructor(private $routeParams: ng.route.IRouteParamsService, $resource: ng.resource.IResourceService, private bookService: MyApp.Services.BookService, private courseService: MyApp.Services.CourseService, private $uibModal: angular.ui.bootstrap.IModalService, private profileService: MyApp.Services.ProfileService, private $location: ng.ILocationService) {
            if ($routeParams["course"] != 0) {
                this.showTimes = true;
            }
            this.getTeeTimes();
            this.courseList = this.courseService.listAllCourses();
            this.getCourseId();
            this.dates = {
                start: new Date(),
                end: new Date()
            }
            for (var i in this.courseList) {
                if (this.courseList[i].id == this.courseId) {
                    this.currentCourse = this.courseList[i].course;
                }
            }
        }

        compareTimes(time) {
            if (this.dateRange == 0) {
                this.dates.start = new Date('2016-01-29T07:00:00');
                this.dates.end = new Date('2016-01-29T08:15:00');
            } else if (this.dateRange == 1) {
                this.dates.start = new Date('2016-01-29T08:30:00');
                this.dates.end = new Date('2016-01-29T09:45:00');
            } else if (this.dateRange == 2) {
                this.dates.start = new Date('2016-01-29T10:00:00');
                this.dates.end = new Date('2016-01-29T11:15:00');
            } else if (this.dateRange == 3) {
                this.dates.start = new Date('2016-01-29T11:30:00');
                this.dates.end = new Date('2016-01-29T12:45:00');
            }
            else if (this.dateRange == 4) {
                this.dates.start = new Date('2016-01-29T13:00:00');
                this.dates.end = new Date('2016-01-29T14:15:00');
            }
            else if (this.dateRange == 5) {
                this.dates.start = new Date('2016-01-29T14:30:00');
                this.dates.end = new Date('2016-01-29T15:45:00');
            }
            else if (this.dateRange == 6) {
                this.dates.start = new Date('2016-01-29T16:00:00');
                this.dates.end = new Date('2016-01-29T17:15:00');
            }
            let newTime = new Date(time);
            if (newTime >= this.dates.start && newTime <= this.dates.end) {
                return true;
            } else {
                return false;
            }
        }
        changePage() {
            this.$location.path("/book/" + this.selectedCourse);
                        
        }

        getCourseId() {
            this.courseId = this.$routeParams["course"];
        }

        public getTeeTimes() {
            this.getCourseId();
            this.allTeeTimes = this.bookService.listAllTeeTimesByCourse(this.courseId);
        }

        public showTeeTimeModal(teeTime, char) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/add-teetime.html',
                controller: TeeTimeAddController,
                controllerAs: "vm",
                resolve: {
                    data: () => teeTime,
                    char: () => char,
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
                    userNamePassed: () => username
                },
                size: "sm"
            });
        }
    }//MyBookControllerClass

    class TeeTimeAddController {

        public courseToReserve;
        public nameOfPlayer;
        public validationErrors;
        public userName;
        public profileInfo;
        public page1;
        public page2;

        constructor(public data, public char, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, $resource: ng.resource.IResourceService, private $route: ng.route.IRouteService, private courseService: MyApp.Services.CourseService, private bookService: MyApp.Services.BookService, private accountService: MyApp.Services.AccountService, private profileService: MyApp.Services.ProfileService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.page1 = true;
            this.page2 = false;
            this.userName = this.accountService.getUserName();
            this.courseToReserve = this.courseService.GetCourse(this.data.courseId);
            this.profileInfo = {
                handicap: 9999,
                picUrl: ''
            };
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }

        public saveTeeTime(teeTimeToSave, char) {

            this.profileService.listProfilePicByName(this.userName).$promise.then((profileInfo) => {

                this.profileInfo.picUrl = profileInfo.picUrl;
                this.profileInfo.handicap = profileInfo.handicap;

                if (this.userName) {
                    if (char == 'a') {
                        teeTimeToSave.a = this.userName;
                        teeTimeToSave.aPic = this.profileInfo.picUrl;
                        teeTimeToSave.aHandicap = this.profileInfo.handicap;
                    } else if (char == 'b') {
                        teeTimeToSave.b = this.userName;
                        teeTimeToSave.b = this.userName;
                        teeTimeToSave.bPic = this.profileInfo.picUrl;
                        teeTimeToSave.bHandicap = this.profileInfo.handicap;
                    } else if (char == 'c') {
                        teeTimeToSave.c = this.userName;
                        teeTimeToSave.c = this.userName;
                        teeTimeToSave.cPic = this.profileInfo.picUrl;
                        teeTimeToSave.cHandicap = this.profileInfo.handicap;
                    } else if (char == 'd') {
                        teeTimeToSave.d = this.userName;
                        teeTimeToSave.d = this.userName;
                        teeTimeToSave.dPic = this.profileInfo.picUrl;
                        teeTimeToSave.dHandicap = this.profileInfo.handicap;
                    }
                } else {
                    console.log("Please Log In");
                }

                console.log(teeTimeToSave);

                this.bookService.saveTeeTime(teeTimeToSave).then(() => {
                    //Getting tee times to refresh
                    this.bookService.listAllTeeTimesByCourse(teeTimeToSave.courseId);
                    this.closeModal();
                }).catch((error) => {

                    let validationErrors = [];
                    for (let i in error.data.modelState) {
                        let errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    this.validationErrors = validationErrors;
                });

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

        public nextPage(page) {
            if (page == 1) {
                this.page1 = false;
                this.page2 = true;
            }
        }

    }
}