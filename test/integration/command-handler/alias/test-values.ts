import { TestCompletion } from "../../../utils/test-completion";

export class TestValues {

  static commands(): TestCompletion[] {
    return [
      {
        aliasName: 'mainAlias',
        aliasCommand: ['mainAlias'],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: ['mainAlias', 'subAlias'],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: ['mainAlias', 'anotherSubAlias'],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: ['nca', 'mainAlias', 'subAlias', 'a', 'b', 'c'],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: ['nca', 'mainAlias', 'subAlias', 'a', 'b', `"c 'd"`],
        expectedOutput: []
      },
      // TODO: not working
      /*{
        aliasName: 'mainAlias',
        aliasCommand: ['nca', 'mainAlias', 'subAlias', 'a', 'b', `"c \"d"`],
        expectedOutput: []
      },*/
      {
        aliasName: 'mainAlias',
        aliasCommand: [
          'mainAlias',
          '-a', 'true',
          '-n', '100',
          'fooValue',
          'barValue1',
          'barValue2'
        ],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: [
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
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: [
          'mainAlias',
          'anotherSubAlias',
          '-a', 'true',
          '-n', '100',
          '-d', 'dValue',
          'fooValue',
          'quxValue',
          'barValue1',
          'barValue2'
        ],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: [
          'mainAlias',
          'anotherSubAlias',
          '-a', 'true',
          '-n', '100',
          '-d', 'dValue',
          'fooValue',
          'quxValue',
          'barValue1',
          'barValue2'
        ],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: ['nca', 'mainAlias'],
        args: ['subAlias', 'a', 'b', 'c'],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: ['nca', 'mainAlias', 'subAlias'],
        args: ['a', 'b', 'c'],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: ['nca', 'mainAlias', 'subAlias'],
        args: ['a', 'b', `"c 'd"`],
        expectedOutput: []
      },
      {
        aliasName: 'mainAlias',
        aliasCommand: [
          'mainAlias',
          'subAlias',
          '-a'
        ],
        args: [
          'true',
          '-n', '100',
          '-c', 'cValue',
          'fooValue',
          'bazValue',
          'barValue1',
          'barValue2'
        ],
        expectedOutput: []
      }
    ];
  }

}
