import path from 'path';
import { expect } from 'chai';
import { ChildProcess, spawn } from 'child_process';
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
      //cleanup();
    }
  });
}

function setup() {
  const ncaFolder = path.resolve(__dirname, '../', '../');
  NodeUtils.link(ncaFolder);

  const ncaMainConfigFilePath = path.join(__dirname, '../', 'test-config.yml');
  process.env.ncaMainConfigFilePath = ncaMainConfigFilePath;
}

function cleanup() {
  NodeUtils.unlink('node-command-alias');

  delete process.env.ncaMainConfigFilePath;
}

/**
 * Programmatically set arguments and execute the CLI script
 *
 * @param {...string} args - positional and option arguments for the command to run
 */
function runCommand(...args: string[]): ChildProcess {
  return spawn(Platform.values.ncaCommand, args);
}


function bufferToString(buffer: ArrayBuffer | SharedArrayBuffer | { valueOf(): ArrayBuffer | SharedArrayBuffer; }): string {
  return Buffer.from(buffer).toString();
}
