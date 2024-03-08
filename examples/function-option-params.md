# Example: function

```yml
commands:
  - name: log-options
    description: options logger
    command: |
      console.log(input.args.b);
      console.log(input.args.n);
      console.log(input.args.s);
    commandType: Function
    options:
      - name: b
        optionType: Boolean
        defaultValue: 'false'
      - name: n
        alternativeName: num
        optionType: Number
      - name: s
        optionType: String
        defaultValue: 'foo'
```

## Usage

- ```bash
  nca log-options
  ```

  Output:

  ```js
  false
  undefined
  foo
  ```

- ```bash
  nca log-options -b true -n 1 -s bar
  ```

  Output:

  ```js
  true
  1
  bar
  ```

- ```bash
  nca log-options --num 100
  ```

  Output:

  ```js
  false
  100
  foo
  ```
