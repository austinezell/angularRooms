app = angular.module('rooms', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('home');
  $stateProvider
  .state('home', {
    url: 'home',
    templateUrl : './views/home.html',
  })
  .state('room', {
    url: '/room',
    templateUrl : './views/furniture.html',
  })
})


.controller('mainCtrl', function($scope, $state){
  $scope.rooms = []
  $scope.addRoom = function(roomName){
    var obj = {name: roomName, furniture: [], totalCost: 0};
    $scope.rooms.push(obj)
  }
  $scope.addFurniture = function(type, quantity, price, roomName){
    var obj = {type: type, quantity: quantity, price: price};
    var currentRoom = $scope.findRoom(roomName);
    currentRoom.furniture.push(obj);
    currentRoom.totalCost += quantity*price
  }

  $scope.findRoom = function(roomName){
    var thisRoom = $scope.rooms.find(function(room){
      if (room.name === roomName){
        return true;
      }
    })
    return thisRoom;
  }

  $scope.displayDetails = function(){
    $scope.currentRoom = $scope.findRoom($scope.selectedRoom2)
    $scope.furniture = $scope.currentRoom.furniture;
    $scope.totalCost = $scope.currentRoom.totalCost;
    $state.go('room');
  }

})
