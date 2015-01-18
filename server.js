'use strict';

var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var uriUtil     = require('mongodb-uri');
var options     = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
var mongodbUri  = process.env.MONGOLAB_URI;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(process.env.MONGO_URL || mongooseUri || 'mongodb://localhost/cm_development', options);
app.use(bodyParser.json());

app.use(express.static(__dirname + '/build/'));

require('./app/server/routes/FeedRoutes.js')(app);

app.listen(port);
console.log('Server started on port: %d', port);
