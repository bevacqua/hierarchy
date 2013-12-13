# hierarchy

> Convert JSON object to a beautiful string representation of a directory structure

Like [archy](https://github.com/substack/node-archy), but easier. Inspired in the text-tree [found in an answer on StackOverflow](http://stackoverflow.com/a/20408498/389745).

# Installation

```shell
npm i --save hierarchyjs
```

# Usage

Considering the `input.json` file:

```json
{
    "foo": {
        "bar": {
            "$files": ["baz.js", "piece.js"]
        },
        "paz": {}
    },
    "baz": {
        "$files": ["taz.js"]
    },
    $files: ["Gruntfile.js", "package.json"]
}
```

## From the command line

```shell
hierarchy input.json
```

## In code

```js
var hierarchy = require('hierarchy');
var input = require('input.json');
var tree = hierarchy(input);

console.log(tree);
```

# Notation

The input is expected to be a tree-like object with optional `$files` arrays that describe a list of files in a directory. The `$files` construct can actually be avoided by treating files as empty directories, but its a little convenience sugar.

The following has the exact same output as the previous example.

```json
{
    "foo": {
        "bar": {
            "$files": {
                "baz.js": {},
                "piece.js": {}
            },
        },
        "paz": {}
    },
    "baz": {
        "taz.js": {}
    },
    "Gruntfile.js": {},
    "package.json": {}
}
```

A file named `$etc` might be used to include a "and more.." `'....'` kind of message.

# License

MIT
