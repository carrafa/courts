var api = angular.module('usersApiFactory', []);

api.factory('usersApi', ['$http', function($http) {

  var baseUrl = 'http://localhost:8080/api/users';

  var usersInterface = {};

  usersInterface.getAll = function() {
    return $http.get(baseUrl);
  }

  usersInterface.loadUser = function() {
    return $http.get(baseUrl);
  }

  usersInterface.createUser = function(newUser) {
    var payload = {
      user: newUser
    };
    return $http.post(baseUrl, payload);
  }

  usersInterface.logIn = function(credentials) {
    return $http.post(baseUrl + "/authenticate", credentials)
  }
  usersInterface.delete = function(id) {
    return $http.delete(baseUrl + "/" + id)
  }

  return usersInterface

}]);
