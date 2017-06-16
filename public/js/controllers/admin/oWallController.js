app.controller('oWallController', ['$rootScope', '$scope', '$http', '$log', '$window', 'locationService', 'dataTableService',
    function ($rootScope, $scope, $http, $log, $window, locationService, dataTableService) {

        $scope.go = function(path){
            locationService.redirect(path);
        };

        $scope.preview = function(displayStyle, wallId){
            var domain = "http://localhost:9090";
            var url = domain + "/wall#/" + displayStyle + "/" + wallId;
            $window.open(url, "_blank");
        };

        // Get paths from db
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
                $scope.hasError = true;
                console.log('Error: ' + data);
            });

        $scope.view = function(offer){
          $scope.currentOffer = offer;
        };
    }]);