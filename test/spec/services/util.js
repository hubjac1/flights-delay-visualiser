'use strict';

describe('Util service', function () {

  beforeEach(module('angularCrossfilterApp'));

  var UtilService;


  // Initialize
  beforeEach(inject(function (_UtilService_) {
    UtilService = _UtilService_;
  }));

  it('should serve flightDelay path', function () {
    expect(UtilService.flightDelayPath).toBe('data/FlightDelays.csv');
  });
});
