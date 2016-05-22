'use strict';

/**
 * @ngdoc function
 * @name angularCrossfilterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCrossfilterApp
 */
angular.module('angularCrossfilterApp')
  .controller('MainCtrl', [ '$scope', 'UtilService', 'FlightInformationService',function ($scope, UtilService, FlightInformationService) {

    var GroupName = 'marker-select';

    FlightInformationService.getDataSet().then(function(flight) {

        var all = flight.groupAll(),
          origin = flight.dimension(function(d) { return  d.origin; }),
          originGroup = origin.group(),
          delay = flight.dimension(function(d) { return Math.max(-60, Math.min(149, d.delay)); }),
          delays = delay.group(function(d) { return Math.floor(d / 10) * 10; }),
          distance = flight.dimension(function(d) { return Math.min(1999, d.distance); }),
          distances = distance.group(function(d) { return Math.floor(d / 50) * 50; });

      


      //dc.renderAll(GroupName);
    });

    $scope.resetDestinationChart = function(){
      $scope.destChart.filterAll(GroupName);
      dc.renderAll(GroupName);
    };
    $scope.resetOriginChart = function(){
      $scope.originChart.filterAll(GroupName);
      dc.renderAll(GroupName);
    };
  }]);
