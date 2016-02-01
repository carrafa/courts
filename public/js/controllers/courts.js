var ctrl = angular.module('courtsController', []);

ctrl.controller('courts', ['$scope', 'courtsApi', function($scope, courtsApi) {

  $scope.allCourts = {};

  $scope.getCourts = function() {
    courtsApi.getAll().then(function(response) {
      $scope.allCourts = response.data.courts
    });
  };


  $scope.getCourts();



}]);
