'use strict';

describe('Util service', function () {

  beforeEach(module('angularCrossfilterApp'));

  var UtilService;


  // Initialize
  beforeEach(inject(function (_UtilService_) {
    UtilService = _UtilService_;
  }));

  it('should serve flightDelay path', function () {
    expect(UtilService.flightDelay).toBe('data/FlightDelays.csv');
  });

  it('should return date getFlightDate(2016-01-24)', function () {
    expect(UtilService.getFlightDate('2016-01-24')).toEqual(new Date(2016, 0, 24) );
  });
});
