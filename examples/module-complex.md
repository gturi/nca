# Example: module complex

module-complex-config.yml
```yml
aliases:
  - name: module-complex
    description: execute a js script which concats options and positional arguments and then prints them
    command: ./module-complex.js
    commandType: Module
    options:
      - name: s
        optionType: String
        defaultValue: ''
    positionalArguments:
      - name: foo
        description: foo argument
        type: String
        defaultValue: ''
```

module-complex.js
```js
function concatValues(first, second) {
  return `${first} ${second}`;
}

module.exports = function (input) {
  console.log(concatValues(input.args.s, input.args.foo));
};
```


## Usage

```bash
nca module-complex -s=hello --foo=world
```

Prints `hello world`


## Notes

`Module` commandTypes behaves in the same way as `Function` commandTypes, refer to those examples to know more about options and positional arguments.
