var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var FriendService = (function () {
            function FriendService($resource) {
                this.confirmedFriendResource = $resource("/api/confirmed/:friendId");
                this.requestedFriendResource = $resource("/api/requested/:userId");
            }
            FriendService.prototype.GetConfirmedFriends = function (friendId) {
                return this.confirmedFriendResource.query({ friendId: friendId });
            };
            FriendService.prototype.GetRequestedFriends = function (userId) {
                return this.requestedFriendResource.query({ userId: userId });
            };
            return FriendService;
        })();
        Services.FriendService = FriendService;
        angular.module("MyApp").service("friendService", FriendService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=FriendService.js.map