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

    $scope.conversation = [];

    $scope.conversations = {};

    $scope.conversationUsers = [];

    $scope.messages = {};

    $scope.newMessage = {};

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
        $scope.newMessage.fromUsername = $scope.currentUser.username;
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
        angular.forEach($scope.messages, function(message,
          key) {
          $scope.conversations[message.conversation_id] =
            $scope.conversations[
              message.conversation_id] || [];
          $scope.conversations[message.conversation_id].push(
            message);
          newConversation = {
            name: message.fromUsername,
            conversation_id: message.conversation_id
          };
          $scope.conversationUsers.push(newConversation);
          filterConversationUsers();
        });
      });
    };

    function filterConversationUsers() {
      angular.forEach($scope.conversationUsers, function(conversation, key) {
        $scope.conversationUsers = $scope.conversationUsers.filter(
          function(conversation) {
            return conversation.name !== $scope.currentUser.name;
          });
        console.log("INDEX OF???", $scope.conversationUsers.indexOf(
          conversation));
      });
      console.log($scope.conversationUsers);
    };

    $scope.sendMessage = function(newMessage) {
      $scope.newMessage.conversation_id = newMessage.conversation_id;
      messagesApi.newMessage($scope.newMessage);
    };

    $scope.loadConversation = function(conversation_id) {
      $scope.conversation = [];
      angular.forEach($scope.messages, function(message, key) {
        $scope.conversation = $scope.conversation || [];
        if (message.conversation_id === conversation_id) {
          $scope.conversation.push(message);
        }
      });
    };

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
