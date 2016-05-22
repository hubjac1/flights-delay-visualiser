/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('hourChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<div id="hour-chart" class="chart">' +
        '<a class="reset" ng-click="resetHourChart()">reset</a></div>',
      link: function (scope) {
        var GroupName = 'marker-select';

        function buildHourChart(flight, groupName){

          var hour = flight.dimension(function(d) { return d.date.getHours() + d.date.getMinutes() / 60; }),
            hours = hour.group(Math.floor);

          scope.hourChart = dc.barChart('#hour-chart', groupName);
          scope.hourChart
            .width(400)
            .height(200)
            .dimension(hour)
            .group(hours)
            .x(d3.scale.linear()
              .domain([0, 24])
              .rangeRound([0, 10 * 24]))
            .brushOn(true);
        }

        FlightInformationService.getDataSet().then(function(flight){

          buildHourChart(flight, GroupName);
          scope.hourChart.render();
        });

        scope.resetHourChart = function(){
          scope.hourChart.filterAll(GroupName);
          dc.renderAll(GroupName);
        };
      }
    };
  }]);
