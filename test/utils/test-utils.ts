import { expect } from 'chai';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { VerifyOutput } from './verify-output';

export function runNcaAndVerifyOutput(verifyOutput: VerifyOutput, ...args: string[]) {
  const app = runCommand(...args);

  const stdout: string[] = [];
  const stderr: string[] = [];

  app.stdout.on('data', (data: any) => {
    stdout.push(bufferToString(data));
  });

  app.stderr.on('data', (data: any) => {
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
    }
  });
}

/**
 * Programmatically set arguments and execute the CLI script
 *
 * @param {...string} args - positional and option arguments for the command to run
 */
function runCommand(...args: string[]): ChildProcessWithoutNullStreams {
  return spawn('./test/run-nca.sh', args);
}


function bufferToString(buffer: ArrayBuffer | SharedArrayBuffer | { valueOf(): ArrayBuffer | SharedArrayBuffer; }): string {
  return Buffer.from(buffer).toString();
}
