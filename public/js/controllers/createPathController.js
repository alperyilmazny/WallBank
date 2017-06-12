app.controller('createPathController', ['$rootScope', '$scope', '$routeParams', '$http', '$log', 'locationService',
    function ($rootScope, $scope, $routeParams, $http, $log, locationService) {

        $scope.init = function(){

            // Assign scope variables
            $scope.path = $scope.path || {};
            $scope.path.path = $scope.path.path || {};
            $scope.path.path.pages = $scope.path.path.pages || [];

            // Find path id from a parameter
            $scope.pathId = $routeParams.pathId;

            // Get all offer groups from db
            $http.get('/api/offerGroups')
                .success(function(data) {
                    // Update scope
                    $scope.offerGroups = data;

                    // If this is not an edit do nothing
                    if (!$scope.pathId) { // Create a new offer
                    }
                    else { // Edit existing offer

                        // Get offer from db
                        $scope.findPathById($scope.pathId);
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.saveOrUpdatePath = function(path){
            if (!path || !path.path) return;

            // Save a new path
            if(!path._id){
                // Save api call
                $http.post('/api/paths', path)
                    .success(function(data) {
                        $scope.paths = data;
                        locationService.redirect('/paths');
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
            else {
                // Update an existing path
                $http.post('/api/paths/update', path)
                    .success(function(data) {
                        $scope.paths = data;
                        locationService.redirect('/paths');
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
        };

        $scope.addPage = function(){
            $scope.path.path.pages.push({});
        };

        $scope.cancel = function() {
            // Redirect to offer page
            locationService.redirect('/paths');
        };

        $scope.findPathById = function(pathId){
            $http.get('/api/findPath', { params: {'path_id' : pathId}})
                .success(function(data) {
                    $scope.path.path.name = data.path.name;
                    $scope.path.path.status = data.path.status;
                    $scope.path.path.pages = data.path.pages;
                    //$scope.path.path.pages = $scope.calculateOffersByIds(data.offerGroup.offerIds);
                    $scope.path._id = data._id;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.init();

    }]);