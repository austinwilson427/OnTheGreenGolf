namespace MyApp.Services {

    export class FriendService {

        private confirmedFriendResource;
        private requestedFriendResource;

        constructor($resource: ng.resource.IResourceService) {
            this.confirmedFriendResource = $resource("/api/confirmed/:friendId");
            this.requestedFriendResource = $resource("/api/requested/:userId");
        }

        public GetConfirmedFriends(friendId) {
            return this.confirmedFriendResource.query({ friendId: friendId });
        }

        public GetRequestedFriends(userId) {
            return this.requestedFriendResource.query({ userId: userId});
        }

        //public PostFriendship(friendToAdd) {
        //    return this.friendResource.save(friendToAdd).$promise;
        //}

        //public DeleteFriendship(id) {
        //    return this.friendResource.remove({ id: id }).$promise;
        //}

    }

    angular.module("MyApp").service("friendService", FriendService);
}