app.controller('oWallController', ['$rootScope', '$scope', '$http', '$log', '$window', 'locationService',
    function ($rootScope, $scope, $http, $log, $window, locationService) {

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
                // Update scope
                $scope.walls = data;
            })
            .error(function(data) {
                $scope.hasError = true;
                console.log('Error: ' + data);
            });

        $scope.view = function(offer){
          $scope.currentOffer = offer;
        };
    }]);