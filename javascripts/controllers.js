app.controller('HomeCtrl', function ($scope) {
  
});

app.controller('ClientsCtrl', ['$scope', 'clientService', '$timeout', '$q', '$log', '$state', function ($scope, clientService, $timeout, $q, $log, $state) {
  $scope.clients = []; 
  
  clientService
    .loadAll()
    .then( function(clients) {
      $scope.clients = prepareSearch({ itens: clients });
    });
    
  $scope.simulateQuery = false;
  $scope.isDisabled    = false;
  
  $scope.querySearch   = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange   = searchTextChange;
  $scope.newState = newState;
  
  $scope.selectAddress = function(address) {
    
  }
  
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
  
  function searchTextChange(text) {}
  
  function selectedItemChange(item) {
    $state.go('home.clients.client', { idClient: item.object.id });
    $log.info('Item changed to ' + JSON.stringify(item));
  }
   
  function prepareSearch(args) {
    var itens = args.itens;
    return itens.map(function(item) {
                 
      return {
        id: item.id,
        value: item.name.toLowerCase() + '-' + item.tels.join('-'),
        display: item.name + ' - ' + item.tels.join(', '),
        object: item
      }
    });
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) > -1);
    };
  }
}]);

app.controller('ClientCtrl', ['$scope', '$stateParams', 'clientService', 'addressService', function ($scope, $stateParams, clientService, addressService) {
  $scope.client = clientService.get({ id: $stateParams.idClient });
  $scope.addresses = addressService.getAllByClient({ id: $stateParams.idClient });
  
  
  $scope.$on('address.created', function(event, address) {
    console.log(address); 
    $scope.addresses.push(address);
  });
  
  $scope.$on('address.updated', function(event, address) {
    console.log(address); 
  });

}]);

app.controller('AddressCtrl', ['$scope', '$stateParams', '$mdToast', 'addressService', 'neighborhoodService', function ($scope, $stateParams, $mdToast,addressService, neighborhoodService) {
  var addressDefault = { 
                        id: null, 
                        address: null,
                        number: null, 
                        neighborhood: { }, 
                        city: 'Teresina', 
                        state: 'PI', 
                        cep: null, 
                        complement: null,
                        client: $stateParams.idClient
                      };
  
  if ($stateParams.idAddress) {
    $scope.address = addressService.get({ id: $stateParams.idAddress });
    $scope.title = { form: 'Editar', button: 'Atualizar' };
  }
  else {
    $scope.address = angular.copy(addressDefault);
    $scope.title = { form: 'Novo', button: 'Salvar' };
  }
  
  $scope.neighborhoods = neighborhoodService.loadAll();
  
  $scope.submit = function(address) {
    if ($scope.addressForm.$valid) {
      console.log(address);
      if (address.id) {
        if ( addressService.update({ address: address }) ) {
          $scope.showToast({ text: 'Endereço atualizado '});
          $scope.$emit('address.updated', address);
        }
      }
      else {
        if ( addressService.create({ address: address }) ) {
          $scope.showToast({ text: 'Endereço criado '});  
          $scope.$emit('address.created', address);  
        }
      }
    }
  }
  
  $scope.showToast = function(args) {
    var text = args.text;
    $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .position('top right')
        .hideDelay(3000)
    );
  };
}]);
