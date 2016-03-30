var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var CourseService = (function () {
            function CourseService($resource) {
                this.$resource = $resource;
                this.courseResource = $resource('/api/courses/:id');
            }
            // Return all tee times
            CourseService.prototype.listAllCourses = function () {
                return this.courseResource.query();
            };
            CourseService.prototype.GetCourse = function (id) {
                return this.courseResource.get({ id: id });
            };
            return CourseService;
        })();
        Services.CourseService = CourseService;
        angular.module("MyApp").service('courseService', CourseService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=CourseService.js.map