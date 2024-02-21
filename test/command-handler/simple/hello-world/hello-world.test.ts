import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';
import { Platform } from '../../../utils/platform-values/platform';

describe("simple command handler", () => {

  it('command hello logs hello world', done => {
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        const expected = Platform.isWindows() ? '"hello world"' : 'hello world';
        expect(stdout.join('\n')).to.equal(Platform.addNewLine(expected));
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, 'hello');
  });

});
