'use strict';

var mongoose = require('mongoose');
var Feed = require('../models/FeedModel.js');

module.exports = function(app) {

  //create a new post and saves to the database
  app.post('/feed/:ref/:titleID', function(req, res) {
    var feed = new Feed({
      parent: req.params.ref,
      title: req.params.titleID,
      content: req.body.cnt,
      comment: req.body.comment
    });
    feed.save(function(err, data) {
      if (err) {
        return (err);
      }
      res.json(data);
    });
  });

  //adds a comment to the exact post
  app.post('/comments/:titleID/', function(req, res) {
    Feed
    .findOne({id: req.params._id})
    .exec(function(err, feed) {
      feed.addResource({
        author: req.body.author,
        content: req.body.cnt
      });
      feed.save(function(err, data) {
        if (err) return res.status(500).send('there was an error');
        res.json(data);
      });
    });
  });

  // get all feed
  app.get('/feed/:ref'), function(req, res) {
    Feed.find({ parent: req.params.ref }, function (err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  };
};
