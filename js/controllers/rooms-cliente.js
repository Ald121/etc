var app=angular.module('app');

app.controller('RoomsClientesController', function($scope, ServiciosRooms, $localStorage,$location,$mdDialog) {

 $scope.query = {
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
    $scope.rooms = desserts.respuesta.data;
  };

   $scope.getRooms = function () {
    ServiciosRooms.misRoomsCliente().get($scope.query, success).$promise;
    };

    $scope.open_room = function (room,pass_sala) {
    var idsala=room.idtemas;
    var nombre=room.nombre_tema;
    $localStorage.nombre_room=nombre;
    ServiciosRooms.getEstadoRoom().get({idtemas:idsala,pass:pass_sala}).$promise.then(function(data){
        if (data.respuesta==false) {
             $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#dialogContainer')))
                        .clickOutsideToClose(true)
                        .title('Error :(')
                        .textContent('CONTRASEÑA INCORRECTA')
                        .ok('Entendido')
                        .openFrom('#left')
                    );  
        }else{
            if (data.respuesta=='ACTIVO') {
                console.log(data.respuesta.hash);
                $location.hash(data.respuesta.hash);
                $location.path('/home/Video/');
            }

            if (data.respuesta=='ENESPERA'||data.respuesta=='CERRADO'||data.respuesta=='PAUSA') {
                $mdDialog.show(
                                $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#dialogContainer')))
                                .clickOutsideToClose(true)
                                .title('Lo sentimos :(')
                                .textContent('LA SALA NO SE ENCUENTRA ACTIVA INTÉNTELO MÁS TARDE')
                                .ok('Entendido')
                                .openFrom('#left')
                            );  
            }
        }
    });
    };

    $scope.getRooms();
});