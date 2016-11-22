var app=angular.module('app');
app.service('ServiciosLoginRegistro', function($resource,ServiciosGenerales) {
	this.login = function() {
        var url_server=ServiciosGenerales.server().ETC();
	    return $resource(url_server+"public/Login", {},{
            send: {
                method: 'POST', isArray: false
          //       headers: {
		        // 'Content-Type': 'application/json'
		        // }
            }
        });
    };
});