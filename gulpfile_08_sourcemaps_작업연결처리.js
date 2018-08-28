var gulp = require('gulp');


//08. sourcemaps로 source map을 지원하는 여러 작업 한번에 처리 //원본소스와 변환된 소스를 맵핑해 주는 방법, 원본소스+최종소스 매핑해서 추적할수 있는 방법임
var sourcemaps = require('gulp-sourcemaps');
gulp.task('sourcemapsTest', function() {
  gulp.src('./concatJs/*.js')
    .pipe(sourcemaps.init())
	  .pipe(concat('daehanmingukmanseVersion2.js')) //파일연경 //*init 과 write 사이에 플러그인 명령을 써주면 된다.
      .pipe(uglify()) //난독화 후 
      .pipe(rename('daehanmingukmanse.min.js')) // 이름 변경
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
/*
*
{ //소스맵 파일은 JSON 형식으로 되어있음
  version : 3, // 소스 맵 버전을 의미 하고, 항상 제일 먼저 나와야 됨
  file: “out.js”, // 파일은 변환된 파일명
  sourceRoot : "", // 옵션값으로 소스 파일을 가져올 경로의 루트를 재조정하는데 사용
  sources: ["foo.js", "bar.js"], // mappings에서 사용할 원본 소스 파일의 배열
  sourcesContent: [null, null], // 옵션값으로 소스의 내용을 담고, sources 의 파일명으로 파일을 가져오지 못했을때 사용하는 용도, null 로 지정하면 반드시 소스 파일이 필요함
  names: ["src", "maps", "are", "fun"], //mappings 에서 사용할 심볼 이름
  mappings: "AA,AB;;ABCDE;" mappings는 인코딩된 매핑 데이터의 문자열임

  참고 링크 : http://blog.outsider.ne.kr/916
}
*
* */



// 07. rename 을 통한 이름변경
var rename = require("gulp-rename");
gulp.task('renameTest', function(){
  return gulp.src("sample.txt")
  .pipe(rename("renameText.txt"))
  .pipe(gulp.dest("./dist")); // dist에 복사됨
})



//06. concat 으로 js파일 연결
var concat = require('gulp-concat');
gulp.task('concatTest', function() {
  //return gulp.src(['./concatJs/concat01.js', './concatJs/concat02.js', './concatJs/concat03.js']) 하나씩 해줄려면 이렇게
  return gulp.src('./concatJs/*.js')
    .pipe(concat('daehanmingukmanse.js'))
    .pipe(gulp.dest('./dist/'));
});



//05. gutil을 통한 로깅
var gutil = require('gulp-util');
gulp.task('loggingtest', function(){
	gutil.log('stuff happened', 'Really it did', gutil.colors.yellow('123')); //주석
	gutil.beep();

	var newPath = gutil.replaceExtension('sample.txt', '.js'); // file.js
	gutil.log("replaceExtension : ", newPath);

	var opt = {
	  name: 'todd',
	  file: 'js/testUglify.js'
	};
	var tester = gutil.template('test : <%= name %> , file: <%= file %>', opt) // test todd /js/hi.js
	gutil.log("template : ", gutil.colors.red(tester));
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

// 01. 헬로월드를 했었었음 gulpfile_01_헬로월드.js 참고


gulp.task('default', ['scripts', 'hello']);

