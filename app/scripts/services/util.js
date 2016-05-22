/**
 * Created by huj on 22/05/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name angularCrossfilterApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularCrossfilterApp
 */
angular.module('angularCrossfilterApp')
  .service('UtilService', function () {
    
    return {flightDelay : 'data/FlightDelays.csv'}
  });
