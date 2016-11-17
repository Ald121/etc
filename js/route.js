var app = angular.module('app');
app.config(function($routeSegmentProvider, $routeProvider) {
        
        $routeSegmentProvider.options.autoLoadTemplates = true;
      
        $routeSegmentProvider
            .when('/',          'login')
            .when('/home',          'home')
            .when('/home/AddUser',          'home.AddUser')
            .when('/home/SearchUser',          'home.SearchUser')
            .when('/home/VideoCall',          'home.VideoCall')
            .when('/home/AuditoriaIngresos',          'home.AuditoriaIngresos')
            .when('/home/Reporte-temas',          'home.Reporte-temas')
            .when('/home/Dashboard-C',          'home.Dashboard-C')
            .when('/home/Video/',          'home.Video')
            .segment('login', {
                        templateUrl: 'views/login.html',
                        controller:'loginController'
                    })
            .segment('home', {
                        templateUrl: 'views/home.html',
                        controller:'homeController'
                    })
                .within()
                    .segment('Dashboard-C', {
                        // 'default': true,
                        templateUrl: 'views/Inicio-Clientes.html',
                        controller: 'RoomsClientesController'
                    })
                    .segment('AddUser', {
                        // 'default': true,
                        templateUrl: 'views/AddUser.html',
                        controller: 'AmigosController'
                    })
                    .segment('SearchUser', {
                        templateUrl: 'views/SearchUser.html',
                        // controller: 'appsCtrl'
                    })
                    .segment('VideoCall', {
                        // 'default': true,
                        templateUrl: 'views/VideoCall.html',
                        controller: 'RoomsController'
                    })
                    .segment('AuditoriaIngresos', {
                        // 'default': true,
                        templateUrl: 'views/AuditoriaIngresos.html',
                        // controller: 'misfacturasCtrl'
                    })
                    .segment('Reporte-temas', {
                        // 'default': true,
                        templateUrl: 'views/Reporte-temas.html',
                        // controller: 'SubirFacCtrl'
                    })
                    .segment('Video', {
                        // 'default': true,
                        templateUrl: 'views/Video.html',
                        controller: 'VideoController',
                        // dependencies: ['nombre']
                    })
                    .up()
            .up()
        // $routeProvider.otherwise({redirectTo: '/'}); 
    });