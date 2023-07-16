import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../utils/test-utils';
import { VerifyOutputBuilder } from '../utils/verify-output-builder';
import { VerifyOutputHandleUtils } from '../utils/verify-output-handle-utils';

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

  it('hierarchy default completion logs expected values', done => {
    const command = [
      '--get-yargs-completions',
      'hierarchy-default-completion'
    ];
    const expected = [
      'subAlias',
      'anotherSubAlias'
    ].join('\n') + '\n';
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => expect(stdout.join('')).to.equal(expected))
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
