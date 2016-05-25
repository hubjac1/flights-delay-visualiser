'use strict';

describe('Directive: destinationChart', function () {

  // load the directive's module
  beforeEach(module('angularCrossfilterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<destination-chart></destination-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('reset');
  }));
  it('should attach a reset destination list to scope', inject(function ($compile) {
    element = angular.element('<destination-chart></destination-chart>');
    element = $compile(element)(scope);
    expect(element.scope().resetDestinationChart).toBeDefined();
  }));

  it('should attach a selectDestination to scope', inject(function ($compile) {
    element = angular.element('<destination-chart></destination-chart>');
    element = $compile(element)(scope);
    expect(element.scope().selectDestination).toBeDefined();
  }));

  it('should attach update list to scope', inject(function ($compile) {
    element = angular.element('<destination-chart></destination-chart>');
    element = $compile(element)(scope);
    expect(element.scope().updateList).toBeDefined();
  }));
});
