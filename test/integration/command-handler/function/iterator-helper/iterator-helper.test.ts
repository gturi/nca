import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';
import { Platform } from '../../../../utils/platform-values/platform';

describe("function command handler", () => {


  it('iterator-helper command logs even values using a lazy iterator', done => {
    const command = 'function-iterator-helper';
    const expected = [2, 4, 6].join(Platform.values.newLine);
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('')).to.equal(Platform.addNewLine(expected));
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, command);
  });
});
