var sidebarMenu = angular.module('sidebarMenu', ['ngRoute'])
    .config(function ($locationProvider, $routeProvider) {
        // browser reload doesn't work when html5 mode is turned on..
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/partials/hello.html'})
            .when('/courses', {templateUrl: '/partials/courses.html'})
            .when('/pretty', {templateUrl: '/partials/pretty.html'})
            .otherwise({redirectTo: '/'})
    });

sidebarMenu.controller("MenuCtrl", function ($scope, $location, Menu) {
    $scope.menu = Menu;

    /*
     See: http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
     */
    $scope.getClass = function (item) {
        //console.log("location.path=" + $location.path())
        //console.log("item.href=" + item.href)
        //if ($location.path() == item.href) {
        if ($location.path() == item.href.substr(2)) {
            return "active"
        } else {
            return ""
        }
    }
});

sidebarMenu.directive("menu", function () {
    return {
        restrict: "A",
        template: '<ul class="nav nav-list">' +
            '<li class="nav-header">Examples</li>' +
            '<li ng-repeat="item in menu.items" ng-class="getClass(item)"><a href="{{item.href}}">{{item.name}}</a></li>' +
            '</ul>'
    }
});

sidebarMenu.factory('Menu', function () {
    var Menu = {};
    Menu.items = [
        {
            class: "",
            href: "/#!/index.html",
            //href: "/index.html",
            name: "Hello world"
        },
        {
            class: "",
            href: "/#/courses",
            //href: "/courses",
            name: "Coursera"
        } ,
        {
            class: "",
            href: "/#/pretty",
            //href: "/pretty",
            name: "Pretty"
         }
    ];
    return Menu;
});

