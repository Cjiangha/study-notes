//该文件的作用：写任务，在命令行执行任务就可以进行自动化的构建了
//https://www.cnblogs.com/2050/p/4198792.html
/*
 task（） 布置任务

	三个参数：

	第一个参数：任务名称  默认任务 default

	第二个参数：该任务依赖的其他任务，是一个数组（可选）

	第三个参数：任务回调函数（任务执行）
 */

let gulp = require('gulp');

var minifyhtml = require('gulp-htmlmin');

gulp.task('htmlmin', function () {
	var options = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	};
	return gulp.src('src/html/*.html')
		.pipe(minifyhtml(options))
		.pipe(gulp.dest('dist/html'));
});


//2.压缩css
var minifycss = require('gulp-cssmin');

gulp.task('cssmin', function () {
	return gulp.src('src/css/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});

//4.压缩js
var minifyjs = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('jsmin', function () {
	return gulp.src('src/js/*.js')
		.pipe(babel({//es6转es5
			'presets': ['es2015']
		}))
		.pipe(minifyjs())//压缩js
		.pipe(gulp.dest('dist/js'));//ES6不能直接压缩，需要先转成es5
});


//5.ES6转成ES5

gulp.task('babel', function () {
	return gulp.src('src/js/*.js')
		.pipe(babel({
			'presets': ['es2015']
		}))
		.pipe(gulp.dest('dist/js'));//ES6不能直接压缩，需要先转成es5
});
