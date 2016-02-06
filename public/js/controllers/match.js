var ctrl = angular.module('matchController', []);

ctrl.controller('match', ['$scope', 'usersApi', 'messagesApi', function($scope,
  usersApi, messagesApi) {

  $scope.currentUser = {};

  $scope.allUsers = {};

  $scope.messageInput = false;

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

  $scope.newConversation = function(from, to, message) {
    var message = {
      from: from._id,
      fromUsername: from.username,
      to: to._id,
      toUsername: to.username,
      message: message
    }
    messagesApi.newConversation(message).then(function(response) {});
  }

  $scope.getAllUsers();
  $scope.loadUser();


}]);
