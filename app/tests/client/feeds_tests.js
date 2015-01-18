'use strict';

require('../../public/app');
require('angular-mocks');

describe('feedController', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('cmApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var feedController = $controllerConstructor('feedController', {$scope: $scope});
    expect(typeof feedController).toBe('object');
  });

  describe('rest request', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
