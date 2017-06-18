app.controller('offersController', ['$scope', '$http', '$log', 'locationService', 'dataTableService',
    function ($scope, $http, $log, locationService, dataTableService) {

        $scope.go = function(path){
            locationService.redirect(path);
        };

        $scope.getOffer = function() {

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
                    if (data.length > 0){
                        $scope.errors.push(data.length);
                    }
                });

            $scope.isLoading = false;
        };


        this.init = function(){

            // Set loading image state
            $scope.isLoading = true;

            // Errors
            $scope.errors = [];

            // Get all offers
            $scope.getOffer();
        };

        this.init();

    }]);
