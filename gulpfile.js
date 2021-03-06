var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsfiles = ['*.js', 'src/**/*.js'];
var nodemon = require('gulp-nodemon');


gulp.task('style', function (){


return   gulp.src(jsfiles)
 .pipe(jshint())
.pipe(jshint.reporter('jshint-stylish', {
  verbose: true
}))
.pipe(jscs());

});

gulp.task('inject', function(){
  var inject = require('gulp-inject');
  var injectsrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read:false});
  var injectoptions ={
    ignorePath: '../../public'
  };
  var wiredep = require('wiredep').stream;
  var options = {
    bowerJson: require('./bower.json'),
    directory: ('./public/lib/'),
    ignorePath:('../../public')
  };
  return gulp.src('./src/views/*.html')
  .pipe(wiredep(options))
  .pipe(inject(injectsrc, injectoptions))
  .pipe(gulp.dest('./src/views'));

});


gulp.task('serve', ['style', 'inject'], function (){

  var options = {
    script: 'app.js',
    delayTime : 1,
    env: {
      'PORT': 5000
    },
    watch: jsfiles
  };
  return nodemon(options)
  .on('restart', function(ev){
  console.log('restarting');

  });
});
