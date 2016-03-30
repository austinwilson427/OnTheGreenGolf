var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ScorecardController = (function () {
            function ScorecardController(scorecardService, accountService, $routeParams, $location, $route, $uibModal, $filter, courseService) {
                this.scorecardService = scorecardService;
                this.accountService = accountService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.$route = $route;
                this.$uibModal = $uibModal;
                this.$filter = $filter;
                this.courseService = courseService;
                this.saveDisplay = false;
                this.showScore = false;
                this.courseSelected = {
                    id: null,
                    difficulty: null,
                    courseId: null
                };
                this.viewUser = $routeParams["userName"];
                this.scoreDateSelected = {
                    courseId: 0
                };
                this.userName = accountService.getUserName();
                if (this.viewUser == this.userName) {
                    this.showAddScorecard = true;
                }
                else {
                    this.showAddScorecard = false;
                }
                this.myScorecards = this.scorecardService.listScorecardsByUserName(this.viewUser);
            }
            ScorecardController.prototype.showScores = function () {
                for (var i = 0; i < this.myScorecards.length; i++) {
                    var id = (this.myScorecards[i].courseId);
                    this.myScorecards[i].courseInfo = this.courseService.GetCourse(id);
                }
                this.showScore = true;
            };
            ScorecardController.prototype.selectScorecard = function (scorecard) {
                //Woodforest 4, Windrose 5, Carltonwoods 6
                return this.scorecardService.listScorecardsByCourse(scorecard);
            };
            ScorecardController.prototype.getCourseInfoById = function () {
                this.courseSelected.details = this.courseService.GetCourse(this.courseDetailsSelected.courseId);
            };
            ScorecardController.prototype.showSaveFeatures = function () {
                this.saveDisplay = true;
            };
            ScorecardController.prototype.updateScorecard = function (scorecardToSave) {
                var _this = this;
                scorecardToSave.myTotal = scorecardToSave.myScore1 + scorecardToSave.myScore2 + scorecardToSave.myScore3 + scorecardToSave.myScore4 + scorecardToSave.myScore5 + scorecardToSave.myScore6 + scorecardToSave.myScore7 + scorecardToSave.myScore8 + scorecardToSave.myScore9 + scorecardToSave.myScore10 + scorecardToSave.myScore11 + scorecardToSave.myScore12 + scorecardToSave.myScore13 + scorecardToSave.myScore14 + scorecardToSave.myScore15 + scorecardToSave.myScore16 + scorecardToSave.myScore17 + scorecardToSave.myScore18;
                if (scorecardToSave.myDifficulty == "Championship") {
                    scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.champRating) * 113 / scorecardToSave.courseInfo.champSlope;
                }
                else if (scorecardToSave.myDifficulty == "Tournament") {
                    scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.tournRating) * 113 / scorecardToSave.courseInfo.tournSlope;
                }
                else if (scorecardToSave.myDifficulty == "Members") {
                    scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.membRating) * 113 / scorecardToSave.courseInfo.membSlope;
                }
                else if (scorecardToSave.myDifficulty == "Ladies") {
                    scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.ladyRating) * 113 / scorecardToSave.courseInfo.ladySlope;
                }
                console.log(scorecardToSave);
                this.scorecardService.saveScorecard(scorecardToSave).then(function () {
                    _this.saveDisplay = false;
                });
            };
            ScorecardController.prototype.courseDetails = function () {
                //Not Working
                //console.log(this.scoreDateSelected.courseId);
                //this.courseDetailsSelected.$promise.then((result) => {
                //    console.log(result);
                //});
                //console.log(this.courseDetailsSelected);
                //console.log(this.courseDetailsSelected.courseId);
                //this.getCourseInfoById();
                //console.log(this.courseSelected.details);
            };
            ScorecardController.prototype.createScorecard = function () {
                var _this = this;
                this.selectedScorecard = this.selectScorecard(this.courseSelected.id).$promise.then(function (result) {
                    result.myDifficulty = _this.courseSelected.difficulty;
                    result.courseId = _this.courseSelected.id;
                    result.userName = _this.userName;
                    result.id = 0;
                    result.myFront = 0;
                    result.myBack = 0;
                    result.myTotal = 0;
                    _this.scorecardService.saveScorecard(result).then(function () {
                        _this.$route.reload();
                    });
                });
                console.log(this.selectedScorecard);
            };
            ScorecardController.prototype.deleteScorecard = function (id) {
                this.scorecardService.deleteScorecard(id);
                this.$route.reload();
            };
            ScorecardController.prototype.addScoreDetailsModal = function (name) {
                var _this = this;
                var modalInstance = this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/add-score-details.html',
                    controller: AddScoreDetailsModal,
                    controllerAs: "vm",
                    resolve: {
                        name: function () { return name; }
                    },
                    size: "sm"
                });
                modalInstance.result.then(function (course) {
                    _this.courseSelected.id = course.id;
                    _this.courseSelected.difficulty = course.difficulty;
                    _this.createScorecard();
                });
            };
            return ScorecardController;
        })();
        Controllers.ScorecardController = ScorecardController;
        var AddScoreDetailsModal = (function () {
            function AddScoreDetailsModal($uibModalInstance) {
                this.$uibModalInstance = $uibModalInstance;
                this.course = {
                    id: null,
                    difficulty: null,
                    date: null
                };
            }
            AddScoreDetailsModal.prototype.details = function () {
                if (!this.course.id || !this.course.difficulty) {
                    this.validationErrors = "Please include all fields";
                    return false;
                }
                this.$uibModalInstance.close(this.course);
            };
            return AddScoreDetailsModal;
        })();
        Controllers.AddScoreDetailsModal = AddScoreDetailsModal;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=scorecardController.js.map