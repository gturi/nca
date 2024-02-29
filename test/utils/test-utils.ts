import path from 'path';
import shelljs from 'shelljs';
import { expect } from 'chai';
import { ChildProcess, spawn, spawnSync, SpawnSyncReturns } from 'child_process';
import { VerifyOutput } from './verify-output';
import { NodeUtils } from '../../src/util/node-utils';
import { FileSystemUtils } from '../../src/util/file-system-utils';
import { Platform } from './platform-values/platform';
import { NcaConfig } from '../../src/config/nca-config';

export function runNcaAndVerifyOutput(verifyOutput: VerifyOutput, ...args: string[]) {
  setup();

  const app = runNcaCommand(...args);

  const stdout: string[] = [];
  const stderr: string[] = [];

  app.stdout?.on('data', (data: any) => {
    stdout.push(bufferToString(data));
  });

  app.stderr?.on('data', (data: any) => {
    stderr.push(bufferToString(data));
  });

  app.on('close', (code: number) => {
    try {
      verifyOutput.handleStdout(stdout);
      verifyOutput.handleStderr(stderr);
      expect(code).to.equal(verifyOutput.expectedExitCode);
      verifyOutput.done();
    } catch (error) {
      verifyOutput.done(error);
    } finally {
      cleanup();
    }
  });
}

export function createAliasAndVerifyOutput(aliasName: string, args: string[]) {
  try {
    setup();

    throwErrorIfExitCodeNotZero(createAlias(args));

    const aliasCommandResult = runCommandSync(aliasName);


    const commandArgs = removeNcaPrefixIfPresent(...args);

    const commandResult = runCommandSync('nca', ...commandArgs);

    expect(aliasCommandResult.stderr).to.equal(commandResult.stderr);
    expect(aliasCommandResult.stdout).to.equal(commandResult.stdout);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    cleanup(aliasName);
  }
}

export function renameAliasAndVerifyOutput(aliasName: string, aliasNewName: string, args: string[]) {
  try {
    setup();

    throwErrorIfExitCodeNotZero(createAlias(args));

    const aliasCommandResult = runCommandSync(aliasName);

    runCommandSync('nca', 'alias', 'rename', aliasName, aliasNewName);

    const postRenameCommandResult = runCommandSync(aliasNewName);

    expect(aliasCommandResult.stderr).to.equal(postRenameCommandResult.stderr);
    expect(aliasCommandResult.stdout).to.equal(postRenameCommandResult.stdout);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    cleanup(aliasNewName);
  }
}

export function verifyNcaAliasCompletion(aliasName: string, args: string[]) {
  try {
    setup();

    throwErrorIfExitCodeNotZero(createAlias(args));

    const completionResult = runCommandSync('nca', 'completion');

    appendToCompletionFile(completionResult.stdout);

    const aliasCompletionResult = runCommandSync('nca', 'alias', 'completion', aliasName);

    appendToCompletionFile(aliasCompletionResult.stdout);

    const completionTesterScript = path.resolve(__dirname, '../', 'test-alias-completion.sh');
    const invokeAliasCompletionResult = runCommandSync(`"${completionTesterScript}"`);

    const invokeNcaCompletionResult = runCommandSync('nca', '--get-yargs-completions', ...args);

    expect(invokeNcaCompletionResult.stderr).to.equal(invokeAliasCompletionResult.stderr);
    expect(invokeNcaCompletionResult.stdout).to.equal(invokeAliasCompletionResult.stdout);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    cleanup(aliasName);
  }
}

function setup() {
  const ncaFolder = path.resolve(__dirname, '../', '../');
  NodeUtils.link(ncaFolder);

  const ncaMainConfigFilePath = path.join(__dirname, '../', 'test-config.yml');
  process.env.ncaMainConfigFilePath = ncaMainConfigFilePath;
}

function cleanup(aliasName: string | null = null) {
  FileSystemUtils.deleteFile(getCompletionFile());

  if (aliasName) {
    runCommandSync('nca', 'alias', 'delete', aliasName);
  }
  NodeUtils.unlink('node-command-alias');

  delete process.env.ncaMainConfigFilePath;
}

function removeNcaPrefixIfPresent(...args: string[]): string[] {
  const result = [...args];
  if (result[0] === 'nca') {
    result.shift();
  }
  return result;
}

/**
 * Programmatically set arguments and execute the CLI script
 *
 * @param {...string} args - positional and option arguments for the command to run
 */
function runNcaCommand(...args: string[]): ChildProcess {
  return spawn(Platform.values.ncaCommand, args, { shell: true });
}

function createAlias(args: string[]): SpawnSyncReturns<string> {
  return spawnSync('nca', ['alias', 'add', ...args], { encoding: 'utf-8', shell: true });
}

function runCommandSync(command: string, ...args: string[]): SpawnSyncReturns<string> {
  return spawnSync(command, args, { encoding: 'utf-8', shell: true });
}

function bufferToString(buffer: ArrayBuffer | SharedArrayBuffer | { valueOf(): ArrayBuffer | SharedArrayBuffer; }): string {
  return Buffer.from(buffer).toString();
}

function throwErrorIfExitCodeNotZero(result: SpawnSyncReturns<string>) {
  if (result.status !== 0) {
    throw new Error(result.stderr);
  }
}

function appendToCompletionFile(completion: string) {
  const completionFile = getCompletionFile();
  FileSystemUtils.writeFile(completionFile, completion, 'a');

  shelljs.chmod('+x', completionFile);
}

function getCompletionFile(): string {
  return path.join(NcaConfig.getMainConfigFolderPath(), 'completion.sh');
}
