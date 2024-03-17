import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';

describe("module command handler", () => {


  it('command module-yaml command reads correctly yaml file', done => {
    const command = 'module-yaml';
    const expected = getExpectedOutput().commands
      .map(command => Object.values(command).join('\n') + '\n')
      .join('');
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout((stdout: string[]) => {
        expect(stdout.join('')).to.equal(expected);
      })
      .expectedExitCode(0)
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, command);
  });

  function getExpectedOutput() {
    return {
      "commands": [
        {
          "name": 'module-yaml',
          "description": 'read yaml file through js yaml',
          "command": './module-yaml.js',
          "commandType": 'Module',
          "runInConfigDirectory": true
        }
      ]
    }
  };

});
