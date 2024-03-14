import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';

describe("module command handler", () => {


  it('command module-self-call excecutes module-hello as a shell command which logs hello world', done => {
    const expected = 'hello world\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal(expected);
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, 'module-self-call', 'nca', 'module-hello');
  });
});
