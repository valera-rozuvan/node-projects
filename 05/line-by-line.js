// By Nodejs , read large file line by line. mainly created for logfile processing.
// https://gist.github.com/deemstone/8279565
//
// Original file version from: 2014-01-05T23:52:12-08:00

var fs = require('fs');

// Function:
//     exports(inputFile, onEnd)
//
// Parameters:
//     @param inputFile - file path string
//     @param onEnd     - Callback function.
module.exports = function (inputFile, onEnd) {
    var sLength = 1024,
        _lineFragment = '',
        position = 0,
        i = 0,
        block_queue = [],
        block_fetching = false,
        buffer, fd;

    buffer = new Buffer(sLength);
    fd = fs.openSync(inputFile, 'r');

    return fetchBlock;

    function fetchBlock(callback) {
        if (!callback) {
            console.warn('no callback when call fetchBlock()');
        }

        if (!block_fetching) {
            block_fetching = true;
        } else {
            block_queue.push(callback);

            return;
        }

        console.log('read postion: ', position);

        // Taken from http://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback .
        //
        // Function:
        //     fs.read(fd, buffer, offset, length, position, callback)
        //
        // Description:
        //     Read data from the file specified by fd.
        //
        // Parameters:
        //     @buffer   - The buffer that the data will be written to.
        //     @offset   - The offset in the buffer to start writing at.
        //     @length   - An integer specifying the number of bytes to read.
        //     @position - An integer specifying where to begin reading from in
        //                 the file. If position is null, data will be read from
        //                 the current file position.
        //     @callback - The callback is given the three arguments, (err, bytesRead, buffer).
        fs.read(fd, buffer, 0, sLength, position, function (err, bytesRead, buf) {
            var lines;

            if (err) {
                throw err;
            }

            if (bytesRead === 0) {
                onEnd(0, i);

                return;
            }

            position += bytesRead;

            //Regex from https://github.com/RustyMarvin/line-by-line/blob/master/line-by-line.js .
            lines = buf.toString('utf8', 0, bytesRead).split(/(?:\n|\r\n|\r)/g);

            lines[0] = _lineFragment + lines[0];
            _lineFragment = lines.pop() || '';

            block_fetching = false;

            if (callback) {
                try {
                    callback(lines, i);
                } catch (e) {
                    throw e;
                }

                i += lines.length;

                if (block_queue.length) {
                    fetchBlock(block_queue.shift());
                }

                return;
            }
        });
    };
};
