import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';
import { Platform } from '../../../../utils/platform-values/platform';

describe("simple command handler", () => {

  if (Platform.isWindows()) {
    console.log('Skipping *nix specific test');
    return;
  }

  it('command params logs the input params', done => {
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        const expected = '-a hello -s world --foo fooValue';
        expect(stdout.join('\n')).to.equal(Platform.addNewLine(expected));
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, 'params', '-a', 'hello', '-s', 'world');
  });

});
