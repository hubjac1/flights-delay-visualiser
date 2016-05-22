'use strict';

describe('Flight information service', function () {

  beforeEach(module('angularCrossfilterApp'));

  var UtilService;


  // Initialize
  beforeEach(inject(function (_FlightInformationService_) {
    UtilService = _FlightInformationService_;
  }));

  it('should return date getFlightDate(2016-01-24, 1230)', function () {
    expect(UtilService.getFlightDate('2016-01-24', '1230')).toEqual(new Date(2016, 0, 24, 12, 30) );
  });
});
