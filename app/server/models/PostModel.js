'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema ({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

PostSchema.methods.upvote = function(addVote) {
  this.upvotes += 1;
  this.save(addVote);
};

module.exports = mongoose.model('Post', PostSchema);
