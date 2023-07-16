import 'mocha';
import * as testUtils from '../../utils/test-utils';
import { VerifyOutputBuilder } from '../../utils/verify-output-builder';
import { VerifyOutputHandleUtils } from '../../utils/verify-output-handle-utils';

describe("default completion", () => {

  it('hierarchy default completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion'
    ];
    const expected = [
      'subAlias',
      'anotherSubAlias'
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

  it('hierarchy default completion subalias logs expected option values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion',
      'subAlias',
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

  it('hierarchy default completion anotherSubalias logs expected option values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion',
      'anotherSubAlias',
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
