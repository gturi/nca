# nca - Node Command Alias

[![lint-and-test](https://github.com/FlamingTuri/nca/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/FlamingTuri/nca/actions/workflows/lint-and-test.yml)

A command line utility to manage cross platform command aliases.


## Table of Contents

- [Install](#Install)
  - [Install bash autocomplete](#Install-bash-autocomplete)
- [Usage](#Usage)
- [Config API](#Config-API)
- [Examples](#Examples)
- [Contributing](#Contributing)
- [License](#License)


## Install

```
npm install -g node-command-alias
```

To install the latest version with security updates applied use `@dev` tag:

```
npm install -g node-command-alias@dev
```


### Install bash autocomplete

```
nca completion >> ~/.bashrc
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


## Config API

Configuration model is deployed to github pages. Please refer to the following [README](https://github.com/FlamingTuri/nca/blob/gh-pages/README.md).

[Back to top](#nca---Node-Command-Alias)


## Examples

- [hello world](https://github.com/FlamingTuri/nca/blob/main/examples/hello-world.md) - simple hello world
- [function hello world](https://github.com/FlamingTuri/nca/blob/main/examples/function-hello-world.md) - hello world but leveraging javascript interpreter
- [function option](https://github.com/FlamingTuri/nca/blob/main/examples/function-option-param.md) - passing option params to an alias
- [function positional arguments](https://github.com/FlamingTuri/nca/blob/main/examples/function-positional-arguments.md) - passing positional arguments to an alias
- [function shell command execution](https://github.com/FlamingTuri/nca/blob/main/examples/shell-command-execution.md) - executing shell commands leveragin shelljs
- [alias hierarchy](https://github.com/FlamingTuri/nca/blob/main/examples/alias-hierarchy.md) - creating alias hierarchies, to create complex command line interfaces
- [my aliases](https://github.com/FlamingTuri/nca-aliases) - git repo where I save my aliases

[Back to top](#nca---Node-Command-Alias)


## Contributing

Contributions, suggestions, issues and feature requests are welcome!

[Back to top](#nca---Node-Command-Alias)


## License

This utility is distributed under the [MIT license](LICENSE).

[Back to top](#nca---Node-Command-Alias)
