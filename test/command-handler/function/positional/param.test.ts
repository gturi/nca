import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';

describe("function command handler", () => {


  it('log-positional command ignores boolean positional argument when not specified', done => {
    const expected = "false\n1\n[ 'a', 'b' ]\n";
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, 'log-positional 1 a b');
  });

  it('log-positional command accepts --{key}={value} syntax', done => {
    const expected = "true\n1\n[ 'a', 'b' ]\n";
    const command = 'log-positional --foo=true 1 a b';
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, command);
  });
});
