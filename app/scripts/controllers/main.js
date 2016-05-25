'use strict';

/**
 * @ngdoc function
 * @name angularCrossfilterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCrossfilterApp
 */
angular.module('angularCrossfilterApp')
  .controller('MainCtrl', [ '$scope', 'UtilService', 'FlightInformationService',function ($scope, UtilService, FlightInformationService) {

    $scope.GroupName = 'delay-visualization';

    FlightInformationService.getDataSet().then(function(flight) {

      //dc.renderAll(GroupName);
    });

  }]);
