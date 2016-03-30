namespace MyApp.Services {

    export class CourseService {

        private courseResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.courseResource = $resource('/api/courses/:id');
        }

        // Return all tee times
        public listAllCourses() {
            return this.courseResource.query();
        }

        public GetCourse(id) {
            return this.courseResource.get({ id: id });
        }
    }

    angular.module("MyApp").service('courseService', CourseService);
}