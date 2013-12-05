'use strict';

var input = {
    foo: {
        bar: {
            $files: ['baz.js', 'piece.js']
        },
        paz: {}
    },
    baz: {
        $files: ['taz.js']
    },
    $files: ['Gruntfile.js', 'package.json']
};

var hierarchy = require('./index.js');
var tree = hierarchy(input);

console.log(tree);
