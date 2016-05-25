/**
 * Created by huj on 22/05/16.
 */
'use strict';

angular.module('angularCrossfilterApp')
  .service('FlightInformationService', ['UtilService', '$q', function (UtilService, $q) {

    var getFlightDate  = function (flightDate, crs) {
      return  new Date(
        flightDate.substring(0, 4),
        flightDate.substring(5, 7) -1,
        flightDate.substring(8, 10),
        crs.substring(0, 2),
        crs.substring(2,4)
      );
    };

    var preProcessing = function(source) {
      return $q(function(resolve) {
        d3.csv(source, function (error, flights) {
          flights.forEach(function (d, i) {
            d.index = i;
            d.date = getFlightDate(d.fl_date, d.crs_dep_time);
            d.delay = d.arr_delay;
            d.delayRatio = d.crs_elapsed_time !== 0 ? (d.arr_delay / d.crs_elapsed_time)*100 : 0; // prevent divide by 0
          });
          var dataSet = crossfilter(flights);
          resolve(dataSet);
        });
      });
    };
    var preProcess = preProcessing(UtilService.flightDelayPath);


    var getDataSet = function(){
      return $q(function(resolve) {
        preProcess.then(function(dataSet){
          resolve(dataSet);
        });
      });
    };


    return {
      //Public
      getDataSet: getDataSet,

      //Private
      getFlightDate: getFlightDate,
      preProcessing: preProcessing
    };
  }]);
