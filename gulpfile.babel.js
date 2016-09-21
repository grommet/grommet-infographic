// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import yargs from 'yargs';
const argv = yargs.argv;
import gulp from 'gulp';
import path from 'path';
import fs from 'fs';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import minifyCss from 'gulp-clean-css';
import grommetToolbox, {getOptions} from 'grommet-toolbox';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import git from 'gulp-git';
import del from 'del';
import http from 'http';
import mkdirp from 'mkdirp';
import replace from 'gulp-replace';
import runSequence from 'run-sequence';

function distSass() {
  return sass({
    includePaths: [
      path.resolve(__dirname, '../grommet/src/'),
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './node_modules/grommet/node_modules')
    ]
  });
}

const options = getOptions();
var host = options.devServerHost ? options.devServerHost : 'localhost';

gulp.task('set-webpack-alias', function () {
  if (options.alias && argv.useAlias) {
    console.log('Using local alias for development.');
    options.webpack.resolve.alias = options.alias;
  }
});

gulp.task('watch-css', function() {
  if (options.webpack.resolve.alias) {
    var watcher = gulp.watch(
      path.resolve(__dirname, '../grommet/src/scss/**/*.scss'),
      ['dist-css']
    );

    watcher.on('change', function() {
      //notify the webpack dev server that a change happened
      http.get(
        'http://' + host + ':' + options.devServerPort + '/invalid'
      );
    });
  }
});

function distCss (name) {
  var prefix = options.webpack.resolve.alias ? 'grommet/' : '';
  return gulp.src('src/scss/'+name+'.scss')
    .pipe(replace(prefix, ''))
    .pipe(distSass())
    .pipe(rename(name + '.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/'));
}

gulp.task('dist-css-index', function () {
  return distCss('index');
});

gulp.task('notify', function () {
  if (options.webpack.resolve.alias) {
    //notify the webpack dev server to reload when compilation is finished
    http.get(
      'http://' + host + ':' + options.devServerPort + '/reload'
    );
  }
});

gulp.task('dist-css', function(done) {
  runSequence(
    ['dist-css-index'], 'notify', done);
});

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

gulp.task('generate-server-routes', function() {
  return gulp.src(path.join(__dirname, 'src/js/routes.js'))
    .pipe(gulpWebpack({
      target: 'node',
      output: {
        path: path.join(__dirname, 'server'),
        filename: 'server-routes.js',
        libraryTarget: 'commonjs2'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
          },
          {
            test: /develop(\/|\\).*\.htm$|design(\/|\\)[^\/]*\.htm$|design(\/|\\).*\/.*\.htm$/,
            loader: 'babel-loader!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader',
            exclude: /(node_modules|bower_components)/
          }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.json', '.htm', '.html', '.scss', '.md', '.svg'],
        root: [
          path.join(__dirname, './node_modules'),
          path.join(__dirname, './node_modules/grommet/node_modules')
        ]
      },
      externals: nodeModules,
      plugins: [
        new webpack.DefinePlugin({
          NODE_ENV: "\"production\""
        })
      ]
    }))
    .pipe(gulp.dest(path.join(__dirname, 'server')));
});

gulp.task('release:createTmp', function(done) {
  del.sync(['./tmp']);
  mkdirp('./tmp', function(err) {
    if (err) {
      throw err;
    }
    done();
  });
});

grommetToolbox(gulp, options);
