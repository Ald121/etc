var app = angular.module('app');
app.controller('RoomsController',function ($mdEditDialog, $q, $scope, $timeout,ServiciosRooms) {
  
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };
  
   $scope.query_amigos = {
    filter: '',
    num_registros: 5,
    pagina_actual:1,
    limit: '5',
    page_num: 1,
    fecha_inicio:'',
    fecha_fin:'',
    ordenarPor:''
  };

  $scope.query_rooms = {
    filter: '',
    num_registros: 5,
    pagina_actual:1,
    limit: '5',
    page_num: 1,
    fecha_inicio:'',
    fecha_fin:'',
    ordenarPor:''
  };
  
  function success(desserts) {
    $scope.usuarios = desserts.respuesta.data;
  };

   $scope.getAmigos = function () {
    $scope.promise_users = ServiciosRooms.misAmigos().get($scope.query_amigos, success).$promise;
  	};

  	$scope.crear_sala = function () {
   	ServiciosRooms.addRoom().send({datos_sala:$scope.data,invitados:$scope.selected}).$promise.then(function(data){
   		console.log(data.respuesta);
   		$scope.getRooms();
   	});
  	};
  	// Get Salas

  	function success_salas(desserts) {
    $scope.rooms = desserts.respuesta.data;
  };

   $scope.getRooms = function () {
    ServiciosRooms.misRooms().get($scope.query_rooms, success_salas).$promise;
  	};
    
  $scope.getAmigos();
  $scope.getRooms();
});