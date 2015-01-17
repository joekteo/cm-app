'use strict';

module.exports = function(app) {
  app.controller('feedController', ['$scope', '$http', function($scope, $http) {
    $scope.displayAllList = false;
    // $scope.displayFeedInputForm = false;

    $scope.addFeed = function(postId, content) {
      $http({
        method: 'POST',
        url: 'post/' + postId,
        data: {title: content}
      }).success(function(data) {
        $scope.addData = data;
        // $scope.displayFeedInputForm = true;
      }).error(function() {
        return console.log('unable to add new feed');
      });
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
  }]);
};
