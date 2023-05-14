import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';

describe("module command handler", () => {


  it('command module-complex concats input and logs hello world', done => {
    const command = [
      'module-complex',
      '-s=hello', 
      '--foo=world'
    ];
    const expected = 'hello world\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal(expected);
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
