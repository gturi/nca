import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';

describe("function command handler", () => {


  it('command function-hello logs hello world', done => {
    const command = ['function-hello'];
    const verifyOutput = new VerifyOutputBuilder(done)
    .handleStdout((stdout: string[]) => {
      expect(stdout.join('\n')).to.equal('hello world\n');
    })
    .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

});
