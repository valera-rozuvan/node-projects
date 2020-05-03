/*
 * Used material:
 *
 *     - http://nodejs.org/docs/latest/api/child_process.html#child_process_child_process_exec_command_options_callback
 *     - http://www.2ality.com/2011/12/nodejs-shell-scripting.html
 *
 *
 * See also:
 *
 *     - http://stackoverflow.com/questions/4482686/check-synchronously-if-file-directory-exists-in-node-js
 *     - http://stackoverflow.com/questions/15630770/node-js-check-if-path-is-file-or-directory
 *     - http://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs
 */

(function(undefined) {
  'use strict';

  var exec = require('child_process').exec,
    child, c1 = 0,
    mainArgs = process.argv.slice(2),
    fs = require('fs'),
    shellCommand,
    text, fileName;

  if (mainArgs.length !== 1) {
    console.log('ERROR: "' + process.argv[1] + '" requires one argument!');

    return;
  }

  console.log('There are ' + mainArgs.length + ' arguments:');

  if (mainArgs.length) {
    mainArgs.forEach(function(argValue) {
      c1 += 1;

      console.log('[' + c1 + '] ' + argValue);
    });
  }

  console.log('We will try reading a file now...');

  fileName = process.argv[2];
  text = fs.readFileSync(fileName, 'utf8');

  console.log('=================== start of "' + fileName + '" ===================');
  text.split(/\r?\n/).forEach(function(line) {
    console.log(line);
  });
  console.log('=================== end of "' + fileName + '" ===================');

  console.log('How many lines are in the file?');

  shellCommand = 'cat ' + fileName + ' | wc -l';

  console.log('Executing "' + shellCommand + '" ...');

  child = exec(
    'cat ' + fileName + ' | wc -l',
    function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  );
}).call(this);
