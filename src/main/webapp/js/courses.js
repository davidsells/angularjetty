/**
 * Author: Per Spilling, per@kodemaker.no
 */
var myApp = angular.module('courses', ['ngResource', 'ui.bootstrap'], function ($dialogProvider) {
    $dialogProvider.options({backdropClick: false, dialogFade: true});
});

/**
 * Configure the CoursesResource. In order to solve the Single Origin Policy issue in the browser
 * I have set up a Jetty proxy servlet to forward requests transparently to the API server.
 * See the web.xml file for details on that.
 */
myApp.factory('CoursesResource', function ($resource) {
    return $resource('/cor/courses', {}, {});
});

myApp.factory('CourseResource', function ($resource) {
    return $resource('/cor/courses/:id', {}, {});
});

function CoursesCtrl($scope, CoursesResource, CourseResource, $dialog, $q) {
    /**
     * Define an object that will hold data for the form. The courses list will be pre-loaded with the list of
     * courses from the server. The courseForm.course object is bound to the course form in the HTML via the
     * ng-model directive.
     */
    $scope.courseForm = {
        show: true,
        course: {}
    }
    $scope.courses = CoursesResource.query();

    /**
     * Function used to toggle the show variable between true and false, which in turn determines if the course form
     * should be displayed of not.
     */
    $scope.toggleCourseForm = function () {
        $scope.courseForm.show = !$scope.courseForm.show;
    }

    /**
     * Clear the course data from the form.
     */
    $scope.clearForm = function () {
        $scope.courseForm.course = {}
    }

    /**
     * Save a course. Make sure that a course object is present before calling the service.
     */
    $scope.saveCourse = function (course) {
        if (course != undefined) {
            /**
             * Here we need to ensure that the CoursesResource.query() is done after the CoursesResource.save. This
             * is achieved by using the $promise returned by the $resource object.
             */
            CoursesResource.save(course).$promise.then(function() {
                $scope.courses = CoursesResource.query();
                $scope.courseForm.course = {}  // clear the form
            });
        }
    }

    /**
     * Set the course to be edited in the course form.
     */
    $scope.editCourse = function (p) {
        $scope.courseForm.course = p
    }

    /**
     * Delete a course. Present a modal dialog box to the user to make the user confirm that the course item really
     * should be deleted.
     */
    $scope.deleteCourse = function (course) {
        var msgBox = $dialog.messageBox('You are about to delete a course from the database', 'This cannot be undone. Are you sure?', [
            {label: 'Yes', result: 'yes'},
            {label: 'Cancel', result: 'no'}
        ])
        msgBox.open().then(function (result) {
            if (result === 'yes') {
                // remove from the server and reload the course list from the server after the delete
                CourseResource.delete({id: course.id}).$promise.then(function() {
                    $scope.courses = CoursesResource.query();
                });
            }
        });
    }
}

/*
 $scope.kodemakerCourses = {}
 $scope.courses = CoursesResource.query(function (response) {
 angular.forEach(response, function (course) {
 console.log('course.name=' + course.name)
 });
 });
 */