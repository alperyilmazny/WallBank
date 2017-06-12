app.controller('pathsController', ['$rootScope', '$scope', '$http', '$log', 'locationService',
    function ($rootScope, $scope, $http, $log, locationService) {

        $scope.go = function(path){
            locationService.redirect(path);
        };

        // Get paths from db
        $http.get('/api/paths')
            .success(function(data) {
                // Update scope
                $scope.paths = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    }]);