var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ScorecardService = (function () {
            function ScorecardService($resource) {
                this.scorecardResource = $resource('/api/scorecard');
                this.playerScorecardResource = $resource('/api/scorecard/user/:userName');
                this.courseScorecardResource = $resource('/api/scorecard/course/:courseId');
            }
            ScorecardService.prototype.listScorecards = function () {
                return this.scorecardResource.query();
            };
            ScorecardService.prototype.listScorecardsByUserName = function (userName) {
                return this.playerScorecardResource.query({ userName: userName });
            };
            ScorecardService.prototype.listScorecardsByCourse = function (courseId) {
                return this.courseScorecardResource.get({ courseId: courseId });
            };
            ScorecardService.prototype.saveScorecard = function (itemToSave) {
                return this.scorecardResource.save(itemToSave).$promise;
            };
            ScorecardService.prototype.deleteScorecard = function (id) {
                return this.scorecardResource.delete({ id: id }).$promise;
            };
            return ScorecardService;
        })();
        Services.ScorecardService = ScorecardService;
        angular.module("MyApp").service('scorecardService', ScorecardService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=ScorecardService.js.map