var watch = require('node-watch');
var livereload = require('gulp-livereload');

livereload.listen();

watch('./client/bundle.js', function (filename) {
  livereload.changed();
});
