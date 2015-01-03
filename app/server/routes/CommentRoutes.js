'use strict';

var mongoose = require('mongoose');
var Comment = require('../models/CommentModel.js');

module.exports = function(app) {
  //add comment
  app.post('/posts/:post/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      req.post.comments.push(comment);
      req.post.save(function(err, post) {
        if (err) {
          return next(err);
        }
        res.json(comment);
      });
    });
  });

  //load all comments associated with the post
  app.get('/posts/:post', function(req, res) {
    req.post.populate('comments', function(err, post) {
      res.json(post);
    });
  });
};
