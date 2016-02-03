var ctrl = angular.module('mainController', []);

ctrl.controller('main', ['$scope', 'usersApi', 'courtsApi', '$cookies',
  function(
    $scope,
    usersApi,
    courtsApi,
    $cookies) {

    $scope.currentUser = {}

    $scope.fav_courts = {}

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
        $scope.getFavCourts();
      });
    };

    $scope.getFavCourts = function() {
      var courts = $scope.currentUser.fav_courts
      courtsApi.getAll().then(
        function(response) {
          var courtsArray = response.data.courts
          new_courts = {}
          angular.forEach(courtsArray, function(value, key) {
            if ($scope.currentUser.fav_courts.indexOf(value._id) >
              -1) {
              this[value._id] = value;
            }
          }, new_courts);
          $scope.fav_courts = new_courts;
        });
    }


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
