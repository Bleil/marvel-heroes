angular.module('heroesApp', ['infinite-scroll', 'angular-md5', 'heroesApp.factories',
    'heroesApp.services', 'heroesApp.controllers', 'heroesApp.components'])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('HeroesInterceptor');
    }]);