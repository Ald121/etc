var app=angular.module('app');
app.service('ServiciosGenerales', function($resource) {
	this.server = function() {
        return {
            ETC: function() {
                // return "http://192.168.0.108/serviciosETC/";
                return "https://serviciosetc.innovaservineg.com/"
            }
        }
    };
});