import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';

describe("module command handler", () => {


  it('command module-complex concats input and logs hello world', done => {
    const command = [
      'module-complex',
      '-s=hello', 
      '--foo=world'
    ];
    const expected = 'hello world\n';
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, ...command);
  });
});
