var gulp = require('gulp');
var uglify = require('gulp-uglify'); // 난독화 하기 //js 파일을 압축을 시켜서 빠른 전송을 용이케 한다.

gulp.task('default', function() {
  console.log("Gulp야 안녕 ? ^^;  ")
  gulp.src('js/*.js')
  	.pipe(uglify())
  	.pipe(gulp.dest('build/js')); //.pipe 로 작업을 연결하면서 .dest로 목적지를 설정
});
