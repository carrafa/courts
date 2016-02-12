var api = angular.module('messagesApiFactory', []);

api.factory('messagesApi', ['$http', function($http) {

  var baseUrl = 'http://tenniscourts.herokuapp.com/api/messages' ||
    'http://localhost:8080/api/messages';

  var messagesInterface = {};

  messagesInterface.getMessages = function() {
    return $http.get(baseUrl);
  }

  messagesInterface.newConversation = function(message) {
    var conversation_id = [message.from, message.to].sort().join("");
    message.conversation_id = conversation_id;
    var payload = {
      message: message
    };
    return $http.post(baseUrl, payload);
  };

  messagesInterface.newMessage = function(message) {
    var payload = {
      message: message
    };
    return $http.post(baseUrl, payload);
  };

  return messagesInterface

}]);
