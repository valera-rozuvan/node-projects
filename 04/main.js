/*
 * Checking a list of URLs for YouTube videos.
 */

var URL = require('url'),
    youtubeRegEx = /youtube.com/,
    urls = [
        'The Best of Tchaikovsky',
        'google.com',
        'http://www.youtube.com/watch?v=salrwSVWpC4',
        'http://www.youtube.com/watch?v=7_WWz2DSnT8&list=RDsalrwSVWpC4'
    ];

urls.forEach(function (element, index, array) {
    var url = URL.parse(element, true);

    console.log((index + 1) + ': raw URL = "' + element + '".');

    if (typeof url === 'object' && url.href) {
        if (url.query && url.query.v) {
            console.log('The URL contains a YouTube video ID "' + url.query.v + '".');

            if (url.hostname && youtubeRegEx.test(url.hostname)) {
                console.log('The URL has a hostname that contains "youtube.com".');

                console.log('We are safe to assume that the URL "' + url.href + '" is a YouTube video.');
            } else {
                console.log('The URL "' + url.href + '" is not a YouTube video.');
            }
        } else {
            console.log('The URL "' + url.href + '" is not a YouTube video.');
        }
    } else {
        console.log('ERROR: Something went wrong while parsing the raw URL!');
    }

    console.log('=====================');
});
