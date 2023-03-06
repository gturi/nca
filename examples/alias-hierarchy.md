# Example: alias hierarchy

```yml
aliases:
  - name: mainAlias
    description: description main alias 
    command: |
      console.log('--- main alias started ---\n');
      console.log(`a: ${input.args.a}`);
      console.log(`n: ${input.args.n}`);
      console.log(`foo: ${input.args.foo}`);
      console.log(`bar: ${input.args.bar}`);
      console.log('\n--- main alias ended ---');
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
    subAliases:
      - name: subAlias
        description: description subAlias
        command: |
          console.log('--- sub alias started ---\n');
          console.log(`a: ${input.args.a}`);
          console.log(`n: ${input.args.n}`);
          console.log(`foo: ${input.args.foo}`);
          console.log(`bar: ${input.args.bar}`);
          console.log(`c: ${input.args.c}`);
          console.log(`baz: ${input.args.baz}`);
          console.log('\n --- sub alias ended ---');
        commandType: Function
        options:
          - name: c
            optionType: String
        positionalArguments:
          - name: baz
            description: baz
            type: String
            required: true
      - name: anotherSubAlias
        description: description anotherSubAlias
        command: |
          console.log('--- another sub alias started ---\n');
          console.log(`a: ${input.args.a}`);
          console.log(`n: ${input.args.n}`);
          console.log(`foo: ${input.args.foo}`);
          console.log(`bar: ${input.args.bar}`);
          console.log(`d: ${input.args.d}`);
          console.log(`qux: ${input.args.qux}`);
          console.log('\n--- another sub alias ended ---');
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

- Main alias:

  ```bash
  nca mainAlias -a true -n 100 fooValue barValue1 barValue2
  ```

  Output:

  ```js
  --- main alias started ---

  a: true
  n: 100
  foo: fooValue
  bar: barValue1,barValue2

  --- main alias ended ---
  ```

- Sub alias:

  ```bash
  nca mainAlias subAlias -a true -n 100 -c cValue fooValue bazValue barValue1 barValue2
  ```

  Output:

  ```js
  --- sub alias started ---

  a: true
  n: 100
  foo: fooValue
  bar: barValue1,barValue2
  c: cValue
  baz: bazValue

  --- sub alias ended ---
  ```

- Another sub alias:

  ```bash
  nca mainAlias anotherSubAlias -a true -n 100 -d dValue fooValue quxValue barValue1 barValue2
  ```

  Output:

  ```js
  --- another sub alias started ---

  a: true
  n: 100
  foo: fooValue
  bar: barValue1,barValue2
  d: dValue
  qux: quxValue

  --- another sub alias ended ---
  ```

## Notes:

Main alias options and positional arguments are inherited by its subAliases.

Hierarchies are useful when you want to create more complex command line interfaces.

I.E. docker container cli:

```
docker container create
docker container start
docker container exec
docker container inspect
```
