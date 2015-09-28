app = angular.module('rooms', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('home');
  $stateProvider
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
    // console.log(currentRoom);
    currentRoom.furniture.push(obj);
    currentRoom.totalCost += quantity*price
    // console.log(currentRoom.totalCost);
  }

  $scope.findRoom = function(roomName){
    var thisRoom = $scope.rooms.find(function(room){
      if (room.name === roomName){
        return true;
      }
    })
    return thisRoom;
  }
  console.log($scope.selectedRoom2);

  $scope.displayDetails = function(){
    $scope.currentRoom = $scope.findRoom($scope.selectedRoom2)
    $scope.totalCost = $scope.currentRoom.totalCost;
    $state.go('room');
  }

})
