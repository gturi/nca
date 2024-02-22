import 'mocha';
import * as testUtils from '../../../utils/test-utils';

describe("alias command handler", () => {

  it('command alias produces the same output as regular command', () => {
    const command = [
      'nca', 'mainAlias', 'subAlias', 'a', 'b', '"c \"d"'
    ];

    //testUtils.createAliasAndVerifyOutput('mainAlias', ...command);
  });

  it('command subAlias logs expected values', () => {
    const command = [
      'mainAlias',
      '-a', 'true',
      '-n', '100',
      'fooValue',
      'barValue1',
      'barValue2'
    ];

    //testUtils.createAliasAndVerifyOutput('mainAlias', ...command);
  });

  it('command subAlias logs expected values', () => {
    const command = [
      'mainAlias',
      'subAlias',
      '-a', 'true',
      '-n', '100',
      '-c', 'cValue',
      'fooValue',
      'bazValue',
      'barValue1',
      'barValue2'
    ];

    //testUtils.createAliasAndVerifyOutput('mainAlias', ...command);
  });

  it('command anotherSubAlias logs expected values', () => {
    const command = ['mainAlias',
      'anotherSubAlias',
      '-a', 'true',
      '-n', '100',
      '-d', 'dValue',
      'fooValue',
      'quxValue',
      'barValue1',
      'barValue2'
    ];

    //testUtils.createAliasAndVerifyOutput('mainAlias', ...command);
  });

});
