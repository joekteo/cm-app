'use strict';

require('../../../app/public/app.js');
require('angular-mocks');

describe('feedController', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var expect;

  it('should be able to create a controller', function() {
    var feedController = $controllerConstructor('feedController', {$scope: $scope});
    expect(typeof feedController).toBe('object');
  });

  it('should save a new feed', function() {
    var time = Date.now();
    $httpBackend.expectPOST('/feed/:title').respond(200, {title: 'test title', time: time});
    $controllerConstructor('feedController', {$scope: $scope});
    $scope.notes = [];
    $scope.newFeed = {feedBody: 'test title'};
    $scope.saveNewFeed();

    $httpBackend.flush();

    expect($scope.feed.length).toBe(1);
    expect($scope.feed[0]).toBe('test title');
    expect($scope.newNote).toBe(null);
  });
});
