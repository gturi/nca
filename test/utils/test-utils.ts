import path from 'path';
import shelljs from 'shelljs';
import { expect } from 'chai';
import { ChildProcess, spawn, spawnSync, SpawnSyncReturns } from 'child_process';
import { VerifyOutput } from './verify-output';
import { NodeUtils } from '../../src/util/node-utils';
import { Platform } from './platform-values/platform';

export function runNcaAndVerifyOutput(verifyOutput: VerifyOutput, ...args: string[]) {
  setup();

  const app = runCommand(...args);

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

export function createAliasAndVerifyOutput(aliasName: string, ...args: string[]) {
  try {
    setup();

    const commandArgs = removeNcaPrefixIfPresent(...args);

    const commandOutput = runCommandSync(Platform.values.ncaCommand, ...commandArgs);

    createAlias(...args);

    const aliasCommandOutput = runCommandSync(aliasName);

    expect(aliasCommandOutput.stdout).to.equal(commandOutput.stdout);
  } catch (error) {
    throw error;
  } finally {
    cleanup(true);
  }
}

function setup() {
  const ncaFolder = path.resolve(__dirname, '../', '../');
  NodeUtils.link(ncaFolder);

  const ncaMainConfigFilePath = path.join(__dirname, '../', 'test-config.yml');
  process.env.ncaMainConfigFilePath = ncaMainConfigFilePath;
}

function cleanup(cleanLocalAliases: boolean = false) {
  if (cleanLocalAliases) {
    NodeUtils.unlinkLocalAliases();
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
function runCommand(...args: string[]): ChildProcess {
  return spawn(Platform.values.ncaCommand, args);
}

function createAlias(...args: string[]): shelljs.ShellString {
  return shelljs.exec('nca alias add ' + args.join(' '));
}

function runCommandSync(command: string, ...args: string[]): SpawnSyncReturns<string> {
  return spawnSync(command, args, { encoding: 'utf-8' });
}

function bufferToString(buffer: ArrayBuffer | SharedArrayBuffer | { valueOf(): ArrayBuffer | SharedArrayBuffer; }): string {
  return Buffer.from(buffer).toString();
}
