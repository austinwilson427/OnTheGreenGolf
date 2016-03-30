namespace MyApp.Services{

    export class ProfileService {

        private profileResource;
        private userNameResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.profileResource = $resource('/api/profile/:id');
           
        }

        //Return all profiles
        public listProfiles() {
            return this.profileResource.query();
        }

        public listProfileById(id) {
            return this.profileResource.get({ id: id });
        }

        public listProfilePicByName(userName) {
            this.userNameResource = this.$resource('/api/profile/user/' + userName);
            return this.userNameResource.get();
        }

        public saveProfile(profileToSave) {
            return this.profileResource.save(profileToSave).$promise;
        }

        public deleteProfile(id) {
            return this.profileResource.delete({ id: id }).$promise;
        }
    }


    angular.module("MyApp").service("profileService", ProfileService);

}