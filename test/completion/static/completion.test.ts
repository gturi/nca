import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../utils/test-utils';
import { VerifyOutputBuilder } from '../../utils/verify-output-builder';

describe("completion", () => {

  it('static array completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'static-completion'
    ];
    const expected = [
      'foo',
      'bar',
      'baz'
    ].join('\n') + '\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => expect(stdout.join('')).to.equal(expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('js completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'js-completion'
    ];
    const expected = [
      'a',
      'b',
      'c'
    ].join('\n') + '\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => expect(stdout.join('')).to.equal(expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
