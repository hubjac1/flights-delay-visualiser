/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('delayChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      scope: {},
      template: '<div id="delay-chart" class="chart">' +
        '<a class="reset" ng-click="resetDelayChart()">reset</a></div>',
      link: function (scope, element, attr) {
        var GroupName = attr.GroupName;

        function buildDelayChart(flight, groupName){

          var delay = flight.dimension(function(d) { return Math.max(-60, Math.min(149, d.delay)); }),
            delays = delay.group(function(d) { return Math.floor(d / 10) * 10; });

          scope.delayChart = dc.barChart('#delay-chart', groupName);
          scope.delayChart
            .width(400)
            .height(200)
            .dimension(delay)
            .group(delays)
            .x(d3.scale.linear()
              .domain([0, 24])
              .rangeRound([0, 10 * 24]))
            .brushOn(true);
        }

        FlightInformationService.getDataSet().then(function(flight){

          buildDelayChart(flight, GroupName);
          scope.delayChart.render();
        });

        scope.resetDelayChart = function(){
          scope.delayChart.filterAll(GroupName);
          dc.renderAll(GroupName);
        };
      }
    };
  }]);
