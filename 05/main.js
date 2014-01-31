var LBL = require('./line-by-line.js'),
    lbl;

console.log('[main]: calling LBL() function.');
lbl = LBL('pg9603.txt', onEnd);

console.log('[main]: calling lbl() function.');
lbl(processLine);
lbl(processLine);

return;

function processLine(lines, i) {
    console.log('[processLine]: lines = ', lines);
    console.log('[processLine]: i = ', i);
}

function onEnd(data, i) {
    console.log('[onEnd]: data = ', data);
    console.log('[onEnd]: i = ', i);
    console.log();
}
