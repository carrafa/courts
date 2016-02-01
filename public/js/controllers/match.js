var ctrl = angular.module('matchController', []);

ctrl.controller('match', ['$scope', 'usersApi', function($scope, usersApi) {

  $scope.allUsers = {}

  $scope.getAllUsers = function() {
    usersApi.getAll().then(function(response) {
      $scope.allUsers = response.data.users
    });
  };

  $scope.getAllUsers();

}]);
