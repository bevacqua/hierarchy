'use strict';

var _ = require('lodash');
var part = {
    etc:            ':',
    childIndent:    '│   ',
    childSiblings:  '├── ',
    childLast:      '└── ',
    spaces:         '    '
};

function walkOnDirectories (crumb, state) {
    var keys = _.keys(crumb);

    if (state === void 0) {
        state = {
            steps: [],
            indent: ''
        };
    }

    _.each(keys, function (key, i) {
        var node = crumb[key];
        var last = i === keys.length - 1;

        if (key === '$files') {
            walkOnFiles(node, state, last);
        } else {
            state.indent += last ? part.childLast : part.childSiblings;
            push(state, '', key);
            outdent(state);
            state.indent += last ? part.spaces : part.childIndent;
            walkOnDirectories(node, state);
            outdent(state);
        }
    });

    return state.steps;
}

function walkOnFiles (files, state, last) {
    var relationship = part.childSiblings;
    _.each(files, function (file, i) {
        if (i === files.length - 1) {
            relationship = last ? part.childLast : part.childSiblings;
        }
        if (file === '$etc') {
            push(state, part.etc, '');
            push(state, part.etc, '');
        } else {
            push(state, relationship, file);
        }
    });
}

function outdent (state) {
    state.indent = state.indent.substr(0, state.indent.length - 4);
}

function push (state, relationship, name) {
    state.steps.push(state.indent + relationship + name);
}

var input = {
    foo: {
        bar: {
            $files: ['baz.js', 'piece.js']
        },
        paz: {
            $files: []
        }
    },
    baz: {
        $files: ['taz.js']
    },
    $files: ['Gruntfile.js', 'package.json']
};

var result = walkOnDirectories(input);
console.log(result.join('\n'));