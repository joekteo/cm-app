'use strict';

module.exports = function(app) {
  app.controller('feedController', ['$scope', '$http', function($scope, $http) {
    $scope.displayAllList = false;
    // $scope.displayFeedInputForm = false;

    $scope.addFeed = function(title) {
      // console.log(title);
      $http({
        method: 'POST',
        url: 'feed/' + title
      }).success(function(data) {
        console.log(data);
        $scope.addData = data;
        // $scope.displayFeedInputForm = true;
      }).error(function(err) {
        console.log(err);
        return console.log('unable to add new feed');
      });
      $scope.displayAllFeeds();
    };

    $scope.addComment = function(postId, comment) {
      $http({
        method: 'POST',
        url: 'comments' + postId,
        data: {comment: comment}
      }).success(function(data) {
        $scope.addComment = data;
      }).error(function() {
        return console.log('unable to add new comment');
      });
    };

    $scope.displayAllFeeds = function() {
      var pastTime = Date.now() - (10 * 60 * 1000);
      $http({
        method: 'GET',
        url: 'feed/50/' + pastTime
      }).success(function(allFeeds) {
        console.log($scope.allFeeds);
        $scope.allFeeds = allFeeds;
        $scope.displayAllList = true;
      }).error(function(err) {
        return console.log(err);
      });
    };
  }]);
};
