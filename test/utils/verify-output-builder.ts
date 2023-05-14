import { VerifyOutput } from "./verify-output";

export class VerifyOutputBuilder {

  private readonly _verifyOutput: VerifyOutput;

  constructor(done: (arg?: any) => void) {
    this._verifyOutput = new VerifyOutput(done);
    this._verifyOutput.handleStderr = (stderr: string[]) => {
      if (stderr.length !== 0) {
        console.error(stderr);
        this._verifyOutput.done(stderr);
      }
    };
  }

  build(): VerifyOutput {
    return this._verifyOutput;
  }

  handleStdout(handleStdout: (stdout: string[]) => void): VerifyOutputBuilder {
    this._verifyOutput.handleStdout = handleStdout;
    return this;
  }

  handleStderr(handleStderr: (stderr: string[]) => void): VerifyOutputBuilder {
    this._verifyOutput.handleStderr = handleStderr;
    return this;
  }

  expectedExitCode(expectedExitCode: number): VerifyOutputBuilder {
    this._verifyOutput.expectedExitCode = expectedExitCode;
    return this;
  }
}
