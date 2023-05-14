import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';

describe("module command handler", () => {


  it('command module-external logs todays date using moment.js library', done => {
    const command = 'module-external';
    const expected = `${new Date().toISOString().split('T')[0]}\n`;
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('\n')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, command);
  });
});
