var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var MyProfileController = (function () {
            function MyProfileController($routeParams, profileService, accountService, $uibModal, $location) {
                var _this = this;
                this.profileService = profileService;
                this.accountService = accountService;
                this.$uibModal = $uibModal;
                this.$location = $location;
                this.date = new Date();
                this.userName = this.accountService.getUserName();
                console.log($routeParams["userName"]);
                this.profileService.listProfilePicByName($routeParams["userName"]).$promise.then(function (profileInfo) {
                    _this.profileInfo = profileInfo;
                    var d1 = moment(_this.date);
                    var d2 = moment(profileInfo.birthday);
                    _this.profileInfo.age = Math.floor(moment.duration(d1.diff(d2)).asYears());
                    console.log(_this.profileInfo.userName);
                    console.log(_this.userName);
                    if (_this.profileInfo.userName == _this.userName) {
                        _this.showEdit = true;
                    }
                    else {
                        _this.showEdit = false;
                    }
                    console.log(_this.showEdit);
                });
            }
            return MyProfileController;
        })();
        Controllers.MyProfileController = MyProfileController;
        var MyProfileModalController = (function () {
            function MyProfileModalController($routeParams, profileService, userNamePassed, $uibModalInstance, accountService, $uibModal, $location, friendService) {
                var _this = this;
                this.profileService = profileService;
                this.userNamePassed = userNamePassed;
                this.$uibModalInstance = $uibModalInstance;
                this.accountService = accountService;
                this.$uibModal = $uibModal;
                this.$location = $location;
                this.friendService = friendService;
                this.date = new Date();
                this.userName = this.accountService.getUserName();
                this.profileService.listProfilePicByName(this.userNamePassed).$promise.then(function (profileInfo) {
                    _this.profileInfo = profileInfo;
                    var d1 = moment(_this.date);
                    var d2 = moment(profileInfo.birthday);
                    _this.profileInfo.age = Math.floor(moment.duration(d1.diff(d2)).asYears());
                    if (_this.profileInfo.userName == _this.userName) {
                        _this.showEdit = true;
                    }
                    else {
                        _this.showEdit = false;
                    }
                    _this.profileService.listProfilePicByName(_this.userName).$promise.then(function (result) {
                        _this.profileId = result.id;
                        console.log(_this.profileId);
                        _this.confirmedFriendships = _this.friendService.GetConfirmedFriends(_this.profileId);
                        _this.requestedFriendships = _this.friendService.GetRequestedFriends(_this.profileId);
                        console.log(_this.confirmedFriendships);
                        console.log(_this.requestedFriendships);
                        _this.findingRequestedArray(_this.profileInfo.userName);
                    });
                });
            }
            MyProfileModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            MyProfileModalController.prototype.editProfileModal = function (profile) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/edit-profile.html',
                    controller: ProfileEditModalController,
                    controllerAs: "vm",
                    resolve: {
                        data: function () { return profile; }
                    },
                    size: "sm"
                });
            };
            MyProfileModalController.prototype.getScorecards = function (username) {
                this.closeModal();
                this.$location.path('/scorecards/' + username);
            };
            MyProfileModalController.prototype.findingRequestedArray = function (profileUserName) {
                var _this = this;
                var friendArray = [];
                this.requestedFriendships.$promise.then(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        friendArray[i] = result[i].friendId;
                    }
                    _this.confirmedFriendships.$promise.then(function (result) {
                        var found;
                        _this.requestedFriends = [];
                        var request;
                        var confirm;
                        _this.confirmedFriends = [];
                        _this.requestedUser = [];
                        for (var j = 0; j < friendArray.length; j++) {
                            if (result.length > 0) {
                                for (var k = 0; k < result.length; k++) {
                                    if (friendArray[j] == result[k].userId) {
                                        found = 0;
                                        break;
                                    }
                                    else {
                                        found = 1;
                                    }
                                }
                            }
                            else {
                                found = 1;
                            }
                            if (found == 1) {
                                var profileName = _this.profileService.listProfileById(friendArray[j]).$promise.then(function (result) {
                                    if (result.userName == profileUserName) {
                                        _this.currentStatus = "requested";
                                        console.log(_this.currentStatus);
                                    }
                                    _this.requestedFriends.push(result.userName);
                                });
                            }
                            if (found == 0) {
                                var profileName = _this.profileService.listProfileById(friendArray[j]).$promise.then(function (result) {
                                    if (result.userName == profileUserName) {
                                        _this.currentStatus = "confirmed";
                                        console.log(_this.currentStatus);
                                    }
                                    _this.confirmedFriends.push(result.userName);
                                });
                            }
                        }
                        for (var m = 0; m < result.length; m++) {
                            if (friendArray.length > 0) {
                                for (var n = 0; n < friendArray.length; n++) {
                                    if (friendArray[n] == result[m].userId) {
                                        found = 0;
                                        break;
                                    }
                                    else {
                                        found = 1;
                                    }
                                }
                            }
                            else {
                                found = 1;
                            }
                            if (found == 1) {
                                var profileName = _this.profileService.listProfileById(result[m].userId).$promise.then(function (result) {
                                    if (result.userName == profileUserName) {
                                        _this.currentStatus = "awaiting";
                                        console.log(_this.currentStatus);
                                    }
                                    _this.requestedUser.push(result.userName);
                                });
                            }
                        }
                    });
                });
            };
            return MyProfileModalController;
        })();
        Controllers.MyProfileModalController = MyProfileModalController;
        var ProfileEditModalController = (function () {
            function ProfileEditModalController(data, profileService, $uibModalInstance, accountService) {
                this.data = data;
                this.profileService = profileService;
                this.$uibModalInstance = $uibModalInstance;
                this.accountService = accountService;
                this.userName = this.accountService.getUserName();
            }
            ProfileEditModalController.prototype.editProfile = function (data) {
                this.profileService.saveProfile(data);
                this.closeModal();
            };
            ProfileEditModalController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return ProfileEditModalController;
        })();
        Controllers.ProfileEditModalController = ProfileEditModalController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=profileController.js.map