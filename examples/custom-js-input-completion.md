# Example: custom completion returned by js module based on input

js-completion-input.yml
```yml
commands:
  - name: js-completion-input
    description: prints hello world
    command: echo "hello world"
    completion:
      completionPath: ./completion-input.js
    positionalArguments:
      - name: foo
        description: string
        type: String
        required: true
```

completion-input.js
```js
module.exports = function (input) {
  if (input.argv.foo === 'odd') {
    return ['1', '3', '5'];
  } else if (input.argv.foo === 'even') {
    return ['2', '4', '6'];
  } else {
    return ['error'];
  }
};
```


## Usage

```bash
nca js-completion-input --foo=odd {tab}
```

Prints:
```bash
1 3 5
```

```bash
nca js-completion-input --foo=even {tab}
```

Prints:
```bash
2 4 6
```

## Notes:

Adding the flag `merge: true` in the completion, merges the custom completion with the default yargs one.
