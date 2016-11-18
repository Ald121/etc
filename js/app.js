var app=angular.module('app',['duScroll','ui.router','ngAnimate','ngMessages','ngResource','ngRoute','route-segment','view-segment','ngMaterial','ngMdIcons','md.data.table','ngStorage','angularFileUpload']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('green');
});
