import 'mocha';
import { expect } from 'chai';
const testUtils = require('../../../utils/test-utils')

describe("function command handler", () => {


  it('function-shell-js command logs hello world via shell js', done => {
    const expected = "hello world\n";
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, 'function-shell-js');
  });
});
