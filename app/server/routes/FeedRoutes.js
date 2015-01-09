'use strict';

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
      feed.addComments({
        author: req.body.author,
        content: req.body.cnt
      });
      feed.save(function(err, data) {
        if (err) return res.status(500).send('there was an error');
        res.json(data);
      });
    });
  });

  //gets all feeds
  app.get('/feed/:ref/:numPosts', function(req, res) {
    Feed
    .where('parent').equals(req.params.ref)
    .limit(req.params.numPosts)
    .exec(function(err, results) {
      if (err) return res.status(500).send('there was an error');
      if (!results) return res.status(200).send('no data');
      if (results) res.json(results);
    });
  });
};
