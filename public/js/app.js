var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/oWall.html',
            controller: 'oWallController'
        })
        .when('/offers', {
            templateUrl: 'pages/offers.html',
            controller: 'offersController'
        })
        .when('/createOffer', {
            templateUrl: 'pages/createOffer.html',
            controller: 'createOfferController'
        })
        .when('/createOffer/:offerId', {
            templateUrl: 'pages/createOffer.html',
            controller: 'createOfferController'
        })
        .when('/paths', {
            templateUrl: 'pages/paths.html',
            controller: 'pathsController'
        })
        .when('/createPath', {
            templateUrl: 'pages/createPath.html',
            controller: 'createPathController'
        })
        .when('/createPath/:pathId', {
            templateUrl: 'pages/createPath.html',
            controller: 'createPathController'
        })
        .when('/oWall', {
            templateUrl: 'pages/oWall.html',
            controller: 'oWallController'
        })
        .when('/oWallCreate', {
            templateUrl: 'pages/oWallCreate.html',
            controller: 'oWallCreateController'
        })
        .when('/oWallCreate/:wallId', {
            templateUrl: 'pages/oWallCreate.html',
            controller: 'oWallCreateController'
        })
});