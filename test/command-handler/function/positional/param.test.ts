import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';
import { VerifyOutputHandleUtils } from '../../../utils/verify-output-handle-utils';

describe("function command handler", () => {

  it('log-positional command ignores boolean positional argument when not specified', done => {
    const command = [
      'log-positional',
      '1',
      'a',
      'b'
    ];
    const expected = [
      'false',
      '1',
      "[ 'a', 'b' ]"
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('log-positional command accepts --{key}={value} syntax', done => {
    const expected = [
      'true',
      '1',
      "[ 'a', 'b' ]"
    ];
    const command = [
      'log-positional',
      '--foo=true',
      '1',
      'a',
      'b'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
