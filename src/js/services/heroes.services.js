angular.module('heroesApp.services', [])
    .service('DispatcherService', ['$http', function ($http) {
        return {
            asyncQuery: function (url, method) {
                return $http({ method: method, url: url });
            }
        }
    }])
    .service('HeroesService', ['md5', 'DispatcherService', '$q', function (md5, DispatcherService, $q) {
        return {
            selectedHero: undefined,
            getResource: function (url) {
                return DispatcherService.asyncQuery(url, 'GET');
            },
            fetchHeroes: function (nameStartsWith, limit, offset) {
                var url = 'https://gateway.marvel.com:443/v1/public/characters';
                url += '?limit=' + limit + '&offset=' + offset;
                if (nameStartsWith && nameStartsWith.length > 0) {
                    url += '&nameStartsWith=' + encodeURIComponent(nameStartsWith);
                }
                return DispatcherService.asyncQuery(url, 'GET');
            },
            fetchComics: function (url, limit, offset) {
                url += '?limit=' + limit + '&offset=' + offset;
                return DispatcherService.asyncQuery(url, 'GET');
            }
        }
    }]);