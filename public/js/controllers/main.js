var ctrl = angular.module('mainController', []);

ctrl.controller('main', ['$scope', 'usersApi', 'courtsApi', 'messagesApi',
  '$cookies',
  function(
    $scope,
    usersApi,
    courtsApi,
    messagesApi,
    $cookies) {

    $scope.currentUser = {};

    $scope.fav_courts = {};

    $scope.messages = {};

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
        $scope.loadMessages($scope.currentUser._id);
      });
    };

    $scope.getFavCourts = function() {
      var courts = $scope.currentUser.fav_courts
      courtsApi.getAll().then(
        function(response) {
          var all_courts = response.data.courts
          fav_courts_in_db = {}
          angular.forEach(all_courts, function(value, key) {
            if ($scope.currentUser.fav_courts.indexOf(value._id) >
              -1) {
              this[value._id] = value;
            }
          }, fav_courts_in_db);
          $scope.fav_courts = fav_courts_in_db;
        });
    };

    $scope.loadMessages = function() {
      messagesApi.getMessages().then(function(response) {
        $scope.messages = response.data.messages;
      });
    }

    $scope.removeFromFavs = function(id) {
      delete $scope.fav_courts[id];
      index = $scope.currentUser.fav_courts.indexOf(id);
      if (index >= 0) {
        $scope.currentUser.fav_courts.splice(index, 1);
      }
      usersApi.updateUser($scope.currentUser);
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
