app.controller('oWallCreateController', ['$rootScope', '$scope', '$routeParams', '$http', '$log', 'locationService',
    function ($rootScope, $scope, $routeParams, $http, $log, locationService) {

        $scope.init = function(){

            $scope.wall = $scope.wall || {};
            $scope.wall.wall = $scope.wall.wall || {};
            $scope.wall.wall.offers = $scope.wall.wall.offers || [];
            $scope.wall.wall.offerIds = $scope.wall.wall.offerIds || [];

            // Find path id from a parameter
            $scope.wallId = $routeParams.wallId;

            // Get all offers from db
            $http.get('/api/offers')
                .success(function(data) {
                    // Update scope
                    $scope.offers = data;

                    // If this is not an edit do nothing
                    if (!$scope.wallId) { // Create a new wall
                    }
                    else { // Edit existing offer

                        // Get offer from db
                        $scope.findWallById($scope.wallId);
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.saveOrUpdateWall = function(wall){
            if (!wall || !wall.wall) return;

            // Save a new wall
            if(!wall._id){
                // Save api call
                $http.post('/api/walls', wall)
                    .success(function(data) {
                        $scope.walls = data;
                        locationService.redirect('/oWall');
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
            else {
                // Update an existing wall
                $http.post('/api/walls/update', wall)
                    .success(function(data) {
                        $scope.walls = data;
                        locationService.redirect('/oWall');
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
        };

        $scope.cancel = function() {
            // Redirect to offer page
            locationService.redirect('/oWall');
        };

        $scope.findWallById = function(wallId){
            $http.get('/api/findWall', { params: {'wall_id' : wallId}})
                .success(function(data) {
                    $scope.wall.wall.name = data.wall.name;
                    $scope.wall.wall.status = data.wall.status;
                    $scope.wall.wall.offers = data.wall.offers;
                    $scope.wall.wall.offerIds = data.wall.offerIds;
                    $scope.wall._id = data._id;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.saveOffer = function(selectedOffer){
            $scope.wall.wall.offers.push({
                'index' : selectedOffer.index,
                '_id' : selectedOffer.offer._id,
                'offer' : {
                    'name': selectedOffer.offer.offer.name
                }
            });

            $scope.wall.wall.offerIds.push(selectedOffer.offer._id);

            $('#saveOfferInput').val("");
            $scope.currentOffer = null;
        };

        $scope.removeOffer = function(selectedOffer){
            var filteredOffers = $scope.wall.wall.offers.filter(function(offer){
                return offer._id != selectedOffer._id;
            });

            $scope.wall.wall.offers = filteredOffers;
            $scope.currentOffer = null;
        };

        $scope.addOffer = function(){
            $scope.currentOffer = {
                '_id' : null,
                'index' : $scope.wall.wall.offers.length + 1,
                'offer' : null
            };
        };

        $scope.init();

    }]);