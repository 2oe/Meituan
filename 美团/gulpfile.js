// 引入模块
var gulp = require('gulp');
var sass = require('gulp-sass');
var sequence = require('gulp-sequence');
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./data');
var querystring = require('querystring');
// devsass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android > 4.0']
        }))
        .pipe(gulp.dest('src/css'));
})

// 监听watch
gulp.task('watch', function() {
    return gulp.watch('src/scss/*.scss', ['sass']);
})

// dev创建服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8989,
            open: true,
            middleware: function(req, res, next) {
                req.url = querystring.unescape(req.url);
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return;
                }
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(data(req.url)));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

// build sass
gulp.task('buildSass', function() {
        return gulp.src('src/scss/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android > 4.0']
            }))
            .pipe(gulp.dest('build/css'));
    })
    // 监听watch
gulp.task('buildWatch', function() {
        return gulp.watch('build/scss/*.scss', ['buildSass']);
    })
    // build uglify
gulp.task('uglify', function() {
    return gulp.src('src/js/**/*js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
})

// build html
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'));
})

// build swiper
gulp.task('swiper', function() {
    return gulp.src('src/js/**/*css')
        .pipe(gulp.dest('build/js'));
})

// build img
gulp.task('img', function() {
    return gulp.src('src/img/*.{jpg,png}')
        .pipe(gulp.dest('build/img'));
})

// build server

gulp.task('buildServer', function() {
    return gulp.src('build')
        .pipe(server({
            port: 8989,
            open: true,
            middleware: function(req, res, next) {
                req.url = querystring.unescape(req.url);
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return;
                }
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(data(req.url)));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)));
                }
            }
        }))
})

// dev
gulp.task('dev', function(cb) {
    sequence('sass', 'watch', 'server', cb);
})

// build
gulp.task('build', function(cb) {
    sequence('buildSass', 'buildWatch', 'uglify', 'img', 'swiper', 'html', 'buildServer', cb);
})