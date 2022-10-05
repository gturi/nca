# Example: function

```yml
aliases:
  - name: function-hello
    description: prints hello world
    command: console.log('hello world');
    commandType: Function
```

## Usage

```bash
nca function-hello
```

Prints `hello world`.


## Notes

The command is evaluated as javascript function.
