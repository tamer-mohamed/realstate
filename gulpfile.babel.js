import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import ghPages from 'gulp-gh-pages';

const paths = {
  bundle: 'app.js',
  entry: 'src/Index.js',
  srcCss: 'src/**/*.scss',
  srcImg: 'src/images/**',
  srcLint: ['src/**/*.js', 'test/**/*.js'],
  srcTheme: 'src/theme/**/*',
  srcFonts: 'src/fonts/**/*',
  srcThemeJs: 'src/themejs/**/*',
  srcLocales: 'src/locales/**',
  dist: 'dist',
  distJs: 'dist/js',
  distImg: 'dist/images',
  distDeploy: './dist/**/*',
  distTheme: './dist/theme',
  distFonts: './dist/fonts',
  distThemeJs: './dist/themejs',
  distLocales: 'dist/locales',

};

const customOpts = {
  entries: [paths.entry],
  debug: true,
  cache: {},
  packageCache: {}
};

const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('clean', cb =>{
  rimraf('dist', cb);
});

gulp.task('browserSync', () =>{
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watchify', () =>{
  const bundler = watchify(browserify(opts));

  function rebundle(){
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(babelify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', () =>{
  browserify(paths.entry, {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs));
});

gulp.task('styles', () =>{
  gulp.src(paths.srcCss)
    .pipe(rename({extname: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist))
    .pipe(reload({stream: true}));
});

gulp.task('htmlReplace', () =>{
  gulp.src('index.html')
    .pipe(htmlReplace({css: 'styles/main.css', js: 'js/app.js'}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:theme', () =>{
  gulp.src(paths.srcTheme)
    .pipe(gulp.dest(paths.distTheme));
});

gulp.task('copy:fonts', () =>{
  gulp.src(paths.srcFonts)
    .pipe(gulp.dest(paths.distFonts));
});

gulp.task('copy:themeJs', () =>{
  gulp.src(paths.srcThemeJs)
    .pipe(gulp.dest(paths.distThemeJs));
});

gulp.task('locales', () =>{
  gulp.src(paths.srcLocales)
    .pipe(gulp.dest(paths.distLocales));
});

gulp.task('images', () =>{
  gulp.src(paths.srcImg)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', () =>{
  gulp.src(paths.srcLint)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watchTask', () =>{
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcLint, ['lint']);
});

gulp.task('deploy', () =>{
  gulp.src(paths.distDeploy)
    .pipe(ghPages());
});

gulp.task('watch', cb =>{
  runSequence('clean', ['browserSync', 'watchTask', 'copy:theme', 'copy:fonts', 'copy:themeJs', 'watchify', 'styles', 'lint', 'images'], cb);
});

gulp.task('build', cb =>{
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'copy:theme', 'styles', 'copy:fonts', 'copy:themeJs', 'htmlReplace', 'images'], cb);
});
