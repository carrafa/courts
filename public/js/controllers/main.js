var ctrl = angular.module('mainController', []);

ctrl.controller('main', ['$scope', 'usersApi', '$cookies',
  function(
    $scope,
    usersApi,
    $cookies) {

    $scope.currentUser = {}

    $scope.edit = {
      name: false,
      avatar: false,
      bio: false,
      skill: false,
      zipcode: false,
    };

    $scope.editOff = function() {
      angular.forEach($scope.edit,
        function(value, key) {
          console.log(this);
          if (this[key] === true) {
            this[key] = false;
          }
        }, $scope.edit);
    };

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

    $scope.updateUser = function() {
      usersApi.updateUser($scope.currentUser).then(function() {
        $scope.editOff();
      });
    };

  }
]);
