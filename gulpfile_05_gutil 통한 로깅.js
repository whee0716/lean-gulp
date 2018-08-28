var gulp = require('gulp');




//05. g-util을 통한 로깅
var gutil = require('gulp-util');
gulp.task('loggingtest', function(){
	gutil.log('stuff happened', 'Really it did', gutil.colors.yellow('123')); //1. 로깅을 하면서 컬러 지정
	gutil.beep();

	var newPath = gutil.replaceExtension('sample.txt', '.js'); // file.js
	gutil.log("replaceExtension : ", newPath);

	var opt = {
	  name: 'todd',
	  file: 'js/testUglify.js'
	};
	var tester = gutil.template('test : <%= name %> , file: <%= file %>', opt) // 2. 확장자 변경하여 반환함
	gutil.log("template : ", gutil.colors.red(tester)); //red
});


// 04. CSS 최소화
var minifyCss = require('gulp-minify-css');
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

//03. 다른 task
gulp.task('hello', function(){
	console.log("그냥 인사 한번 해봤어요..")
})

// 02. 난독화
var uglify = require('gulp-uglify');
gulp.task('scripts', function(){
	gulp.src('js/*.js')
  	.pipe(uglify())
  	.pipe(gulp.dest('build/js'));
});


gulp.task('default', ['scripts', 'hello']);

