import path from 'path';
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

export function createAliasAndVerifyOutput(aliasName: string, args: string[]) {
  try {
    setup();

    const createAliasResult = createAlias(args);
    if (createAliasResult.status !== 0) {
      throw new Error(createAliasResult.stderr);
    }

    const aliasCommandOutput = runCommandSync(aliasName);

    const commandArgs = removeNcaPrefixIfPresent(...args);

    const commandOutput = runCommandSync('nca', ...commandArgs);

    expect(aliasCommandOutput.stdout).to.equal(commandOutput.stdout);
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
function runCommand(...args: string[]): ChildProcess {
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
