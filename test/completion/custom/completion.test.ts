import 'mocha';
import * as testUtils from '../../utils/test-utils';
import { VerifyOutputBuilder } from '../../utils/verify-output-builder';
import { VerifyOutputHandleUtils } from '../../utils/verify-output-handle-utils';

describe("custom completion", () => {

  it('custom static array completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'static-completion'
    ];
    const expected = [
      'foo',
      'bar',
      'baz'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('custom js completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'js-completion'
    ];
    const expected = [
      'a',
      'b',
      'c'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('hierarchy custom completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-custom-completion'
    ];
    const expected = [
      'firstValue',
      'secondValue'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToArray(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('hierarchy custom completion merge logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-custom-completion-merge'
    ];
    const expected = [
      'firstValue',
      'secondValue',
      'subAlias',
      'anotherSubAlias'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToArray(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
