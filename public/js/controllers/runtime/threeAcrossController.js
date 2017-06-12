appRuntime.controller('threeAcrossController', ['$rootScope', '$scope', '$routeParams', '$http', '$log',
    function ($rootScope, $scope, $routeParams, $http, $log) {

        $scope.findWallById = function(wallId){
            $http.get('/api/findWall', { params: {'wall_id' : wallId}})
                .success(function(data) {
                    $scope.wall = $scope.wall || {};

                    $scope.wall.name = data.wall.name;
                    $scope.wall.status = data.wall.status;
                    $scope.wall.offers = data.wall.offers;
                    $scope.wall._id = data._id;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.activeOfferFilter = function(offer){
            return offer.offer.status === 'Active';
        };

        $scope.wallId = $routeParams.wallId;

        $scope.findWallById($scope.wallId);

    }]);