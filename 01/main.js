(function wrapperMain(require) {
    'use strict';

    require('./init')
        .start(require('http'))
        .listen(8080);
}).call(this, require);
