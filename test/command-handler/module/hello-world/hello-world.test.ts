import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';

describe("module command handler", () => {


  it('command module-hello logs hello world', done => {
    const expected = 'hello world\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal(expected);
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, 'hello');
  });

});
