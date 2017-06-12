'use strict';

/**
 * @ngdoc overview
 * @name ssmReportDataClientApp
 * @description
 * # ssmReportDataClientApp
 *
 * Main module of the application.
 */
angular.module('ssmVerificationServiceClientApp', []).config(function () { });



/**
 * @ngdoc function
 * @name ssmVerificationServiceClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ssmVerificationServiceClientApp
 */
angular.module('ssmVerificationServiceClientApp')
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.confirmationNumber = '4567';
        $scope.result = null;

        //Form submit function
        $scope.search = function () {
            console.log($scope.confirmationNumber);
            $scope.isLoading = true;

            $scope.data = {
                confirmationNumber: $scope.confirmationNumber
            };
            console.log($scope.data);
            $http.post('/api/verify/', $scope.data).then(
                function (success) {
                    console.log(success);
                    $scope.result = success.data;
                    $scope.isLoading = false;
                },
                function (error) {
                    $scope.isLoading = false;
                    console.log(error);
                    $scope.result = null;
                    $scope.error = error.data;
                }
            );

        };

    }]);
