var appRuntime = angular.module('appRuntime', ['ngRoute', 'ui.bootstrap']);

appRuntime.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/runtime/default.html',
            controller: 'defaultController',
            css: 'css/runtime/runtime.css'
        })
        .when('/single', {
            templateUrl: 'pages/runtime/single.html',
            controller: 'singleController',
            css: 'css/runtime/runtime.css'
        })
        .when('/single/:wallId', {
            templateUrl: 'pages/runtime/single.html',
            controller: 'singleController',
            css: 'css/runtime/runtime.css'
        })
        .when('/single1', {
            templateUrl: 'pages/runtime/single1.html',
            controller: 'single1Controller',
            css: 'css/runtime/runtime.css'
        })
        .when('/single1/:wallId', {
            templateUrl: 'pages/runtime/single1.html',
            controller: 'single1Controller',
            css: 'css/runtime/runtime.css'
        })
        .when('/twoAcross', {
            templateUrl: 'pages/runtime/twoAcross.html',
            controller: 'twoAcrossController',
            css: 'css/runtime/runtime.css'
        })
        .when('/twoAcross/:wallId', {
            templateUrl: 'pages/runtime/twoAcross.html',
            controller: 'twoAcrossController',
            css: 'css/runtime/runtime.css'
        })
        .when('/threeAcross', {
            templateUrl: 'pages/runtime/threeAcross.html',
            controller: 'threeAcrossController',
            css: 'css/runtime/runtime.css'
        })
        .when('/threeAcross/:wallId', {
            templateUrl: 'pages/runtime/threeAcross.html',
            controller: 'threeAcrossController',
            css: 'css/runtime/runtime.css'
        })
        .when('/blog', {
            templateUrl: 'pages/runtime/blog.html',
            controller: 'blogController',
            css: 'css/runtime/runtime.css'
        })
        .when('/blog/:wallId', {
            templateUrl: 'pages/runtime/blog.html',
            controller: 'blogController',
            css: 'css/runtime/runtime.css'
        })
});











