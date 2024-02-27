import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';

describe("module command handler", () => {


  it('command module-external logs todays date using moment.js library', done => {
    const command = 'module-external';
    const expected = `[[1,3],[2,4]]\n`;
    const verifyOutput = new VerifyOutputBuilder(done)
    .handleStdout((stdout: string[]) => {
      expect(stdout.join('\n')).to.equal(expected);
    })
    .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, command);
  });
});
