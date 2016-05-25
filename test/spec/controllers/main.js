'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularCrossfilterApp'));

  var MainCtrl,
    scope,
    FlightInformationService;

  beforeEach(inject(function (_FlightInformationService_, $q) {
    FlightInformationService = _FlightInformationService_;
    var deferred = $q.defer();
    var promise = deferred.promise;
    //spyOn(FlightInformationService, 'getDataSet').andReturn(promise);
    FlightInformationService.getDataSet = jasmine.createSpy("getDataSet() spy").and.returnValue(promise);

  }));
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _UtilService_) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      UtilService: _UtilService_,
      FlightInformationService: FlightInformationService
      // place here mocked dependencies
    });
  }));

  it('should attached chart group to the scope', function() {
    expect(scope.GroupName).toBe('delay-visualization');
  });
  it('should request flight data set from FlightInformationService', function() {
    expect(FlightInformationService.getDataSet).toHaveBeenCalled();
  });
});
