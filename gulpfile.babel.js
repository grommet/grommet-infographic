// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import yargs from 'yargs';
const argv = yargs.argv;
import gulp from 'gulp';
import grommetToolbox, {getOptions} from 'grommet-toolbox';

const options = getOptions();

gulp.task('set-webpack-alias', function () {
  if (options.alias && argv.useAlias) {
    console.log('Using local alias for development.');
    options.webpack.resolve.alias = options.alias;
  }
});

grommetToolbox(gulp, options);
