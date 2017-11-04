[![NPM version](https://badge.fury.io/js/no-setting-array-properties-rule.svg)](http://badge.fury.io/js/no-setting-array-properties-rule)
[![Downloads](http://img.shields.io/npm/dm/no-setting-array-properties-rule.svg)](https://npmjs.org/package/no-setting-array-properties-rule)

No setting array properties rule
======

A [TSLint](https://github.com/palantir/tslint/) rule which forbids setting array properties, because they aren't handled by `JSON.stringify`.

Description
-----------

When you call `JSON.stringify` on an array with custom properties, those properties aren't serialized. Example:
```ts
let arr: number[] = [1, 2];
const prop2: string = "prop2";

arr["prop1"] = "1";
arr[prop2] = "2";

JSON.stringify(arr); //results in [1,2]
```

This rule forbids property assignment and access on `array` types, so it forbids these two statements in the example above:
* `arr["prop1"] = "1";`
* `arr[prop2] = "2";`

Usage
-----

* Install it using `npm install no-setting-array-properties-rule --save-dev`.
* Add it to your tslint.json, like this:
```json
{
   "rulesDirectory": [
       "node_modules/no-setting-array-properties-rule/dist/src"
   ],
   "rules": {
       "no-setting-array-properties": true
   }
}
```
Note that this rule doesn't work in [`vscode-tslint`](https://github.com/Microsoft/vscode-tslint) at the moment, because it's a `TypedRule`. See [this `vscode-tslint` issue](https://github.com/Microsoft/vscode-tslint/issues/70) for more details.

Changelog
---------

See [CHANGELOG.md](CHANGELOG.md).