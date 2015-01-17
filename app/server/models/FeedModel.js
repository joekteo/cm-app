'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema ({
  title: String,
  comment: [Schema.Types.Mixed]
});

FeedSchema.methods.addComments = function(obj) {
  this.comment.push(obj);
};

module.exports = mongoose.model('Feed', FeedSchema);
