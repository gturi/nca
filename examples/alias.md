# Example: alias

Nca aliases can be used to simplify invocation of long nca commands or to use nca commands without typing `nca` prefix.

command-hierarchy-config.yml
```yml
commands:
  - name: mainCommand
    description: description main command
    command: |
      console.log('--- main command started ---');
      console.log(`a: ${input.args.a}`);
      console.log(`n: ${input.args.n}`);
      console.log('--- main command ended ---');
    commandType: Function
    options:
      - name: a
        optionType: Boolean
        defaultValue: 'false'
      - name: n
        optionType: Number
    subCommands:
      - name: subCommand
        description: description subCommand
        command: |
          console.log('--- sub command started ---');
          console.log(`a: ${input.args.a}`);
          console.log(`n: ${input.args.n}`);
          console.log(`c: ${input.args.c}`);
          console.log(`baz: ${input.args.baz}`);
          console.log('--- sub command ended ---');
        commandType: Function
        options:
          - name: c
            optionType: String
        positionalArguments:
          - name: baz
            description: baz
            type: String
            required: true
```

## Usage

### Create an alias

If you often type a long nca command like this one:

```bash
nca mainCommand subCommand -a true -n 100 -c cValue bazValue
```

You can create an alias using `nca alias add` command, so that you do not need to type it every time:

```bash
nca alias add nca mainCommand subCommand -a true -n 100 -c cValue bazValue
# you can avoid typing `nca` prefix, since it will be added automatically
nca alias add mainCommand subCommand -a true -n 100 -c cValue bazValue
```

The alias will be created with the first param encoutered after the `nca alias add`.

Thus, you can invoke the previously created alias by typing `mainCommand`.


Aliases will read user input when invoked:

```bash
# creating alias
nca alias add mainCommand

# invoking alias with input `subCommand -a true -n 100 -c cValue bazValue`
mainCommand subCommand -a true -n 100 -c cValue bazValue

# creating alias
nca alias add mainCommand subCommand -a true -n 100 -c

# invoking alias with input `cValue bazValue`
mainCommand cValue bazValue
```

The output of the two aliases will be the same.


### Rename an alias

You can rename an alias using `nca alias rename` command.

```bash
# nca alias rename {aliasName} {aliasNewName}
nca alias rename mainCommand myFancyName
```

Now you can invoke the alias by typing `myFancyName`.


### Install alias completion

You can get completion for an alias using `nca alias completion`.

To make it work you need to have installed nca completion.

```bash
# install nca completion
nca completion >> ~/.bashrc

# install alias completion for `mainCommand` alias
nca alias completion mainCommand >> ~/.bashrc
```


### List installed aliases

You can see the installed aliases by running `nca alias list`:

```bash
# list all the installed aliases
nca alias list

# list all the installed aliases that are broken (the ones that point to a non existent file)
nca alias list -b

# list all the installed aliases that are broken and then removes them
nca alias list -br
```

### Delete installed aliases

You can remove the installed aliases by running `nca alias remove`:

```bash
nca alias remove alias1 alias2
```
