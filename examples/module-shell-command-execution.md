# Example: module shell command execution

module-shell-config.yml
```yml
aliases:
  - name: module-shell
    description: execute shelljs commands
    command: ./module-shell.js
    commandType: Module
```

module-shell.js
```js
module.exports = function (args, shelljs, safeExec) {
  shelljs.exec('echo hello');

  // safeExec will throw an exception if the command exit code is not 0
  safeExec('git stats'); // intentional typo
};
```


## Usage

```bash
nca module-shell
```

Prints:
```bash
hello
git: 'stats' is not a git command. See 'git --help'.

The most similar command is
        status
# stacktrace...
```


## Notes

Shelljs is passed as a one of the anonymous function input, to facilitate native command execution (i.e. useful to run git and docker commands which share the same interface across differen operating systems).

Moreover a `safeExec` utility function can be used to run commands which can potentially fail: the function will throw an exception when the command has a non 0 exit code.
