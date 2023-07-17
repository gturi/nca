# Example: custom completion returned by js module

js-completion.yml
```yml
aliases:
  - name: js-completion
    description: prints hello world
    command: echo "hello world"
    completion:
      completionPath: ./completion.js
```

completion.js
```js
module.exports = function () {
  return ['a', 'b', 'c'];
};
```


## Usage

```bash
nca js-completion {tab}
```

Prints:
```bash
a b c
```

## Notes:

Adding the flag `merge: true` in the completion, merges the custom completion with the default yargs one.
