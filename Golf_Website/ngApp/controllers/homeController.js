var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(friendService, profileService, $routeParams) {
                this.friendService = friendService;
                this.profileService = profileService;
                this.$routeParams = $routeParams;
                this.confirmedFriendships = this.friendService.GetConfirmedFriends($routeParams["userId"]);
                this.requestedFriendships = this.friendService.GetRequestedFriends($routeParams["userId"]);
                this.findingRequestedArray();
            }
            HomeController.prototype.findingRequestedArray = function () {
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
                            console.log(result);
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
                                    _this.requestedFriends.push(result.userName);
                                });
                            }
                            if (found == 0) {
                                var profileName = _this.profileService.listProfileById(friendArray[j]).$promise.then(function (result) {
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
                                    _this.requestedUser.push(result.userName);
                                });
                            }
                        }
                    });
                });
            };
            return HomeController;
        })();
        Controllers.HomeController = HomeController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=homeController.js.map