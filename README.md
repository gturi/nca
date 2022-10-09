# nca - Node Command Alias

[![lint-and-test](https://github.com/FlamingTuri/nca/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/FlamingTuri/nca/actions/workflows/lint-and-test.yml)

A command line utility to manage cross platform command aliases.


## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
    - [Config notes](#Config-notes)
    - [Config API](#Config-API)
    - [Mixing CompletablePromise and Promise](#Mixing-CompletablePromise-and-Promise)
- [Examples](#Examples)
- [Contributing](#Contributing)
- [License](#License)


## Install

```
npm install -g nca
```

[Back to top](#nca---Node-Command-Alias)


## Usage

The heart of nca resides in `$HOME/.nca/config.yml`.

This file is where your cross platform aliases will be declared.

```yaml
includePaths:
  - /absolute/path/to/alternative-config.yml
  - /absolute/path/to/another-alternative-config.yml

aliases:
  - name: hello
    description: prints hello
    command: echo hello
  - # list of aliases
```

If you do not like to store all the aliases in this file you can declare alternative yaml configurations under includePath variables.

In this simple example an alias called hello will be created.
Running `nca hello` in your terminal will print `hello` in the terminal.

[Back to top](#nca---Node-Command-Alias)


### Config notes

- An alias name must be unique across all configs.
- An alias name cannot contain spaces.
- An alias command cannot be optional if it does not define sub aliases.
- Options and positional arguments defined for an alias are also shared to its sub aliases.
- Positional arguments order declaration matters. List type positional arguments are automatically ordered as the last possible positional argument.
- At most one list type positional argument can be declared per alias hierarchy.
- A positional argument can not have the same name as one of the sub aliases in its hierarchy.

[Back to top](#nca---Node-Command-Alias)


### Config API

To know more on how aliases can be configured you can check the API documentation at TODO.

[Back to top](#nca---Node-Command-Alias)


## Examples

- [hello world](https://github.com/FlamingTuri/nca/blob/main/examples/hello-world.md) - simple hello world
- [function hello world](https://github.com/FlamingTuri/nca/blob/main/examples/function-hello-world.md) - hello world but leveraging javascript interpreter
- [function option](https://github.com/FlamingTuri/nca/blob/main/examples/function-option-param.md) - passing option params to an alias
- [function positional arguments](https://github.com/FlamingTuri/nca/blob/main/examples/function-positional-arguments.md) - passing positional arguments to an alias
- [function shell command execution](https://github.com/FlamingTuri/nca/blob/main/examples/shell-command-execution.md) - executing shell commands leveragin shelljs
- [alias hierarchy](https://github.com/FlamingTuri/nca/blob/main/examples/alias-hierarchy.md) - creating alias hierarchies, to create complex command line interfaces 

[Back to top](#nca---Node-Command-Alias)


## Contributing

Contributions, suggestions, issues and feature requests are welcome!

[Back to top](#nca---Node-Command-Alias)


## License

This library is distributed under the [MIT license](LICENSE).

[Back to top](#nca---Node-Command-Alias)
