app.controller('offersController', ['$rootScope', '$scope', '$http', '$log', 'locationService',
    function ($rootScope, $scope, $http, $log, locationService) {


        $scope.go = function(path){
            locationService.redirect(path);
        };

        // Get offers from db
        $http.get('/api/offers')
            .success(function(data) {
                // Update scope
                $scope.offers = data;
            })
            .error(function(data) {
                $scope.hasError = true;
                console.log('Error: ' + data);
            });

    }]);