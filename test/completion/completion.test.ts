import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../utils/test-utils';
import { VerifyOutputBuilder } from '../utils/verify-output-builder';

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
      '--version',
      ''
    ].sort();
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => {
        const result = stdout.join('').split('\n').sort();
        //console.log(`result ${JSON.stringify(result)}`)
        //console.log(`expected ${JSON.stringify(expected)}`)
        expect(result).deep.equal(expected);
      })
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
      '--version',
      ''
    ].sort();
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => {
        const result = stdout.join('').split('\n').sort();
        //console.log(`result ${JSON.stringify(result)}`)
        //console.log(`expected ${JSON.stringify(expected)}`)
        expect(result).deep.equal(expected);
      })
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
      '--version',
      ''
    ].sort();
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => {
        const result = stdout.join('').split('\n').sort();
        //console.log(`result ${JSON.stringify(result)}`)
        //console.log(`expected ${JSON.stringify(expected)}`)
        expect(result).deep.equal(expected);
      })
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
      'secondValue',
      ''
    ].sort();
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => {
        const result = stdout.join('').split('\n').sort();
        //console.log(`result ${JSON.stringify(result)}`)
        //console.log(`expected ${JSON.stringify(expected)}`)
        expect(result).deep.equal(expected);
      })
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
      'anotherSubAlias',
      ''
    ].sort();
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => {
        const result = stdout.join('').split('\n').sort();
        //console.log(`result ${JSON.stringify(result)}`)
        //console.log(`expected ${JSON.stringify(expected)}`)
        expect(result).deep.equal(expected);
      })
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
