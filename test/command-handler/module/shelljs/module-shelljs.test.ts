import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';

describe("module command handler", () => {


  it('command module-shell logs hello world and then terminates with an error', done => {
    const command = 'module-shell';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal('hello\n');
      })
      .handleStderr((stderr: string[]) => {
        expect(stderr.join('\n')).to.contain("git: 'stats' is not a git command. See 'git --help'.");
      })
      .expectedExitCode(1)
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, command);
  });
});
