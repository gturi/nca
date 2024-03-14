# Example: module hello world

module-hello-config.yml
```yml
commands:
  - name: module-hello
    description: execute a js script which prints hello world
    command: ./module-hello.js
    commandType: Module
```

module-hello.js
```js
module.exports = function () {
  console.log('hello world');
};
```


## Usage

```bash
nca module-hello
```

Prints `hello world`.


## Notes

Pay attention when using relative paths: in this example module-hello-config.yml and module-hello.js need to be in the same directory to make everything work.

It is mandatory to create an anonymous function with the code to execute and assign it to `module.exports` to make nca load the script successfully.
