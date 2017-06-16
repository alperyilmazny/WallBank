app.controller('offersController', ['$rootScope', '$scope', '$http', '$log', 'locationService', 'dataTableService',
    function ($rootScope, $scope, $http, $log, locationService, dataTableService) {


        $scope.go = function(path){
            locationService.redirect(path);
        };

        // Get offers from db
        $http.get('/api/offers')
            .success(function(data) {
                // Remove existing data table
                dataTableService.destroyDataTable('#offerTable');
                // Update scope offers
                $scope.offers = data;
                // Create a new data table
                dataTableService.setDataTable('#offerTable');
            })
            .error(function(data) {
                $scope.hasError = true;
                console.log('Error: ' + data);
            });

    }]);