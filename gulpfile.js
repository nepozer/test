const {src, dest, watch, parallel} = require('gulp');


const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();

function styles (){
    return src('page/scss/main.scss')
    .pipe(concat('main.min.css'))
            .pipe(scss({outputStyle: 'compressed'}))
            .pipe(dest('page/css'))
            .pipe(browserSync.stream());
}


function scripts (){
    return src('page/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('page/js'))
    .pipe(browserSync.stream());
}

function watching () {
    watch(['page/scss/main.scss'], styles);
    watch(['page/js/main.js'], scripts);
    watch(['page/*.html']).on('change', browserSync.reload);
}

function browsersync (){
    browserSync.init({
        server: {
            baseDir: "page/"
        }
    });
}
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;


exports.default = parallel(styles, scripts, browsersync, watching)