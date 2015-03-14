'use strict';
var page = require('visionmedia/page.js');
var getMainContent = require('./getmaincontent.js');

module.exports = function blogPost(ctx, next) {

  var filePath = ctx.pathname;

  if (ctx.state.filePath) {
    ctx.blogpost = ctx.state.filePath;
    next();
    console.log('is chaced');
  }

  else {
    getMainContent(filePath);
    console.log('Loading file', filePath);
  }

};
