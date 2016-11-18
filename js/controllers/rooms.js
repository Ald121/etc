var app = angular.module('app');
app.controller('RoomsController',function ($mdEditDialog, $q, $scope, $timeout,ServiciosRooms,ServiciosAmigos,$location,$localStorage,$document) {
  $scope.see=false;
  $scope.selected = [];
  $scope.selected_rooms = [];
  $scope.limitOptions = [5, 10, 15];
  $scope.total=0;
  $scope.total_room=0;
  var duration = 1000; //milliseconds
  var offset = 30; 

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
    $scope.total=desserts.respuesta.total;
  };

   $scope.getAmigos = function () {
    $scope.promise_users = ServiciosAmigos.misAmigos().get($scope.query_amigos, success).$promise;
  	};

  	$scope.crear_sala = function () {
  		$scope.see=true;
  		var original = $scope.user;
      var someElement = angular.element(document.getElementById('table-scroll'));
   	ServiciosRooms.addRoom().send({nombre_tema:$scope.data.nombre_tema,saludo:$scope.data.saludo,cuerpo:$scope.data.cuerpo,invitados:$scope.selected,hash:$location.hash()}).$promise.then(function(data){
   		if (data.respuesta==true) {
			$scope.selected = [];
			$scope.data= angular.copy(original);
			$scope.addform.$setPristine();
	    $scope.addform.$setValidity();
	    $scope.addform.$setUntouched();
 			$scope.see=false;
 			$scope.getRooms();
      $document.scrollToElement(someElement, offset, duration);
   		}
   	},function(error){
   		$scope.crear_sala();
   	});
  	};
  	// Get Salas
  	function success_salas(desserts) {
    $scope.rooms = desserts.respuesta.data;
    $scope.total_room= desserts.respuesta.total;
  };

   $scope.getRooms = function () {
    ServiciosRooms.misRooms().get($scope.query_rooms, success_salas).$promise;
  	};

  $scope.startSala = function (room) {
    ServiciosRooms.startRoom().start({idtemas:room.idtemas}).$promise.then(function(data){
        console.log(data.respuesta);
        if (data.respuesta) {
          $localStorage.nombre_room=room.nombre_tema;
          $localStorage.hash=room.hash;
          var url='/home/Video/';
          $location.path(url);
        }
       });
    };

  $scope.stopSala = function (room) {
       ServiciosRooms.stopRoom().stop({idtemas:room.idtemas}).$promise.then(function(data){
        console.log(data.respuesta);
        if (data.respuesta) {
          $scope.getRooms();
        }
       });
    }

   $scope.deleteSala = function (room) {
       ServiciosRooms.deleteRoom().delete({rooms:$scope.selected_rooms}).$promise.then(function(data){
        if (data.respuesta) {
          $scope.getRooms();
        }
       });
    }

    $scope.pauseSala = function (room) {
       ServiciosRooms.pausaRoom().pausar({idtemas:room.idtemas}).$promise.then(function(data){
        if (data.respuesta) {
          $scope.getRooms();
        }
       });
    }
    
    
  $scope.getAmigos();
  $scope.getRooms();


   

});