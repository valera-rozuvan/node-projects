// console.log("Hello, world!");

var http = require('http'),
    init = require('./init'),

    server = init.start(http);

server.listen(8080);
