'use strict';
var page = require('visionmedia/page.js');
var getMainContent = require('./getmaincontent.js');

module.exports = function blogs(ctx, next) {



  if (ctx.state.blog) {
    
    next();
  }
  else {
    console.log('this is blogs');
    var blogIndex = ctx.pathname;
    ctx.state.blog = getMainContent(blogIndex);
    ctx.save();
    next();
  }
};
