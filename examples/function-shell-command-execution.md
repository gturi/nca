# Example: function shell command execution

```yml
commands:
  - name: update-branch
    description:  pulls the latest changes of develop and merges them into current branch
    command: |
      input.cliUtils.shelljs.exec('git checkout develop');
      input.cliUtils.shelljs.exec('git pull');
      input.cliUtils.shelljs.exec('git checkout "@{-1}"');
      input.cliUtils.shelljs.exec('git merge develop');
    commandType: Function
```

## Usage

```bash
nca update-branch
```


## Notes

This example is the equivalent of creating executing the following bash script:

```bash
git checkout develop
git pull
git checkout "@{-1}"
git merge develop
```

What is the objective if we can just write a bash script?

We can think of adding some checks to avoid possible errors:

```js
const currentBranch = input.cliUtils.shelljs.exec('git branch --show-current');
if (currentBranch === 'main') {
  throw new Error('error: main branch should be updated by creating a pull request');
}
```

Doing the same with a bash script would not work if we were using a cmd terminal.
