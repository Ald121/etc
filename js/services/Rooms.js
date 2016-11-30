var app=angular.module('app');
app.service('ServiciosRooms', function($resource,ServiciosGenerales,$localStorage) {
	this.misRooms = function() {
        var url_server=ServiciosGenerales.server().ETC();
	    return $resource(url_server+"public/getRooms", {},{
            get: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.addRoom = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/addRoom", {},{
            send: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.deleteRoom = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/deleteRoom", {},{
            delete: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.misRoomsCliente = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/getRoomsCliente", {},{
            get: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

     this.getEstadoRoom = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/getEstadoRoom", {},{
            get: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.stopRoom = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/stopRoom", {},{
            stop: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.startRoom = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/startRoom", {},{
            start: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.pausaRoom = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/pausaRoom", {},{
            pausar: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };


});