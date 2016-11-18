var app=angular.module('app');

app.controller('homeController',function($scope,$location,$localStorage,ServiciosGenerales,ServiciosAmigos,$rootScope){
	$scope.selected = [];
	$scope.total=0;

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

	function success(desserts) {
    $scope.usuarios = desserts.respuesta.data;
    $scope.total=desserts.respuesta.total;
  	};

	 $scope.getAmigos = function () {
    $scope.promise_users = ServiciosAmigos.misAmigos().get($scope.query_amigos, success).$promise;
  	};

  	$scope.deleteAmigo = function () {
       ServiciosAmigos.deleteAmigo().delete({amigos:$scope.selected}).$promise.then(function(data){
        if (data.respuesta) {
          $scope.getAmigos();
        }
       });
    }

	if ($localStorage.datosUser) {
		$scope.datosUser=$localStorage.datosUser;
		$scope.imgPerfil=ServiciosGenerales.server().ETC()+$localStorage.datosUser.foto;
		$scope.ip=ServiciosGenerales.server().ETC();

		if ($scope.datosUser.tipo_user=='ADMIN') {
			$scope.menus=[
				// {titulo:'INICIO',icon:'img/icons/home.svg',link:'/home',submenu:[],link:'/home/Dashboard-A'},
				{titulo:'USUARIOS',submenu:[{titulo:'Crear Usuario',icon:'img/icons/add-user.svg',link:'/home/AddUser'},{titulo:'Consultas',icon:'img/icons/user-search.svg',link:'/home/SearchUser'}]},
				{titulo:'CONFERENCIA',submenu:[{titulo:'Video Llamadas',icon:'img/icons/video-call.svg',link:'/home/VideoCall'}]},
				{titulo:'AUDITORÌA',submenu:[{titulo:'Registros de Ingreso',icon:'img/icons/auditoria-ingreso.svg',link:'/home/AuditoriaIngresos'}]},
				{titulo:'REPORTES',submenu:[{titulo:'Reporte de temas',icon:'img/icons/document.svg',link:'/home/Reporte-temas'}]}
				]
				$scope.inicio = $scope.menus[1].submenu[0].link;
				
		}

		if ($scope.datosUser.tipo_user=='CLIENTE') {
			$scope.menus=[
				{titulo:'INICIO',icon:'img/icons/home.svg',link:'/home',submenu:[],link:'/home/Dashboard-C'}
			]
			$scope.inicio = $scope.menus[0].link;
		}
		if ($location.path()==$scope.inicio||$location.path()=='/home') {
			$location.path($scope.inicio);
			if ($scope.datosUser.tipo_user=='ADMIN') {
				$scope.activeItem = $scope.menus[1].submenu[0];
			}
			if ($scope.datosUser.tipo_user=='CLIENTE') {
				$scope.activeItem = $scope.menus[0];
			}
		}
		// $location.path($scope.inicio);
		$scope.getAmigos();
	}else{
		$location.path('/');
	}
	
	$scope.navigateTo = function(valor,item) {
		$scope.activeItem = item;
		$location.path(valor);
	};

	$scope.logout=function(){
		console.log('salir');
		$localStorage.$reset();
		$location.path('/');
	}  

    $rootScope.$on("getRemoteAmigos", function(){
           $scope.getAmigos();
    });

});