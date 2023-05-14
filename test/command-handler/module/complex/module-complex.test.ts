import 'mocha';
import { expect } from 'chai';
const testUtils = require('../../../utils/test-utils')

describe("module command handler", () => {


  it('command module-complex concats input and logs hello world', done => {
    const command = 'module-complex -s=hello --foo=world';
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal('hello world\n');
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, command);
  });
});
