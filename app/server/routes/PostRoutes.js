'use strict';

var mongoose = require('mongoose');
var Post = require('../models/PostModel.js');

module.exports = function(app) {
  //get all posts
  app.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
      if (err) {
        return next(err);
      }
      res.json(posts);
    });
  });

  //create a new post and saves to the database
  app.post('/posts', function(req, res, next) {
    var post = new Post(req.body);
    post.save(function(err, post) {
      if (err) {
        return next(err);
      }
      res.json(post);
    });
  });

  //queries by Id
  app.param('post', function(req, res, next, id) {
    var query = Post.findById(id);
    query.exec(function(err, post) {
      if (err) {
        return next(err);
      }
      if (!post) {
        return next(new Error('unable to find post'));
      }

      req.post = post;
      return next();
    });
  });

  //get a single post
  app.get('/posts/:post', function(req, res) {
    res.json(req.post);
  });

  //adds one to upvote
  app.put('/posts/:post/upvote', function(req, res, next) {
    req.post.upvote(function(err, post) {
      if (err) {
        return next(err);
      }
      res.json(post);
    });
  });
};
