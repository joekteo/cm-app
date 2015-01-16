'use strict';

module.exports = function(app) {
  app.controller('feedController', ['$scope', '$http', function($scope, $http) {
    $scope.displayAllList = false;
    // $scope.displayFeedInputForm = false;

    $scope.displayAllFeeds = function() {
      $http({
        method: 'GET',
        url: 'feed/10/10'
      }).success(function(data) {
        $scope.data = data;
        $scope.displayAllList = true;
      }).error(function() {
        return console.log('unable to find info');
      });
    };

    $scope.addFeed = function(postId, content) {
      $http({
        method: 'POST',
        url: 'post/' + postId,
        data: {cnt: content}
      }).success(function(data) {
        $scope.addData = data;
        // $scope.displayFeedInputForm = true;
      }).error(function() {
        return console.log('unable to add new feed');
      });
    };
  }]);
};
