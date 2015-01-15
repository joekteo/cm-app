'use strict';

require('angular/angular');

var cmApp = angular.module('cmApp', []);

require('./js/controllers/feedController.js')(cmApp);
