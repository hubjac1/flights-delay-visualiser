/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('averageDelayChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<strong><span id="delay-average"> </span>%</strong></span>',
      link: function (scope) {
        var GroupName = 'marker-select';

        var buildAverageDelayGroup = function (flight) {

          var addFlight = function (flightInfo, flight) {
            flightInfo.nbrFlight++;
            flightInfo.totalDelayRatio = flightInfo.totalDelayRatio + flight.delayRatio;
            if (flight.delayRatio !== undefined) {
              flightInfo.delays.push({index: flight.index, delayRatio: flight.delayRatio});
            }

            return flightInfo;
          };

          var removeFlight = function (flightInfo, flight) {
            flightInfo.nbrFlight--;
            flightInfo.totalDelayRatio = flightInfo.totalDelayRatio - flight.delayRatio;
            flightInfo.delays = _.difference(flightInfo.delayRatio, [_.find(flightInfo.delayRatio, {index: flight.index})]);

            return flightInfo;
          };

          var initFlightInfo = function () {
            var flightInfo = {
              nbrFlight: 0,
              totalDelayRatio: 0,
              delays: []
            };

            flightInfo.delayAverage = function () {
              return this.nbrFlight !== 0 ? 1.0 * this.totalDelayRatio / this.nbrFlight : 0;
            };
            return flightInfo;
          };

          return flight.groupAll().reduce(addFlight, removeFlight, initFlightInfo);
        };

        var buildAverageDelayChart = function (flight, averageDelayGroup, groupName) {
          // Display average of flight delay
          scope.averageDelayChart = dc.numberDisplay('#delay-average', groupName)
            .group(averageDelayGroup)
            .formatNumber(d3.format('.1f'))
            .valueAccessor(function (flightInfo) {
            return flightInfo.delayAverage();
          });
        };

        FlightInformationService.getDataSet().then(function (flight) {
          var averageDelayGroup = buildAverageDelayGroup(flight);
          buildAverageDelayChart(flight, averageDelayGroup, GroupName);
          scope.averageDelayChart.render();
        });
      }
    };
  }]);
