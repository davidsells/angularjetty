var helloApp = angular.module('helloApp', ['sidebarMenu', 'courses', 'pretty']);

function HelloCtrl($scope) {
    $scope.data = {message: "World"}
}

function FirstCtrl($scope) {
}

function SecondCtrl($scope) {
}

function ButtonsCtrl ($scope) {

    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
};
