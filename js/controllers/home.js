var app=angular.module('app');

app.controller('homeController',function($scope,$location){
	$scope.menus=[
	{titulo:'INICIO',icon:'img/icons/home.svg',link:'/home',submenu:[]},
	{titulo:'USUARIOS',submenu:[{titulo:'Crear Usuario',icon:'img/icons/add-user.svg',link:'/home/AddUser'},{titulo:'Consultas',icon:'img/icons/user-search.svg',link:'/home/SearchUser'}]},
	{titulo:'CONFERENCIA',submenu:[{titulo:'Video Llamadas',icon:'img/icons/video-call.svg',link:'/home/VideoCall'}]},
	{titulo:'AUDITORÌA',submenu:[{titulo:'Registros de Ingreso',icon:'img/icons/auditoria-ingreso.svg',link:'/home/AuditoriaIngresos'}]},
	{titulo:'REPORTES',submenu:[{titulo:'Reporte de temas',icon:'img/icons/document.svg',link:'/home/Reporte-temas'}]}
	]
	$scope.navigateTo = function(valor) {
		$location.path(valor);
	};
});