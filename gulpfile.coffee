# modules
gulp = require('gulp')
gutil = require('gulp-util')
connect = require('gulp-connect')
coffee = require('gulp-coffee')
browserify = require('browserify')
rename = require('gulp-rename')
source = require('vinyl-source-stream')
run = require('run-sequence')
uglify = require('gulp-uglifyjs')

# config
port = 1111
pluginScript = './src/coffeescript/notifyr.coffee'
pluginDistDir = './dist'
pluginName = 'jquery.notifyr.js'
pluginNameMin = 'jquery.notifyr.min.js'

# gulp tasks
gulp.task 'server', ->
  connect.server
    root: [
      'example'
      'assets'
      'dist' # for serving compiled plugin
      'node_modules' # for serving jquery
    ]
    port: port
    livereload: true
  gutil.log(gutil.colors.red('Examples can be viewed at'), gutil.colors.blue('http://localhost:' + port))

gulp.task 'html', ->
  gulp
    .src('./example/*.html')
    .pipe(connect.reload())

gulp.task 'browserify', ->
  browserify('./example/commonjs/script.js')
    .bundle()
    .pipe(source('compiled.js'))
    .pipe(gulp.dest('./example/commonjs/'))

gulp.task 'build', ->
  gutil.log gutil.colors.red('compiling coffeescript...')
  gulp
    .src(pluginScript)
    .pipe(coffee(
      bare: true
      sourceMap: false
    ).on('error', gutil.log))
    .pipe(rename(pluginName))
    .pipe(
      gulp.dest(pluginDistDir)
    )

gulp.task 'refresh', (callback) ->
  run(
    'build',
    'browserify',
    'html',
    callback
  )
  return

gulp.task 'minify', ->
  gulp
    .src("#{pluginDistDir}/#{pluginName}")
    .pipe(uglify())
    .pipe(rename(pluginNameMin))
    .pipe(gulp.dest(pluginDistDir))

gulp.task 'watch', ->
  gulp
    .watch [
      pluginScript
      './example/*.html'
      './example/*/script.js'
      './assets/styles.css'
    ], [
      'refresh'
    ]

gulp.task 'default', [
  'server'
  'watch'
]
