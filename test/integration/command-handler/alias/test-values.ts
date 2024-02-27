export class TestValues {

  static commands(): string[][] {
    return [
      [
        'mainAlias'
      ],
      [
        'mainAlias', 'subAlias'
      ],
      [
        'mainAlias', 'anotherSubAlias'
      ],
      [
        'nca', 'mainAlias', 'subAlias', 'a', 'b', 'c'
      ],
      [
        'nca', 'mainAlias', 'subAlias', 'a', 'b', `"c 'd"`
      ],
      // TODO: not working
      /*[
        'nca', 'mainAlias', 'subAlias', 'a', 'b', `"c \"d"`
      ],*/
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
    ];
  }

}
