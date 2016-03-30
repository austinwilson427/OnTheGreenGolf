namespace MyApp.Services {

    export class BookService {

        private bookResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.bookResource = $resource('/api/booking/:courseId/:id');
        }

        // Return all tee times
        public listAllTeeTimes() {
            return this.bookResource.query();
        }

        // Return all tee times from course. Must run query.
        public listAllTeeTimesByCourse(courseId) {
            return this.bookResource.query({ courseId: courseId });
        }

        public saveTeeTime(teeTime) {
            return this.bookResource.save(teeTime).$promise;
        }

    }

    angular.module("MyApp").service('bookService', BookService);
}