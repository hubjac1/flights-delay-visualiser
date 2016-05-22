'use strict';

/**
 * @ngdoc directive
 * @name angularCrossfilterApp.directive:dayChart
 * @description
 * # dayChart
 */
angular.module('angularCrossfilterApp')
  .directive('dayChart', ['FlightInformationService', function (FlightInformationService) {
    return {
      template: '<div id="day-chart" class="chart">' +
        '<a class="reset" ng-click="resetDayChart()">reset</a></div>',
      restrict: 'E',
      link: function postLink(scope) {
        var GroupName = 'marker-select';

        function buildDayChart(flight, groupName){
          var dayOfWeek = flight.dimension(function (d) {
            var day = d.date.getDay();
            var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return day + '.' + name[day];
          });
          var dayOfWeekGroup = dayOfWeek.group();

          scope.dayChart = dc.rowChart('#day-chart', groupName);
          scope.dayChart
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

        FlightInformationService.getDataSet().then(function(flight){

          buildDayChart(flight, GroupName);
          scope.dayChart.render();
        });


        scope.resetDayChart = function(){
          scope.dayChart.filterAll(GroupName);
          dc.renderAll(GroupName);
        };

      }
    };
  }]);
