import { expect } from 'chai';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

export function runNcaAndVerifySuccessfulOutput(done: (arg: any) => void, handleStdout: (stdout: string[]) => void, args: string) {
  const handleStderr = (stderr: string[]) => {
    if (stderr.length !== 0) {
      console.error(stderr);
      done(stderr);
    }
  }
  runNcaAndVerifyOutput(done, handleStdout, handleStderr, 0, args);
}

export function runNcaAndVerifyOutput(done: (arg?: any) => void, handleStdout: (stdout: string[]) => void, handleStderr: (stderr: string[]) => void, expectedExitCode: number, args: string) {
  const app = runCommand(args);

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
      handleStdout(stdout);
      handleStderr(stderr);
      expect(code).to.equal(expectedExitCode);
      done();
    } catch (error) {
      done(error);
    }
  });
}

/**
 * Programmatically set arguments and execute the CLI script
 *
 * @param {...string} args - positional and option arguments for the command to run
 */
function runCommand(args: string): ChildProcessWithoutNullStreams {
  return spawn('./test/run-nca.sh', [args]);
}


function bufferToString(buffer: ArrayBuffer | SharedArrayBuffer | { valueOf(): ArrayBuffer | SharedArrayBuffer; }): string {
  return Buffer.from(buffer).toString();
}
