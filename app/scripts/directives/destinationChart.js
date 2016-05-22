/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('destinationChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<select><option ng-repeat="destination in DestinationList" ng-click="selectDestination(destination)">' +
      '{{destination}}</option></select>' +
      '<a class="reset" ng-click="resetDestinationChart()">reset</a>',
      link: function (scope) {
        var GroupName = 'marker-select';

        function buildDestinationSelector(flight, groupName) {
          var destination = flight.dimension(function(d) { return  d.dest; }),
            destinationGroup = destination.group();

          scope.selectDestination = function (destinationId) {
            destination.filter(function (d) {
              return d === destinationId;
            });
            dc.renderAll(groupName);
          };

          scope.DestinationList = _.sortedUniq(_.map(destinationGroup.top(292),'key'));  //Todo compute with crossfilter

          var destinationListChart = {
            render: function () {
              //Todo: update scope.DestinationList
            },
            redraw: function () {
              //Todo: update scope.DestinationList
            }
          };
          dc.registerChart(destinationListChart, GroupName);


          scope.resetDestinationChart = function(){
            destination.filterAll(GroupName);
            dc.renderAll(GroupName);
          };

        }

        FlightInformationService.getDataSet().then(function(flight){

          buildDestinationSelector(flight, GroupName);
        });


      }
    };
  }]);
