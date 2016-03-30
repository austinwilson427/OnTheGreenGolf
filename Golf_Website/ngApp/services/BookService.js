var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var BookService = (function () {
            function BookService($resource) {
                this.$resource = $resource;
                this.bookResource = $resource('/api/booking/:courseId/:id');
            }
            // Return all tee times
            BookService.prototype.listAllTeeTimes = function () {
                return this.bookResource.query();
            };
            // Return all tee times from course. Must run query.
            BookService.prototype.listAllTeeTimesByCourse = function (courseId) {
                return this.bookResource.query({ courseId: courseId });
            };
            BookService.prototype.saveTeeTime = function (teeTime) {
                return this.bookResource.save(teeTime).$promise;
            };
            return BookService;
        })();
        Services.BookService = BookService;
        angular.module("MyApp").service('bookService', BookService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=BookService.js.map