namespace MyApp.Controllers {

    export class HomeController {

        private confirmedFriendships;
        private requestedFriendships;
        public requestedFriends;
        public confirmedFriends;
        public requestedUser;

        constructor(private friendService: MyApp.Services.FriendService, private profileService: MyApp.Services.ProfileService, private $routeParams: ng.route.IRouteParamsService) {
            this.confirmedFriendships = this.friendService.GetConfirmedFriends($routeParams["userId"]);
            this.requestedFriendships = this.friendService.GetRequestedFriends($routeParams["userId"]);
            this.findingRequestedArray();
        }


        public findingRequestedArray() {
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
                        console.log(result);
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
                                this.requestedFriends.push(result.userName);
                            });

                        }
                        if (found == 0) {
                            let profileName = this.profileService.listProfileById(friendArray[j]).$promise.then((result) => {
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
                                this.requestedUser.push(result.userName);
                            });

                        }
                    }





                });
            });

        }


    }

}