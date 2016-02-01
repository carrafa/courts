var api = angular.module('courtsApiFactory', []);

api.factory('courtsApi', ['$http', function($http) {

  var baseUrl = 'http://localhost:8080/api/courts';

  var courtsInterface = {};

  courtsInterface.getAll = function() {
    return $http.get(baseUrl);
  }

  courtsInterface.createCourt = function(newUser) {
    var payload = {
      user: newUser
    };
    return $http.post(baseUrl, payload);
  }

  return courtsInterface

}]);
