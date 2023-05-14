import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';

describe("function command handler", () => {


  it('log-options command logs default values if no option param is specified', done => {
    const expected = 'false 1 foo\n';
    const command = ['log-options'];
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, ...command);
  });

  it('log-options command logs the specified input values', done => {
    const expected = [true, 100, 'bar'].join(' ') + '\n';
    const command = ['log-options', '-b', 'true', '-n', '100', '-s', 'bar'];
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, ...command);
  });

  it('log-options command logs the specified input value using alternative option name', done => {
    const expected = [false, 100, 'foo'].join(' ') + '\n';
    const command = ['log-options', '--num', '100'];
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, ...command);
  });
});
