import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';

describe("simple command handler", () => {

  it('command hello logs hello world', done => {
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal('hello world\n');
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, 'hello');
  });

});
