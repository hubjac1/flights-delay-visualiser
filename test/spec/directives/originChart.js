'use strict';

describe('Directive: originChart', function () {

  // load the directive's module
  beforeEach(module('angularCrossfilterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<origin-chart></origin-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('reset');
  }));
  it('should attach a reset origin list to scope', inject(function ($compile) {
    element = angular.element('<origin-chart></origin-chart>');
    element = $compile(element)(scope);
    expect(element.scope().resetOriginChart).toBeDefined();
  }));

  it('should attach a selectOrigin to scope', inject(function ($compile) {
    element = angular.element('<origin-chart></origin-chart>');
    element = $compile(element)(scope);
    expect(element.scope().selectOrigin).toBeDefined();
  }));

  it('should attach update list to scope', inject(function ($compile) {
    element = angular.element('<origin-chart></origin-chart>');
    element = $compile(element)(scope);
    expect(element.scope().updateList).toBeDefined();
  }));
});
