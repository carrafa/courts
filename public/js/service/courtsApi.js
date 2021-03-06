var api = angular.module('courtsApiFactory', []);

api.factory('courtsApi', ['$http', function($http) {

  var baseUrl = window.location.origin + '/api/courts';

  var courtsInterface = {};

  courtsInterface.getAll = function() {
    return $http.get(baseUrl);
  }

  courtsInterface.getCourt = function(id) {
    return $http.get(baseUrl + "/" + id);
  }

  courtsInterface.createCourt = function(newUser) {
    var payload = {
      user: newUser
    };
    return $http.post(baseUrl, payload);
  }

  return courtsInterface

}]);
