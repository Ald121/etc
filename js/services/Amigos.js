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

    // this.addAmigo = function() {
    //     var url_server=ServiciosGenerales.server().ETC();
    //     return $resource(url_server+"public/addAmigo", {},{
    //         send: {
    //             method: 'POST', isArray: false,
    //             params:{token:$localStorage.token}
    //         }
    //     });
    // };
});