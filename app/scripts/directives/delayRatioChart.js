/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('delayRatioChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<div id="delay-ratio-chart" class="chart">' +
        '<a class="reset" ng-click="resetDelayChart()">reset</a></div>',
      link: function (scope) {
        var GroupName = 'marker-select';

        function buildDelayChart(flight, groupName){

          var delayRatio = flight.dimension(function(d) { return d.delayRatio; }),
            delayRatios = delayRatio.group(function(d) { return Math.floor(d ); });

          scope.delayRatioChart = dc.barChart('#delay-ratio-chart', groupName);
          scope.delayRatioChart
            .width(180)
            .height(180)
            .dimension(delayRatio)
            .group(delayRatios)
            .x(d3.scale.linear()
              .domain([0, 24])
              .rangeRound([0, 10 * 24]))
            .brushOn(true);
        }

        FlightInformationService.getDataSet().then(function(flight){

          buildDelayChart(flight, GroupName);
          scope.delayRatioChart.render();
        });

        scope.resetDelayChart = function(){
          scope.delayRatioChart.filterAll(GroupName);
          dc.renderAll(GroupName);
        };
      }
    };
  }]);
