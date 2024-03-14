import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';

describe("function command handler", () => {


  it('iterator-helper command logs even values using a lazy iterator', done => {
    const command = 'function-iterator-helper';
    const expected = [2, 4, 6].join('\n') + '\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('')).to.equal(expected);
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, command);
  });
});
