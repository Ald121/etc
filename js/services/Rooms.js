var app=angular.module('app');
app.service('ServiciosRooms', function($resource,ServiciosGenerales,$localStorage) {
	this.misRooms = function() {
        var url_server=ServiciosGenerales.server().ETC();
	    return $resource(url_server+"public/getRooms", {},{
            get: {
                method: 'POST', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.addRoom = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/addRoom", {},{
            send: {
                method: 'POST', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };
});