namespace MyApp.Services {

    export class ScorecardService {

        private scorecardResource;
        private playerScorecardResource;
        private courseScorecardResource;

        constructor($resource: ng.resource.IResourceService) {

            this.scorecardResource = $resource('/api/scorecard');
            this.playerScorecardResource = $resource('/api/scorecard/user/:userName');
            this.courseScorecardResource = $resource('/api/scorecard/course/:courseId');
        }

        public listScorecards() {

            return this.scorecardResource.query();

        }

        public listScorecardsByUserName(userName) {
            return this.playerScorecardResource.query({ userName: userName });
        }

        public listScorecardsByCourse(courseId) {
            return this.courseScorecardResource.get({ courseId: courseId });
        }

        public saveScorecard(itemToSave) {

            return this.scorecardResource.save(itemToSave).$promise;

        }

        public deleteScorecard(id) {
            return this.scorecardResource.delete({ id: id }).$promise;
        }
    }

    angular.module("MyApp").service('scorecardService', ScorecardService);
}