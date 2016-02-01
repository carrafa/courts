var ctrl = angular.module('mainController', []);

ctrl.controller('main', ['$scope', 'usersApi', '$cookies',
  function(
    $scope,
    usersApi,
    $cookies) {

    $scope.currentUser = {}

    $scope.cookie = $cookies.get('token');


    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        $scope.currentUser = response.data.user[0]
      });
    };

    $scope.logout = function() {
      $cookies.remove('token');
      location.reload();
    };

    $scope.loadUser();

  }
]);
