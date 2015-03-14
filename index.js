'use strict';

var page = require('visionmedia/page.js');
var request = require('visionmedia/superagent');
var getMainContent = require('./src/js_modules/getmaincontent.js');


// define routes path
var notFound = require('./src/js_modules/notFound.js');
var home = require('./src/js_modules/home');
var blogs = require('./src/js_modules/blogs');
var blogPost = require('./src/js_modules/blogpost');
var about = require('./src/js_modules/about');


// create routes
page('/', home);
page('/blogs', blogs);
page('/blogs/:blogpost', blogPost);
page('/about', about);
page('*', notFound);
page({hashbang: false});
