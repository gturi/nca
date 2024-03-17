# Example: invoke program

invoke-program-config.yml
```yml
commands:
  - name: invoke-program
    description: invoke a program that prints the input params
    command: "./script.sh"
    options:
      - name: s
        optionType: String
        defaultValue: 'sValue'
      - name: a
        optionType: String
        defaultValue: 'aValue'
    positionalArguments:
      - name: foo
        description: foo argument
        type: StringList
        defaultValue: 'fooValue'
    # this is necessary when using relative paths for running a program
    runInConfigDirectory: true
    # omit this argument to treat positional arguments as options
    # (--foo will not be passed as an argument)
    positionalArgumentsAsOptions: true
```

script.sh
```bash
#!/bin/bash

echo "$@"
```

## Usage


- ```bash
  nca invoke-program -a hello -s world
  ```

  Output:

  ```js
  // positionalArgumentsAsOptions: false (default)
  -a hello -s world fooValue
  // positionalArgumentsAsOptions: true
  -a hello -s world --foo fooValue
  ```

- ```bash
  nca invoke-program -a hello -s world someValue
  ```

  Output:

  ```js
  // positionalArgumentsAsOptions: false (default)
  -a hello -s world someValue
  // positionalArgumentsAsOptions: true
  -a hello -s world --foo someValue
  ```

- ```bash
  nca invoke-program -a hello -s world someValue anotherValue
  ```

  Output:

  ```js
  // positionalArgumentsAsOptions: false (default)
  -a hello -s world someValue,anotherValue
  // positionalArgumentsAsOptions: true
  -a hello -s world --foo someValue,anotherValue
  ```

- ```bash
  nca invoke-program -a "hel lo" -s world "someValue anotherValue"
  ```

  Output:

  ```js
  // positionalArgumentsAsOptions: false (default)
  -a hello -s world someValue anotherValue
  // positionalArgumentsAsOptions: true
  -a hel lo -s world --foo someValue anotherValue
  ```
