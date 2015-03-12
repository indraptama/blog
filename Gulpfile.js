var gulp = require('gulp');
var myth = require('gulp-myth');
var gulpjade = require('gulp-jade');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var duo = require('duo');
var map = require('map-stream');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var markitJSON = require('markit-json');
var gulpsmith = require('gulpsmith');
var _ = require('lodash');
//var jade = require('jade');
var handlebars = require('handlebars');

// metalsmith plugins
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var permalinks  = require('metalsmith-permalinks');
var markdown = require('metalsmith-markdownit');
var gulp_front_matter = require('gulp-front-matter');
var assign = require('lodash.assign');


// Error Notification
var onError = function (err) {
  gutil.beep();
  console.log(err);
};

// Compile CSS
gulp.task('css', function() {
  return gulp.src('index.css')
    .pipe(plumber())
    .pipe(duoTask())
    .pipe(myth())
    .pipe(gulp.dest('./build/public/css'))
    .pipe(reload({stream:true}))
});

// Compile Jade File
gulp.task('gulpjade', function() {
  return gulp.src('*.jade')
    .pipe(plumber())
    .pipe(gulpjade({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(reload({stream:true}))
});

//compile javascript
gulp.task('js', function(){
  return gulp.src('index.js')
    .pipe(plumber())
    .pipe(duoTask())
    .pipe(gulp.dest('./build/public/js'))
    .pipe(reload({stream:true}))
});

// compile metalsmith
gulp.task('metalsmith', function() {
  return gulp.src('./src/content/**/*')
    //.pipe(plumber())
    .pipe(gulp_front_matter()).on("data", function(file) {
      assign(file, file.frontMatter);
      delete file.frontMatter;
    })
    .pipe(
      gulpsmith()
        .use(collections({
          portfolio: {
            pattern:'./portfolio/*.md'
          },
          pages: {
            pattern:'./pages/*.md'
          },
          blogs: {
            pattern: './blog/*.md',
            sortBy: 'date',
            reverse: true
          }
        }))
        .metadata({site_name: "My Site"})
        .use(markdown({
          'typographer': true,
          'html': true
        }))
        .use(templates({
          engine: 'handlebars',
          directory: './src/content/templates/'
        }))
        .use(permalinks('blogs/:title'))
      )
    .pipe(gulp.dest('build/'))
});




// browser sync start server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});


gulp.task('default',['metalsmith','css','js','gulpjade','browser-sync'], function(){
  gulp.watch('*.css', ['css']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('*.jade', ['jade']);
  gulp.watch('./src/layout/**/*.jade', ['jade']);
  gulp.watch('index.js', ['js']);
  gulp.watch('./src/js/**/*.js', ['js']);
}); // gulp task default








// - Duo Function
function duoTask(opts) {
  opts = opts || {};

  return map(function (file, cb) {
    duo(__dirname)
      .entry(file.path)
      .run(function (err, src) {
        if (err) {
          return cb(err);
        }

        file.contents = new Buffer(src);
        cb(null, file);
      });
  });
}
