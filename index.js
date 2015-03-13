'use strict';

var page = require('visionmedia/page.js');
var request = require('visionmedia/superagent');



// define routes path
var notFound = require('./src/js_modules/notFound.js');

// Define routes function
page('/', home);
page('/blogs', blogs);
page('/about', about);
page('*', notFound);
page({hashbang: true});


function home(){
  console.log('this is home');
}

function blogs() {
  console.log('this is blogs');
}

function about() {
  console.log('this is about');
}
