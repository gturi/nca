# Example: function shell command execution

```yml
aliases:
  - name: update-branch
    description:  pulls the latest changes of develop and merges them into current branch
    command: |
      shelljs.exec('git checkout develop');
      shelljs.exec('git pull');
      shelljs.exec('git checkout "@{-1}"');
      shelljs.exec('git merge develop');
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
const currentBranch = shelljs.exec('git branch --show-current');
if (currentBranch === 'main') {
  throw new Error('error: main branch should be updated by creating a pull request');
}
```

Doing the same with a bash script would not work if we were using a cmd terminal.
