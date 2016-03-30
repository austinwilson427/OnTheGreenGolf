namespace MyApp.Controllers {

    export class ScorecardController {

        public myScorecards;
        public userName;
        public woodforestScorecard;
        public scoreDateSelected;
        public items;
        public courseSelected;
        public selectedScorecard;
        public saveDisplay;
        public courseDetailsSelected;
        public showScore;
        public viewUser;
        public showAddScorecard;

        constructor(private scorecardService: MyApp.Services.ScorecardService, private accountService: MyApp.Services.AccountService, private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private $uibModal: ng.ui.bootstrap.IModalService, private $filter: ng.IFilterDate, private courseService: MyApp.Services.CourseService) {
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
            } else {
                this.showAddScorecard = false;
            }
            this.myScorecards = this.scorecardService.listScorecardsByUserName(this.viewUser);

        }


        public showScores() {
            for (var i = 0; i < this.myScorecards.length; i++) {
                let id: number = (this.myScorecards[i].courseId);
                this.myScorecards[i].courseInfo = this.courseService.GetCourse(id);
            }
            

            this.showScore = true;
        }

        public selectScorecard(scorecard) {
            //Woodforest 4, Windrose 5, Carltonwoods 6
            return this.scorecardService.listScorecardsByCourse(scorecard);
        }

        public getCourseInfoById() {
            
            this.courseSelected.details = this.courseService.GetCourse(this.courseDetailsSelected.courseId);
        }

        public showSaveFeatures() {
            this.saveDisplay = true;
        }

        public updateScorecard(scorecardToSave) {
            scorecardToSave.myTotal = scorecardToSave.myScore1 + scorecardToSave.myScore2 + scorecardToSave.myScore3 + scorecardToSave.myScore4 + scorecardToSave.myScore5 + scorecardToSave.myScore6 + scorecardToSave.myScore7 + scorecardToSave.myScore8 + scorecardToSave.myScore9 + scorecardToSave.myScore10 + scorecardToSave.myScore11 + scorecardToSave.myScore12 + scorecardToSave.myScore13 + scorecardToSave.myScore14 + scorecardToSave.myScore15 + scorecardToSave.myScore16 + scorecardToSave.myScore17 + scorecardToSave.myScore18;
            if (scorecardToSave.myDifficulty == "Championship") {
                scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.champRating) * 113 / scorecardToSave.courseInfo.champSlope;
            } else if (scorecardToSave.myDifficulty == "Tournament") {
                scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.tournRating) * 113 / scorecardToSave.courseInfo.tournSlope;
            } else if (scorecardToSave.myDifficulty == "Members") {
                scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.membRating) * 113 / scorecardToSave.courseInfo.membSlope;
            } else if (scorecardToSave.myDifficulty == "Ladies") {
                scorecardToSave.handicapAdj = (scorecardToSave.myTotal - scorecardToSave.courseInfo.ladyRating) * 113 / scorecardToSave.courseInfo.ladySlope;
            }
            console.log(scorecardToSave);
            this.scorecardService.saveScorecard(scorecardToSave).then(() => {
                this.saveDisplay = false;
            });

        }

        public courseDetails() {
            //Not Working
            //console.log(this.scoreDateSelected.courseId);
            //this.courseDetailsSelected.$promise.then((result) => {
            //    console.log(result);
            //});

            //console.log(this.courseDetailsSelected);
            //console.log(this.courseDetailsSelected.courseId);
            //this.getCourseInfoById();
            //console.log(this.courseSelected.details);
        }

        public createScorecard() {
            
            this.selectedScorecard = this.selectScorecard(this.courseSelected.id).$promise.then((result) => {
                result.myDifficulty = this.courseSelected.difficulty;
                result.courseId = this.courseSelected.id;
                result.userName = this.userName;
                result.id = 0;
                result.myFront = 0;
                result.myBack = 0;
                result.myTotal = 0;
                this.scorecardService.saveScorecard(result).then(() => {
                    this.$route.reload();
                });

            });
            
            console.log(this.selectedScorecard);
        }

        public deleteScorecard(id) {
            this.scorecardService.deleteScorecard(id);
            this.$route.reload();
        }

        public addScoreDetailsModal(name) {
            var modalInstance = this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/add-score-details.html',
                controller: AddScoreDetailsModal,
                controllerAs: "vm",
                resolve: {
                    name: () => { return name }
                },
                size: "sm"
            });
            
            modalInstance.result.then((course) => {
                this.courseSelected.id = course.id;
                this.courseSelected.difficulty = course.difficulty;
                this.createScorecard();
            });
        }

    }

    export class AddScoreDetailsModal {

        public passingData;
        public validationErrors;
        public course;

        constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
            this.course = {
                id: null,
                difficulty: null,
                date: null
            }
            
        }

        public details() {
            if (!this.course.id || !this.course.difficulty) {
                this.validationErrors = "Please include all fields";
                return false;
            }
            this.$uibModalInstance.close(this.course);
        }

    }
}