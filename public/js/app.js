var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/admin/oWall.html',
            controller: 'oWallController'
        })
        .when('/offers', {
            templateUrl: 'pages/admin/offers.html',
            controller: 'offersController'
        })
        .when('/createOffer', {
            templateUrl: 'pages/admin/createOffer.html',
            controller: 'createOfferController'
        })
        .when('/createOffer/:offerId', {
            templateUrl: 'pages/admin/createOffer.html',
            controller: 'createOfferController'
        })
        .when('/paths', {
            templateUrl: 'pages/admin/paths.html',
            controller: 'pathsController'
        })
        .when('/createPath', {
            templateUrl: 'pages/admin/createPath.html',
            controller: 'createPathController'
        })
        .when('/createPath/:pathId', {
            templateUrl: 'pages/admin/createPath.html',
            controller: 'createPathController'
        })
        .when('/oWall', {
            templateUrl: 'pages/admin/oWall.html',
            controller: 'oWallController'
        })
        .when('/oWallCreate', {
            templateUrl: 'pages/admin/oWallCreate.html',
            controller: 'oWallCreateController'
        })
        .when('/oWallCreate/:wallId', {
            templateUrl: 'pages/admin/oWallCreate.html',
            controller: 'oWallCreateController'
        })
});