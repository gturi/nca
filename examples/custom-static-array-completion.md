# Example: custom static completion

static-completion.yml
```yml
aliases:
  - name: js-completion
    description: prints hello world
    command: echo "hello world"
    completion:
      completionPath: ./completion.js
```


## Usage

```bash
nca static-completion {tab}
```

Prints:
```bash
foo bar baz
```

## Notes:

Adding the flag `merge: true` in the completion, merges the custom completion with the default yargs one.
