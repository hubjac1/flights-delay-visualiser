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

    var getFlightDate  = function (flightDate) {
      return  new Date(
        flightDate.substring(0, 4),
        flightDate.substring(5, 7) -1,
        flightDate.substring(8, 10)
      )
    };

    return {
      flightDelay : 'data/FlightDelays.csv',
      getFlightDate: getFlightDate
    }
  });
