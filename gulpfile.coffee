# modules
fs = require('fs')
gulp = require('gulp')
gutil = require('gulp-util')
connect = require('gulp-connect')
coffee = require('gulp-coffee')
rename = require('gulp-rename')
source = require('vinyl-source-stream')
browserify = require('browserify')
clean = require('del')
run = require('run-sequence')
uglify = require('gulp-uglifyjs')
header = require('gulp-header')

# config
pak = JSON.parse(fs.readFileSync './package.json', 'utf8')
port = 1111
pluginScript = './src/coffeescript/notifyr.coffee'
pluginBuildDir = './dist'
pluginName = 'jquery.notifyr.js'
pluginNameMin = 'jquery.notifyr.min.js'
banner = "/*!\n
        #{pak.name} v#{pak.version} (#{pak.homepage})\n
        Copyright (c) #{new Date().getFullYear()} #{pak.author}\n
        Licensed under the #{pak.license} license\n
        */\n"

# small wrapper around gulp util logging
log = (msg) ->
  gutil.log gutil.colors.blue(msg)

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
  log("Examples can be viewed at http://localhost:#{port}")

gulp.task 'clean', ->
  gulp
    .src('build', {read: false})
    .pipe(clean())

gulp.task 'clean', ->
  clean [pluginBuildDir]

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
  gulp
    .src(pluginScript)
    .pipe(coffee(
      bare: true
      sourceMap: false
    ).on('error', gutil.log))
    .pipe(rename(pluginName))
    .pipe(header(banner))
    .pipe(gulp.dest(pluginBuildDir))

gulp.task 'refresh', (callback) ->
  run(
    'clean',
    'build',
    'browserify',
    'html',
    callback
  )
  return

gulp.task 'minify', ->
  gulp
    .src("#{pluginBuildDir}/#{pluginName}")
    .pipe(uglify())
    .pipe(rename(pluginNameMin))
    .pipe(header(banner))
    .pipe(gulp.dest(pluginBuildDir))

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
