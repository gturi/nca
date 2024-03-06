import { TestCompletion } from "../../../utils/test-completion";

export class TestValues {

  static commands(): TestCompletion[] {
    return [
      {
        aliasName: 'mainCommand',
        aliasCommand: ['mainCommand'],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: ['mainCommand', 'subCommand'],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: ['mainCommand', 'anotherSubCommand'],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: ['nca', 'mainCommand', 'subCommand', 'a', 'b', 'c'],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: ['nca', 'mainCommand', 'subCommand', 'a', 'b', `"c 'd"`],
        expectedOutput: []
      },
      // TODO: not working
      /*{
        aliasName: 'mainCommand',
        aliasCommand: ['nca', 'mainCommand', 'subCommand', 'a', 'b', `"c \"d"`],
        expectedOutput: []
      },*/
      {
        aliasName: 'mainCommand',
        aliasCommand: [
          'mainCommand',
          '-a', 'true',
          '-n', '100',
          'fooValue',
          'barValue1',
          'barValue2'
        ],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: [
          'mainCommand',
          'subCommand',
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
        aliasName: 'mainCommand',
        aliasCommand: [
          'mainCommand',
          'anotherSubCommand',
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
        aliasName: 'mainCommand',
        aliasCommand: [
          'mainCommand',
          'anotherSubCommand',
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
        aliasName: 'mainCommand',
        aliasCommand: ['nca', 'mainCommand'],
        args: ['subCommand', 'a', 'b', 'c'],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: ['nca', 'mainCommand', 'subCommand'],
        args: ['a', 'b', 'c'],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: ['nca', 'mainCommand', 'subCommand'],
        args: ['a', 'b', `"c 'd"`],
        expectedOutput: []
      },
      {
        aliasName: 'mainCommand',
        aliasCommand: [
          'mainCommand',
          'subCommand',
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
