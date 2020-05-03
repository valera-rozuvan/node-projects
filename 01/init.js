(function wrapperInit(exports) {
  'use strict';

  exports.start = start;

  return;

  function start(http) {
    return http.createServer(onCreateServer);
  }

  function onCreateServer(req, res) {
    res.writeHead(200);
    res.end('Hello, world! ^_^v! 4');
  }
}).call(this, exports);
