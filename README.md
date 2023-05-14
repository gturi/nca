# nca - Node Command Alias

| branch | build | coverage |
| --- | --- | --- |
| main | [![lint-and-test](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/gturi/nca/badge.svg?branch=main)](https://coveralls.io/github/gturi/nca?branch=main) |
| develop | [![lint-and-test](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml/badge.svg?branch=develop)](https://github.com/gturi/nca/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/gturi/nca/badge.svg?branch=develop)](https://coveralls.io/github/gturi/nca?branch=develop) |


## main

- [typedoc](https://gturi.github.io/nca/main/docs/index.html)

## develop

- [typedoc](https://gturi.github.io/nca/develop/docs/index.html)


## Config notes

- An alias name must be unique across all configs.
- An alias name cannot contain spaces.
- An alias command cannot be optional if it does not define sub aliases.
- Options and positional arguments defined for an alias are also shared to its sub aliases.
- Positional arguments order declaration matters. List type positional arguments are automatically ordered as the last possible positional argument.
- At most one list type positional argument can be declared per alias hierarchy.
- A positional argument can not have the same name as one of the sub aliases in its hierarchy.
