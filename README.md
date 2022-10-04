# nca - Node Command Alias

A command line utility to manage cross platform command aliases.


## Install

```
npm install -g nca
```


## Usage

The heart of nca resides in `$HOME/.nca/config.yml`.

This file is where your cross platform aliases will be declared.

```yml
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
Running `nca hello` in your terminal will print hello in the terminal.


### Config notes

- An alias name must be unique across all configs.
- An alias name cannot contain spaces.
- An alias command cannot be optional if it does not define sub aliases.
- Options and positional arguments defined for an alias are also shared to its sub aliases.
- Positional arguments order declaration matters. List type positional arguments are automatically ordered as the last possible positional argument.
- At most one list type positional argument can be declared per alias hierarchy.
- A positional argument can not have the same name as one of the sub aliases in its hierarchy.

### Config API

To know more on how aliases can be configured you can check the API documentation at TODO.


## Examples

TODO


## Contributing

Contributions, suggestions, issues and feature requests are welcome!

[Back to top](#CompletablePromise)


## License

This library is distributed under the [MIT license](LICENSE).

[Back to top](#CompletablePromise)

