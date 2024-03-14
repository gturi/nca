import 'mocha';
import * as testUtils from '../../../../utils/test-utils';
import { VerifyOutputBuilder } from '../../../../utils/verify-output-builder';
import { VerifyOutputHandleUtils } from '../../../../utils/verify-output-handle-utils';

describe("function command handler", () => {

  it('command mainCommand logs expected values', done => {
    const command = [
      'mainCommand',
      '-a', 'true',
      '-n', '100',
      'fooValue',
      'barValue1',
      'barValue2'
    ];
    const expected = [
      '--- main command started ---',
      'a: true',
      'n: 100',
      'foo: fooValue',
      'bar: barValue1,barValue2',
      '--- main command ended ---'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();

    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('command subCommand logs expected values', done => {
    const command = [
      'mainCommand',
      'subCommand',
      '-a', 'true',
      '-n', '100',
      '-c', 'cValue',
      'fooValue',
      'bazValue',
      'barValue1',
      'barValue2'
    ];
    const expected = [
      '--- sub command started ---',
      'a: true',
      'n: 100',
      'foo: fooValue',
      'bar: barValue1,barValue2',
      'c: cValue',
      'baz: bazValue',
      '--- sub command ended ---'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });

  it('command anotherSubCommand logs expected values', done => {
    const command = ['mainCommand',
      'anotherSubCommand',
      '-a', 'true',
      '-n', '100',
      '-d', 'dValue',
      'fooValue',
      'quxValue',
      'barValue1',
      'barValue2'
    ];
    const expected = [
      '--- another sub command started ---',
      'a: true',
      'n: 100',
      'foo: fooValue',
      'bar: barValue1,barValue2',
      'd: dValue',
      'qux: quxValue',
      '--- another sub command ended ---'
    ];
    const verifyOutput = new VerifyOutputBuilder(done)
      .handleStdout(stdout => VerifyOutputHandleUtils.isEqualToString(stdout, expected))
      .build();
    testUtils.runNcaAndVerifyOutput(verifyOutput, ...command);
  });
});
