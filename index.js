var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdownit'),
    suit = require('metalsmith-suitcss'),
    myth = require('metalsmith-myth'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    excerpts = require('metalsmith-excerpts'),
    watch = require('metalsmith-watch'),
    Duo = require('duo'),
    jade = require('jade'),
    templates = require('metalsmith-templates'),
    map = require('map-stream'),
    only = require('metalsmith-only-build');
/**
 * Bulid
 */

Metalsmith(__dirname)
  // create collectons
  .use(collections({
    portfolio: {
      pattern:'contents/portfolio/*.md'
    },
    pages: {
      pattern:'contents/pages/*.md'
    },
    blogs: {
      pattern: 'contents/blogs/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))

  // excerpts first paragraph
  
  
  //covert markdown to html
  .use(markdown({
    typographer: true,
    html: true
  }))

  .use(excerpts())
  

  // create permalinks
  .use(permalinks({
    pattern: ':collection/:title'
  }))

  // render html
  .use(templates({
    engine: 'jade'
  }))

  // css preprocessor
  .use(myth())

  // watch file
  .use(watch())

  // Build only changed file
  .use(only())


  // build
  .build(function(err){
    if (err) throw err;
  });




duo = function() {


  return function (files, metalsmith, done) {
    // body...



  done();
  };
}


function duo(opts) {
  opts = opts || {};

  return map(function(file, fn) {
    Duo(file.base)
      .entry(file.path)
      .run(function(err, src) {
        if (err) return fn(err);
        file.contents = new Buffer(src);
        fn(null, file);
      });
  });
}

duo()