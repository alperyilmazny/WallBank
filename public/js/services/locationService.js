app.service('locationService', ['$location', function($location){
    this.redirect = function(path) {
        $location.path(path);
    };
}]);