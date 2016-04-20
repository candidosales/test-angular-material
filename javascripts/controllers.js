app.controller('HomeCtrl', function ($scope) {
  
});

app.controller('ClientsCtrl', ['$scope', 'clientService', function ($scope, clientService) {
  $scope.clients = [];
  
  clientService
    .loadAll()
    .then( function(clients) {
      $scope.clients = [].concat(clients);
    });
}]);

app.controller('AddressesCtrl', function ($scope) {
  $scope.addresses = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});