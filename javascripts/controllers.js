app.controller('HomeCtrl', function ($scope) {
  
});

app.controller('ClientsCtrl', ['$scope', 'clientService', '$timeout', '$q', '$log', function ($scope, clientService, $timeout, $q, $log) {
  $scope.clients = [];
  $scope.selected = null;
  
  clientService
    .loadAll()
    .then( function(clients) {
      $scope.clients = prepareSearch({ itens: clients });
      console.log($scope.clients);
    });
    
    
  $scope.simulateQuery = false;
  $scope.isDisabled    = false;
  // list of `state` value/display objects
  // $scope.clients        = loadAll();
  $log.info('$scope.clients', $scope.clients);
  
  $scope.querySearch   = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange   = searchTextChange;
  $scope.newState = newState;
  
  function newState(state) {
    alert("Sorry! You'll need to create a Constituion for " + state + " first!");
  }
  // ******************************
  // Internal methods
  // ******************************
  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch (query) {
    var results = query ? $scope.clients.filter( createFilterFor(query) ) : $scope.clients,
        deferred;
    if ($scope.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    }
    else {
      return results;
    }
  }
  
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  
  function selectedItemChange(item) {
    $scope.selected = item.object;
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
            Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
            Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
            Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
            North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
            South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
            Wisconsin, Wyoming';
    return allStates.split(/, +/g).map( function (state) {
      return {
        value: state.toLowerCase(),
        display: state
      };
    });
  }
  
  function prepareSearch(args) {
    var itens = args.itens;
    return itens.map(function(item) {
      var tels = item.addresses.map(function(address) {
        return address.tel
      });
            
      return {
        id: item.id,
        value: item.name.toLowerCase() + '-' + tels.join('-'),
        display: item.name + ' - ' + tels.join(','),
        object: item
      }
    });
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    console.log('query', query);
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      console.log('state', state, state.value.indexOf(lowercaseQuery) > -1);
      return (state.value.indexOf(lowercaseQuery) > -1);
    };
  }
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