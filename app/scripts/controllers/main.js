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

    //var GroupName = 'marker-select';

    FlightInformationService.getDataSet().then(function(flight) {

      //dc.renderAll(GroupName);
    });
    
  }]);
