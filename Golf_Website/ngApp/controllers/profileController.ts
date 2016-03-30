namespace MyApp.Controllers {

    export class MyProfileController {

        public profiles;
        public indProfile;
        public indAge;
        public profileInfo;
        public age;
        public date;
        public birthdate;
        public userName;
        public showEdit;
        constructor($routeParams: ng.route.IRouteParamsService, private profileService: MyApp.Services.ProfileService, private accountService: MyApp.Services.AccountService, private $uibModal: angular.ui.bootstrap.IModalService, private $location: ng.ILocationService) {
            this.date = new Date();
            this.userName = this.accountService.getUserName();
            console.log($routeParams["userName"]);
            this.profileService.listProfilePicByName($routeParams["userName"]).$promise.then((profileInfo) => {
                this.profileInfo = profileInfo;
                let d1 = moment(this.date);
                let d2 = moment(profileInfo.birthday);
                this.profileInfo.age = Math.floor(moment.duration(d1.diff(d2)).asYears());
                console.log(this.profileInfo.userName);
                console.log(this.userName);
                if (this.profileInfo.userName == this.userName) {
                    this.showEdit = true;
                } else {
                    this.showEdit = false;
                }
                console.log(this.showEdit);
            });


        }

    }

    export class MyProfileModalController {
        public profiles;
        public indProfile;
        public indAge;
        public profileInfo;
        public age;
        public date;
        public birthdate;
        public userName;
        public showEdit;
        private confirmedFriendships;
        private requestedFriendships;
        public requestedFriends;
        public confirmedFriends;
        public requestedUser;
        public profileId;
        public currentStatus;

        constructor($routeParams: ng.route.IRouteParamsService, private profileService: MyApp.Services.ProfileService, public userNamePassed, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private accountService: MyApp.Services.AccountService, private $uibModal: angular.ui.bootstrap.IModalService, private $location: ng.ILocationService, private friendService: MyApp.Services.FriendService) {
            this.date = new Date();
            this.userName = this.accountService.getUserName();
            
            

            
            this.profileService.listProfilePicByName(this.userNamePassed).$promise.then((profileInfo) => {
                this.profileInfo = profileInfo;
                let d1 = moment(this.date);
                let d2 = moment(profileInfo.birthday);
                this.profileInfo.age = Math.floor(moment.duration(d1.diff(d2)).asYears());
                if (this.profileInfo.userName == this.userName) {
                    this.showEdit = true;
                } else {
                    this.showEdit = false;
                }

                this.profileService.listProfilePicByName(this.userName).$promise.then((result) => {
                    this.profileId = result.id;
                    console.log(this.profileId);
                    this.confirmedFriendships = this.friendService.GetConfirmedFriends(this.profileId);
                    this.requestedFriendships = this.friendService.GetRequestedFriends(this.profileId);
                    console.log(this.confirmedFriendships);
                    console.log(this.requestedFriendships);
                    this.findingRequestedArray(this.profileInfo.userName);
                    
                });


            });


        }

        public closeModal() {

            this.$uibModalInstance.close();

        }

        public editProfileModal(profile) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/edit-profile.html',
                controller: ProfileEditModalController,
                controllerAs: "vm",
                resolve: {
                    data: () => profile
                },
                size: "sm"
            });
        }

        public getScorecards(username) {
            this.closeModal();
            this.$location.path('/scorecards/' + username);
        }

        public findingRequestedArray(profileUserName) {
            let friendArray = [];
            this.requestedFriendships.$promise.then((result) => {
                for (var i = 0; i < result.length; i++) {
                    friendArray[i] = result[i].friendId;
                }
                this.confirmedFriendships.$promise.then((result) => {
                    let found;
                    this.requestedFriends = [];
                    let request;
                    let confirm;
                    this.confirmedFriends = [];
                    this.requestedUser = [];
                    for (var j = 0; j < friendArray.length; j++) {
                        if (result.length > 0) {
                            for (var k = 0; k < result.length; k++) {

                                if (friendArray[j] == result[k].userId) {
                                    found = 0;
                                    break;
                                } else {
                                    found = 1;
                                }

                            }
                        } else {
                            found = 1;
                        }

                       

                        if (found == 1) {
                            let profileName = this.profileService.listProfileById(friendArray[j]).$promise.then((result) => {
                                if (result.userName == profileUserName) {
                                    this.currentStatus = "requested";
                                    console.log(this.currentStatus);
                                }
                                this.requestedFriends.push(result.userName);
                            });

                        }
                        if (found == 0) {
                            let profileName = this.profileService.listProfileById(friendArray[j]).$promise.then((result) => {
                                if (result.userName == profileUserName) {
                                    this.currentStatus = "confirmed";
                                    console.log(this.currentStatus);
                                }
                                this.confirmedFriends.push(result.userName);
                            });
                        }
                    }

                    

                    for (var m = 0; m < result.length; m++) {
                        if (friendArray.length > 0) {
                            for (var n = 0; n < friendArray.length; n++) {
                                if (friendArray[n] == result[m].userId) {
                                    found = 0;
                                    break;
                                } else {
                                    found = 1;
                                }
                            }
                        } else {
                            found = 1;
                        }

                        if (found == 1) {
                            let profileName = this.profileService.listProfileById(result[m].userId).$promise.then((result) => {
                                if (result.userName == profileUserName) {
                                    this.currentStatus = "awaiting";
                                    console.log(this.currentStatus);
                                }
                                this.requestedUser.push(result.userName);
                            });

                        }
                    }

                   




                });
            });

        }




    }

    export class ProfileEditModalController {

        public userName;

        constructor(public data, private profileService: MyApp.Services.ProfileService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private accountService: MyApp.Services.AccountService) {
            this.userName = this.accountService.getUserName();

        }

        public editProfile(data) {

            this.profileService.saveProfile(data);
            this.closeModal();
        }

        public closeModal() {

            this.$uibModalInstance.close();

        }
    }
}

