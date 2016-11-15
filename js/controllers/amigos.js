var app=angular.module('app');

app.controller('AmigosController', function($scope, ServiciosGenerales, $localStorage, FileUploader,$rootScope) {

   	$scope.see=false;
	var uploader = $scope.uploader = new FileUploader({
        url: ServiciosGenerales.server().ETC()+'public/addAmigo',
        headers: {
        Authorization: 'Bearer ' + $localStorage.token,
        }
        // removeAfterUpload:true
    });
    // FILTERS
    // uploader.filters.push({
    //     name: 'customFilter',
    //     fn: function(item {File|FileLikeObject}, options) {
    //         return this.queue.length < 10;
    //     }
    // });
    uploader.onAfterAddingFile = function(fileItem) {
         fileItem.formData=[{
        cedula:$scope.data.cedula,
		nombres:$scope.data.nombres,
		apellidos:$scope.data.apellidos,
		email:$scope.data.email,
		tipo_user:$scope.data.tipo_user,
		fecha_nac:$scope.data.fecha_nac,
		direccion:$scope.data.direccion,
		user:$scope.data.user,
		pass:$scope.data.pass
    }];
    };

    $scope.add_user = function () {
    $scope.uploader.uploadAll();
    $rootScope.$emit("getRemoteAmigos", {});
    };

    // -------------------------------

    var controller = $scope.controller = {
        isImage: function(item) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

});