var
  serverProto = 'http',
  serverIp = '192.168.200.134',
  serverPort = '8080',
  socket = io.connect(
    serverProto + '://' + serverIp + ':' + serverPort
  );

socket.on('news', function(data) {
  console.log(data);
  socket.emit(
    'my other event', {
      my: 'data'
    }
  );
});
