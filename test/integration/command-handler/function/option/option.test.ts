import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';

describe("function command handler", () => {


  it('log-options command logs default values if no option param is specified', done => {
    const expected = 'false 1 foo\n';
    const command = ['log-options'];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal(expected);
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('log-options command logs the specified input values', done => {
    const expected = [true, 100, 'bar'].join(' ') + '\n';
    const command = ['log-options', '-b', 'true', '-n', '100', '-s', 'bar'];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal(expected);
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('log-options command logs the specified input value using alternative option name', done => {
    const expected = [false, 100, 'foo'].join(' ') + '\n';
    const command = ['log-options', '--num', '100'];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('\n')).to.equal(expected);
      })
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
