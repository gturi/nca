# Example: hierarchy

```yml
commands:
  - name: mainCommand
    description: description main command
    command: |
      console.log('--- main command started ---\n');
      console.log(`a: ${input.args.a}`);
      console.log(`n: ${input.args.n}`);
      console.log(`foo: ${input.args.foo}`);
      console.log(`bar: ${input.args.bar}`);
      console.log('\n--- main command ended ---');
    commandType: Function
    options:
      - name: a
        optionType: Boolean
        defaultValue: 'false'
      - name: n
        optionType: Number
    positionalArguments:
      - name: foo
        description: string
        type: String
        required: true
      - name: bar
        description: string
        type: StringList
        required: true
    subCommands:
      - name: subCommand
        description: description subCommand
        command: |
          console.log('--- sub command started ---\n');
          console.log(`a: ${input.args.a}`);
          console.log(`n: ${input.args.n}`);
          console.log(`foo: ${input.args.foo}`);
          console.log(`bar: ${input.args.bar}`);
          console.log(`c: ${input.args.c}`);
          console.log(`baz: ${input.args.baz}`);
          console.log('\n--- sub command ended ---');
        commandType: Function
        options:
          - name: c
            optionType: String
        positionalArguments:
          - name: baz
            description: baz
            type: String
            required: true
      - name: anotherSubCommand
        description: description anotherSubCommand
        command: |
          console.log('--- another sub command started ---\n');
          console.log(`a: ${input.args.a}`);
          console.log(`n: ${input.args.n}`);
          console.log(`foo: ${input.args.foo}`);
          console.log(`bar: ${input.args.bar}`);
          console.log(`d: ${input.args.d}`);
          console.log(`qux: ${input.args.qux}`);
          console.log('\n--- another sub command ended ---');
        commandType: Function
        options:
          - name: d
            optionType: String
        positionalArguments:
          - name: qux
            description: qux
            type: String
            required: true
```


## Usage

- main command:

  ```bash
  nca mainCommand -a true -n 100 fooValue barValue1 barValue2
  ```

  Output:

  ```js
  --- main command started ---

  a: true
  n: 100
  foo: fooValue
  bar: barValue1,barValue2

  --- main command ended ---
  ```

- sub command:

  ```bash
  nca mainCommand subCommand -a true -n 100 -c cValue fooValue bazValue barValue1 barValue2
  ```

  Output:

  ```js
  --- sub command started ---

  a: true
  n: 100
  foo: fooValue
  bar: barValue1,barValue2
  c: cValue
  baz: bazValue

  --- sub command ended ---
  ```

- Another sub command:

  ```bash
  nca mainCommand anotherSubCommand -a true -n 100 -d dValue fooValue quxValue barValue1 barValue2
  ```

  Output:

  ```js
  --- another sub command started ---

  a: true
  n: 100
  foo: fooValue
  bar: barValue1,barValue2
  d: dValue
  qux: quxValue

  --- another sub command ended ---
  ```

## Notes:

main command options and positional arguments are inherited by its subCommandes.

Hierarchies are useful when you want to create more complex command line interfaces.

I.E. docker container cli uses this concept:

```
docker container create
docker container start
docker container exec
docker container inspect
```
