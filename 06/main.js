/*
 * Used material:
 *
 *     - http://www.commandlinefu.com/commands/view/1913/redirect-wget-output-to-the-terminal-instead-of-a-file
 *     - http://stackoverflow.com/questions/11711339/getting-webpage-title-img-metadata-info-from-linux-terminal
 *     - http://stackoverflow.com/questions/13087888/getting-the-page-title-from-a-scraped-webpage
 */

(function (undefined) {
    'use strict';

    var exec = require('child_process').exec,
        url = 'http://www.youtube.com/watch?v=Hh4CdrT-hxY&list=RDAf_xcUvZj3k',
        grepRegEx = /<title>(.*?)<\/title>/i,
        child;

    console.log('Getting title of page "' + url + '".');

    child = exec(
        'wget -q -O - "$@" ' + url,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('Error: ' + error);
                console.log('stderr: ' + stderr);
            } else {
                console.log('Title: "' + stdout.match(grepRegEx)[1] + '".');
            }
        }
    );
}).call(this);
