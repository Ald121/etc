var app = angular.module('app');
app.controller('RoomsController',function ($mdEditDialog, $q, $scope, $timeout,ServiciosRooms,ServiciosAmigos,$location,$localStorage) {
  $scope.see=false;
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
    if ($localStorage.datosUser.tipo_user=='ADMIN') {
        var hash=(Math.random() * new Date().getTime()).toString(36).toUpperCase().replace(/\./g, '-');
        $location.hash(hash);
    }

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
    page:1,
    limit: '5',
    page_num: 1,
    fecha_inicio:'',
    fecha_fin:'',
    ordenarPor:''
  };

  $scope.query_rooms = {
    filter: '',
    num_registros: 5,
    page:1,
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
    $scope.promise_users = ServiciosAmigos.misAmigos().get($scope.query_amigos, success).$promise;
  	};

  	$scope.crear_sala = function () {
  		$scope.see=true;
  		var original = $scope.user;
   	ServiciosRooms.addRoom().send({nombre_tema:$scope.data.nombre_tema,saludo:$scope.data.saludo,cuerpo:$scope.data.cuerpo,invitados:$scope.selected,hash:$location.hash()}).$promise.then(function(data){
   		console.log(data.respuesta);
   		if (data.respuesta==true) {
			$scope.selected = [];
			$scope.data= angular.copy(original);
			$scope.addform.$setPristine();
		    $scope.addform.$setValidity();
		    $scope.addform.$setUntouched();
   			$scope.see=false;
   			$scope.getRooms();
   		}
   	},function(error){
   		$scope.crear_sala();
   	});
  	};
  	// Get Salas
  	function success_salas(desserts) {
    $scope.rooms = desserts.respuesta.data;
  };

   $scope.getRooms = function () {
    ServiciosRooms.misRooms().get($scope.query_rooms, success_salas).$promise;
  	};

  $scope.startSala = function (room) {
    $localStorage.nombre_room=room.nombre_tema;
    $localStorage.hash=room.hash;
    var url='/home/Video/';
    $location.path(url);
    };
    
  $scope.getAmigos();
  $scope.getRooms();
});