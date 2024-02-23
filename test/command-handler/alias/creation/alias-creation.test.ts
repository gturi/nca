import 'mocha';
import * as testUtils from '../../../utils/test-utils';

describe("alias command handler", () => {

  const commands: string[][] = [
    [
      'nca', 'mainAlias', 'subAlias', 'a', 'b', 'c'
    ],
    [
      'mainAlias',
      '-a', 'true',
      '-n', '100',
      'fooValue',
      'barValue1',
      'barValue2'
    ],
    [
      'mainAlias',
      'subAlias',
      '-a', 'true',
      '-n', '100',
      '-c', 'cValue',
      'fooValue',
      'bazValue',
      'barValue1',
      'barValue2'
    ],
    [
      'mainAlias',
      'anotherSubAlias',
      '-a', 'true',
      '-n', '100',
      '-d', 'dValue',
      'fooValue',
      'quxValue',
      'barValue1',
      'barValue2'
    ]
  ]

  commands.forEach((command, i) => {
    it(`command alias produces the same output as regular command (idx: ${i})`, () => {
      testUtils.createAliasAndVerifyOutput('mainAlias', ...command);
    });
  });

});
