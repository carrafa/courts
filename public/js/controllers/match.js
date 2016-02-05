var ctrl = angular.module('matchController', []);

ctrl.controller('match', ['$scope', 'usersApi', 'messagesApi', function($scope,
  usersApi, messagesApi) {

  $scope.currentUser = {};

  $scope.allUsers = {};

  $scope.loadUser = function() {
    usersApi.loadUser($scope.cookie).then(function(response) {
      $scope.currentUser = response.data.user[0]
    });
  };

  $scope.getAllUsers = function() {
    usersApi.getAll().then(function(response) {
      $scope.allUsers = response.data.users
    });
  };

  $scope.newMessage = function(from, to, message) {
    var message = {
      from: from,
      to: to,
      message: message
    }
    console.log("HERE'S THE MESSAGE: ", message)
    messagesApi.newMessage(message).then(function(response) {
      console.log("hi, i'm done");
    });
  }

  $scope.getAllUsers();
  $scope.loadUser();


}]);
