import 'mocha';
import * as testUtils from '../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../utils/verify-output-builder';
import { VerifyOutputHandleUtils } from '../../../utils/verify-output-handle-utils';

describe("default completion", () => {

  it('hierarchy default completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion'
    ];
    const expected = [
      'subCommand',
      'anotherSubCommand'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('hierarchy default completion logs expected option values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion',
      '-'
    ];
    const expected = [
      '-a',
      '--help',
      '-n',
      '--version'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToArray(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('hierarchy default completion subCommand logs expected option values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion',
      'subCommand',
      '-'
    ];
    const expected = [
      '-a',
      '-c',
      '--help',
      '-n',
      '--version'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToArray(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('hierarchy default completion anotherSubCommand logs expected option values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion',
      'anotherSubCommand',
      '-'
    ];
    const expected = [
      '-a',
      '-d',
      '--help',
      '-n',
      '--version'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToArray(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
