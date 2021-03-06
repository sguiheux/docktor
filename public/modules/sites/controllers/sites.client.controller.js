'use strict';

angular.module('sites').controller('SitesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sites',
    function ($scope, $stateParams, $location, Authentication, Sites) {
        $scope.authentication = Authentication;

        $scope.submitForm = function () {
            if ($scope.site._id) {
                $scope.update();
            } else {
                $scope.create();
            }
        };

        $scope.create = function () {
            $scope.site.$save(function (response) {
                $location.path('admin/sites/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.update = function () {
            var site = $scope.site;
            site.$update(function () {
                $location.path('admin/sites/' + site._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (site) {
            if (site) {
                $scope.site.$remove(function () {
                    $location.path('admin/sites');
                });
            }
        };

        $scope.find = function () {
            $scope.sites = Sites.query();
        };

        $scope.findOne = function () {
            if ($stateParams.siteId) {
                $scope.site = Sites.get({
                    siteId: $stateParams.siteId
                });
            } else {
                $scope.site = new Sites();
            }
        };
    }
]);
