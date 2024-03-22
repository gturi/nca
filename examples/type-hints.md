# Example: type hints

module-type-hints-config.yml
```yml
commands:
  - name: module-type-hints
    command: ./module-type-hints.js
    commandType: Module
    completion:
      completionPath: ./completion-type-hints.js
```

module-type-hints.js
```js
const nodeCommandAlias = require("node-command-alias");

/**
 * @param {nodeCommandAlias.CommandHandlerInput} input
 */
module.exports = function (input) {
  // code
};
```

completion-type-hints.js
```js
const nodeCommandAlias = require("node-command-alias");

/**
 * @param {nodeCommandAlias.CompletionInput} input
 */
module.exports = function (input) {
  // code
};
```


## Usage

To get type hints when developing js scripts you need to link nca into one of the parent directories containing your script.

```bash
npm link node-command-alias
```

Open that directory into your IDE and you will have type hints for both `CommandHandlerInput` and `CompletionInput`.
