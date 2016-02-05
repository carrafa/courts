var api = angular.module('messagesApiFactory', []);

api.factory('messagesApi', ['$http', function($http) {

  var baseUrl = 'http://localhost:8080/api/messages';

  var messagesInterface = {};

  messagesInterface.getAll = function() {
    return $http.get(baseUrl);
  }

  messagesInterface.getMessages = function(user) {
    return $http.get(baseUrl + "/" + id);
  }

  messagesInterface.newMessage = function(message) {
    var payload = {
      message: message
    };
    return $http.post(baseUrl, payload);
  }

  return messagesInterface

}]);
