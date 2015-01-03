'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: String,
  message: String,
  upvotes: {type: Number, default: 0},
  post: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('Comment', CommentSchema);
