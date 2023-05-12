# Example: function

```yml
aliases:
  - name: log-positional
    description: positional arguments logger
    command: |
      console.log(input.args.foo);
      console.log(input.args.bar);
      console.log(input.args.baz);
    commandType: Function
    positionalArguments:
      - name: foo
        description: foo argument
        type: Boolean
        defaultValue: false
      - name: bar
        description: bar argument
        type: Number
      - name: baz
        description: baz argument
        type: StringList
```

     
## Usage

- ```
  nca log-positional 1 a b
  ```

  Output:

  ```js
  false
  1
  [ 'a', 'b' ]
  ```

- ```
  nca log-positional --foo=true 1 a b
  ```

  Output:

  ```js
  true
  1
  [ 'a', 'b' ]
  ```

## Notes

Try to always put optional positional arguments after the required ones, otherwise the engine could not behave as expected. As a matter of fact, the second example shows that to change `foo` default value it needs to be specified as an optional parameter.
