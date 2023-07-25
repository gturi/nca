# nca - Node Command Alias

| branch | build | coverage |
| --- | --- | --- |
| main | [![lint-and-test](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/gturi/nca/badge.svg?branch=main)](https://coveralls.io/github/gturi/nca?branch=main) |
| develop | [![lint-and-test](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml/badge.svg?branch=develop)](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/gturi/nca/badge.svg?branch=develop)](https://coveralls.io/github/gturi/nca?branch=develop) |


## main

- [typedoc](https://gturi.github.io/nca/main/docs/index.html)
- [coverage](https://gturi.github.io/nca/main/coverage/lcov-report/index.html)

## develop

- [typedoc](https://gturi.github.io/nca/develop/docs/index.html)
- [coverage](https://gturi.github.io/nca/develop/coverage/lcov-report/index.html)


## Yaml config models

Refer to:
- [Config](https://gturi.github.io/nca/main/docs/interfaces/api_config.Config.html) for the config file entrypoint, where you will define your cross platform node aliases
- [CommandHandlerInput](https://gturi.github.io/nca/main/docs/classes/input_command_handler_input.CommandHandlerInput.html) when using function and module aliases. It contains option, arguments and utility functions that can be used inside javascript functions/modules.
- [CompletionInput](https://gturi.github.io/nca/main/docs/classes/input_completion_input.CompletionInput.html) when defining an alias custom completion. Similarly to `CommandHandlerInput`, it exposes current cli arguments and utility functions, allowing to create complex custom completion.


## Config notes

- An alias name must be unique across all configs.
- An alias name cannot contain spaces.
- An alias command cannot be optional if it does not define sub aliases.
- Options and positional arguments defined for an alias are also shared to its sub aliases.
- Positional arguments order declaration matters. List type positional arguments are automatically ordered as the last possible positional argument.
- At most one list type positional argument can be declared per alias hierarchy.
- A positional argument can not have the same name as one of the sub aliases in its hierarchy.
