var gulp = require('gulp'),
	sass = require('gulp-sass'),
	runSequence = require('run-sequence'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require("gulp-rename"),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    uncache = require('gulp-uncache'),
    concat = require('gulp-concat'),
    del = require('del'),
		browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {
	
    browserSync.init({
        open: true,        
        server: {
            baseDir: "src/main/resources",
            port:3000,
            middleware: function (req, res, next) {
	            res.setHeader('Access-Control-Allow-Origin', '*');
	            next();
	        }
        }
    });
    
});




gulp.task('sass', function() {
  return gulp.src('src/main/resources/static/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('src/main/resources/static/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});



gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/main/resources/static/scss/**/*.scss', ['sass']);   
  gulp.watch('src/main/resources/static/**/*.html', browserSync.reload); 
  gulp.watch('src/main/resources/static/js/**/*.js', browserSync.reload); 
});





/**
 * Task clean
 * removes the build dir before new build starts
 */

gulp.task('clean', function(cb) {
	console.log('clean start');
  return del(['./src/main/resources/public/'], cb);
  console.log('clean end');
  
});


/**
 * copy folders: fonts, i18n, images, views to dist
 */

gulp.task('copyFolders', function(cb) {
	var htmlFilter = filter("**/*.html");
	console.log('copyFolders start');
		gulp.src('./src/main/resources/static/fonts/glyphicons-halflings-regular.*')
		  .pipe(gulp.dest('./src/main/resources/public/fonts'));
		gulp.src('./src/main/resources/static/i18n/**/*.json')
		  .pipe(gulp.dest('./src/main/resources/public/i18n'));
		gulp.src('./src/main/resources/static/images/**/*.png')
		  .pipe(gulp.dest('./src/main/resources/public/images'));
		gulp.src('./src/main/resources/static/images/**/*.jpg')
		  .pipe(gulp.dest('./src/main/resources/public/images'));
		gulp.src('./src/main/resources/static/views/*.html')
		  .pipe(gulp.dest('./src/main/resources/public/views'));
	console.log('copyFolders end');
});



gulp.task('html', function () {
		console.log('html start');
    return gulp.src('./src/main/resources/static/*.html')
        .pipe(useref())
        //.pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(uncache())
        .pipe(gulp.dest('./src/main/resources/public'));
        
    console.log('html end');

});



gulp.task('runDev', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});





gulp.task('deploy', function (callback) {
  runSequence(['copyFolders', 'html'],
    callback
  )
});



