var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var MovieService = (function () {
            function MovieService($resource) {
                this.MovieResource = $resource('/api/movies/:id');
            }
            MovieService.prototype.listMovies = function () {
                return this.MovieResource.query();
            };
            return MovieService;
        })();
        Services.MovieService = MovieService;
        angular.module('MyApp').service('movieService', MovieService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
