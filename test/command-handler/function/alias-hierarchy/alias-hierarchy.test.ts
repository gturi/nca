import 'mocha';
import { expect } from 'chai';
import * as testUtils from '../../../utils/test-utils';

describe("function command handler", () => {

  it('command mainAlias logs expected values', done => {
    const command = [
      'mainAlias',
      '-a true',
      '-n 100',
      'fooValue',
      'barValue1',
      'barValue2'
    ];
    const expected = [
      '--- main alias started ---',
      'a: true',
      'n: 100',
      'foo: fooValue',
      'bar: barValue1,barValue2',
      '--- main alias ended ---'
    ].join('\n') + '\n';
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, ...command);
  });

  it('command subAlias logs expected values', done => {
    const command = [
      'mainAlias',
      'subAlias',
      '-a true',
      '-n 100',
      '-c cValue',
      'fooValue',
      'bazValue',
      'barValue1',
      'barValue2'
    ];
    const expected = [
      '--- sub alias started ---',
      'a: true',
      'n: 100',
      'foo: fooValue',
      'bar: barValue1,barValue2',
      'c: cValue',
      'baz: bazValue',
      '--- sub alias ended ---'
    ].join('\n') + '\n';
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, ...command);
  });

  it('command anotherSubAlias logs expected values', done => {
    const command = ['mainAlias',
      'anotherSubAlias',
      '-a true',
      '-n 100',
      '-d dValue',
      'fooValue',
      'quxValue',
      'barValue1',
      'barValue2'
    ];
    const expected = [
      '--- another sub alias started ---',
      'a: true',
      'n: 100',
      'foo: fooValue',
      'bar: barValue1,barValue2',
      'd: dValue',
      'qux: quxValue',
      '--- another sub alias ended ---'
    ].join('\n') + '\n';
    const handleResult = (stdout: string[]) => {
      expect(stdout.join('')).to.equal(expected);
    };
    testUtils.runNcaAndVerifySuccessfulOutput(done, handleResult, ...command);
  });
});
