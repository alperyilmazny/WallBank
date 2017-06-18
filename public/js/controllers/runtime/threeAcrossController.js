appRuntime.controller('threeAcrossController', ['$rootScope', '$scope', '$routeParams', '$http',
    function ($rootScope, $scope, $routeParams, $http) {

        this.init = function(){
            $scope.activeOfferFilter = function(offer){
                return offer.offer.status === 'Active';
            };

            const wallId = $routeParams.wallId;

            this.findWallById(wallId);
        };

        this.findWallById = function(wallId){
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

        this.init();

    }]);