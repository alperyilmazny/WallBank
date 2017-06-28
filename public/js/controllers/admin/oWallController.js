app.controller('oWallController', ['$scope', '$http', '$log', '$window', 'locationService', 'dataTableService',
    function ($scope, $http, $log, $window, locationService, dataTableService) {

        $scope.go = function(path){
            locationService.redirect(path);
        };

        $scope.preview = function(displayStyle, wallId) {
            // Local
            var domain = "http://localhost:9090";

            // Stating
            /*var domain = "http://amazing-options.com";*/

            // Production
            /*var domain = "http://stage.ipernix.com:9090";*/

            // Calculate preview url and open it in the new window
            var url = domain + "/wall#/" + displayStyle + "/" + wallId;

            $window.open(url, "_blank");
        };

        $scope.getWalls = function() {

            // Get walls from db
            $http.get('/api/walls')
                .success(function(data) {
                    // Removing existing data layer to refresh new wall items
                    dataTableService.destroyDataTable('#offerWallTable');

                    // Updating scope for wall items
                    $scope.walls = data;

                    // Creating data layer for wall items
                    dataTableService.setDataTable('#offerWallTable');
                })
                .error(function(data) {
                    if (data.length > 0){
                        $scope.errors.push(data.length);
                    }
                    $log.log('Error: ' + data);
                });

            $scope.isLoading = false;
        };

        this.init = function(){

            // Set loading image state
            $scope.isLoading = true;

            // Errors
            $scope.errors = [];

            $scope.getWalls();
        };

        this.init();
    }]);