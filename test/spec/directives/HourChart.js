'use strict';

describe('Directive: hourChart', function () {

  // load the directive's module
  beforeEach(module('angularCrossfilterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hour-chart></hour-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('reset');
  }));
  it('should attach a reset hour chart to scope', inject(function ($compile) {
    element = angular.element('<hour-chart></hour-chart>');
    element = $compile(element)(scope);
    expect(element.scope().resetHourChart).toBeDefined();
  }));
});
