app.service('clientService', ['$q','$http', function($q, $http) {
  var clients = [
    {
      id: 1,
      name: 'Candido',
      email: 'candidosg@gmail.com',
      addresses: [{ id: 4, tel: '99 545433-5216', address: 'Rua fulano de tal, n° 300', neighborhood: 'Fátima', city: 'Teresina', state: 'PI'}],
    }, {
      id: 2,
      name: 'Candiditi',
      email: 'tete@gmail.com',
      addresses: [
        { id: 6, tel: '99 545433-5216', address: 'Rua Visconde da Parnaíba, n° 3030', neighborhood: 'Horto', city: 'Teresina', state: 'PI'},
        { id: 5, tel: '11 34333-5216', address: 'Rua Jockey Clube, n° 500', neighborhood: 'Jockey', city: 'Teresina', state: 'PI'}
      ],
    }, {
      id: 3,
      name: 'Noé Rodrigues',
      email: 'free@gmail.com',
      addresses: [
        { id: 1, tel: '86 12321-3221', address: 'Avenida Marechal Castelo Branco, n° 500', neighborhood: 'Castelo', city: 'Teresina', state: 'PI'},
        { id: 2, tel: '11 87622-3313', address: 'Avenida Pres. Kennedy, n° 1800', neighborhood: 'Morros', city: 'Teresina', state: 'PI'}
      ],
    }
  ];
  
  function loadAll() {
    return $q.when(clients);
  }
  
  function getAddresses(id) {
   var request = $http({
                    method: 'get',
                    url: '/clients/' + id + '/addresses',
                });
    return( request.then( handleSuccess, handleError ) );
  }
  
  function get(id) {
   var request = $http({
                    method: 'get',
                    url: '/clients/' + id,
                });
    return( request.then( handleSuccess, handleError ) );
  }
  
  function handleError( response ) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if ( ! angular.isObject( response.data ) || ! response.data.message ) {
      return( $q.reject( "An unknown error occurred." ) );
    }
    // Otherwise, use expected error message.
    return( $q.reject( response.data.message ) );
  }
  // I transform the successful response, unwrapping the application data
  // from the API response payload.
  function handleSuccess( response ) {
    return( response.data );
  }
  
  return {
    loadAll: loadAll,
    get: get,
    getAddresses: getAddresses
  }
  
}]);