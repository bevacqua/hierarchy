'use strict';

var input = require('./test.input.json');
var hierarchy = require('./index.js');
var tree = hierarchy(input);

console.log(tree);
