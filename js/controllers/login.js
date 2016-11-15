var app=angular.module('app');

app.controller('loginController',function($scope,ServiciosLoginRegistro,$location,$localStorage,$mdDialog){
	$scope.see=false;
	$scope.login=function(){
		$scope.see=true;
		ServiciosLoginRegistro.login().send($scope.data).$promise.then(function(data){
			
			if (data.error=='sin-activacion') {
				$scope.see=false;
				$mdDialog.show(
			            $mdDialog.alert()
			            .parent(angular.element(document.querySelector('#dialogContainer')))
			            .clickOutsideToClose(true)
			            .title('Error :(')
			            .textContent('Activa tu cuenta para ingresar al sistema, Revisa tu correo')
			            .ok('Entendido')
			            .openFrom('#left')
			        );
			        return false;	
			};
			if (data.error=='usuario-pass-fail') {
				$scope.see=false;
				$mdDialog.show(
			            $mdDialog.alert()
			            .parent(angular.element(document.querySelector('#dialogContainer')))
			            .clickOutsideToClose(true)
			            .title('Lo sentimos :(')
			            .textContent('Usuario o password incorrecto, vuelva a intentar')
			            .ok('Entendido')
			            .openFrom('#left')
			        );	
				return false;
			};

			$localStorage.token=data.token;
			$localStorage.datosUser=data.datosUser;
			$location.path('/home');
		});
	}
});