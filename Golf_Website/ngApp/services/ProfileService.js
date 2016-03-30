var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ProfileService = (function () {
            function ProfileService($resource) {
                this.$resource = $resource;
                this.profileResource = $resource('/api/profile/:id');
            }
            //Return all profiles
            ProfileService.prototype.listProfiles = function () {
                return this.profileResource.query();
            };
            ProfileService.prototype.listProfileById = function (id) {
                return this.profileResource.get({ id: id });
            };
            ProfileService.prototype.listProfilePicByName = function (userName) {
                this.userNameResource = this.$resource('/api/profile/user/' + userName);
                return this.userNameResource.get();
            };
            ProfileService.prototype.saveProfile = function (profileToSave) {
                return this.profileResource.save(profileToSave).$promise;
            };
            ProfileService.prototype.deleteProfile = function (id) {
                return this.profileResource.delete({ id: id }).$promise;
            };
            return ProfileService;
        })();
        Services.ProfileService = ProfileService;
        angular.module("MyApp").service("profileService", ProfileService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=ProfileService.js.map