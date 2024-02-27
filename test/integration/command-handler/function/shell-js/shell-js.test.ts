import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';
import { Platform } from '../../../utils/platform-values/platform';

describe("function command handler", () => {


  it('function-shell-js command logs hello world via shell js', done => {
    const command = 'function-shell-js';
    const expected = "hello world";
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('')).to.equal(Platform.addNewLine(expected));
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, command);
  });
});
