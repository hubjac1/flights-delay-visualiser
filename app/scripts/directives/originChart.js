/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('originChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<select><option ng-repeat="origin in OriginList" ng-click="selectOrigin(origin)">' +
      '{{origin}}</option></select>' +
      '<a class="reset" ng-click="resetOriginChart()">reset</a></div>',
      link: function (scope) {
        var GroupName = 'marker-select';

        function buildOriginSelector(flight, groupName) {
          var origin = flight.dimension(function(d) { return  d.origin; }),
            originGroup = origin.group();

          scope.selectOrigin = function (originId) {
            origin.filter(function (d) {
              return d === originId;
            });
            dc.renderAll(groupName);
          };

          scope.OriginList = _.sortedUniq(_.map(originGroup.top(292),'key'));  //Todo compute with crossfilter

          var originListChart = {
            render: function () {
              //Todo: update scope.OriginList
            },
            redraw: function () {
              //Todo: update scope.OriginList
            }
          };
          dc.registerChart(originListChart, GroupName);

          scope.resetOriginChart = function(){
            origin.filterAll(GroupName);
            dc.renderAll(GroupName);
          };
        }

        FlightInformationService.getDataSet().then(function(flight){

          buildOriginSelector(flight, GroupName);
        });

      }
    };
  }]);
