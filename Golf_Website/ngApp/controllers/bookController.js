var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var MyBookController = (function () {
            function MyBookController($routeParams, $resource, bookService, courseService, $uibModal, profileService, $location) {
                this.$routeParams = $routeParams;
                this.bookService = bookService;
                this.courseService = courseService;
                this.$uibModal = $uibModal;
                this.profileService = profileService;
                this.$location = $location;
                if ($routeParams["course"] != 0) {
                    this.showTimes = true;
                }
                this.getTeeTimes();
                this.courseList = this.courseService.listAllCourses();
                this.getCourseId();
                this.dates = {
                    start: new Date(),
                    end: new Date()
                };
                for (var i in this.courseList) {
                    if (this.courseList[i].id == this.courseId) {
                        this.currentCourse = this.courseList[i].course;
                    }
                }
            }
            MyBookController.prototype.compareTimes = function (time) {
                if (this.dateRange == 0) {
                    this.dates.start = new Date('2016-01-29T07:00:00');
                    this.dates.end = new Date('2016-01-29T08:15:00');
                }
                else if (this.dateRange == 1) {
                    this.dates.start = new Date('2016-01-29T08:30:00');
                    this.dates.end = new Date('2016-01-29T09:45:00');
                }
                else if (this.dateRange == 2) {
                    this.dates.start = new Date('2016-01-29T10:00:00');
                    this.dates.end = new Date('2016-01-29T11:15:00');
                }
                else if (this.dateRange == 3) {
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
                var newTime = new Date(time);
                if (newTime >= this.dates.start && newTime <= this.dates.end) {
                    return true;
                }
                else {
                    return false;
                }
            };
            MyBookController.prototype.changePage = function () {
                this.$location.path("/book/" + this.selectedCourse);
            };
            MyBookController.prototype.getCourseId = function () {
                this.courseId = this.$routeParams["course"];
            };
            MyBookController.prototype.getTeeTimes = function () {
                this.getCourseId();
                this.allTeeTimes = this.bookService.listAllTeeTimesByCourse(this.courseId);
            };
            MyBookController.prototype.showTeeTimeModal = function (teeTime, char) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/add-teetime.html',
                    controller: TeeTimeAddController,
                    controllerAs: "vm",
                    resolve: {
                        data: function () { return teeTime; },
                        char: function () { return char; },
                    },
                    size: "sm"
                });
            };
            MyBookController.prototype.showProfileModal = function (username) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/profile-modal.html',
                    controller: Controllers.MyProfileModalController,
                    controllerAs: "vm",
                    resolve: {
                        userNamePassed: function () { return username; }
                    },
                    size: "sm"
                });
            };
            return MyBookController;
        })();
        Controllers.MyBookController = MyBookController; //MyBookControllerClass
        var TeeTimeAddController = (function () {
            function TeeTimeAddController(data, char, $uibModalInstance, $resource, $route, courseService, bookService, accountService, profileService, $uibModal) {
                this.data = data;
                this.char = char;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
                this.courseService = courseService;
                this.bookService = bookService;
                this.accountService = accountService;
                this.profileService = profileService;
                this.$uibModal = $uibModal;
                this.page1 = true;
                this.page2 = false;
                this.userName = this.accountService.getUserName();
                this.courseToReserve = this.courseService.GetCourse(this.data.courseId);
                this.profileInfo = {
                    handicap: 9999,
                    picUrl: ''
                };
            }
            TeeTimeAddController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            TeeTimeAddController.prototype.saveTeeTime = function (teeTimeToSave, char) {
                var _this = this;
                this.profileService.listProfilePicByName(this.userName).$promise.then(function (profileInfo) {
                    _this.profileInfo.picUrl = profileInfo.picUrl;
                    _this.profileInfo.handicap = profileInfo.handicap;
                    if (_this.userName) {
                        if (char == 'a') {
                            teeTimeToSave.a = _this.userName;
                            teeTimeToSave.aPic = _this.profileInfo.picUrl;
                            teeTimeToSave.aHandicap = _this.profileInfo.handicap;
                        }
                        else if (char == 'b') {
                            teeTimeToSave.b = _this.userName;
                            teeTimeToSave.b = _this.userName;
                            teeTimeToSave.bPic = _this.profileInfo.picUrl;
                            teeTimeToSave.bHandicap = _this.profileInfo.handicap;
                        }
                        else if (char == 'c') {
                            teeTimeToSave.c = _this.userName;
                            teeTimeToSave.c = _this.userName;
                            teeTimeToSave.cPic = _this.profileInfo.picUrl;
                            teeTimeToSave.cHandicap = _this.profileInfo.handicap;
                        }
                        else if (char == 'd') {
                            teeTimeToSave.d = _this.userName;
                            teeTimeToSave.d = _this.userName;
                            teeTimeToSave.dPic = _this.profileInfo.picUrl;
                            teeTimeToSave.dHandicap = _this.profileInfo.handicap;
                        }
                    }
                    else {
                        console.log("Please Log In");
                    }
                    console.log(teeTimeToSave);
                    _this.bookService.saveTeeTime(teeTimeToSave).then(function () {
                        //Getting tee times to refresh
                        _this.bookService.listAllTeeTimesByCourse(teeTimeToSave.courseId);
                        _this.closeModal();
                    }).catch(function (error) {
                        var validationErrors = [];
                        for (var i in error.data.modelState) {
                            var errorMessage = error.data.modelState[i];
                            validationErrors = validationErrors.concat(errorMessage);
                        }
                        _this.validationErrors = validationErrors;
                    });
                });
            };
            TeeTimeAddController.prototype.showLogInModal = function () {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/login.html',
                    controller: Controllers.LogInModalController,
                    controllerAs: "vm",
                    resolve: {},
                    size: "sm"
                });
            };
            TeeTimeAddController.prototype.nextPage = function (page) {
                if (page == 1) {
                    this.page1 = false;
                    this.page2 = true;
                }
            };
            return TeeTimeAddController;
        })();
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=bookController.js.map