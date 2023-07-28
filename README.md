# nca - Node Command Alias

| branch | build | coverage |
| --- | --- | --- |
| main | [![lint-and-test](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/gturi/nca/badge.svg?branch=main)](https://coveralls.io/github/gturi/nca?branch=main) |
| develop | [![lint-and-test](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml/badge.svg?branch=develop)](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/gturi/nca/badge.svg?branch=develop)](https://coveralls.io/github/gturi/nca?branch=develop) |

<br/>

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

#### Completion for git-bash

Completion also works on git-bash: there is a bug in yargs (the library used to implement the cli) which returns the wrong path to nca. To fix it just convert the windows style path to unix style. It should work even when using `nvm` inside git-bash (in the example `nodejs` directory is a windows shortcut).

```bash
# before
type_list=$(C:\Program Files\nodejs\node_modules\node-command-alias\bin\nca --get-yargs-completions "${args[@]}")

# after
type_list=$("/c/Program Files/nodejs/node_modules/node-command-alias/bin/nca" --get-yargs-completions "${args[@]}")
```

[Back to top](#nca---Node-Command-Alias)


## Usage

The heart of nca resides in `$HOME/.nca/config.yml`.

This file is where your cross platform aliases will be declared.

```yaml
includePaths:
  # be careful, absolute paths needs to use windows style even when running inside a git-bash session i.e. C:\absolute\path\to\alternative-config.yml
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
    # overrides yargs default completion
    completion:
      completionArray: [foo, bar]
```

If you do not like to store all the aliases into this file you can declare alternative yaml configurations under includePath variable. If you declare a directory as a path to include, all the yaml files defined inside it will be loaded.

You can also change the default main config file by defining `ncaMainConfigFilePath` environment variable. I.E.

```bash
export ncaMainConfigFilePath=/path/to/your/main/config.yml
```

[Back to top](#nca---Node-Command-Alias)


## Config API

Yaml configuration model is deployed to github pages. Refer to:
- [Config](https://gturi.github.io/nca/main/docs/interfaces/api_config.Config.html) for the config file entrypoint, where you will define your cross platform node aliases.
- [CommandHandlerInput](https://gturi.github.io/nca/main/docs/classes/input_command_handler_input.CommandHandlerInput.html) when using function and module aliases. It contains option, arguments and utility functions that can be used inside javascript functions/modules.
- [CompletionInput](https://gturi.github.io/nca/main/docs/classes/input_completion_input.CompletionInput.html) when defining an alias custom completion. Similarly to `CommandHandlerInput`, it exposes current cli arguments and utility functions, allowing to create complex custom completion.


For more information please refer to the following [README](https://github.com/gturi/nca/blob/gh-pages/README.md).


[Back to top](#nca---Node-Command-Alias)


## Examples

Refer to this [README](./examples/README.md) to know how to define your scripts custom aliases. They should cover every situation from the entry level to the most advanced ones.

Alternatively refer to this [git repository](https://github.com/gturi/nca-aliases) where I save my aliases.


[Back to top](#nca---Node-Command-Alias)


## Troubleshooting

When dealing with custom completion it is possible that something does not work as expected.

You can enable debug mode by setting `ncaDebug` variable to `true`.

```bash
export ncaDebug=true
nca $command1 $command2 # tab press

# or you can manually ask completion with the following command
nca --get-yargs-completion $command1 $command2
```

Each time completion is invoked, cli values will be logged in the same directory where the main config file is stored (by default at  `$HOME/.config/out.log`).

[Back to top](#nca---Node-Command-Alias)


## Contributing

Contributions, suggestions, issues and feature requests are welcome!

[Back to top](#nca---Node-Command-Alias)


## License

This utility is distributed under the [MIT license](LICENSE).

[Back to top](#nca---Node-Command-Alias)
