import 'mocha';
import { expect } from 'chai';
const testUtils = require('../../../utils/test-utils')

describe("module command handler", () => {


  it('command module-hello logs hello world', done => {
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal('hello world\n');
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, 'hello');
  });

});
