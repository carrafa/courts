var api = angular.module('messagesApiFactory', []);

api.factory('messagesApi', ['$http', function($http) {

  var baseUrl = 'http://localhost:8080/api/messages';

  var messagesInterface = {};

  messagesInterface.getMessages = function() {
    return $http.get(baseUrl);
  }

  messagesInterface.newMessage = function(message) {
    var payload = {
      message: message
    };
    return $http.post(baseUrl, payload);
  }

  return messagesInterface

}]);
