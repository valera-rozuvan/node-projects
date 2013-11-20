exports.start = function (http) {
    return http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('Hello, world! ^_^');
    });
};
