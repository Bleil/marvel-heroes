angular.module('heroesApp.factories', [])
    .factory('HeroesInterceptor', ['$q', 'md5', function ($q, md5) {
        var PUBLIC_KEY = '3717a6e135efbc62b94791905d5e068f';
        var PRIVATE_KEY = '0e75acfdbdc62d4703667a59976570ae36b35f3c';
        return {
            request: function (config) {
                var ts = new Date().getTime();
                var hash = md5.createHash(ts + PRIVATE_KEY + PUBLIC_KEY);
                var url = config.url;
                
                url += ((url.indexOf('?') > -1) ? '&' : '?') + ('apikey=' + PUBLIC_KEY);
                url += "&ts=" + ts + "&hash=" + hash;
                
                config.url = url;

                return config;
            },
            responseError: function (error) {
                return $q.reject(error);
            }
        };
    }]);