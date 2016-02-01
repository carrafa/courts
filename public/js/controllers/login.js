var ctrl = angular.module('loginController', []);

ctrl.controller('login', ['$scope', 'usersApi', '$cookies',
  function($scope, usersApi, $cookies) {

    $scope.credentials = {}

    $scope.newUser = {}

    $scope.createUser = function() {
      usersApi.createUser($scope.newUser).then(function() {})
      $scope.newUser = {};
    }

    $scope.logIn = function() {
      usersApi.logIn($scope.credentials).then(function(response) {
        var token = response.data.token
        $cookies.put('token', token);
        $scope.credentials = {}
        location.reload();
      });
    };
  }
]);
