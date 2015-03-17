var Duo = require ('duo');
var gulp = require ('gulp');
var myth = require ('gulp-myth');
var gulpsmith = require ('gulpsmith');
var map = require ('map-stream');
var collections = require ('metalsmith-collections');
var markdown = require ('metalsmith-markdownit');
var permalinks = require ('metalsmith-permalinks');
var templates = require ('metalsmith-templates');
var gulp_front_matter = require('gulp-front-matter');
var assign = require('lodash.assign');




gulp.task('default',['css','js','metalsmith'])



// error notification
var onError = function (err) {
  gutil.beep();
  console.log(err);
};


gulp.task('css', function() {
  return gulp.src('./asset/index.css')
    //.pipe(plumber())
    .pipe(duo())
    .pipe(myth())
    .pipe(gulp.dest('./build'))
    //.pipe(reload({stream:true}))
});


gulp.task('js', function(){
  return gulp.src('./asset/index.js')
    //.pipe(plumber())
    .pipe(duo())
    .pipe(gulp.dest('./build'))
    //.pipe(reload({stream:true}))
});


gulp.task('metalsmith', function() {
  return gulp.src('./src/**/*')
    //.pipe(plumber())
    //.pipe(newer('./src/content/**/*'))
    .pipe(gulp_front_matter()).on("data", function(file) {
      assign(file, file.frontMatter);
      delete file.frontMatter;
    })
    .pipe(
      gulpsmith()
        .use(collections({
          portfolio: {
            pattern:'portfolio/*.md'
          },
          pages: {
            pattern:'pages/*.md'
          },
          blogs: {
            pattern: 'src/blogs/*.md',
            sortBy: 'date',
            reverse: true
          }
        }))
        .metadata({
          site_name: "My Site"
          })
        .use(markdown({
          'typographer': true,
          'html': true
        }))
        //.use(excerpts())
        .use(permalinks(':post/:title'))

        .use(templates({
          engine: 'jade',
          pretty: true,
          directory: './templates'
        }))
      )
    .pipe(gulp.dest('./build'))
});







// Duo plugin
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
