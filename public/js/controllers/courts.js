var ctrl = angular.module('courtsController', []);

ctrl.controller('courts', ['$scope', 'courtsApi', 'NgMap', '$rootScope',
  function($scope, courtsApi, NgMap, $rootScope) {

    $scope.allCourts = {};

    $scope.getCourts = function() {
      courtsApi.getAll().then(function(response) {
        $scope.allCourts = response.data.courts
      });
    };


    var vm = this;

    NgMap.getMap().then(function(map) {
      console.log('map', map)
      vm.map = map;
    });

    courtsApi.getAll().then(function(response) {
      vm.courts = response.data.courts
    })


    // $scope.getCourts();

  }
])
