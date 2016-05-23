/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .directive('originChart', ['FlightInformationService', function (FlightInformationService) {

    return {
      restrict: 'E',
      template: '<form><select  ng-model="selectedOrigin" ng-change="selectOrigin(selectedOrigin)"><option ng-repeat="origin in OriginList">' +
      '{{origin}}</option></select>' +
      '<a class="reset" ng-click="resetOriginChart()">reset</a></form>',
      link: function (scope) {
        var GroupName = 'marker-select';

        function buildOriginSelectorGroup(flight){
          var init = function (){
            return {
              originList: ['']
            };
          };

          var add = function(group, flight){
            group.originList = _.union(group.originList, [flight.origin]);
            return group;
          };

          var remove = function(group, flight){
            group.originList = _.difference(group.originList, [flight.origin]);
            return group;
          };

          return flight.groupAll().reduce(add, remove, init);
        }

        function buildOriginSelector(flight, groupName) {
          scope.origin = flight.dimension(function(d) { return  d.origin; });
          var originGroup = buildOriginSelectorGroup(flight);

          scope.OriginList = originGroup.value().originList;

          var originListChart = {
            render: function () {
              scope.OriginList = originGroup.value().originList;
            },
            redraw: function () {
              scope.OriginList = originGroup.value().originList;
            }
          };
          dc.registerChart(originListChart, groupName);
        }

        scope.selectOrigin = function (originId) {
          scope.origin.filter(function (d) {
            return d === originId;
          });
          dc.renderAll(GroupName);
        };
        scope.resetOriginChart = function(){
          scope.origin.filterAll(GroupName);
          dc.renderAll(GroupName);
        };

        FlightInformationService.getDataSet().then(function(flight){

          buildOriginSelector(flight, GroupName);
        });

      }
    };
  }]);
