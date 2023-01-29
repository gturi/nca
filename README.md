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
  - ../relative/path/to/another-alternative-config.yml
  - /absolute/path/to/directory
  - ./relative/path/to/another-directory

aliases:
  - name: hello-bash
    description: prints hello
    command: echo hello
  - name: hello-js
    description: prints hello using javascript
    command: console.log(hello)
    commandType: Function
  - name: run-js
    description: executes a javascript file
    command: ./index.js
    commandType: Module
```

If you do not like to store all the aliases into this file you can declare alternative yaml configurations under includePath variable. If you declare a directory as a path to include, all the yaml files defined inside it will be loaded.

[Back to top](#nca---Node-Command-Alias)


## Config API

Configuration model is deployed to github pages. Please refer to the following [README](https://github.com/FlamingTuri/nca/blob/gh-pages/README.md).

[Back to top](#nca---Node-Command-Alias)


## Examples

Refer to this [README](./examples/README.md) to know how to define your scripts custom aliases.

Alternatively refer to this [git repository](https://github.com/FlamingTuri/nca-aliases) where I save my aliases.


[Back to top](#nca---Node-Command-Alias)


## Contributing

Contributions, suggestions, issues and feature requests are welcome!

[Back to top](#nca---Node-Command-Alias)


## License

This utility is distributed under the [MIT license](LICENSE).

[Back to top](#nca---Node-Command-Alias)
