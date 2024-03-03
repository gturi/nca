import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';

describe("module command handler", () => {


  it('command module-iterator-helper command even values using a lazy iterator', done => {
    const command = 'module-iterator-helper';
    const expected = [2, 4, 6].join('\n') + '\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('')).to.equal(expected);
      })
      .expectedExitCode(0)
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, command);
  });
});
