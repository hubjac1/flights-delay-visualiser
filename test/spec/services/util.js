'use strict';

describe('Util service', function () {

  beforeEach(module('angularCrossfilterApp'));

  var UtilService;


  // Initialize 
  beforeEach(inject(function (_UtilService_) {
    UtilService = _UtilService_;
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UtilService.flightDelay).toBe('data/FlightDelays.csv');
  });
});
