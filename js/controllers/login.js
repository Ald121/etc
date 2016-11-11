var app=angular.module('app');

app.controller('loginController',function($scope){
	$scope.login=function(){
		console.log($scope.data);
	}
});