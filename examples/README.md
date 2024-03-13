# Examples


## Simple
- [hello world](./hello-world.md) - simple hello world


## Function
- [function hello world](./function-hello-world.md) - hello world but leveraging javascript interpreter
- [function option](./function-option-params.md) - passing option params to a nca command
- [function positional arguments](./function-positional-arguments.md) - passing positional arguments to a nca command
- [function shell command execution](./function-shell-command-execution.md) - executing shell commands leveraging shelljs


## Modules
- [js modules hello world](./module-hello-world.md) - declaring and mantainig complex js scripts in yml could become unsustainable. This example shows how to directly execute a javascript module.
- [js modules complex](./module-complex.md) - using option and positional arguments with javascript modules
- [js modules shell command execution](./module-shell-command-execution.md) - executing shell commands leveraging shelljs inside javascript modules
- [js modules external npm dependencies](./module-external-dependencies.md) - executing js scripts which use external npm dependencies


## Custom completion
- [custom static completion](./custom-static-array-completion.md) - override yargs shell completion with a custom one statically defined
- [custom js completion](./custom-js-completion.md) - override yargs shell completion with a custom one returned by invoking a custom js module
- [custom js input completion](./custom-js-input-completion.md) - override yargs shell completion with a custom one returned by invoking a custom js module. It uses current command line status to determine what to return


## Advanced
- [hierarchy](./hierarchy.md) - creating nca command hierarchies, to create complex command line interfaces
- [alias](./alias.md) - create an alias for a long nca command or to use a nca command without typing `nca` prefix


## Other
- [my nca commands](https://github.com/gturi/nca-commands) - git repo where I track the nca commands I use
- [tests](../test/integration) - nca commands used for integration tests
