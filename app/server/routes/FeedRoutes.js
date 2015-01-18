'use strict';

var Feed = require('../models/FeedModel.js');

module.exports = function(app) {
  //create a new feed and saves to the database
  var time = Date.now();
  app.post('/feed/:title', function(req, res) {
    console.log(req.params.title);
    var feed = new Feed({
      title: req.params.title,
      time: time
    });
    feed.save(function(err, data) {
      if (err) {
        return (err);
      }
      res.json(data);
    });
  });

  //adds a comment to the exact feed
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
  app.get('/feed/:num/:time', function(req, res) {
    Feed
    .find({})
    .where('time').gt(req.params.time)
    .limit(req.params.num)
    .exec(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
};
