/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('destinationChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<form><select  ng-model="selectedDestination" ng-change="selectDestination(selectedDestination)"><option ng-repeat="dest in DestinationList">' +
      '{{dest}}</option></select>' +
      '<a class="reset" ng-click="resetDestinationChart()">reset</a></form>',
      link: function (scope) {
        var GroupName = 'marker-select';

        function buildDestinationSelectorGroup(flight){
          var init = function (){
            return {
              destList: ['']
            };
          };

          var add = function(group, flight){
            group.destList = _.union(group.destList, [flight.dest]);
            return group;
          };

          var remove = function(group, flight){
            group.destList = _.difference(group.destList, [flight.dest]);
            return group;
          };

          return flight.groupAll().reduce(add, remove, init);
        }

        function buildDestinationSelector(flight, groupName) {
          scope.dest = flight.dimension(function(d) { return  d.dest; });
          var destGroup = buildDestinationSelectorGroup(flight);

          scope.DestinationList = destGroup.value().destList;

          var destListChart = {
            render: function () {
              scope.DestinationList = destGroup.value().destList;
            },
            redraw: function () {
              scope.DestinationList = destGroup.value().destList;
            }
          };
          dc.registerChart(destListChart, groupName);
        }

        scope.selectDestination = function (destId) {
          scope.dest.filter(function (d) {
            return d === destId;
          });
          dc.renderAll(GroupName);
        };
        scope.resetDestinationChart = function(){
          scope.dest.filterAll(GroupName);
          dc.renderAll(GroupName);
        };

        FlightInformationService.getDataSet().then(function(flight){

          buildDestinationSelector(flight, GroupName);
        });

      }
    };
  }]);
