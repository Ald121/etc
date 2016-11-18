var app=angular.module('app');
app.service('ServiciosAmigos', function($resource,ServiciosGenerales,$localStorage) {

    this.misAmigos = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/getAmigos", {},{
            get: {
                method: 'POST', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.deleteAmigo = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/deleteAmigo", {},{
            delete: {
                method: 'POST', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };
});