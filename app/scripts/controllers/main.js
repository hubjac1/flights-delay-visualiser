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



      //var flight = FlightInformationService.dataSet,

        var all = flight.groupAll(),
        delay = flight.dimension(function(d) { return Math.max(-60, Math.min(149, d.delay)); }),
        delays = delay.group(function(d) { return Math.floor(d / 10) * 10; }),
        distance = flight.dimension(function(d) { return Math.min(1999, d.distance); }),
        distances = distance.group(function(d) { return Math.floor(d / 50) * 50; });



      function buildHourChart(flight, groupName){

        var hour = flight.dimension(function(d) { return d.date.getHours() + d.date.getMinutes() / 60; }),
          hours = hour.group(Math.floor);

        $scope.hourChart = dc.barChart('#hour-chart', groupName);
        $scope.hourChart
          .width(180)
          .height(180)
          .dimension(hour)
          .group(hours)
          .x(d3.scale.linear()
            .domain([0, 24])
            .rangeRound([0, 10 * 24]))
          .brushOn(true);

      }

      function buildDayChart(flight, groupName){
        var dayOfWeek = flight.dimension(function (d) {
          var day = d.date.getDay();
          var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return day + '.' + name[day];
        });
        var dayOfWeekGroup = dayOfWeek.group();

        $scope.dayChart = dc.rowChart('#day-chart', groupName);
        $scope.dayChart
          .width(180)
          .height(180)
          .dimension(dayOfWeek)
          .group(dayOfWeekGroup)
          //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
          .label(function (d) {
            return d.key.split('.')[1];
          })
          .title(function (d) {
            return d.value;
          })
          .elasticX(true)
          .xAxis().ticks(4);
      }

      function buildOriginChart(flight, groupName){
        var origin = flight.dimension(function(d) { return  d.origin; }),
          originGroup = origin.group();

        $scope.originChart = dc.rowChart('#origin-chart', groupName);
        $scope.originChart
          .width(180)
          .height(1800)
          .dimension(origin)
          .group(originGroup)
          .label(function (d) {
            return d.key;
          })
          .title(function (d) {
            return d.value;
          })
          .elasticX(true)
          .xAxis().ticks(4);
      }

      function buildDestinationChart(flight, groupName){
        var destination = flight.dimension(function(d) { return  d.dest; }),
          destinationGroup = destination.group();

        $scope.destChart = dc.rowChart('#destination-chart', groupName);
        $scope.destChart
          .width(180)
          .height(1800)
          .dimension(destination)
          .group(destinationGroup)
          .label(function (d) {
            return d.key;
          })
          .title(function (d) {
            return d.value;
          })
          .elasticX(true)
          .xAxis().ticks(4);
      }

      buildHourChart(flight, GroupName);
      buildDayChart(flight, GroupName);
      buildOriginChart(flight, GroupName);
      buildDestinationChart(flight, GroupName);

      dc.renderAll(GroupName);
    });

    $scope.resetHourChart = function(){
      $scope.hourChart.filterAll(GroupName);
      dc.renderAll(GroupName);
    };
    $scope.resetDayChart = function(){
      $scope.dayChart.filterAll(GroupName);
      dc.renderAll(GroupName);
    };
    $scope.resetDestinationChart = function(){
      $scope.destChart.filterAll(GroupName);
      dc.renderAll(GroupName);
    };
    $scope.resetOriginChart = function(){
      $scope.originChart.filterAll(GroupName);
      dc.renderAll(GroupName);
    };
  }]);
