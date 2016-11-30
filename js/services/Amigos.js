var app=angular.module('app');
app.service('ServiciosAmigos', function($resource,ServiciosGenerales,$localStorage) {

    this.misAmigos = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/getAmigos", {},{
            get: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token},
                headers:{withCredentials:true}
            }
        });
    };

    this.deleteAmigo = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/deleteAmigo", {},{
            delete: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };

    this.AddAmigo = function() {
        var url_server=ServiciosGenerales.server().ETC();
        return $resource(url_server+"public/addAmigo", {},{
            add: {
                method: 'GET', isArray: false,
                params:{token:$localStorage.token}
            }
        });
    };
});