var request = require('visionmedia/superagent');
var page = require('visionmedia/page.js');

var hallo = require('./js-modules/hallo.js');
var hyphenate = require('./js-modules/hyper.js');

new hyphenate( 'p, ul, ol', 'id' );
