var app=angular.module('app');

app.controller('homeController',function($scope,$location,$localStorage){

	if ($localStorage.datosUser) {
		$scope.datosUser=$localStorage.datosUser;

		if ($scope.datosUser.tipo_user=='ADMIN') {
			$scope.menus=[
				// {titulo:'INICIO',icon:'img/icons/home.svg',link:'/home',submenu:[],link:'/home/Dashboard-A'},
				{titulo:'USUARIOS',submenu:[{titulo:'Crear Usuario',icon:'img/icons/add-user.svg',link:'/home/AddUser'},{titulo:'Consultas',icon:'img/icons/user-search.svg',link:'/home/SearchUser'}]},
				{titulo:'CONFERENCIA',submenu:[{titulo:'Video Llamadas',icon:'img/icons/video-call.svg',link:'/home/VideoCall'}]},
				{titulo:'AUDITORÌA',submenu:[{titulo:'Registros de Ingreso',icon:'img/icons/auditoria-ingreso.svg',link:'/home/AuditoriaIngresos'}]},
				{titulo:'REPORTES',submenu:[{titulo:'Reporte de temas',icon:'img/icons/document.svg',link:'/home/Reporte-temas'}]}
				]
				$scope.inicio = $scope.menus[1].submenu[0].link;
				$scope.activeItem = $scope.menus[1].submenu[0];
		}

		if ($scope.datosUser.tipo_user=='CLIENTE') {
			$scope.menus=[
				{titulo:'INICIO',icon:'img/icons/home.svg',link:'/home',submenu:[],link:'/home/Dashboard-C'}
			]
			$scope.activeItem = $scope.menus[0];
			$scope.inicio = $scope.menus[0].link;
		}
		$location.path($scope.inicio);
	}
	
	$scope.navigateTo = function(valor,item) {
		$scope.activeItem = item;
		$location.path(valor);
	};

	$scope.selected = [];
});