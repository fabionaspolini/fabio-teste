'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).

  // Listar
  controller('BeerListController', ['$scope', '$http', function ($scope, $http) {
            $scope.reverse = false;
            $scope.predicate = 'name';

            $scope.ordenar = function (predicado) {
                $scope.reverse = !$scope.reverse;
                $scope.predicate = predicado;
            }

            $scope.index = "name";

            var url = "/api/beers";
            var method = "GET";

            $http({
              url: url,
              method: method
            }).
            success(function(data) {
              $scope.cervejas = data;
            }).
            error(function(err) {
              console.log("Erro", err);
            })
  }]).

  // Mostrar dados
  controller('BeerShowController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
            var url = "/api/beers/" + $routeParams.id;
            var method = "GET";

            $http({
              url: url,
              method: method
            }).
            success(function(data) {
              $scope.cerveja = data;
            }).
            error(function(err) {
              console.log("Erro", err);
            })
  }]).

  // Criar
  controller('BeerCreateController', ['$scope', '$http', function ($scope, $http) {

            $scope.create = function(cerveja) {
              var url = "/api/beers";
              var method = "POST";

              $http({
                url: url,
                method: method,
                data: cerveja
              }).
              success(function(data) {
                $scope.msg = "Cerveja " + cerveja.name + " cadastrada com sucesso.";
                //$scope.cerveja = data;
              }).
              error(function(err) {
                console.log("Erro", err);
                $scope.msg = "Cerveja " + cerveja.name + " não pode ser cadastrada.";
              })
  }}]).

  // Alterar
  controller('BeerEditController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
            var url = "/api/beers/" + $routeParams.id;
            var method = "GET";

            $http({
              url: url,
              method: method
            }).
            success(function(data) {
              $scope.cerveja = data;
            }).
            error(function(err) {
              console.log("Erro", err);
            });

            // Salvar cerveja
            $scope.save = function(cerveja) {
              method = "PUT";
              $http({
                url: url,
                method: method,
                data: cerveja
              }).
              success(function(data) {
                $scope.msg = "Cerveja " + cerveja.name + " alterada com sucesso.";
              }).
              error(function(err) {
                console.log("Erro", err);
                $scope.msg = "Cerveja " + cerveja.name + " não pode ser cadastrada.";
              });
            }
  }]).

  // Ecluir
  controller('BeerRemoveController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
            var url = "/api/beers/" + $routeParams.id;
            var method = "GET";

            $http({
              url: url,
              method: method
            }).
            success(function(data) {
              $scope.cerveja = data;
            }).
            error(function(err) {
              console.log("Erro", err);
            });

            // Salvar cerveja
            $scope.remove = function(cerveja) {
              url = "/api/beers/" + cerveja._id;
              method = "DELETE";
              $http({
                url: url,
                method: method
              }).
              success(function(data) {
                $scope.msg = "Cerveja " + cerveja.name + " excluída com sucesso.";
              }).
              error(function(err) {
                console.log("Erro", err);
                $scope.msg = "Cerveja " + cerveja.name + " não pode ser excluída.";
              });
            }
  }]);
