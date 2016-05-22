/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('averageDelayChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<h1>{{averageDelay}}%</h1>',
      link: function (scope) {
        var GroupName = 'marker-select';

        function buildAverageDelay(flight, groupName) {

          function updateAverageDelayRatio(){
            var delayRatio = flight.dimension(function(d) { return d.delayRatio; }),
              delayRatioGroup = delayRatio.group();

            //todo debug this wrong code
            reductio().avg(function(d){return +d.delayRatio})(delayRatioGroup);
            scope.averageDelay = delayRatioGroup.top(1)[0].value.avg /100;
          }

          updateAverageDelayRatio();

          var originListChart = {
            render: updateAverageDelayRatio,
            redraw: updateAverageDelayRatio
          };
          dc.registerChart(originListChart, groupName);
        }

        FlightInformationService.getDataSet().then(function(flight){
          buildAverageDelay(flight, GroupName);
        });

      }
    };
  }]);
