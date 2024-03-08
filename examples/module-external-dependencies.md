# Example: module external npm dependencies

module-external-dependencies.yml
```yml
commands:
  - name: module-external
    description: execute script which uses external npm dependencies
    command: ./module-external.js
    commandType: Module
```

module-external-dependencies.js
```js
module.exports = function () {
  var moment = require('moment');
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
};
```

package.json
```json
{
  "name": "external-dependencies",
  "version": "1.0.0",
  "description": "",
  "main": "module-external-dependencies.js",
  "scripts": {
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "moment": "^2.29.4"
  }
}
```

## Usage

```bash
npm install # necessary to install package json dependencies
nca module-external-dependencies
```

Prints:
```bash
# something like
March 6th 2023, 10:55:13 pm
```
