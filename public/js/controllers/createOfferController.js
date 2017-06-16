app.controller('createOfferController', ['$rootScope', '$scope', '$routeParams', '$http', '$log', 'locationService',
    function ($rootScope, $scope, $routeParams, $http, $log, locationService) {

        const updateOffer = (data) => {
            $scope.offer.offer.name = data.offer.name;
            $scope.offer.offer.status = data.offer.status;
            $scope.offer.offer.redirectUrl = data.offer.redirectUrl;
            $scope.offer.offer.imageUrl = data.offer.imageUrl;
            $scope.offer.offer.header = data.offer.header;
            $scope.offer.offer.body = data.offer.body;
            $scope.offer._id = data._id;
        };

        $scope.init = function(){

            $scope.offer = $scope.offer || {};
            $scope.offer.offer = $scope.offer.offer || {};

            // Save or Update offer
            $scope.saveOrUpdateOffer = function(offer){

                // Save a new offer
                if(!offer._id){
                    // Save api call
                    $http.post('/api/offers', offer)
                        .success(function(data) {
                            $scope.offers = data;
                            locationService.redirect('/offers');
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                }
                else {
                    // Update an existing offer
                    $http.post('/api/offers/update', offer)
                        .success(function(data) {
                            $scope.offers = data;
                            locationService.redirect('/offers');
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                }
            };

            // Cancel adding an offer
            $scope.cancel = function() {
                // Redirect to offer page
                locationService.redirect('/offers');
            };

            // Find offer by id
            $scope.findOfferById = function(offerId){
                $http.get('/api/find', { params: {'offer_id' : offerId}})
                    .success(function(data) {
                        updateOffer(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            };
        };

        $scope.init();

        // Get offer id from query parameter
        $scope.offerId = $routeParams.offerId;

        if ($scope.offerId) $scope.findOfferById($scope.offerId);
    }]);