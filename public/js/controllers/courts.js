var ctrl = angular.module('courtsController', []);

ctrl.controller('courts', ['$scope', 'courtsApi', 'usersApi', 'NgMap',
  '$rootScope',
  function($scope, courtsApi, usersApi, NgMap, $rootScope) {

    $scope.currentUser = {};

    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        $scope.currentUser = response.data.user[0]
      });
    };

    $scope.allCourts = {};

    $scope.getCourts = function() {
      courtsApi.getAll().then(function(response) {
        $scope.allCourts = response.data.courts
      });
    };

    var vm = this;

    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    courtsApi.getAll().then(function(response) {
      vm.courts = response.data.courts
    })

    $scope.updateFavCourts = function(id) {
      var fav_courts = $scope.currentUser.fav_courts
      if (fav_courts.indexOf(id) > -1) {
        console.log('already saved!');
        return;
      } else {
        fav_courts.push(id)
        $scope.currentUser.fav_courts = fav_courts;
        usersApi.updateUser($scope.currentUser);
      }
    }

    $scope.showCourtInfo = function(e, court) {
      // $scope.currentCourt = court
      console.log(this);
      google.maps.InfoWindow({
          title: 'banana'
        })
        // vm.map.showInfoWindow(court._id)
    }


    $scope.loadUser();
    $scope.getCourts();

    $scope.styles = [{
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [{
        "color": "#ebeae3"
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#bfd74a"
      }]
    }, {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.medical",
      "elementType": "geometry",
      "stylers": [{
        "color": "#fbd3da"
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#a3cd39"
      }]
    }, {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#fdea9b"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#ffd200"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffffff"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "black"
      }]
    }, {
      "featureType": "transit.station.airport",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#fbad17"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#68bad2"
      }]
    }]

  }
])
