var app=angular.module('app',['ngAnimate','ngMessages','ngResource','ngRoute','route-segment','view-segment','ngMaterial','ngMdIcons','md.data.table']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('green');
});