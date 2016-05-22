'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularCrossfilterApp'));

  var MainCtrl,
    scope,
    UtilService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _UtilService_) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      UtilService: _UtilService_
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.message).toBe('data/FlightDelays.csv');
  });
});
