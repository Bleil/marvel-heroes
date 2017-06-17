var DEFAULT_LIMIT = 20;

angular.module('heroesApp.controllers', [])
    .controller('HeroesController', ['$scope', '$document', '$window', 'HeroesService',
        function ($scope, $document, $window, HeroesService) {
            $scope.HeroesService = HeroesService;
            $scope.heroes = [];
            $scope.busy = false;
            $scope.searching = false;
            $scope.allResultsFetched = false;
            $scope.searchHero = '';
            $scope.pixelsScrolled = 0;

            $scope.fetchMore = function () {
                $scope.busy = true;
                HeroesService.fetchHeroes($scope.searchHero, DEFAULT_LIMIT, $scope.heroes.length)
                    .then(function (response) {
                        if (response && response.data &&
                            response.data.data && response.data.data.results &&
                            response.data.data.results.length > 0) {
                            for (var i = 0; i < response.data.data.results.length; i++) {
                                $scope.heroes.push(response.data.data.results[i]);
                            }
                        }
                        else if ($scope.heroes && $scope.heroes.length > 0 &&
                            response && response.data &&
                            response.data.data && response.data.data.results &&
                            response.data.data.results.length <= 0) {
                            $scope.allResultsFetched = true;
                        }
                    }, function (error) {
                        console.log(error);
                    }).finally(function () {
                        $scope.searching = false;
                        $scope.busy = false;
                    });
            }

            $scope.heroClick = function (hero) {
                $scope.HeroesService.selectedHero = hero;
            }

            $scope.searchHeroes = function () {
                $scope.allResultsFetched = false;
                $scope.heroes = [];
                $scope.searching = true;
                $scope.fetchMore();
            }

            $scope.closeDialog = function () {
                $scope.HeroesService.selectedHero = undefined;
            }

            $document.on('scroll', function () {
                $scope.$apply(function () {
                    $scope.pixelsScrolled = $window.scrollY;
                });
            });
        }])


    .controller('HeroDialogController', ['$scope', 'HeroesService', function ($scope, HeroesService) {
        $scope.HeroesService = HeroesService;
        $scope.selectedHero = $scope.HeroesService.selectedHero;
        $scope.comics = [];
        $scope.busy = false;
        $scope.allResultsFetched = false;

        $scope.closeDialog = function () {
            $scope.HeroesService.selectedHero = undefined;
        }

        $scope.fetchMore = function () {
            $scope.busy = true;
            HeroesService.fetchComics($scope.selectedHero.comics.collectionURI, DEFAULT_LIMIT, $scope.comics.length)
                .then(function (response) {
                    if (response && response.data &&
                        response.data.data && response.data.data.results &&
                        response.data.data.results.length > 0) {
                        for (var i = 0; i < response.data.data.results.length; i++) {
                            $scope.comics.push(response.data.data.results[i]);
                        }
                    }
                    else if ($scope.comics && $scope.comics.length > 0 &&
                        response && response.data &&
                        response.data.data && response.data.data.results &&
                        response.data.data.results.length <= 0) {
                        $scope.allResultsFetched = true;
                    }
                }, function (error) {
                    console.log(error);
                }).finally(function () {
                    $scope.busy = false;
                });
        }
    }]);