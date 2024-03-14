import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';
import { Platform } from '../../../../utils/platform-values/platform';

describe("module command handler", () => {


  it('command module-hello logs hello world', done => {
    const expected = Platform.isWindows() ? '"hello world"' : 'hello world';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal(Platform.addNewLine(expected));
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, 'hello');
  });

});
