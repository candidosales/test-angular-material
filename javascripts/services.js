app.service('clientService', ['$q','$http', function($q, $http) {
  var clients = [
    {
      id: 1,
      name: 'Ok',
      email: 'candidosg@gmail.com',
      tel: '86 99933-5216',

    }, {
      id: 2,
      name: 'Ok',
      email: 'tete@gmail.com',
      tel: '86 99933-5216',
    }, {
      id: 3,
      name: 'Ok',
      email: 'free@gmail.com',
      tel: '86 88833-5216',
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