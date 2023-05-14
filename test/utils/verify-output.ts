export class VerifyOutput {
  readonly done: (arg?: any) => void;
  handleStdout: (stdout: string[]) => void;
  handleStderr: (stderr: string[]) => void;
  expectedExitCode: number;

  constructor(done: (arg?: any) => void) {
    this.done = done;
    this.handleStdout = (stdout: string[]) => { };
    this.handleStderr = (stderr: string[]) => { };
    this.expectedExitCode = 0;
  }
}
