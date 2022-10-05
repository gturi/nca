# Example: function

```yml
aliases:
  - name: log-options
    description: options logger
    command: |
      console.log(args.b);
      console.log(args.n);
      console.log(args.s);
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
  nca function-hello
  ```

  Output:

  ```js
  false
  undefined
  foo
  ```

- ```bash
  nca function-hello -b true -n 1 -s bar
  ```

  Output:

  ```js
  true
  1
  bar
  ```

- ```bash
  nca function-hello --num 100
  ```

  Output:

  ```js
  false
  100
  foo
  ```
