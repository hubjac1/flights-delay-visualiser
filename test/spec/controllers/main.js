'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularCrossfilterApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _UtilService_) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      UtilService: _UtilService_
      // place here mocked dependencies
    });
  }));
  
  it('should attach a reset origin chart to scope', function () {
    expect(scope.resetOriginChart).toBeDefined();
  });
  it('should attach a reset destination chart to scope', function () {
    expect(scope.resetDestinationChart).toBeDefined();
  });
});
